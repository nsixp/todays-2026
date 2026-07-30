"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useJejakRimba } from "@/hooks/use-jejak-rimba"
import { useProgress } from "@/hooks/use-progress"
import JejakRimbaCard from "@/components/jejak-rimba-card"

const LATAR_BG: Record<string, string> = {
  canopy: "from-jungle-deep/30 via-warm-cream to-sage/40",
  river: "from-blue-900/20 via-warm-cream to-sage/30",
  cave: "from-jungle-deep/60 via-jungle-deep/30 to-warm-cream",
  clearing: "from-sunlit-gold/20 via-warm-cream to-sage/30",
  ruins: "from-jungle-deep/40 via-amber-900/20 to-warm-cream",
}

export default function JejakRimbaPage() {
  const router = useRouter()
  const { progress } = useProgress()
  const { currentNode, isEnding, canGoBack, pilih, goBack, reset } = useJejakRimba()
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [narrativeKey, setNarrativeKey] = useState(0)

  useEffect(() => {
    if (!progress.quizDone && !progress.easterEggs?.["Jejak Rimba"]) {
      router.replace("/hub")
    }
  }, [progress, router])

  function handleSelect(nextId: string) {
    setSelectedCard(nextId)
    setTimeout(() => {
      setSelectedCard(null)
      pilih(nextId)
      setNarrativeKey((k) => k + 1)
    }, 400)
  }

  function handleReset() {
    reset()
    setNarrativeKey((k) => k + 1)
  }

  const latar = currentNode.latar ?? "canopy"
  const bgGradient = LATAR_BG[latar]

  return (
    <div className="min-h-dvh bg-warm-cream flex flex-col overflow-x-hidden">
      {/* Narrative Section (60%) */}
      <div className={`relative flex-1 flex items-center justify-center p-6 bg-linear-to-b ${bgGradient}`}>
        <AnimatePresence mode="wait">
          {isEnding ? (
            <motion.div
              key={`ending-${currentNode.id}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-lg mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 15 }}
                className="w-16 h-16 rounded-full bg-sunlit-gold/20 border-2 border-sunlit-gold flex items-center justify-center mx-auto mb-5"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-sunlit-gold">
                  <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.636 5.636l1.414 1.414M16.95 16.95l1.414 1.414M5.636 18.364l1.414-1.414M16.95 7.05l1.414-1.414" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="font-heading text-2xl sm:text-3xl text-jungle-deep mb-3"
              >
                {currentNode.ending?.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-sm text-moss font-sans leading-relaxed"
              >
                {currentNode.ending?.deskripsi}
              </motion.p>
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.15, duration: 0.4 }}
                  onClick={() => router.push("/hub")}
                  className="inline-flex items-center gap-2 rounded-full border border-fern-mist text-moss px-6 py-2.5 text-sm font-sans font-medium tracking-wide hover:bg-moss hover:text-warm-cream transition-colors"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                    <path d="M6 3 2 7l4 4M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Kembali ke Hub
                </motion.button>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.4 }}
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-full bg-jungle-deep text-warm-cream px-6 py-2.5 text-sm font-sans font-medium tracking-wide hover:bg-jungle-deep/90 transition-colors"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                    <path d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M6 6h4v4M6 6l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  Main Lagi
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`narasi-${narrativeKey}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-lg mx-auto"
            >
              {canGoBack && (
                <button
                  onClick={goBack}
                  className="mb-4 flex items-center gap-1.5 text-xs text-moss font-sans tracking-wide uppercase hover:text-jungle-deep transition-colors"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3">
                    <path d="M10 12 6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Kembali
                </button>
              )}
              <p className="text-sm sm:text-base text-jungle-deep font-sans leading-relaxed">
                {currentNode.narasi}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Hand Section (40%) */}
      {!isEnding && (
        <div className="h-[40dvh] bg-jungle-deep/5 border-t border-fern-mist/40 flex items-center justify-center overflow-x-auto px-4">
          <div className="flex items-end gap-3 sm:gap-4 pb-4 pt-2">
            <AnimatePresence mode="popLayout">
              {currentNode.pilihan.map((p, i) => (
                <JejakRimbaCard
                  key={`${narrativeKey}-${p.nextId}`}
                  pilihan={p}
                  index={i}
                  onSelect={() => handleSelect(p.nextId)}
                  disabled={selectedCard !== null}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}
