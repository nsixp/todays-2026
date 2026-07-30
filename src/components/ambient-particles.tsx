"use client"

import { motion, useReducedMotion } from "framer-motion"

const DEFAULT_PARTICLES = [
  { x: 15, y: 20, size: 3, dur: 4, delay: 0, driftX: 15, driftY: -12 },
  { x: 75, y: 30, size: 2, dur: 5, delay: 0.5, driftX: -20, driftY: 10 },
  { x: 40, y: 70, size: 4, dur: 3.5, delay: 1, driftX: 12, driftY: -15 },
  { x: 85, y: 50, size: 2.5, dur: 6, delay: 1.5, driftX: -10, driftY: 8 },
  { x: 20, y: 60, size: 3.5, dur: 4.5, delay: 0.8, driftX: 18, driftY: -8 },
]

export default function AmbientParticles({
  count = 4,
  colors,
}: {
  count?: number
  colors?: string[]
}) {
  const reduceMotion = useReducedMotion()
  const palette = colors ?? ["#F5D590", "#F3C46B", "#8EA98D", "#A3C4B5"]
  const positions = DEFAULT_PARTICLES.slice(0, count)

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {positions.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: palette[i % palette.length],
            boxShadow: `0 0 6px 2px ${palette[i % palette.length]}44`,
          }}
          animate={reduceMotion ? { opacity: 0.35, scale: 0.8 } : {
            x: [0, p.driftX * 0.5, p.driftX, 0],
            y: [0, p.driftY * 0.5, p.driftY, 0],
            opacity: [0, 0.7, 0.3, 0],
            scale: [0, 1.2, 0.6, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
