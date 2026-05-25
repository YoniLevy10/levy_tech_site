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
  ]

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="px-[5vw] py-28 md:py-36">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[2.5px] uppercase text-gold mb-5">
            <span>{t("faq.label")}</span>
            <span className="w-8 h-px bg-gold-border" />
          </div>

          <h2 className="font-serif text-[clamp(34px,4.8vw,60px)] font-normal leading-[1.05] tracking-tight text-foreground max-w-3xl">
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
            <div
              key={index}
              className="border-b border-line/70 pb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between gap-6 py-4 text-left"
              >
                <span className="text-[17px] md:text-[19px] font-light text-foreground leading-relaxed max-w-3xl">
                  {faq.q}
                </span>

                <motion.span
                  className="text-gold text-xl leading-none shrink-0"
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
                    <div className="pb-6 pr-8 text-[14px] text-muted leading-[1.9] font-light max-w-3xl">
                      {faq.a}
                    </div>
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
