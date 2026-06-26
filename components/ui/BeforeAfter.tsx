"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function BeforeAfter() {
  const { t } = useI18n()

  const beforeItems = [t("ba.b1"), t("ba.b2"), t("ba.b3"), t("ba.b4"), t("ba.b5")]
  const afterItems  = [t("ba.a1"), t("ba.a2"), t("ba.a3"), t("ba.a4"), t("ba.a5")]

  return (
    <section className="border-t border-line px-6 py-20 sm:px-[5vw]">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-10"
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
            <span>{t("ba.label")}</span>
            <span className="h-px w-8 bg-gold-border" />
          </div>
          <h2 className="font-serif text-[clamp(32px,7vw,48px)] font-normal leading-[1.06] tracking-[-0.03em] text-foreground">
            The same business.{" "}
            <em className="italic text-gold">A different operating layer.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="overflow-hidden rounded-2xl border border-line bg-surface-1/30"
          >
            <div className="flex items-center gap-2.5 border-b border-line bg-surface-1 px-6 py-4">
              <span className="h-2 w-2 rounded-full bg-red-500/60" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted sm:text-[10px]">
                {t("ba.before")}
              </span>
            </div>
            {beforeItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                viewport={{ once: true }}
                className="flex items-start gap-3.5 border-b border-line-2 px-6 py-4 last:border-b-0"
              >
                <span className="mt-[3px] shrink-0 text-[12px] text-faint opacity-60">✕</span>
                <span className="text-[14px] font-light leading-[1.75] text-muted">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
            className="overflow-hidden rounded-2xl border border-gold-border"
            style={{ background: "rgba(200,169,109,0.04)" }}
          >
            <div className="flex items-center gap-2.5 border-b border-gold-border/40 px-6 py-4"
              style={{ background: "rgba(200,169,109,0.07)" }}>
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold sm:text-[10px]">
                {t("ba.after")}
              </span>
            </div>
            {afterItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.25 + i * 0.06 }}
                viewport={{ once: true }}
                className="flex items-start gap-3.5 border-b border-line-2 px-6 py-4 last:border-b-0"
                style={{ borderColor: "rgba(200,169,109,0.1)" }}
              >
                <span className="mt-[3px] shrink-0 text-[13px] text-gold">✓</span>
                <span className="text-[14px] font-light leading-[1.75] text-foreground">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bridge line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 flex items-center justify-center gap-4 text-center"
        >
          <span className="h-px w-12 bg-line" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Built in under 3 weeks · Live with real clients
          </p>
          <span className="h-px w-12 bg-line" />
        </motion.div>

      </div>
    </section>
  )
}
