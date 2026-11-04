"use client"

import Link from "next/link"
import { useCallback, useEffect, useState, type ReactNode } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { PUBLIC_WORK } from "@/lib/public-work"
import { ArrowOut } from "@/components/ui/icons"
import { CyclingMedia } from "@/components/ui/cycling-media"

export default function Projects() {
  const { t, isRTL } = useI18n()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: isRTL ? "rtl" : "ltr",
    align: "start",
    containScroll: "trimSnaps",
  })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const sync = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.reInit({ direction: isRTL ? "rtl" : "ltr", align: "start", containScroll: "trimSnaps" })
    sync()
    emblaApi.on("select", sync)
    emblaApi.on("reInit", sync)
    return () => {
      emblaApi.off("select", sync)
      emblaApi.off("reInit", sync)
    }
  }, [emblaApi, isRTL, sync])

  return (
    <section id="projects" className="px-6 py-24 sm:px-[5vw]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
              <span>{t("proj.label")}</span>
              <span className="h-px w-8 bg-gold-border" />
            </div>
            <h2 className="max-w-[16ch] font-serif text-[clamp(38px,11vw,56px)] font-normal leading-[1.05] tracking-[-0.035em] text-foreground sm:max-w-none">
              {t("proj.h2")} <em className="italic text-gold">{t("proj.h2.em")}</em>
              {t("proj.h2.end") ? ` ${t("proj.h2.end")}` : null}
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] font-light leading-[1.85] text-muted">{t("proj.intro")}</p>
          </div>
          <div className="mb-1 flex shrink-0 gap-2">
            <CarouselButton label={t("proj.prev")} disabled={!canPrev} onClick={() => emblaApi?.scrollPrev()}>
              <ChevronLeft aria-hidden className="size-4 rtl:-scale-x-100" />
            </CarouselButton>
            <CarouselButton label={t("proj.next")} disabled={!canNext} onClick={() => emblaApi?.scrollNext()}>
              <ChevronRight aria-hidden className="size-4 rtl:-scale-x-100" />
            </CarouselButton>
          </div>
        </div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex items-stretch gap-4">
            {PUBLIC_WORK.map((item) => {
              return (
                <div key={item.slug} className="min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-8px)]">
                  <ProjectCard
                    title={item.title}
                    href={item.href}
                    tag={t(item.tagKey)}
                    sub={t(item.subKey)}
                    desc={t(item.descKey)}
                    status={t(item.statusKey)}
                    focus={t(item.focusKey)}
                    visitLabel={t("proj.visit")}
                    stack={item.stack}
                    image={item.image}
                    images={item.images}
                    video={item.video}
                    portrait={item.portrait}
                    contain={item.contain}
                    playLabel={t("video.play")}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold no-underline transition-opacity hover:opacity-75"
          >
            {t("proj.all")} <ArrowOut />
          </Link>
        </div>
      </div>
    </section>
  )
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-9 place-items-center rounded-full border border-line text-foreground transition-colors hover:border-gold-border hover:text-gold disabled:opacity-30"
    >
      {children}
    </button>
  )
}

function ProjectCard({
  title,
  href,
  tag,
  sub,
  desc,
  status,
  focus,
  visitLabel,
  stack,
  image,
  images,
  video,
  portrait,
  contain,
  playLabel,
}: {
  title: string
  href: string | null
  tag: string
  sub: string
  desc: string
  status: string
  focus: string
  visitLabel: string
  stack: string[]
  image: string | null
  images?: string[]
  video: string | null
  portrait?: boolean
  contain?: boolean
  playLabel: string
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface-1">
      <CyclingMedia
        title={title}
        image={image}
        images={images}
        video={video}
        portrait={portrait}
        contain={contain}
        playLabel={playLabel}
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
          {tag}
        </div>
        <h3 className="font-serif text-[32px] leading-none text-foreground">{title}</h3>
        <div className="mt-2 text-[12px] uppercase tracking-[0.12em] text-muted">{sub}</div>
        <p className="mt-4 flex-1 text-[15px] font-light leading-[1.85] text-muted">{desc}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-gold-border bg-gold-bg px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
            {status}
          </span>
          <span className="text-[13px] font-light text-foreground">{focus}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted"
            >
              {item}
            </span>
          ))}
        </div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-1.5 text-[13px] text-gold no-underline hover:text-gold-light"
          >
            {visitLabel} <ArrowOut />
          </a>
        ) : null}
      </div>
    </article>
  )
}

