"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
import AmbientParticles from "@/components/ambient-particles"
import { getParticipantByNim } from "@/lib/data"

export default function KelompokPage() {
  const router = useRouter()
  const { progress } = useProgress()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    if (!progress.quizDone) router.replace("/hub")
  }, [progress.quizDone, router])

  if (!mounted || !progress.quizDone) return null

  const participant = getParticipantByNim(progress.nim)

  return (
    <div className="relative min-h-dvh bg-linear-to-b from-warm-cream to-sage/20 px-6 py-8 overflow-hidden">
      <AmbientParticles count={3} colors={["#F5D590", "#A3C4B5"]} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-lg"
      >
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl text-jungle-deep">Kelompok PKKMB</h1>
          <p className="text-xs text-moss font-sans mt-1">Informasi kelompok kamu</p>
        </div>

        {participant ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/70 rounded-2xl border border-fern-mist p-6 space-y-5"
          >
            <div className="text-center pb-4 border-b border-fern-mist/50">
              <p className="text-xs text-moss font-sans mb-1">Nomor Kelompok</p>
              <p className="font-heading text-3xl text-sunlit-gold">{participant.nomor_kelompok}</p>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-moss font-sans mb-0.5">Nama Kelompok</p>
                <p className="text-sm font-medium text-jungle-deep font-sans">{participant.nama_kelompok}</p>
              </div>
              <div>
                <p className="text-xs text-moss font-sans mb-0.5">Mentor</p>
                <p className="text-sm font-medium text-jungle-deep font-sans">{participant.mentor}</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white/70 rounded-2xl border border-fern-mist p-6 text-center">
            <p className="text-sm text-moss font-sans">Data peserta tidak ditemukan. Hubungi panitia.</p>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/hub")}
            className="rounded-full bg-jungle-deep text-warm-cream px-8 py-3 text-sm font-sans font-medium tracking-wide hover:bg-moss transition-colors"
          >
            Kembali
          </button>
        </div>
      </motion.div>
    </div>
  )
}
