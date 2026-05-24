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
      viewport={{ once: true }}
      className="px-[5vw] py-11 border-t border-line flex items-center gap-6 flex-wrap"
    >
      <span className="font-mono text-[10px] tracking-widest uppercase text-muted whitespace-nowrap">
        {t("infra.label")}
      </span>
      <div className="w-px h-6 bg-line shrink-0" />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1.5 border border-line rounded text-[11px] text-muted font-mono transition-all hover:border-gold-border hover:text-gold"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
