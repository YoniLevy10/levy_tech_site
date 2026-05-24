"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function HeroContent() {
  const { t } = useI18n()

  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-[780px] mx-auto px-4">
      {/* Tag line */}
      <motion.div 
        className="flex items-center gap-3 font-mono text-[10px] tracking-[2.5px] uppercase text-gold mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="w-6 h-px bg-gold opacity-55" />
        <span>{t("hero.tag")}</span>
      </motion.div>

      {/* Main heading */}
      <motion.h1 
        className="font-serif text-[clamp(40px,8vw,90px)] font-normal leading-[0.95] tracking-[-2px] text-foreground mb-6"
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

      {/* Subtitle */}
      <motion.p 
        className="text-muted text-[clamp(14px,1.8vw,17px)] leading-relaxed font-light max-w-[520px] mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t("hero.sub")}
      </motion.p>

      {/* CTA buttons */}
      <motion.div 
        className="flex items-center justify-center gap-5 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <a 
          href="#contact" 
          className="inline-flex items-center gap-2 px-7 py-4 rounded bg-gold text-background text-[13px] font-medium tracking-wide no-underline transition-all hover:bg-gold-light hover:-translate-y-0.5"
        >
          {t("hero.cta1")} <span aria-hidden="true">→</span>
        </a>
        <a 
          href="#projects" 
          className="text-muted text-[13px] tracking-wide no-underline border-b border-faint pb-0.5 transition-all hover:text-foreground hover:border-muted"
        >
          {t("hero.cta2")}
        </a>
      </motion.div>

      {/* Metrics */}
      <motion.div 
        className="flex gap-0 mt-14 border border-line rounded-lg overflow-hidden backdrop-blur-xl bg-background/60 max-w-[420px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex-1 px-5 py-4 border-r border-line text-center">
          <div className="font-serif text-2xl text-foreground leading-none">4</div>
          <div className="text-[9px] text-muted mt-1 font-mono tracking-wider">{t("hero.m1")}</div>
        </div>
        <div className="flex-1 px-5 py-4 border-r border-line text-center">
          <div className="font-serif text-2xl text-foreground leading-none">AI</div>
          <div className="text-[9px] text-muted mt-1 font-mono tracking-wider">{t("hero.m2")}</div>
        </div>
        <div className="flex-1 px-5 py-4 text-center">
          <div className="font-serif text-2xl text-foreground leading-none">24/7</div>
          <div className="text-[9px] text-muted mt-1 font-mono tracking-wider">{t("hero.m3")}</div>
        </div>
      </motion.div>
    </div>
  )
}
