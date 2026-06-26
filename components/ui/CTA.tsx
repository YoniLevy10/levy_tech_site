"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

const auditItems = [
  { icon: "→", text: "Operational map of your business" },
  { icon: "→", text: "Custom system blueprint" },
  { icon: "→", text: "Build estimate & timeline" },
]

export default function CTA() {
  const { t } = useI18n()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.1 }}
      className="relative mx-6 mb-20 overflow-hidden rounded-2xl sm:mx-[5vw]"
      style={{ background: "var(--s1)", border: "1px solid rgba(200,169,109,0.3)" }}
    >
      {/* Glow top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "rgba(200,169,109,0.08)" }}
      />

      <div className="relative grid grid-cols-1 gap-0 md:grid-cols-[1fr_320px]">
        {/* Left — copy */}
        <div className="px-8 py-12 sm:px-12 sm:py-16">
          <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
            <span>Free System Audit</span>
            <span className="h-px w-8 bg-gold-border" />
          </div>

          <h2 className="max-w-[14ch] font-serif text-[clamp(32px,6vw,52px)] font-normal leading-[1.06] tracking-[-0.03em] text-foreground">
            {t("cta.title")}{" "}
            <em className="italic text-gold">{t("cta.title.em")}</em>
          </h2>

          <p className="mt-5 max-w-[38rem] text-[15px] font-light leading-[1.9] text-muted sm:text-[16px]">
            {t("cta.sub")}
          </p>

          {/* Trust line */}
          <div className="mt-8 flex items-center gap-6">
            {[
              { val: "45 min", label: "session" },
              { val: "Free",   label: "no commitment" },
              { val: "48h",    label: "response time" },
            ].map((item) => (
              <div key={item.label}>
                <div className="font-serif text-[22px] leading-none text-foreground">{item.val}</div>
                <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-muted">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — action box */}
        <div
          className="flex flex-col justify-center gap-5 border-t border-l-0 px-8 py-10 md:border-t-0 md:border-l sm:px-10"
          style={{ borderColor: "rgba(200,169,109,0.2)" }}
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
            What you get
          </div>

          <div className="space-y-3">
            {auditItems.map((item) => (
              <div key={item.text} className="flex items-start gap-3 text-[14px] text-foreground">
                <span className="mt-0.5 shrink-0 text-gold">{item.icon}</span>
                <span className="font-light leading-snug">{item.text}</span>
              </div>
            ))}
          </div>

          <a
            href="mailto:OpsBrain1@gmail.com"
            className="inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-6 py-4 text-[13px] font-medium tracking-wide text-background no-underline transition-all hover:-translate-y-0.5 hover:bg-gold-light"
          >
            {t("cta.btn1")} <span>→</span>
          </a>

          <a
            href="#contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded border border-gold-border bg-transparent px-5 py-3 text-[12px] tracking-wide text-gold no-underline transition-all hover:bg-gold-bg"
          >
            {t("cta.btn2")}
          </a>

          <p className="text-center font-mono text-[10px] tracking-wide text-muted opacity-70">
            {t("cta.note")}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
