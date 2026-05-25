"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function Manifesto() {
  const { t } = useI18n()

  return (
    <section className="border-t border-line px-6 py-20 sm:px-[5vw] sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-18">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
            <span>{t("manifesto.label")}</span>
            <span className="h-px w-8 bg-gold-border" />
          </div>
          <h2 className="max-w-[11ch] font-serif text-[clamp(38px,11vw,58px)] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:max-w-none sm:leading-[1.08]">
            {t("manifesto.h2")}
            <br />
            <em className="italic text-gold">{t("manifesto.h2.em")}</em>
          </h2>
        </motion.div>

        <motion.div
          className="max-w-[42rem] md:pt-3"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="mb-7 h-px w-10 bg-gold opacity-40" />
          <div className="space-y-6">
            <p className="text-[16px] font-light leading-[1.9] text-muted">{t("manifesto.p1")}</p>
            <p className="text-[16px] font-light leading-[1.9] text-muted">{t("manifesto.p2")}</p>
            <p className="text-[16px] font-light leading-[1.9] text-muted">{t("manifesto.p3")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
