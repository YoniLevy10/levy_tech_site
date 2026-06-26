import { PortfolioSchema, type PortfolioMeta } from "./portfolio-schema"

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "YoniLevy10"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? ""

// ─── Types ───────────────────────────────────────────────────────────────────

export type ProjectData = {
  slug: string
  repoName: string
  meta: PortfolioMeta
  readme: string | null
  stars: number
  forks: number
  topics: string[]
  language: string | null
  updatedAt: string
  createdAt: string
  homepage: string | null
  commitCount30Days: number
}

export type GitHubStats = {
  totalProjects: number
  activeProjects: number
  productionSystems: number
  commits30Days: number
  languagesUsed: number
}

// ─── GraphQL ─────────────────────────────────────────────────────────────────

const REPOS_QUERY = `
  query($login: String!, $after: String) {
    user(login: $login) {
      repositories(
        first: 100
        after: $after
        privacy: PUBLIC
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        pageInfo { hasNextPage endCursor }
        nodes {
          name
          description
          homepageUrl
          primaryLanguage { name }
          repositoryTopics(first: 10) {
            nodes { topic { name } }
          }
          stargazerCount
          forkCount
          updatedAt
          createdAt
          portfolioJson: object(expression: "HEAD:portfolio.json") {
            ... on Blob { text }
          }
          readmeMain: object(expression: "HEAD:README.md") {
            ... on Blob { text }
          }
          readmeAlt: object(expression: "HEAD:Readme.md") {
            ... on Blob { text }
          }
        }
      }
    }
  }
`

async function graphqlFetch(query: string, variables: Record<string, unknown>) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 21600 }, // 6h ISR
  })
  if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`)
  const json = await res.json()
  if (json.errors) throw new Error(json.errors[0].message)
  return json.data
}

// ─── Commit count via REST ────────────────────────────────────────────────────

async function getCommitCount30Days(repo: string): Promise<number> {
  try {
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/commits?since=${since}&per_page=100`,
      {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}` },
        next: { revalidate: 21600 },
      }
    )
    if (!res.ok) return 0
    const data = await res.json()
    return Array.isArray(data) ? data.length : 0
  } catch {
    return 0
  }
}

// ─── Parsing helpers ──────────────────────────────────────────────────────────

function parsePortfolioJson(raw: string | null | undefined): PortfolioMeta | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    const result = PortfolioSchema.safeParse(parsed)
    if (result.success) return result.data
    return null
  } catch {
    return null
  }
}

// ─── Main fetch ───────────────────────────────────────────────────────────────

export async function fetchAllProjects(): Promise<ProjectData[]> {
  // If no token, return empty (will show empty state gracefully)
  if (!GITHUB_TOKEN) {
    console.warn("[github] GITHUB_TOKEN not set — returning empty projects")
    return []
  }

  const allNodes: unknown[] = []
  let after: string | null = null

  while (true) {
    const data = await graphqlFetch(REPOS_QUERY, { login: GITHUB_USERNAME, after })
    const repos = (data as any).user.repositories
    allNodes.push(...repos.nodes)
    if (!repos.pageInfo.hasNextPage) break
    after = repos.pageInfo.endCursor
  }

  // Only repos with a valid portfolio.json AND visibility: true
  const relevant = (allNodes as any[]).filter((node) => {
    const meta = parsePortfolioJson(node.portfolioJson?.text)
    return meta !== null && meta.visibility === true
  })

  const projects: ProjectData[] = await Promise.all(
    relevant.map(async (node: any) => {
      const meta = parsePortfolioJson(node.portfolioJson?.text)!
      const readme = node.readmeMain?.text ?? node.readmeAlt?.text ?? null
      const commitCount30Days = await getCommitCount30Days(node.name)

      return {
        slug: node.name.toLowerCase().replace(/_/g, "-"),
        repoName: node.name,
        meta,
        readme,
        stars: node.stargazerCount,
        forks: node.forkCount,
        topics: node.repositoryTopics?.nodes?.map((n: any) => n.topic.name) ?? [],
        language: node.primaryLanguage?.name ?? null,
        updatedAt: node.updatedAt,
        createdAt: node.createdAt,
        homepage: node.homepageUrl || meta.website || null,
        commitCount30Days,
      }
    })
  )

  return projects.sort((a, b) => {
    if (a.meta.featured && !b.meta.featured) return -1
    if (!a.meta.featured && b.meta.featured) return 1
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const projects = await fetchAllProjects()
  const languages = new Set<string>()
  let totalCommits = 0
  for (const p of projects) {
    if (p.language) languages.add(p.language)
    totalCommits += p.commitCount30Days
  }
  return {
    totalProjects: projects.length,
    activeProjects: projects.filter(
      (p) => p.meta.status === "Production" || p.meta.status === "Pilot"
    ).length,
    productionSystems: projects.filter((p) => p.meta.status === "Production").length,
    commits30Days: totalCommits,
    languagesUsed: languages.size,
  }
}
