"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function Manifesto() {
  const { t } = useI18n()

  return (
    <section className="px-[5vw] py-20 border-t border-line">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-18 items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[2.5px] uppercase text-gold mb-3">
            <span>{t("manifesto.label")}</span>
            <span className="w-8 h-px bg-gold-border" />
          </div>
          <h2 className="font-serif text-[clamp(34px,4.2vw,58px)] font-normal leading-[1.08] tracking-tight text-foreground">
            {t("manifesto.h2")}
            <br />
            <em className="italic text-gold">{t("manifesto.h2.em")}</em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="w-8 h-px bg-gold opacity-40 mb-6" />
          <p className="text-muted text-[15px] leading-relaxed font-light mb-4">
            {t("manifesto.p1")}
          </p>
          <p className="text-muted text-[15px] leading-relaxed font-light mb-4">
            {t("manifesto.p2")}
          </p>
          <p className="text-muted text-[15px] leading-relaxed font-light">
            {t("manifesto.p3")}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
