"use client"

import { useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import BackgroundFoliage from "@/components/background-foliage"
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
  const fogBgY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const fogFgY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const canopyScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section
      ref={ref}
      className="relative min-h-dvh snap-start flex items-center justify-center overflow-hidden"
    >
      <BackgroundFoliage variant="canopy-top" opacity={0.08} />
      <motion.div style={{ scale: canopyScale }} className="absolute inset-0 bg-gradient-to-b from-jungle-canopy/50 via-jungle-deep/30 to-warm-cream pointer-events-none" />
      <motion.div style={{ y: fogBgY }} className="absolute inset-0 bg-gradient-to-b from-jungle-mist/20 via-transparent to-transparent pointer-events-none" />
      <motion.div style={{ y: fogFgY }} className="absolute inset-0 bg-gradient-to-t from-jungle-mist/15 via-transparent to-transparent pointer-events-none" />

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
          { x: 28, y: 30, s: 10 },
          { x: 72, y: 25, s: 7 },
          { x: 65, y: 50, s: 12 },
          { x: 35, y: 55, s: 8 },
          { x: 70, y: 75, s: 10 },
          { x: 30, y: 70, s: 6 },
        ].map((t, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-sage/30"
            style={{
              left: `${t.x}%`,
              top: `${t.y}%`,
              width: t.s,
              height: t.s,
            }}
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 200 400" className="w-28 sm:w-36 h-4/5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M100 0 C 100 80, 40 120, 40 200 C 40 280, 160 300, 160 400"
            stroke="#8EA98D"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M100 0 C 100 80, 40 120, 40 200 C 40 280, 160 300, 160 400"
            stroke="#F3C46B"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          />
        </svg>
      </div>

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

  const orbs = [
    {
      x: "20%", y: "25%",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10 text-jungle-deep">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      ),
    },
    {
      x: "75%", y: "20%",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10 text-jungle-deep">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      ),
    },
    {
      x: "45%", y: "65%",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 sm:w-10 sm:h-10 text-jungle-deep">
          <circle cx="12" cy="8" r="4" />
          <path d="M20 21a8 8 0 1 0-16 0" />
        </svg>
      ),
    },
  ]

  return (
    <section
      ref={ref}
      className="relative min-h-dvh snap-start flex items-center justify-center overflow-hidden bg-gradient-to-b from-fern-mist/30 to-warm-cream"
    >
      <DappledLight count={3} color="#A3C4B5" />
      <motion.div style={{ y: orbY }} className="absolute inset-0 pointer-events-none">
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full flex items-center justify-center"
            style={{
              left: orb.x,
              top: orb.y,
              width: `${80 + i * 20}px`,
              height: `${80 + i * 20}px`,
              background: `radial-gradient(circle at 30% 30%, rgba(243,196,107,0.6) 0%, rgba(245,213,144,0.3) 50%, transparent 70%)`,
              boxShadow: `0 0 ${50 + i * 20}px rgba(243,196,107,0.2)`,
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.15, 1],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4 + i,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {orb.icon}
            </motion.div>
          </motion.div>
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
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const fogOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 0.87, 1],
    [0, 0.15, 0, 0.15, 0, 0.15, 0, 0.15, 0]
  )

  return (
    <div ref={containerRef} className="relative h-dvh overflow-y-scroll snap-y snap-mandatory">
      <motion.div
        style={{ opacity: fogOpacity }}
        className="fixed inset-0 pointer-events-none z-20 bg-gradient-to-b from-jungle-mist/40 via-jungle-mist/20 to-transparent"
      />

      <BabakSatu />
      <BabakDua />
      <BabakTiga />

      <section className="relative min-h-dvh snap-start flex items-center justify-center overflow-hidden bg-warm-cream">
        <div className="absolute inset-0 bg-gradient-to-b from-sunlit-gold/5 via-transparent to-transparent pointer-events-none" />
        <AmbientParticles count={4} colors={["#F3C46B", "#F5D590", "#C47A22"]} />

        {[
          { x: 42, y: 42, size: 3 },
          { x: 58, y: 48, size: 2 },
          { x: 50, y: 36, size: 2.5 },
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: "#F3C46B",
              boxShadow: `0 0 6px 2px rgba(243,196,107,0.4)`,
            }}
            animate={{
              x: [0, 8, -8, 0],
              y: [0, -12, 4, 0],
              opacity: [0, 0.8, 0.3, 0],
              scale: [0, 1.2, 0.6, 0],
            }}
            transition={{
              duration: 4 + i,
              delay: i * 0.6,
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
