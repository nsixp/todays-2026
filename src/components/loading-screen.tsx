"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

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

const CIRCUMFERENCE = 2 * Math.PI * 28

export default function LoadingScreen({ duration = 2500, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  const finish = useCallback(() => {
    setExiting(true)
    setTimeout(onComplete, 300)
  }, [onComplete])

  useEffect(() => {
    let finished = false
    const start = performance.now()
    const frame = () => {
      const elapsed = performance.now() - start
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(pct)
      if (pct >= 100 && !finished) {
        finished = true
        setTimeout(finish, 400)
      } else {
        requestAnimationFrame(frame)
      }
    }
    const id = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(id)
  }, [duration, finish])

  const offset = CIRCUMFERENCE * (1 - progress / 100)
  const showParticles = progress > 30
  const glowT = Math.min(progress / 30, 1)
  const glowBlur = 8 * (1 - glowT)
  const glowScale = 0.95 + 0.05 * glowT

  return (
    <div className="relative h-full w-full bg-jungle-shadow overflow-hidden">
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
              animate={{
                x: [0, 20, -10, 0],
                y: [0, -15, 10, 0],
                opacity: [0, 0.6, 0.3, 0],
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

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-center"
              style={{
                opacity: glowT,
                scale: glowScale,
                filter: `blur(${glowBlur}px)`,
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

          <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
            <div className="relative w-20 h-20">
              <svg width={80} height={80} viewBox="0 0 80 80" className="-rotate-90">
                <circle
                  cx={40} cy={40} r={28}
                  fill="none"
                  stroke="rgba(243,196,107,0.12)"
                  strokeWidth={3}
                />
                <circle
                  cx={40} cy={40} r={28}
                  fill="none"
                  stroke="#F3C46B"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={offset}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-heading text-sm text-sunlit-gold">
                {Math.round(progress)}
              </span>
            </div>
          </div>

          <button
            onClick={finish}
            className="absolute bottom-8 right-6 z-30 text-xs text-warm-cream/30 font-sans tracking-wider uppercase hover:text-warm-cream/60 transition-colors"
          >
            Skip
          </button>
        </>
      )}

      {exiting && (
        <motion.div
          className="absolute inset-0 bg-white z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </div>
  )
}
