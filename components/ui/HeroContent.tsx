"use client"

import { useI18n } from "@/lib/i18n"
import { whatsappUrl, WHATSAPP_PREFILL_EN, WHATSAPP_PREFILL_HE, WHATSAPP_PREFILL_FR } from "@/lib/site"
import { motion } from "framer-motion"

export default function HeroContent() {
  const { t, lang } = useI18n()

  const waMessage =
    lang === "he" ? WHATSAPP_PREFILL_HE : lang === "fr" ? WHATSAPP_PREFILL_FR : WHATSAPP_PREFILL_EN

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[860px] flex-col items-center justify-center px-6 text-center sm:px-8">
      <motion.div
        className="mb-6 flex flex-col items-center gap-3 sm:mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-serif text-[clamp(28px,6vw,40px)] tracking-[-0.03em] text-gold">
          {t("hero.brand")}
        </span>
        <div className="flex max-w-full items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-muted sm:text-[10px]">
          <span className="hidden h-px w-6 bg-gold opacity-40 sm:block" />
          <span className="leading-relaxed">{t("hero.tag")}</span>
          <span className="hidden h-px w-6 bg-gold opacity-40 sm:block" />
        </div>
      </motion.div>

      <motion.h1
        className="mb-7 max-w-[12ch] font-serif text-[clamp(46px,13vw,88px)] font-normal leading-[0.97] tracking-[-0.045em] text-foreground sm:max-w-[13ch] sm:leading-[0.96]"
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
        className="mb-9 max-w-[38rem] text-[15px] font-light leading-[1.9] text-muted sm:mb-10 sm:text-[17px]"
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
          href={whatsappUrl(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded border border-gold-border px-7 py-4 text-[13px] tracking-wide text-gold no-underline transition-all hover:bg-gold-bg sm:w-auto"
        >
          {t("hero.cta.wa")}
        </a>
        <a
          href="#projects"
          className="text-[13px] tracking-wide text-muted no-underline transition-all hover:text-foreground sm:border-b sm:border-faint sm:pb-0.5 sm:hover:border-muted"
        >
          {t("hero.cta2")}
        </a>
      </motion.div>
    </div>
  )
}
