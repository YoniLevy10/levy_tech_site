"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n"
import { motion, AnimatePresence } from "framer-motion"

export default function FAQ() {
  const { t } = useI18n()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="px-[5vw] py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-14"
        >
          <div className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[2.5px] text-gold">
            <span>{t("faq.label")}</span>
            <span className="h-px w-8 bg-gold-border" />
          </div>

          <h2 className="max-w-3xl font-serif text-[clamp(34px,4.8vw,60px)] font-normal leading-[1.05] tracking-tight text-foreground">
            {t("faq.h2")} <em className="italic text-gold">{t("faq.h2.em")}</em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-line/70 pb-4">
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between gap-6 py-4 text-left"
              >
                <span className="max-w-3xl text-[17px] font-light leading-relaxed text-foreground md:text-[19px]">
                  {faq.q}
                </span>

                <motion.span
                  className="shrink-0 text-xl leading-none text-gold"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-3xl pb-6 pr-8 text-[14px] font-light leading-[1.9] text-muted">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
