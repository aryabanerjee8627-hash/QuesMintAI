"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { TypewriterHeading } from "./typewriter-heading"

import { NetworkBackground } from "./network-background"

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <NetworkBackground />
      
      <div className="container mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-12"
        >
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter"
            >
              <span className="text-foreground">Intelligent</span> <br />
              <span className="text-primary">Quizzes</span>
            </motion.h1>
            
            <div className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground font-medium">
              <TypewriterHeading 
                text="Turn your notes into high-quality assessments in seconds using QuesMint AI." 
                delay={0.8} 
                className="text-lg md:text-xl font-medium tracking-normal mb-0" 
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link href="/login?mode=signup">
              <button className="px-12 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold tracking-widest uppercase transition-all duration-300 text-sm md:text-base">
                enter quesmint.ai
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-12 bg-primary/30" />
      </div>
    </section>
  )
}
