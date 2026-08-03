"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { useProgress } from "@/hooks/use-progress"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import DappledLight from "@/components/dappled-light"
import ForestSilhouettes from "@/components/forest-silhouettes"
import scheduleData from "@/../data/schedule.json"
import faqData from "@/../data/faq.json"
import type { ScheduleItem, FAQItem, KompasItem } from "@/types"
import {
  ArrowRightIcon as ArrowRight,
  ArrowUpRightIcon as ArrowUpRight,
  BookOpenIcon as BookOpen,
  BuildingsIcon as Buildings,
  CalendarBlankIcon as CalendarBlank,
  CameraIcon as Camera,
  ClockIcon as Clock,
  CompassIcon as Compass,
  CrosshairIcon as Crosshair,
  ImageIcon,
  LaptopIcon as Laptop,
  LeafIcon as Leaf,
  MapPinIcon as MapPin,
  MegaphoneSimpleIcon as MegaphoneSimple,
  QuestionIcon as Question,
  StackIcon as Stack,
  UsersThreeIcon as UsersThree,
} from "@phosphor-icons/react"
import kompasData from "@/../data/kompas.json"
import Monyet from "@/components/icons/monyet"
import Burung from "@/components/icons/burung"
import Rusa from "@/components/icons/rusa"
import Harimau from "@/components/icons/harimau"
import KupuKupu from "@/components/icons/kupu-kupu"
import Ular from "@/components/icons/ular"
import type { AvatarId } from "@/types"

const kompas = kompasData as KompasItem[]

