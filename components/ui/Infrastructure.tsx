"use client"

import { motion } from "framer-motion"

const stack = [
  "Next.js",
  "Supabase",
  "Vercel",
  "WhatsApp API",
  "OpenAI",
  "Claude AI",
  "Google Workspace",
  "Custom Integrations",
]

export default function Infrastructure() {
  return (
    <section className="border-t border-line px-6 py-20 sm:px-[5vw]">
      <div className="mx-auto max-w-7xl rounded-2xl border border-line bg-surface-1/30 p-7 sm:p-10 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1fr] md:items-center"
        >
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
              <span>Modern Infrastructure</span>
              <span className="h-px w-8 bg-gold-border" />
            </div>

            <h2 className="font-serif text-[clamp(34px,9vw,50px)] leading-[1.06] tracking-[-0.035em] text-foreground">
              Built on infrastructure that scales beyond the first demo.
            </h2>
          </div>

          <div>
            <p className="mb-7 max-w-[42rem] text-[16px] font-light leading-[1.9] text-muted">
              Systems are designed around real deployment, secure access, automation and long-term operational scalability.
            </p>

            <div className="flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line bg-background/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
