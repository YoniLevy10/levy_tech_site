"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

/** Honest case description — no invented testimonials or metrics. */
export default function CaseNote() {
  const { t } = useI18n()

  return (
    <section className="border-t border-line px-6 py-20 sm:px-[5vw]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.15 }}
          className="relative overflow-hidden rounded-2xl border border-gold-border/50 bg-gradient-to-br from-gold/[0.07] via-transparent to-transparent px-8 py-10 sm:px-12 sm:py-14"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
            <span>{t("case.label")}</span>
            <span className="h-px w-8 bg-gold-border" />
            <span className="text-muted">Bamakor</span>
          </div>

          <h3 className="mb-5 max-w-[22ch] font-serif text-[clamp(24px,4vw,36px)] font-normal leading-[1.15] tracking-[-0.03em] text-foreground">
            {t("case.title")}
          </h3>

          <p className="max-w-[48rem] text-[16px] font-light leading-[1.9] text-muted">{t("case.body")}</p>
        </motion.div>
      </div>
    </section>
  )
}
