"use client"

import { useI18n } from "@/lib/i18n"
import type { Language } from "@/lib/translations"

export default function Navigation() {
  const { lang, setLang, t } = useI18n()

  const languages: Language[] = ["en", "he", "fr"]

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-line bg-background/92 px-5 py-3 backdrop-blur-xl sm:px-[5vw] sm:py-4">
      <a href="#" className="flex min-w-0 items-center gap-3 no-underline">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-gold-border bg-gradient-to-br from-gold/15 to-gold/5 font-serif text-sm text-gold">
          L
        </div>
        <span className="truncate font-serif text-[16px] text-foreground sm:text-[17px]">Levy Tech</span>
      </a>

      <div className="hidden gap-6 md:flex">
        <a href="/#services" className="text-[13px] tracking-wide text-muted no-underline transition-colors hover:text-foreground">{t("nav.services")}</a>
        <a href="/#projects" className="text-[13px] tracking-wide text-muted no-underline transition-colors hover:text-foreground">{t("nav.projects")}</a>
        <a href="/projects" className="text-[13px] tracking-wide text-muted no-underline transition-colors hover:text-foreground">Portfolio</a>
        <a href="/#process" className="text-[13px] tracking-wide text-muted no-underline transition-colors hover:text-foreground">{t("nav.process")}</a>
        <a href="/#contact" className="text-[13px] tracking-wide text-muted no-underline transition-colors hover:text-foreground">{t("nav.contact")}</a>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="flex gap-1">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`cursor-pointer rounded-sm border px-2 py-1 font-mono text-[9px] tracking-wider transition-all sm:text-[10px] ${
                lang === l
                  ? "border-gold-border bg-gold-bg text-gold"
                  : "border-line bg-transparent text-muted hover:border-gold-border hover:text-gold"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden rounded border border-gold-border bg-transparent px-4 py-2 text-xs tracking-wide text-gold no-underline transition-all hover:bg-gold-bg md:flex"
        >
          {t("nav.cta")}
        </a>
      </div>
    </nav>
  )
}