const KOMPAS_CATEGORIES = [
  {
    icon: <Buildings size={23} weight="duotone" className="text-jungle-deep" />,
    label: "Fasilitas",
    desc: "Gedung kuliah, laboratorium, perpustakaan, masjid, dan UKS",
    count: kompas.filter((i) => i.kategori === "fasilitas").length,
    color: "border-l-moss",
    bg: "bg-moss/10",
  },
  {
    icon: <UsersThree size={23} weight="duotone" className="text-jungle-deep" />,
    label: "UKM & Organisasi",
    desc: "UKM, BEM, HIMA, dan organisasi kemahasiswaan lainnya",
    count: kompas.filter((i) => i.kategori === "ukm").length,
    color: "border-l-sunlit-gold",
    bg: "bg-sunlit-gold/10",
  },
  {
    icon: <Laptop size={23} weight="duotone" className="text-jungle-deep" />,
    label: "Platform Akademik",
    desc: "E-learning, portal akademik, dan email kampus",
    count: kompas.filter((i) => i.kategori === "platform").length,
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

const AVATAR_ICONS: Record<AvatarId, typeof Monyet> = {
  monyet: Monyet,
  burung: Burung,
  rusa: Rusa,
  harimau: Harimau,
  "kupu-kupu": KupuKupu,
  ular: Ular,
}

const SIGNPOST_POSITIONS = [
  {
    mobile: { x: 24, y: 20 },
    desktop: { x: 18, y: 23 },
    rotation: -1.4,
  },
  {
    mobile: { x: 76, y: 27 },
    desktop: { x: 79, y: 30 },
    rotation: 1.1,
  },
  {
    mobile: { x: 24, y: 72 },
    desktop: { x: 23, y: 73 },
    rotation: 0.7,
  },
  {
    mobile: { x: 76, y: 80 },
    desktop: { x: 82, y: 78 },
    rotation: -0.9,
  },
] as const

function TrailMap({
  variant,
  className,
  reduceMotion,
}: {
  variant: "mobile" | "desktop"
  className: string
  reduceMotion: boolean
}) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 z-0 size-full overflow-visible ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {SIGNPOST_POSITIONS.map((position, index) => {
        const point = position[variant]
        const path = `M${point.x},${point.y} L50,50`

        return (
          <motion.path
            key={`${variant}-${path}`}
            d={path}
            stroke="var(--color-sage)"
            strokeWidth="1.5"
            strokeDasharray="8 7"
            vectorEffect="non-scaling-stroke"
            opacity="0.48"
            fill="none"
            animate={reduceMotion ? undefined : { strokeDashoffset: [0, -30] }}
            transition={{
              duration: 3,
              delay: index * 0.12,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )
      })}
    </svg>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10 sm:mb-14">
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-jungle-deep leading-tight text-wrap-balance">{title}</h2>
      {subtitle && <p className="mt-2 sm:mt-3 text-sm sm:text-base text-moss font-sans max-w-lg mx-auto leading-relaxed text-wrap-pretty">{subtitle}</p>}
    </div>
  )
}

function SectionBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`snap-start shrink-0 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </motion.section>
  )
}

export default function HubPage() {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const { progress, save } = useProgress()
  const [easterClicks, setEasterClicks] = useState<Record<string, number>>({})
  const [easterModal, setEasterModal] = useState<{ label: string; href: string } | null>(null)
  const [shakingCard, setShakingCard] = useState<string | null>(null)

  const pagesRead = progress.pagesRead.length
  const guidebookDone = pagesRead >= 6
  const quizDone = progress.quizDone
  const AvatarIcon = AVATAR_ICONS[progress.avatar] ?? Monyet

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
    <div className="relative min-h-dvh overflow-x-hidden scroll-pt-20 bg-warm-cream">
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-dvh shrink-0 snap-start items-center overflow-hidden px-4 pb-12 pt-24 sm:px-6 sm:py-20 lg:px-8">
        {/* Layer 1: Background gradient */}
        <div className="forest-hero absolute inset-0 pointer-events-none" />
        {/* Layer 2: Forest silhouettes */}
        <ForestSilhouettes />
        {/* Layer 3: Dappled light */}
        <div className="absolute inset-0 hidden sm:block">
          <DappledLight count={4} />
        </div>

        {/* Kabut melayang perlahan */}
        <motion.div
          className="absolute inset-0 hidden sm:block pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(163,196,181,0.35) 0%, transparent 60%)",
          }}
          animate={reduceMotion ? { opacity: 0.32 } : { opacity: [0.25, 0.5, 0.3, 0.5, 0.25], scale: [1, 1.05, 0.98, 1.03, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 hidden sm:block pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 60% 20%, rgba(245,213,144,0.1) 0%, transparent 50%)",
          }}
          animate={reduceMotion ? { opacity: 0.18 } : { opacity: [0, 0.3, 0, 0.2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Fireflies */}
        {FIREFLIES.map((f, i) => (
          <motion.div
            key={`ff-${i}`}
            className={`absolute w-1.5 h-1.5 rounded-full pointer-events-none z-10 ${i > 2 ? "hidden sm:block" : ""}`}
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              backgroundColor: "#F5D590",
              boxShadow: "0 0 4px 2px rgba(245,213,144,0.4)",
            }}
            animate={reduceMotion ? { opacity: 0.5, scale: 0.8 } : {
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
            className="absolute top-0 hidden sm:block w-3 h-3 rounded-full pointer-events-none z-10"
            style={{
              left: `${leaf.x}%`,
              backgroundColor: "rgba(78,112,83,0.3)",
            }}
            animate={reduceMotion ? { opacity: 0.25 } : {
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

        <div className="relative z-20 mx-auto grid w-full max-w-6xl items-center gap-5 sm:gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] md:gap-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 text-center md:order-1 md:text-left"
          >
            <h1 className="font-heading text-3xl leading-[1.06] text-jungle-deep text-wrap-balance sm:text-5xl lg:text-7xl">
              Selamat datang, {progress.nama || "Pejuang Rimba"}
            </h1>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-moss text-wrap-pretty sm:text-base md:mx-0">
              Baca panduan, uji pemahamanmu, lalu temukan kelompok PKKMB dalam satu perjalanan.
            </p>
            <div className="mt-7">
              <button
                onClick={scrollToJelajahi}
                className="btn-jungle group inline-flex items-center gap-2.5 bg-jungle-deep px-7 py-3.5 text-warm-cream hover:bg-moss"
              >
                Mulai Petualangan
                <motion.span
                  animate={reduceMotion ? undefined : { x: [0, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex"
                >
                  <ArrowRight size={17} weight="bold" />
                </motion.span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 mx-auto w-full max-w-40 sm:max-w-68 md:order-2 md:max-w-104"
            aria-label={`Avatar ${progress.avatar}`}
          >
            <div className="relative aspect-square">
              <div className="scope-lens absolute inset-[7%] rounded-full">
                <div className="absolute inset-[11%] rounded-full border border-jungle-deep/30" />
                <div className="absolute left-0 right-[61%] top-1/2 h-px bg-jungle-deep/55" />
                <div className="absolute left-[61%] right-0 top-1/2 h-px bg-jungle-deep/55" />
                <div className="absolute bottom-[61%] left-1/2 top-0 w-px bg-jungle-deep/55" />
                <div className="absolute bottom-0 left-1/2 top-[61%] w-px bg-jungle-deep/55" />
                <span className="absolute left-1/2 top-[3%] h-4 w-0.5 -translate-x-1/2 bg-jungle-deep/65" />
                <span className="absolute bottom-[3%] left-1/2 h-4 w-0.5 -translate-x-1/2 bg-jungle-deep/65" />
                <span className="absolute left-[3%] top-1/2 h-0.5 w-4 -translate-y-1/2 bg-jungle-deep/65" />
                <span className="absolute right-[3%] top-1/2 h-0.5 w-4 -translate-y-1/2 bg-jungle-deep/65" />
              </div>
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -7, 0], rotate: [-1, 1, -1] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-[24%] flex items-center justify-center"
              >
                <AvatarIcon className="h-full w-full drop-shadow-[0_16px_18px_rgba(15,36,26,0.18)]" />
              </motion.div>
              <div className="absolute inset-x-[18%] bottom-[12%] h-8 rounded-[50%] bg-jungle-shadow/15 blur-lg" />
            </div>
          </motion.div>
        </div>

      </section>


      {/* ============ JELAJAHI ============ */}
      <div id="jelajahi" className="hub-zone-map scroll-mt-20 relative">
        {/* Decorative top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-sunlit-gold/30 to-transparent" />

      <SectionBody>
        <SectionHeader title="Jelajahi" subtitle="Pilih petualanganmu di hutan rimba" />
        <div className="relative mx-auto h-140 w-full max-w-5xl sm:h-168 md:h-160">
          <TrailMap
            variant="mobile"
            className="md:hidden"
            reduceMotion={Boolean(reduceMotion)}
          />
          <TrailMap
            variant="desktop"
            className="hidden md:block"
            reduceMotion={Boolean(reduceMotion)}
          />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex size-16 items-center justify-center rounded-full border-4 border-warm-cream bg-sunlit-gold/85 shadow-lg shadow-jungle-shadow/25 sm:size-20"
            style={{ x: "-50%", y: "-50%" }}
            animate={reduceMotion ? undefined : { scale: [1, 1.025, 1] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            <AvatarIcon className="size-10 sm:size-12" />
          </motion.div>
          {[
            {
              icon: <BookOpen className="w-8 h-8" />,
              label: "Guidebook",
              href: "/guidebook",
              desc: "Baca panduan PKKMB",
              status: guidebookDone ? "Selesai" : `${pagesRead}/6 halaman`,
              unlocked: true,
              pattern: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(26,58,43,0.04) 2px, rgba(26,58,43,0.04) 3px)",
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
            },
          ].map((item, i) => {
            const isLocked = "locked" in item ? (item as { locked?: boolean }).locked : false
            const pattern = (item as { pattern?: string }).pattern || "none"
            const position = SIGNPOST_POSITIONS[i]
            return (
              <div
                key={item.label}
                className="hub-signpost-node absolute z-10 h-40 w-32 sm:h-48 sm:w-44 md:w-48"
                style={
                  {
                    "--signpost-x-mobile": `${position.mobile.x}%`,
                    "--signpost-y-mobile": `${position.mobile.y}%`,
                    "--signpost-x-desktop": `${position.desktop.x}%`,
                    "--signpost-y-desktop": `${position.desktop.y}%`,
                    "--signpost-rotation": `${position.rotation}deg`,
                  } as React.CSSProperties
                }
              >
                <motion.div
                  className="size-full"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: reduceMotion ? 0 : i * 0.12,
                    duration: reduceMotion ? 0 : 0.5,
                  }}
                >
                  {isLocked ? (
                    <button
                      onClick={item.onLockedClick}
                      className={`woodgrain relative flex size-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-jungle-deep/15 bg-jungle-shadow/80 p-3 grayscale sm:gap-3 sm:p-6 ${
                        shakingCard === item.label ? "animate-[shake_200ms_ease-in-out]" : ""
                      }`}
                    >
                      <div className="absolute inset-0 bg-linear-to-b from-jungle-shadow/20 to-jungle-shadow/50 pointer-events-none" />
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: pattern, backgroundSize: "8px 8px" }}
                      />
                      <div className="relative flex size-10 items-center justify-center text-fern-mist/55 sm:size-12">{item.icon}</div>
                      <div className="text-center relative">
                        <p className="font-heading text-lg leading-tight text-fern-mist/65 sm:text-xl">{item.label}</p>
                        <p className="mt-0.5 font-sans text-[11px] text-fern-mist/60 sm:mt-1 sm:text-xs">Terkunci</p>
                      </div>
                    </button>
                  ) : (
                    <Link href={item.href} className="group block size-full">
                      <motion.div
                        animate={reduceMotion ? undefined : {
                          boxShadow: [
                            "var(--jungle-panel-shadow)",
                            "var(--jungle-panel-glow)",
                            "var(--jungle-panel-shadow)",
                          ],
                        }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
                        className="forest-panel woodgrain relative flex size-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 p-3 duration-300 hover:-translate-y-1 hover:border-sunlit-gold sm:gap-3 sm:p-6"
                      >
                        <div
                          className="absolute inset-0 opacity-[0.35] transition-opacity duration-300 group-hover:opacity-20"
                          style={{ backgroundImage: pattern, backgroundSize: pattern.includes("radial") ? "8px 8px" : "12px 12px" }}
                        />
                        <div className="relative flex size-10 items-center justify-center text-jungle-deep transition-colors group-hover:text-sunlit-gold sm:size-12">{item.icon}</div>
                        <div className="relative text-center">
                          <p className="font-heading text-lg leading-tight text-jungle-deep sm:text-xl">{item.label}</p>
                          <p className="mt-0.5 line-clamp-2 font-sans text-[11px] leading-tight text-moss sm:mt-1 sm:text-xs sm:leading-normal">{item.desc}</p>
                          <p className="mt-0.5 font-sans text-[9px] text-sage/70 sm:text-[10px]">{item.status}</p>
                        </div>
                      </motion.div>
                    </Link>
                  )}
                </motion.div>
              </div>
            )
          })}
        </div>
      </SectionBody>
      </div>


      {/* ============ JADWAL ============ */}
      <div className="hub-zone-itinerary relative">
        <SectionBody>
          <div className="grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div className="lg:sticky lg:top-24">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl border border-moss/20 bg-moss/10 text-moss">
                <CalendarBlank size={31} weight="duotone" />
              </div>
              <h2 className="max-w-sm font-heading text-4xl leading-[1.05] text-jungle-deep sm:text-5xl">
                Manifest perjalanan PKKMB
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-moss sm:text-base">
                Empat hari kegiatan, tersusun seperti rute ekspedisi agar waktu dan lokasi mudah dipindai.
              </p>
              <Link
                href="/jadwal"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-jungle-deep transition-colors hover:text-ember"
              >
                Buka jadwal lengkap
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>

            <div className="relative border-l border-moss/20 pl-5 sm:pl-8">
              {schedule.slice(0, 3).map((item, index) => (
                <motion.article
                  key={item.hari}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={reduceMotion ? false : { opacity: 0, x: 24 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: reduceMotion ? 0 : 0.45 }}
                  className="group relative grid gap-3 border-b border-moss/15 py-7 first:pt-0 sm:grid-cols-[5rem_1fr]"
                >
                  <span className="absolute left-[-1.58rem] top-8 size-3 rounded-full border-2 border-warm-cream bg-sunlit-gold sm:left-[-2.45rem]" />
                  <div>
                    <span className="font-heading text-4xl leading-none text-jungle-deep/20">
                      0{item.hari}
                    </span>
                    <p className="mt-1 text-xs font-semibold text-ember">{item.tanggal}</p>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl leading-tight text-jungle-deep">{item.kegiatan}</h3>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-moss">
                      <span className="inline-flex items-center gap-1.5"><Clock size={14} />{item.waktu}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{item.lokasi}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </SectionBody>
      </div>

      {/* ============ KOMPAS SPOTLIGHT ============ */}
      <div className="hub-zone-archive relative">
        <SectionBody>
          <div className="mb-10 max-w-xl">
            <h2 className="font-heading text-4xl leading-tight text-jungle-deep sm:text-5xl">Arsip kehidupan kampus</h2>
            <p className="mt-3 text-sm leading-relaxed text-moss sm:text-base">
              Kenali tempat, komunitas, dan perangkat akademik sebelum hari pertamamu dimulai.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-12">
            {KOMPAS_CATEGORIES.map((item, index) => (
              <motion.article
                key={item.label}
                whileInView={{ opacity: 1, y: 0 }}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: reduceMotion ? 0 : 0.5 }}
                className={`archive-tile relative overflow-hidden rounded-2xl border p-6 ${
                  index === 0
                    ? "border-moss/20 bg-moss/10 md:col-span-7 md:min-h-44"
                    : index === 1
                      ? "border-sunlit-gold/30 bg-sunlit-gold/12 md:col-span-5"
                      : "border-jungle-deep/15 bg-warm-cream/65 md:col-span-5 md:col-start-1 md:col-row-start-2 md:min-h-44"
                }`}
              >
                <div>
                  <div className={`flex size-12 items-center justify-center rounded-full ${item.bg}`}>{item.icon}</div>
                </div>
                <div className="relative mt-8 max-w-sm">
                  <h3 className="font-heading text-2xl text-jungle-deep">{item.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-moss">{item.desc}</p>
                </div>
              </motion.article>
            ))}

            <Link
              href="/kompas"
              className="archive-tile group relative min-h-28 overflow-hidden rounded-2xl border border-jungle-deep/15 bg-jungle-deep p-6 text-warm-cream transition-transform hover:-translate-y-1 md:col-span-7 md:col-start-6 md:col-row-start-2 md:min-h-44"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="flex size-12 items-center justify-center rounded-full bg-warm-cream/10 text-sunlit-gold">
                  <Compass size={22} weight="duotone" />
                </span>
                <ArrowUpRight
                  size={22}
                  className="relative text-sunlit-gold transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
              <div className="relative mt-8 max-w-sm">
                <span className="block font-heading text-2xl leading-tight">Buka seluruh Kompas</span>
                <span className="mt-2 block text-sm leading-relaxed text-warm-cream/58">
                  Lihat semua fasilitas, organisasi, dan platform akademik.
                </span>
              </div>
            </Link>
          </div>
        </SectionBody>
      </div>

      {/* ============ GALERI ============ */}
      <div className="hub-zone-gallery relative text-warm-cream">
        <SectionBody>
          <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-5 flex size-14 items-center justify-center rounded-full border border-warm-cream/15 text-sunlit-gold">
                <Camera size={27} weight="duotone" />
              </div>
              <h2 className="font-heading text-4xl leading-tight sm:text-5xl">Potongan suasana kampus</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-warm-cream/65">
                Sebuah contact sheet kecil dari ruang, kegiatan, dan kehidupan mahasiswa.
              </p>
            </div>
            <Link
              href="/galeri"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sunlit-gold hover:text-warm-cream"
            >
              Lihat semua foto
              <ArrowUpRight size={16} weight="bold" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
            {GALLERY_PLACEHOLDERS.map((item, index) => (
              <motion.div
                key={item.id}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: reduceMotion ? 0 : 0.45 }}
                className="contact-frame bg-warm-cream p-2 pb-3 text-jungle-deep shadow-xl shadow-jungle-shadow/30 sm:p-3 sm:pb-4"
              >
                <div className="relative flex aspect-4/5 items-center justify-center overflow-hidden bg-sage/20">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_25%,rgba(243,196,107,0.32),transparent_30%),linear-gradient(145deg,rgba(26,58,43,0.08),rgba(78,112,83,0.28))]" />
                  <ImageIcon className="relative size-8 text-jungle-deep/35" />
                  <span className="absolute left-2 top-2 font-heading text-lg text-jungle-deep/30">0{index + 1}</span>
                </div>
                <p className="mt-3 text-[10px] font-medium leading-tight sm:text-xs">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </SectionBody>
      </div>

      {/* ============ FAQ ============ */}
      <div className="hub-zone-faq relative">
        <SectionBody>
          <div className="grid gap-10 md:grid-cols-[0.78fr_1.22fr] md:gap-16">
            <div>
              <div className="relative mb-7 flex size-20 items-center justify-center rounded-full border border-jungle-deep/15 bg-warm-cream">
                <Question size={38} weight="duotone" className="text-jungle-deep" />
                <Leaf size={20} weight="fill" className="absolute -right-1 top-0 rotate-24 text-sunlit-gold" />
              </div>
              <h2 className="font-heading text-4xl leading-tight text-jungle-deep sm:text-5xl">Bekal sebelum berangkat</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-moss">
                Jawaban singkat untuk hal yang paling sering ditanyakan mahasiswa baru.
              </p>
              <Link
                href="/faq"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-jungle-deep hover:text-ember"
              >
                Buka pusat pertanyaan
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>

            <Accordion className="border-t border-jungle-deep/15">
              {faqs.slice(0, 3).map((item, index) => (
                <motion.div
                  key={item.id}
                  whileInView={{ opacity: 1, x: 0 }}
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07, duration: reduceMotion ? 0 : 0.42 }}
                >
                  <AccordionItem
                    value={`hub-faq-${item.id}`}
                    className="border-b border-jungle-deep/15"
                  >
                    <AccordionTrigger className="w-full items-start gap-4 py-5 font-heading text-xl leading-snug text-jungle-deep hover:no-underline">
                      <span className="flex flex-1 items-start gap-4">
                        <span className="mt-1 shrink-0 font-heading text-sm text-ember">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{item.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pl-10 pr-5 text-sm leading-relaxed text-moss">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </SectionBody>
      </div>

      {/* Easter egg modal */}
      <AnimatePresence>
        {easterModal && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-jungle-shadow/60 backdrop-blur-sm px-6"
            onClick={() => setEasterModal(null)}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 300, damping: 20 }
              }
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-fern-mist bg-warm-cream p-6 text-center shadow-xl sm:p-8"
            >
              <Leaf size={42} weight="duotone" className="mx-auto mb-4 text-moss" />
              <h3 className="font-heading text-xl text-jungle-deep mb-3">
                Jalan Rahasia Terbuka!
              </h3>
              <p className="text-sm text-moss font-sans leading-relaxed mb-6">
                Kamu menemukan jalan rahasia di balik dedaunan...{" "}
                <span className="font-medium text-jungle-deep">{easterModal.label}</span> telah terbuka!
              </p>
              <motion.button
                onClick={handleEasterGo}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                className="rounded-full bg-sunlit-gold text-jungle-deep px-8 py-3 text-sm font-sans font-medium tracking-wide hover:bg-ember transition-colors"
              >
                Lanjutkan
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
