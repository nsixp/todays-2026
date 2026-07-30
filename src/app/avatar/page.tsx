"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
import { getParticipantByNim } from "@/lib/data"
import { EnvelopeIcon as Envelope } from "@phosphor-icons/react"
import type { AvatarId } from "@/types"
import BackgroundFoliage from "@/components/background-foliage"
import DappledLight from "@/components/dappled-light"
import Monyet from "@/components/icons/monyet"
import Burung from "@/components/icons/burung"
import Rusa from "@/components/icons/rusa"
import Harimau from "@/components/icons/harimau"
import KupuKupu from "@/components/icons/kupu-kupu"
import Ular from "@/components/icons/ular"

const AVATARS: { id: AvatarId; label: string; Icon: typeof Monyet }[] = [
  { id: "monyet", label: "Monyet", Icon: Monyet },
  { id: "burung", label: "Burung", Icon: Burung },
  { id: "rusa", label: "Rusa", Icon: Rusa },
  { id: "harimau", label: "Harimau", Icon: Harimau },
  { id: "kupu-kupu", label: "Kupu-Kupu", Icon: KupuKupu },
  { id: "ular", label: "Ular", Icon: Ular },
]

const AVATAR_COLORS: Record<AvatarId, string> = {
  monyet: "#8EA98D",
  burung: "#A3C4B5",
  rusa: "#C47A22",
  harimau: "#F3C46B",
  "kupu-kupu": "#4E7053",
  ular: "#6B9B6B",
}

const ANIMAL_GLOW: Record<AvatarId, string> = {
  monyet: "rgba(142,169,141,0.4)",
  burung: "rgba(163,196,181,0.4)",
  rusa: "rgba(196,122,34,0.4)",
  harimau: "rgba(243,196,107,0.4)",
  "kupu-kupu": "rgba(78,112,83,0.4)",
  ular: "rgba(107,155,107,0.4)",
}

