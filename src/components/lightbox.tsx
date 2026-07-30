"use client"

import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { GalleryItem } from "@/types"
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react"

interface LightboxProps {
  items: GalleryItem[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ items, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const item = items[currentIndex]

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    },
    [onClose, onPrev, onNext],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [handleKey])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-jungle-shadow/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative max-h-[85vh] max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl object-contain"
          />
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-warm-cream/70 font-sans bg-jungle-shadow/50 px-3 py-1 rounded-full">
            {item.alt} — {currentIndex + 1} / {items.length}
          </p>
        </motion.div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-warm-cream/10 hover:bg-warm-cream/20 text-warm-cream transition-colors"
          aria-label="Tutup"
        >
          <X size={20} />
        </button>

        {items.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-warm-cream/10 hover:bg-warm-cream/20 text-warm-cream transition-colors"
              aria-label="Sebelumnya"
            >
              <CaretLeft size={20} />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-warm-cream/10 hover:bg-warm-cream/20 text-warm-cream transition-colors"
              aria-label="Selanjutnya"
            >
              <CaretRight size={20} />
            </button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
