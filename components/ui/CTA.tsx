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
      className="mx-[5vw] mb-20 p-16 border border-line rounded-xl bg-surface-1 relative overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center"
    >
      {/* Gold line accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div>
        <div className="font-serif text-[clamp(26px,3vw,42px)] font-normal leading-tight text-foreground">
          {t("cta.title")} <em className="italic text-gold">{t("cta.title.em")}</em>
        </div>
        <p className="text-muted text-sm leading-relaxed mt-3 font-light max-w-[460px]">
          {t("cta.sub")}
        </p>
      </div>

      <div className="flex flex-col gap-3 items-start md:items-end z-10 shrink-0">
        <a
          href="mailto:OpsBrain1@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-3 rounded bg-gold text-background text-[13px] font-medium tracking-wide no-underline transition-all hover:bg-gold-light hover:-translate-y-0.5"
        >
          {t("cta.btn1")} <span>→</span>
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-5 py-3 rounded bg-transparent border border-gold-border text-gold text-xs tracking-wide no-underline transition-all hover:bg-gold-bg"
        >
          {t("cta.btn2")}
        </a>
        <span className="text-[10px] text-muted font-mono tracking-wide">
          {t("cta.note")}
        </span>
      </div>
    </motion.div>
  )
}
