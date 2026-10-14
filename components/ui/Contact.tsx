"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n"
import {
  CONTACT_EMAIL,
  whatsappUrl,
  WHATSAPP_PREFILL_EN,
  WHATSAPP_PREFILL_HE,
  WHATSAPP_PREFILL_FR,
} from "@/lib/site"
import { motion } from "framer-motion"

type SubmitState = "idle" | "sending" | "sent" | "error" | "config"

export default function Contact() {
  const { t, lang } = useI18n()
  const [status, setStatus] = useState<SubmitState>("idle")
  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const waMessage =
    lang === "he" ? WHATSAPP_PREFILL_HE : lang === "fr" ? WHATSAPP_PREFILL_FR : WHATSAPP_PREFILL_EN

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "sending" || status === "sent") return

    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, email, message }),
      })

      if (res.status === 503) {
        setStatus("config")
        return
      }

      if (!res.ok) {
        setStatus("error")
        return
      }

      setStatus("sent")
      setName("")
      setCompany("")
      setEmail("")
      setMessage("")
    } catch {
      setStatus("error")
    }
  }

  const statusMessage =
    status === "sent"
      ? t("form.sent")
      : status === "config"
        ? t("form.config")
        : status === "error"
          ? t("form.error")
          : null

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

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="max-w-[14ch] font-serif text-[clamp(38px,11vw,56px)] font-normal leading-[1.05] tracking-[-0.035em] text-foreground sm:max-w-none">
              {t("contact.h2")} <em className="italic text-gold">{t("contact.h2.em")}</em>
            </h2>

            <p className="mt-5 mb-8 max-w-[36rem] text-[16px] font-light leading-[1.9] text-muted">
              {t("contact.p")}
            </p>

            <div className="mb-8 rounded-2xl border border-gold-border/40 bg-gold-bg/40 p-5 sm:p-6">
              <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                {t("contact.audit.title")}
              </div>
              <ul className="space-y-3">
                {[t("contact.audit.1"), t("contact.audit.2"), t("contact.audit.3")].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] font-light text-foreground">
                    <span className="mt-0.5 text-gold" aria-hidden="true">
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-mono text-[10px] tracking-wide text-muted">{t("contact.audit.note")}</p>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold-border bg-gold-bg text-[13px]">
                  <MailIcon />
                </div>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("OpsBrain — conversation request")}`}
                  className="break-all text-[14px] text-gold no-underline hover:text-gold-light"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-gold-border bg-gold-bg text-[13px]">
                  <ChatIcon />
                </div>
                <a
                  href={whatsappUrl(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-gold no-underline hover:text-gold-light"
                >
                  {t("contact.wa")}
                </a>
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
              <Field
                label={t("form.name")}
                placeholder="Your name"
                required
                value={name}
                onChange={setName}
                disabled={status === "sending" || status === "sent"}
              />
              <Field
                label={t("form.company")}
                placeholder="Your business"
                value={company}
                onChange={setCompany}
                disabled={status === "sending" || status === "sent"}
              />
            </div>

            <Field
              label={t("form.email")}
              placeholder="you@company.com"
              type="email"
              required
              value={email}
              onChange={setEmail}
              disabled={status === "sending" || status === "sent"}
            />

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] tracking-wider text-muted">{t("form.msg")}</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={status === "sending" || status === "sent"}
                placeholder="Describe your current process..."
                className="h-32 resize-none rounded-lg border border-line bg-surface-1 px-4 py-4 font-sans text-[15px] text-foreground outline-none transition-colors placeholder:text-faint focus:border-gold-border disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className={`inline-flex w-full items-center justify-center gap-2 rounded px-7 py-4 text-[13px] font-medium tracking-wide transition-all sm:w-auto sm:self-start ${
                status === "sent"
                  ? "cursor-default bg-surface-2 text-gold"
                  : "bg-gold text-background hover:-translate-y-0.5 hover:bg-gold-light disabled:opacity-70"
              }`}
            >
              {status === "sending" ? t("form.sending") : status === "sent" ? `✓ ${t("form.sent")}` : t("form.submit")}
              {status === "idle" || status === "error" || status === "config" ? <span>→</span> : null}
            </button>

            {statusMessage && status !== "sent" && (
              <p className="text-[13px] font-light text-muted" role="status">
                {statusMessage}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  placeholder,
  type = "text",
  required = false,
  value,
  onChange,
  disabled = false,
}: {
  label: string
  placeholder: string
  type?: string
  required?: boolean
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] tracking-wider text-muted">{label}</label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-line bg-surface-1 px-4 py-4 font-sans text-[15px] text-foreground outline-none transition-colors placeholder:text-faint focus:border-gold-border disabled:opacity-60"
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
