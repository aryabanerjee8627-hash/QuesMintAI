"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Settings, 
  LogOut, 
  Menu,
  Sparkles,
  ChevronLeft,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { api } from "@/lib/api"
import { Progress } from "@/components/ui/progress"

export function Sidebar({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [usage, setUsage] = useState({ used: 0, limit: 10 })

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const data = await api.getUsage()
        setUsage(data)
      } catch (error) {
        console.error("Failed to fetch usage", error)
      }
    }
    fetchUsage()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error("Failed to log out")
    } else {
      toast.success("Logged out successfully")
      router.push("/")
      router.refresh()
    }
  }

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Create Quiz",
      icon: PlusCircle,
      href: "/dashboard/create",
      active: pathname === "/dashboard/create",
    },
    {
      label: "History",
      icon: History,
      href: "/dashboard/history",
      active: pathname === "/dashboard/history",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/5 bg-navy-surface/80 backdrop-blur-xl transition-all duration-300 ease-in-out lg:relative",
        isOpen ? "w-72" : "w-20 -translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex flex-col h-full p-6">
        {/* Logo */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/dashboard" className={cn("flex items-center gap-3 overflow-hidden transition-all", !isOpen && "w-0")}>
            <img src="/Quesmint.png" alt="QuesMint Logo" className="w-10 h-10 object-contain rounded-xl shadow-[0_0_15px_rgba(61,217,179,0.2)]" />
            <span className="font-bold text-2xl tracking-tighter text-foreground">QuesMint</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggle}
            className="hover:bg-primary/10 hover:text-primary lg:hidden"
          >
            <ChevronLeft />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative",
                route.active 
                  ? "bg-primary/10 text-primary font-bold" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              <route.icon className={cn("w-5 h-5 shrink-0", route.active ? "text-primary" : "group-hover:text-primary transition-colors")} />
              <span className={cn("transition-opacity duration-200 whitespace-nowrap", !isOpen && "lg:hidden")}>
                {route.label}
              </span>
              {route.active && (
                <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full shadow-[0_0_10px_#3DD9B3]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Usage Card (Cloud Storage style) */}
        {isOpen && (
          <div className="mt-8 mb-6 p-5 rounded-2xl bg-navy/40 backdrop-blur-md border border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Daily Quota</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <p className="text-sm font-bold">{usage.used} <span className="text-muted-foreground font-medium">/ {usage.limit}</span></p>
                <p className="text-xs text-muted-foreground">{Math.round((usage.used/usage.limit)*100)}%</p>
              </div>
              <Progress value={(usage.used/usage.limit)*100} className="h-1.5 bg-primary/10" />
              <Button size="sm" variant="outline" className="w-full mt-2 h-9 border-primary/20 text-xs font-bold hover:bg-primary hover:text-primary-foreground rounded-xl">
                Upgrade Plan
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="pt-4 mt-auto">
          <Separator className="bg-white/5 mb-4" />
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className={cn(
              "w-full justify-start gap-4 h-12 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10",
              !isOpen && "lg:px-2 lg:justify-center"
            )}
          >
            <LogOut className="w-5 h-5" />
            <span className={cn(!isOpen && "lg:hidden")}>Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  )
}
