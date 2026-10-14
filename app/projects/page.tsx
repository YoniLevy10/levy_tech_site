import { ProjectsNav } from "./projects-nav"
import { FEATURED_CASES } from "@/lib/featured-cases"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Work",
  description: "Selected OpsBrain client systems — BINO and Milo.",
  openGraph: {
    title: "Work — OpsBrain",
    description: "Selected OpsBrain client systems — BINO and Milo.",
  },
}

export default function ProjectsPage() {
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
          BINO and Milo — a global retail chain. Short descriptions only; no invented metrics.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-[5vw]">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {FEATURED_CASES.map((item, index) => (
            <article
              key={item.id}
              className="relative overflow-hidden rounded-2xl border p-7 sm:p-10"
              style={{ borderColor: "var(--line)", background: "var(--bg)" }}
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_220px]">
                <div className="max-w-[560px]">
                  <div
                    className="mb-4 font-mono text-[9px] uppercase tracking-[0.22em] sm:text-[10px]"
                    style={{ color: "var(--gold)" }}
                  >
                    {item.tag}
                  </div>
                  <div className="mb-2 font-serif text-[34px] leading-none">{item.title}</div>
                  <div
                    className="mb-5 text-[11px] uppercase tracking-[0.14em]"
                    style={{ color: "var(--gold)" }}
                  >
                    {item.sub}
                  </div>
                  <p className="text-[15px] font-light leading-[1.9]" style={{ color: "var(--dim)" }}>
                    {item.desc}
                  </p>
                </div>
                <div
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--line)", background: "rgba(13,13,13,0.55)" }}
                >
                  <div
                    className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em]"
                    style={{ color: "var(--dim)" }}
                  >
                    Status
                  </div>
                  <div
                    className="mb-5 rounded-full border px-3 py-1.5 text-center font-mono text-[9px] uppercase tracking-[0.14em]"
                    style={{
                      borderColor: "var(--gold-bd)",
                      background: "rgba(200,169,109,0.09)",
                      color: "var(--gold)",
                    }}
                  >
                    {item.status}
                  </div>
                  <div
                    className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em]"
                    style={{ color: "var(--dim)" }}
                  >
                    Focus
                  </div>
                  <p className="mb-5 text-[13px] font-light leading-[1.75]">{item.focus}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em]"
                        style={{ borderColor: "var(--line)", color: "var(--dim)" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="pointer-events-none absolute bottom-4 right-5 font-serif text-[72px] italic leading-none opacity-15 sm:text-[88px]"
                style={{ color: "var(--faint)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
