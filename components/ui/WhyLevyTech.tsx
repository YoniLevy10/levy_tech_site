"use client"

import { motion } from "framer-motion"

const reasons = [
  {
    title: "Business-first systems",
    body: "Every build starts with the operational pain, not the technology stack.",
    proof: "Bamakor: replaced WhatsApp chaos for 150+ residents across 20+ buildings",
  },
  {
    title: "AI-native workflows",
    body: "Dashboards, automations and agents work as one connected layer.",
    proof: "Zero manual chasing — tasks route, assign and close automatically",
  },
  {
    title: "Fast MVP execution",
    body: "From diagnosis to working product without slow agency timelines.",
    proof: "Live with paying clients in under 3 weeks",
  },
  {
    title: "Built for real usage",
    body: "Teams keep familiar tools while managers get one clear dashboard.",
    proof: "Workers use WhatsApp as usual. Managers see everything.",
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
          className="mb-14 grid grid-cols-1 gap-7 md:grid-cols-[0.85fr_1fr] md:gap-20"
        >
          <div>
            <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
              <span>Why Levy Tech</span>
              <span className="h-px w-8 bg-gold-border" />
            </div>
            <h2 className="font-serif text-[clamp(38px,9vw,56px)] font-normal leading-[1.05] tracking-[-0.035em] text-foreground">
              Systems that feel custom{" "}
              <em className="italic text-gold">because they are.</em>
            </h2>
          </div>

          <p className="max-w-[42rem] text-[16px] font-light leading-[1.9] text-muted md:pt-8">
            Levy Tech turns scattered messages, files and decisions into one clear operational workflow —
            built specifically around how your business actually runs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              viewport={{ once: true, amount: 0.1 }}
              className="group rounded-2xl border border-line/70 bg-surface-1/35 p-7 transition-all hover:border-gold-border hover:bg-surface-1"
            >
              <h3 className="mb-3 font-serif text-[22px] leading-[1.15] text-foreground transition-colors group-hover:text-gold">
                {reason.title}
              </h3>
              <p className="mb-5 text-[15px] font-light leading-[1.85] text-muted">
                {reason.body}
              </p>
              {/* Social proof chip */}
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-border/50 bg-gold-bg px-3 py-1.5">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold opacity-70" />
                <span className="font-mono text-[9px] leading-snug tracking-wide text-gold opacity-80">
                  {reason.proof}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
