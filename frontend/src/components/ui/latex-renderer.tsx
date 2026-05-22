"use client"

import React from "react"
import katex from "katex"
import "katex/dist/katex.min.css"

interface LatexRendererProps {
  text: string
  className?: string
}

export function LatexRenderer({ text, className = "" }: LatexRendererProps) {
  if (!text) return null

  // Regex to split on LaTeX delimiters:
  // 1. $$...$$ (block math)
  // 2. $...$ (inline math)
  // 3. \[...\] (block math)
  // 4. \(...\) (inline math)
  const regex = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\))/g

  const parts = text.split(regex)

  return (
    <span className={className}>
      {parts.map((part, i) => {
        // Block math $$...$$
        if (part.startsWith("$$") && part.endsWith("$$")) {
          const math = part.slice(2, -2).trim()
          try {
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false })
            return (
              <span
                key={i}
                dangerouslySetInnerHTML={{ __html: html }}
                className="block my-3 overflow-x-auto w-full max-w-full scrollbar-thin scrollbar-thumb-white/10"
              />
            )
          } catch (err) {
            console.error("KaTeX block rendering error:", err)
            return <code key={i} className="text-rose-400 bg-white/5 px-1 rounded font-mono text-xs">{part}</code>
          }
        }

        // Block math \[...\]
        if (part.startsWith("\\[") && part.endsWith("\\]")) {
          const math = part.slice(2, -2).trim()
          try {
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false })
            return (
              <span
                key={i}
                dangerouslySetInnerHTML={{ __html: html }}
                className="block my-3 overflow-x-auto w-full max-w-full scrollbar-thin scrollbar-thumb-white/10"
              />
            )
          } catch (err) {
            console.error("KaTeX block bracket rendering error:", err)
            return <code key={i} className="text-rose-400 bg-white/5 px-1 rounded font-mono text-xs">{part}</code>
          }
        }

        // Inline math $...$
        if (part.startsWith("$") && part.endsWith("$")) {
          const math = part.slice(1, -1).trim()
          try {
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false })
            return (
              <span
                key={i}
                dangerouslySetInnerHTML={{ __html: html }}
                className="inline-block align-middle px-0.5"
              />
            )
          } catch (err) {
            console.error("KaTeX inline rendering error:", err)
            return <code key={i} className="text-rose-400 bg-white/5 px-1 rounded font-mono text-xs">{part}</code>
          }
        }

        // Inline math \(...\)
        if (part.startsWith("\\(") && part.endsWith("\\)")) {
          const math = part.slice(2, -2).trim()
          try {
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false })
            return (
              <span
                key={i}
                dangerouslySetInnerHTML={{ __html: html }}
                className="inline-block align-middle px-0.5"
              />
            )
          } catch (err) {
            console.error("KaTeX inline paren rendering error:", err)
            return <code key={i} className="text-rose-400 bg-white/5 px-1 rounded font-mono text-xs">{part}</code>
          }
        }

        // Regular text node
        return <React.Fragment key={i}>{part}</React.Fragment>
      })}
    </span>
  )
}
