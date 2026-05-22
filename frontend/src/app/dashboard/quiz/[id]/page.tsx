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
  Download,
  Printer,
  Loader2,
  BookOpen
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { LatexRenderer } from "@/components/ui/latex-renderer"
import { toPng } from "html-to-image"

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

  const triggerPrint = (withAnswers: boolean) => {
    setPrintWithAnswers(withAnswers)
    setTimeout(() => {
      window.print()
    }, 150)
  }


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

  const exportCardAsImage = async (cardId: string, questionIndex: number) => {
    const cardElement = document.getElementById(cardId)
    if (!cardElement) {
      toast.error("Could not find the question card element")
      return
    }

    try {
      toast.info("Generating high-resolution question PNG...")
      
      // Give a tiny frame delay to settle rendering
      await new Promise(resolve => setTimeout(resolve, 100))

      const dataUrl = await toPng(cardElement, {
        backgroundColor: "#09090b", // Match default zinc-950 background of QuesMint theme
        style: {
          transform: "scale(1)",
          borderRadius: "16px",
          margin: "0",
          boxShadow: "none",
        },
        quality: 1.0,
        pixelRatio: 2, // 2x resolution scaling for crystal clear rendering
      })

      const link = document.createElement("a")
      link.download = `question-${questionIndex + 1}.png`
      link.href = dataUrl
      link.click()
      
      toast.success("Question exported as PNG!")
    } catch (error) {
      console.error("Failed to export card image:", error)
      toast.error("Failed to generate image")
    }
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
    <div className={`max-w-4xl mx-auto space-y-10 pb-20 ${!printWithAnswers ? "print-hide-answers" : ""}`}>
      {/* Printable Branded Student Exam Header (Print Mode Only) */}
      <div className="hidden print:block border-b-4 border-navy pb-8 mb-10 space-y-8 w-full">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif font-bold tracking-tighter text-navy">{quiz.title}</h1>
            <p className="text-base font-sans text-slate-600 mt-2 capitalize font-medium">Difficulty: {quiz.difficulty} | Total Questions: {quiz.questions.length}</p>
          </div>
          <div className="text-right">
            <span className="font-sans font-black text-2xl text-primary tracking-tighter uppercase">QuesMint</span>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Premium Assessment</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-6 border-t-2 border-dashed border-slate-200">
          <div className="border-b-2 border-navy pb-2">
            <span className="text-[10px] font-bold text-navy uppercase tracking-widest block">Student Name</span>
            <div className="h-8" />
          </div>
          <div className="border-b-2 border-navy pb-2">
            <span className="text-[10px] font-bold text-navy uppercase tracking-widest block">Date</span>
            <div className="h-8" />
          </div>
          <div className="border-b-2 border-navy pb-2">
            <span className="text-[10px] font-bold text-navy uppercase tracking-widest block">Grade/Score</span>
            <div className="h-8" />
          </div>
        </div>
      </div>

      {/* Sticky Header Actions */}
      <div className="sticky top-0 z-10 py-6 bg-background/95 backdrop-blur-xl border-b border-white/5 mb-10 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/history')} className="hover:bg-primary/10 hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">{quiz.title}</h1>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 font-bold shadow-[0_0_10px_rgba(61,217,179,0.2)]">
                  {quiz.questions.length} Questions
                </Badge>
                <Badge variant="outline" className="text-muted-foreground border-white/10 capitalize font-bold">
                  {quiz.difficulty}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="border-white/5 bg-white/5 hover:bg-white/10 font-bold"
              onClick={() => setShowAllAnswers(!showAllAnswers)}
            >
              {showAllAnswers ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showAllAnswers ? "Hide Solutions" : "Reveal Solutions"}
            </Button>
            
            <Button 
              variant="outline" 
              className="border-white/5 bg-white/5 hover:bg-white/10 font-bold"
              onClick={() => triggerPrint(false)}
            >
              <Printer className="w-4 h-4 mr-2" /> Student Copy
            </Button>
            
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary-hover font-bold shadow-lg shadow-primary/20" 
              onClick={() => triggerPrint(true)}
            >
              <Printer className="w-4 h-4 mr-2" /> Answer Key
            </Button>
          </div>
        </div>
      </div>

      {/* Sequential Question List */}
      <div className="space-y-8">
        {quiz.questions.map((q, index) => (
          <QuestionCard 
            key={q.id || index}
            index={index}
            question={q}
            isRevealed={showAllAnswers || revealedAnswers[q.id]}
            onToggle={() => toggleAnswer(q.id)}
            onCopy={() => copyToClipboard(q.question, q.id)}
            isCopied={copiedId === q.id}
            onExportImage={() => exportCardAsImage(`question-card-${index}`, index)}
          />
        ))}
      </div>

      <div className="pt-16 text-center">
        <div className="inline-flex items-center gap-3 text-muted-foreground text-xs font-bold uppercase tracking-widest py-3 px-6 rounded-full bg-navy/40 border border-white/5 backdrop-blur-md">
          <BookOpen className="w-4 h-4 text-primary" />
          <span>Final Page reached</span>
        </div>
      </div>
    </div>
  )
}

