"use client"

import { useRef, useState } from "react"
import { useI18n } from "@/lib/i18n"
import {
  whatsappUrl,
  WHATSAPP_PREFILL_EN,
  WHATSAPP_PREFILL_HE,
  WHATSAPP_PREFILL_FR,
} from "@/lib/site"
import { motion } from "framer-motion"

const VIDEO_SRC = "/videos/opsbrain-promo.mp4"
const POSTER_SRC = "/videos/opsbrain-promo-poster.jpg"

export default function VideoSection() {
  const { t, lang } = useI18n()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const waMessage =
    lang === "he" ? WHATSAPP_PREFILL_HE : lang === "fr" ? WHATSAPP_PREFILL_FR : WHATSAPP_PREFILL_EN

  const startPlayback = async () => {
    const el = videoRef.current
    if (!el) return
    try {
      el.muted = false
      await el.play()
      setPlaying(true)
    } catch {
      // Autoplay policies — user can use native controls after a second click
      setPlaying(true)
    }
  }

  return (
    <section id="video" className="border-t border-line px-6 py-20 sm:px-[5vw] sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.15 }}
          className="mb-10 max-w-2xl"
        >
          <div className="mb-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-gold sm:text-[10px]">
            <span>{t("video.label")}</span>
            <span className="h-px w-8 bg-gold-border" />
          </div>
          <h2 className="font-serif text-[clamp(32px,7vw,48px)] font-normal leading-[1.08] tracking-[-0.03em] text-foreground">
            {t("video.h2")} <em className="italic text-gold">{t("video.h2.em")}</em>
          </h2>
          <p className="mt-5 text-[16px] font-light leading-[1.9] text-muted">{t("video.p")}</p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative mx-auto w-full max-w-[420px]"
          >
            {/* Reserved aspect ratio — portrait source 576×720 */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface-1">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                poster={POSTER_SRC}
                preload="none"
                playsInline
                controls={playing}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>

              {!playing && (
                <button
                  type="button"
                  onClick={startPlayback}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/35 transition hover:bg-background/25"
                  aria-label={t("video.play")}
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-gold-border bg-gold text-background shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
                    <PlayIcon />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    {t("video.play")}
                  </span>
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex max-w-lg flex-col justify-center lg:pt-6"
          >
            <h3 className="mb-4 font-serif text-[clamp(24px,4vw,32px)] font-normal leading-[1.15] tracking-[-0.02em] text-foreground">
              {t("video.cta.title")}
            </h3>
            <p className="mb-8 text-[15px] font-light leading-[1.9] text-muted">{t("video.cta.p")}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded bg-gold px-6 py-3.5 text-[13px] font-medium tracking-wide text-background no-underline transition-all hover:-translate-y-0.5 hover:bg-gold-light"
              >
                {t("video.cta.contact")} <span aria-hidden="true">→</span>
              </a>
              <a
                href={whatsappUrl(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded border border-gold-border px-6 py-3.5 text-[13px] tracking-wide text-gold no-underline transition-all hover:bg-gold-bg"
              >
                {t("video.cta.wa")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72L19 12 8 5.14z" />
    </svg>
  )
}
