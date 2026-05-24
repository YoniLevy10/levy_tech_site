"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { translations, type Language, type TranslationKey } from "./translations"

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: TranslationKey) => string
  isRTL: boolean
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en")

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang)
    document.documentElement.setAttribute("lang", newLang)
    document.documentElement.setAttribute("dir", newLang === "he" ? "rtl" : "ltr")
    if (newLang === "he") {
      document.body.classList.add("rtl")
    } else {
      document.body.classList.remove("rtl")
    }
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
