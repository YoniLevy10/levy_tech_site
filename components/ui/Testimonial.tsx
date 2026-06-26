"use client"

import { useI18n } from "@/lib/i18n"
import { motion } from "framer-motion"

export default function Testimonial() {
  const { t } = useI18n()

  return (
    <section className="border-t border-line px-6 py-20 sm:px-[5vw]">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.15 }}
          className="relative overflow-hidden rounded-2xl border border-gold-border"
          style={{ background: "linear-gradient(135deg, rgba(200,169,109,0.07) 0%, rgba(200,169,109,0.03) 50%, transparent 100%)" }}
        >
          {/* Top line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_260px]">
            {/* Quote */}
            <div className="px-8 py-10 sm:px-12 sm:py-14">
              <div className="mb-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
                <span>{t("testi.label")}</span>
                <span className="h-px w-8 bg-gold-border" />
              </div>

              {/* Giant quote mark */}
              <div className="pointer-events-none absolute -top-2 left-10 select-none font-serif text-[160px] leading-none text-gold opacity-[0.07]">
                &ldquo;
              </div>

              <blockquote className="relative font-serif text-[clamp(18px,2.4vw,28px)] font-normal italic leading-[1.55] text-foreground">
                &ldquo;{t("testi.quote")}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-border bg-gold-bg font-serif text-xl text-gold">
                  S
                </div>
                <div>
                  <div className="text-[15px] font-medium text-foreground">{t("testi.name")}</div>
                  <div className="mt-0.5 font-mono text-[10px] tracking-wide text-muted">
                    {t("testi.role")}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats sidebar */}
            <div
              className="flex flex-col justify-center gap-0 border-t border-gold-border/40 md:border-t-0 md:border-l"
              style={{ borderColor: "rgba(200,169,109,0.2)" }}
            >
              {[
                { value: "150+", label: "Residents on system" },
                { value: "20+",  label: "Buildings managed" },
                { value: "0",    label: "Messages lost since launch" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`px-8 py-7 ${i < 2 ? "border-b" : ""}`}
                  style={{ borderColor: "rgba(200,169,109,0.15)" }}
                >
                  <div className="font-serif text-[38px] leading-none text-gold">{stat.value}</div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
