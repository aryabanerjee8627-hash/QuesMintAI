"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Settings, 
  LogOut, 
  Menu,
  Sparkles,
  ChevronLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

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
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "relative h-full border-r border-white/10 bg-black/20 backdrop-blur-xl transition-all duration-300 ease-in-out",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard" className={cn("flex items-center gap-2 overflow-hidden transition-all", !isSidebarOpen && "w-0")}>
              <div className="bg-violet-600 p-1 rounded-lg shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">QuesMint</span>
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hover:bg-white/5"
            >
              {isSidebarOpen ? <ChevronLeft /> : <Menu />}
            </Button>
          </div>

          <nav className="flex-1 space-y-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                  route.active 
                    ? "bg-violet-600/10 text-violet-400 font-medium" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <route.icon className={cn("w-5 h-5 shrink-0", route.active ? "text-violet-400" : "group-hover:text-foreground")} />
                <span className={cn("transition-opacity duration-200", !isSidebarOpen && "opacity-0 w-0")}>
                  {route.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-2">
            <Separator className="bg-white/10 my-4" />
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start gap-3 text-muted-foreground hover:text-red-400 hover:bg-red-400/5",
                !isSidebarOpen && "px-2"
              )}
            >
              <LogOut className="w-5 h-5" />
              {isSidebarOpen && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-900/5 via-background to-background">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
