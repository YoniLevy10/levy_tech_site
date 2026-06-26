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
          className="mb-14 grid grid-cols-1 gap-7 md:grid-cols-[0.85fr_1fr] md:gap-20"
        >
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
              <span>{t("proc.label")}</span>
              <span className="h-px w-8 bg-gold-border" />
            </div>
            <h2 className="font-serif text-[clamp(38px,11vw,56px)] font-normal leading-[1.05] tracking-[-0.035em] text-foreground">
              {t("proc.h2")}{" "}
              <em className="italic text-gold">{t("proc.h2.em")}</em>{" "}
              {t("proc.h2.end")}
            </h2>
          </div>
          <p className="max-w-[42rem] text-[16px] font-light leading-[1.9] text-muted md:pt-8">
            A structured workflow for turning operational pain into a working internal system — diagnosis, architecture, build, integrations and launch.
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="absolute left-0 top-[22px] hidden h-px w-full bg-line lg:block" />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="group relative rounded-2xl border border-line/70 bg-surface-1/30 p-6 transition-all hover:border-gold-border hover:bg-surface-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.07 * index }}
                viewport={{ once: true, amount: 0.1 }}
              >
                {/* Step dot — sits on the line */}
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-gold-border bg-background">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.22em] text-gold opacity-60">
                    {step.num}
                  </span>
                </div>

                <h3 className="mb-3 font-serif text-[21px] leading-[1.15] text-foreground transition-colors group-hover:text-gold">
                  {step.title}
                </h3>
                <p className="text-[14px] font-light leading-[1.85] text-muted">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA bridge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded border border-gold-border bg-gold-bg px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold no-underline transition-all hover:bg-gold/10"
          >
            Start with a free System Audit <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
