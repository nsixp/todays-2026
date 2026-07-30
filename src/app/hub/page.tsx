"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
import DappledLight from "@/components/dappled-light"
import ForestSilhouettes from "@/components/forest-silhouettes"
import scheduleData from "@/../data/schedule.json"
import faqData from "@/../data/faq.json"
import type { ScheduleItem, FAQItem, JunglePediaItem } from "@/types"
import { ArrowRight, BookOpen, MegaphoneSimple, Crosshair, Stack, CaretDown, Image } from "@phosphor-icons/react"
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
    <div className="text-center mb-10 sm:mb-14">
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-jungle-deep leading-tight text-wrap-balance">{title}</h2>
      {subtitle && <p className="mt-2 sm:mt-3 text-sm sm:text-base text-moss font-sans max-w-lg mx-auto leading-relaxed text-wrap-pretty">{subtitle}</p>}
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
      className={`snap-start shrink-0 px-4 sm:px-6 lg:px-8 py-24 sm:py-28 ${className}`}
    >
      <div className="mx-auto max-w-4xl w-full">{children}</div>
    </motion.section>
  )
}

export default function HubPage() {
  const router = useRouter()
  const { progress, save } = useProgress()
  const [easterClicks, setEasterClicks] = useState<Record<string, number>>({})
  const [easterModal, setEasterModal] = useState<{ label: string; href: string } | null>(null)
  const [shakingCard, setShakingCard] = useState<string | null>(null)

  const pagesRead = progress.pagesRead.length
  const guidebookDone = pagesRead >= 6
  const quizDone = progress.quizDone

  function handleLockedClick(label: string, href: string) {
    const next = { ...easterClicks, [label]: (easterClicks[label] || 0) + 1 }
    setEasterClicks(next)
    if (next[label] >= 3) {
      setEasterClicks({})
      setShakingCard(label)
      setTimeout(() => {
        setShakingCard(null)
        const updatedEasterEggs = { ...progress.easterEggs, [label]: true }
        save({ easterEggs: updatedEasterEggs })
        setEasterModal({ label, href })
      }, 200)
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

  return (
    <div className="relative h-dvh overflow-y-auto snap-y snap-mandatory scroll-pt-14 bg-warm-cream">
      {/* ============ HERO ============ */}
      <section className="relative snap-start min-h-dvh shrink-0 flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Layer 1: Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-jungle-canopy/40 via-jungle-deep/20 to-transparent pointer-events-none" />
        {/* Layer 2: Forest silhouettes */}
        <ForestSilhouettes />
        {/* Layer 3: Dappled light */}
        <DappledLight count={5} />

        {/* Kabut — melayang perlahan */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(163,196,181,0.35) 0%, transparent 60%)",
          }}
          animate={{ opacity: [0.25, 0.5, 0.3, 0.5, 0.25], scale: [1, 1.05, 0.98, 1.03, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 60% 20%, rgba(245,213,144,0.1) 0%, transparent 50%)",
          }}
          animate={{ opacity: [0, 0.3, 0, 0.2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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

        {/* Ground decorative layer */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none z-2" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="xMidYMax slice" fill="#1A3A2B" opacity={0.06}>
            <path d="M0,120 C60,80 120,60 180,70 S300,90 360,80 S480,60 540,70 S660,90 720,75 S840,55 900,65 S1020,85 1080,70 S1200,50 1260,60 S1380,80 1440,65 L1440,120 Z" />
            <path d="M0,120 C80,95 160,85 240,90 S400,100 480,90 S640,75 720,85 S880,100 960,88 S1120,72 1200,80 S1360,95 1440,82 L1440,120 Z" opacity="0.5" />
          </svg>
        </div>

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

        {/* Hero content — center */}
        <div className="relative z-20 w-full flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Brand badge — fade turun */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="mb-5"
          >
            <span className="inline-block px-5 py-1.5 rounded-full bg-jungle-deep/10 text-[10px] text-moss font-sans tracking-[0.2em] uppercase border border-fern-mist/40">
              TODAYS 2026
            </span>
          </motion.div>

          {/* Greeting — narasi bertahap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.01 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-4xl sm:text-5xl md:text-7xl text-jungle-deep leading-[1.1] text-wrap-balance"
            >
              Selamat Datang,
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-3xl sm:text-4xl md:text-6xl text-jungle-deep/70 -mt-1 sm:-mt-2 text-wrap-balance"
            >
              {progress.nama || "Pejuang Rimba"}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
              className="mt-4 text-sm sm:text-base text-moss font-sans max-w-md leading-relaxed mx-auto text-wrap-pretty"
            >
              Jelajahi hutan rimba PKKMB. Baca guidebook, kerjakan quiz, dan dapatkan badge eksklusif.
            </motion.p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5, ease: "easeOut" }}
            className="mt-8 sm:mt-9"
          >
            <button
              onClick={scrollToJelajahi}
              className="group relative overflow-hidden rounded-full bg-jungle-deep text-warm-cream px-10 py-3.5 sm:px-12 sm:py-4 text-sm sm:text-base font-sans font-medium tracking-wide transition-all duration-500 hover:bg-sunlit-gold hover:text-jungle-deep active:scale-[0.96]"
              style={{
                boxShadow: "0 4px 20px rgba(26,58,43,0.25), inset 0 1px 2px rgba(255,255,255,0.12)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2.5">
                <span className="group-hover:hidden transition-all duration-300">Mulai Petualangan</span>
                <span className="hidden group-hover:inline transition-all duration-300">Mulai Petualangan</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <ArrowRight size={16} />
                </motion.span>
              </span>
            </button>
          </motion.div>
        </div>

      </section>


      {/* ============ JELAJAHI ============ */}
      <div id="jelajahi" className="scroll-mt-20 relative bg-[#F8F6F0]">
        {/* Decorative top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-sunlit-gold/30 to-transparent" />
        {/* Trail paths SVG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" aria-hidden="true">
          <svg className="w-full h-full mt-24" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice">
            <path d="M120,120 L600,300" stroke="#D5D7C8" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" fill="none" />
            <path d="M1080,180 L600,300" stroke="#D5D7C8" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" fill="none" />
            <path d="M120,480 L600,300" stroke="#D5D7C8" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" fill="none" />
            <path d="M1080,480 L600,300" stroke="#D5D7C8" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" fill="none" />
          </svg>
        </div>

      <SectionBody>
        <SectionHeader title="Jelajahi" subtitle="Pilih petualanganmu di hutan rimba" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto relative">
          {[
            {
              icon: <BookOpen className="w-8 h-8" />,
              label: "Guidebook",
              href: "/guidebook",
              desc: "Baca panduan PKKMB",
              status: guidebookDone ? "Selesai" : `${pagesRead}/6 halaman`,
              unlocked: true,
              pattern: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(26,58,43,0.04) 2px, rgba(26,58,43,0.04) 3px)",
              desktopClass: "md:justify-self-start md:self-start",
            },
            {
              icon: <MegaphoneSimple className="w-8 h-8" />,
              label: "Quiz",
              href: "/quiz",
              desc: "Uji pemahaman guidebook",
              unlocked: guidebookDone || progress.easterEggs["Quiz"] || false,
              locked: !guidebookDone && !progress.easterEggs["Quiz"],
              onLockedClick: () => handleLockedClick("Quiz", "/quiz"),
              pattern: "radial-gradient(circle, rgba(243,196,107,0.10) 1px, transparent 1px)",
              desktopClass: "md:justify-self-end md:self-center md:mt-8",
            },
            {
              icon: <Crosshair className="w-8 h-8" />,
              label: "Cari Kelompok",
              href: "/kelompok",
              desc: "Temukan kelompok PKKMB",
              unlocked: quizDone || progress.easterEggs["Cari Kelompok"] || false,
              locked: !quizDone && !progress.easterEggs["Cari Kelompok"],
              onLockedClick: () => handleLockedClick("Cari Kelompok", "/kelompok"),
              pattern: "radial-gradient(circle, rgba(78,112,83,0.08) 1px, transparent 1px), linear-gradient(90deg, transparent, rgba(78,112,83,0.04) 50%, transparent 50%)",
              desktopClass: "md:justify-self-start md:self-end",
            },
            {
              icon: <Stack className="w-8 h-8" />,
              label: "Jejak Rimba",
              href: "/jejak-rimba",
              desc: "Game petualangan interaktif",
              unlocked: quizDone || progress.easterEggs["Jejak Rimba"] || false,
              locked: !quizDone && !progress.easterEggs["Jejak Rimba"],
              onLockedClick: () => handleLockedClick("Jejak Rimba", "/jejak-rimba"),
              pattern: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(163,196,181,0.10) 4px, rgba(163,196,181,0.10) 5px)",
              desktopClass: "md:justify-self-end md:self-end",
            },
          ].map((item, i) => {
            const isLocked = "locked" in item ? (item as { locked?: boolean }).locked : false
            const pattern = (item as { pattern?: string }).pattern || "none"
            const desktopClass = (item as { desktopClass?: string }).desktopClass || ""
            return (
              <motion.div
                key={item.label}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 24 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className={desktopClass}
              >
                {isLocked ? (
                  <button
                    onClick={item.onLockedClick}
                    className={`w-full flex flex-col items-center gap-3 p-5 sm:p-7 rounded-2xl border-2 border-jungle-deep/15 bg-white/30 cursor-pointer relative overflow-hidden group ${
                      shakingCard === item.label ? "animate-[shake_200ms_ease-in-out]" : ""
                    }`}
                  >
                    <div className="absolute inset-0 bg-linear-to-b from-jungle-shadow/50 to-jungle-shadow/30 pointer-events-none" />
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: pattern, backgroundSize: "8px 8px" }}
                    />
                    <div className="relative w-12 h-12 flex items-center justify-center text-sage/60">{item.icon}</div>
                    <div className="text-center relative">
                      <p className="text-base font-heading text-sage/60">{item.label}</p>
                      <p className="text-xs text-fern-mist/60 font-sans mt-1">Terkunci</p>
                    </div>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="block group"
                  >
                    <div className="relative overflow-hidden flex flex-col items-center gap-3 p-5 sm:p-7 rounded-2xl border-2 border-fern-mist bg-white/60 hover:border-sunlit-gold hover:shadow-lg hover:shadow-sunlit-gold/10 transition-all duration-300">
                      <div
                        className="absolute inset-0 opacity-[0.35] group-hover:opacity-20 transition-opacity duration-300"
                        style={{ backgroundImage: pattern, backgroundSize: pattern.includes("radial") ? "8px 8px" : "12px 12px" }}
                      />
                      <div className="relative w-12 h-12 flex items-center justify-center text-jungle-deep group-hover:text-sunlit-gold transition-colors">{item.icon}</div>
                      <div className="text-center relative">
                        <p className="text-base font-heading text-jungle-deep">{item.label}</p>
                        <p className="text-xs text-moss font-sans mt-1">{item.desc}</p>
                        <p className="text-[10px] text-sage/70 font-sans mt-0.5">{item.status}</p>
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
      <div className="bg-moss/3 relative">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-moss/40 to-transparent" />
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
              <div className="shrink-0 w-12 h-12 rounded-full bg-moss/10 flex items-center justify-center">
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
      </div>


      {/* ============ JUNGLEPEDIA SPOTLIGHT ============ */}
      <div className="bg-jungle-canopy/3 relative">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-jungle-canopy/30 to-transparent" />
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
      </div>


      {/* ============ GALERI ============ */}
      <div className="bg-sunlit-gold/3 relative">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-sunlit-gold/30 to-transparent" />
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
              className="aspect-square rounded-xl bg-linear-to-br from-sage/20 to-fern-mist/30 border border-fern-mist/60 flex items-center justify-center"
            >
              <div className="text-center p-2">
                <Image className="w-8 h-8 text-sage/60 mx-auto mb-1" />
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
      </div>


      {/* ============ FAQ ============ */}
      <div className="bg-fern-mist/4 relative">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-fern-mist/40 to-transparent" />
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
              <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer text-lg font-heading text-jungle-deep hover:text-jungle-deep/80 transition-colors [&::-webkit-details-marker]:hidden">
                {item.question}
                <CaretDown size={16} className="shrink-0 text-moss transition-transform duration-200 group-open:rotate-180" />
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

      {/* Easter egg modal */}
      <AnimatePresence>
        {easterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-jungle-shadow/60 backdrop-blur-sm px-6"
            onClick={() => setEasterModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-warm-cream rounded-2xl border border-fern-mist p-8 text-center shadow-xl"
            >
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="font-heading text-xl text-jungle-deep mb-3">
                Jalan Rahasia Terbuka!
              </h3>
              <p className="text-sm text-moss font-sans leading-relaxed mb-6">
                Kamu menemukan jalan rahasia di balik dedaunan...{" "}
                <span className="font-medium text-jungle-deep">{easterModal.label}</span> telah terbuka!
              </p>
              <button
                onClick={handleEasterGo}
                className="rounded-full bg-sunlit-gold text-jungle-deep px-8 py-3 text-sm font-sans font-medium tracking-wide hover:bg-ember transition-colors"
              >
                Lanjutkan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
