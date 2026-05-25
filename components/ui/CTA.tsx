"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

const auditItems = ["Operational map", "System blueprint", "Build estimate"]

export default function CTA() {
  const { t } = useI18n()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      className="relative mx-6 mb-20 grid grid-cols-1 items-center gap-10 overflow-hidden rounded-2xl border border-gold-border/70 bg-surface-1 p-8 sm:mx-[5vw] sm:p-12 md:grid-cols-[1fr_340px] md:gap-12 md:p-16"
    >
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div>
        <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
          <span>System Audit</span>
          <span className="h-px w-8 bg-gold-border" />
        </div>

        <div className="max-w-[12ch] font-serif text-[clamp(34px,10vw,48px)] leading-[1.08] text-foreground sm:max-w-none">
          {t("cta.title")} <em className="italic text-gold">{t("cta.title.em")}</em>
        </div>

        <p className="mt-4 max-w-[36rem] text-[15px] font-light leading-[1.9] text-muted sm:text-[16px]">
          {t("cta.sub")}
        </p>
      </div>

      <div className="z-10 rounded-xl border border-line bg-background/55 p-5">
        <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          What you get
        </div>

        <div className="mb-6 space-y-3">
          {auditItems.map((item) => (
            <div key={item} className="flex items-center gap-3 text-[14px] text-foreground">
              <span className="text-gold">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <a
          href="mailto:OpsBrain1@gmail.com"
          className="inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-6 py-4 text-[13px] font-medium tracking-wide text-background no-underline transition-all hover:-translate-y-0.5 hover:bg-gold-light"
        >
          {t("cta.btn1")} <span>→</span>
        </a>

        <a
          href="#contact"
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded border border-gold-border bg-transparent px-5 py-3 text-xs tracking-wide text-gold no-underline transition-all hover:bg-gold-bg"
        >
          {t("cta.btn2")}
        </a>

        <div className="mt-4 text-center font-mono text-[10px] tracking-wide text-muted">
          {t("cta.note")}
        </div>
      </div>
    </motion.div>
  )
}
