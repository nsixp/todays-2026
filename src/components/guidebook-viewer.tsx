"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
import type { GuidebookSection } from "@/types"

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
}

interface GuidebookViewerProps {
  sections: GuidebookSection[]
}

export default function GuidebookViewer({ sections }: GuidebookViewerProps) {
  const router = useRouter()
  const { progress, save } = useProgress()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const total = sections.length
  const currentSection = sections[currentIndex]
  const isLastPage = currentIndex === total - 1

  function goNext() {
    if (currentIndex < total - 1) {
      const nextIdx = currentIndex + 1
      const nextId = sections[nextIdx].id
      if (!progress.pagesRead.includes(nextId))
        save({ pagesRead: [...progress.pagesRead, nextId] })
      setDirection(1)
      setCurrentIndex(nextIdx)
    } else {
      save({ pagesRead: [1, 2, 3, 4, 5, 6] })
      router.push("/hub")
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1
      const prevId = sections[prevIdx].id
      if (!progress.pagesRead.includes(prevId))
        save({ pagesRead: [...progress.pagesRead, prevId] })
      setDirection(-1)
      setCurrentIndex(prevIdx)
    }
  }

  return (
    <div className="min-h-dvh bg-linear-to-b from-warm-cream to-sage/20 flex flex-col">
      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-1.5 rounded-full bg-fern-mist/50 overflow-hidden">
            <div
              className="h-full rounded-full bg-sunlit-gold transition-all duration-300 ease-out"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
          <span className="text-xs text-moss font-sans tabular-nums shrink-0">
            {currentIndex + 1}/{total} halaman
          </span>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSection.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col"
          >
            <h1 className="font-heading text-2xl sm:text-3xl text-jungle-deep mb-6">
              {currentSection.title}
            </h1>
            <div className="space-y-4">
              {currentSection.content.map((paragraph, i) => (
                <p key={i} className="text-sm text-moss font-sans leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between pt-8 mt-auto">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="rounded-full border border-fern-mist text-moss px-5 py-2 text-sm font-sans hover:bg-white/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>
          <button
            onClick={goNext}
            className="rounded-full bg-sunlit-gold text-jungle-deep px-6 py-2 text-sm font-sans font-medium hover:bg-ember hover:text-warm-cream transition-colors"
          >
            {isLastPage ? "Selesai" : "Selanjutnya"}
          </button>
        </div>
      </div>
    </div>
  )
}
