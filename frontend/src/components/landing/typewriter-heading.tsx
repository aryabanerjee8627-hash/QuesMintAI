"use client"

import { motion } from "framer-motion"

export function TypewriterHeading({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) {
  const characters = text.split("")

  return (
    <div className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${className}`}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: delay + (i * 0.05) }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  )
}
