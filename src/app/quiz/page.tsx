"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
import { getQuiz } from "@/lib/data"
import { getBadgeIcon, getBadgeTitle } from "@/lib/badge"
import { CheckCircle } from "@phosphor-icons/react"

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 280 : -280, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -280 : 280, opacity: 0 }),
}

export default function QuizPage() {
  const router = useRouter()
  const { progress, save } = useProgress()
  const questions = getQuiz()
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (progress.quizDone) router.replace("/badge")
  }, [progress.quizDone, router])

  if (progress.quizDone) return null

  const total = questions.length
  const currentQ = questions[currentIndex]
  const isLast = currentIndex === total - 1
  const answered = answers[currentQ.id] !== undefined

  function handleSelect(optionIndex: number) {
    if (!submitting) setAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }))
  }

  function goNext() {
    if (currentIndex < total - 1) {
      setDirection(1)
      setCurrentIndex((i) => i + 1)
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((i) => i - 1)
    }
  }

  function handleSubmit() {
    if (submitting) return
    setSubmitting(true)
    let score = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) score++
    })
    const nama = progress.nama || ""
    const badgeIcon = getBadgeIcon(score, questions.length)
    const badgeTitle = getBadgeTitle(score, questions.length, nama)
    save({ quizDone: true, quizScore: score, badgeIcon, badgeTitle })
    setTimeout(() => router.push("/badge"), 400)
  }

  const answeredCount = Object.keys(answers).length

  if (!started) {
    return (
      <div className="forest-surface relative w-full min-h-dvh overflow-x-hidden flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <div className="w-16 h-16 rounded-2xl bg-sunlit-gold/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-sunlit-gold" />
          </div>
          <h1 className="font-heading text-3xl text-jungle-deep mb-3 leading-tight">
            Quiz PKKMB
          </h1>
          <p className="text-sm font-sans text-moss leading-relaxed mb-6">
            Uji pengetahuanmu tentang PKKMB Telkom University Purwokerto.
            Jawab semua soal dengan jujur dan dapatkan badge khusus!
          </p>
          <div className="forest-panel rounded-xl p-4 mb-8 text-left">
            <p className="text-xs font-sans text-moss font-medium mb-2">Informasi:</p>
            <ul className="space-y-1.5">
              <li className="text-xs font-sans text-moss/70 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-sunlit-gold shrink-0" />
                {total} soal pilihan ganda
              </li>
              <li className="text-xs font-sans text-moss/70 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-sunlit-gold shrink-0" />
                Boleh navigasi bolak-balik
              </li>
              <li className="text-xs font-sans text-moss/70 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-sunlit-gold shrink-0" />
                Tidak ada batas waktu
              </li>
              <li className="text-xs font-sans text-moss/70 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-sunlit-gold shrink-0" />
                Nilai akhir muncul setelah submit
              </li>
            </ul>
          </div>
          <button
            onClick={() => setStarted(true)}
            className="rounded-full bg-sunlit-gold text-jungle-deep px-10 py-3.5 text-sm font-sans font-medium tracking-wide hover:bg-ember hover:text-warm-cream transition-colors shadow-sm"
          >
            Mulai Kuis
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="forest-surface relative w-full min-h-dvh overflow-x-hidden flex flex-col px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex-1 flex flex-col mx-auto w-full max-w-lg">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-sans text-moss uppercase tracking-widest">
              Soal {currentIndex + 1} dari {total}
            </p>
            <p className="text-xs font-sans text-moss/60">{answeredCount} terjawab</p>
          </div>
          <div className="h-1.5 rounded-full bg-fern-mist/50 overflow-hidden">
            <div
              className="h-full rounded-full bg-sunlit-gold transition-all duration-300 ease-out"
              style={{ width: `${((answeredCount) / total) * 100}%` }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQ.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col"
          >
            <div className="forest-panel rounded-2xl p-6 mb-auto">
              <p className="text-xs font-sans text-moss mb-2">{currentIndex + 1}</p>
              <h2 className="font-heading text-xl text-jungle-deep mb-5 leading-snug">
                {currentQ.question}
              </h2>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, oi) => {
                  const selected = answers[currentQ.id] === oi
                  return (
                    <button
                      key={oi}
                      onClick={() => handleSelect(oi)}
                      className={`w-full text-left px-4 py-3.5 rounded-xl border-2 text-sm font-sans transition-all ${
                        selected
                          ? "border-sunlit-gold bg-sunlit-gold/10 text-jungle-deep font-medium shadow-sm"
                          : "border-fern-mist bg-white/60 text-moss hover:border-sage hover:bg-white/80"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                            selected
                              ? "border-sunlit-gold bg-sunlit-gold"
                              : "border-fern-mist"
                          }`}
                        >
                          {selected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full bg-white"
                            />
                          )}
                        </span>
                        {opt}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between pt-6 mt-auto gap-3">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="rounded-full border border-fern-mist text-moss px-5 py-2.5 text-sm font-sans hover:bg-white/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>

          {isLast ? (
            <button
              onClick={handleSubmit}
              disabled={!answered || submitting}
              className="rounded-full bg-jungle-deep text-warm-cream px-6 py-2.5 text-sm font-sans font-medium tracking-wide hover:bg-moss transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 border-warm-cream/30 border-t-warm-cream rounded-full"
                  />
                  Memproses...
                </span>
              ) : (
                "Selesai & Kumpulkan"
              )}
            </button>
          ) : (
            <button
              onClick={goNext}
              className="rounded-full bg-sunlit-gold text-jungle-deep px-6 py-2.5 text-sm font-sans font-medium hover:bg-ember hover:text-warm-cream transition-colors"
            >
              Selanjutnya
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
