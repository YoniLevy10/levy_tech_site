"use client"

import { motion } from "framer-motion"

const reasons = [
  {
    title: "Business-first systems",
    body: "Every build starts with the operational pain, not the technology stack.",
  },
  {
    title: "AI-native workflows",
    body: "Dashboards, automations and agents work as one connected layer.",
  },
  {
    title: "Fast MVP execution",
    body: "From diagnosis to working product without slow agency timelines.",
  },
  {
    title: "Built for real usage",
    body: "Teams keep familiar tools while managers get one clear dashboard.",
  },
]

export default function WhyLevyTech() {
  return (
    <section className="border-t border-line px-6 py-24 sm:px-[5vw]">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-12 grid grid-cols-1 gap-7 md:grid-cols-[0.85fr_1fr] md:gap-20"
        >
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
              <span>Why Levy Tech</span>
              <span className="h-px w-8 bg-gold-border" />
            </div>
            <h2 className="max-w-[12ch] font-serif text-[clamp(38px,11vw,58px)] font-normal leading-[1.05] tracking-[-0.035em] text-foreground sm:max-w-none">
              Systems that feel custom because they are.
            </h2>
          </div>

          <p className="max-w-[42rem] text-[16px] font-light leading-[1.9] text-muted md:pt-8">
            Levy Tech turns scattered messages, files and decisions into one clear operational workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, amount: 0.1 }}
              className="rounded-2xl border border-line/70 bg-surface-1/35 p-6 sm:p-7"
            >
              <div className="mb-6 font-mono text-[10px] tracking-[0.22em] text-gold opacity-70">
                0{index + 1}
              </div>
              <h3 className="mb-4 font-serif text-[24px] leading-[1.12] text-foreground">
                {reason.title}
              </h3>
              <p className="text-[15px] font-light leading-[1.85] text-muted">
                {reason.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
