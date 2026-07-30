"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
  BookOpenTextIcon as BookOpenText,
  CheckIcon as Check,
  ClockIcon as Clock,
  CompassIcon as Compass,
  FlagIcon as Flag,
  ListChecksIcon as ListChecks,
  MapTrifoldIcon as MapTrifold,
  MegaphoneIcon as Megaphone,
  PhoneCallIcon as PhoneCall,
  ShirtFoldedIcon as ShirtFolded,
} from "@phosphor-icons/react"
import { useProgress } from "@/hooks/use-progress"
import { Button } from "@/components/ui/button"
import type { GuidebookSection } from "@/types"

const SECTION_ICONS = [
  Megaphone,
  Clock,
  ShirtFolded,
  ListChecks,
  MapTrifold,
  PhoneCall,
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
    filter: "blur(3px)",
  }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
    filter: "blur(3px)",
  }),
}

interface GuidebookViewerProps {
  sections: GuidebookSection[]
}

function getReadingTime(paragraphs: string[]) {
  const wordCount = paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / 180))
}

export default function GuidebookViewer({ sections }: GuidebookViewerProps) {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const { progress, save } = useProgress()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const total = sections.length
  const currentSection = sections[currentIndex]

  if (!currentSection) {
    return (
      <main className="forest-surface flex min-h-dvh items-center justify-center px-4">
        <div className="forest-panel max-w-md rounded-3xl p-8 text-center">
          <BookOpenText className="mx-auto size-9 text-moss" weight="duotone" />
          <h1 className="mt-4 font-heading text-3xl text-jungle-deep">Guidebook belum tersedia</h1>
          <p className="mt-2 text-sm leading-relaxed text-moss">
            Materi sedang disiapkan oleh panitia. Silakan kembali ke Jungle Hub.
          </p>
          <Button
            onClick={() => router.push("/hub")}
            className="mt-6 h-11 rounded-full bg-jungle-deep px-6 text-warm-cream hover:bg-moss"
          >
            Kembali ke Jungle Hub
          </Button>
        </div>
      </main>
    )
  }

  const CurrentIcon = SECTION_ICONS[currentIndex % SECTION_ICONS.length]
  const isLastPage = currentIndex === total - 1
  const viewedIds = new Set([...progress.pagesRead, currentSection.id])
  const readingTime = getReadingTime(currentSection.content)

  function markCurrentAsRead() {
    if (!progress.pagesRead.includes(currentSection.id)) {
      save({ pagesRead: [...progress.pagesRead, currentSection.id] })
    }
  }

  function goNext() {
    markCurrentAsRead()

    if (!isLastPage) {
      setDirection(1)
      setCurrentIndex((index) => index + 1)
      return
    }

    save({ pagesRead: sections.map((section) => section.id) })
    router.push("/hub")
  }

  function goPrev() {
    if (currentIndex === 0) return
    markCurrentAsRead()
    setDirection(-1)
    setCurrentIndex((index) => index - 1)
  }

  return (
    <main className="guidebook-surface relative min-h-dvh overflow-hidden px-3 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute -left-28 top-28 size-80 rounded-full border border-jungle-deep/8" />
      <div className="pointer-events-none absolute -left-16 top-40 size-56 rounded-full border border-jungle-deep/8" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[17rem_minmax(0,1fr)_14rem] lg:items-start">
        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
          className="forest-panel overflow-hidden rounded-3xl lg:sticky lg:top-8"
        >
          <div className="border-b border-jungle-deep/10 bg-jungle-deep px-5 py-5 text-warm-cream">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-warm-cream/10">
                <BookOpenText size={21} weight="duotone" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-jungle-mist">
                  Panduan PKKMB
                </p>
                <h1 className="font-heading text-2xl leading-none">Guidebook</h1>
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto p-3 lg:block lg:space-y-1 lg:overflow-visible">
            {sections.map((section, index) => {
              const Icon = SECTION_ICONS[index % SECTION_ICONS.length]
              const active = index === currentIndex
              const read = viewedIds.has(section.id)

              return (
                <div
                  key={section.id}
                  aria-current={active ? "step" : undefined}
                  className={`flex min-w-52 items-center gap-3 rounded-2xl px-3 py-3 transition-colors lg:min-w-0 ${
                    active ? "bg-sunlit-gold/20 text-jungle-deep" : "text-moss"
                  }`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${
                      active ? "bg-sunlit-gold text-jungle-deep" : "bg-fern-mist/45"
                    }`}
                  >
                    <Icon size={16} weight={active ? "fill" : "duotone"} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] text-moss/65">Bab {index + 1}</span>
                    <span className="block truncate text-xs font-semibold">{section.title}</span>
                  </span>
                  {read && (
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-jungle-deep text-warm-cream">
                      <Check size={11} weight="bold" />
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </motion.aside>

        <section className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-4 px-1">
            <div className="flex items-center gap-2 text-xs text-moss">
              <Compass size={16} weight="duotone" />
              <span>Bab {currentIndex + 1} dari {total}</span>
            </div>
            <span className="text-xs text-moss/70">{viewedIds.size} telah dibuka</span>
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-fern-mist/60">
            <motion.div
              className="h-full rounded-full bg-ember"
              initial={false}
              animate={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="guidebook-paper relative mt-4 min-h-120 overflow-hidden rounded-3xl border border-fern-mist/90 sm:min-h-136">
            <div className="absolute left-8 top-0 h-full w-px bg-ember/15 sm:left-12" />
            <AnimatePresence mode="wait" custom={direction}>
              <motion.article
                key={currentSection.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="relative px-5 py-7 pl-10 sm:px-12 sm:py-11 sm:pl-16"
              >
                <header className="mb-8 border-b border-jungle-deep/10 pb-7">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-jungle-deep text-warm-cream">
                      <CurrentIcon size={24} weight="duotone" />
                    </div>
                    <span className="font-heading text-5xl leading-none text-jungle-deep/12">
                      {String(currentIndex + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="max-w-2xl text-balance font-heading text-3xl leading-[1.04] text-jungle-deep sm:text-5xl">
                    {currentSection.title}
                  </h2>
                </header>

                <div className="space-y-4">
                  {currentSection.content.map((paragraph, index) => {
                    const isListItem = /^\s*(\d+[.)]|[-•])\s/.test(paragraph)

                    if (isListItem) {
                      return (
                        <div
                          key={`${currentSection.id}-${index}`}
                          className="flex items-start gap-3 rounded-2xl border border-fern-mist/75 bg-white/45 px-4 py-3"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ember" />
                          <p className="text-sm leading-relaxed text-moss sm:text-[0.95rem]">{paragraph}</p>
                        </div>
                      )
                    }

                    return (
                      <p
                        key={`${currentSection.id}-${index}`}
                        className={
                          index === 0
                            ? "font-heading text-xl leading-snug text-jungle-deep sm:text-2xl"
                            : "max-w-3xl text-sm leading-7 text-moss sm:text-[0.95rem]"
                        }
                      >
                        {paragraph}
                      </p>
                    )
                  })}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              variant="outline"
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="h-12 w-full rounded-full border-jungle-deep/15 bg-warm-cream/70 px-5 text-moss hover:bg-white sm:w-auto"
            >
              <ArrowLeft />
              Sebelumnya
            </Button>
            <Button
              onClick={goNext}
              className="h-12 w-full rounded-full bg-jungle-deep px-6 text-warm-cream hover:bg-moss sm:w-auto"
            >
              {isLastPage ? "Selesai membaca" : "Bab selanjutnya"}
              {isLastPage ? <Flag weight="fill" /> : <ArrowRight />}
            </Button>
          </div>
        </section>

        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.08 }}
          className="grid grid-cols-2 gap-3 lg:sticky lg:top-8 lg:grid-cols-1"
        >
          <div className="rounded-3xl bg-sunlit-gold p-5 text-jungle-deep">
            <Clock size={22} weight="duotone" />
            <p className="mt-6 font-heading text-3xl">{readingTime} menit</p>
            <p className="mt-1 text-xs leading-relaxed text-jungle-deep/70">Estimasi baca bab ini</p>
          </div>
          <div className="rounded-3xl bg-jungle-deep p-5 text-warm-cream">
            <BookOpenText size={22} weight="duotone" className="text-jungle-mist" />
            <p className="mt-6 font-heading text-3xl">{currentSection.content.length}</p>
            <p className="mt-1 text-xs leading-relaxed text-warm-cream/70">Catatan dalam bab</p>
          </div>
          <p className="col-span-2 px-2 text-xs leading-relaxed text-moss/70 lg:col-span-1">
            Progres tersimpan saat kamu berpindah bab. Buka seluruh bab untuk melanjutkan perjalanan.
          </p>
        </motion.aside>
      </div>
    </main>
  )
}
