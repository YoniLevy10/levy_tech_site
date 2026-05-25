"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function Infrastructure() {
  const { t } = useI18n()

  const tags = [
    "Next.js",
    "Supabase",
    "Vercel",
    "WhatsApp Cloud API",
    "OpenAI",
    "Claude AI",
    "Custom Integrations",
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      className="px-[5vw] py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
        <div className="flex items-center gap-4 shrink-0">
          <span className="font-mono text-[10px] tracking-[2.5px] uppercase text-muted whitespace-nowrap">
            {t("infra.label")}
          </span>
          <div className="w-10 h-px bg-gold-border" />
        </div>

        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-surface-1/50 text-[11px] text-muted font-mono border border-line/50 transition-all hover:border-gold-border hover:text-gold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
