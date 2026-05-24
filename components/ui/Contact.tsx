"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function Contact() {
  const { t } = useI18n()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="px-[5vw] py-20 border-t border-line">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 font-mono text-[10px] tracking-[2.5px] uppercase text-gold mb-8"
        >
          <span>{t("contact.label")}</span>
          <span className="w-8 h-px bg-gold-border" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-18 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-[clamp(30px,4vw,52px)] font-normal leading-[1.08] tracking-tight text-foreground">
              {t("contact.h2")} <em className="italic text-gold">{t("contact.h2.em")}</em>
            </h2>
            <p className="text-muted text-sm leading-relaxed font-light mt-3 mb-6">
              {t("contact.p")}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md border border-gold-border bg-gold-bg grid place-items-center text-[13px] shrink-0">
                  <MailIcon />
                </div>
                <div className="text-[13px] text-muted">
                  <a href="mailto:OpsBrain1@gmail.com" className="text-gold no-underline hover:text-gold-light">
                    OpsBrain1@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md border border-gold-border bg-gold-bg grid place-items-center text-[13px] shrink-0">
                  <ChatIcon />
                </div>
                <div className="text-[13px] text-muted">
                  {t("contact.wa").split(" — ")[0]} —{" "}
                  <a href="#" className="text-gold no-underline hover:text-gold-light">
                    {t("contact.wa").split(" — ")[1]}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-muted font-mono tracking-wider">{t("form.name")}</label>
                <input
                  type="text"
                  required
                  placeholder="Sara Cohen"
                  className="bg-surface-1 border border-line rounded px-3.5 py-3 text-foreground text-[13px] font-sans outline-none transition-colors focus:border-gold-border placeholder:text-faint"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-muted font-mono tracking-wider">{t("form.company")}</label>
                <input
                  type="text"
                  placeholder="Your Business"
                  className="bg-surface-1 border border-line rounded px-3.5 py-3 text-foreground text-[13px] font-sans outline-none transition-colors focus:border-gold-border placeholder:text-faint"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-muted font-mono tracking-wider">{t("form.email")}</label>
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="bg-surface-1 border border-line rounded px-3.5 py-3 text-foreground text-[13px] font-sans outline-none transition-colors focus:border-gold-border placeholder:text-faint"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-muted font-mono tracking-wider">{t("form.msg")}</label>
              <textarea
                placeholder="Describe your current process..."
                className="bg-surface-1 border border-line rounded px-3.5 py-3 text-foreground text-[13px] font-sans outline-none transition-colors focus:border-gold-border h-24 resize-none placeholder:text-faint"
              />
            </div>
            <button
              type="submit"
              disabled={submitted}
              className={`self-start inline-flex items-center gap-2 px-7 py-4 rounded text-[13px] font-medium tracking-wide transition-all ${
                submitted
                  ? "bg-surface-2 text-gold cursor-default"
                  : "bg-gold text-background hover:bg-gold-light hover:-translate-y-0.5"
              }`}
            >
              {submitted ? "✓ Sent — we'll be in touch soon" : t("form.submit")} {!submitted && <span>→</span>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}
