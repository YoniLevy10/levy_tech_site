"use client"

import { motion, useReducedMotion } from "framer-motion"

const rise = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}

export function TextRise({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion()
  const words = text.split(" ").filter(Boolean)

  if (reduce) {
    return <span className={className}>{text}</span>
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.055 } } }}
    >
      {words.map((word, index) => (
        <motion.span key={`${word}-${index}`} className="inline-block" variants={rise}>
          {word}
          {index < words.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </motion.span>
  )
}
