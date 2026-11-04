"use client"

import { useEffect } from "react"
import { I18nProvider } from "@/lib/i18n"
import Navigation from "@/components/ui/Navigation"
import HeroContent from "@/components/ui/HeroContent"
import Manifesto from "@/components/ui/Manifesto"
import BeforeAfter from "@/components/ui/BeforeAfter"
import VideoSection from "@/components/ui/VideoSection"
import Services from "@/components/ui/Services"
import Projects from "@/components/ui/Projects"
import Process from "@/components/ui/Process"
import FAQ from "@/components/ui/FAQ"
import WhyOpsBrain from "@/components/ui/WhyOpsBrain"
import Infrastructure from "@/components/ui/Infrastructure"
import Contact from "@/components/ui/Contact"
import Footer from "@/components/ui/Footer"

function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="hero-glow absolute inset-0" />
      <div className="absolute left-1/2 top-[46%] h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-border/50" />
      <div className="absolute left-1/2 top-[46%] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-border/30" />
      <div className="absolute inset-x-[14%] top-[62%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return

    let tries = 0
    const timer = window.setInterval(() => {
      const el = document.getElementById(id)
      tries += 1
      if (!el || tries > 20) {
        window.clearInterval(timer)
        return
      }
      const top = el.getBoundingClientRect().top
      if (top > 120) {
        window.scrollTo({ top: top + window.scrollY - 88, behavior: "instant" })
        return
      }
      window.clearInterval(timer)
    }, 50)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <I18nProvider>
      <Navigation />
      <main>
        <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden">
          <HeroAtmosphere />
          <HeroContent />

          <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 opacity-40">
            <div className="h-8 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
            <span className="font-mono text-[9px] tracking-widest text-gold">SCROLL</span>
          </div>
        </section>

        <Manifesto />
        <BeforeAfter />
        <VideoSection />
        <Services />
        <WhyOpsBrain />
        <Projects />
        <Process />
        <Infrastructure />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </I18nProvider>
  )
}
