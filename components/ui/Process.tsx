"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function Process() {
  const { t } = useI18n()

  const steps = [
    { num: "01", title: t("proc.t1"), desc: t("proc.d1") },
    { num: "02", title: t("proc.t2"), desc: t("proc.d2") },
    { num: "03", title: t("proc.t3"), desc: t("proc.d3") },
    { num: "04", title: t("proc.t4"), desc: t("proc.d4") },
    { num: "05", title: t("proc.t5"), desc: t("proc.d5") },
  ]

  return (
    <section id="process" className="px-[5vw] py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[2.5px] uppercase text-gold mb-3">
            <span>{t("proc.label")}</span>
            <span className="w-8 h-px bg-gold-border" />
          </div>
          <h2 className="font-serif text-[clamp(30px,4vw,52px)] font-normal leading-[1.08] tracking-tight text-foreground mb-10">
            {t("proc.h2")} <em className="italic text-gold">{t("proc.h2.em")}</em> {t("proc.h2.end")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-line-2 border border-line rounded-lg overflow-hidden"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-background p-6 transition-colors hover:bg-surface-1 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="font-mono text-[10px] text-gold tracking-widest mb-4 opacity-65">
                {step.num}
              </div>
              <div className="text-[13px] font-medium text-foreground mb-2 group-hover:text-gold transition-colors">
                {step.title}
              </div>
              <div className="text-xs text-muted leading-relaxed font-light">
                {step.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
