"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

const reasonKeys = [
  { title: "why.t1", body: "why.d1" },
  { title: "why.t2", body: "why.d2" },
  { title: "why.t3", body: "why.d3" },
  { title: "why.t4", body: "why.d4" },
] as const

export default function WhyOpsBrain() {
  const { t } = useI18n()

  return (
    <section className="border-t border-line px-6 py-24 sm:px-[5vw]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-14 grid grid-cols-1 gap-7 md:grid-cols-[0.85fr_1fr] md:gap-20"
        >
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
              <span>{t("why.label")}</span>
              <span className="h-px w-8 bg-gold-border" />
            </div>
            <h2 className="font-serif text-[clamp(38px,9vw,56px)] font-normal leading-[1.05] tracking-[-0.035em] text-foreground">
              {t("why.h2")} <em className="italic text-gold">{t("why.h2.em")}</em>
            </h2>
          </div>

          <p className="max-w-[42rem] text-[16px] font-light leading-[1.9] text-muted md:pt-8">{t("why.p")}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {reasonKeys.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true, amount: 0.1 }}
              className="group rounded-2xl border border-line/70 bg-surface-1/35 p-7 transition-all hover:border-gold-border hover:bg-surface-1"
            >
              <h3 className="mb-3 font-serif text-[22px] leading-[1.15] text-foreground transition-colors group-hover:text-gold">
                {t(reason.title)}
              </h3>
              <p className="text-[15px] font-light leading-[1.85] text-muted">{t(reason.body)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
