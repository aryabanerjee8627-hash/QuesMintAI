"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

function AuthForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const modeParam = searchParams.get("mode")
  const supabase = createClient()
  
  const [isLogin, setIsLogin] = useState(modeParam !== "signup")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: ""
  })

  useEffect(() => {
    setIsLogin(modeParam !== "signup")
  }, [modeParam])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })
        
        if (error) throw error
        
        toast.success("Welcome back!")
        router.push("/dashboard")
        router.refresh()
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            }
          }
        })
        
        if (error) throw error
        
        toast.success("Check your email to confirm your account!")
        setIsLogin(true)
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during authentication")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    const newMode = isLogin ? "signup" : "login"
    setIsLogin(!isLogin)
    router.replace(`/login?mode=${newMode}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0F172A]">
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Button>
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-[#3DD9B3]/20 bg-[#1e293b]/50 backdrop-blur-xl">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/Quesmint.png" alt="QuesMint Logo" width={32} height={32} className="rounded-lg" />
              <span className="font-bold text-2xl tracking-tight text-white">QuesMint</span>
            </Link>
            <CardTitle className="text-2xl font-bold text-white">
              {isLogin ? "Welcome back" : "Create an account"}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {isLogin 
                ? "Enter your email to sign in to your account" 
                : "Enter your details to get started with QuesMint"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Input 
                      type="text" 
                      placeholder="Full Name" 
                      required 
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="bg-[#0F172A] border-[#3DD9B3]/20 focus:border-[#3DD9B3] text-white transition-colors"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="space-y-2">
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-[#0F172A] border-[#3DD9B3]/20 focus:border-[#3DD9B3] text-white transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="bg-[#0F172A] border-[#3DD9B3]/20 focus:border-[#3DD9B3] text-white transition-colors"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-[#3DD9B3] hover:bg-[#32b896] text-[#0F172A] font-bold h-11" 
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
              <div className="text-sm text-center text-slate-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button"
                  onClick={toggleMode}
                  className="text-[#3DD9B3] hover:text-[#32b896] transition-colors font-medium"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-background to-background">
        <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
      </div>
    }>
      <AuthForm />
    </Suspense>
  )
}
