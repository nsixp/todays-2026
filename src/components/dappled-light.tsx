"use client"

import { useId } from "react"
import { motion } from "framer-motion"

const DAPPLED_POSITIONS = [
  { x: 15, y: 20 },
  { x: 80, y: 25 },
  { x: 50, y: 60 },
  { x: 25, y: 70 },
  { x: 70, y: 50 },
]

export default function DappledLight({
  count = 4,
  color = "#F3C46B",
}: {
  count?: number
  color?: string
}) {
  const id = useId()
  const positions = DAPPLED_POSITIONS.slice(0, count)

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {positions.map((pos, i) => (
        <motion.div
          key={`dapple-${id}-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: `${120 + i * 30}px`,
            height: `${120 + i * 30}px`,
            background: `radial-gradient(circle, ${color}22 0%, ${color}11 40%, transparent 70%)`,
          }}
          animate={{
            x: [0, 15 + i * 5, -10 - i * 3, 0],
            y: [0, -10 - i * 3, 8 + i * 4, 0],
            opacity: [0.3, 0.7, 0.4, 0.3],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{
            duration: 6 + i * 1.5,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
