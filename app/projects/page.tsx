import { fetchAllProjects, fetchGitHubStats } from "@/lib/github"
import { ProjectsClient } from "./projects-client"
import { ProjectsNav } from "./projects-nav"
import type { Metadata } from "next"

export const revalidate = 21600

export const metadata: Metadata = {
  title: "Projects — Levy Tech",
  description: "Every product and SaaS system built by Levy Tech, auto-synced from GitHub.",
  openGraph: {
    title: "Projects — Levy Tech",
    description: "Every product and SaaS system built by Levy Tech, auto-synced from GitHub.",
  },
}

export default async function ProjectsPage() {
  // Both calls share the in-memory cache — only one GitHub round-trip
  const [projects, stats] = await Promise.all([
    fetchAllProjects(),
    fetchGitHubStats(),
  ])

  const statItems = [
    { label: "Products", value: stats.totalProjects },
    { label: "Active", value: stats.activeProjects },
    { label: "Production", value: stats.productionSystems },
    { label: "Commits (30d)", value: stats.commits30Days },
    { label: "Languages", value: stats.languagesUsed },
  ]

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <ProjectsNav back={{ href: "/", label: "Back" }} />

      {/* Stats bar */}
      <div className="border-b" style={{ borderColor: "var(--line)", background: "var(--s1)" }}>
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-[5vw]">
          <div className="flex flex-wrap gap-8">
            {statItems.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="tabular-nums font-serif text-2xl" style={{ color: "var(--gold)" }}>
                  {value}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--dim)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-[5vw]">
        <div
          className="mb-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] sm:text-[10px]"
          style={{ color: "var(--gold)" }}
        >
          <span>Portfolio</span>
          <span className="h-px w-8" style={{ background: "var(--gold-bd)" }} />
        </div>
        <h1 className="font-serif text-[clamp(36px,9vw,56px)] font-normal leading-[1.05] tracking-[-0.035em]">
          Every product,{" "}
          <em className="italic" style={{ color: "var(--gold)" }}>
            auto-synced
          </em>{" "}
          from GitHub
        </h1>
        <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: "var(--dim)" }}>
          {projects.length} {projects.length === 1 ? "product" : "products"} · updates every 6 hours
        </p>
      </section>

      <ProjectsClient projects={projects} />
    </div>
  )
}
