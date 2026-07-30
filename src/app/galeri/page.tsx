"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Aperture, CornersOut } from "@phosphor-icons/react"
import { getGallery } from "@/lib/data"
import Lightbox from "@/components/lightbox"

const items = getGallery()

const FRAME_CLASSES = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "lg:col-span-2",
  "",
  "",
  "",
  "",
]

export default function GaleriPage() {
  const reduceMotion = useReducedMotion()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const open = useCallback((index: number) => setLightboxIndex(index), [])
  const close = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => {
    setLightboxIndex((current) => (current !== null ? (current - 1 + items.length) % items.length : null))
  }, [])
  const next = useCallback(() => {
    setLightboxIndex((current) => (current !== null ? (current + 1) % items.length : null))
  }, [])

  return (
    <div className="gallery-dark-surface min-h-dvh pb-24 pt-24 text-warm-cream">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="grid min-h-[19rem] items-center gap-8 py-8 md:grid-cols-[1fr_auto] md:py-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-5 flex size-12 items-center justify-center rounded-full border border-warm-cream/15 text-sunlit-gold">
              <Aperture size={24} weight="duotone" />
            </div>
            <h1 className="max-w-3xl font-heading text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
              Kampus dalam potongan cahaya.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-warm-cream/62 sm:text-base">
              Kumpulan suasana kampus, fasilitas, dan kegiatan mahasiswa dalam format contact sheet.
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: reduceMotion ? 0 : 0.65 }}
            className="gallery-viewfinder relative mx-auto hidden aspect-square w-52 items-center justify-center sm:flex"
            aria-hidden="true"
          >
            <Aperture size={88} weight="thin" className="text-sunlit-gold/80" />
            <span className="absolute bottom-5 right-6 font-heading text-5xl text-warm-cream/15">
              {String(items.length).padStart(2, "0")}
            </span>
          </motion.div>
        </section>

        <section className="border-t border-warm-cream/12 pt-8">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <h2 className="font-heading text-3xl">Contact sheet</h2>
              <p className="mt-1 text-xs text-warm-cream/45">Pilih bingkai untuk melihat foto penuh.</p>
            </div>
            <span className="text-xs font-semibold text-sunlit-gold">{items.length} bingkai</span>
          </div>

          <div className="grid grid-flow-dense auto-rows-[9rem] grid-cols-2 gap-2.5 sm:auto-rows-[10rem] sm:grid-cols-3 lg:grid-cols-5 lg:gap-3">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.045, duration: reduceMotion ? 0 : 0.45 }}
                onClick={() => open(index)}
                className={`group relative overflow-hidden rounded-2xl border border-warm-cream/12 bg-jungle-deep text-left active:translate-y-px ${FRAME_CLASSES[index] ?? ""}`}
                aria-label={`Buka foto ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 20vw"
                  className="object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-linear-to-t from-jungle-shadow via-jungle-shadow/5 to-transparent" />
                <span className="absolute left-3 top-3 font-heading text-xl text-warm-cream/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <CornersOut
                  size={18}
                  className="absolute right-3 top-3 text-warm-cream/45 transition-transform group-hover:scale-110 group-hover:text-sunlit-gold"
                />
                <p className="absolute bottom-3 left-3 right-3 line-clamp-2 text-[11px] font-medium leading-snug text-warm-cream sm:text-xs">
                  {item.alt}
                </p>
              </motion.button>
            ))}
          </div>
        </section>
      </main>

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
