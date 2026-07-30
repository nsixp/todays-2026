"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, useReducedMotion } from "framer-motion"
import BackgroundFoliage from "@/components/background-foliage"

interface LoadingScreenProps {
  duration?: number
  onComplete: () => void
}

const LEAVES = [
  { x: 10, y: 20, r: 15, delay: 0.2, dur: 3 },
  { x: 75, y: 15, r: 10, delay: 0.8, dur: 4 },
  { x: 85, y: 70, r: 12, delay: 1.5, dur: 3.5 },
  { x: 20, y: 80, r: 8, delay: 0.5, dur: 2.8 },
  { x: 50, y: 10, r: 6, delay: 1.2, dur: 3.2 },
]

export default function LoadingScreen({ duration = 3000, onComplete }: LoadingScreenProps) {
  const reduceMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  const finish = useCallback(() => {
    setExiting(true)
    setTimeout(onComplete, 300)
  }, [onComplete])

  useEffect(() => {
    let finished = false
    let frameId = 0
    let completionTimer: ReturnType<typeof setTimeout> | undefined
    const start = performance.now()
    const frame = () => {
      const elapsed = performance.now() - start
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(pct)
      if (pct >= 100 && !finished) {
        finished = true
        completionTimer = setTimeout(finish, 400)
      } else {
        frameId = requestAnimationFrame(frame)
      }
    }
    frameId = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(frameId)
      if (completionTimer) clearTimeout(completionTimer)
    }
  }, [duration, finish])

  const showParticles = progress > 30
  const glowT = Math.min(progress / 30, 1)
  const glowBlur = 8 * (1 - glowT)
  const glowScale = 0.95 + 0.05 * glowT

  return (
    <div className="relative h-full w-full bg-jungle-shadow overflow-hidden">
      <div className="loading-forest absolute inset-0" />
      <BackgroundFoliage variant="canopy-top" opacity={0.1} color="var(--color-warm-cream)" />
      <motion.div
        className="absolute inset-x-[-15%] bottom-[12%] h-28 rounded-[50%] bg-jungle-mist/10 blur-3xl"
        animate={reduceMotion ? undefined : { x: ["-3%", "3%", "-3%"], opacity: [0.12, 0.25, 0.12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      {!exiting && (
        <>
          {showParticles && LEAVES.map((leaf, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{
                left: `${leaf.x}%`,
                top: `${leaf.y}%`,
                backgroundColor: "rgba(243,196,107,0.12)",
              }}
              initial={{ opacity: 0 }}
              animate={reduceMotion ? { opacity: 0.35, scale: 0.8 } : {
                x: [0, 20, -10, 0],
                y: [0, -15, 10, 0],
                opacity: [0, 0.6, 0.3, 0],
                scale: [1, 1.2, 0.8, 0],
              }}
              transition={{
                duration: reduceMotion ? 0 : leaf.dur,
                delay: reduceMotion ? 0 : leaf.delay,
                repeat: reduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center"
              style={{
                opacity: glowT,
                scale: reduceMotion ? 1 : glowScale,
                filter: reduceMotion ? "none" : `blur(${glowBlur}px)`,
              }}
            >
              <h1 className="font-heading text-5xl sm:text-6xl text-warm-cream tracking-tight">
                TODAYS
              </h1>
              <p className="mt-2 text-sm text-warm-cream/70 font-sans tracking-widest uppercase">
                Telkom University Purwokerto
              </p>
              <p className="mt-1 text-xs text-warm-cream/50 font-sans">
                2026
              </p>
            </motion.div>
          </div>

          <div className="absolute bottom-[max(5rem,calc(env(safe-area-inset-bottom)+4rem))] left-1/2 w-[min(18rem,calc(100vw-2rem))] -translate-x-1/2">
            <div className="mb-2 flex items-center justify-between text-xs text-warm-cream/55">
              <span>Menyiapkan jalur</span>
              <span className="font-medium text-sunlit-gold">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-warm-cream/10">
              <motion.div
                className="h-full origin-left rounded-full bg-sunlit-gold"
                style={{ scaleX: progress / 100 }}
              />
            </div>
          </div>

          <button
            onClick={finish}
            className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 flex min-h-11 items-center px-2 text-xs font-sans uppercase tracking-wider text-warm-cream/55 transition-colors hover:text-warm-cream sm:right-6"
          >
            Lewati
          </button>
        </>
      )}

      {exiting && (
        <motion.div
          className="absolute inset-0 bg-warm-cream z-50"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
        />
      )}
    </div>
  )
}
