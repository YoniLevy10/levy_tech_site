"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import type { Language } from "@/lib/translations"
import { BRAND_NAME } from "@/lib/site"

const links = [
  { href: "/#services", key: "nav.services" as const },
  { href: "/projects", key: "nav.projects" as const },
  { href: "/#process", key: "nav.process" as const },
  { href: "/#contact", key: "nav.contact" as const },
]

export default function Navigation() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const languages: Language[] = ["he", "en", "fr"]

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light")
  }, [])

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    localStorage.setItem("opsbrain-theme", next)
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#2a2622" : "#efe8dc")
    setTheme(next)
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-background/92 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 px-5 py-3 sm:px-[5vw] sm:py-4">
        <a href="/" className="font-serif text-[17px] text-foreground no-underline">
          {BRAND_NAME}
        </a>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? t("nav.theme.toLight") : t("nav.theme.toDark")}
            className="grid size-10 place-items-center rounded-full border border-line text-foreground transition-colors hover:border-gold-border hover:text-gold"
          >
            {theme === "dark" ? <Sun aria-hidden className="size-4" strokeWidth={1.5} /> : <Moon aria-hidden className="size-4" strokeWidth={1.5} />}
          </button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line text-foreground transition-colors hover:border-gold-border hover:text-gold"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? t("nav.close") : t("nav.menu")}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex w-4 flex-col gap-1">
              <span className={`h-px w-full bg-current transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-current transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="site-nav" className="border-t border-line bg-background px-5 py-6 sm:px-[5vw]">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-[16px] font-light leading-[1.85] tracking-wide text-foreground no-underline hover:bg-surface-1"
              >
                {t(link.key)}
              </a>
            ))}
            <div className="mt-4 flex gap-2 px-3">
              {languages.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 font-mono text-[10px] tracking-wider ${
                    lang === code
                      ? "border-gold-border bg-gold-bg text-gold"
                      : "border-line text-muted hover:border-gold-border hover:text-gold"
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex w-fit items-center rounded-full border border-gold-border bg-gold-bg px-5 py-3 text-[13px] tracking-wide text-gold no-underline"
            >
              {t("nav.cta")}
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
