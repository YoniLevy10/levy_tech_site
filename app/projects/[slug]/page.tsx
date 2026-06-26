import { fetchAllProjects } from "@/lib/github"
import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"

export const revalidate = 21600

const GITHUB_USER = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "YoniLevy10"

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
  const projects = await fetchAllProjects()
  const project = projects.find((p) => p.slug === params.slug)
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

const STATUS_STYLE: Record<string, { border: string; bg: string; text: string }> = {
  Production: { border: "rgba(52,211,153,0.3)", bg: "rgba(52,211,153,0.08)", text: "#6ee7b7" },
  Pilot: { border: "rgba(200,169,109,0.3)", bg: "rgba(200,169,109,0.09)", text: "#c8a96d" },
  Development: { border: "rgba(167,139,250,0.3)", bg: "rgba(167,139,250,0.08)", text: "#c4b5fd" },
  Paused: { border: "rgba(255,255,255,0.08)", bg: "rgba(255,255,255,0.03)", text: "#6b7280" },
  Archived: { border: "rgba(239,68,68,0.2)", bg: "rgba(239,68,68,0.06)", text: "#f87171" },
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const projects = await fetchAllProjects()
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const { meta: m, repoName, readme, stars, forks, language, createdAt, updatedAt, topics, homepage } = project
  const s = STATUS_STYLE[m.status] ?? STATUS_STYLE.Development
  const rawBase = `https://raw.githubusercontent.com/${GITHUB_USER}/${repoName}/main`

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* ── Nav ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b px-5 py-3 backdrop-blur-xl sm:px-[5vw] sm:py-4"
        style={{ borderColor: "var(--line)", background: "rgba(6,6,6,0.92)" }}
      >
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div
            className="grid h-8 w-8 place-items-center rounded-md border font-serif text-sm"
            style={{ borderColor: "var(--gold-bd)", background: "rgba(200,169,109,0.08)", color: "var(--gold)" }}
          >
            L
          </div>
          <span className="font-serif text-[16px]" style={{ color: "var(--text)" }}>
            Levy Tech
          </span>
        </Link>
        <Link
          href="/projects"
          className="font-mono text-[10px] uppercase tracking-widest transition-colors hover:opacity-100"
          style={{ color: "var(--dim)" }}
        >
          ← All Projects
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="relative">
        {m.cover && (
          <div className="h-56 overflow-hidden" style={{ background: "var(--s2)" }}>
            <img
              src={`${rawBase}${m.cover}`}
              alt=""
              className="h-full w-full object-cover opacity-50"
            />
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
                onError={() => {}}
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
                <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--gold)" }}>
                  {m.category}
                </div>
              )}
              <p className="text-[15px] font-light leading-relaxed" style={{ color: "var(--dim)" }}>
                {m.description}
              </p>

              {/* CTA buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                {homepage && (
                  <a
                    href={homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-all hover:opacity-80"
                    style={{ borderColor: "var(--gold-bd)", background: "var(--gold-bg)", color: "var(--gold)" }}
                  >
                    View Project ↗
                  </a>
                )}
                <a
                  href={`https://github.com/${GITHUB_USER}/${repoName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-all hover:opacity-80"
                  style={{ borderColor: "var(--line)", color: "var(--dim)" }}
                >
                  GitHub →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
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
              className="prose-content text-[14px] font-light leading-[1.9]"
              style={{ color: "var(--text)" }}
              dangerouslySetInnerHTML={{ __html: basicMarkdown(readme) }}
            />
          ) : (
            <p className="text-[14px] italic" style={{ color: "var(--dim)" }}>
              No README available.
            </p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="mt-12 lg:mt-0">
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
            <div className="mt-5">
              <h3 className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--dim)" }}>
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
            <div className="mt-5">
              <h3 className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--dim)" }}>
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
        .prose-content h1 { font-family: var(--font-playfair), Georgia, serif; font-size: 26px; font-weight: 400; margin: 1.5rem 0 0.75rem; color: var(--text); }
        .prose-content h2 { font-family: var(--font-playfair), Georgia, serif; font-size: 20px; font-weight: 400; margin: 1.5rem 0 0.5rem; color: var(--text); }
        .prose-content h3 { font-size: 15px; font-weight: 500; margin: 1rem 0 0.4rem; color: var(--text); }
        .prose-content p { margin: 0.75rem 0; }
        .prose-content a { color: var(--gold); text-underline-offset: 3px; }
        .prose-content code { background: var(--s2); border: 1px solid var(--line); border-radius: 4px; padding: 2px 6px; font-size: 12px; font-family: var(--font-dm-mono), monospace; }
        .prose-content pre { background: var(--s1); border: 1px solid var(--line); border-radius: 12px; padding: 16px; overflow-x: auto; margin: 1rem 0; }
        .prose-content pre code { background: none; border: none; padding: 0; }
        .prose-content ul, .prose-content ol { padding-left: 1.5rem; margin: 0.75rem 0; }
        .prose-content li { margin: 0.3rem 0; }
        .prose-content blockquote { border-left: 2px solid var(--gold-bd); padding-left: 1rem; margin: 1rem 0; color: var(--dim); font-style: italic; }
        .prose-content hr { border: none; border-top: 1px solid var(--line); margin: 2rem 0; }
        .prose-content img { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
        .prose-content strong { color: var(--text); font-weight: 600; }
      `}</style>
    </div>
  )
}

// ── Basic Markdown parser (no external deps) ──────────────────────────────────
function basicMarkdown(md: string): string {
  return md
    // Escape HTML
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    // Code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    // Inline code
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    // Headings
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // HR
    .replace(/^---$/gm, "<hr />")
    // Blockquote
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    // Unordered list
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    // Paragraphs (blank lines)
    .replace(/\n\n([^<])/g, "\n\n<p>$1")
    .replace(/([^>])\n\n/g, "$1</p>\n\n")
}
