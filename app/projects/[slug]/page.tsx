import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { WorkDetail } from "@/components/projects/work-pages"
import { PUBLIC_WORK, findPublicWork } from "@/lib/public-work"
import { translations } from "@/lib/translations"

export function generateStaticParams() {
  return PUBLIC_WORK.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = findPublicWork(slug)
  if (!item) return {}
  const description = translations.he[item.descKey]
  return {
    title: item.title,
    description,
    openGraph: {
      title: `${item.title} — OpsBrain`,
      description,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!findPublicWork(slug)) notFound()
  return <WorkDetail slug={slug} />
}
