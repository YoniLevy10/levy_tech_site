"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function BeforeAfter() {
  const { t } = useI18n()

  const beforeItems = [
    t("ba.b1"),
    t("ba.b2"),
    t("ba.b3"),
    t("ba.b4"),
    t("ba.b5"),
  ]

  const afterItems = [
    t("ba.a1"),
    t("ba.a2"),
    t("ba.a3"),
    t("ba.a4"),
    t("ba.a5"),
  ]

  return (
    <section className="border-t border-line px-6 py-20 sm:px-[5vw]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]"
        >
          <span>{t("ba.label")}</span>
          <span className="h-px w-8 bg-gold-border" />
        </motion.div>

        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-[1fr_40px_1fr] md:gap-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="overflow-hidden rounded-2xl border border-line bg-surface-1/30"
          >
            <div className="border-b border-line bg-surface-1 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-muted sm:text-[10px]">
              {t("ba.before")}
            </div>
            {beforeItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 border-b border-line-2 px-5 py-4 text-[15px] font-light leading-[1.8] text-muted last:border-b-0"
              >
                <span className="mt-1 shrink-0 text-[11px] text-faint">✕</span>
                <span>{item}</span>
              </div>
            ))}
          </motion.div>

          <div className="flex items-center justify-center py-1 md:py-0">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true, amount: 0.1 }}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold-border text-sm text-gold md:h-7 md:w-7 md:text-xs md:rotate-0"
            >
              ↓
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
            className="overflow-hidden rounded-2xl border border-gold-border bg-gold/5"
          >
            <div className="border-b border-gold-border bg-gold/5 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-gold sm:text-[10px]">
              {t("ba.after")}
            </div>
            {afterItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 border-b border-line-2 px-5 py-4 text-[15px] font-light leading-[1.8] text-foreground last:border-b-0"
              >
                <span className="mt-1 shrink-0 text-[11px] text-gold">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
