"use client"

import { useEffect, useCallback } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Image from "next/image"
import type { GalleryItem } from "@/types"
import { CaretLeft, CaretRight, X } from "@/components/icons/streamline"

interface LightboxProps {
  items: GalleryItem[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function Lightbox({ items, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const reduceMotion = useReducedMotion()
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
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-jungle-shadow/90 px-3 py-20 backdrop-blur-sm sm:px-16 sm:py-10"
        onClick={onClose}
      >
        <motion.div
          key={currentIndex}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-h-[74dvh] max-w-full sm:max-h-[85dvh] sm:max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={900}
            height={900}
            sizes="(max-width: 639px) calc(100vw - 1.5rem), 90vw"
            className="max-h-[74dvh] max-w-full rounded-2xl object-contain shadow-2xl sm:max-h-[85dvh] sm:max-w-[90vw]"
          />
          <p className="absolute bottom-3 left-1/2 max-w-[calc(100%-1rem)] -translate-x-1/2 truncate rounded-full bg-jungle-shadow/70 px-3 py-1 font-sans text-xs text-warm-cream/80">
            {item.alt}, {currentIndex + 1} / {items.length}
          </p>
        </motion.div>

        <motion.button
          onClick={onClose}
          whileHover={reduceMotion ? undefined : { rotate: 6, scale: 1.05 }}
          whileTap={reduceMotion ? undefined : { scale: 0.92 }}
          className="absolute right-3 top-[max(0.75rem,env(safe-area-inset-top))] flex size-12 items-center justify-center rounded-full bg-warm-cream/12 text-warm-cream transition-colors hover:bg-warm-cream/20 sm:right-4"
          aria-label="Tutup"
        >
          <X size={20} />
        </motion.button>

        {items.length > 1 && (
          <>
            <motion.button
              onClick={onPrev}
              whileHover={reduceMotion ? undefined : { x: -3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.92 }}
              className="absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-[calc(50%-3.25rem)] flex size-12 items-center justify-center rounded-full bg-warm-cream/12 text-warm-cream transition-colors hover:bg-warm-cream/20 sm:bottom-auto sm:left-4 sm:top-1/2 sm:-translate-y-1/2"
              aria-label="Sebelumnya"
            >
              <CaretLeft size={20} />
            </motion.button>
            <motion.button
              onClick={onNext}
              whileHover={reduceMotion ? undefined : { x: 3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.92 }}
              className="absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-[calc(50%-3.25rem)] flex size-12 items-center justify-center rounded-full bg-warm-cream/12 text-warm-cream transition-colors hover:bg-warm-cream/20 sm:bottom-auto sm:right-4 sm:top-1/2 sm:-translate-y-1/2"
              aria-label="Selanjutnya"
            >
              <CaretRight size={20} />
            </motion.button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
