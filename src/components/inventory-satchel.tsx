"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  BackpackIcon as Backpack,
  BookIcon as Book,
  CheckIcon as Check,
  CircleIcon as Circle,
  ClockIcon as Clock,
  PencilSimpleIcon as PencilSimple,
  StarIcon as Star,
} from "@phosphor-icons/react"

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
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)

  const booksvg = <Book size={16} className="shrink-0" />
  const medalSvg = <Clock size={16} className="shrink-0" />
  const badgeSvg = <Star size={16} className="shrink-0" weight="fill" />
  const blankSvg = <Circle size={16} className="shrink-0" />
  const penSvg = <PencilSimple size={16} className="shrink-0" />

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
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        whileHover={reduceMotion ? undefined : { y: -2, rotate: -3 }}
        whileTap={reduceMotion ? undefined : { scale: 0.93 }}
        className="relative w-10 h-10 rounded-full bg-warm-cream border-2 border-fern-mist shadow-md hover:shadow-lg transition-shadow flex items-center justify-center"
        aria-label="Buka tas perlengkapan"
        aria-expanded={open}
      >
        <Backpack size={20} className="text-jungle-deep" />
        {collected > 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-sunlit-gold border-2 border-warm-cream" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 400, damping: 25 }
            }
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
                    initial={reduceMotion ? false : "hidden"}
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
                      <Check size={12} className="text-sunlit-gold shrink-0" />
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
