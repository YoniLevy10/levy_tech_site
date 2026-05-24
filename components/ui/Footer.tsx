export default function Footer() {
  return (
    <footer className="px-[5vw] py-6 border-t border-line flex justify-between items-center flex-wrap gap-3">
      <div className="font-serif text-[15px] text-muted">Levy Tech</div>
      <div className="text-[10px] text-faint font-mono tracking-wide">
        © 2026 ·{" "}
        <a href="mailto:OpsBrain1@gmail.com" className="text-muted no-underline hover:text-gold">
          OpsBrain1@gmail.com
        </a>
      </div>
    </footer>
  )
}
