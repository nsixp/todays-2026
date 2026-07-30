"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useJejakRimba } from "@/hooks/use-jejak-rimba"
import { useProgress } from "@/hooks/use-progress"
import JejakRimbaCard from "@/components/jejak-rimba-card"
import BackgroundFoliage from "@/components/background-foliage"
import DappledLight from "@/components/dappled-light"
import AmbientParticles from "@/components/ambient-particles"
import {
  ArrowCounterClockwiseIcon as ArrowCounterClockwise,
  CardsThreeIcon as CardsThree,
  CaretLeftIcon as CaretLeft,
  CompassRoseIcon as CompassRose,
  FootprintsIcon as Footprints,
  HouseLineIcon as HouseLine,
  MapPinAreaIcon as MapPinArea,
  PathIcon as Path,
  QuotesIcon as Quotes,
  SparkleIcon as Sparkle,
  SunHorizonIcon as SunHorizon,
} from "@phosphor-icons/react"

const LATAR_CONFIG: Record<string, { overlay: string; label: string }> = {
  canopy: {
    overlay: "bg-jungle-canopy/10",
    label: "Kanopi Hutan",
  },
  river: {
    overlay: "bg-blue-900/5",
    label: "Sungai Rimba",
  },
  cave: {
    overlay: "bg-jungle-shadow/20",
    label: "Gua Misterius",
  },
  clearing: {
    overlay: "bg-sunlit-gold/5",
    label: "Padang Cahaya",
  },
  ruins: {
    overlay: "bg-jungle-deep/10",
    label: "Reruntuhan Kuno",
  },
}

const ENDING_CONFIG = {
  good: {
    label: "Akhir Gemilang",
    caption: "Kamu menemukan jalan menuju padang cahaya.",
    Icon: SunHorizon,
    shell: "bg-[#DDE1C3]",
    panel: "border-jungle-deep/10 bg-jungle-deep text-warm-cream",
    iconWrap: "border-sunlit-gold/35 bg-sunlit-gold text-jungle-deep",
    labelClass: "text-sunlit-gold",
    titleClass: "text-warm-cream",
    bodyClass: "text-warm-cream/72",
    statClass: "border-warm-cream/12 bg-warm-cream/5",
    secondaryButton:
      "border-warm-cream/20 bg-transparent text-warm-cream hover:border-warm-cream/40 hover:bg-warm-cream/8",
    primaryButton: "bg-sunlit-gold text-jungle-deep hover:bg-[#E9B64F]",
  },
  neutral: {
    label: "Akhir Teduh",
    caption: "Perjalanan selesai di jalur senja yang tenang.",
    Icon: Path,
    shell: "bg-[#454B36]",
    panel: "border-[#C9B58F]/60 bg-[#F1E6D2] text-[#243326]",
    iconWrap: "border-[#704B2E]/20 bg-[#704B2E] text-[#FFF4DF]",
    labelClass: "text-[#704B2E]",
    titleClass: "text-[#243326]",
    bodyClass: "text-[#435543]",
    statClass: "border-[#243326]/12 bg-[#243326]/5",
    secondaryButton:
      "border-[#243326]/18 bg-transparent text-[#344936] hover:border-[#243326]/35 hover:bg-[#243326]/6",
    primaryButton: "bg-[#704B2E] text-[#FFF4DF] hover:bg-[#593C27]",
  },
  hidden: {
    label: "Akhir Tersembunyi",
    caption: "Kamu membuka rahasia yang tidak ditemukan semua penjelajah.",
    Icon: Sparkle,
    shell: "bg-[#07131C]",
    panel: "border-[#9C8AD0]/35 bg-[#101F2B] text-[#FFF8E9]",
    iconWrap: "border-[#B9A7EF]/35 bg-[#B9A7EF] text-[#101625]",
    labelClass: "text-[#CDBFFD]",
    titleClass: "text-[#FFF8E9]",
    bodyClass: "text-[#E6E1D7]/75",
    statClass: "border-[#CDBFFD]/18 bg-[#CDBFFD]/7",
    secondaryButton:
      "border-[#E6E1D7]/20 bg-transparent text-[#F7F0E4] hover:border-[#E6E1D7]/40 hover:bg-[#E6E1D7]/7",
    primaryButton: "bg-[#CDBFFD] text-[#101625] hover:bg-[#B9A7EF]",
  },
} as const

const storyVariants = {
  enter: { opacity: 0, x: 80, filter: "blur(4px)" },
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -80, filter: "blur(4px)" },
}

function renderNarrativeText(text: string) {
  return text.split(/('[^']+')/g).map((part, index) =>
    part.startsWith("'") && part.endsWith("'") ? (
      <em key={`${part}-${index}`} className="font-heading text-[1.08em] not-italic text-jungle-deep">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    )
  )
}

