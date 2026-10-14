/** Marketing featured cases — keep the public surface sparse. */

export type FeaturedCase = {
  id: "BINO" | "Milo"
  title: string
  tag: string
  sub: string
  desc: string
  status: string
  focus: string
  stack: string[]
}

/** English fallback copy used on server-rendered /projects. Home uses i18n. */
export const FEATURED_CASES: FeaturedCase[] = [
  {
    id: "BINO",
    title: "BINO",
    tag: "Operations Platform",
    sub: "Business Operations System",
    desc: "A custom operations layer that connects day-to-day workflows, data and team coordination into one clear system tailored to how the business runs.",
    status: "Client system",
    focus: "Unified day-to-day ops",
    stack: ["Operations", "Workflows", "Dashboard"],
  },
  {
    id: "Milo",
    title: "Milo",
    tag: "Retail Operations",
    // Client anonymized as global retail chain (never publish the real brand name)
    sub: "Global retail chain · רשת חנויות גלובלית",
    desc: "Operational tooling for a global retail chain — helping store and HQ teams coordinate processes, visibility and day-to-day work across locations.",
    status: "Client system",
    focus: "Cross-location coordination",
    stack: ["Retail", "Multi-location", "Ops"],
  },
]
