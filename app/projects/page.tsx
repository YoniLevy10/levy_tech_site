import { ProjectsNav } from "./projects-nav"
import { ProjectsClient } from "./projects-client"
import { fetchAllProjects } from "@/lib/github"
import type { Metadata } from "next"

export const revalidate = 21600

export const metadata: Metadata = {
  title: "Work",
  description: "Selected OpsBrain systems — BINO, Milo, Fixly, Moked, and Bamakor.",
  openGraph: {
    title: "Work — OpsBrain",
    description: "Selected OpsBrain systems — BINO, Milo, Fixly, Moked, and Bamakor.",
  },
}

export default async function ProjectsPage() {
  const projects = (await fetchAllProjects()).map((project) =>
    project.repoName === "OpticalCenter" ? { ...project, readme: null } : project
  )

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <ProjectsNav back={{ href: "/", label: "Back" }} />

      <section className="mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-[5vw]">
        <div
          className="mb-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] sm:text-[10px]"
          style={{ color: "var(--gold)" }}
        >
          <span>Selected work</span>
          <span className="h-px w-8" style={{ background: "var(--gold-bd)" }} />
        </div>
        <h1 className="font-serif text-[clamp(36px,9vw,56px)] font-normal leading-[1.05] tracking-[-0.035em]">
          Recent client{" "}
          <em className="italic" style={{ color: "var(--gold)" }}>
            systems.
          </em>
        </h1>
        <p className="mt-4 max-w-xl text-[15px] font-light leading-relaxed" style={{ color: "var(--dim)" }}>
          Five systems drawn from the public repositories. Short descriptions only; no invented metrics.
        </p>
      </section>

      <ProjectsClient projects={projects} />
    </div>
  )
}
