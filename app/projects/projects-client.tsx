"use client"

import { useState, useMemo } from "react"
import type { ProjectData } from "@/lib/github"
import { ProjectCard } from "./project-card"

const STATUSES = ["Production", "Pilot", "Development", "Paused", "Archived"] as const
const CATEGORIES = ["AI SaaS", "ERP", "Marketplace", "Finance", "Automation", "PropTech", "IoT", "Web"]

type Status = (typeof STATUSES)[number]

export function ProjectsClient({ projects }: { projects: ProjectData[] }) {
  const [query, setQuery] = useState("")
  const [activeStatus, setActiveStatus] = useState<Status | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (activeStatus && p.meta.status !== activeStatus) return false
      if (activeCategory && p.meta.category !== activeCategory) return false
      if (query) {
        const q = query.toLowerCase()
        const inTitle = p.meta.title.toLowerCase().includes(q)
        const inDesc = p.meta.description?.toLowerCase().includes(q) ?? false
        const inTags = p.meta.tags.some((t) => t.toLowerCase().includes(q))
        const inTech = p.meta.technologies.some((t) => t.toLowerCase().includes(q))
        if (!inTitle && !inDesc && !inTags && !inTech) return false
      }
      return true
    })
  }, [projects, query, activeStatus, activeCategory])

  const featured = filtered.filter((p) => p.meta.featured)
  const rest = filtered.filter((p) => !p.meta.featured)

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-[5vw]">
      {/* ── Filters ── */}
      <div className="mb-10 space-y-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products, technologies, tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors"
          style={{
            background: "var(--s1)",
            borderColor: "var(--line)",
            color: "var(--text)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--gold-bd)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
        />

        {/* Status pills */}
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setActiveStatus(activeStatus === s ? null : s)}
              className="rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-all"
              style={{
                borderColor: activeStatus === s ? "var(--gold-bd)" : "var(--line)",
                background: activeStatus === s ? "var(--gold-bg)" : "transparent",
                color: activeStatus === s ? "var(--gold)" : "var(--dim)",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(activeCategory === c ? null : c)}
              className="rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-all"
              style={{
                borderColor: activeCategory === c ? "var(--line2)" : "transparent",
                background: activeCategory === c ? "var(--s2)" : "transparent",
                color: activeCategory === c ? "var(--text)" : "var(--dim)",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Empty ── */}
      {filtered.length === 0 && (
        <div className="py-24 text-center font-mono text-sm" style={{ color: "var(--dim)" }}>
          {projects.length === 0
            ? "No projects found. Make sure GITHUB_TOKEN is set and repos have portfolio.json with visibility: true."
            : "No projects match your filters."}
        </div>
      )}

      {/* ── Featured ── */}
      {featured.length > 0 && (
        <section className="mb-14">
          <div className="mb-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{ color: "var(--dim)" }}>
            <span>Featured</span>
            <span className="h-px flex-1" style={{ background: "var(--line)" }} />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      {/* ── All ── */}
      {rest.length > 0 && (
        <section>
          <div className="mb-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{ color: "var(--dim)" }}>
            <span>All Projects</span>
            <span className="h-px flex-1" style={{ background: "var(--line)" }} />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
