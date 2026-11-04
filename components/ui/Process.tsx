"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"
import { ArrowForward } from "@/components/ui/icons"

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
          className="mb-8 grid grid-cols-1 gap-4 md:mb-14 md:grid-cols-[0.85fr_1fr] md:gap-20"
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
          <p className="max-w-[42rem] text-[15px] font-light leading-relaxed text-muted md:pt-8 md:text-[16px]">
            {t("proc.sub")}
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="absolute left-0 top-[22px] hidden h-px w-full bg-line lg:block" />

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-5 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="group relative rounded-2xl border border-line/70 bg-surface-1 p-4 transition-all hover:border-gold-border sm:p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.07 * index }}
                viewport={{ once: true, amount: 0.1 }}
              >
                {/* Step dot — sits on the line */}
                <div className="mb-3 flex items-center gap-3 sm:mb-7">
                  <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-gold-border bg-background">
                    <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.22em] text-gold opacity-60">
                    {step.num}
                  </span>
                </div>

                <h3 className="mb-1 font-serif text-[20px] leading-[1.2] text-foreground transition-colors group-hover:text-gold sm:mb-3 sm:text-[21px]">
                  {step.title}
                </h3>
                <p className="text-[14px] font-light leading-snug text-muted">
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
            {t("proc.cta")} <ArrowForward />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
