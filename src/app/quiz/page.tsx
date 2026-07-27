"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
import { getQuiz } from "@/lib/data"
import { getBadgeIcon, getBadgeTitle } from "@/lib/badge"

export default function QuizPage() {
  const router = useRouter()
  const { progress, save } = useProgress()
  const questions = getQuiz()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (progress.quizDone) router.replace("/badge")
  }, [progress.quizDone, router])

  if (!mounted || progress.quizDone) return null

  const answeredCount = Object.keys(answers).length
  const allAnswered = answeredCount === questions.length

  function handleSubmit() {
    if (!allAnswered) return
    let score = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) score++
    })
    const nama = progress.nama || ""
    const badgeIcon = getBadgeIcon(score, questions.length)
    const badgeTitle = getBadgeTitle(score, questions.length, nama)
    save({ quizDone: true, quizScore: score, badgeIcon, badgeTitle })
    router.push("/badge")
  }

  return (
    <div className="min-h-dvh bg-gradient-to-b from-warm-cream to-sage/20 px-6 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-lg"
      >
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl text-jungle-deep">Quiz PKKMB</h1>
          <p className="text-xs text-moss font-sans mt-1">Jawab semua soal untuk melihat hasilmu</p>
        </div>
        <div className="space-y-8">
          {questions.map((q, qi) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qi * 0.06, duration: 0.4 }}
            >
              <p className="text-sm font-medium text-jungle-deep font-sans mb-3">
                {qi + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const selected = answers[q.id] === oi
                  return (
                    <button
                      key={oi}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-sans transition-all ${
                        selected
                          ? "border-sunlit-gold bg-sunlit-gold/10 text-jungle-deep"
                          : "border-fern-mist bg-white/60 text-moss hover:border-sage hover:bg-white/80"
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="rounded-full bg-jungle-deep text-warm-cream px-10 py-3 text-sm font-sans font-medium tracking-wide hover:bg-moss transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {allAnswered ? `Kumpulkan (${answeredCount}/${questions.length})` : `Jawab ${answeredCount}/${questions.length}`}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
