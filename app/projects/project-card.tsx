import Link from "next/link"
import type { ProjectData } from "@/lib/github"

const STATUS_STYLE: Record<string, { border: string; bg: string; text: string }> = {
  Production: { border: "rgba(52,211,153,0.3)", bg: "rgba(52,211,153,0.08)", text: "#6ee7b7" },
  Pilot: { border: "rgba(200,169,109,0.3)", bg: "rgba(200,169,109,0.09)", text: "#c8a96d" },
  Development: { border: "rgba(167,139,250,0.3)", bg: "rgba(167,139,250,0.08)", text: "#c4b5fd" },
  Paused: { border: "rgba(255,255,255,0.08)", bg: "rgba(255,255,255,0.03)", text: "#6b7280" },
  Archived: { border: "rgba(239,68,68,0.2)", bg: "rgba(239,68,68,0.06)", text: "#f87171" },
}

const GITHUB_USER = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "YoniLevy10"

// Server Component — no "use client" needed
export function ProjectCard({ project }: { project: ProjectData }) {
  const { meta, slug, repoName, updatedAt, language } = project
  const s = STATUS_STYLE[meta.status] ?? STATUS_STYLE.Development
  const rawBase = `https://raw.githubusercontent.com/${GITHUB_USER}/${repoName}/main`

  return (
    <Link href={`/projects/${slug}`} className="project-card no-underline block h-full">
      <article className="h-full flex flex-col overflow-hidden rounded-2xl border transition-all duration-300"
        style={{ background: "var(--s1)", borderColor: "var(--line)" }}>

        {meta.cover && (
          <div className="h-40 overflow-hidden" style={{ background: "var(--s2)" }}>
            <img
              src={`${rawBase}${meta.cover}`}
              alt={meta.title}
              className="h-full w-full object-cover opacity-80 transition-transform duration-500 project-card-img"
              onError={(e) => ((e.currentTarget as HTMLImageElement).parentElement!.style.display = "none")}
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {meta.logo && (
                <img
                  src={`${rawBase}${meta.logo}`}
                  alt=""
                  className="h-7 w-7 shrink-0 rounded-lg object-contain"
                  style={{ background: "var(--s3)", padding: "3px" }}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
              )}
              <h2 className="truncate font-serif text-[20px] leading-tight" style={{ color: "var(--text)" }}>
                {meta.title}
              </h2>
            </div>
            <span
              className="shrink-0 rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em]"
              style={{ borderColor: s.border, background: s.bg, color: s.text }}
            >
              {meta.status}
            </span>
          </div>

          {meta.category && (
            <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--gold)" }}>
              {meta.category}
            </div>
          )}

          <p className="mb-4 flex-1 text-[13px] font-light leading-[1.8]" style={{ color: "var(--dim)" }}>
            {(meta.description ?? "").slice(0, 140) || "No description."}
            {(meta.description ?? "").length > 140 ? "…" : ""}
          </p>

          {meta.technologies.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {meta.technologies.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em]"
                  style={{ borderColor: "var(--line)", color: "var(--dim)" }}
                >
                  {tech}
                </span>
              ))}
              {meta.technologies.length > 5 && (
                <span className="font-mono text-[9px]" style={{ color: "var(--dim)" }}>
                  +{meta.technologies.length - 5}
                </span>
              )}
            </div>
          )}

          <div
            className="flex items-center justify-between border-t pt-4 font-mono text-[9px] uppercase tracking-[0.12em]"
            style={{ borderColor: "var(--line2)", color: "var(--dim)" }}
          >
            <span>{language ?? "—"}</span>
            <span>
              {new Date(updatedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
