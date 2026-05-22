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
          <Button className="bg-violet-600 hover:bg-violet-700">
            Generate New
          </Button>
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search quizzes..." 
            className="pl-10 bg-white/5 border-white/10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-white/10 hover:bg-white/5">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <Card key={i} className="border-white/5 bg-white/5 animate-pulse h-48" />
          ))
        ) : filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="border-white/5 bg-white/5 hover:border-violet-500/30 transition-all group overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="bg-violet-600/20 p-2 rounded-lg text-violet-400 mb-2">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="h-8 w-8 text-muted-foreground hover:bg-white/5 rounded-lg flex items-center justify-center transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="w-4 h-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="gap-2 text-red-400 focus:text-red-400 cursor-pointer"
                        onClick={() => handleDelete(quiz.id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="line-clamp-1">{quiz.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {format(new Date(quiz.created_at), "MMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-white/5 border-white/10 font-normal">
                      {quiz.question_count} Qs
                    </Badge>
                    <Badge variant="outline" className="bg-white/5 border-white/10 font-normal">
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  <Link href={`/dashboard/quiz/${quiz.id}`}>
                    <Button variant="ghost" size="sm" className="group-hover:text-violet-400 transition-colors">
                      Retake <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4 border-2 border-dashed border-white/5 rounded-2xl">
            <p className="text-muted-foreground">No quizzes found.</p>
            <Link href="/dashboard/create">
              <Button variant="outline" className="border-white/10">Generate your first quiz</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
