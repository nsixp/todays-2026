"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
import Signpost from "@/components/signpost"
import Monyet from "@/components/icons/monyet"
import Burung from "@/components/icons/burung"
import Rusa from "@/components/icons/rusa"
import Harimau from "@/components/icons/harimau"
import KupuKupu from "@/components/icons/kupu-kupu"
import Ular from "@/components/icons/ular"
import type { AvatarId } from "@/types"

const AVATAR_ICONS: Record<AvatarId, typeof Monyet> = {
  monyet: Monyet,
  burung: Burung,
  rusa: Rusa,
  harimau: Harimau,
  "kupu-kupu": KupuKupu,
  ular: Ular,
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 7h8M8 11h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function PuzzleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path d="M19.5 12.5a3 3 0 0 0-3-3V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h2.5a3 3 0 0 0 6 0H18a2 2 0 0 0 2-2v-2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="12" r="1.5" fill="currentColor" />
    </svg>
  )
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 8 9 16l4-3 3-5Z" fill="currentColor" opacity="0.3" />
      <path d="m10 14 2-6 3 5-5 1Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function HubPage() {
  const router = useRouter()
  const { progress, save } = useProgress()
  const [easterClicks, setEasterClicks] = useState<Record<string, number>>({})
  const [easterModal, setEasterModal] = useState<{ label: string; href: string } | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const pagesRead = progress.pagesRead.length
  const guidebookDone = pagesRead >= 6
  const quizDone = progress.quizDone
  const AvatarIcon = AVATAR_ICONS[progress.avatar]

  function handleLockedClick(label: string, href: string) {
    const next = { ...easterClicks, [label]: (easterClicks[label] || 0) + 1 }
    setEasterClicks(next)
    if (next[label] >= 3) {
      const updatedEasterEggs = { ...progress.easterEggs, [label]: true }
      save({ easterEggs: updatedEasterEggs })
      setEasterModal({ label, href })
      setEasterClicks({})
    }
  }

  function handleEasterGo() {
    if (!easterModal) return
    router.push(easterModal.href)
    setEasterModal(null)
  }

  if (!mounted) {
    return (
      <div className="min-h-dvh bg-gradient-to-b from-warm-cream via-warm-cream to-sage/20 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-fern-mist border-t-jungle-deep animate-spin" />
      </div>
    )
  }

  const signposts = [
    { key: "guidebook", icon: <BookIcon />, label: "Guidebook", href: "/guidebook", locked: false, onLockedClick: undefined },
    { key: "quiz", icon: <PuzzleIcon />, label: "Quiz", href: "/quiz", locked: !guidebookDone && !progress.easterEggs["Quiz"], onLockedClick: () => handleLockedClick("Quiz", "/quiz") },
    { key: "kelompok", icon: <CompassIcon />, label: "Cari Kelompok", href: "/kelompok", locked: !quizDone && !progress.easterEggs["Cari Kelompok"], onLockedClick: () => handleLockedClick("Cari Kelompok", "/kelompok") },
  ]

  return (
    <div className="relative min-h-dvh bg-gradient-to-b from-warm-cream via-warm-cream to-sage/20 px-6 py-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-lg"
      >
        <div className="text-center mb-8">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs text-moss font-sans tracking-widest uppercase"
          >
            Hutan Rimba
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-heading text-2xl text-jungle-deep mt-1"
          >
            Selamat Datang, {progress.nama || "Pejuang Rimba"}
          </motion.h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 justify-items-center">
          {signposts.map((s, i) => (
            <div
              key={s.key}
              className={
                s.key === "kelompok"
                  ? "col-span-2 lg:col-span-1 row-start-3 lg:row-start-1"
                  : "col-span-1 row-start-1"
              }
            >
              <Signpost icon={s.icon} label={s.label} href={s.href} locked={s.locked} index={i} onLockedClick={s.onLockedClick} />
            </div>
          ))}

          <div className="col-span-2 lg:col-span-1 row-start-2 lg:row-start-2 lg:col-start-2 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              className="w-20 h-20 rounded-full bg-white/80 border-2 border-fern-mist flex items-center justify-center shadow-sm"
            >
              <AvatarIcon className="w-12 h-12" />
            </motion.div>
          </div>

          <div className="hidden lg:block col-span-3 -mt-2 h-px border-t border-dashed border-fern-mist/60 row-start-2 self-end" />
          <div className="hidden lg:block col-start-2 w-px h-4 border-l border-dashed border-fern-mist/60 row-start-2 justify-self-center" />
        </div>
      </motion.div>

      <AnimatePresence>
        {easterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-jungle-deep/40 px-6"
            onClick={() => setEasterModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-warm-cream rounded-2xl p-8 max-w-sm text-center shadow-xl border border-sunlit-gold/30"
            >
              <div className="mb-3 flex justify-center">
                <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-moss">
                  <path d="M16 4C16 4 8 12 8 18a8 8 0 0 0 16 0c0-6-8-14-8-14Z" fill="currentColor" opacity="0.3" />
                  <path d="M16 4C16 4 8 12 8 18a8 8 0 0 0 16 0c0-6-8-14-8-14Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M16 18v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="font-heading text-xl text-jungle-deep mb-2">
                Jalur Rahasia Terbuka!
              </h2>
              <p className="text-sm text-moss font-sans leading-relaxed mb-6">
                Kamu menemukan jalan rahasia di balik dedaunan... <span className="font-medium text-jungle-deep">{easterModal.label}</span> telah terbuka!
              </p>
              <button
                onClick={handleEasterGo}
                className="rounded-full bg-sunlit-gold text-jungle-deep px-6 py-2 text-sm font-sans font-medium hover:bg-ember hover:text-warm-cream transition-colors"
              >
                Masuk
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}