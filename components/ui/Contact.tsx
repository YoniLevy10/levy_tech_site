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
    <section id="contact" className="border-t border-line px-6 py-24 sm:px-[5vw]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-10 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]"
        >
          <span>{t("contact.label")}</span>
          <span className="h-px w-8 bg-gold-border" />
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-18">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="max-w-[12ch] font-serif text-[clamp(38px,11vw,56px)] font-normal leading-[1.05] tracking-[-0.035em] text-foreground sm:max-w-none">
              {t("contact.h2")} <em className="italic text-gold">{t("contact.h2.em")}</em>
            </h2>

            <p className="mt-5 mb-8 max-w-[36rem] text-[16px] font-light leading-[1.9] text-muted">
              {t("contact.p")}
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold-border bg-gold-bg text-[13px]">
                  <MailIcon />
                </div>
                <a href="mailto:OpsBrain1@gmail.com" className="break-all text-[14px] text-gold no-underline hover:text-gold-light">
                  OpsBrain1@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold-border bg-gold-bg text-[13px]">
                  <ChatIcon />
                </div>
                <div className="text-[14px] leading-relaxed text-muted">
                  {t("contact.wa").split(" — ")[0]} —{" "}
                  <a href="#" className="text-gold no-underline hover:text-gold-light">
                    {t("contact.wa").split(" — ")[1]}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-2xl border border-line bg-surface-1/30 p-5 sm:p-7"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label={t("form.name")} placeholder="Sara Cohen" required />
              <Field label={t("form.company")} placeholder="Your Business" />
            </div>

            <Field label={t("form.email")} placeholder="you@company.com" type="email" required />

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-wider text-muted">{t("form.msg")}</label>
              <textarea
                placeholder="Describe your current process..."
                className="h-32 resize-none rounded-lg border border-line bg-surface-1 px-4 py-4 font-sans text-[15px] text-foreground outline-none transition-colors placeholder:text-faint focus:border-gold-border"
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className={`inline-flex w-full items-center justify-center gap-2 rounded px-7 py-4 text-[13px] font-medium tracking-wide transition-all sm:w-auto sm:self-start ${
                submitted
                  ? "cursor-default bg-surface-2 text-gold"
                  : "bg-gold text-background hover:-translate-y-0.5 hover:bg-gold-light"
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

function Field({ label, placeholder, type = "text", required = false }: { label: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] tracking-wider text-muted">{label}</label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-line bg-surface-1 px-4 py-4 font-sans text-[15px] text-foreground outline-none transition-colors placeholder:text-faint focus:border-gold-border"
      />
    </div>
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
