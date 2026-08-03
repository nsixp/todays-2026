"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  IdentificationBadge,
  MapPinArea,
  Student,
  User,
  UsersThree,
  WhatsappLogo,
} from "@/components/icons/streamline"
import { useProgress } from "@/hooks/use-progress"
import { getParticipantByNim, getKelompok, getParticipants } from "@/lib/data"
import { Button } from "@/components/ui/button"
import Harimau from "@/components/icons/harimau"
import Rusa from "@/components/icons/rusa"
import Burung from "@/components/icons/burung"
import Monyet from "@/components/icons/monyet"
import KupuKupu from "@/components/icons/kupu-kupu"

const GROUP_ICONS = [Harimau, Rusa, Burung, Monyet, KupuKupu]

const MOTION_EASE = [0.23, 1, 0.32, 1] as const

const gridReveal = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.08,
    },
  },
}

const cardReveal = {
  hidden: {
    opacity: 0,
    transform: "translateY(18px) scale(0.975)",
  },
  show: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    transition: {
      duration: 0.46,
      ease: MOTION_EASE,
    },
  },
}

const nestedReveal = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const memberReveal = {
  hidden: {
    opacity: 0,
    transform: "translateX(-12px)",
  },
  show: {
    opacity: 1,
    transform: "translateX(0px)",
    transition: {
      duration: 0.34,
      ease: MOTION_EASE,
    },
  },
}

