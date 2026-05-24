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
    <section className="px-[5vw] py-20 border-t border-line">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="flex items-center gap-3 font-mono text-[10px] tracking-[2.5px] uppercase text-gold mb-8"
        >
          <span>{t("ba.label")}</span>
          <span className="w-8 h-px bg-gold-border" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-0 items-stretch">
          {/* Before column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="border border-line rounded-lg overflow-hidden"
          >
            <div className="px-5 py-3.5 border-b border-line font-mono text-[10px] tracking-widest uppercase text-muted bg-surface-1">
              {t("ba.before")}
            </div>
            {beforeItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 px-5 py-3 border-b border-line-2 last:border-b-0 text-[13px] text-muted font-light leading-relaxed"
              >
                <span className="text-faint text-[11px] mt-0.5 shrink-0">✕</span>
                <span>{item}</span>
              </div>
            ))}
          </motion.div>

          {/* Arrow */}
          <div className="flex items-center justify-center py-4 md:py-0">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: true, amount: 0.1 }}
              className="w-7 h-7 rounded-full border border-gold-border grid place-items-center text-gold text-xs rotate-90 md:rotate-0"
            >
              →
            </motion.div>
          </div>

          {/* After column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
            className="border border-gold-border rounded-lg overflow-hidden"
          >
            <div className="px-5 py-3.5 border-b border-gold-border font-mono text-[10px] tracking-widest uppercase text-gold bg-gold/5">
              {t("ba.after")}
            </div>
            {afterItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 px-5 py-3 border-b border-line-2 last:border-b-0 text-[13px] text-foreground font-light leading-relaxed"
              >
                <span className="text-gold text-[11px] mt-0.5 shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