function renderNarasiParagraphs(text: string) {
  const paragraphs = text.split("\n\n").filter(Boolean)

  return paragraphs.map((paragraph, index) => {
    const isOpening = index === 0
    const isDecision = index === paragraphs.length - 1 && paragraph.trim().endsWith("?")
    const containsVoice = paragraph.includes("'")

    if (isDecision) {
      return (
        <div
          key={`${paragraph}-${index}`}
          className="mt-5 flex items-start gap-3 rounded-xl border border-sunlit-gold/35 bg-sunlit-gold/10 px-4 py-3"
        >
          <CompassRose className="mt-0.5 size-5 shrink-0 text-ember" weight="duotone" />
          <p className="font-heading text-lg leading-snug text-jungle-deep">
            {renderNarrativeText(paragraph)}
          </p>
        </div>
      )
    }

    return (
      <p
        key={`${paragraph}-${index}`}
        className={
          isOpening
            ? "font-heading text-xl leading-[1.38] text-jungle-deep sm:text-2xl"
            : containsVoice
              ? "border-l-2 border-sunlit-gold/55 pl-4 font-sans text-sm leading-relaxed text-moss sm:text-base"
              : "font-sans text-sm leading-relaxed text-moss sm:text-base"
        }
      >
        {renderNarrativeText(paragraph)}
      </p>
    )
  })
}

