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
    <section id="process" className="border-t border-line px-6 py-24 sm:px-[5vw]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-12 grid grid-cols-1 gap-7 md:grid-cols-[0.85fr_1fr] md:gap-20"
        >
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
              <span>{t("proc.label")}</span>
              <span className="h-px w-8 bg-gold-border" />
            </div>
            <h2 className="max-w-[12ch] font-serif text-[clamp(38px,11vw,56px)] font-normal leading-[1.05] tracking-[-0.035em] text-foreground sm:max-w-none">
              {t("proc.h2")} <em className="italic text-gold">{t("proc.h2.em")}</em> {t("proc.h2.end")}
            </h2>
          </div>

          <p className="max-w-[42rem] text-[16px] font-light leading-[1.9] text-muted md:pt-8">
            A structured workflow for turning operational pain into a working internal system: diagnosis, architecture, build, integrations and launch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="group rounded-2xl border border-line/70 bg-surface-1/30 p-6 transition-colors hover:border-gold-border hover:bg-surface-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.06 * index }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="mb-8 font-mono text-[10px] tracking-[0.22em] text-gold opacity-70">
                {step.num}
              </div>
              <h3 className="mb-4 font-serif text-[24px] leading-[1.12] text-foreground transition-colors group-hover:text-gold">
                {step.title}
              </h3>
              <p className="text-[15px] font-light leading-[1.85] text-muted">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
