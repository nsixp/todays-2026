"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { getGallery } from "@/lib/data"
import Lightbox from "@/components/lightbox"

const items = getGallery()

export default function GaleriPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const open = useCallback((i: number) => setLightboxIndex(i), [])
  const close = useCallback(() => setLightboxIndex(null), [])

  const prev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : null))
  }, [])

  const next = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % items.length : null))
  }, [])

  return (
    <div className="min-h-dvh bg-gradient-to-b from-warm-cream to-sage/20 pt-24 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-jungle-deep/10 text-[10px] text-moss font-sans tracking-[0.2em] uppercase border border-fern-mist/40 mb-4">
            TODAYS 2026
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-jungle-deep leading-tight mb-3">
            Galeri
          </h1>
          <p className="text-sm text-moss font-sans max-w-lg mx-auto leading-relaxed">
            Jelajahi suasana kampus Telkom University Purwokerto melalui
            foto-foto kegiatan dan fasilitas.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
              onClick={() => open(i)}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-fern-mist/60 bg-white/60 hover:border-sunlit-gold/40 hover:shadow-lg hover:shadow-sunlit-gold/5 transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jungle-shadow/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="absolute bottom-3 left-3 right-3 text-[11px] text-warm-cream font-sans leading-tight text-left">
                  {item.alt}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          currentIndex={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  )
}
