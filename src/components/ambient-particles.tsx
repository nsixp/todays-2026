"use client"

import { useId } from "react"
import { motion } from "framer-motion"

export default function AmbientParticles({
  count = 4,
  colors,
}: {
  count?: number
  colors?: string[]
}) {
  const id = useId()
  const defaultColors = ["#F5D590", "#F3C46B", "#8EA98D", "#A3C4B5"]
  const palette = colors ?? defaultColors

  const particles = Array.from({ length: count }, (_, i) => ({
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    size: 2 + Math.random() * 3,
    color: palette[i % palette.length],
    dur: 3 + Math.random() * 4,
    delay: Math.random() * 2,
    driftX: (Math.random() - 0.5) * 40,
    driftY: (Math.random() - 0.5) * 30,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={`ambient-${id}-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 6px 2px ${p.color}44`,
          }}
          animate={{
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
