export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-line px-6 py-8 text-center sm:flex-row sm:px-[5vw] sm:text-left">
      <div className="font-serif text-[16px] text-muted">Levy Tech</div>

      <div className="font-mono text-[10px] tracking-wide text-faint">
        © 2026 ·{" "}
        <a href="mailto:OpsBrain1@gmail.com" className="text-muted no-underline transition-colors hover:text-gold">
          OpsBrain1@gmail.com
        </a>
      </div>
    </footer>
  )
}
