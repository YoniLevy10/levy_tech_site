import type { Metadata } from "next"
import { WorkIndex } from "@/components/projects/work-pages"
import { translations } from "@/lib/translations"

export const metadata: Metadata = {
  title: translations.he["proj.h2"],
  description: translations.he["proj.intro"],
  openGraph: {
    title: `${translations.he["proj.h2"]} ${translations.he["proj.h2.em"]}`,
    description: translations.he["proj.intro"],
  },
}

export default function ProjectsPage() {
  return <WorkIndex />
}
