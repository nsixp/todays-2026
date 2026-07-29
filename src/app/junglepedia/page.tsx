"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getJunglePedia } from "@/lib/data"
import type { JunglePediaItem } from "@/types"
import JunglepediaCard from "@/components/junglepedia-card"

const items = getJunglePedia()

const CATEGORIES: { key: string; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "fasilitas", label: "Fasilitas" },
  { key: "ukm", label: "UKM" },
  { key: "platform", label: "Platform Akademik" },
]

export default function JunglePediaPage() {
  const [activeCategory, setActiveCategory] = useState("semua")

  const filtered: JunglePediaItem[] =
    activeCategory === "semua"
      ? items
      : items.filter((i) => i.kategori === activeCategory)

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
            JunglePedia
          </h1>
          <p className="text-sm text-moss font-sans max-w-lg mx-auto leading-relaxed">
            Kenali lebih dekat kampus Telkom University Purwokerto — fasilitas,
            organisasi kemahasiswaan, dan platform akademik yang akan menunjang
            perkuliahanmu.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-jungle-deep text-warm-cream shadow-md"
                    : "bg-white/60 text-moss border border-fern-mist/60 hover:bg-white hover:text-jungle-deep"
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-sage font-sans text-sm">
                  Belum ada data untuk kategori ini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filtered.map((item, i) => (
                  <JunglepediaCard key={item.id} item={item} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
