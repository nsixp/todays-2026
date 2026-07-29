"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import DappledLight from "@/components/dappled-light"
import AmbientParticles from "@/components/ambient-particles"

const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const decorVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
}

function BabakSatu() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const fogY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const canopyScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section
      ref={ref}
      className="relative min-h-dvh snap-start flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ scale: canopyScale }} className="absolute inset-0 bg-gradient-to-b from-jungle-canopy/50 via-jungle-deep/30 to-warm-cream pointer-events-none" />
      <motion.div style={{ y: fogY }} className="absolute inset-0 bg-gradient-to-b from-jungle-mist/20 via-transparent to-transparent pointer-events-none" />

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-jungle-mist/10 blur-3xl pointer-events-none"
          style={{
            width: 200 + i * 120,
            height: 200 + i * 120,
            left: `${15 + i * 30}%`,
            top: `${10 + i * 20}%`,
          }}
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -15, 10, 0],
          }}
          transition={{
            duration: 7 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="relative z-10 text-center px-6 max-w-lg"
      >
        <motion.span variants={childVariants} className="text-xs text-moss font-sans tracking-[0.2em] uppercase mb-3 block">
          Babak 1
        </motion.span>
        <motion.h2 variants={childVariants} className="font-heading text-4xl sm:text-5xl lg:text-6xl text-jungle-deep mb-4 leading-tight">
          Hutan Rimba
        </motion.h2>
        <motion.p variants={childVariants} className="text-sm sm:text-base text-moss/80 leading-relaxed font-sans">
          Selamat datang, Pejuang Rimba. PKKMB Telkom University Purwokerto 2026 akan membawamu menjelajahi hutan pengetahuan dan petualangan baru.
        </motion.p>
      </motion.div>
    </section>
  )
}

function BabakDua() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const fgY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section
      ref={ref}
      className="relative min-h-dvh snap-start flex items-center justify-center overflow-hidden bg-gradient-to-b from-warm-cream to-fern-mist/30"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        {[
          { x: "10%", y: "25%", s: 20 },
          { x: "80%", y: "20%", s: 16 },
          { x: "50%", y: "60%", s: 14 },
          { x: "20%", y: "70%", s: 12 },
          { x: "70%", y: "55%", s: 18 },
        ].map((t, i) => (
          <motion.div
            key={i}
            className="absolute text-fern-mist/30"
            style={{ left: t.x, top: t.y }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <svg viewBox="0 0 40 40" className={`w-${t.s} h-${t.s}`} fill="currentColor">
              <path d="M20 4C12 12 4 20 4 26a16 16 0 0 0 32 0c0-6-8-14-16-22Z" />
            </svg>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        style={{ y: fgY }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="relative z-10 text-center px-6 max-w-lg"
      >
        <motion.span variants={childVariants} className="text-xs text-moss font-sans tracking-[0.2em] uppercase mb-3 block">
          Babak 2
        </motion.span>
        <motion.h2 variants={childVariants} className="font-heading text-4xl sm:text-5xl lg:text-6xl text-jungle-deep mb-4 leading-tight">
          Jalur Setapak
        </motion.h2>
        <motion.p variants={childVariants} className="text-sm sm:text-base text-moss/80 leading-relaxed font-sans">
          Ikuti setiap langkah. Baca guidebook, taklukkan quiz, dan raih badge kebanggaanmu. Setiap petualang punya jalannya sendiri.
        </motion.p>
      </motion.div>
    </section>
  )
}

function BabakTiga() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <section
      ref={ref}
      className="relative min-h-dvh snap-start flex items-center justify-center overflow-hidden bg-gradient-to-b from-fern-mist/30 to-warm-cream"
    >
      <DappledLight count={3} color="#A3C4B5" />
      <motion.div style={{ y: orbY }} className="absolute inset-0 pointer-events-none">
        {[
          { x: "20%", y: "25%", s: 1, d: 0 },
          { x: "75%", y: "20%", s: 0.7, d: 0.5 },
          { x: "45%", y: "65%", s: 1.2, d: 1 },
          { x: "10%", y: "50%", s: 0.5, d: 0.3 },
          { x: "85%", y: "60%", s: 0.8, d: 0.7 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: orb.x,
              top: orb.y,
              width: `${60 * orb.s}px`,
              height: `${60 * orb.s}px`,
              background: `radial-gradient(circle, rgba(243,196,107,${0.5 - i * 0.05}) 0%, rgba(245,213,144,${0.2 - i * 0.03}) 50%, transparent 70%)`,
              boxShadow: `0 0 ${40 * orb.s}px rgba(243,196,107,0.15)`,
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              delay: orb.d,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        className="relative z-10 text-center px-6 max-w-lg"
      >
        <motion.span variants={childVariants} className="text-xs text-moss font-sans tracking-[0.2em] uppercase mb-3 block">
          Babak 3
        </motion.span>
        <motion.h2 variants={childVariants} className="font-heading text-4xl sm:text-5xl lg:text-6xl text-jungle-deep mb-4 leading-tight">
          Tiga Titik Cahaya
        </motion.h2>
        <motion.p variants={childVariants} className="text-sm sm:text-base text-moss/80 leading-relaxed font-sans">
          Guidebook, Quiz, dan Cari Kelompok — tiga pilar perjalananmu. Selesaikan satu per satu, dan hutan akan membuka jalannya.
        </motion.p>
      </motion.div>
    </section>
  )
}

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="h-dvh overflow-y-scroll snap-y snap-mandatory">
      <BabakSatu />
      <BabakDua />
      <BabakTiga />
      <section className="relative min-h-dvh snap-start flex items-center justify-center overflow-hidden bg-warm-cream">
        <div className="absolute inset-0 bg-gradient-to-b from-sunlit-gold/5 via-transparent to-transparent pointer-events-none" />
        <AmbientParticles count={4} colors={["#F3C46B", "#F5D590", "#C47A22"]} />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="relative z-10 text-center px-6 max-w-lg"
        >
          <motion.span variants={childVariants} className="text-xs text-moss font-sans tracking-[0.2em] uppercase mb-3 block">
            Babak 4
          </motion.span>
          <motion.h2 variants={childVariants} className="font-heading text-4xl sm:text-5xl lg:text-6xl text-jungle-deep mb-4 leading-tight">
            Petualanganmu Dimulai
          </motion.h2>
          <motion.p variants={childVariants} className="text-sm sm:text-base text-moss/80 leading-relaxed font-sans mb-8">
            Pilih karaktermu dan melangkahlah ke dalam hutan. Setiap pilihan membentuk jalanmu sendiri.
          </motion.p>
          <motion.div variants={decorVariants}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/avatar")}
              className="rounded-full bg-jungle-deep text-warm-cream px-10 py-3.5 text-sm font-sans font-medium tracking-wide hover:bg-moss transition-colors shadow-lg shadow-jungle-deep/20"
            >
              Mulai Petualangan
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
