import type { TranslationKey } from "@/lib/translations"

export type PublicWork = {
  slug: string
  title: string
  href: string | null
  image: string | null
  video: string | null
  portrait?: boolean
  stack: string[]
  tagKey: TranslationKey
  subKey: TranslationKey
  descKey: TranslationKey
  statusKey: TranslationKey
  focusKey: TranslationKey
}

export const PUBLIC_WORK: PublicWork[] = [
  {
    slug: "bino",
    title: "BINO",
    href: "https://bino.casa",
    image: "/videos/opsbrain-promo-poster.jpg",
    video: "/videos/opsbrain-promo.mp4",
    portrait: true,
    stack: ["Next.js", "Supabase", "WhatsApp"],
    tagKey: "proj.bino.tag",
    subKey: "proj.bino.sub",
    descKey: "proj.bino.desc",
    statusKey: "proj.bino.status",
    focusKey: "proj.bino.focus",
  },
  {
    slug: "opc",
    title: "OPC",
    href: "https://opc-jerusalem.vercel.app",
    image: "/work/opc-login.jpg",
    video: null,
    stack: ["Next.js", "Supabase", "WhatsApp"],
    tagKey: "proj.opc.tag",
    subKey: "proj.opc.sub",
    descKey: "proj.opc.desc",
    statusKey: "proj.opc.status",
    focusKey: "proj.opc.focus",
  },
  {
    slug: "fixly",
    title: "Fixly",
    href: "https://fixly.tech",
    image: "/work/fixly.jpg",
    video: "/work/videos/fixly.mp4",
    portrait: true,
    stack: ["Next.js", "Supabase", "Stripe"],
    tagKey: "proj.fixly.tag",
    subKey: "proj.fixly.sub",
    descKey: "proj.fixly.desc",
    statusKey: "proj.fixly.status",
    focusKey: "proj.fixly.focus",
  },
  {
    slug: "moked",
    title: "Moked",
    href: "https://moked-ten.vercel.app",
    image: "/work/moked.jpg",
    video: null,
    stack: ["Next.js", "Supabase", "WhatsApp"],
    tagKey: "proj.moked.tag",
    subKey: "proj.moked.sub",
    descKey: "proj.moked.desc",
    statusKey: "proj.moked.status",
    focusKey: "proj.moked.focus",
  },
  {
    slug: "bamakor",
    title: "Bamakor",
    href: "https://www.bamakor.com",
    image: "/work/bamakor.jpg",
    video: null,
    stack: ["Hebrew", "English", "French"],
    tagKey: "proj.bamakor.tag",
    subKey: "proj.bamakor.sub",
    descKey: "proj.bamakor.desc",
    statusKey: "proj.bamakor.status",
    focusKey: "proj.bamakor.focus",
  },
]

export function findPublicWork(slug: string) {
  return PUBLIC_WORK.find((item) => item.slug === slug) ?? null
}
