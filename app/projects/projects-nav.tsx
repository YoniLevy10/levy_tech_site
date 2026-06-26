"use client"

import Link from "next/link"

interface ProjectsNavProps {
  back?: { href: string; label: string }
}

export function ProjectsNav({ back }: ProjectsNavProps) {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b px-5 py-3 backdrop-blur-xl sm:px-[5vw] sm:py-4"
      style={{ borderColor: "var(--line)", background: "rgba(6,6,6,0.92)" }}
    >
      <Link href="/" className="flex items-center gap-3 no-underline">
        <div
          className="grid h-8 w-8 shrink-0 place-items-center rounded-md border font-serif text-sm"
          style={{
            borderColor: "var(--gold-bd)",
            background: "rgba(200,169,109,0.08)",
            color: "var(--gold)",
          }}
        >
          L
        </div>
        <span className="font-serif text-[16px] sm:text-[17px]" style={{ color: "var(--text)" }}>
          Levy Tech
        </span>
      </Link>

      {back && (
        <Link
          href={back.href}
          className="font-mono text-[10px] uppercase tracking-widest transition-opacity hover:opacity-100"
          style={{ color: "var(--dim)" }}
        >
          ← {back.label}
        </Link>
      )}
    </nav>
  )
}
