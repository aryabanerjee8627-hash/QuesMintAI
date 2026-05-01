"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw,
  Trophy,
  Timer
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Mock data for the quiz UI
const MOCK_QUIZ = {
  id: "1",
  title: "Machine Learning Basics",
  questions: [
    {
      id: "q1",
      text: "What is the primary goal of Supervised Learning?",
      options: [
        "To find hidden patterns in unlabeled data",
        "To map input data to known output labels",
        "To learn through trial and error with rewards",
        "To minimize data storage requirements"
      ],
      correct_index: 1
    },
    {
      id: "q2",
      text: "Which of these is a common regression algorithm?",
      options: [
        "K-Means Clustering",
        "Linear Regression",
        "Principal Component Analysis",
        "Apriori Algorithm"
      ],
      correct_index: 1
    },
    {
      id: "q3",
      text: "What does 'Overfitting' mean in ML?",
      options: [
        "The model is too simple to capture patterns",
        "The model performs well on new data but poor on training data",
        "The model learns the noise in training data too well",
        "The model is training too slowly"
      ],
      correct_index: 2
    }
  ]
}

export default function QuizExecutionPage() {
  const router = useRouter()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  const currentQuestion = MOCK_QUIZ.questions[currentIdx]
  const progress = ((currentIdx + (isFinished ? 1 : 0)) / MOCK_QUIZ.questions.length) * 100

  const handleOptionClick = (index: number) => {
    if (isAnswered) return
    setSelectedIdx(index)
  }

  const handleCheck = () => {
    if (selectedIdx === null) return
    setIsAnswered(true)
    if (selectedIdx === currentQuestion.correct_index) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIdx < MOCK_QUIZ.questions.length - 1) {
      setCurrentIdx(currentIdx + 1)
      setSelectedIdx(null)
      setIsAnswered(false)
    } else {
      setIsFinished(true)
    }
  }

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-12"
      >
        <Card className="border-white/5 bg-white/5 text-center overflow-hidden">
          <div className="h-2 bg-violet-600 w-full" />
          <CardHeader className="pt-12">
            <div className="mx-auto w-20 h-20 rounded-full bg-violet-600/20 flex items-center justify-center text-violet-400 mb-6">
              <Trophy className="w-10 h-10" />
            </div>
            <CardTitle className="text-3xl font-bold">Quiz Completed!</CardTitle>
            <p className="text-muted-foreground">Great job on finishing the Machine Learning Basics quiz.</p>
          </CardHeader>
          <CardContent className="pb-12 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-3xl font-bold text-violet-400">{score}/{MOCK_QUIZ.questions.length}</div>
                <div className="text-sm text-muted-foreground mt-1">Final Score</div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-3xl font-bold text-blue-400">{Math.round((score / MOCK_QUIZ.questions.length) * 100)}%</div>
                <div className="text-sm text-muted-foreground mt-1">Accuracy</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-violet-600 hover:bg-violet-700 h-12 px-8" onClick={() => window.location.reload()}>
                <RotateCcw className="w-4 h-4 mr-2" /> Retake Quiz
              </Button>
              <Button variant="outline" className="h-12 px-8 border-white/10" onClick={() => router.push('/dashboard/history')}>
                View All Quizzes
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Badge variant="secondary" className="bg-violet-600/10 text-violet-400 border-none">
            Question {currentIdx + 1} of {MOCK_QUIZ.questions.length}
          </Badge>
          <h1 className="text-xl font-bold truncate">{MOCK_QUIZ.title}</h1>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <Timer className="w-4 h-4" />
            <span>04:20</span>
          </div>
        </div>
      </div>

      <Progress value={progress} className="h-2 bg-white/5" />

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-white/5 bg-white/5 shadow-2xl overflow-hidden">
            <CardHeader className="pt-8 px-8">
              <CardTitle className="text-2xl font-medium leading-relaxed">
                {currentQuestion.text}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option, i) => {
                  const isCorrect = i === currentQuestion.correct_index
                  const isSelected = i === selectedIdx
                  
                  let variantStyles = "border-white/10 bg-white/5 hover:bg-white/10"
                  
                  if (isAnswered) {
                    if (isCorrect) variantStyles = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                    else if (isSelected) variantStyles = "border-red-500/50 bg-red-500/10 text-red-400"
                    else variantStyles = "border-white/5 bg-white/5 opacity-50"
                  } else if (isSelected) {
                    variantStyles = "border-violet-500 bg-violet-500/10 text-violet-400"
                  }

                  return (
                    <button
                      key={i}
                      disabled={isAnswered}
                      onClick={() => handleOptionClick(i)}
                      className={`
                        w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group
                        ${variantStyles}
                      `}
                    >
                      <span className="flex-1">{option}</span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 shrink-0" />}
                    </button>
                  )
                })}
              </div>

              <div className="pt-8 flex items-center justify-between">
                <Button variant="ghost" className="text-muted-foreground" disabled={currentIdx === 0}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                </Button>
                
                {!isAnswered ? (
                  <Button 
                    className="bg-violet-600 hover:bg-violet-700 px-8 h-12"
                    disabled={selectedIdx === null}
                    onClick={handleCheck}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button 
                    className="bg-violet-600 hover:bg-violet-700 px-8 h-12"
                    onClick={handleNext}
                  >
                    {currentIdx === MOCK_QUIZ.questions.length - 1 ? "Finish" : "Next Question"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
