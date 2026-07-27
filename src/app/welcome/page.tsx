"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const BABAK = [
  {
    title: "Hutan Rimba Menanti",
    body: "Selamat datang, Pejuang Rimba. PKKMB Telkom University Purwokerto 2026 akan membawamu menjelajahi hutan pengetahuan dan petualangan baru.",
    bg: "from-jungle-deep/5 to-warm-cream",
  },
  {
    title: "Jalur Setapak",
    body: "Ikuti setiap langkah. Baca guidebook, taklukkan quiz, dan raih badge kebanggaanmu. Setiap petualang punya jalannya sendiri.",
    bg: "from-warm-cream to-fern-mist/30",
  },
  {
    title: "Tiga Titik Cahaya",
    body: "Guidebook, Quiz, dan Cari Kelompok — tiga pilar perjalananmu. Selesaikan satu per satu, dan hutan akan membuka jalannya.",
    bg: "from-fern-mist/30 to-warm-cream",
  },
]

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="min-h-dvh">
      {BABAK.map((babak, i) => (
        <motion.section
          key={i}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`flex min-h-dvh flex-col items-center justify-center px-6 py-24 bg-gradient-to-b ${babak.bg}`}
        >
          <div className="max-w-lg text-center">
            <span className="text-xs text-moss font-sans tracking-widest uppercase mb-2 block">
              Babak {i + 1}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl text-jungle-deep mb-4">
              {babak.title}
            </h2>
            <p className="text-sm sm:text-base text-moss/80 leading-relaxed">
              {babak.body}
            </p>
          </div>
        </motion.section>
      ))}

      <div className="flex items-center justify-center pb-24 bg-warm-cream">
        <button
          onClick={() => router.push("/avatar")}
          className="rounded-full bg-jungle-deep text-warm-cream px-8 py-3 text-sm font-sans font-medium tracking-wide hover:bg-moss transition-colors"
        >
          Mulai Petualangan
        </button>
      </div>
    </div>
  )
}
