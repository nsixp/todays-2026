"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Buildings, CompassRose, Laptop, UsersThree } from "@/components/icons/streamline"
import { getKompas } from "@/lib/data"
import type { KompasItem } from "@/types"
import KompasCard from "@/components/kompas-card"

const items = getKompas()

const CATEGORIES = [
  { key: "semua", label: "Semua catatan", icon: CompassRose },
  { key: "fasilitas", label: "Fasilitas", icon: Buildings },
  { key: "ukm", label: "UKM", icon: UsersThree },
  { key: "platform", label: "Platform akademik", icon: Laptop },
]

export default function KompasPage() {
  const reduceMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState("semua")

  const filtered: KompasItem[] =
    activeCategory === "semua"
      ? items
      : items.filter((item) => item.kategori === activeCategory)

  return (
    <div className="kompas-surface min-h-dvh pb-24 pt-24">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="grid min-h-72 items-center gap-8 py-8 md:min-h-80 md:grid-cols-[1.2fr_0.8fr] md:py-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ember">
              Arsip orientasi kampus
            </span>
            <h1 className="mt-4 max-w-2xl font-heading text-4xl leading-[1.02] text-jungle-deep sm:text-5xl lg:text-6xl">
              Kompas kecil untuk kehidupan kampus.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-moss sm:text-base">
              Temukan fasilitas, komunitas mahasiswa, dan platform akademik dalam catatan yang mudah dipindai.
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.12, duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto hidden aspect-square w-full max-w-60 md:block"
            aria-hidden="true"
          >
            <div className="archive-compass absolute inset-[5%] rounded-full">
              <div className="absolute inset-[14%] rounded-full border border-dashed border-jungle-deep/20" />
              <div className="absolute left-1/2 top-[8%] h-[84%] w-px -translate-x-1/2 bg-jungle-deep/15" />
              <div className="absolute left-[8%] top-1/2 h-px w-[84%] -translate-y-1/2 bg-jungle-deep/15" />
              <CompassRose className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 text-jungle-deep" weight="duotone" />
              <span className="absolute left-1/2 top-[6%] -translate-x-1/2 font-heading text-2xl text-ember">N</span>
              <span className="absolute bottom-[7%] left-1/2 -translate-x-1/2 font-heading text-2xl text-moss">S</span>
              <span className="absolute left-[7%] top-1/2 -translate-y-1/2 font-heading text-2xl text-moss">W</span>
              <span className="absolute right-[7%] top-1/2 -translate-y-1/2 font-heading text-2xl text-moss">E</span>
            </div>
          </motion.div>
        </section>

        <section className="grid gap-6 border-t border-jungle-deep/15 pt-6 lg:grid-cols-[12.5rem_1fr] lg:gap-8">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-heading text-xl text-jungle-deep">Pilih kategori</h2>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
              {CATEGORIES.map((category) => {
                const Icon = category.icon
                const isActive = activeCategory === category.key

                return (
                  <button
                    key={category.key}
                    type="button"
                    onClick={() => setActiveCategory(category.key)}
                    className={`flex shrink-0 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-all active:translate-y-px lg:w-full ${
                      isActive
                        ? "border-jungle-deep bg-jungle-deep text-warm-cream"
                        : "border-jungle-deep/12 bg-warm-cream/60 text-moss hover:border-moss/35 hover:text-jungle-deep"
                    }`}
                  >
                    <Icon size={17} weight="duotone" className={isActive ? "text-sunlit-gold" : "text-moss"} />
                    <span className="flex-1 whitespace-nowrap">{category.label}</span>
                    <span className={isActive ? "text-warm-cream/55" : "text-jungle-deep/35"}>
                      {category.key === "semua"
                        ? items.length
                        : items.filter((item) => item.kategori === category.key).length}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
            >
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-jungle-deep/20 px-6 py-16 text-center">
                  <CompassRose className="mx-auto size-9 text-sage" weight="duotone" />
                  <p className="mt-3 text-sm text-moss">Belum ada catatan untuk kategori ini.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((item, index) => (
                    <KompasCard
                      key={item.id}
                      item={item}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  )
}
