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
      <main className="px-5 py-10 sm:px-[5vw] sm:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted no-underline hover:text-gold sm:mb-10"
          >
            <ChevronLeft aria-hidden className="size-3.5 rtl:-scale-x-100" />
            {t("proj.back")}
          </Link>
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            <span>{t("proj.label")}</span>
            <span className="h-px w-8 bg-gold-border" />
          </div>
          <h1 className="max-w-[14ch] font-serif text-[clamp(40px,8vw,64px)] font-normal leading-[1.12] tracking-[-0.035em] text-foreground sm:leading-[1.05]">
            {t("proj.h2")} <em className="italic text-gold">{t("proj.h2.em")}</em>
          </h1>
          <p className="mt-3 max-w-2xl text-[15px] font-light leading-relaxed text-muted sm:mt-5 sm:text-[16px]">{t("proj.intro")}</p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-14 md:grid-cols-2 md:gap-5">
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
      <main className="px-5 py-10 sm:px-[5vw] sm:py-24">
        <article className="mx-auto max-w-4xl">
          <Link
            href="/projects"
            className="mb-6 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted no-underline hover:text-gold sm:mb-10"
          >
            <ChevronLeft aria-hidden className="size-3.5 rtl:-scale-x-100" />
            {t("proj.back")}
          </Link>
          <WorkMedia item={item} playLabel={t("video.play")} />
          <div className="mt-6 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-gold sm:mt-8 sm:block">{t(item.tagKey)}</div>
          <h1 className="mt-3 font-serif text-[clamp(40px,8vw,64px)] leading-none text-foreground">{item.title}</h1>
          <p className="mt-2 text-[15px] font-light leading-snug text-muted sm:mt-3 sm:text-[13px] sm:uppercase sm:tracking-[0.12em]">
            {t(item.subKey)}
          </p>
          <p className="mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-muted sm:mt-6 sm:text-[17px]">{t(item.descKey)}</p>
          <p className="mt-3 text-[13px] leading-snug text-muted sm:hidden">
            <span className="text-gold">{t(item.statusKey)}</span>
            <span className="mx-1.5 text-faint">·</span>
            {t(item.focusKey)}
          </p>
          <div className="mt-6 hidden flex-wrap items-center gap-2 sm:flex">
            <span className="rounded-full border border-gold-border bg-gold-bg px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
              {t(item.statusKey)}
            </span>
            <span className="text-[14px] font-light text-foreground">{t(item.focusKey)}</span>
          </div>
          <div className="mt-4 hidden flex-wrap gap-2 sm:mt-5 sm:flex">
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
              className="mt-5 inline-flex items-center gap-1.5 text-[14px] text-gold no-underline hover:text-gold-light sm:mt-8"
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
      <div className="flex flex-1 flex-col p-4 sm:p-7">
        <div className="mb-3 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-gold sm:block">{t(item.tagKey)}</div>
        <h2 className="font-serif text-[26px] leading-none text-foreground sm:text-[32px]">
          <Link href={`/projects/${item.slug}`} className="no-underline hover:text-gold">
            {item.title}
          </Link>
        </h2>
        <p className="mt-2 text-[14px] font-light leading-snug text-muted sm:text-[12px] sm:uppercase sm:tracking-[0.12em]">
          {t(item.subKey)}
        </p>
        <p className="mt-4 hidden flex-1 text-[15px] font-light leading-relaxed text-muted sm:block">{t(item.descKey)}</p>
        <div className="mt-5 hidden flex-wrap items-center gap-2 sm:flex">
          <span className="rounded-full border border-gold-border bg-gold-bg px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
            {t(item.statusKey)}
          </span>
          <span className="text-[13px] font-light text-foreground">{t(item.focusKey)}</span>
        </div>
        <div className="mt-4 flex items-center gap-5">
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
