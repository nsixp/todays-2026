"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const LEAVES = [
  { x: 10, y: 20, r: 15, delay: 0.2, dur: 3 },
  { x: 75, y: 15, r: 10, delay: 0.8, dur: 4 },
  { x: 85, y: 70, r: 12, delay: 1.5, dur: 3.5 },
  { x: 20, y: 80, r: 8, delay: 0.5, dur: 2.8 },
  { x: 50, y: 10, r: 6, delay: 1.2, dur: 3.2 },
]

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const hasProgress = (() => {
      try {
        const raw = localStorage.getItem("todays-progress")
        if (!raw) return false
        const p = JSON.parse(raw)
        return p.nim?.length > 0
      } catch {
        return false
      }
    })()

    const timer = setTimeout(() => {
      router.replace(hasProgress ? "/hub" : "/welcome")
    }, hasProgress ? 1000 : 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-warm-cream overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <h1 className="font-heading text-5xl sm:text-6xl text-jungle-deep tracking-tight">
          TODAYS
        </h1>
        <p className="mt-2 text-sm text-moss font-sans tracking-widest uppercase">
          Telkom University Purwokerto
        </p>
        <p className="mt-1 text-xs text-sage font-sans">
          2026
        </p>
      </motion.div>

      {LEAVES.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-fern-mist/40"
          style={{ left: `${leaf.x}%`, top: `${leaf.y}%` }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            opacity: [0.3, 0.7, 0.3, 0],
            scale: [1, 1.2, 0.8, 0],
          }}
          transition={{
            duration: leaf.dur,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <button
        onClick={() => {
          try {
            const raw = localStorage.getItem("todays-progress")
            const hasProg = raw ? JSON.parse(raw).nim?.length > 0 : false
            router.replace(hasProg ? "/hub" : "/welcome")
          } catch {
            router.replace("/welcome")
          }
        }}
        className="absolute bottom-10 text-xs text-sage font-sans tracking-wider underline underline-offset-4 hover:text-moss transition-colors"
      >
        Skip
      </button>
    </div>
  )
}
