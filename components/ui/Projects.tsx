"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function Projects() {
  const { t } = useI18n()

  return (
    <section id="projects" className="px-[5vw] py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-[2.5px] uppercase text-gold mb-3">
            <span>{t("proj.label")}</span>
            <span className="w-8 h-px bg-gold-border" />
          </div>
          <h2 className="font-serif text-[clamp(30px,4vw,52px)] font-normal leading-[1.08] tracking-tight text-foreground mb-10">
            {t("proj.h2")} <em className="italic text-gold">{t("proj.h2.em")}</em> {t("proj.h2.end")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-2 border border-line rounded-xl overflow-hidden">
          {/* Bamakor - Wide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-background p-10 relative overflow-hidden transition-colors hover:bg-surface-1 group grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-gold mb-3 opacity-80">
                {t("proj.bamakor.tag")}
              </div>
              <div className="font-serif text-2xl font-normal text-foreground mb-1 leading-tight">Bamakor</div>
              <div className="text-[11px] text-gold tracking-wide mb-4">{t("proj.bamakor.sub")}</div>
              <p className="text-[13px] text-muted leading-relaxed font-light max-w-[360px]">
                {t("proj.bamakor.desc")}
              </p>
            </div>
            <ProjectMockup variant="dashboard" />
            <div className="absolute bottom-6 right-6 font-serif text-6xl text-faint leading-none opacity-35 italic pointer-events-none">
              01
            </div>
          </motion.div>

          {/* Naaryo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-background p-10 relative overflow-hidden transition-colors hover:bg-surface-1 group"
          >
            <div className="font-mono text-[10px] tracking-widest uppercase text-gold mb-3 opacity-80">
              {t("proj.naaryo.tag")}
            </div>
            <div className="font-serif text-2xl font-normal text-foreground mb-1 leading-tight">Naaryo</div>
            <div className="text-[11px] text-gold tracking-wide mb-4">{t("proj.naaryo.sub")}</div>
            <p className="text-[13px] text-muted leading-relaxed font-light max-w-[360px]">
              {t("proj.naaryo.desc")}
            </p>
            <div className="absolute bottom-6 right-6 font-serif text-6xl text-faint leading-none opacity-35 italic pointer-events-none">
              02
            </div>
          </motion.div>

          {/* Meditactic */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-background p-10 relative overflow-hidden transition-colors hover:bg-surface-1 group"
          >
            <div className="font-mono text-[10px] tracking-widest uppercase text-gold mb-3 opacity-80">
              {t("proj.meditactic.tag")}
            </div>
            <div className="font-serif text-2xl font-normal text-foreground mb-1 leading-tight">Meditactic</div>
            <div className="text-[11px] text-gold tracking-wide mb-4">{t("proj.meditactic.sub")}</div>
            <p className="text-[13px] text-muted leading-relaxed font-light max-w-[360px]">
              {t("proj.meditactic.desc")}
            </p>
            <div className="absolute bottom-6 right-6 font-serif text-6xl text-faint leading-none opacity-35 italic pointer-events-none">
              03
            </div>
          </motion.div>

          {/* OpsBrain - Wide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-background p-10 relative overflow-hidden transition-colors hover:bg-surface-1 group grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <div className="font-mono text-[10px] tracking-widest uppercase text-gold mb-3 opacity-80">
                {t("proj.opsbrain.tag")}
              </div>
              <div className="font-serif text-2xl font-normal text-foreground mb-1 leading-tight">OpsBrain</div>
              <div className="text-[11px] text-gold tracking-wide mb-4">{t("proj.opsbrain.sub")}</div>
              <p className="text-[13px] text-muted leading-relaxed font-light max-w-[360px]">
                {t("proj.opsbrain.desc")}
              </p>
            </div>
            <ProjectMockup variant="workspace" />
            <div className="absolute bottom-6 right-6 font-serif text-6xl text-faint leading-none opacity-35 italic pointer-events-none">
              04
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ProjectMockup({ variant }: { variant: "dashboard" | "workspace" }) {
  return (
    <div className="aspect-[4/3] bg-surface-2 border border-line rounded-lg overflow-hidden flex flex-col">
      <div className="h-6 bg-surface-3 border-b border-line flex items-center px-2.5 gap-1.5 shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-faint" />
        <div className="w-1.5 h-1.5 rounded-full bg-faint" />
        <div className="w-1.5 h-1.5 rounded-full bg-faint" />
      </div>
      <div className="flex-1 p-2.5 flex flex-col gap-1.5">
        {variant === "dashboard" ? (
          <>
            <div className="h-1.5 rounded bg-gold/20 w-[55%]" />
            <div className="flex gap-1.5">
              <div className="h-1.5 rounded bg-line w-[30%]" />
              <div className="h-1.5 rounded bg-gold/15 w-[22%]" />
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-1">
              <div className="h-8 rounded bg-surface-3 border border-line" />
              <div className="h-8 rounded bg-surface-3 border border-gold/20" />
              <div className="h-8 rounded bg-surface-3 border border-line" />
              <div className="h-8 rounded bg-surface-3 border border-line" />
            </div>
            <div className="h-1.5 rounded bg-line mt-1 w-[75%]" />
            <div className="h-1.5 rounded bg-line w-[55%]" />
          </>
        ) : (
          <div className="flex gap-2 flex-1">
            <div className="w-1/4 flex flex-col gap-1.5 pr-2 border-r border-line">
              <div className="h-1.5 rounded bg-gold/20" />
              <div className="h-1.5 rounded bg-line" />
              <div className="h-1.5 rounded bg-line w-[85%]" />
              <div className="h-1.5 rounded bg-line" />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="h-1.5 rounded bg-gold/20 w-[50%]" />
              <div className="grid grid-cols-2 gap-1.5 flex-1">
                <div className="rounded bg-surface-3 border border-line" />
                <div className="rounded bg-surface-3 border border-gold/18" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
