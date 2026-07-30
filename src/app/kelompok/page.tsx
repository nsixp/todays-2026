"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
import AmbientParticles from "@/components/ambient-particles"
import { getParticipantByNim, getKelompok, getParticipants } from "@/lib/data"
import { UsersThree, User, WhatsappLogo } from "@phosphor-icons/react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ForestLeaf = ({ className, color }: { className: string; color: string }) => (
  <svg viewBox="0 0 60 60" fill="none" className={className}>
    <path d="M30 5C20 15 8 30 8 45c0 8 6 12 12 12 6 0 10-4 10-4s4 4 10 4c6 0 12-4 12-12 0-15-12-30-22-40Z" fill={color} />
    <path d="M30 8l-1 6M30 8l1 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
  </svg>
)

const ForestBranch = ({ className }: { className: string }) => (
  <svg viewBox="0 0 120 8" fill="none" className={className}>
    <path d="M0 4h120" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M30 4l-8 -3M50 4l-6 3M70 4l-8 -3M90 4l-6 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

export default function KelompokPage() {
  const router = useRouter()
  const { progress } = useProgress()
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!progress.quizDone) router.replace("/hub")
  }, [progress.quizDone, router])

  if (!progress.quizDone) return null

  const participant = getParticipantByNim(progress.nim)
  const kelompokInfo = participant ? getKelompok().find((k) => k.nomor_kelompok === participant.nomor_kelompok) : null
  const anggota = participant ? getParticipants().filter((p) => p.nomor_kelompok === participant.nomor_kelompok) : []

  if (!started) {
    return (
      <div className="relative w-full min-h-dvh overflow-x-hidden bg-linear-to-b from-warm-cream to-sage/20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <div className="w-16 h-16 rounded-2xl bg-fern-mist/40 flex items-center justify-center mx-auto mb-6">
            <UsersThree size={32} className="text-jungle-deep" />
          </div>
          <h1 className="font-heading text-3xl text-jungle-deep mb-3 leading-tight">
            Informasi Kelompok
          </h1>
          <p className="text-sm font-sans text-moss leading-relaxed mb-6">
            Lihat informasi kelompok PKKMB kamu, kenali mentor dan teman-teman sekelompokmu,
            serta temukan tautan grup WhatsApp untuk berkomunikasi.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="rounded-full bg-sunlit-gold text-jungle-deep px-10 py-3.5 text-sm font-sans font-medium tracking-wide hover:bg-ember hover:text-warm-cream transition-colors shadow-sm"
          >
            Lihat Kelompok Saya
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative w-full min-h-dvh overflow-x-hidden bg-linear-to-b from-warm-cream to-sage/20 px-4 sm:px-6 lg:px-8 py-8">
      <AmbientParticles count={3} colors={["#F5D590", "#A3C4B5"]} />

      <ForestLeaf
        className="absolute top-12 left-2 w-10 h-10 text-moss/8"
        color="currentColor"
      />
      <ForestLeaf
        className="absolute bottom-32 right-1 w-14 h-14 text-jungle-deep/6 rotate-45"
        color="currentColor"
      />
      <ForestLeaf
        className="absolute top-1/3 right-2 w-8 h-8 text-sage/10 -rotate-12"
        color="currentColor"
      />
      <ForestBranch className="absolute top-6 left-0 w-24 h-2 text-moss/6" />

      <div className="mx-auto max-w-lg">
        {participant && kelompokInfo ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <p className="text-xs font-sans text-moss uppercase tracking-[0.15em] mb-1">
                Kelompok {kelompokInfo.nomor_kelompok}
              </p>
              <h1 className="font-heading text-4xl text-jungle-deep leading-tight">
                {kelompokInfo.nama_kelompok}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="bg-white/70 rounded-2xl border border-fern-mist p-6 mb-4"
            >
              <p className="text-sm font-sans text-moss leading-relaxed italic">
                &ldquo;{kelompokInfo.deskripsi}&rdquo;
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="grid grid-cols-2 gap-3 mb-4"
            >
              <div className="bg-white/70 rounded-2xl border border-fern-mist p-5 text-center">
                <p className="text-[11px] font-sans text-moss mb-1">Anggota</p>
                <p className="font-heading text-2xl text-jungle-deep">{anggota.length} Orang</p>
              </div>
              <div className="bg-white/70 rounded-2xl border border-fern-mist p-5 text-center">
                <p className="text-[11px] font-sans text-moss mb-1">Nomor Kelompok</p>
                <p className="font-heading text-2xl text-sunlit-gold">{kelompokInfo.nomor_kelompok}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="bg-white/70 rounded-2xl border border-fern-mist p-6 mb-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sunlit-gold/20 flex items-center justify-center shrink-0">
                  <User size={16} className="text-sunlit-gold" />
                </div>
                <div>
                  <p className="text-[11px] font-sans text-moss">Mentor</p>
                  <p className="text-sm font-semibold text-jungle-deep font-sans">{kelompokInfo.mentor}</p>
                  <p className="text-xs font-sans text-moss/70">{kelompokInfo.prodi_mentor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-fern-mist/50">
                <div className="w-9 h-9 rounded-full bg-fern-mist/30 flex items-center justify-center shrink-0">
                  <User size={16} className="text-jungle-deep" />
                </div>
                <div>
                  <p className="text-[11px] font-sans text-moss">Kamu</p>
                  <p className="text-sm font-semibold text-jungle-deep font-sans">{participant.nama}</p>
                  <p className="text-xs font-sans text-moss/70">{participant.prodi}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/70 rounded-2xl border border-fern-mist p-6 mb-4"
            >
              <h2 className="font-heading text-lg text-jungle-deep mb-3">
                Anggota Kelompok
              </h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-moss text-[11px] font-sans w-8">No</TableHead>
                    <TableHead className="text-moss text-[11px] font-sans">Nama</TableHead>
                    <TableHead className="text-moss text-[11px] font-sans text-right">Prodi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {anggota.map((a, i) => (
                    <TableRow key={a.nim}>
                      <TableCell className="font-sans text-xs text-moss/70">{i + 1}</TableCell>
                      <TableCell className="font-sans text-sm text-jungle-deep font-medium">
                        {a.nama}
                      </TableCell>
                      <TableCell className="font-sans text-xs text-moss/70 text-right">
                        {a.prodi}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="space-y-3"
            >
              <a
                href={kelompokInfo.link_grup_wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-green-600 text-white px-8 py-3.5 text-sm font-sans font-medium tracking-wide hover:bg-green-700 transition-colors shadow-sm"
              >
                <WhatsappLogo size={20} className="text-white" />
                Gabung Grup WhatsApp
              </a>

              <button
                onClick={() => router.push("/hub")}
                className="w-full rounded-xl bg-jungle-deep text-warm-cream px-8 py-3 text-sm font-sans font-medium tracking-wide hover:bg-moss transition-colors shadow-sm"
              >
                Kembali ke Jungle Hub
              </button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/70 rounded-2xl border border-fern-mist p-8 text-center"
          >
            <p className="text-base text-moss font-sans">
              Data kelompok tidak ditemukan. Hubungi panitia.
            </p>
            <button
              onClick={() => router.push("/hub")}
              className="mt-6 rounded-xl bg-jungle-deep text-warm-cream px-8 py-3 text-sm font-sans font-medium tracking-wide hover:bg-moss transition-colors"
            >
              Kembali
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
