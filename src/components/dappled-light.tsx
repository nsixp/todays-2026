"use client"

import { motion } from "framer-motion"

const DAPPLED_POSITIONS = [
  { x: 10, y: 15 },
  { x: 82, y: 20 },
  { x: 50, y: 55 },
  { x: 20, y: 72 },
  { x: 75, y: 48 },
]

export default function DappledLight({
  count = 4,
  color = "#F3C46B",
}: {
  count?: number
  color?: string
}) {
  const positions = DAPPLED_POSITIONS.slice(0, count)

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {positions.map((pos, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: `${140 + i * 40}px`,
            height: `${140 + i * 40}px`,
            background: `radial-gradient(circle, ${color}22 0%, ${color}11 40%, transparent 70%)`,
          }}
          animate={{
            x: [0, 20 + i * 8, -15 - i * 5, 0],
            y: [0, -15 - i * 5, 12 + i * 6, 0],
            opacity: [0.2, 0.6, 0.3, 0.2],
            scale: [1, 1.12, 0.92, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            delay: i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
