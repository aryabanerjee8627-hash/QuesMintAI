"use client"

import { useEffect, useState } from "react"
import { Plus, History, BrainCircuit, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { createClient } from "@/lib/supabase/client"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"
import { toast } from "sonner"

export default function DashboardPage() {
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [usage, setUsage] = useState({ used: 0, limit: 10 })
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState("User")
  const router = useRouter()
  
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch User Info
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push("/login")
          return
        }

        if (user?.user_metadata?.full_name) {
          setUserName(user.user_metadata.full_name.split(' ')[0])
        } else if (user?.email) {
          setUserName(user.email.split('@')[0])
        }

        // Fetch Quizzes and Usage in parallel
        const [historyData, usageData] = await Promise.all([
          api.getHistory(),
          api.getUsage()
        ])
        
        setQuizzes(historyData)
        setUsage(usageData)
      } catch (error: any) {
        console.error("Failed to fetch dashboard data:", error)
        if (error.message?.includes("session") || error.message?.includes("login") || error.message?.includes("history")) {
          router.push("/login")
        } else {
          toast.error("Failed to load dashboard data")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (loading) {
    return <DashboardSkeleton />
  }

  // Calculate Stats
  const totalQuizzes = quizzes.length
  const totalQuestions = quizzes.reduce((acc, q) => acc + (q.question_count || 0), 0)
  const recentQuizzes = quizzes.slice(0, 3)

  const stats = [
    { label: "Total Quizzes", value: totalQuizzes.toString(), icon: BrainCircuit, color: "text-primary" },
    { label: "Daily Usage", value: `${usage.used}/${usage.limit}`, icon: History, color: "text-primary" },
    { label: "Total Questions", value: totalQuestions.toString(), icon: Users, color: "text-primary" },
  ]

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">Welcome back, {userName}!</h1>
        <p className="text-sm md:text-base text-muted-foreground font-medium">Here's your teaching and learning overview for today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-white/5 bg-navy-surface/40 backdrop-blur-md hover:border-primary/20 transition-all rounded-3xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold tracking-tight">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-white/5 bg-navy-surface/40 backdrop-blur-md rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-bold tracking-tight">Quick Actions</CardTitle>
            <CardDescription className="text-xs md:text-sm font-medium">Create a new assessment or manage your library.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <Link href="/dashboard/create" className="contents">
              <Button className="h-24 md:h-28 flex flex-col items-center justify-center gap-3 bg-primary text-primary-foreground hover:bg-primary-hover rounded-2xl shadow-lg shadow-primary/10">
                <Plus className="w-6 h-6 md:w-7 md:h-7" />
                <span className="font-bold uppercase tracking-widest text-[10px]">Create New Quiz</span>
              </Button>
            </Link>
            <Link href="/dashboard/history" className="contents">
              <Button variant="outline" className="h-24 md:h-28 flex flex-col items-center justify-center gap-3 border-white/5 bg-white/5 hover:bg-white/10 rounded-2xl">
                <History className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                <span className="font-bold uppercase tracking-widest text-[10px]">View History</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-navy-surface/40 backdrop-blur-md rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold tracking-tight">Recent Activity</CardTitle>
              <CardDescription className="font-medium">Your most recent generated quizzes.</CardDescription>
            </div>
            {quizzes.length > 3 && (
              <Link href="/dashboard/history">
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover font-bold">
                  See All
                </Button>
              </Link>
            )}
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {recentQuizzes.length > 0 ? (
                recentQuizzes.map((quiz) => (
                  <Link key={quiz.id} href={`/dashboard/quiz/${quiz.id}`}>
                    <div className="flex items-center gap-5 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/20 transition-all cursor-pointer group">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl shadow-[0_0_10px_rgba(61,217,179,0.2)]">
                        {quiz.title.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold group-hover:text-primary transition-colors truncate">{quiz.title}</div>
                        <div className="text-xs text-muted-foreground font-medium mt-1">
                          {formatDistanceToNow(new Date(quiz.created_at), { addSuffix: true })} • {quiz.question_count} Questions
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </Link>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground font-medium">No quizzes generated yet.</p>
                  <Link href="/dashboard/create" className="mt-4 inline-block">
                    <Button variant="link" className="text-primary font-bold hover:text-primary-hover">Start your first generation</Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
