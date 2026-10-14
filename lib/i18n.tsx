"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { translations, type Language, type TranslationKey } from "./translations"

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: TranslationKey) => string
  isRTL: boolean
}

const I18nContext = createContext<I18nContextType | null>(null)

function applyDocumentLang(lang: Language) {
  document.documentElement.setAttribute("lang", lang)
  document.documentElement.setAttribute("dir", lang === "he" ? "rtl" : "ltr")
  document.body.classList.toggle("rtl", lang === "he")
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // Default language: Hebrew (marketing site for IL prospects)
  const [lang, setLangState] = useState<Language>("he")

  useEffect(() => {
    applyDocumentLang(lang)
  }, [lang])

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang)
  }, [])

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[lang][key] ?? key
    },
    [lang]
  )

  const isRTL = lang === "he"

  return <I18nContext.Provider value={{ lang, setLang, t, isRTL }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
