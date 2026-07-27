"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
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
  const { progress } = useProgress()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!progress.quizDone) router.replace("/quiz")
  }, [progress.quizDone, router])

  if (!mounted || !progress.quizDone) return null

  const Icon = ICON_MAP[progress.badgeIcon]
  const total = 8
  const pct = Math.round((progress.quizScore / total) * 100)

  return (
    <div className="min-h-dvh bg-gradient-to-b from-warm-cream to-sage/20 flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm bg-white/70 rounded-3xl border border-fern-mist p-8 text-center shadow-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 mx-auto mb-4 rounded-full bg-sunlit-gold/20 border-2 border-sunlit-gold flex items-center justify-center"
        >
          <Icon className="w-14 h-14" />
        </motion.div>
        <h1 className="font-heading text-2xl text-jungle-deep mb-1">{progress.badgeTitle}</h1>
        <p className="text-xs text-moss font-sans mb-6">{progress.nama}</p>
        <div className="text-4xl font-heading text-jungle-deep mb-2">{progress.quizScore}/{total}</div>
        <p className="text-sm text-moss font-sans mb-8">{pct}% benar</p>
        <button
          onClick={() => router.push("/hub")}
          className="rounded-full bg-jungle-deep text-warm-cream px-8 py-3 text-sm font-sans font-medium tracking-wide hover:bg-moss transition-colors"
        >
          Kembali ke Hub
        </button>
      </motion.div>
    </div>
  )
}