export default function KelompokPage() {
  const router = useRouter()
  const reduceMotion = useReducedMotion()
  const { progress } = useProgress()
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!progress.quizDone) router.replace("/hub")
  }, [progress.quizDone, router])

  if (!progress.quizDone) return null

  const participant = getParticipantByNim(progress.nim)
  const kelompokInfo = participant
    ? getKelompok().find((kelompok) => kelompok.nomor_kelompok === participant.nomor_kelompok)
    : null
  const anggota = participant
    ? getParticipants().filter(
        (anggotaKelompok) => anggotaKelompok.nomor_kelompok === participant.nomor_kelompok
      )
    : []
  const GroupIcon = kelompokInfo
    ? GROUP_ICONS[(kelompokInfo.nomor_kelompok - 1) % GROUP_ICONS.length]
    : UsersThree

  if (!started) {
    return (
      <main className="kelompok-surface relative flex min-h-dvh items-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-36 -bottom-40 size-136 rounded-full border border-jungle-deep/8" />
        <div className="pointer-events-none absolute -left-14 -bottom-20 size-88 rounded-full border border-jungle-deep/8" />

        <motion.section
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, transform: "translateY(24px) scale(0.98)" }
          }
          animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
          transition={{ duration: reduceMotion ? 0.18 : 0.52, ease: MOTION_EASE }}
          className="relative mx-auto grid w-full max-w-5xl overflow-hidden rounded-4xl border border-fern-mist bg-warm-cream shadow-2xl shadow-jungle-shadow/12 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-sunlit-gold p-6 sm:min-h-80 sm:p-8">
            <div className="absolute size-72 rounded-full border border-jungle-deep/10" />
            <div className="absolute size-52 rounded-full border border-jungle-deep/10" />
            <div className="absolute size-32 rounded-full border border-jungle-deep/10" />
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      transform: [
                        "translateY(0px) rotate(-1deg)",
                        "translateY(-7px) rotate(1deg)",
                        "translateY(0px) rotate(-1deg)",
                      ],
                    }
              }
              whileHover={
                reduceMotion
                  ? { opacity: 0.9 }
                  : { transform: "translateY(-5px) rotate(-2deg) scale(1.035)" }
              }
              transition={
                reduceMotion
                  ? { duration: 0.14 }
                  : {
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="relative flex size-44 items-center justify-center rounded-full bg-warm-cream/65 shadow-xl shadow-ember/10"
            >
              <GroupIcon className="size-32" />
            </motion.div>
            <span className="absolute bottom-7 left-8 font-heading text-6xl leading-none text-jungle-deep/10">
              {participant ? String(participant.nomor_kelompok).padStart(2, "0") : "?"}
            </span>
          </div>

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="flex items-center gap-3 text-moss">
              <IdentificationBadge size={22} weight="duotone" />
              <span className="text-xs font-semibold">Pos pembagian kelompok</span>
            </div>
            <h1 className="mt-6 max-w-lg text-balance font-heading text-4xl leading-[1.02] text-jungle-deep sm:text-6xl">
              Temukan regu perjalananmu
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-moss">
              Kenali identitas kelompok, mentor pendamping, dan teman yang akan berjalan
              bersamamu selama rangkaian PKKMB.
            </p>

            <motion.div
              whileHover={
                reduceMotion
                  ? { opacity: 0.92 }
                  : { transform: "translateY(-3px)" }
              }
              whileTap={reduceMotion ? { opacity: 0.82 } : { transform: "scale(0.985)" }}
              transition={{ duration: 0.16, ease: MOTION_EASE }}
              className="mt-8 flex items-center gap-3 rounded-2xl border border-fern-mist bg-white/55 p-4"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-jungle-deep text-warm-cream">
                <CheckCircle size={20} weight="duotone" />
              </span>
              <span>
                <span className="block text-[10px] text-moss">Identitas terdeteksi</span>
                <span className="block text-sm font-semibold text-jungle-deep">
                  {participant?.nama ?? (progress.nama || "Peserta PKKMB")}
                </span>
              </span>
            </motion.div>

            <Button
              onClick={() => setStarted(true)}
              className="mt-7 h-12 w-full rounded-full bg-jungle-deep px-7 text-warm-cream hover:bg-moss"
            >
              Buka Identitas Kelompok
              <ArrowRight />
            </Button>
          </div>
        </motion.section>
      </main>
    )
  }

  return (
    <main className="kelompok-surface relative min-h-dvh overflow-hidden px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="relative mx-auto w-full max-w-6xl mt-16">
        {participant && kelompokInfo ? (
          <motion.div
            variants={gridReveal}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]"
          >
            <motion.section
              variants={cardReveal}
              whileHover={
                reduceMotion
                  ? { opacity: 0.98 }
                  : { transform: "translateY(-4px) scale(1.004)" }
              }
              transition={{ duration: 0.2, ease: MOTION_EASE }}
              className="overflow-hidden rounded-4xl bg-jungle-deep text-warm-cream shadow-2xl shadow-jungle-shadow/18"
            >
              <div className="relative overflow-hidden border-b border-warm-cream/10 px-6 py-8 sm:px-9 sm:py-10">
                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : { transform: ["scale(1)", "scale(1.08)", "scale(1)"] }
                  }
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-20 -top-24 size-72 rounded-full bg-jungle-canopy/70"
                />
                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : { transform: ["rotate(0deg)", "rotate(8deg)", "rotate(0deg)"] }
                  }
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -right-6 -top-10 size-48 rounded-full border border-sunlit-gold/18"
                />
                <div className="relative grid items-center gap-7 sm:grid-cols-[1fr_11rem]">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-jungle-mist">
                      <MapPinArea size={17} weight="duotone" />
                      Kelompok {kelompokInfo.nomor_kelompok}
                    </div>
                    <h1 className="mt-4 max-w-xl text-balance font-heading text-4xl leading-[1.02] sm:text-6xl">
                      {kelompokInfo.nama_kelompok}
                    </h1>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-warm-cream/70">
                      {kelompokInfo.deskripsi}
                    </p>
                  </div>

                  <motion.div
                    whileHover={
                      reduceMotion
                        ? { opacity: 0.92 }
                        : { transform: "rotate(-3deg) scale(1.055)" }
                    }
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                    className="relative mx-auto flex size-40 items-center justify-center rounded-full bg-sunlit-gold"
                  >
                    <motion.div
                      animate={
                        reduceMotion
                          ? undefined
                          : { transform: ["scale(1)", "scale(1.045)", "scale(1)"] }
                      }
                      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -inset-3 rounded-full border border-sunlit-gold/30"
                    />
                    <GroupIcon className="relative size-28" />
                  </motion.div>
                </div>
              </div>

              <motion.div
                variants={nestedReveal}
                className="grid gap-px bg-warm-cream/10 sm:grid-cols-3"
              >
                <motion.div
                  variants={memberReveal}
                  whileHover={reduceMotion ? undefined : { transform: "translateY(-2px)" }}
                  className="bg-jungle-deep p-5"
                >
                  <span className="text-[10px] text-jungle-mist">Nomor regu</span>
                  <p className="mt-1 font-heading text-3xl text-sunlit-gold">
                    {String(kelompokInfo.nomor_kelompok).padStart(2, "0")}
                  </p>
                </motion.div>
                <motion.div
                  variants={memberReveal}
                  whileHover={reduceMotion ? undefined : { transform: "translateY(-2px)" }}
                  className="bg-jungle-deep p-5"
                >
                  <span className="text-[10px] text-jungle-mist">Jumlah anggota</span>
                  <p className="mt-1 font-heading text-3xl">{anggota.length} orang</p>
                </motion.div>
                <motion.div
                  variants={memberReveal}
                  whileHover={reduceMotion ? undefined : { transform: "translateY(-2px)" }}
                  className="bg-jungle-deep p-5"
                >
                  <span className="text-[10px] text-jungle-mist">Status</span>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-warm-cream">
                    <motion.span
                      initial={reduceMotion ? false : { transform: "scale(0.9)", opacity: 0 }}
                      animate={{ transform: "scale(1)", opacity: 1 }}
                      transition={{ type: "spring", duration: 0.5, bounce: 0.2, delay: 0.38 }}
                    >
                      <CheckCircle size={17} weight="fill" className="text-sunlit-gold" />
                    </motion.span>
                    Terverifikasi
                  </p>
                </motion.div>
              </motion.div>
            </motion.section>

            <motion.aside
              variants={nestedReveal}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1"
            >
              <motion.article
                variants={cardReveal}
                whileHover={
                  reduceMotion
                    ? { opacity: 0.96 }
                    : { transform: "translateY(-5px) rotate(-0.35deg)" }
                }
                whileTap={reduceMotion ? { opacity: 0.84 } : { transform: "scale(0.985)" }}
                transition={{ duration: 0.18, ease: MOTION_EASE }}
                className="forest-panel rounded-4xl p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <motion.div
                    whileHover={reduceMotion ? undefined : { transform: "rotate(-8deg) scale(1.08)" }}
                    transition={{ type: "spring", duration: 0.45, bounce: 0.2 }}
                    className="flex size-11 items-center justify-center rounded-2xl bg-sunlit-gold text-jungle-deep"
                  >
                    <Student size={23} weight="duotone" />
                  </motion.div>
                  <span className="text-[10px] font-semibold text-moss">Mentor kelompok</span>
                </div>
                <p className="mt-7 font-heading text-3xl leading-tight text-jungle-deep">
                  {kelompokInfo.mentor}
                </p>
                <p className="mt-1 text-xs text-moss">{kelompokInfo.prodi_mentor}</p>
              </motion.article>

              <motion.article
                variants={cardReveal}
                whileHover={
                  reduceMotion
                    ? { opacity: 0.96 }
                    : { transform: "translateY(-5px) rotate(0.35deg)" }
                }
                whileTap={reduceMotion ? { opacity: 0.84 } : { transform: "scale(0.985)" }}
                transition={{ duration: 0.18, ease: MOTION_EASE }}
                className="rounded-4xl bg-sunlit-gold p-6 text-jungle-deep"
              >
                <div className="flex items-center justify-between gap-4">
                  <motion.div
                    whileHover={reduceMotion ? undefined : { transform: "rotate(7deg) scale(1.08)" }}
                    transition={{ type: "spring", duration: 0.45, bounce: 0.2 }}
                    className="flex size-11 items-center justify-center rounded-2xl bg-warm-cream/65"
                  >
                    <IdentificationBadge size={23} weight="duotone" />
                  </motion.div>
                  <span className="text-[10px] font-semibold text-jungle-deep/65">Kartu peserta</span>
                </div>
                <p className="mt-7 font-heading text-3xl leading-tight">{participant.nama}</p>
                <p className="mt-1 text-xs text-jungle-deep/70">{participant.prodi}</p>
                <p className="mt-4 border-t border-jungle-deep/12 pt-4 font-mono text-xs tracking-[0.12em]">
                  {participant.nim}
                </p>
              </motion.article>
            </motion.aside>

            <motion.section
              variants={cardReveal}
              whileHover={reduceMotion ? { opacity: 0.99 } : { transform: "translateY(-3px)" }}
              transition={{ duration: 0.2, ease: MOTION_EASE }}
              className="forest-panel rounded-4xl p-6 sm:p-8 lg:col-span-2"
            >
              <div className="flex flex-col justify-between gap-4 border-b border-jungle-deep/10 pb-6 sm:flex-row sm:items-end">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-moss">
                    <UsersThree size={19} weight="duotone" />
                    Daftar regu
                  </div>
                  <h2 className="mt-2 font-heading text-3xl text-jungle-deep">Teman seperjalanan</h2>
                </div>
                <p className="max-w-xs text-xs leading-relaxed text-moss/70">
                  Simpan nama mereka. Regu ini akan menjadi lingkar terdekatmu selama PKKMB.
                </p>
              </div>

              <motion.div
                variants={nestedReveal}
                className="mt-6 grid gap-3 md:grid-cols-2"
              >
                {anggota.map((anggotaKelompok, index) => {
                  const isCurrentUser = anggotaKelompok.nim === participant.nim

                  return (
                    <motion.div
                      key={anggotaKelompok.nim}
                      variants={memberReveal}
                      whileHover={
                        reduceMotion
                          ? { opacity: 0.94 }
                          : {
                              transform: "translateX(5px)",
                            }
                      }
                      whileTap={reduceMotion ? { opacity: 0.82 } : { transform: "scale(0.985)" }}
                      transition={{ duration: 0.16, ease: MOTION_EASE }}
                      className={`flex items-center gap-4 rounded-2xl border p-4 ${
                        isCurrentUser
                          ? "border-sunlit-gold bg-sunlit-gold/12"
                          : "border-fern-mist bg-white/45"
                      }`}
                    >
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${
                          isCurrentUser
                            ? "bg-sunlit-gold text-jungle-deep"
                            : "bg-fern-mist/55 text-moss"
                        }`}
                      >
                        {isCurrentUser ? (
                          <User size={18} weight="fill" />
                        ) : (
                          <span className="text-xs font-bold">{String(index + 1).padStart(2, "0")}</span>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold text-jungle-deep">
                            {anggotaKelompok.nama}
                          </span>
                          {isCurrentUser && (
                            <span className="rounded-full bg-jungle-deep px-2 py-0.5 text-[9px] font-semibold text-warm-cream">
                              Kamu
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs text-moss/70">
                          {anggotaKelompok.prodi}
                        </span>
                      </span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.section>

            <motion.div
              variants={cardReveal}
              className="flex flex-col gap-3 sm:flex-row sm:justify-end lg:col-span-2"
            >
              <Button
                variant="outline"
                onClick={() => router.push("/hub")}
                className="h-12 rounded-full border-jungle-deep/15 bg-warm-cream/70 px-6 text-moss hover:bg-white"
              >
                <ArrowLeft />
                Kembali ke Jungle Hub
              </Button>
              <a
                href={kelompokInfo.link_grup_wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#247A45] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#1D6338]"
              >
                <WhatsappLogo size={20} weight="fill" />
                Gabung Grup WhatsApp
              </a>
            </motion.div>
          </motion.div>
        ) : (
          <motion.section
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: "translateY(16px)" }
            }
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: reduceMotion ? 0.18 : 0.4, ease: MOTION_EASE }}
            className="forest-panel mx-auto max-w-lg rounded-4xl p-8 text-center"
          >
            <IdentificationBadge className="mx-auto size-10 text-ember" weight="duotone" />
            <h1 className="mt-5 font-heading text-3xl text-jungle-deep">
              Data kelompok belum ditemukan
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-moss">
              Identitasmu belum terhubung dengan kelompok. Hubungi panitia untuk melakukan
              pengecekan.
            </p>
            <Button
              onClick={() => router.push("/hub")}
              className="mt-7 h-11 rounded-full bg-jungle-deep px-6 text-warm-cream hover:bg-moss"
            >
              Kembali ke Jungle Hub
            </Button>
          </motion.section>
        )}
      </div>
    </main>
  )
}
