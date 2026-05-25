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
    <section id="services" className="px-[5vw] py-28 md:py-36">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[0.95fr_0.65fr] gap-10 md:gap-24 items-end mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[2.5px] uppercase text-gold mb-5">
              <span>{t("svc.label")}</span>
              <span className="w-8 h-px bg-gold-border" />
            </div>
            <h2 className="font-serif text-[clamp(34px,4.8vw,64px)] font-normal leading-[1.04] tracking-tight text-foreground">
              {t("svc.h2")} <em className="italic text-gold">{t("svc.h2.em")}</em>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-muted text-[15px] leading-[1.85] font-light max-w-md md:ml-auto"
          >
            {t("svc.sub")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-6 gap-5 md:gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`group rounded-xl border border-line/80 bg-surface-1/35 p-7 md:p-8 transition-all hover:border-gold-border hover:bg-surface-1 ${
                index < 3 ? "md:col-span-2" : "md:col-span-3"
              }`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="font-mono text-[10px] text-gold tracking-widest mb-8 opacity-65">
                {service.num}
              </div>
              <div className="font-serif text-[22px] md:text-2xl text-foreground mb-4 leading-tight group-hover:text-gold transition-colors">
                {service.title}
              </div>
              <div className="text-[13px] text-muted leading-[1.8] font-light max-w-sm">
                {service.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
