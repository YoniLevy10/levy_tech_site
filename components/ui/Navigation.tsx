"use client"

import { useI18n } from "@/lib/i18n"
import type { Language } from "@/lib/translations"

export default function Navigation() {
  const { lang, setLang, t } = useI18n()

  const languages: Language[] = ["en", "he", "fr"]

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-[5vw] py-4 bg-background/92 backdrop-blur-xl border-b border-line">
      <a href="#" className="flex items-center gap-3 no-underline">
        <div className="w-8 h-8 rounded-md border border-gold-border bg-gradient-to-br from-gold/15 to-gold/5 grid place-items-center font-serif text-sm text-gold shrink-0">
          L
        </div>
        <span className="font-serif text-[17px] text-foreground">Levy Tech</span>
      </a>

      <div className="hidden md:flex gap-6">
        <a href="#services" className="text-muted text-[13px] tracking-wide no-underline transition-colors hover:text-foreground">
          {t("nav.services")}
        </a>
        <a href="#projects" className="text-muted text-[13px] tracking-wide no-underline transition-colors hover:text-foreground">
          {t("nav.projects")}
        </a>
        <a href="#process" className="text-muted text-[13px] tracking-wide no-underline transition-colors hover:text-foreground">
          {t("nav.process")}
        </a>
        <a href="#contact" className="text-muted text-[13px] tracking-wide no-underline transition-colors hover:text-foreground">
          {t("nav.contact")}
        </a>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {languages.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-1 rounded-sm border text-[10px] font-mono tracking-wider cursor-pointer transition-all
                ${lang === l
                  ? "border-gold-border text-gold bg-gold-bg"
                  : "border-line text-muted bg-transparent hover:border-gold-border hover:text-gold"
                }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <a
          href="#contact"
          className="hidden md:flex px-4 py-2 rounded border border-gold-border bg-transparent text-gold text-xs tracking-wide no-underline transition-all hover:bg-gold-bg"
        >
          {t("nav.cta")}
        </a>
      </div>
    </nav>
  )
}
