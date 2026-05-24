"use client"

import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
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
import Infrastructure from "@/components/ui/Infrastructure"
import Contact from "@/components/ui/Contact"
import CTA from "@/components/ui/CTA"
import Footer from "@/components/ui/Footer"

// Dynamically import 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-radial from-gold/5 via-transparent to-transparent" />
  ),
})

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [is3DReady, setIs3DReady] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    setMousePosition({ x, y })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    
    // Delay 3D loading slightly for smoother initial render
    const timer = setTimeout(() => setIs3DReady(true), 100)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timer)
    }
  }, [handleMouseMove])

  return (
    <I18nProvider>
      <Navigation />
      <main>
        {/* Hero Section with 3D */}
        <section className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden">
          {is3DReady && <HeroScene mousePosition={mousePosition} />}
          <HeroContent />
          
          {/* Scroll indicator */}
          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10 opacity-40">
            <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-gold">SCROLL</span>
          </div>
        </section>

        <Manifesto />
        <BeforeAfter />
        <Services />
        <Projects />
        <Testimonial />
        <Process />
        <FAQ />
        <Infrastructure />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </I18nProvider>
  )
}
