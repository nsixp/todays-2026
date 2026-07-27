"use client"

import { motion } from "framer-motion"
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

  function handleClick() {
    if (locked) {
      onLockedClick?.()
      return
    }
    router.push(href)
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 * index, duration: 0.5, ease: "easeOut" }}
      onClick={handleClick}
      className={`relative flex flex-col items-center transition-all duration-300 ${
        locked ? "grayscale cursor-pointer" : "cursor-pointer"
      }`}
    >
      <div
        className={`flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${
          locked
            ? "border-fern-mist/50 bg-white/40 opacity-60"
            : "border-fern-mist bg-white/60 hover:border-sunlit-gold hover:shadow-lg hover:shadow-sunlit-gold/10"
        }`}
      >
        <div className="w-9 h-9 flex items-center justify-center text-jungle-deep">
          {icon}
        </div>
        <div className="text-center">
          <p
            className={`text-sm font-heading font-medium transition-colors duration-300 ${
              locked ? "text-sage" : "text-jungle-deep"
            }`}
          >
            {label}
          </p>
          <p className="text-[10px] text-fern-mist font-sans tracking-wide mt-0.5">
            {locked ? "Terkunci" : "Buka"}
          </p>
        </div>
      </div>
      <div className="w-0.5 h-5 bg-fern-mist/60 rounded-full" />
    </motion.button>
  )
}