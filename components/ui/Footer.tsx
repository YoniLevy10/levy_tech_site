import { BRAND_NAME, CONTACT_EMAIL } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-line px-6 py-8 text-center sm:flex-row sm:px-[5vw] sm:text-left">
      <div className="font-serif text-[16px] text-muted">{BRAND_NAME}</div>

      <div className="font-mono text-[10px] tracking-wide text-faint">
        © 2026 ·{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted no-underline transition-colors hover:text-gold">
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  )
}
