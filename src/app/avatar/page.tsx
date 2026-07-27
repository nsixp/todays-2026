"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
import { getParticipantByNim } from "@/lib/data"
import type { AvatarId } from "@/types"
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="white" className="w-3 h-3">
      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
    </svg>
  )
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

  return (
    <div className="min-h-dvh flex flex-col justify-center bg-gradient-to-b from-warm-cream via-warm-cream to-fern-mist/20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-sunlit-gold/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-fern-mist/25 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-jungle-mist/10 blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-8 pb-1 px-6 relative z-10"
      >
        <h1 className="font-heading text-2xl sm:text-3xl text-jungle-deep">Pilih Karaktermu</h1>
        <p className="text-xs sm:text-sm text-moss font-sans mt-1">Hewan apa yang mewakili jiwamu?</p>
      </motion.div>

      <div className="px-6 py-5 relative z-10">
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-sm mx-auto">
          {AVATARS.map(({ id, label, Icon }, i) => {
            const isSelected = selected === id
            return (
              <motion.button
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => { setSelected(id); setError("") }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`relative flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-colors ${
                  isSelected
                    ? "border-sunlit-gold bg-sunlit-gold/10 shadow-[0_0_20px_-4px_rgba(243,196,107,0.4)]"
                    : "border-fern-mist bg-white/60 hover:border-sage hover:bg-white/80 hover:shadow-sm"
                }`}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full transition-colors ${
                    isSelected ? "bg-sunlit-gold/20" : "bg-fern-mist/30"
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 sm:w-9 sm:h-9 transition-transform duration-300 ${
                      isSelected ? "scale-110" : ""
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-sans font-medium transition-colors ${
                    isSelected ? "text-sunlit-gold" : "text-jungle-deep"
                  }`}
                >
                  {label}
                </span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-sunlit-gold rounded-full flex items-center justify-center shadow-md"
                    >
                      <CheckIcon />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="px-6 pb-5 pt-1 relative z-10"
      >
        <div className="max-w-sm mx-auto space-y-1.5">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Masukkan NIM kamu"
            value={nim}
            onChange={(e) => { setNim(e.target.value); setError("") }}
            className="w-full px-4 py-2.5 rounded-xl sm:rounded-2xl border-2 border-fern-mist bg-white/70 backdrop-blur-sm text-sm text-jungle-deep font-sans placeholder:text-sage/60 focus:border-sunlit-gold focus:outline-none transition-all focus:bg-white focus:shadow-[0_0_20px_-6px_rgba(243,196,107,0.3)]"
          />
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
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
            whileTap={selected ? { scale: 0.98 } : {}}
            className="w-full rounded-xl sm:rounded-2xl bg-jungle-deep text-warm-cream py-2.5 text-sm font-sans font-medium tracking-wide hover:bg-moss transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-jungle-deep/15"
          >
            Masuk ke Hutan
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