export default function AvatarPage() {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const { save } = useProgress()
  const [nim, setNim] = useState("")
  const [error, setError] = useState("")
  const [nimDone, setNimDone] = useState(false)
  const [selected, setSelected] = useState<AvatarId | null>(null)
  const [participantName, setParticipantName] = useState("")

  function handleNimSubmit() {
    const trimmed = nim.trim()
    if (!trimmed) {
      setError("Masukkan NIM kamu")
      return
    }
    const participant = getParticipantByNim(trimmed)
    if (!participant) {
      setError("NIM tidak ditemukan")
      return
    }
    setParticipantName(participant.nama)
    setNimDone(true)
    setError("")
  }

  function handleAvatarSelect(id: AvatarId) {
    setSelected(id)
    const trimmed = nim.trim()
    const participant = getParticipantByNim(trimmed)
    if (participant) {
      save({ nim: trimmed, nama: participant.nama, avatar: id })
    }
    setTimeout(() => router.push("/hub"), 400)
  }

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden overflow-y-auto px-4 py-10">
      {!nimDone && <div className="absolute inset-0 bg-warm-cream pointer-events-none" />}
      {nimDone && <div className="absolute inset-0 bg-linear-to-b from-jungle-deep via-jungle-canopy to-moss pointer-events-none" />}

      {!nimDone && (
        <div className="absolute inset-0 pointer-events-none">
          <BackgroundFoliage variant="canopy-top" opacity={0.06} />
          <DappledLight count={3} color="#F3C46B" />
          <div className="absolute inset-0 bg-linear-to-b from-jungle-canopy/20 via-warm-cream to-warm-cream" />
        </div>
      )}
      {nimDone && (
        <div className="absolute inset-0 pointer-events-none">
          <BackgroundFoliage variant="vines-side" opacity={0.08} />
          <DappledLight count={4} color="#C4E6A1" />
          <div className="absolute inset-0 bg-linear-to-b from-moss/30 via-jungle-canopy/10 to-transparent" />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!nimDone ? (
          <motion.div
            key="nim"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-auto flex w-full max-w-sm flex-col items-center gap-6 px-2 sm:px-6"
          >
            <div className="text-center">
              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.1 }}
                className="font-heading text-4xl sm:text-5xl md:text-6xl text-jungle-deep leading-tight"
              >
                Siapa Kamu?
              </motion.h1>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.15 }}
                className="text-sm text-moss/80 font-sans mt-2"
              >
                Masukkan NIM untuk memulai petualangan
              </motion.p>
            </div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.25 }}
              className="w-full space-y-3"
            >
              <div className="relative">
                <label htmlFor="nim" className="sr-only">NIM</label>
                <Envelope size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sage/60 pointer-events-none" />
                <input
                  id="nim"
                  type="text"
                  inputMode="numeric"
                  placeholder="Masukkan NIM kamu"
                  value={nim}
                  onChange={(e) => { setNim(e.target.value); setError("") }}
                  onKeyDown={(e) => e.key === "Enter" && handleNimSubmit()}
                  className="min-h-12 w-full rounded-xl border-2 border-fern-mist bg-white/70 px-4 py-3 font-sans text-base text-jungle-deep backdrop-blur-sm transition-all duration-200 placeholder:text-sage/70 focus:border-sunlit-gold focus:bg-white focus:outline-none focus:shadow-[0_0_24px_-8px_rgba(243,196,107,0.35)]"
                  autoFocus
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: reduceMotion ? 0 : 0.22 }}
                    className="text-xs text-ember font-sans text-center"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                onClick={handleNimSubmit}
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                className="min-h-12 w-full rounded-xl bg-jungle-deep py-3 text-sm font-semibold tracking-wide text-warm-cream shadow-lg shadow-jungle-deep/20 transition-all duration-200 hover:bg-moss"
              >
                Lanjutkan
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="avatar"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center gap-6 px-0 sm:gap-8 sm:px-6"
          >
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.24 }}
                  className="text-center"
                >
                  <motion.p
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    className="text-xs text-warm-cream/50 font-sans tracking-wider uppercase mb-1"
                  >
                    Menuju ke hutan...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {!selected && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.4 }}
                className="text-center"
              >
                <p className="text-lg text-warm-cream/70 font-sans mb-1">
                  Halo, <span className="font-semibold text-warm-cream">{participantName}</span>
                </p>
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-warm-cream leading-tight">
                  Pilih Karaktermu
                </h1>
              </motion.div>
            )}

            {!selected && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.15 }}
                className="mx-auto grid w-full max-w-xs grid-cols-3 gap-x-3 gap-y-5 sm:gap-6"
              >
                {AVATARS.map(({ id, label, Icon }, i) => {
                  const color = AVATAR_COLORS[id]
                  const glow = ANIMAL_GLOW[id]
                  return (
                    <motion.button
                      key={id}
                      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.5,
                        delay: reduceMotion ? 0 : 0.15 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onClick={() => handleAvatarSelect(id)}
                      whileHover={reduceMotion ? undefined : { scale: 1.08, y: -6 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                      className="flex flex-col items-center gap-2 cursor-pointer group"
                    >
                      <div
                        className="relative flex size-18 items-center justify-center rounded-full transition-all duration-300 group-hover:shadow-xl min-[23rem]:size-20 sm:size-24"
                        style={{
                          background: `radial-gradient(circle at 35% 35%, ${color}25, ${color}08)`,
                          boxShadow: `0 4px 16px ${glow}15`,
                          border: `2px solid ${color}40`,
                        }}
                      >
                        <div
                          className="transition-all duration-300 group-hover:scale-110"
                          style={{
                            filter: `drop-shadow(0 2px 8px ${glow}20)`,
                          }}
                        >
                          <Icon className="w-10 h-10 sm:w-12 sm:h-12" />
                        </div>
                      </div>
                      <span
                        className="text-[11px] sm:text-xs font-sans font-medium text-warm-cream/80 group-hover:text-warm-cream transition-colors duration-200"
                      >
                        {label}
                      </span>
                    </motion.button>
                  )
                })}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
