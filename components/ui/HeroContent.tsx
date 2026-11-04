"use client"

import { useI18n } from "@/lib/i18n"
import { whatsappUrl, WHATSAPP_PREFILL_EN, WHATSAPP_PREFILL_HE, WHATSAPP_PREFILL_FR } from "@/lib/site"
import { motion } from "framer-motion"
import { TextRise } from "@/components/motion/text-rise"
import { ArrowForward } from "@/components/ui/icons"

export default function HeroContent() {
  const { t, lang } = useI18n()

  const waMessage =
    lang === "he" ? WHATSAPP_PREFILL_HE : lang === "fr" ? WHATSAPP_PREFILL_FR : WHATSAPP_PREFILL_EN
  const h1End = t("hero.h1.end")

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-[860px] flex-col items-center justify-center px-0 text-center sm:px-8">
      <motion.div
        className="mb-4 flex flex-col items-center gap-2 sm:mb-8 sm:gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="font-serif text-[clamp(28px,6vw,40px)] tracking-[-0.03em] text-gold">
          {t("hero.brand")}
        </span>
        <div className="flex max-w-full items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted sm:text-[10px]">
          <span className="hidden h-px w-6 bg-gold opacity-40 sm:block" />
          <span className="leading-relaxed">{t("hero.tag")}</span>
          <span className="hidden h-px w-6 bg-gold opacity-40 sm:block" />
        </div>
      </motion.div>

      <motion.h1
        className="mb-4 max-w-[16ch] font-serif text-[clamp(36px,9vw,64px)] font-normal leading-[1.16] tracking-[-0.035em] text-foreground sm:mb-7 sm:max-w-[20ch] sm:leading-[1.12]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {t("hero.h1")}
        <br />
        <em className="italic text-gold">
          <TextRise text={t("hero.h1.em")} />
        </em>
        {h1End ? (
          <>
            <br />
            {h1End}
          </>
        ) : null}
      </motion.h1>

      <motion.p
        className="mb-6 max-w-[28rem] text-[15px] font-light leading-relaxed text-muted sm:mb-10 sm:text-[17px] sm:leading-[1.75]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t("hero.sub")}
      </motion.p>

      <motion.div
        className="grid w-full max-w-sm grid-cols-2 items-center gap-3 sm:flex sm:w-auto sm:max-w-none sm:items-center sm:gap-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <a
          href="#contact"
          className="inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-4 py-3 text-[13px] font-medium tracking-wide text-background no-underline transition-all hover:-translate-y-0.5 hover:bg-gold-light sm:w-auto sm:px-7 sm:py-4"
        >
          {t("hero.cta1")} <ArrowForward />
        </a>
        <a
          href={whatsappUrl(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded border border-gold-border px-4 py-3 text-[13px] tracking-wide text-gold no-underline transition-all hover:bg-gold-bg sm:w-auto sm:px-7 sm:py-4"
        >
          {t("hero.cta.wa")}
        </a>
        <a
          href="#projects"
          className="col-span-2 self-center text-center text-[13px] leading-none tracking-wide text-muted no-underline transition-all hover:text-foreground sm:col-auto sm:border-b sm:border-faint sm:pb-0.5 sm:text-start sm:hover:border-muted"
        >
          {t("hero.cta2")}
        </a>
      </motion.div>
    </div>
  )
}
