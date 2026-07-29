"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface InventorySatchelProps {
  guidebookDone: boolean
  quizDone: boolean
  hasBadge: boolean
  pagesRead: number
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.2 },
  }),
}

export default function InventorySatchel({
  guidebookDone,
  quizDone,
  hasBadge,
  pagesRead,
}: InventorySatchelProps) {
  const [open, setOpen] = useState(false)

  const booksvg = (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0">
      <path d="M3 16.5A2 2 0 0 1 5 15H17" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M5 2H17v18H5A2 2 0 0 1 3 18V4a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
  const medalSvg = (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0">
      <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 6v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
  const badgeSvg = (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0">
      <path d="M10 2l2.58 5.22L18 8.27l-4 3.87.94 5.86L10 15.77l-4.94 2.23L6 12.14 2 8.27l5.42-1.05L10 2Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
  const blankSvg = (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0">
      <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 2" />
    </svg>
  )
  const penSvg = (
    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 shrink-0">
      <path d="M4 16v-2.5l9-9a1.5 1.5 0 0 1 2 2l-9 9H4v-2Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  const items = [
    {
      icon: booksvg,
      label: "Guidebook",
      status: `${pagesRead}/6 halaman`,
      done: guidebookDone,
    },
    {
      icon: quizDone ? medalSvg : penSvg,
      label: "Quiz",
      status: quizDone ? "Selesai" : "Belum",
      done: quizDone,
    },
    {
      icon: hasBadge ? badgeSvg : blankSvg,
      label: "Badge",
      status: hasBadge ? "Diperoleh" : "Belum",
      done: hasBadge,
    },
  ]

  const collected = items.filter((i) => i.done).length

  return (
    <div className="absolute -bottom-2 -right-2 z-30">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative w-10 h-10 rounded-full bg-warm-cream border-2 border-fern-mist shadow-md hover:shadow-lg transition-shadow flex items-center justify-center"
        aria-label="Buka tas perlengkapan"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-jungle-deep">
          <path
            d="M4 9h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M8 9V7a4 4 0 0 1 8 0v2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 9V6a2 2 0 0 1 4 0v3"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
        {collected > 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-sunlit-gold border-2 border-warm-cream" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute bottom-full right-0 mb-2 w-44 origin-bottom-right"
          >
            <div className="bg-warm-cream rounded-xl border border-fern-mist shadow-lg p-3">
              <p className="text-[10px] text-moss font-sans tracking-wider uppercase mb-2">
                Perlengkapan
              </p>
              <div className="space-y-1.5">
                {items.map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className={`flex items-center gap-2 text-xs font-sans ${
                      item.done ? "text-jungle-deep" : "text-sage"
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{item.label}</p>
                      <p
                        className={`text-[10px] ${
                          item.done ? "text-jungle-deep/60" : "text-sage/70"
                        }`}
                      >
                        {item.status}
                      </p>
                    </div>
                    {item.done && (
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="w-3 h-3 text-sunlit-gold shrink-0"
                      >
                        <path
                          d="M3 8l3 4 7-8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
