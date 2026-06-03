"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { 
  Search, 
  Filter, 
  Calendar, 
  MoreVertical, 
  Eye, 
  Trash2,
  BrainCircuit,
  ArrowRight
} from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { api } from "@/lib/api"

export default function HistoryPage() {
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api.getHistory()
        setQuizzes(data)
      } catch (error) {
        toast.error("Failed to fetch history")
        setQuizzes([])
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quiz? This cannot be undone.")) return

    try {
      await api.deleteQuiz(id)
      setQuizzes(quizzes.filter(q => q.id !== id))
      toast.success("Quiz deleted successfully")
    } catch (error) {
      toast.error("Failed to delete quiz")
    }
  }

  const filteredQuizzes = quizzes.filter(q => 
    q.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Quiz History</h1>
          <p className="text-muted-foreground">Review and retake your previously generated quizzes.</p>
        </div>
        <Link href="/dashboard/create">
          <Button className="bg-primary hover:bg-primary-hover text-navy font-bold rounded-xl shadow-[0_0_20px_rgba(61,217,179,0.2)] transition-all">
            Generate New
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search quizzes..." 
            className="pl-10 bg-white/5 border-white/10 rounded-xl h-11 focus:border-primary transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl h-11 px-6">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <Card key={i} className="border-white/5 bg-white/5 animate-pulse h-48 rounded-2xl" />
          ))
        ) : filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="border-white/5 bg-white/5 hover:border-primary/30 transition-all group overflow-hidden rounded-2xl shadow-xl hover:shadow-primary/5">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="bg-primary/20 p-2.5 rounded-xl text-primary mb-2 shadow-[0_0_15px_rgba(61,217,179,0.1)]">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="h-8 w-8 text-muted-foreground hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-navy-surface border-white/10 rounded-xl shadow-2xl">
                      <DropdownMenuItem className="gap-2 px-4 py-2.5 cursor-pointer rounded-lg mx-1 my-1">
                        <Eye className="w-4 h-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="gap-2 text-red-400 focus:text-red-400 focus:bg-red-400/10 px-4 py-2.5 cursor-pointer rounded-lg mx-1 my-1"
                        onClick={() => handleDelete(quiz.id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="line-clamp-1 text-lg font-bold">{quiz.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-xs font-medium">
                  <Calendar className="w-3 h-3 text-primary" />
                  {format(new Date(quiz.created_at), "MMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-white/5 border-white/10 font-bold text-[10px] px-2 py-0.5 rounded-lg uppercase tracking-wider text-muted-foreground">
                      {quiz.question_count} Qs
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 border-white/10 font-bold text-[10px] px-2 py-0.5 rounded-lg uppercase tracking-wider text-muted-foreground">
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  <Link href={`/dashboard/quiz/${quiz.id}`}>
                    <Button variant="ghost" size="sm" className="group-hover:text-primary transition-colors font-bold text-xs h-9 rounded-xl">
                      Retake <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-24 text-center space-y-6 border-2 border-dashed border-white/5 rounded-3xl bg-white/5 shadow-inner">
            <div className="mx-auto w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground">
              <Search className="w-8 h-8 opacity-20" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold text-foreground">No quizzes found</p>
              <p className="text-muted-foreground max-w-xs mx-auto text-sm">You haven't generated any quizzes yet. Start your journey with AI-powered assessments.</p>
            </div>
            <Link href="/dashboard/create">
              <Button variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary rounded-xl px-8 h-11 transition-all">
                Generate your first quiz
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
