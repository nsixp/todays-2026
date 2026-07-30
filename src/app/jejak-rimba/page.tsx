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
import { CardsThree, CaretLeft, CompassRose, MapPinArea, Path, Quotes } from "@phosphor-icons/react"

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

  return (
    <div className="min-h-dvh bg-jungle-deep flex flex-col overflow-x-hidden">
      {/* ============ NARRATIVE (60%) ============ */}
      <div
        className="story-stage relative flex flex-1 items-center justify-center overflow-hidden"
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
                <div className="absolute inset-y-0 left-0 w-1.5 bg-linear-to-b from-sunlit-gold via-ember/70 to-moss" />
                <div className="absolute -right-12 -top-12 size-40 rounded-full border border-jungle-deep/8" />
                <div className="absolute -right-6 -top-6 size-28 rounded-full border border-dashed border-jungle-deep/10" />

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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
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
      {transitionPhase === "ending" && currentNode.ending && (
        <motion.div
          key="ending-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden ${
            currentNode.ending.tier === "good"
              ? "bg-[radial-gradient(ellipse_at_40%_30%,#FDF3D6_0%,#F7E9C8_40%,#E8D4A8_70%,#D4BFA0_100%)]"
              : currentNode.ending.tier === "neutral"
                ? "bg-[radial-gradient(ellipse_at_50%_40%,#F0DCC0_0%,#DCC4A0_35%,#BFA07A_65%,#8B7355_100%)]"
                : "bg-[radial-gradient(ellipse_at_50%_30%,#1E2940_0%,#121A2E_35%,#0A0F1A_65%,#050810_100%)]"
          }`}
        >
          {/* Atmospheric elements per tier */}
          {currentNode.ending.tier === "good" && (
            <>
              {/* Golden glow layers */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-120 h-120 rounded-full bg-sunlit-gold/15 blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-300/10 blur-[80px]" />
                <div className="absolute top-1/3 left-1/2 w-96 h-64 rounded-full bg-yellow-200/8 blur-[90px]" />
              </div>
              {/* Golden sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                      left: `${12 + i * 14}%`,
                      top: `${20 + (i % 3) * 25}%`,
                      backgroundColor: "#F3C46B",
                      boxShadow: "0 0 4px 2px rgba(243,196,107,0.3)",
                    }}
                    animate={{ y: [0, -30 - i * 10], opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
                    transition={{ duration: 3 + i * 0.4, delay: i * 0.3, repeat: Infinity, ease: "easeOut" }}
                  />
                ))}
              </div>
              <DappledLight count={5} color="#F3C46B" />
              <AmbientParticles count={6} colors={["#F3C46B", "#F5D590", "#C47A22", "#FAE8A0"]} />
            </>
          )}
          {currentNode.ending.tier === "neutral" && (
            <>
              {/* Dusk glow layers */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-amber-500/12 blur-[90px]" />
                <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-amber-600/8 blur-[80px]" />
                <div className="absolute top-1/2 left-1/2 w-64 h-48 rounded-full bg-sage/10 blur-[70px]" />
              </div>
              {/* Floating ember particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${60 + (i % 2) * 15}%`,
                      width: `${2 + (i % 3)}px`,
                      height: `${2 + (i % 3)}px`,
                      backgroundColor: "#C47A22",
                      boxShadow: "0 0 3px 1px rgba(196,122,34,0.2)",
                    }}
                    animate={{
                      y: [0, -20 - i * 8, 0],
                      x: [0, i % 2 === 0 ? 8 : -8, 0],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{ duration: 4 + i * 0.5, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <AmbientParticles count={5} colors={["#C47A22", "#8EA98D", "#A0785A"]} />
            </>
          )}
          {currentNode.ending.tier === "hidden" && (
            <>
              {/* Mystical deep glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-indigo-500/12 blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-purple-400/10 blur-[80px]" />
                <div className="absolute top-1/2 left-1/2 w-64 h-48 rounded-full bg-blue-500/8 blur-[70px]" />
              </div>
              {/* Stars */}
              <div className="absolute inset-0 pointer-events-none">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      left: `${8 + i * 11}%`,
                      top: `${10 + (i % 4) * 20}%`,
                      width: `${1.5 + (i % 3)}px`,
                      height: `${1.5 + (i % 3)}px`,
                      backgroundColor: "#C4B5FD",
                      boxShadow: "0 0 4px 2px rgba(196,181,253,0.2)",
                    }}
                    animate={{ opacity: [0, 0.7, 0.1, 0], scale: [0, 1.2, 0.5, 0] }}
                    transition={{ duration: 4 + (i % 3) * 2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
              <BackgroundFoliage variant="canopy-top" opacity={0.08} />
              <BackgroundFoliage variant="vines-side" opacity={0.04} />
              <AmbientParticles count={6} colors={["#C4B5FD", "#A78BFA", "#818CF8", "#C084FC"]} />
            </>
          )}

          <div className="relative z-10 w-full max-w-lg mx-auto px-6 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 14 }}
              className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                currentNode.ending.tier === "good"
                  ? "bg-sunlit-gold/20 border-2 border-sunlit-gold/50"
                  : currentNode.ending.tier === "neutral"
                    ? "bg-amber-500/15 border-2 border-amber-500/40"
                    : "bg-purple-400/15 border-2 border-purple-400/40"
              }`}
            >
              {currentNode.ending.tier === "good" ? (
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-sunlit-gold">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" />
                </svg>
              ) : currentNode.ending.tier === "neutral" ? (
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-amber-500">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-purple-300">
                  <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.3" />
                  <path d="M17.657 6.343l-1.414 1.414M7.757 16.243l-1.414 1.414M17.657 17.657l-1.414-1.414M7.757 7.757L6.343 6.343" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              )}
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className={`inline-block text-[10px] font-sans tracking-[0.2em] uppercase mb-2 ${
                currentNode.ending.tier === "good"
                  ? "text-sunlit-gold/60"
                  : currentNode.ending.tier === "neutral"
                    ? "text-amber-600/60"
                    : "text-purple-300/60"
              }`}
            >
              {currentNode.ending.tier === "good" ? "Good Ending" : currentNode.ending.tier === "neutral" ? "Neutral Ending" : "Hidden Ending"}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`font-heading text-3xl sm:text-4xl mb-4 leading-tight ${
                currentNode.ending.tier === "good"
                  ? "text-jungle-deep"
                  : currentNode.ending.tier === "neutral"
                    ? "text-jungle-deep"
                    : "text-warm-cream"
              }`}
            >
              {currentNode.ending.title}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.65, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`h-px mx-auto mb-4 ${
                currentNode.ending.tier === "good"
                  ? "bg-sunlit-gold/30"
                  : currentNode.ending.tier === "neutral"
                    ? "bg-amber-500/25"
                    : "bg-purple-400/25"
              }`}
              style={{ width: "40%" }}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className={`text-sm font-sans leading-relaxed ${
                currentNode.ending.tier === "good" || currentNode.ending.tier === "neutral"
                  ? "text-moss"
                  : "text-warm-cream/70"
              }`}
            >
              {currentNode.ending.deskripsi}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-3 justify-center"
            >
              <button
                onClick={() => router.push("/hub")}
                className={`btn-jungle border-2 px-8 py-3 text-sm transition-all duration-300 ${
                  currentNode.ending.tier === "good" || currentNode.ending.tier === "neutral"
                    ? "border-jungle-deep/20 text-moss hover:bg-jungle-deep/5 hover:text-jungle-deep hover:border-jungle-deep/40"
                    : "border-warm-cream/20 text-warm-cream/60 hover:bg-warm-cream/5 hover:text-warm-cream hover:border-warm-cream/40"
                }`}
              >
                Kembali ke Jungle Hub
              </button>
              <button
                onClick={handleReset}
                className={`btn-jungle px-8 py-3 text-sm ${
                  currentNode.ending.tier === "good"
                    ? "bg-sunlit-gold text-jungle-deep hover:bg-ember shadow-lg shadow-sunlit-gold/20"
                    : currentNode.ending.tier === "neutral"
                      ? "bg-amber-600 text-warm-cream hover:bg-amber-700 shadow-lg shadow-amber-600/20"
                      : "bg-indigo-500 text-warm-cream hover:bg-indigo-600 shadow-lg shadow-indigo-500/20"
                }`}
              >
                Main Lagi
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* ============ CARD HAND (40%) ============ */}
      {transitionPhase === "playing" && (
        <div className="game-deck-surface relative flex h-[44dvh] min-h-72 max-h-100 flex-col overflow-hidden border-t border-jungle-mist/20">
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

          <div className="relative flex flex-1 items-end overflow-x-auto overflow-y-hidden px-4 sm:justify-center sm:px-6">
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
