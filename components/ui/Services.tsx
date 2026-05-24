"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function Services() {
  const { t } = useI18n()

  const services = [
    { num: "01", title: t("svc.t1"), desc: t("svc.d1") },
    { num: "02", title: t("svc.t2"), desc: t("svc.d2") },
    { num: "03", title: t("svc.t3"), desc: t("svc.d3") },
    { num: "04", title: t("svc.t4"), desc: t("svc.d4") },
    { num: "05", title: t("svc.t5"), desc: t("svc.d5") },
  ]

  return (
    <section id="services" className="px-[5vw] py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[2.5px] uppercase text-gold mb-3">
              <span>{t("svc.label")}</span>
              <span className="w-8 h-px bg-gold-border" />
            </div>
            <h2 className="font-serif text-[clamp(30px,4vw,52px)] font-normal leading-[1.08] tracking-tight text-foreground">
              {t("svc.h2")} <em className="italic text-gold">{t("svc.h2.em")}</em>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted text-sm leading-relaxed font-light"
          >
            {t("svc.sub")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-line-2 border border-line rounded-lg overflow-hidden"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-background p-6 transition-colors hover:bg-surface-1 group"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-mono text-[10px] text-gold tracking-widest mb-5 opacity-65">
                {service.num}
              </div>
              <div className="font-serif text-base text-foreground mb-2 leading-tight group-hover:text-gold transition-colors">
                {service.title}
              </div>
              <div className="text-xs text-muted leading-relaxed font-light">
                {service.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
