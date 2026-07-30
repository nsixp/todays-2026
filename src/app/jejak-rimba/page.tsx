"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useJejakRimba } from "@/hooks/use-jejak-rimba"
import { useProgress } from "@/hooks/use-progress"
import JejakRimbaCard from "@/components/jejak-rimba-card"
import BackgroundFoliage from "@/components/background-foliage"
import DappledLight from "@/components/dappled-light"
import AmbientParticles from "@/components/ambient-particles"
import { CaretLeft } from "@phosphor-icons/react"

const LATAR_CONFIG: Record<string, { bg: string; overlay: string; label: string }> = {
  canopy: {
    bg: "from-jungle-deep/30 via-warm-cream to-sage/40",
    overlay: "bg-jungle-canopy/10",
    label: "Kanopi Hutan",
  },
  river: {
    bg: "from-blue-900/15 via-warm-cream to-sage/30",
    overlay: "bg-blue-900/5",
    label: "Sungai Rimba",
  },
  cave: {
    bg: "from-jungle-deep/60 via-jungle-deep/30 to-warm-cream",
    overlay: "bg-jungle-shadow/20",
    label: "Gua Misterius",
  },
  clearing: {
    bg: "from-sunlit-gold/20 via-warm-cream to-sage/30",
    overlay: "bg-sunlit-gold/5",
    label: "Padang Cahaya",
  },
  ruins: {
    bg: "from-jungle-deep/40 via-amber-900/15 to-warm-cream",
    overlay: "bg-jungle-deep/10",
    label: "Reruntuhan Kuno",
  },
}

const storyVariants = {
  enter: { opacity: 0, x: 80, filter: "blur(4px)" },
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -80, filter: "blur(4px)" },
}

function renderNarasiParagraphs(text: string) {
  return text.split("\n\n").filter(Boolean).map((p, i) => (
    <p key={i} className="text-sm sm:text-base text-jungle-deep font-sans leading-relaxed not-last:mb-3">
      {p}
    </p>
  ))
}

export default function JejakRimbaPage() {
  const router = useRouter()
  const { progress } = useProgress()
  const { currentNode, isEnding, canGoBack, pilih, goBack, reset } = useJejakRimba()
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
  const bgGradient = latarCfg.bg

  return (
    <div className="min-h-dvh bg-jungle-deep flex flex-col overflow-x-hidden">
      {/* ============ NARRATIVE (60%) ============ */}
      <div className={`relative flex-1 flex items-center justify-center bg-linear-to-b ${bgGradient} overflow-hidden`}>
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
              className="relative z-10 w-full max-w-lg mx-auto px-6"
            >
              {/* Step counter */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs sm:text-xs text-jungle-deep font-sans tracking-[0.15em] uppercase">
                  Langkah ke-{currentNode.id === "node-1" ? 1 : (currentNode.id.match(/\d+/)?.[0] ?? "?")}
                </span>
                <span className="flex-1 h-px bg-jungle-deep" />
                <span className="text-xs sm:text-xs text-jungle-deep font-sans">{latarCfg.label}</span>
              </div>

              {/* Narrative scroll/parchment */}
              <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-fern-mist/60 p-5 sm:p-6 shadow-lg">
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-linear-to-r from-sunlit-gold/40 via-sunlit-gold/20 to-transparent" />

                {canGoBack && (
                  <button
                    onClick={goBack}
                    className="mb-3 flex items-center gap-1.5 text-[10px] text-moss/60 font-sans tracking-wide uppercase hover:text-jungle-deep transition-colors"
                  >
                    <CaretLeft size={12} />
                    Kembali
                  </button>
                )}

                <div className="space-y-0.5">
                  {renderNarasiParagraphs(currentNode.narasi)}
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
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="w-12 h-12 rounded-full border-2 border-sunlit-gold/30 border-t-sunlit-gold"
              style={{ animation: "spin 1s linear infinite" }}
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
        <div className="relative h-[40dvh] bg-linear-to-t from-jungle-deep/15 via-jungle-deep/5 to-transparent border-t border-fern-mist/15 flex items-center justify-center overflow-x-auto px-4 sm:px-6">
          {/* Top glow */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-linear-to-b from-sunlit-gold/8 via-sunlit-gold/3 to-transparent pointer-events-none" />

          {/* Ground mist at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-jungle-deep/12 to-transparent pointer-events-none" />

          {/* Ambient glow behind cards */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full bg-sunlit-gold/5 blur-[60px] pointer-events-none" />

          {/* Leaf decor bottom corners */}
          <div className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none overflow-hidden opacity-[0.04]">
            <svg viewBox="0 0 100 100" fill="#1A3A2B" className="w-full h-full">
              <path d="M0 100C10 70 30 50 60 40s50-30 60-60L100 0v100H0Z" />
              <path d="M0 100C20 80 40 65 65 55s45-25 55-50L100 0v100H0Z" opacity="0.5" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none overflow-hidden opacity-[0.04] rotate-90">
            <svg viewBox="0 0 100 100" fill="#1A3A2B" className="w-full h-full">
              <path d="M0 100C10 70 30 50 60 40s50-30 60-60L100 0v100H0Z" />
              <path d="M0 100C20 80 40 65 65 55s45-25 55-50L100 0v100H0Z" opacity="0.5" />
            </svg>
          </div>

          <div className="relative flex items-end gap-3 sm:gap-4 pb-5 pt-3" style={{ perspective: "900px" }}>
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
      )}
    </div>
  )
}
