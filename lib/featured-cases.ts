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
    tag: "Operations",
    sub: "Internal business system",
    desc: "A custom system for day-to-day operations — workflows, data, and team coordination in one place, shaped around how the company works.",
    status: "In use",
    focus: "Daily operations",
    stack: ["Operations", "Workflows", "Dashboard"],
  },
  {
    id: "Milo",
    title: "Milo",
    tag: "Retail",
    // Client anonymized as global retail chain (never publish the real brand name)
    sub: "Global retail chain · רשת חנויות גלובלית",
    desc: "Tools that help a global retail chain coordinate store and HQ work — clearer processes and better visibility across locations.",
    status: "In use",
    focus: "Multi-location operations",
    stack: ["Retail", "Multi-location", "Ops"],
  },
]
