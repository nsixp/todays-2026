"use client"

import { motion } from "framer-motion"

const FOG_EASE = [0.16, 1, 0.3, 1] as const

interface PageTransitionProps {
  pathname: string
  reduceMotion: boolean
}

export default function PageTransition({ pathname, reduceMotion }: PageTransitionProps) {
  if (reduceMotion || pathname === "/") return null

  return (
    <motion.div
      key={pathname}
      aria-hidden="true"
      className="page-transition-fog pointer-events-none fixed inset-0 z-60"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 0.78, 0] }}
      transition={{
        duration: 0.58,
        times: [0, 0.38, 1],
        ease: FOG_EASE,
      }}
    />
  )
}
