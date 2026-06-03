"use client"

import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Zap, LineChart, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TypewriterHeading } from "@/components/landing/typewriter-heading";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-primary-foreground relative">
      <Navbar />
      
      {/* Global Ambient Light Effect */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-violet-600/10 blur-[150px] rounded-full" />
      </div>

      <Hero />
      
      {/* Features Section */}
      <section id="features" className="pt-12 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <TypewriterHeading text="Built for Educators" delay={0.5} className="text-white [text-shadow:0_0_20px_rgba(255,255,255,0.3)]" />
            <p className="text-slate-200 text-lg font-medium [text-shadow:0_0_10px_rgba(0,0,0,0.5)]">
              A powerful suite of AI tools designed to streamline assessment and accelerate learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Multimodal QuesMint AI",
                description: "Seamlessly process PDFs, lecture images, and handwritten notes with our advanced AI engine.",
                icon: Brain
              },
              {
                title: "30-Second Generation",
                description: "Create high-fidelity MCQs and short-answer questions faster than traditional methods.",
                icon: Zap
              },
              {
                title: "Detailed Analytics",
                description: "Monitor student engagement and mastery with automated quiz performance tracking.",
                icon: LineChart
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.15 }}
                className="p-8 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-3xl hover:bg-white/10 hover:border-primary/50 transition-all duration-300 group shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary [filter:drop-shadow(0_0_5px_rgba(61,217,179,0.5))]" />
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight text-white [text-shadow:0_0_10px_rgba(255,255,255,0.2)]">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 font-bold text-2xl text-white"><ShieldCheck className="w-8 h-8 text-primary" /> Verified Secure</div>
            <div className="text-xl font-medium tracking-widest uppercase text-white [text-shadow:0_0_10px_rgba(255,255,255,0.3)]">Powered by QuesMint AI</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[160px] rounded-full -z-10" />
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="max-w-4xl mx-auto p-12 rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-white [text-shadow:0_0_20px_rgba(255,255,255,0.3)]">Ready to evolve?</h2>
            <p className="text-lg text-slate-200 mb-8 max-w-2xl mx-auto">
              Join thousands of forward-thinking educators using QuesMint to deliver high-quality quizzes instantly.
            </p>
            <Link href="/login?mode=signup">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-12 rounded-none font-bold uppercase tracking-widest text-sm transition-all duration-300">
                Create Account
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <Image src="/Quesmint.png" alt="QuesMint Logo" width={32} height={32} className="rounded-lg" />
              <span className="font-bold text-2xl tracking-tighter">QuesMint</span>
            </div>
            
            <div className="flex gap-12 text-sm font-medium text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
            </div>
            
            <p className="text-sm text-muted-foreground font-medium">
              © 2026 QuesMint AI. Professional Grade Assessments.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
