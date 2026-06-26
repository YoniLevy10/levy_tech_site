import { fetchAllProjects, fetchProject } from "@/lib/github"
import { notFound } from "next/navigation"
import { ProjectsNav } from "../projects-nav"
import type { Metadata } from "next"

export const revalidate = 21600

const GITHUB_USER = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "YoniLevy10"

const STATUS_STYLE: Record<string, { border: string; bg: string; text: string }> = {
  Production: { border: "rgba(52,211,153,0.3)", bg: "rgba(52,211,153,0.08)", text: "#6ee7b7" },
  Pilot: { border: "rgba(200,169,109,0.3)", bg: "rgba(200,169,109,0.09)", text: "#c8a96d" },
  Development: { border: "rgba(167,139,250,0.3)", bg: "rgba(167,139,250,0.08)", text: "#c4b5fd" },
  Paused: { border: "rgba(255,255,255,0.08)", bg: "rgba(255,255,255,0.03)", text: "#6b7280" },
  Archived: { border: "rgba(239,68,68,0.2)", bg: "rgba(239,68,68,0.06)", text: "#f87171" },
}

export async function generateStaticParams() {
  try {
    const projects = await fetchAllProjects()
    return projects.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = await fetchProject(params.slug) // uses cache
  if (!project) return {}
  const m = project.meta
  const coverUrl = m.cover
    ? `https://raw.githubusercontent.com/${GITHUB_USER}/${project.repoName}/main${m.cover}`
    : undefined
  return {
    title: `${m.title} — Levy Tech`,
    description: m.description,
    openGraph: {
      title: `${m.title} — Levy Tech`,
      description: m.description,
      images: coverUrl ? [coverUrl] : [],
    },
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await fetchProject(params.slug) // uses cache — same data, no extra call
  if (!project) notFound()

  const { meta: m, repoName, readme, stars, forks, language, createdAt, updatedAt, topics, homepage } = project
  const s = STATUS_STYLE[m.status] ?? STATUS_STYLE.Development
  const rawBase = `https://raw.githubusercontent.com/${GITHUB_USER}/${repoName}/main`

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <ProjectsNav back={{ href: "/projects", label: "All Projects" }} />

      {/* Hero */}
      <section className="relative">
        {m.cover && (
          <div className="relative h-56 overflow-hidden" style={{ background: "var(--s2)" }}>
            <img src={`${rawBase}${m.cover}`} alt="" className="h-full w-full object-cover opacity-50" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 40%, var(--bg))" }}
            />
          </div>
        )}
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-[5vw]">
          <div className="flex items-start gap-5">
            {m.logo && (
              <img
                src={`${rawBase}${m.logo}`}
                alt=""
                className="h-16 w-16 shrink-0 rounded-2xl object-contain"
                style={{ background: "var(--s2)", padding: "8px", border: "1px solid var(--line)" }}
              />
            )}
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-[clamp(28px,7vw,46px)] font-normal leading-tight">
                  {m.title}
                </h1>
                <span
                  className="shrink-0 rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                  style={{ borderColor: s.border, background: s.bg, color: s.text }}
                >
                  {m.status}
                </span>
              </div>
              {m.category && (
                <div
                  className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--gold)" }}
                >
                  {m.category}
                </div>
              )}
              <p className="text-[15px] font-light leading-relaxed" style={{ color: "var(--dim)" }}>
                {m.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {homepage && (
                  <a
                    href={homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-opacity hover:opacity-75"
                    style={{ borderColor: "var(--gold-bd)", background: "var(--gold-bg)", color: "var(--gold)" }}
                  >
                    View Project ↗
                  </a>
                )}
                <a
                  href={`https://github.com/${GITHUB_USER}/${repoName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-opacity hover:opacity-75"
                  style={{ borderColor: "var(--line)", color: "var(--dim)" }}
                >
                  GitHub →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-5xl gap-12 px-5 pb-24 sm:px-[5vw] lg:grid lg:grid-cols-[1fr_260px]">
        {/* README */}
        <div>
          <h2
            className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--dim)" }}
          >
            README
          </h2>
          {readme ? (
            <div
              className="prose-levy text-[14px] font-light leading-[1.9]"
              style={{ color: "var(--text)" }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(readme) }}
            />
          ) : (
            <p className="text-[14px] italic" style={{ color: "var(--dim)" }}>
              No README available.
            </p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="mt-12 space-y-5 lg:mt-0">
          <div
            className="rounded-2xl border p-5 space-y-4"
            style={{ background: "var(--s1)", borderColor: "var(--line)" }}
          >
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--dim)" }}>
              Details
            </h3>
            {[
              { label: "Status", value: m.status },
              { label: "Language", value: language ?? "—" },
              { label: "Stars", value: String(stars) },
              { label: "Forks", value: String(forks) },
              {
                label: "Created",
                value: new Date(createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
              },
              {
                label: "Updated",
                value: new Date(updatedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-[12px]">
                <span style={{ color: "var(--dim)" }}>{label}</span>
                <span style={{ color: "var(--text)" }}>{value}</span>
              </div>
            ))}
          </div>

          {m.technologies.length > 0 && (
            <div>
              <h3
                className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em]"
                style={{ color: "var(--dim)" }}
              >
                Technologies
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {m.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em]"
                    style={{ borderColor: "var(--line)", color: "var(--dim)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {topics.length > 0 && (
            <div>
              <h3
                className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em]"
                style={{ color: "var(--dim)" }}
              >
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em]"
                    style={{ borderColor: "var(--line2)", color: "var(--dim)" }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <style>{`
        .prose-levy h1 { font-family: var(--font-playfair), Georgia, serif; font-size: 26px; font-weight: 400; margin: 1.5rem 0 0.75rem; color: var(--text); }
        .prose-levy h2 { font-family: var(--font-playfair), Georgia, serif; font-size: 20px; font-weight: 400; margin: 1.5rem 0 0.5rem; color: var(--text); }
        .prose-levy h3 { font-size: 15px; font-weight: 500; margin: 1rem 0 0.4rem; color: var(--text); }
        .prose-levy p { margin: 0.75rem 0; }
        .prose-levy a { color: var(--gold); text-underline-offset: 3px; }
        .prose-levy code { background: var(--s2); border: 1px solid var(--line); border-radius: 4px; padding: 2px 6px; font-size: 12px; font-family: var(--font-dm-mono), monospace; }
        .prose-levy pre { background: var(--s1); border: 1px solid var(--line); border-radius: 12px; padding: 16px; overflow-x: auto; margin: 1rem 0; }
        .prose-levy pre code { background: none; border: none; padding: 0; }
        .prose-levy ul, .prose-levy ol { padding-left: 1.5rem; margin: 0.75rem 0; }
        .prose-levy li { margin: 0.3rem 0; }
        .prose-levy blockquote { border-left: 2px solid var(--gold-bd); padding-left: 1rem; margin: 1rem 0; color: var(--dim); font-style: italic; }
        .prose-levy hr { border: none; border-top: 1px solid var(--line); margin: 2rem 0; }
        .prose-levy img { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
        .prose-levy strong { color: var(--text); font-weight: 600; }
        .prose-levy table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 13px; }
        .prose-levy th, .prose-levy td { border: 1px solid var(--line); padding: 8px 12px; text-align: left; }
        .prose-levy th { background: var(--s2); color: var(--text); font-weight: 500; }
        .prose-levy td { color: var(--dim); }
      `}</style>
    </div>
  )
}

// ── Markdown renderer — handles code blocks before HTML-escaping text ──────────
function renderMarkdown(md: string): string {
  // 1. Extract code blocks first (protect from further processing)
  const codeBlocks: string[] = []
  let result = md.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
    codeBlocks.push(`<pre><code class="language-${lang}">${escaped}</code></pre>`)
    return `\x00CODE${codeBlocks.length - 1}\x00`
  })

  // 2. Inline code (before HTML escape of remaining text)
  const inlineCodes: string[] = []
  result = result.replace(/`([^`\n]+)`/g, (_, code) => {
    const escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    inlineCodes.push(`<code>${escaped}</code>`)
    return `\x00INLINE${inlineCodes.length - 1}\x00`
  })

  // 3. Escape remaining HTML
  result = result
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  // 4. Headings
  result = result
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")

  // 5. Bold / italic
  result = result
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")

  // 6. HR
  result = result.replace(/^---$/gm, "<hr />")

  // 7. Blockquote
  result = result.replace(/^&gt; (.+)$/gm, "<blockquote>$1</blockquote>")

  // 8. Lists
  result = result
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>")
  result = result.replace(/(<li>[\s\S]*?<\/li>)(\n<li>[\s\S]*?<\/li>)*/g, "<ul>$&</ul>")

  // 9. Images before links
  result = result.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" />'
  )

  // 10. Links
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  // 11. Paragraphs (double newline)
  result = result
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ""
      if (/^<(h[1-6]|ul|ol|li|pre|blockquote|hr|img)/.test(trimmed)) return trimmed
      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`
    })
    .join("\n")

  // 12. Restore code blocks
  result = result.replace(/\x00CODE(\d+)\x00/g, (_, i) => codeBlocks[parseInt(i)])
  result = result.replace(/\x00INLINE(\d+)\x00/g, (_, i) => inlineCodes[parseInt(i)])

  return result
}
