"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function Testimonial() {
  const { t } = useI18n()

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
          <span>{t("testi.label")}</span>
          <span className="w-8 h-px bg-gold-border" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="border border-gold-border rounded-xl p-12 bg-gradient-to-br from-gold/[0.055] to-transparent relative overflow-hidden"
        >
          {/* Quote mark */}
          <div className="absolute -top-4 left-9 font-serif text-[130px] text-gold opacity-10 leading-none pointer-events-none select-none">
            &ldquo;
          </div>

          <blockquote className="font-serif text-[clamp(18px,2.2vw,26px)] font-normal italic text-foreground leading-relaxed max-w-[720px] mb-7 relative z-10">
            &ldquo;{t("testi.quote")}&rdquo;
          </blockquote>

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full border border-gold-border bg-gold-bg grid place-items-center font-serif text-lg text-gold shrink-0">
              S
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{t("testi.name")}</div>
              <div className="text-[11px] text-muted font-mono mt-0.5 tracking-wide">
                {t("testi.role")}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
