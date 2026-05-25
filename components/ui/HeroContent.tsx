"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function HeroContent() {
  const { t } = useI18n()

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[780px] flex-col items-center justify-center px-6 text-center sm:px-8">
      <motion.div
        className="mb-6 flex max-w-full items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:mb-8 sm:text-[10px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="hidden h-px w-6 bg-gold opacity-55 sm:block" />
        <span className="leading-relaxed">{t("hero.tag")}</span>
      </motion.div>

      <motion.h1
        className="mb-6 max-w-[11ch] font-serif text-[clamp(46px,14vw,90px)] font-normal leading-[0.96] tracking-[-0.045em] text-foreground sm:max-w-none sm:leading-[0.95]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {t("hero.h1")}
        <br />
        <em className="italic text-gold">{t("hero.h1.em")}</em>
        <br />
        {t("hero.h1.end")}
      </motion.h1>

      <motion.p
        className="mb-9 max-w-[32rem] text-[15px] font-light leading-[1.85] text-muted sm:mb-10 sm:text-[17px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t("hero.sub")}
      </motion.p>

      <motion.div
        className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <a
          href="#contact"
          className="inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-7 py-4 text-[13px] font-medium tracking-wide text-background no-underline transition-all hover:-translate-y-0.5 hover:bg-gold-light sm:w-auto"
        >
          {t("hero.cta1")} <span aria-hidden="true">→</span>
        </a>
        <a
          href="#projects"
          className="text-[13px] tracking-wide text-muted no-underline transition-all hover:text-foreground sm:border-b sm:border-faint sm:pb-0.5 sm:hover:border-muted"
        >
          {t("hero.cta2")}
        </a>
      </motion.div>

      <motion.div
        className="mt-12 grid w-full max-w-[420px] grid-cols-3 overflow-hidden rounded-lg border border-line bg-background/60 backdrop-blur-xl sm:mt-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="border-r border-line px-3 py-4 text-center sm:px-5">
          <div className="font-serif text-2xl leading-none text-foreground">4</div>
          <div className="mt-2 font-mono text-[8px] tracking-[0.16em] text-muted sm:text-[9px]">{t("hero.m1")}</div>
        </div>
        <div className="border-r border-line px-3 py-4 text-center sm:px-5">
          <div className="font-serif text-2xl leading-none text-foreground">AI</div>
          <div className="mt-2 font-mono text-[8px] tracking-[0.16em] text-muted sm:text-[9px]">{t("hero.m2")}</div>
        </div>
        <div className="px-3 py-4 text-center sm:px-5">
          <div className="font-serif text-2xl leading-none text-foreground">24/7</div>
          <div className="mt-2 font-mono text-[8px] tracking-[0.16em] text-muted sm:text-[9px]">{t("hero.m3")}</div>
        </div>
      </motion.div>
    </div>
  )
}