function QuestionCard({ 
  index, 
  question, 
  isRevealed, 
  onToggle, 
  onCopy,
  isCopied,
  onExportImage
}: { 
  index: number
  question: Question
  isRevealed: boolean
  onToggle: () => void
  onCopy: () => void
  isCopied: boolean
  onExportImage: () => void
}) {
  return (
    <Card 
      id={`question-card-${index}`}
      className="border-white/5 bg-navy-surface/40 backdrop-blur-md overflow-hidden transition-all hover:border-primary/20 group print-card rounded-2xl shadow-xl"
    >
      <CardHeader className="flex flex-row items-start justify-between gap-6 pb-4 bg-white/5">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(61,217,179,0.1)]">
              Assessment Item {index + 1}
            </span>
            <Badge variant="outline" className="capitalize text-[9px] font-bold opacity-70 border-white/10">
              {question.type.replace('_', ' ')}
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold leading-tight pt-2 text-foreground">
            <LatexRenderer text={question.question} />
          </CardTitle>
        </div>
        <div className="flex items-center gap-2 shrink-0 print:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-primary hover:bg-primary/10"
            onClick={onExportImage}
            title="Export Question Card as PNG Image"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-primary hover:bg-primary/10"
            onClick={onCopy}
            title="Copy Question Text"
          >
            {isCopied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 pt-6">
        {/* Options for MCQ */}
        {question.type === "mcq" && question.options && (
          <div className="grid grid-cols-1 gap-4 mt-2">
            {question.options.map((option, i) => (
              <div 
                key={i}
                className={`
                  p-5 rounded-xl border-2 transition-all text-base font-medium flex items-center gap-4
                  ${isRevealed && i === question.correct_index 
                    ? "border-primary/50 bg-primary/10 text-primary shadow-[0_0_20px_rgba(61,217,179,0.1)] print-correct-option" 
                    : "border-white/5 bg-white/5 text-muted-foreground hover:border-white/10"}
                `}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0",
                  isRevealed && i === question.correct_index ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-white/5 text-muted-foreground"
                )}>
                  {String.fromCharCode(65 + i)}
                </div>
                <LatexRenderer text={option} />
              </div>
            ))}
          </div>
        )}

        {/* Action Bar */}
        <div className="pt-6 flex items-center justify-end border-t border-white/5 print:hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggle}
            className="text-primary hover:text-primary-hover hover:bg-primary/10 font-bold uppercase tracking-widest text-[10px]"
          >
            {isRevealed ? (
              <><EyeOff className="w-4 h-4 mr-2" /> Hide Solution</>
            ) : (
              <><Eye className="w-4 h-4 mr-2" /> Reveal Solution</>
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
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 space-y-4 print-solution-section shadow-[0_0_30px_rgba(61,217,179,0.05)]">
                <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-widest">
                  <div className="p-1 rounded-full bg-primary/10">
                    <Check className="w-3 h-3" />
                  </div>
                  Correct Answer
                </div>
                <div className="text-lg font-bold text-foreground pl-7 leading-relaxed">
                  {question.type === "mcq" ? (
                    <>
                      <span className="text-primary mr-2">({String.fromCharCode(65 + (question.correct_index ?? 0))})</span>
                      <LatexRenderer text={question.answer} />
                    </>
                  ) : (
                    <LatexRenderer text={question.answer} />
                  )}
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed pl-7 border-l-2 border-primary/10 py-1">
                  <span className="font-bold text-primary/70 uppercase tracking-tighter text-[10px] mr-2">Explanation</span>
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

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
