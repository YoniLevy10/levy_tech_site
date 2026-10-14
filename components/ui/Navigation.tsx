"use client"

import { useEffect, useState } from "react"
import { useI18n } from "@/lib/i18n"
import type { Language } from "@/lib/translations"
import { BRAND_NAME } from "@/lib/site"

const links = [
  { href: "/#services", key: "nav.services" as const },
  { href: "/#projects", key: "nav.projects" as const },
  { href: "/projects", label: "Portfolio" },
  { href: "/#process", key: "nav.process" as const },
  { href: "/#contact", key: "nav.contact" as const },
]

export default function Navigation() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)

  const languages: Language[] = ["he", "en", "fr"]

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-background/92 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 px-5 py-3 sm:px-[5vw] sm:py-4">
        <a href="/" className="flex min-w-0 items-center gap-3 no-underline">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-gold-border bg-gradient-to-br from-gold/15 to-gold/5 font-serif text-sm text-gold">
            O
          </div>
          <span className="truncate font-serif text-[16px] text-foreground sm:text-[17px]">{BRAND_NAME}</span>
        </a>

        <div className="hidden gap-6 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] tracking-wide text-muted no-underline transition-colors hover:text-foreground"
            >
              {"key" in link && link.key ? t(link.key) : link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex gap-1">
            {languages.map((l) => (
              <button
                key={l}
                type="button"
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
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded border border-line text-foreground md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("nav.close") : t("nav.menu")}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t("nav.close") : t("nav.menu")}</span>
            <div className="flex w-4 flex-col gap-1">
              <span className={`h-px w-full bg-current transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-current transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-line bg-background px-5 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] tracking-wide text-foreground no-underline hover:bg-surface-1"
              >
                {"key" in link && link.key ? t(link.key) : link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded border border-gold-border bg-gold-bg px-4 py-3 text-[13px] tracking-wide text-gold no-underline"
            >
              {t("nav.cta")}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
