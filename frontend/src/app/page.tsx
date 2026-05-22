import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Zap, LineChart, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <section id="features" className="py-32 bg-navy/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Built for Educators</h2>
            <p className="text-muted-foreground text-lg font-medium">
              A powerful suite of AI tools designed to streamline assessment and accelerate learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Multimodal Gemini AI",
                description: "Seamlessly process PDFs, lecture images, and handwritten notes with Gemini 1.5 Flash.",
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
              <div key={i} className="p-10 rounded-3xl border border-white/5 bg-navy-surface/40 backdrop-blur-xl hover:bg-navy-surface/60 hover:border-primary/20 transition-all duration-300 group shadow-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 border-y border-white/5 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 font-bold text-2xl"><ShieldCheck className="w-8 h-8 text-primary" /> Verified Secure</div>
            <div className="text-xl font-medium tracking-widest uppercase">Powered by Gemini AI</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden bg-navy">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full -z-10" />
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto p-16 rounded-[2rem] border border-white/5 bg-navy-surface/20 backdrop-blur-xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Ready to evolve?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join thousands of forward-thinking educators using QuesMint to deliver high-quality quizzes instantly.
            </p>
            <Link href="/login?mode=signup">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-12 rounded-none font-bold uppercase tracking-widest text-sm transition-all duration-300">
                Create Account
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
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
