"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image src="/Quesmint.png" alt="QuesMint Logo" width={32} height={32} className="rounded-lg shadow-[0_0_10px_rgba(61,217,179,0.2)] group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xl tracking-tight text-foreground">QuesMint</span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="hover:text-primary text-xs md:text-sm px-2 md:px-4">
              Sign In
            </Button>
          </Link>
          <Link href="/login?mode=signup">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm px-3 md:px-4 font-bold">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
