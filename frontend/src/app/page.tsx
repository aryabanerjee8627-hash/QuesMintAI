import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Additional sections like Features, CTA, etc. will go here */}
      <section id="features" className="py-24 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to master your studies</h2>
            <p className="text-muted-foreground text-lg">
              QuesMint provides a suite of AI-powered tools designed to help you learn faster and more effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Multimodal AI",
                description: "Upload PDFs, images, or raw text. Our AI understands it all.",
                icon: "🧠"
              },
              {
                title: "Instant Quizzes",
                description: "Generate high-quality MCQs and mock tests in under 30 seconds.",
                icon: "⚡"
              },
              {
                title: "Progress Tracking",
                description: "Keep track of your quiz history and see your improvements over time.",
                icon: "📈"
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
