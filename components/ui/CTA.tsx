"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function CTA() {
  const { t } = useI18n()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      className="relative mx-6 mb-20 grid grid-cols-1 items-center gap-10 overflow-hidden rounded-2xl border border-line bg-surface-1 p-8 sm:mx-[5vw] sm:p-12 md:grid-cols-[1fr_auto] md:gap-12 md:p-16"
    >
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div>
        <div className="max-w-[12ch] font-serif text-[clamp(34px,10vw,46px)] leading-[1.08] text-foreground sm:max-w-none">
          {t("cta.title")} <em className="italic text-gold">{t("cta.title.em")}</em>
        </div>

        <p className="mt-4 max-w-[34rem] text-[15px] font-light leading-[1.9] text-muted sm:text-[16px]">
          {t("cta.sub")}
        </p>
      </div>

      <div className="z-10 flex flex-col items-stretch gap-3 sm:items-start md:items-end">
        <a
          href="mailto:OpsBrain1@gmail.com"
          className="inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-6 py-4 text-[13px] font-medium tracking-wide text-background no-underline transition-all hover:-translate-y-0.5 hover:bg-gold-light sm:w-auto"
        >
          {t("cta.btn1")} <span>→</span>
        </a>

        <a
          href="#"
          className="inline-flex w-full items-center justify-center gap-2 rounded border border-gold-border bg-transparent px-5 py-3 text-xs tracking-wide text-gold no-underline transition-all hover:bg-gold-bg sm:w-auto"
        >
          {t("cta.btn2")}
        </a>

        <span className="text-center font-mono text-[10px] tracking-wide text-muted sm:text-left md:text-right">
          {t("cta.note")}
        </span>
      </div>
    </motion.div>
  )
}
