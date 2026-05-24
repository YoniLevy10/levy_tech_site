"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n"
import { motion, AnimatePresence } from "framer-motion"

export default function FAQ() {
  const { t } = useI18n()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
    <section className="px-[5vw] py-20 border-t border-line">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[2.5px] uppercase text-gold mb-3">
            <span>{t("faq.label")}</span>
            <span className="w-8 h-px bg-gold-border" />
          </div>
          <h2 className="font-serif text-[clamp(30px,4vw,52px)] font-normal leading-[1.08] tracking-tight text-foreground mb-10">
            {t("faq.h2")} <em className="italic text-gold">{t("faq.h2.em")}</em>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="border border-line rounded-lg overflow-hidden"
        >
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-line last:border-b-0">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 cursor-pointer transition-colors hover:bg-surface-1 text-left"
              >
                <span className="text-sm text-foreground">{faq.q}</span>
                <motion.span
                  className="text-gold text-lg leading-none shrink-0"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
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
                    <div className="px-6 pb-5 text-sm text-muted leading-relaxed font-light">
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
