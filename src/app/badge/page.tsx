"use client"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { toPng } from "html-to-image"
import { useProgress } from "@/hooks/use-progress"
import DappledLight from "@/components/dappled-light"
import AmbientParticles from "@/components/ambient-particles"
import { getQuiz } from "@/lib/data"
import type { AvatarId } from "@/types"
import Monyet from "@/components/icons/monyet"
import Burung from "@/components/icons/burung"
import Rusa from "@/components/icons/rusa"
import Harimau from "@/components/icons/harimau"
import KupuKupu from "@/components/icons/kupu-kupu"
import Ular from "@/components/icons/ular"

const ICON_MAP: Record<AvatarId, typeof Monyet> = {
  monyet: Monyet,
  burung: Burung,
  rusa: Rusa,
  harimau: Harimau,
  "kupu-kupu": KupuKupu,
  ular: Ular,
}

export default function BadgePage() {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const { progress } = useProgress()
  const [mounted, setMounted] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    if (!progress.quizDone) router.replace("/quiz")
  }, [progress.quizDone, router])

  const handleSave = () => {
    if (!cardRef.current) return
    toPng(cardRef.current, { quality: 1, pixelRatio: 2 }).then((dataUrl) => {
      const link = document.createElement("a")
      link.download = `todays-badge-${progress.nama.replace(/\s+/g, "-").toLowerCase()}.png`
      link.href = dataUrl
      link.click()
    })
  }

  if (!mounted || !progress.quizDone) return null

  const Icon = ICON_MAP[progress.badgeIcon]
  const total = getQuiz().length
  const pct = Math.round((progress.quizScore / total) * 100)

  return (
    <div className="forest-surface relative min-h-dvh flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 overflow-hidden">
      <DappledLight count={3} />
      <AmbientParticles count={4} />
      <motion.div
        ref={cardRef}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] }}
        className="forest-panel woodgrain relative w-full max-w-sm rounded-3xl border-3 border-sunlit-gold/60 p-10 text-center overflow-hidden"
      >
        {/* Ornamental corners */}
        <svg className="absolute top-0 left-0 w-6 h-6 text-sunlit-gold/20 pointer-events-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M0 0h10v2H2v8H0V0Z" fill="currentColor" />
          <path d="M0 0l10 10" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <svg className="absolute top-0 right-0 w-6 h-6 text-sunlit-gold/20 rotate-90 pointer-events-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M0 0h10v2H2v8H0V0Z" fill="currentColor" />
          <path d="M0 0l10 10" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-6 h-6 text-sunlit-gold/20 -rotate-90 pointer-events-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M0 0h10v2H2v8H0V0Z" fill="currentColor" />
          <path d="M0 0l10 10" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-6 h-6 text-sunlit-gold/20 rotate-180 pointer-events-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M0 0h10v2H2v8H0V0Z" fill="currentColor" />
          <path d="M0 0l10 10" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.45, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { delay: 0.18, type: "spring", stiffness: 210, damping: 16 }
          }
          className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-sunlit-gold/10 border-2 border-sunlit-gold/40 flex items-center justify-center"
        >
          {/* Sinar rays behind icon */}
          <div className="absolute inset-0 rounded-full" aria-hidden="true"
            style={{
              background: `
                conic-gradient(from 0deg, transparent 0deg, rgba(243,196,107,0.12) 5deg, transparent 12deg, transparent 55deg, rgba(243,196,107,0.1) 60deg, transparent 68deg, transparent 115deg, rgba(243,196,107,0.12) 120deg, transparent 130deg, transparent 175deg, rgba(243,196,107,0.1) 180deg, transparent 190deg, transparent 235deg, rgba(243,196,107,0.12) 240deg, transparent 250deg, transparent 295deg, rgba(243,196,107,0.1) 300deg, transparent 310deg, transparent 355deg, rgba(243,196,107,0.08) 360deg)
              `,
            }}
          />
          <div className="absolute inset-0 rounded-full bg-sunlit-gold/5 animate-pulse" />
          <Icon className="w-14 h-14 relative z-10" />
        </motion.div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : 0.3, duration: reduceMotion ? 0 : 0.42 }}
        >
          <h1 className="font-heading text-2xl text-jungle-deep mb-1">{progress.badgeTitle}</h1>
          <p className="text-xs text-moss font-sans mb-6">{progress.nama}</p>
          <div className="text-4xl font-heading text-jungle-deep mb-2 tracking-tight">{progress.quizScore}/{total}</div>
          <motion.div
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.42, duration: reduceMotion ? 0 : 0.45 }}
            className="mx-auto w-16 h-px origin-center bg-sunlit-gold/20 mb-2"
          />
          <p className="text-sm text-moss font-sans mb-8">{pct}% benar</p>
        </motion.div>
        <div className="flex flex-col gap-3">
          <motion.button
            onClick={handleSave}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.44 }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="btn-jungle bg-sunlit-gold text-jungle-deep px-8 py-3 hover:bg-ember"
          >
            Simpan Badge
          </motion.button>
          <motion.button
            onClick={() => router.push("/hub")}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.5 }}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="btn-jungle border border-jungle-deep/30 bg-transparent text-jungle-deep px-8 py-3 hover:border-jungle-deep/55 hover:bg-jungle-deep/6"
          >
            Kembali ke Jungle Hub
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
