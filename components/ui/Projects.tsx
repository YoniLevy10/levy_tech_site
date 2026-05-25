"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

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

          <h2 className="max-w-[12ch] font-serif text-[clamp(38px,11vw,56px)] font-normal leading-[1.05] tracking-[-0.035em] text-foreground sm:max-w-none">
            {t("proj.h2")} <em className="italic text-gold">{t("proj.h2.em")}</em> {t("proj.h2.end")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-px md:overflow-hidden md:rounded-2xl md:border md:border-line md:bg-line-2">
          <ProjectCard
            title="Bamakor"
            tag={t("proj.bamakor.tag")}
            sub={t("proj.bamakor.sub")}
            desc={t("proj.bamakor.desc")}
            number="01"
            wide
          />

          <ProjectCard
            title="Naaryo"
            tag={t("proj.naaryo.tag")}
            sub={t("proj.naaryo.sub")}
            desc={t("proj.naaryo.desc")}
            number="02"
          />

          <ProjectCard
            title="Meditactic"
            tag={t("proj.meditactic.tag")}
            sub={t("proj.meditactic.sub")}
            desc={t("proj.meditactic.desc")}
            number="03"
          />

          <ProjectCard
            title="OpsBrain"
            tag={t("proj.opsbrain.tag")}
            sub={t("proj.opsbrain.sub")}
            desc={t("proj.opsbrain.desc")}
            number="04"
            wide
          />
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
  number,
  wide,
}: {
  title: string
  tag: string
  sub: string
  desc: string
  number: string
  wide?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-background p-7 transition-colors hover:bg-surface-1 sm:p-10 ${wide ? "md:col-span-2" : ""}`}
    >
      <div className="relative z-10 max-w-[420px]">
        <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.22em] text-gold opacity-80 sm:text-[10px]">
          {tag}
        </div>

        <div className="mb-2 font-serif text-[30px] leading-none text-foreground">
          {title}
        </div>

        <div className="mb-5 text-[11px] tracking-[0.12em] text-gold">
          {sub}
        </div>

        <p className="text-[15px] font-light leading-[1.9] text-muted">
          {desc}
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-4 right-5 font-serif text-[72px] italic leading-none text-faint opacity-20 sm:text-[88px]">
        {number}
      </div>
    </motion.div>
  )
}
