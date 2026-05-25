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
    <section id="services" className="px-6 py-24 sm:px-[5vw] md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 items-start gap-7 md:mb-20 md:grid-cols-[0.95fr_0.65fr] md:items-end md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
              <span>{t("svc.label")}</span>
              <span className="h-px w-8 bg-gold-border" />
            </div>
            <h2 className="max-w-[12ch] font-serif text-[clamp(38px,11vw,64px)] font-normal leading-[1.04] tracking-[-0.035em] text-foreground sm:max-w-none">
              {t("svc.h2")} <em className="italic text-gold">{t("svc.h2.em")}</em>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="max-w-xl text-[16px] font-light leading-[1.9] text-muted md:ml-auto md:max-w-md"
          >
            {t("svc.sub")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`group rounded-2xl border border-line/70 bg-surface-1/35 p-6 transition-all hover:border-gold-border hover:bg-surface-1 sm:p-8 ${
                index < 3 ? "md:col-span-2" : "md:col-span-3"
              }`}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-7 font-mono text-[10px] tracking-[0.22em] text-gold opacity-70">
                {service.num}
              </div>
              <div className="mb-4 font-serif text-[24px] leading-[1.12] text-foreground transition-colors group-hover:text-gold md:text-2xl">
                {service.title}
              </div>
              <div className="max-w-sm text-[15px] font-light leading-[1.85] text-muted">
                {service.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
