/** Public client systems shown on the marketing site. */

export type FeaturedCase = {
  id: "BINO" | "OPC" | "Fixly" | "Moked" | "Bamakor"
  title: string
  tag: string
  sub: string
  desc: string
  status: string
  focus: string
  stack: string[]
  href: string | null
}

/** English fallback copy. Home uses i18n. OPC stays unnamed beyond the public product. */
export const FEATURED_CASES: FeaturedCase[] = [
  {
    id: "BINO",
    title: "BINO",
    tag: "Buildings",
    sub: "Operating system for building managers",
    desc: "Tickets, residents, field workers, WhatsApp intake, attendance, and billing in one place for building-management companies.",
    status: "In use",
    focus: "Buildings and field teams",
    stack: ["Next.js", "Supabase", "WhatsApp"],
    href: "https://bino.casa",
  },
  {
    id: "OPC",
    title: "OPC",
    tag: "Retail",
    sub: "Multi-location maintenance",
    desc: "Tools for a retail chain to coordinate store maintenance and headquarters work, with clearer status across locations.",
    status: "Pilot",
    focus: "Store maintenance",
    stack: ["Next.js", "Supabase", "WhatsApp"],
    href: null,
  },
  {
    id: "Fixly",
    title: "Fixly",
    tag: "Trades",
    sub: "Execution network in Israel",
    desc: "Real demand is matched by trade, area, availability, and track record, then followed through to completion.",
    status: "Pilot",
    focus: "Matching and follow-through",
    stack: ["Next.js", "Supabase", "Stripe"],
    href: "https://fixly.tech",
  },
  {
    id: "Moked",
    title: "Moked",
    tag: "Automation",
    sub: "Desk for independent businesses",
    desc: "Turns inbound conversations into leads, bookings, reminders, and retention, with WhatsApp as the channel.",
    status: "In build",
    focus: "Leads and bookings",
    stack: ["Next.js", "Supabase", "WhatsApp"],
    href: "https://moked-ten.vercel.app",
  },
  {
    id: "Bamakor",
    title: "Bamakor",
    tag: "Web",
    sub: "Jerusalem property management",
    desc: "Marketing site in Hebrew, English, and French, with service pages and a path to request a quote.",
    status: "In use",
    focus: "Services and quotes",
    stack: ["Hebrew", "English", "French"],
    href: "https://www.bamakor.com",
  },
]
