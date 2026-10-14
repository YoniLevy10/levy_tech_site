"use client"

import { useI18n } from "@/lib/i18n"
import type { TranslationKey } from "@/lib/translations"
import { motion } from "framer-motion"

type ProjectId = "BINO" | "Milo"

const meta: Record<
  ProjectId,
  {
    title: string
    tagKey: TranslationKey
    subKey: TranslationKey
    descKey: TranslationKey
    statusKey: TranslationKey
    focusKey: TranslationKey
    stack: string[]
  }
> = {
  BINO: {
    title: "BINO",
    tagKey: "proj.bino.tag",
    subKey: "proj.bino.sub",
    descKey: "proj.bino.desc",
    statusKey: "proj.bino.status",
    focusKey: "proj.bino.focus",
    stack: ["Operations", "Workflows", "Dashboard"],
  },
  Milo: {
    title: "Milo",
    tagKey: "proj.milo.tag",
    subKey: "proj.milo.sub",
    descKey: "proj.milo.desc",
    statusKey: "proj.milo.status",
    focusKey: "proj.milo.focus",
    stack: ["Retail", "Multi-location", "Ops"],
  },
}

const order: ProjectId[] = ["BINO", "Milo"]

export default function Projects() {
  const { t } = useI18n()

  return (
    <section id="projects" className="px-6 py-24 sm:px-[5vw]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-12"
        >
          <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
            <span>{t("proj.label")}</span>
            <span className="h-px w-8 bg-gold-border" />
          </div>
          <h2 className="max-w-[16ch] font-serif text-[clamp(38px,11vw,56px)] font-normal leading-[1.05] tracking-[-0.035em] text-foreground sm:max-w-none">
            {t("proj.h2")} <em className="italic text-gold">{t("proj.h2.em")}</em>
            {t("proj.h2.end") ? ` ${t("proj.h2.end")}` : null}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {order.map((id, index) => {
            const item = meta[id]
            return (
              <ProjectCard
                key={id}
                title={item.title}
                tag={t(item.tagKey)}
                sub={t(item.subKey)}
                desc={t(item.descKey)}
                statusLabel={t("proj.status")}
                status={t(item.statusKey)}
                focusLabel={t("proj.focus")}
                focus={t(item.focusKey)}
                stack={item.stack}
                number={String(index + 1).padStart(2, "0")}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  title,
  tag,
  sub,
  desc,
  statusLabel,
  status,
  focusLabel,
  focus,
  stack,
  number,
}: {
  title: string
  tag: string
  sub: string
  desc: string
  statusLabel: string
  status: string
  focusLabel: string
  focus: string
  stack: string[]
  number: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-background p-7 transition-colors hover:border-gold-border hover:bg-surface-1 sm:p-10"
    >
      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_240px]">
        <div className="max-w-[560px]">
          <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.22em] text-gold opacity-80 sm:text-[10px]">{tag}</div>
          <div className="mb-2 font-serif text-[34px] leading-none text-foreground">{title}</div>
          <div className="mb-5 text-[11px] uppercase tracking-[0.14em] text-gold">{sub}</div>
          <p className="text-[15px] font-light leading-[1.9] text-muted">{desc}</p>
        </div>

        <div className="rounded-xl border border-line bg-surface-1/35 p-5">
          <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">{statusLabel}</div>
          <div className="mb-5 rounded-full border border-gold-border bg-gold-bg px-3 py-1.5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
            {status}
          </div>
          <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">{focusLabel}</div>
          <p className="mb-5 text-[13px] font-light leading-[1.75] text-foreground">{focus}</p>
          <div className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <span key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-5 font-serif text-[72px] italic leading-none text-faint opacity-15 sm:text-[88px]">
        {number}
      </div>
    </motion.div>
  )
}
