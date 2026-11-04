"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { I18nProvider, useI18n } from "@/lib/i18n"
import { PUBLIC_WORK, findPublicWork, type PublicWork } from "@/lib/public-work"
import Navigation from "@/components/ui/Navigation"
import Footer from "@/components/ui/Footer"
import { ArrowOut } from "@/components/ui/icons"
import { CyclingMedia } from "@/components/ui/cycling-media"

export function WorkIndex() {
  return (
    <I18nProvider>
      <WorkIndexBody />
    </I18nProvider>
  )
}

export function WorkDetail({ slug }: { slug: string }) {
  return (
    <I18nProvider>
      <WorkDetailBody slug={slug} />
    </I18nProvider>
  )
}

function WorkIndexBody() {
  const { t } = useI18n()

  return (
    <>
      <Navigation />
      <main className="px-6 py-16 sm:px-[5vw] sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted no-underline hover:text-gold"
          >
            <ChevronLeft aria-hidden className="size-3.5 rtl:-scale-x-100" />
            {t("proj.back")}
          </Link>
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            <span>{t("proj.label")}</span>
            <span className="h-px w-8 bg-gold-border" />
          </div>
          <h1 className="max-w-[14ch] font-serif text-[clamp(40px,8vw,64px)] font-normal leading-[1.05] tracking-[-0.035em] text-foreground">
            {t("proj.h2")} <em className="italic text-gold">{t("proj.h2.em")}</em>
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] font-light leading-[1.85] text-muted">{t("proj.intro")}</p>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            {PUBLIC_WORK.map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function WorkDetailBody({ slug }: { slug: string }) {
  const { t } = useI18n()
  const item = findPublicWork(slug)
  if (!item) return null

  return (
    <>
      <Navigation />
      <main className="px-6 py-16 sm:px-[5vw] sm:py-24">
        <article className="mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="mb-10 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted no-underline hover:text-gold"
          >
            <ChevronLeft aria-hidden className="size-3.5 rtl:-scale-x-100" />
            {t("proj.back")}
          </Link>
          <WorkMedia item={item} playLabel={t("video.play")} />
          <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{t(item.tagKey)}</div>
          <h1 className="mt-3 font-serif text-[clamp(40px,8vw,64px)] leading-none text-foreground">{item.title}</h1>
          <p className="mt-3 text-[13px] uppercase tracking-[0.12em] text-muted">{t(item.subKey)}</p>
          <p className="mt-6 max-w-2xl text-[17px] font-light leading-[1.85] text-muted">{t(item.descKey)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-gold-border bg-gold-bg px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
              {t(item.statusKey)}
            </span>
            <span className="text-[14px] font-light text-foreground">{t(item.focusKey)}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-1.5 text-[14px] text-gold no-underline hover:text-gold-light"
            >
              {t("proj.visit")} <ArrowOut />
            </a>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  )
}

function WorkCard({ item }: { item: PublicWork }) {
  const { t } = useI18n()

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-1">
      <WorkMedia item={item} playLabel={t("video.play")} />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{t(item.tagKey)}</div>
        <h2 className="font-serif text-[32px] leading-none text-foreground">
          <Link href={`/projects/${item.slug}`} className="no-underline hover:text-gold">
            {item.title}
          </Link>
        </h2>
        <div className="mt-2 text-[12px] uppercase tracking-[0.12em] text-muted">{t(item.subKey)}</div>
        <p className="mt-4 flex-1 text-[15px] font-light leading-[1.85] text-muted">{t(item.descKey)}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-gold-border bg-gold-bg px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
            {t(item.statusKey)}
          </span>
          <span className="text-[13px] font-light text-foreground">{t(item.focusKey)}</span>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link
            href={`/projects/${item.slug}`}
            className="inline-flex items-center gap-1.5 text-[13px] text-gold no-underline hover:text-gold-light"
          >
            {t("proj.more")} <ArrowOut />
          </Link>
          {item.href ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted no-underline hover:text-foreground"
            >
              {t("proj.visit")} <ArrowOut />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function WorkMedia({ item, playLabel }: { item: PublicWork; playLabel: string }) {
  return (
    <CyclingMedia
      title={item.title}
      image={item.image}
      images={item.images}
      video={item.video}
      portrait={item.portrait}
      contain={item.contain}
      playLabel={playLabel}
    />
  )
}
