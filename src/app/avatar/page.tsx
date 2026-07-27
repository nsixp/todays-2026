"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
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
    <div className="min-h-dvh flex flex-col items-center justify-center bg-warm-cream px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm flex flex-col items-center gap-8"
      >
        <div className="text-center">
          <h1 className="font-heading text-2xl text-jungle-deep">Pilih Karaktermu</h1>
          <p className="text-xs text-moss font-sans mt-1">Hewan apa yang mewakili jiwamu?</p>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full">
          {AVATARS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { setSelected(id); setError("") }}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                selected === id
                  ? "border-sunlit-gold bg-sunlit-gold/10"
                  : "border-fern-mist hover:border-sage"
              }`}
            >
              <Icon className="w-10 h-10" />
              <span className="text-[10px] text-jungle-deep font-sans">{label}</span>
            </button>
          ))}
        </div>

        <div className="w-full space-y-3">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Masukkan NIM"
            value={nim}
            onChange={(e) => { setNim(e.target.value); setError("") }}
            className="w-full px-4 py-3 rounded-xl border-2 border-fern-mist bg-white text-sm text-jungle-deep font-sans placeholder:text-sage focus:border-sunlit-gold focus:outline-none transition-colors"
          />
          {error && (
            <p className="text-xs text-ember font-sans text-center">{error}</p>
          )}
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="w-full rounded-full bg-jungle-deep text-warm-cream py-3 text-sm font-sans font-medium tracking-wide hover:bg-moss transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Masuk ke Hutan
          </button>
        </div>
      </motion.div>
    </div>
  )
}
