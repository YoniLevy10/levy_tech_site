"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

const meta = {
  Bamakor: { status: "Live client system", stack: ["WhatsApp", "Tickets", "Supabase"], result: "Structured maintenance flow" },
  Naaryo: { status: "Private portal", stack: ["Finance", "Documents", "Security"], result: "Client visibility layer" },
  Meditactic: { status: "Blueprint", stack: ["Inventory", "Orders", "Reports"], result: "Supply-chain clarity" },
  OpsBrain: { status: "Platform concept", stack: ["Gmail", "Drive", "AI"], result: "Unified AI workspace" },
}

export default function Projects() {
  const { t } = useI18n()

  return (
    <section id="projects" className="px-6 py-24 sm:px-[5vw]">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.1 }} className="mb-12">
          <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
            <span>{t("proj.label")}</span>
            <span className="h-px w-8 bg-gold-border" />
          </div>
          <h2 className="max-w-[12ch] font-serif text-[clamp(38px,11vw,56px)] font-normal leading-[1.05] tracking-[-0.035em] text-foreground sm:max-w-none">
            {t("proj.h2")} <em className="italic text-gold">{t("proj.h2.em")}</em> {t("proj.h2.end")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ProjectCard title="Bamakor" tag={t("proj.bamakor.tag")} sub={t("proj.bamakor.sub")} desc={t("proj.bamakor.desc")} number="01" wide />
          <ProjectCard title="Naaryo" tag={t("proj.naaryo.tag")} sub={t("proj.naaryo.sub")} desc={t("proj.naaryo.desc")} number="02" />
          <ProjectCard title="Meditactic" tag={t("proj.meditactic.tag")} sub={t("proj.meditactic.sub")} desc={t("proj.meditactic.desc")} number="03" />
          <ProjectCard title="OpsBrain" tag={t("proj.opsbrain.tag")} sub={t("proj.opsbrain.sub")} desc={t("proj.opsbrain.desc")} number="04" wide />
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ title, tag, sub, desc, number, wide }: { title: keyof typeof meta; tag: string; sub: string; desc: string; number: string; wide?: boolean }) {
  const item = meta[title]

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true, amount: 0.1 }} className={`group relative overflow-hidden rounded-2xl border border-line bg-background p-7 transition-colors hover:border-gold-border hover:bg-surface-1 sm:p-10 ${wide ? "md:col-span-2" : ""}`}>
      <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-[1fr_320px]">
        <div className="max-w-[560px]">
          <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.22em] text-gold opacity-80 sm:text-[10px]">{tag}</div>
          <div className="mb-2 font-serif text-[34px] leading-none text-foreground">{title}</div>
          <div className="mb-5 text-[11px] uppercase tracking-[0.14em] text-gold">{sub}</div>
          <p className="text-[15px] font-light leading-[1.9] text-muted">{desc}</p>
        </div>

        <div className="rounded-xl border border-line bg-surface-1/35 p-5">
          <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Status</div>
          <div className="mb-5 rounded-full border border-gold-border bg-gold-bg px-3 py-1.5 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-gold">{item.status}</div>
          <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">Result</div>
          <p className="mb-5 text-[13px] font-light leading-[1.75] text-foreground">{item.result}</p>
          <div className="flex flex-wrap gap-2">
            {item.stack.map((tag) => <span key={tag} className="rounded-full border border-line px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{tag}</span>)}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-4 right-5 font-serif text-[72px] italic leading-none text-faint opacity-15 sm:text-[88px]">{number}</div>
    </motion.div>
  )
}
