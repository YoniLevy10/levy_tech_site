"use client"

import { I18nProvider } from "@/lib/i18n"
import Navigation from "@/components/ui/Navigation"
import HeroContent from "@/components/ui/HeroContent"
import Manifesto from "@/components/ui/Manifesto"
import BeforeAfter from "@/components/ui/BeforeAfter"
import Services from "@/components/ui/Services"
import Projects from "@/components/ui/Projects"
import Testimonial from "@/components/ui/Testimonial"
import Process from "@/components/ui/Process"
import FAQ from "@/components/ui/FAQ"
import WhyLevyTech from "@/components/ui/WhyLevyTech"
import Infrastructure from "@/components/ui/Infrastructure"
import Contact from "@/components/ui/Contact"
import CTA from "@/components/ui/CTA"
import Footer from "@/components/ui/Footer"

function HeroAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(200,169,109,0.18),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(200,169,109,0.08),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.045),transparent_24%)]" />
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-border/40 bg-gold/5 blur-[1px]" />
      <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rotate-[18deg] rounded-full border border-gold-border/30" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(200,169,109,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(200,169,109,0.8)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-x-[10%] top-1/2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute inset-y-[18%] left-1/2 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
    </div>
  )
}

export default function Home() {
  return (
    <I18nProvider>
      <Navigation />
      <main>
        <section className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden">
          <HeroAtmosphere />
          <HeroContent />

          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 opacity-40">
            <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-gold">SCROLL</span>
          </div>
        </section>

        <Manifesto />
        <BeforeAfter />
        <Services />
        <WhyLevyTech />
        <Projects />
        <Testimonial />
        <Process />
        <Infrastructure />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </I18nProvider>
  )
}
