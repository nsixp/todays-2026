"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
  ArrowsLeftRightIcon as ArrowsLeftRight,
  CheckCircleIcon as CheckCircle,
  CheckIcon as Check,
  MedalIcon as Medal,
  QuestionIcon as Question,
  TimerIcon as Timer,
} from "@phosphor-icons/react"
import { useProgress } from "@/hooks/use-progress"
import { getQuiz } from "@/lib/data"
import { getBadgeIcon, getBadgeTitle } from "@/lib/badge"
import { Button } from "@/components/ui/button"

const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 52 : -52,
    opacity: 0,
    filter: "blur(3px)",
  }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (direction: number) => ({
    x: direction > 0 ? -52 : 52,
    opacity: 0,
    filter: "blur(3px)",
  }),
}

const BRIEFING_ITEMS = [
  { icon: Question, label: "Pilihan ganda" },
  { icon: ArrowsLeftRight, label: "Bebas navigasi" },
  { icon: Timer, label: "Tanpa batas waktu" },
  { icon: Medal, label: "Badge di akhir" },
]

export default function QuizPage() {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
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
  const currentQuestion = questions[currentIndex]

  if (!currentQuestion) {
    return (
      <main className="forest-surface flex min-h-dvh items-center justify-center px-4">
        <div className="forest-panel max-w-md rounded-3xl p-8 text-center">
          <Question className="mx-auto size-9 text-moss" weight="duotone" />
          <h1 className="mt-4 font-heading text-3xl text-jungle-deep">Quiz belum tersedia</h1>
          <p className="mt-2 text-sm leading-relaxed text-moss">
            Pertanyaan sedang disiapkan oleh panitia. Silakan kembali ke Jungle Hub.
          </p>
          <Button
            onClick={() => router.push("/hub")}
            className="mt-6 h-11 rounded-full bg-jungle-deep px-6 text-warm-cream hover:bg-moss"
          >
            Kembali ke Jungle Hub
          </Button>
        </div>
      </main>
    )
  }

  const isLast = currentIndex === total - 1
  const answered = answers[currentQuestion.id] !== undefined
  const answeredCount = Object.keys(answers).length
  const remainingCount = total - answeredCount

  function handleSelect(optionIndex: number) {
    if (!submitting) {
      setAnswers((previous) => ({ ...previous, [currentQuestion.id]: optionIndex }))
    }
  }

  function goNext() {
    if (currentIndex < total - 1) {
      setDirection(1)
      setCurrentIndex((index) => index + 1)
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((index) => index - 1)
    }
  }

  function handleSubmit() {
    if (submitting) return

    setSubmitting(true)
    let score = 0
    questions.forEach((question) => {
      if (answers[question.id] === question.correctIndex) score += 1
    })

    const nama = progress.nama || ""
    const badgeIcon = getBadgeIcon(score, questions.length)
    const badgeTitle = getBadgeTitle(score, questions.length, nama)
    save({ quizDone: true, quizScore: score, badgeIcon, badgeTitle })
    window.setTimeout(() => router.push("/badge"), 400)
  }

  if (!started) {
    return (
      <main className="quiz-surface relative flex min-h-dvh items-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -right-32 -top-28 size-112 rounded-full border border-jungle-mist/25" />
        <div className="pointer-events-none absolute -right-12 -top-8 size-72 rounded-full border border-jungle-mist/20" />

        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-4xl border border-jungle-mist/20 bg-jungle-deep shadow-2xl shadow-jungle-shadow/20 lg:grid-cols-[1.08fr_0.92fr]"
        >
          <div className="relative overflow-hidden px-6 py-9 text-warm-cream sm:px-10 sm:py-12">
            <div className="absolute -bottom-40 -left-24 size-80 rounded-full bg-jungle-canopy/50 blur-3xl" />
            <div className="absolute right-6 top-8 size-24 rounded-full border border-sunlit-gold/20" />
            <div className="absolute right-12 top-14 size-12 rounded-full border border-sunlit-gold/20" />

            <div className="relative max-w-lg">
              <div className="mb-9 flex size-14 items-center justify-center rounded-2xl bg-sunlit-gold text-jungle-deep">
                <CheckCircle size={29} weight="duotone" />
              </div>
              <h1 className="max-w-md text-balance font-heading text-5xl leading-[0.98] sm:text-6xl">
                Uji bekalmu sebelum masuk rimba
              </h1>
              <p className="mt-5 max-w-md text-sm leading-7 text-warm-cream/72">
                Delapan pertanyaan singkat untuk memastikan bekal PKKMB sudah kamu pahami.
                Nilai akhir akan menentukan badge perjalananmu.
              </p>

              <div className="mt-10 flex items-end gap-4 border-t border-warm-cream/12 pt-6">
                <span className="font-heading text-6xl leading-none text-sunlit-gold">{total}</span>
                <span className="pb-1 text-xs leading-relaxed text-jungle-mist">
                  soal
                  <br />
                  pilihan ganda
                </span>
              </div>
            </div>
          </div>

          <div className="bg-warm-cream p-6 sm:p-9">
            <p className="text-xs font-semibold text-moss">Sebelum memulai</p>
            <h2 className="mt-2 font-heading text-3xl leading-tight text-jungle-deep">
              Briefing singkat
            </h2>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {BRIEFING_ITEMS.map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-2xl border border-fern-mist bg-white/55 p-4">
                  <Icon size={20} weight="duotone" className="text-ember" />
                  <p className="mt-5 text-xs font-semibold leading-snug text-jungle-deep">{label}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs leading-6 text-moss/75">
              Kamu dapat kembali ke soal sebelumnya. Pastikan jawaban sudah terisi sebelum
              dikumpulkan.
            </p>
            <Button
              onClick={() => setStarted(true)}
              className="mt-7 h-12 w-full rounded-full bg-sunlit-gold px-7 text-jungle-deep hover:bg-ember hover:text-warm-cream"
            >
              Mulai Quiz
              <ArrowRight />
            </Button>
          </div>
        </motion.section>
      </main>
    )
  }

  return (
    <main className="quiz-surface relative min-h-dvh overflow-hidden px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="relative mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
        <aside className="space-y-4 lg:sticky lg:top-8">
          <div className="overflow-hidden rounded-3xl bg-jungle-deep text-warm-cream">
            <div className="border-b border-warm-cream/10 p-5">
              <div className="flex items-center gap-3">
                <CheckCircle size={24} weight="duotone" className="text-sunlit-gold" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-jungle-mist">
                    Quiz PKKMB
                  </p>
                  <p className="font-heading text-xl">Peta jawaban</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 p-5 lg:grid-cols-2">
              {questions.map((question, index) => {
                const active = index === currentIndex
                const isAnswered = answers[question.id] !== undefined

                return (
                  <div
                    key={question.id}
                    aria-current={active ? "step" : undefined}
                    className={`relative flex aspect-square items-center justify-center rounded-2xl border text-sm font-semibold ${
                      active
                        ? "border-sunlit-gold bg-sunlit-gold text-jungle-deep"
                        : isAnswered
                          ? "border-jungle-mist/35 bg-jungle-mist/12 text-warm-cream"
                          : "border-warm-cream/10 text-warm-cream/45"
                    }`}
                  >
                    {index + 1}
                    {isAnswered && !active && (
                      <Check className="absolute right-1.5 top-1.5 size-3 text-jungle-mist" weight="bold" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-sunlit-gold p-4 text-jungle-deep">
              <p className="font-heading text-3xl">{answeredCount}</p>
              <p className="mt-1 text-[10px] font-semibold">Terjawab</p>
            </div>
            <div className="forest-panel rounded-3xl p-4 text-jungle-deep">
              <p className="font-heading text-3xl">{remainingCount}</p>
              <p className="mt-1 text-[10px] font-semibold text-moss">Tersisa</p>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 flex items-center justify-between gap-4 px-1 text-xs text-moss">
            <span>Soal {currentIndex + 1} dari {total}</span>
            <span>{Math.round((answeredCount / total) * 100)}% terisi</span>
          </div>
          <div className="mb-5 h-1 overflow-hidden rounded-full bg-fern-mist/60">
            <motion.div
              className="h-full rounded-full bg-ember"
              initial={false}
              animate={{ width: `${(answeredCount / total) * 100}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
            />
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="quiz-question-card min-h-124 rounded-4xl border border-fern-mist/80 p-6 sm:p-9"
            >
              <header className="flex items-start justify-between gap-5 border-b border-jungle-deep/10 pb-7">
                <div className="max-w-2xl">
                  <span className="text-xs font-semibold text-ember">
                    Pertanyaan {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-balance font-heading text-3xl leading-[1.08] text-jungle-deep sm:text-4xl">
                    {currentQuestion.question}
                  </h2>
                </div>
                <span className="hidden font-heading text-6xl leading-none text-jungle-deep/10 sm:block">
                  ?
                </span>
              </header>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {currentQuestion.options.map((option, optionIndex) => {
                  const selected = answers[currentQuestion.id] === optionIndex

                  return (
                    <button
                      key={`${currentQuestion.id}-${optionIndex}`}
                      type="button"
                      onClick={() => handleSelect(optionIndex)}
                      aria-pressed={selected}
                      className={`group min-h-24 rounded-2xl border p-4 text-left transition-all duration-200 ${
                        selected
                          ? "border-jungle-deep bg-jungle-deep text-warm-cream shadow-lg shadow-jungle-shadow/12"
                          : "border-fern-mist bg-white/55 text-jungle-deep hover:-translate-y-0.5 hover:border-sage hover:bg-white"
                      }`}
                    >
                      <span className="flex items-start gap-3">
                        <span
                          className={`flex size-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                            selected
                              ? "bg-sunlit-gold text-jungle-deep"
                              : "bg-fern-mist/55 text-moss group-hover:bg-sunlit-gold/35"
                          }`}
                        >
                          {OPTION_LABELS[optionIndex] ?? optionIndex + 1}
                        </span>
                        <span className="pt-1 text-sm font-medium leading-relaxed">{option}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="h-11 rounded-full border-jungle-deep/15 bg-warm-cream/70 px-5 text-moss hover:bg-white"
            >
              <ArrowLeft />
              Sebelumnya
            </Button>

            {isLast ? (
              <Button
                onClick={handleSubmit}
                disabled={!answered || submitting}
                className="h-11 rounded-full bg-jungle-deep px-6 text-warm-cream hover:bg-moss"
              >
                {submitting ? "Memproses..." : "Selesai dan Kumpulkan"}
                {!submitting && <CheckCircle weight="fill" />}
              </Button>
            ) : (
              <Button
                onClick={goNext}
                className="h-11 rounded-full bg-sunlit-gold px-6 text-jungle-deep hover:bg-ember hover:text-warm-cream"
              >
                Selanjutnya
                <ArrowRight />
              </Button>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
