"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
import { getParticipantByNim } from "@/lib/data"
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
  ular: "#2D5A3A",
}

const ANIMAL_GLOW: Record<AvatarId, string> = {
  monyet: "rgba(142,169,141,0.4)",
  burung: "rgba(163,196,181,0.4)",
  rusa: "rgba(196,122,34,0.4)",
  harimau: "rgba(243,196,107,0.4)",
  "kupu-kupu": "rgba(78,112,83,0.4)",
  ular: "rgba(45,90,58,0.4)",
}

export default function AvatarPage() {
  const router = useRouter()
  const { save } = useProgress()
  const [selected, setSelected] = useState<AvatarId | null>(null)
  const [nim, setNim] = useState("")
  const [error, setError] = useState("")

  function handleSubmit() {
    if (!selected) return
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
    save({ nim: trimmed, nama: participant.nama, avatar: selected })
    router.push("/hub")
  }

  const grid = (
    <div className="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto">
      {AVATARS.map(({ id, label, Icon }, i) => {
        const isSelected = selected === id
        const color = AVATAR_COLORS[id]
        const glow = ANIMAL_GLOW[id]
        return (
          <motion.button
            key={id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => { setSelected(id); setError("") }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 cursor-pointer transition-all duration-200"
            style={{
              borderColor: isSelected ? color : "#D5D7C8",
              background: isSelected
                ? `linear-gradient(180deg, ${color}18, ${color}08)`
                : "rgba(255,255,255,0.6)",
              boxShadow: isSelected
                ? `0 0 30px -8px ${glow}`
                : "none",
            }}
          >
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                background: isSelected
                  ? `radial-gradient(circle at 35% 35%, ${color}30, ${color}10)`
                  : "#D5D7C830",
                boxShadow: isSelected
                  ? `inset 0 0 20px -4px ${glow}`
                  : "none",
                transform: isSelected ? "scale(1.08)" : "scale(1)",
              }}
            >
              <div
                className="transition-all duration-300"
                style={{
                  filter: isSelected ? `drop-shadow(0 0 6px ${glow})` : "none",
                  transform: isSelected ? "scale(1.1)" : "scale(1)",
                }}
              >
                <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            </div>
            <span
              className="text-[11px] sm:text-xs font-sans font-semibold transition-colors duration-200"
              style={{ color: isSelected ? color : "#1A3A2B" }}
            >
              {label}
            </span>
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="absolute -top-1.5 -right-1.5 w-5.5 h-5.5 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: color }}
                >
                  <svg viewBox="0 0 16 16" fill="white" className="w-3 h-3">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )

  const selectedIcon = selected ? AVATARS.find(a => a.id === selected) : null
  const SelectedIcon = selectedIcon?.Icon ?? null

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-linear-to-b from-warm-cream via-warm-cream to-fern-mist/20 overflow-hidden relative">
      <BackgroundFoliage variant="canopy-top" opacity={0.06} />
      <DappledLight count={3} color="#F3C46B" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm mx-auto px-6 pt-10 pb-8 relative z-10 flex flex-col items-center gap-6"
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl text-jungle-deep leading-tight"
          >
            Pilih Karaktermu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-sm text-moss/80 font-sans mt-1.5"
          >
            Hewan apa yang mewakili jiwamu?
          </motion.p>
        </div>

        {grid}

        <AnimatePresence mode="wait">
          {selected && SelectedIcon && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-[10px] text-moss/60 font-sans tracking-wider uppercase mb-1"
              >
                Karaktermu
              </motion.p>
              <div className="flex items-center gap-2 justify-center">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${AVATAR_COLORS[selected]}20` }}
                >
                  <SelectedIcon className="w-4 h-4" />
                </div>
                <span className="text-sm font-sans font-medium text-jungle-deep">
                  {selectedIcon!.label}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full max-w-xs space-y-3"
        >
          <div className="relative">
            <svg viewBox="0 0 16 16" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sage/60 pointer-events-none">
              <rect x="1.5" y="3.5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M1.5 6L8 9.5L14.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Masukkan NIM kamu"
              value={nim}
              onChange={(e) => { setNim(e.target.value); setError("") }}
              className="w-full pl-4.5 pr-4 py-2.5 rounded-xl border-2 border-fern-mist bg-white/70 backdrop-blur-sm text-sm text-jungle-deep font-sans placeholder:text-sage/50 focus:border-sunlit-gold focus:outline-none transition-all duration-200 focus:bg-white focus:shadow-[0_0_24px_-8px_rgba(243,196,107,0.35)]"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                className="text-xs text-ember font-sans text-center"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleSubmit}
            disabled={!selected}
            whileHover={selected ? { scale: 1.02 } : {}}
            whileTap={selected ? { scale: 0.97 } : {}}
            className="w-full rounded-xl bg-jungle-deep text-warm-cream py-3 text-sm font-sans font-semibold tracking-wide transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed shadow-lg shadow-jungle-deep/15"
            style={selected ? {
              boxShadow: `0 4px 20px -4px ${ANIMAL_GLOW[selected as AvatarId] || "rgba(243,196,107,0.4)"}`,
            } : {}}
          >
            Masuk ke Hutan
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
