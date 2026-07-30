"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useRouter } from "next/navigation"

interface SignpostProps {
  icon: React.ReactNode
  label: string
  href: string
  locked: boolean
  index: number
  onLockedClick?: () => void
}

export default function Signpost({ icon, label, href, locked, index, onLockedClick }: SignpostProps) {
  const router = useRouter()
  const reduceMotion = useReducedMotion()

  function handleClick() {
    if (locked) {
      onLockedClick?.()
      return
    }
    router.push(href)
  }

  return (
    <motion.button
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: reduceMotion ? 0 : 0.12 * index,
        duration: reduceMotion ? 0 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      onClick={handleClick}
      className="relative flex flex-col items-center transition-all duration-300 cursor-pointer group"
    >
      <motion.div
        animate={
          locked || reduceMotion
            ? {}
            : {
                boxShadow: [
                  "0 0 0 0 rgba(243,196,107,0)",
                  "0 0 12px 2px rgba(243,196,107,0.25)",
                  "0 0 0 0 rgba(243,196,107,0)",
                ],
              }
        }
        transition={
          locked
            ? {}
            : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
        }
        className={`relative flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
          locked
            ? "border-jungle-deep/15 bg-white/30"
            : "border-fern-mist bg-white/60 hover:border-sunlit-gold hover:shadow-lg hover:shadow-sunlit-gold/10"
        }`}
      >
        {locked && (
          <div className="absolute inset-0 bg-linear-to-b from-jungle-shadow/50 to-jungle-shadow/30 pointer-events-none" />
        )}
        <div className="relative w-9 h-9 flex items-center justify-center text-jungle-deep">
          {icon}
        </div>
        <div className="text-center relative">
          <p
            className={`text-sm font-heading font-medium transition-colors duration-300 ${
              locked ? "text-sage/70" : "text-jungle-deep"
            }`}
          >
            {label}
          </p>
          <p className="text-[10px] text-fern-mist font-sans tracking-wide mt-0.5">
            {locked ? "Terkunci" : "Buka"}
          </p>
        </div>
      </motion.div>
      <div className="w-0.5 h-5 bg-fern-mist/60 rounded-full" />
    </motion.button>
  )
}
