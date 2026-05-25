"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

const badges = ["AI Systems", "Business Automation", "SaaS MVPs"]

export default function HeroContent() {
  const { t } = useI18n()

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[840px] flex-col items-center justify-center px-6 text-center sm:px-8">
      <motion.div className="mb-5 flex max-w-full items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:mb-7 sm:text-[10px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="hidden h-px w-6 bg-gold opacity-55 sm:block" />
        <span className="leading-relaxed">{t("hero.tag")}</span>
      </motion.div>

      <motion.div className="mb-6 flex flex-wrap items-center justify-center gap-2" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
        {badges.map((badge) => <span key={badge} className="rounded-full border border-line bg-surface-1/60 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">{badge}</span>)}
      </motion.div>

      <motion.h1 className="mb-7 max-w-[12ch] font-serif text-[clamp(46px,13vw,88px)] font-normal leading-[0.97] tracking-[-0.045em] text-foreground sm:max-w-[13ch] sm:leading-[0.96]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
        {t("hero.h1")}<br /><em className="italic text-gold">{t("hero.h1.em")}</em><br />{t("hero.h1.end")}
      </motion.h1>

      <motion.p className="mb-9 max-w-[38rem] text-[15px] font-light leading-[1.9] text-muted sm:mb-10 sm:text-[17px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        {t("hero.sub")}
      </motion.p>

      <motion.div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <a href="#contact" className="inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-7 py-4 text-[13px] font-medium tracking-wide text-background no-underline transition-all hover:-translate-y-0.5 hover:bg-gold-light sm:w-auto">{t("hero.cta1")} <span aria-hidden="true">→</span></a>
        <a href="#projects" className="text-[13px] tracking-wide text-muted no-underline transition-all hover:text-foreground sm:border-b sm:border-faint sm:pb-0.5 sm:hover:border-muted">{t("hero.cta2")}</a>
      </motion.div>

      <motion.div className="mt-12 grid w-full max-w-[480px] grid-cols-3 overflow-hidden rounded-xl border border-line bg-background/60 backdrop-blur-xl sm:mt-14" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
        <Metric value="4" label={t("hero.m1")} />
        <Metric value="AI" label={t("hero.m2")} />
        <Metric value="24/7" label={t("hero.m3")} last />
      </motion.div>
    </div>
  )
}

function Metric({ value, label, last = false }: { value: string; label: string; last?: boolean }) {
  return (
    <div className={`${last ? "" : "border-r border-line"} px-3 py-4 text-center sm:px-5`}>
      <div className="font-serif text-2xl leading-none text-foreground">{value}</div>
      <div className="mt-2 font-mono text-[8px] tracking-[0.16em] text-muted sm:text-[9px]">{label}</div>
    </div>
  )
}
