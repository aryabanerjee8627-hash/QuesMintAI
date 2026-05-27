"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Copy, 
  Check, 
  Eye, 
  EyeOff,
  ArrowLeft, 
  Home,
  Printer,
  Download,
  Loader2,
  BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { api } from "@/lib/api"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { LatexRenderer } from "@/components/ui/latex-renderer"

interface Question {
  id: string
  question: string
  type: "mcq" | "one_word" | "long_answer" | "true_or_false"
  options?: string[]
  correct_index?: number
  answer: string
  explanation: string
}

interface Quiz {
  id: string
  title: string
  difficulty: string
  questions: Question[]
}

export default function QuizReviewPage() {
  const params = useParams()
  const router = useRouter()
  const quizId = params.id as string

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAllAnswers, setShowAllAnswers] = useState(false)
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [printWithAnswers, setPrintWithAnswers] = useState(true)
  const [previewMode, setPreviewMode] = useState<'none' | 'student' | 'teacher'>('none')

  const triggerPrint = (withAnswers: boolean) => {
    try {
      const typeLabel = withAnswers ? "Answer Key" : "Student Copy"
      toast.info(`Preparing ${typeLabel}...`)
      
      setPrintWithAnswers(withAnswers)
      
      // Set standardized filename for PDF export
      const now = new Date()
      const timestamp = now.getFullYear().toString() + 
                       (now.getMonth() + 1).toString().padStart(2, '0') + 
                       now.getDate().toString().padStart(2, '0') + "_" + 
                       now.getHours().toString().padStart(2, '0') + 
                       now.getMinutes().toString().padStart(2, '0')
      
      const originalTitle = document.title
      document.title = `Quesmint_AI_${timestamp}_${withAnswers ? 'AnswerKey' : 'StudentCopy'}`
      
      // Trigger print after a minimal delay to sync DOM and Title
      setTimeout(() => {
        window.print()
        
        // Restore title after print dialog closes
        setTimeout(() => {
          document.title = originalTitle
        }, 1000)
      }, 100)
    } catch (error) {
      console.error("Print Error:", error)
      toast.error("Failed to open print dialog")
    }
  }

  const enterPreview = (mode: 'student' | 'teacher') => {
    setPreviewMode(mode)
    setPrintWithAnswers(mode === 'teacher')
    // Scroll to top when entering preview
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    // Prevent scrolling on body when in full-screen preview if needed, 
    // but here we just stay on page for better UX.
  }, [previewMode])


  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await api.getQuiz(quizId)
        setQuiz(data)
      } catch (error) {
        console.error("Failed to load quiz:", error)
        toast.error("Failed to load quiz data")
        router.push("/dashboard/history")
      } finally {
        setLoading(false)
      }
    }
    fetchQuiz()
  }, [quizId, router])

  const toggleAnswer = (questionId: string) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }))
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success("Question copied to clipboard")
    setTimeout(() => setCopiedId(null), 2000)
  }


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-bold tracking-tight">Preparing your assessment...</p>
      </div>
    )
  }

  if (!quiz) return null

  return (
    <div className={cn(
      "min-h-screen",
      previewMode !== 'none' ? "bg-zinc-200/50 dark:bg-zinc-900/50 py-10" : ""
    )}>
      {/* Print Preview Navigation (Only visible in Preview Mode) */}
      {previewMode !== 'none' && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-2 rounded-2xl shadow-2xl print:hidden">
          <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl">
            <Button 
              variant={previewMode === 'student' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => enterPreview('student')}
              className="text-xs font-bold rounded-lg px-4"
            >
              Student Copy
            </Button>
            <Button 
              variant={previewMode === 'teacher' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => enterPreview('teacher')}
              className="text-xs font-bold rounded-lg px-4"
            >
              Answer Key
            </Button>
          </div>
          <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />
          <div className="flex items-center gap-2">
            <Button 
              size="sm"
              variant="outline"
              onClick={() => triggerPrint(previewMode === 'teacher')}
              className="border-zinc-200 dark:border-zinc-800 text-xs font-bold h-9 rounded-lg"
            >
              <Printer className="w-3.5 h-3.5 mr-2" /> Print
            </Button>
            <Button 
              size="sm"
              onClick={() => triggerPrint(previewMode === 'teacher')}
              className="bg-primary text-primary-foreground font-bold h-9 rounded-lg"
            >
              <Download className="w-3.5 h-3.5 mr-2" /> Download PDF
            </Button>
          </div>
          <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setPreviewMode('none')}
            className="text-xs font-bold h-9 rounded-lg"
          >
            Exit
          </Button>
        </div>
      )}

      <div className={cn(
        "mx-auto transition-all duration-300 print:p-0 print:m-0 print:shadow-none print:border-none",
        previewMode !== 'none' 
          ? "max-w-[210mm] min-h-[297mm] bg-white text-black p-[20mm] shadow-none border-none" 
          : "max-w-3xl space-y-10 pb-20",
        !printWithAnswers ? "print-hide-answers" : ""
      )}>
        {/* Minimalist Header for Print (Optional: can be completely removed if user wants zero header) */}
        {previewMode !== 'none' && (
          <div className="mb-8 border-b-2 border-black pb-4 print:block hidden">
            <h1 className="text-2xl font-bold uppercase tracking-tight">{quiz.title}</h1>
          </div>
        )}

        {/* Sticky Header Actions (Hidden in Preview) */}
        {previewMode === 'none' && (
          <div className="sticky top-0 z-10 py-4 bg-background/95 backdrop-blur-xl border-b border-white/5 mb-10 print:hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/history')} className="hover:bg-primary/10 hover:text-primary h-9 w-9" title="Back to History">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')} className="hover:bg-primary/10 hover:text-primary h-9 w-9" title="Back to Home">
                    <Home className="w-5 h-5" />
                  </Button>
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tighter">{quiz.title}</h1>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 text-[10px] font-bold shadow-[0_0_10px_rgba(61,217,179,0.1)]">
                      {quiz.questions.length} Questions
                    </Badge>
                    <Badge variant="outline" className="text-muted-foreground border-white/10 text-[10px] capitalize font-bold">
                      {quiz.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white/5 bg-white/5 hover:bg-white/10 font-bold text-xs h-9"
                  onClick={() => setShowAllAnswers(!showAllAnswers)}
                >
                  {showAllAnswers ? <EyeOff className="w-3.5 h-3.5 mr-2" /> : <Eye className="w-3.5 h-3.5 mr-2" />}
                  {showAllAnswers ? "Hide Solutions" : "Reveal Solutions"}
                </Button>
                
                <Button 
                  size="sm"
                  onClick={() => enterPreview('student')}
                  className="bg-primary text-primary-foreground hover:bg-primary-hover font-bold text-xs shadow-lg shadow-primary/20 h-9"
                >
                  <Printer className="w-3.5 h-3.5 mr-2" /> Preview & Download
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Sequential Question List */}
        <div className={cn(
          "space-y-0", 
          previewMode !== 'none' ? "text-black bg-white" : ""
        )}>
          {quiz.questions.map((q, index) => (
            <div key={q.id || index}>
              <QuestionCard 
                index={index}
                question={q}
                isRevealed={previewMode === 'teacher' || (previewMode === 'none' && (showAllAnswers || revealedAnswers[q.id]))}
                onToggle={() => toggleAnswer(q.id)}
                onCopy={() => copyToClipboard(q.question, q.id)}
                isCopied={copiedId === q.id}
                isMinimal={previewMode !== 'none'}
              />
              {index < quiz.questions.length - 1 && (
                <div className={cn(
                  "my-6 border-b border-black/10",
                  previewMode !== 'none' ? "border-black/20 my-8" : "print:block hidden"
                )} />
              )}
            </div>
          ))}
        </div>

        {previewMode === 'none' && (
          <div className="pt-16 text-center">
            <div className="inline-flex items-center gap-3 text-muted-foreground text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-full bg-navy/40 border border-white/5 backdrop-blur-md">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>Final Page reached</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface QuestionCardProps {
  index: number
  question: Question
  isRevealed: boolean
  onToggle: () => void
  onCopy: () => void
  isCopied: boolean
  isMinimal?: boolean
}

function QuestionCard({ 
  index, 
  question, 
  isRevealed, 
  onToggle, 
  onCopy,
  isCopied,
  isMinimal = false
}: QuestionCardProps) {
  if (isMinimal) {
    return (
      <div className="space-y-4 text-black bg-white py-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40">
            <span>Question {index + 1}</span>
            <span className="h-1 w-1 rounded-full bg-black/20" />
            <span>{question.type.replace('_', ' ')}</span>
          </div>
          <h2 className="text-lg font-bold leading-snug">
            <LatexRenderer text={question.question} />
          </h2>
        </div>

        {question.type === "mcq" && question.options && (
          <div className="grid grid-cols-1 gap-2.5">
            {question.options.map((option, i) => (
              <div 
                key={i}
                className={cn(
                  "flex items-start gap-3 p-2.5 rounded-lg border border-black/10 transition-none",
                  isRevealed && i === question.correct_index ? "border-black bg-black/5" : ""
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded border border-black/20 flex items-center justify-center font-bold text-[10px] shrink-0",
                  isRevealed && i === question.correct_index ? "bg-black text-white" : ""
                )}>
                  {String.fromCharCode(65 + i)}
                </div>
                <div className="flex-1 pt-0.5 text-sm">
                  <LatexRenderer text={option} />
                </div>
              </div>
            ))}
          </div>
        )}

        {isRevealed && (
          <div className="mt-4 p-4 rounded-xl border-2 border-black bg-black/2 space-y-2.5">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-black">
              <Check className="w-3 h-3" />
              Correct Answer
            </div>
            <div className="text-sm font-bold pl-5 leading-relaxed">
              {question.type === "mcq" ? (
                <>
                  <span className="text-black mr-1.5 font-black">({String.fromCharCode(65 + (question.correct_index ?? 0))})</span>
                  <LatexRenderer text={question.answer} />
                </>
              ) : (
                <LatexRenderer text={question.answer} />
              )}
            </div>
            <div className="text-[11px] text-black/70 leading-relaxed pl-5 border-l-2 border-black/20 py-0.5 mt-2 italic">
              <span className="font-bold text-black uppercase tracking-tighter text-[9px] not-italic mr-1.5">Explanation:</span>
              <LatexRenderer text={question.explanation} />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card 
      id={`question-card-${index}`}
      className="border-white/5 bg-navy-surface/30 backdrop-blur-md overflow-hidden transition-all hover:border-primary/20 group print-card rounded-xl shadow-lg"
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2.5 bg-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-bold text-primary uppercase tracking-[0.15em] bg-primary/10 px-2 py-0.5 rounded-full">
              Question {index + 1}
            </span>
            <Badge variant="outline" className="capitalize text-[8px] font-medium opacity-60 border-white/5 px-1.5 py-0 h-4">
              {question.type.replace('_', ' ')}
            </Badge>
          </div>
          <CardTitle className="text-lg font-bold leading-snug pt-0.5 text-foreground/90">
            <LatexRenderer text={question.question} />
          </CardTitle>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 print:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 h-7 w-7"
            onClick={onCopy}
            title="Copy Question Text"
          >
            {isCopied ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-4 pb-4">
        {/* Options for MCQ */}
        {question.type === "mcq" && question.options && (
          <div className="grid grid-cols-1 gap-2 mt-0.5">
            {question.options.map((option, i) => (
              <div 
                key={i}
                className={`
                  p-3 rounded-lg border transition-all text-xs font-medium flex items-center gap-3
                  ${isRevealed && i === question.correct_index 
                    ? "border-primary/40 bg-primary/5 text-primary print-correct-option" 
                    : "border-white/5 bg-white/5 text-muted-foreground/80 hover:border-white/10"}
                `}
              >
                <div className={cn(
                  "w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] shrink-0",
                  isRevealed && i === question.correct_index ? "bg-primary text-primary-foreground" : "bg-white/5 text-muted-foreground/60"
                )}>
                  {String.fromCharCode(65 + i)}
                </div>
                <div className="flex-1">
                  <LatexRenderer text={option} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Bar */}
        <div className="pt-3 flex items-center justify-end border-t border-white/5 print:hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggle}
            className="text-primary hover:text-primary-hover hover:bg-primary/10 font-bold uppercase tracking-widest text-[8px] h-6 px-2"
          >
            {isRevealed ? (
              <><EyeOff className="w-3 h-3 mr-1.5" /> Hide Solution</>
            ) : (
              <><Eye className="w-3 h-3 mr-1.5" /> Reveal Solution</>
            )}
          </Button>
        </div>

        {/* Solution Section */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/15 space-y-2.5 print-solution-section mt-1">
                <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-wider">
                  <Check className="w-2.5 h-2.5" />
                  Correct Answer
                </div>
                <div className="text-sm font-bold text-foreground/90 pl-5 leading-relaxed">
                  {question.type === "mcq" ? (
                    <>
                      <span className="text-primary mr-1.5">({String.fromCharCode(65 + (question.correct_index ?? 0))})</span>
                      <LatexRenderer text={question.answer} />
                    </>
                  ) : (
                    <LatexRenderer text={question.answer} />
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground/80 leading-relaxed pl-5 border-l border-primary/20 py-0.5">
                  <span className="font-bold text-primary/60 uppercase tracking-tighter text-[8px] mr-1.5">Explanation</span>
                  <LatexRenderer text={question.explanation} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
