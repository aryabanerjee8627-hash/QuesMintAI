"use client"

import { Plus, History, BrainCircuit, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const stats = [
    { label: "Total Quizzes", value: "24", icon: BrainCircuit, color: "text-blue-400" },
    { label: "Total Questions", value: "128", icon: History, color: "text-violet-400" },
    { label: "Completion Rate", value: "88%", icon: Users, color: "text-emerald-400" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, Intern!</h1>
        <p className="text-muted-foreground">Here's what's happening with your learning today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-white/5 bg-white/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-white/5 bg-white/5">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Start something new or pick up where you left off.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700">
              <Plus className="w-6 h-6" />
              <span>Create New Quiz</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 border-white/10 hover:bg-white/5">
              <History className="w-6 h-6 text-muted-foreground" />
              <span>View History</span>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-white/5">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your last 3 generated quizzes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 p-3 rounded-lg border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded bg-violet-600/20 flex items-center justify-center text-violet-400 font-bold">
                    Q
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium group-hover:text-violet-400 transition-colors">Computer Science Fundamentals</div>
                    <div className="text-xs text-muted-foreground">Generated 2 hours ago • 15 Questions</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
