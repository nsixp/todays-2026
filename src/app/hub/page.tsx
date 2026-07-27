"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
import Monyet from "@/components/icons/monyet"
import Burung from "@/components/icons/burung"
import Rusa from "@/components/icons/rusa"
import Harimau from "@/components/icons/harimau"
import KupuKupu from "@/components/icons/kupu-kupu"
import Ular from "@/components/icons/ular"
import type { AvatarId } from "@/types"
import scheduleData from "@/../data/schedule.json"
import faqData from "@/../data/faq.json"
import type { ScheduleItem, FAQItem, JunglePediaItem } from "@/types"
import junglepediaData from "@/../data/junglepedia.json"

const junglepedia = junglepediaData as JunglePediaItem[]

const JUNGLEPEDIA_CATEGORIES = [
  {
    icon: "🏛️",
    label: "Fasilitas",
    desc: "Gedung kuliah, laboratorium, perpustakaan, masjid, dan UKS",
    count: junglepedia.filter((i) => i.kategori === "fasilitas").length,
    color: "border-l-moss",
    bg: "bg-moss/10",
  },
  {
    icon: "👥",
    label: "UKM & Organisasi",
    desc: "UKM, BEM, HIMA, dan organisasi kemahasiswaan lainnya",
    count: junglepedia.filter((i) => i.kategori === "ukm").length,
    color: "border-l-sunlit-gold",
    bg: "bg-sunlit-gold/10",
  },
  {
    icon: "💻",
    label: "Platform Akademik",
    desc: "E-learning, portal akademik, dan email kampus",
    count: junglepedia.filter((i) => i.kategori === "platform").length,
    color: "border-l-jungle-deep",
    bg: "bg-jungle-deep/10",
  },
]

const AVATAR_ICONS: Record<AvatarId, typeof Monyet> = {
  monyet: Monyet,
  burung: Burung,
  rusa: Rusa,
  harimau: Harimau,
  "kupu-kupu": KupuKupu,
  ular: Ular,
}

const schedule = scheduleData as ScheduleItem[]
const faqs = faqData as FAQItem[]

const FIREFLIES = [
  { x: 15, y: 30, dur: 4, delay: 0 },
  { x: 80, y: 20, dur: 5, delay: 1 },
  { x: 60, y: 70, dur: 3.5, delay: 0.5 },
  { x: 25, y: 65, dur: 4.5, delay: 2 },
  { x: 70, y: 45, dur: 3, delay: 1.5 },
  { x: 10, y: 50, dur: 5.5, delay: 3 },
  { x: 90, y: 55, dur: 4, delay: 0.8 },
]

const FALLING_LEAVES = [
  { x: 8, dur: 8, delay: 0, rot: 30 },
  { x: 88, dur: 10, delay: 2, rot: -20 },
  { x: 5, dur: 7, delay: 4, rot: 45 },
  { x: 92, dur: 9, delay: 6, rot: -35 },
]

const GALLERY_PLACEHOLDERS = [
  { id: 1, label: "Kegiatan Kampus" },
  { id: 2, label: "UKM & Organisasi" },
  { id: 3, label: "Fasilitas Kampus" },
  { id: 4, label: "Suasana PKKMB" },
]

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-heading text-2xl sm:text-3xl text-jungle-deep">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-moss font-sans max-w-md mx-auto">{subtitle}</p>}
    </div>
  )
}

function SectionBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`snap-start flex-shrink-0 px-6 py-20 sm:py-28 ${className}`}
    >
      <div className="mx-auto max-w-4xl w-full">{children}</div>
    </motion.section>
  )
}

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <span className="text-[10px] text-sage font-sans tracking-widest uppercase">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-4 h-4"
      >
        <svg viewBox="0 0 16 16" fill="none" className="w-full h-full text-sage">
          <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
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
  const hasBadge = progress.badgeTitle.length > 0
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

  function scrollToJelajahi() {
    document.getElementById("jelajahi")?.scrollIntoView({ behavior: "smooth" })
  }

  if (!mounted) {
    return (
      <div className="min-h-dvh bg-gradient-to-b from-jungle-deep/10 via-warm-cream to-sage/30 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-fern-mist border-t-jungle-deep animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative h-dvh overflow-y-auto snap-y snap-mandatory scroll-pt-14 bg-warm-cream">
      {/* ============ HERO ============ */}
      <section className="relative snap-start min-h-dvh flex-shrink-0 flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-jungle-deep/10 via-warm-cream to-sage/30 pointer-events-none" />

        {/* Kabut */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(163,196,181,0.3) 0%, transparent 60%)",
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Fireflies */}
        {FIREFLIES.map((f, i) => (
          <motion.div
            key={`ff-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full pointer-events-none z-10"
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              backgroundColor: "#F5D590",
              boxShadow: "0 0 4px 2px rgba(245,213,144,0.4)",
            }}
            animate={{
              x: [0, 30, -20, 10, 0],
              y: [0, -25, 15, -10, 0],
              opacity: [0, 0.8, 0.3, 0.7, 0],
              scale: [0, 1.2, 0.6, 1, 0],
            }}
            transition={{
              duration: f.dur,
              delay: f.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Daun jatuh */}
        {FALLING_LEAVES.map((leaf, i) => (
          <motion.div
            key={`lf-${i}`}
            className="absolute top-0 w-3 h-3 rounded-full pointer-events-none z-10"
            style={{
              left: `${leaf.x}%`,
              backgroundColor: "rgba(78,112,83,0.3)",
            }}
            animate={{
              y: ["-5vh", "105vh"],
              x: [0, leaf.rot > 0 ? 20 : -20, 0],
              rotate: [0, leaf.rot, 0],
              opacity: [0.4, 0.6, 0.2, 0],
            }}
            transition={{
              duration: leaf.dur,
              delay: leaf.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Hero content grid */}
        <div className="relative z-20 w-full max-w-5xl lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Left column */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Brand badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-jungle-deep/10 text-[10px] text-moss font-sans tracking-[0.2em] uppercase border border-fern-mist/40">
                TODAYS 2026
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <p className="text-[11px] text-moss font-sans tracking-[0.25em] uppercase mb-2">
                Hutan Rimba
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-jungle-deep leading-tight">
                Selamat Datang,
              </h1>
              <p className="font-heading text-2xl sm:text-3xl md:text-4xl text-jungle-deep/70 -mt-1">
                {progress.nama || "Pejuang Rimba"}
              </p>
              <p className="mt-3 text-sm text-moss font-sans max-w-xs leading-relaxed lg:mx-0">
                Jelajahi hutan rimba PKKMB, baca guidebook, kerjakan quiz, dan dapatkan badge eksklusif.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-7"
            >
              <button
                onClick={scrollToJelajahi}
                className="group relative overflow-hidden rounded-full bg-jungle-deep text-warm-cream px-8 py-3 text-sm font-sans font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-jungle-deep/20"
              >
                <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-300">Mulai Petualangan</span>
                <span className="absolute inset-0 flex items-center justify-center bg-sunlit-gold text-jungle-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                  Jelajahi →
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right column — avatar + progress */}
          <div className="flex flex-col items-center lg:items-end gap-6 mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-20 w-full max-w-sm flex justify-center"
            >
              <div className="relative w-36 h-36 sm:w-44 sm:h-44">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                  style={{
                    background: "conic-gradient(from 0deg, rgba(243,196,107,0.3), rgba(78,112,83,0.2), rgba(245,213,144,0.3), rgba(243,196,107,0.3))",
                    borderRadius: "50%",
                    filter: "blur(3px)",
                    transform: "scale(1.12)",
                  }}
                />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-warm-cream to-white border-2 border-sunlit-gold/40 flex items-center justify-center shadow-lg shadow-sunlit-gold/10">
                  <AvatarIcon className="w-20 h-20 sm:w-24 sm:h-24" />
                </div>
              </div>
            </motion.div>

            {/* Progress cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full max-w-sm"
            >
              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-xl border border-fern-mist/60 bg-white/70 p-3 text-center backdrop-blur-sm hover:bg-white/90 transition-colors">
                  <p className="text-base font-heading text-jungle-deep">{pagesRead}/6</p>
                  <p className="text-[9px] text-moss font-sans tracking-wider uppercase mt-0.5">Guidebook</p>
                  <div className="mt-2 h-1 rounded-full bg-fern-mist/40 overflow-hidden">
                    <div className="h-full rounded-full bg-sunlit-gold transition-all duration-500" style={{ width: `${(pagesRead / 6) * 100}%` }} />
                  </div>
                </div>
                <div className="rounded-xl border border-fern-mist/60 bg-white/70 p-3 text-center backdrop-blur-sm hover:bg-white/90 transition-colors">
                  <p className={`text-base font-heading ${quizDone ? "text-moss" : "text-sage"}`}>{quizDone ? "✓" : "—"}</p>
                  <p className="text-[9px] text-moss font-sans tracking-wider uppercase mt-0.5">Quiz</p>
                </div>
                <div className="rounded-xl border border-fern-mist/60 bg-white/70 p-3 text-center backdrop-blur-sm hover:bg-white/90 transition-colors">
                  <p className={`text-base font-heading truncate ${hasBadge ? "text-sunlit-gold" : "text-sage"}`}>{hasBadge ? progress.badgeTitle : "—"}</p>
                  <p className="text-[9px] text-moss font-sans tracking-wider uppercase mt-0.5">Badge</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <ScrollIndicator />
      </section>


      {/* ============ JELAJAHI ============ */}
      <div id="jelajahi" className="scroll-mt-20">
      <SectionBody>
        <SectionHeader title="Jelajahi" subtitle="Pilih petualanganmu di hutan rimba" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 7h8M8 11h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ),
              label: "Guidebook",
              href: "/guidebook",
              desc: "Baca panduan PKKMB",
              status: guidebookDone ? "Selesai" : `${pagesRead}/6 halaman`,
              unlocked: true,
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                  <path d="M19.5 12.5a3 3 0 0 0-3-3V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h2.5a3 3 0 0 0 6 0H18a2 2 0 0 0 2-2v-2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="10" cy="12" r="1.5" fill="currentColor" />
                </svg>
              ),
              label: "Quiz",
              href: "/quiz",
              desc: "Uji pemahaman guidebook",
              unlocked: guidebookDone || progress.easterEggs["Quiz"] || false,
              locked: !guidebookDone && !progress.easterEggs["Quiz"],
              onLockedClick: () => handleLockedClick("Quiz", "/quiz"),
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M12 8 9 16l4-3 3-5Z" fill="currentColor" opacity="0.3" />
                  <path d="m10 14 2-6 3 5-5 1Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              label: "Cari Kelompok",
              href: "/kelompok",
              desc: "Temukan kelompok PKKMB",
              unlocked: quizDone || progress.easterEggs["Cari Kelompok"] || false,
              locked: !quizDone && !progress.easterEggs["Cari Kelompok"],
              onLockedClick: () => handleLockedClick("Cari Kelompok", "/kelompok"),
            },
          ].map((item, i) => {
            const isLocked = "locked" in item ? (item as any).locked : false
            return (
              <motion.div
                key={item.label}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 24 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                {isLocked ? (
                  <button
                    onClick={item.onLockedClick}
                    className="w-full flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-fern-mist/50 bg-white/40 opacity-50 grayscale cursor-pointer hover:opacity-70 transition-opacity"
                  >
                    <div className="w-12 h-12 flex items-center justify-center text-sage">{item.icon}</div>
                    <div className="text-center">
                      <p className="text-base font-heading text-sage">{item.label}</p>
                      <p className="text-xs text-fern-mist font-sans mt-1">Terkunci</p>
                    </div>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="block group"
                  >
                    <div className="flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-fern-mist bg-white/60 hover:border-sunlit-gold hover:shadow-lg hover:shadow-sunlit-gold/10 transition-all duration-300">
                      <div className="w-12 h-12 flex items-center justify-center text-jungle-deep group-hover:text-sunlit-gold transition-colors">{item.icon}</div>
                      <div className="text-center">
                        <p className="text-base font-heading text-jungle-deep group-hover:text-jungle-deep">{item.label}</p>
                        <p className="text-xs text-moss font-sans mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            )
          })}
        </div>
      </SectionBody>

      </div>


      {/* ============ JADWAL ============ */}
      <SectionBody>
        <SectionHeader title="Jadwal Kegiatan" subtitle="Rangkaian acara PKKMB Telkom University Purwokerto" />
        <div className="space-y-4">
          {schedule.slice(0, 3).map((item) => (
            <motion.div
              key={item.hari}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-start gap-4 p-4 rounded-xl border border-fern-mist/60 bg-white/50"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-moss/10 flex items-center justify-center">
                <span className="font-heading text-sm text-moss">H{item.hari}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-heading text-jungle-deep">{item.kegiatan}</p>
                <p className="text-xs text-moss font-sans mt-0.5">{item.tanggal} · {item.waktu}</p>
                <p className="text-xs text-sage font-sans mt-0.5">{item.lokasi}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/jadwal"
            className="inline-flex items-center rounded-full border border-moss text-moss px-5 py-2 text-xs font-sans tracking-wider uppercase hover:bg-moss hover:text-warm-cream transition-all"
          >
            Lihat Semua Jadwal
          </Link>
        </div>
      </SectionBody>


      {/* ============ JUNGLEPEDIA SPOTLIGHT ============ */}
      <SectionBody>
        <SectionHeader title="JunglePedia" subtitle="Kenali lebih dekat kampus Telkom University Purwokerto" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {JUNGLEPEDIA_CATEGORIES.map((item, i) => (
            <motion.div
              key={item.label}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-fern-mist/60 bg-white/50 p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center mx-auto mb-3`}>
                <span className="text-xl">{item.icon}</span>
              </div>
              <p className="text-base font-heading text-jungle-deep">{item.label}</p>
              <p className="text-xs text-moss font-sans mt-1 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/junglepedia"
            className="inline-flex items-center rounded-full border border-moss text-moss px-5 py-2 text-xs font-sans tracking-wider uppercase hover:bg-moss hover:text-warm-cream transition-all"
          >
            Jelajahi JunglePedia
          </Link>
        </div>
      </SectionBody>


      {/* ============ GALERI ============ */}
      <SectionBody>
        <SectionHeader title="Galeri" subtitle="Momen-momen seru di kampus" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {GALLERY_PLACEHOLDERS.map((item, i) => (
            <motion.div
              key={item.id}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="aspect-square rounded-xl bg-gradient-to-br from-sage/20 to-fern-mist/30 border border-fern-mist/60 flex items-center justify-center"
            >
              <div className="text-center p-2">
                <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 text-sage/60 mx-auto mb-1">
                  <rect x="4" y="8" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="15" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="m4 21 6-4 5 3 5-5 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[10px] text-sage/60 font-sans">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/galeri"
            className="inline-flex items-center rounded-full border border-moss text-moss px-5 py-2 text-xs font-sans tracking-wider uppercase hover:bg-moss hover:text-warm-cream transition-all"
          >
            Lihat Galeri
          </Link>
        </div>
      </SectionBody>


      {/* ============ FAQ ============ */}
      <SectionBody>
        <SectionHeader title="Ada Pertanyaan?" subtitle="Pertanyaan umum seputar PKKMB" />
        <div className="space-y-3 max-w-2xl mx-auto">
          {faqs.slice(0, 3).map((item, i) => (
            <motion.details
              key={item.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 16 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group rounded-xl border border-fern-mist/60 bg-white/50 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer text-sm font-heading text-jungle-deep hover:text-jungle-deep/80 transition-colors [&::-webkit-details-marker]:hidden">
                {item.question}
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0 text-moss transition-transform duration-200 group-open:rotate-180">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm text-moss font-sans leading-relaxed">
                {item.answer}
              </div>
            </motion.details>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="inline-flex items-center rounded-full border border-moss text-moss px-5 py-2 text-xs font-sans tracking-wider uppercase hover:bg-moss hover:text-warm-cream transition-all"
          >
            Lihat Semua FAQ
          </Link>
        </div>
      </SectionBody>
    </div>
  )
}