export default function JejakRimbaPage() {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const { progress } = useProgress()
  const { state, currentNode, isEnding, canGoBack, pilih, goBack, reset } = useJejakRimba()
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [narrativeKey, setNarrativeKey] = useState(0)
  const [showEnding, setShowEnding] = useState(false)

  const transitionPhase: "playing" | "transitioning" | "ending" =
    !isEnding ? "playing" : showEnding ? "ending" : "transitioning"

  useEffect(() => {
    if (isEnding) {
      const t = setTimeout(() => setShowEnding(true), 700)
      return () => clearTimeout(t)
    }
  }, [isEnding])

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
    setShowEnding(false)
  }

  const latar = currentNode.latar ?? "canopy"
  const latarCfg = LATAR_CONFIG[latar]
  const endingCfg = currentNode.ending ? ENDING_CONFIG[currentNode.ending.tier] : null

  return (
    <div className="min-h-dvh bg-jungle-deep flex flex-col overflow-x-hidden">
      {/* ============ NARRATIVE (60%) ============ */}
      <div
        className="story-stage relative flex min-h-88 flex-1 items-center justify-center overflow-x-hidden overflow-y-auto sm:min-h-96"
        data-latar={latar}
      >
        {/* Decorative overlays */}
        <div className={`absolute inset-0 pointer-events-none ${latarCfg.overlay}`} />
        <BackgroundFoliage variant="canopy-top" opacity={0.06} />
        <BackgroundFoliage variant="vines-side" opacity={0.03} />
        {latar === "canopy" && (
          <>
            <DappledLight count={3} color="#F5D590" />
            <AmbientParticles count={3} colors={["#8EA98D", "#A3C4B5", "#F5D590"]} />
          </>
        )}
        {latar === "clearing" && <DappledLight count={5} color="#F3C46B" />}
        {latar === "river" && <AmbientParticles count={4} colors={["#60A5FA", "#93C5FD", "#7DD3FC"]} />}
        {latar === "cave" && (
          <>
            <div className="absolute inset-0 bg-jungle-shadow/40 pointer-events-none" />
            <AmbientParticles count={3} colors={["#4E7053", "#1A3A2B", "#8EA98D"]} />
          </>
        )}
        {latar === "ruins" && (
          <>
            <DappledLight count={3} color="#F5D590" />
            <AmbientParticles count={3} colors={["#C47A22", "#8EA98D", "#D5D7C8"]} />
          </>
        )}

        {/* Ground mist */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-jungle-deep/8 to-transparent pointer-events-none" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(15,36,26,0.35)_100%)] pointer-events-none" />

        <AmbientParticles count={5} colors={["#F5D590", "#F3C46B"]} />

        {transitionPhase === "playing" && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`narasi-${narrativeKey}`}
              variants={storyVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 mx-auto w-full max-w-2xl px-4 py-8 sm:px-6"
            >
              <div className="narrative-journal relative overflow-hidden rounded-[1.75rem] border border-warm-cream/70">
                <header className="relative flex items-center justify-between gap-4 border-b border-jungle-deep/10 px-5 py-4 sm:px-7">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full border border-jungle-deep/15 bg-jungle-deep/5 text-jungle-deep">
                      <CompassRose size={22} weight="duotone" />
                    </div>
                    <div>
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-moss">
                        Catatan perjalanan
                      </p>
                      <p className="font-heading text-lg leading-tight text-jungle-deep">{latarCfg.label}</p>
                    </div>
                  </div>
                  <span className="font-heading text-3xl leading-none text-jungle-deep/20">
                    {String(state.history.length + 1).padStart(2, "0")}
                  </span>
                </header>

                <div className="relative px-5 py-5 sm:px-7 sm:py-6">
                  {canGoBack && (
                    <button
                      onClick={goBack}
                      className="mb-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-moss transition-colors hover:text-jungle-deep"
                    >
                      <CaretLeft size={12} />
                      Langkah sebelumnya
                    </button>
                  )}

                  <div className="space-y-4">
                    {renderNarasiParagraphs(currentNode.narasi)}
                  </div>

                  <div className="mt-5 flex items-center gap-2 border-t border-jungle-deep/10 pt-3 text-[10px] text-moss/70">
                    <Quotes size={15} weight="duotone" />
                    <span>Pilih kartu di bawah untuk menentukan kelanjutan kisah.</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Transition overlay */}
      <AnimatePresence>
        {transitionPhase === "transitioning" && (
          <motion.div
            key="transition-overlay"
            className="fixed inset-0 z-50 bg-jungle-shadow flex items-center justify-center pointer-events-none"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeInOut" }}
          >
            <motion.div
              initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
              animate={reduceMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1, rotate: 360 }}
              transition={reduceMotion
                ? { duration: 0 }
                : { delay: 0.15, duration: 1, rotate: { repeat: Infinity, ease: "linear" } }
              }
              className="w-12 h-12 rounded-full border-2 border-sunlit-gold/30 border-t-sunlit-gold"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ ENDING SCREEN ============ */}
      {transitionPhase === "ending" && currentNode.ending && endingCfg && (
        <motion.div
          key="ending-screen"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
          className={`fixed inset-0 z-40 flex items-start justify-center overflow-y-auto px-4 py-[max(2rem,env(safe-area-inset-top))] sm:px-6 ${endingCfg.shell}`}
        >
          {currentNode.ending.tier === "good" && (
            <>
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 -top-72 size-168 -translate-x-1/2 rounded-full bg-sunlit-gold/55 blur-3xl" />
                <div className="absolute left-1/2 -top-52 size-136 -translate-x-1/2 rounded-full border border-jungle-deep/10" />
                <div className="absolute left-1/2 -top-32 size-96 -translate-x-1/2 rounded-full border border-jungle-deep/10" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(175deg,transparent_34%,rgba(45,90,58,0.15)_35%,rgba(45,90,58,0.15)_55%,rgba(26,58,43,0.16)_56%)]" />
              </div>
              <DappledLight count={4} color="#F3C46B" />
              <AmbientParticles count={5} colors={["#F3C46B", "#F5D590", "#8EA98D"]} />
            </>
          )}

          {currentNode.ending.tier === "neutral" && (
            <>
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(243,196,107,0.32),transparent_64%)]" />
                <div className="absolute -bottom-52 left-1/2 h-136 w-36 -translate-x-1/2 rotate-6 rounded-[50%] border-x border-[#D8C49C]/25" />
                <div className="absolute -bottom-52 left-1/2 h-136 w-72 -translate-x-1/2 rotate-6 rounded-[50%] border-x border-[#D8C49C]/12" />
                <div className="absolute left-[12%] top-[18%] h-24 w-px bg-[#D8C49C]/18" />
                <div className="absolute right-[12%] top-[28%] h-36 w-px bg-[#D8C49C]/18" />
              </div>
              <AmbientParticles count={4} colors={["#D8C49C", "#C47A22", "#8EA98D"]} />
            </>
          )}

          {currentNode.ending.tier === "hidden" && (
            <>
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 size-136 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#CDBFFD]/9" />
                <div className="absolute left-1/2 top-1/2 size-100 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#CDBFFD]/12" />
                <div className="absolute left-1/2 top-1/2 size-68 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#CDBFFD]/16" />
                <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7159A8]/18 blur-3xl" />
              </div>
              <BackgroundFoliage variant="canopy-top" opacity={0.08} />
              <AmbientParticles count={5} colors={["#CDBFFD", "#9C8AD0", "#818CF8"]} />
            </>
          )}

          <motion.section
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 my-auto grid w-full max-w-4xl overflow-hidden rounded-4xl border shadow-2xl shadow-black/20 md:grid-cols-[16rem_minmax(0,1fr)] ${endingCfg.panel}`}
          >
            <aside className="flex flex-col justify-between border-b border-current/10 p-6 md:border-b-0 md:border-r md:p-8">
              <motion.div
                initial={reduceMotion ? false : { scale: 0.7, rotate: -18 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { delay: 0.28, type: "spring", stiffness: 120, damping: 14 }
                }
                className={`flex size-20 items-center justify-center rounded-3xl border ${endingCfg.iconWrap}`}
              >
                <endingCfg.Icon size={39} weight="duotone" />
              </motion.div>

              <div className="mt-12 grid grid-cols-2 gap-2 md:mt-20 md:grid-cols-1">
                <div className={`rounded-2xl border p-4 ${endingCfg.statClass}`}>
                  <Footprints size={18} weight="duotone" />
                  <p className="mt-4 font-heading text-3xl">{state.history.length}</p>
                  <p className="text-[10px] opacity-65">Langkah ditempuh</p>
                </div>
                <div className={`rounded-2xl border p-4 ${endingCfg.statClass}`}>
                  <CompassRose size={18} weight="duotone" />
                  <p className="mt-4 font-heading text-xl">Selesai</p>
                  <p className="text-[10px] opacity-65">Status perjalanan</p>
                </div>
              </div>
            </aside>

            <div className="flex flex-col justify-center p-6 sm:p-9 md:p-12">
              <p className={`text-xs font-semibold ${endingCfg.labelClass}`}>{endingCfg.label}</p>
              <h2 className={`mt-3 text-balance font-heading text-4xl leading-[1.02] sm:text-5xl ${endingCfg.titleClass}`}>
                {currentNode.ending.title}
              </h2>
              <p className={`mt-5 max-w-xl text-sm leading-7 ${endingCfg.bodyClass}`}>
                {currentNode.ending.deskripsi}
              </p>

              <div className={`mt-7 flex items-start gap-3 rounded-2xl border p-4 ${endingCfg.statClass}`}>
                <Quotes size={19} weight="duotone" className="mt-0.5 shrink-0" />
                <p className="text-xs leading-6 opacity-75">{endingCfg.caption}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => router.push("/hub")}
                  className={`btn-jungle inline-flex min-h-12 items-center justify-center gap-2 border px-6 text-sm ${endingCfg.secondaryButton}`}
                >
                  <HouseLine size={18} weight="duotone" />
                  Kembali ke Jungle Hub
                </button>
                <button
                  onClick={handleReset}
                  className={`btn-jungle inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm ${endingCfg.primaryButton}`}
                >
                  <ArrowCounterClockwise size={18} weight="bold" />
                  Main Lagi
                </button>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}

      {/* ============ CARD HAND (40%) ============ */}
      {transitionPhase === "playing" && (
        <div className="game-deck-surface relative flex h-[46dvh] min-h-72 max-h-100 flex-col overflow-hidden border-t border-jungle-mist/20">
          <div className="relative z-20 mx-auto flex h-14 w-full max-w-6xl shrink-0 items-center justify-between border-b border-warm-cream/10 px-4 sm:px-6">
            <div className="flex items-center gap-2 text-warm-cream">
              <CardsThree size={19} weight="duotone" className="text-sunlit-gold" />
              <span className="text-xs font-semibold tracking-[0.12em]">Pilih langkah</span>
            </div>
            <div className="hidden items-center gap-2 text-warm-cream/55 sm:flex">
              <MapPinArea size={15} />
              <span className="text-xs">{latarCfg.label}</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-warm-cream/55">
              <span className="hidden items-center gap-1.5 sm:flex">
                <Path size={14} />
                Jejak {state.history.length + 1}
              </span>
              <span className="rounded-full border border-warm-cream/15 bg-warm-cream/5 px-2.5 py-1 text-warm-cream/75">
                {currentNode.pilihan.length} pilihan
              </span>
            </div>
          </div>

          <div className="relative flex flex-1 snap-x snap-proximity scroll-px-4 items-end overflow-x-auto overflow-y-hidden px-4 sm:justify-center sm:px-6">
            <div className="pointer-events-none absolute inset-x-[8%] bottom-5 h-16 rounded-[50%] border border-sunlit-gold/10 bg-jungle-shadow/25" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-28 w-80 -translate-x-1/2 rounded-full bg-sunlit-gold/8 blur-[55px]" />

            <div
              className="relative flex min-w-max items-end gap-3 pb-6 pt-4 sm:gap-4"
              style={{ perspective: "1000px" }}
              role="group"
              aria-label="Pilihan langkah petualangan"
            >
              <AnimatePresence mode="popLayout">
                {currentNode.pilihan.map((p, i) => (
                  <JejakRimbaCard
                    key={`${narrativeKey}-${p.nextId}`}
                    pilihan={p}
                    index={i}
                    total={currentNode.pilihan.length}
                    onSelect={() => handleSelect(p.nextId)}
                    disabled={selectedCard !== null}
                    selected={selectedCard === p.nextId}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
