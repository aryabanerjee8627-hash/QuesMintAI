"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { 
  Upload, 
  FileText, 
  ImageIcon, 
  X, 
  Sparkles, 
  Loader2,
  CheckCircle2,
  BrainCircuit
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"

type GenState = "IDLE" | "UPLOADING" | "GENERATING" | "SUCCESS"

export default function CreateQuizPage() {
  const [state, setState] = useState<GenState>("IDLE")
  const [files, setFiles] = useState<File[]>([])
  const [numQuestions, setNumQuestions] = useState(10)
  const [difficulty, setDifficulty] = useState("Medium")
  const [subject, setSubject] = useState("General")
  const [questionTypes, setQuestionTypes] = useState<string[]>(["mcq"])
  const [generatedQuizId, setGeneratedQuizId] = useState<string | null>(null)

  const toggleQuestionType = (type: string) => {
    if (questionTypes.includes(type)) {
      if (questionTypes.length > 1) {
        setQuestionTypes(questionTypes.filter(t => t !== type))
      }
    } else {
      setQuestionTypes([...questionTypes, type])
    }
  }

  const onDrop = (acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > 15) {
      toast.error("Maximum 15 files allowed")
      return
    }
    setFiles([...files, ...acceptedFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/plain': ['.txt']
    },
    maxFiles: 15
  })

  const handleGenerate = async () => {
    if (files.length === 0) {
      toast.error("Please upload at least one file")
      return
    }

    try {
      setState("GENERATING")
      
      const formData = new FormData()
      files.forEach((file) => formData.append("files", file))
      formData.append("question_count", numQuestions.toString())
      formData.append("difficulty", difficulty)
      formData.append("subject", subject)
      formData.append("question_types", questionTypes.join(","))

      const result = await api.generateQuiz(formData)
      
      setGeneratedQuizId(result.id)
      setState("SUCCESS")
      toast.success("Quiz generated successfully!")
    } catch (error: any) {
      setState("IDLE")
      toast.error(error.message || "Failed to generate quiz")
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const subjects = [
    "General", "Physics", "Chemistry", "Maths", 
    "Computer", "Biology", "English", "History", "Geography"
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Create New Quiz</h1>
        <p className="text-muted-foreground">Upload your materials and let QuesMint do the heavy lifting.</p>
      </div>

      <AnimatePresence mode="wait">
        {state === "IDLE" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="md:col-span-2 border-white/5 bg-white/5">
                <CardHeader>
                  <CardTitle>Upload Materials</CardTitle>
                  <CardDescription>Support for PDFs, Images, and Text files (Max 15)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div 
                    {...getRootProps()} 
                    className={`
                      border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer
                      ${isDragActive ? 'border-violet-500 bg-violet-500/10' : 'border-white/10 hover:border-white/20 hover:bg-white/5'}
                    `}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-violet-600/20 flex items-center justify-center text-violet-400">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG or TXT (max. 15 files)</p>
                      </div>
                    </div>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Selected Files ({files.length}/15)</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {files.map((file, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 group">
                            <div className="flex items-center gap-3 overflow-hidden">
                              {file.type.includes('image') ? <ImageIcon className="w-4 h-4 text-blue-400" /> : <FileText className="w-4 h-4 text-orange-400" />}
                              <span className="text-sm truncate">{file.name}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeFile(i)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-white/5 bg-white/5">
                  <CardHeader>
                    <CardTitle>Quiz Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Subject</label>
                      <div className="grid grid-cols-2 gap-2">
                        {subjects.map((s) => (
                          <Button 
                            key={s} 
                            variant="outline" 
                            size="sm" 
                            className={`text-[10px] h-8 ${s === subject ? "border-violet-500 text-violet-400 bg-violet-500/5" : "border-white/10"}`}
                            onClick={() => setSubject(s)}
                          >
                            {s}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Questions</label>
                      <div className="flex gap-2">
                        {[5, 10, 20].map((n) => (
                          <Button 
                            key={n} 
                            variant="outline" 
                            size="sm" 
                            className={n === numQuestions ? "border-violet-500 text-violet-400 bg-violet-500/5" : "border-white/10"}
                            onClick={() => setNumQuestions(n)}
                          >
                            {n}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Difficulty</label>
                      <div className="flex gap-2">
                        {['Easy', 'Medium', 'Hard'].map((d) => (
                          <Button 
                            key={d} 
                            variant="outline" 
                            size="sm" 
                            className={d === difficulty ? "border-violet-500 text-violet-400 bg-violet-500/5" : "border-white/10"}
                            onClick={() => setDifficulty(d)}
                          >
                            {d}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Question Types</label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: 'mcq', label: 'MCQ' },
                          { id: 'one_word', label: 'Short' },
                          { id: 'long_answer', label: 'Long' }
                        ].map((t) => (
                          <Button 
                            key={t.id} 
                            variant="outline" 
                            size="sm" 
                            className={questionTypes.includes(t.id) ? "border-violet-500 text-violet-400 bg-violet-500/5" : "border-white/10"}
                            onClick={() => toggleQuestionType(t.id)}
                          >
                            {t.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-violet-600 hover:bg-violet-700 mt-4 h-12 group"
                      disabled={files.length === 0}
                      onClick={handleGenerate}
                    >
                      <Sparkles className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                      Generate Quiz
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {state === "GENERATING" && (
          <motion.div
            key="generating"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full border-4 border-violet-600/20 border-t-violet-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BrainCircuit className="w-10 h-10 text-violet-400 animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Gemini is reading your files...</h2>
            <p className="text-muted-foreground max-w-sm">
              We're analyzing the content and crafting unique questions just for you.
            </p>
            
            <div className="mt-12 w-full max-w-md space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-violet-600/50"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {state === "SUCCESS" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Quiz Generated!</h2>
            <p className="text-muted-foreground mb-8">
              Your high-quality questions are ready for you to review.
            </p>
            <div className="flex gap-4">
              <Link href={`/dashboard/quiz/${generatedQuizId}`}>
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 px-8">
                  Take Quiz Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={() => {
                setState("IDLE")
                setFiles([])
                setGeneratedQuizId(null)
              }}>
                Create Another
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
