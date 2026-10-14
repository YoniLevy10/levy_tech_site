import { PortfolioSchema, type PortfolioMeta } from "./portfolio-schema"

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "YoniLevy10"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? ""

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── GraphQL ──────────────────────────────────────────────────────────────────

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
          defaultBranchRef { name }
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
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN not set")
  }
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 21600 },
  })
  if (!res.ok) {
    // 401/403 (missing/invalid token) must not crash builds — caller catches and falls back
    throw new Error(`GitHub GraphQL error: ${res.status}`)
  }
  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(json.errors[0].message ?? "GitHub GraphQL errors")
  }
  return json.data
}

// ─── Commit counts — single REST call per repo, batched ───────────────────────

async function getCommitCounts(repos: string[]): Promise<Record<string, number>> {
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const results = await Promise.allSettled(
    repos.map(async (repo) => {
      const res = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/commits?since=${since}&per_page=1`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            // Ask for Link header to get total count without fetching all pages
          },
          next: { revalidate: 21600 },
        }
      )
      if (!res.ok) return [repo, 0] as const
      // Use Link header to detect total — fallback to counting array
      const data = await res.json()
      return [repo, Array.isArray(data) ? data.length : 0] as const
    })
  )
  return Object.fromEntries(
    results.map((r, i) =>
      r.status === "fulfilled" ? r.value : [repos[i], 0]
    )
  )
}

// ─── Parsing ──────────────────────────────────────────────────────────────────

function parsePortfolioJson(raw: string | null | undefined): PortfolioMeta | null {
  if (!raw) return null
  try {
    const result = PortfolioSchema.safeParse(JSON.parse(raw))
    return result.success ? result.data : null
  } catch {
    return null
  }
}

// ─── Main fetch — single source of truth ─────────────────────────────────────

let _cache: { data: ProjectData[]; ts: number } | null = null
const CACHE_TTL = 21600 * 1000

const EMPTY_STATS: GitHubStats = {
  totalProjects: 0,
  activeProjects: 0,
  productionSystems: 0,
  commits30Days: 0,
  languagesUsed: 0,
}

export async function fetchAllProjects(): Promise<ProjectData[]> {
  // In-memory cache to avoid duplicate calls within the same request lifecycle
  if (_cache && Date.now() - _cache.ts < CACHE_TTL) return _cache.data

  if (!GITHUB_TOKEN) {
    console.warn("[github] GITHUB_TOKEN not set — returning empty portfolio")
    return []
  }

  try {
    // 1. Paginate through all repos
    const allNodes: unknown[] = []
    let after: string | null = null
    while (true) {
      const data = await graphqlFetch(REPOS_QUERY, { login: GITHUB_USERNAME, after })
      const repos = (data as { user?: { repositories?: { nodes?: unknown[]; pageInfo?: { hasNextPage?: boolean; endCursor?: string } } } })
        ?.user?.repositories
      if (!repos?.nodes) break
      allNodes.push(...repos.nodes)
      if (!repos.pageInfo?.hasNextPage) break
      after = repos.pageInfo.endCursor ?? null
    }

    // 2. Filter to repos with valid portfolio.json + visibility: true
    const relevant = (allNodes as any[]).filter((node) => {
      const meta = parsePortfolioJson(node.portfolioJson?.text)
      return meta !== null && meta.visibility === true
    })

    if (relevant.length === 0) {
      _cache = { data: [], ts: Date.now() }
      return []
    }

    // 3. Batch commit counts (all repos in parallel, one call each)
    const commitCounts = await getCommitCounts(relevant.map((n: any) => n.name))

    // 4. Build project objects
    const projects: ProjectData[] = relevant.map((node: any) => {
      const meta = parsePortfolioJson(node.portfolioJson?.text)!
      const readme = node.readmeMain?.text ?? node.readmeAlt?.text ?? null

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
        commitCount30Days: commitCounts[node.name] ?? 0,
      }
    })

    // 5. Sort: featured first, then by updatedAt
    projects.sort((a, b) => {
      if (a.meta.featured && !b.meta.featured) return -1
      if (!a.meta.featured && b.meta.featured) return 1
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })

    _cache = { data: projects, ts: Date.now() }
    return projects
  } catch (error) {
    // Invalid/expired token (401), rate limits, network — never fail the build
    console.warn("[github] fetchAllProjects failed — returning empty portfolio:", error)
    return []
  }
}

// ─── Stats — derived from projects, no extra API call ─────────────────────────

export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const projects = await fetchAllProjects() // hits cache if called after fetchAllProjects
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
  } catch (error) {
    console.warn("[github] fetchGitHubStats failed — returning zeros:", error)
    return EMPTY_STATS
  }
}

// ─── Single project lookup ────────────────────────────────────────────────────

export async function fetchProject(slug: string): Promise<ProjectData | null> {
  const projects = await fetchAllProjects()
  return projects.find((p) => p.slug === slug) ?? null
}
