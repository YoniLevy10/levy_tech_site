import { ArrowRight, ArrowUpRight } from "lucide-react"

const stroke = "size-3.5 shrink-0 rtl:-scale-x-100"

export function ArrowForward({ className = stroke }: { className?: string }) {
  return <ArrowRight aria-hidden className={className} />
}

export function ArrowOut({ className = stroke }: { className?: string }) {
  return <ArrowUpRight aria-hidden className={className} />
}
