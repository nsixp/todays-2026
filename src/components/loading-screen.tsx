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

const FINISH_DELAY = 800

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function LoadingScreen({ duration = 2500, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  const finish = useCallback(() => {
    setExiting(true)
    setTimeout(onComplete, 600)
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
        setTimeout(finish, FINISH_DELAY)
      } else {
        requestAnimationFrame(frame)
      }
    }
    const id = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(id)
  }, [duration, finish])

  const wipePct = 100 - progress
  const eased = easeInOutCubic(progress / 100) * 100
  const clampedLeft = 18 + eased * 0.64

  return (
    <div className="relative h-full w-full bg-warm-cream overflow-hidden">
      {!exiting && (
        <>
          {LEAVES.map((leaf, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full z-10"
              style={{
                left: `${leaf.x}%`,
                top: `${leaf.y}%`,
                backgroundColor: progress > 50 ? "rgba(251,247,238,0.3)" : "rgba(78,112,83,0.25)",
              }}
              animate={{
                x: [0, 20, -10, 0],
                y: [0, -15, 10, 0],
                opacity: [0.3, 0.6, 0.3, 0],
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
            <div className="text-center">
              <h1 className="font-heading text-5xl sm:text-6xl text-jungle-deep tracking-tight">
                TODAYS
              </h1>
              <p className="mt-2 text-sm text-moss font-sans tracking-widest uppercase">
                Telkom University Purwokerto
              </p>
              <p className="mt-1 text-xs text-sage font-sans">
                2026
              </p>
            </div>
          </div>

          <motion.div
            className="absolute inset-0 bg-jungle-deep overflow-hidden"
            style={{ clipPath: `inset(${wipePct}% 0 0 0)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h1 className="font-heading text-5xl sm:text-6xl text-warm-cream tracking-tight">
                  TODAYS
                </h1>
                <p className="mt-2 text-sm text-warm-cream/70 font-sans tracking-widest uppercase">
                  Telkom University Purwokerto
                </p>
                <p className="mt-1 text-xs text-warm-cream/50 font-sans">
                  2026
                </p>
              </div>
            </div>
          </motion.div>

          <span
            className="absolute bottom-8 z-30 font-heading text-5xl sm:text-7xl lg:text-9xl text-sunlit-gold tracking-tighter leading-none pointer-events-none select-none"
            style={{
              left: `${Math.round(clampedLeft * 10) / 10}%`,
              transform: "translateX(-50%)",
              textShadow: "0 2px 12px rgba(26,58,43,0.2)",
            }}
          >
            {Math.round(progress)}%
          </span>
        </>
      )}
    </div>
  )
}
