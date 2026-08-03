"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowUp,
  Compass,
  EnvelopeSimple,
  Globe,
  InstagramLogo,
  MapPin,
  Phone,
  YoutubeLogo,
} from "@/components/icons/streamline"
import BackgroundFoliage from "@/components/background-foliage"
import { Button } from "@/components/ui/button"

const SITEMAP = [
  { label: "Hub", href: "/hub" },
  { label: "Guidebook", href: "/guidebook" },
  { label: "Quiz", href: "/quiz" },
  { label: "Kompas", href: "/kompas" },
  { label: "Galeri", href: "/galeri" },
  { label: "Jadwal", href: "/jadwal" },
  { label: "FAQ", href: "/faq" },
  { label: "Cari Kelompok", href: "/kelompok" },
]

const SOCIALS = [
  {
    label: "Telkom University Purwokerto Website",
    href: "https://purwokerto.telkomuniversity.ac.id/",
    icon: Globe,
  },
  {
    label: "TODAYS Instagram",
    href: "https://www.instagram.com/todays.telupurwokerto/",
    icon: InstagramLogo,
  },
  {
    label: "Telkom University Purwokerto Youtube",
    href: "https://www.youtube.com/@TelkomUniversityPurwokerto",
    icon: YoutubeLogo,
  },
]

const FOOTER_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.58,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.08,
    },
  },
}

const FOOTER_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.46, ease: [0.16, 1, 0.3, 1] as const },
  },
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export default function Footer() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.footer
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={FOOTER_VARIANTS}
      className="relative mt-auto overflow-hidden bg-jungle-deep px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-12 font-sans text-warm-cream sm:px-6 sm:pt-14 lg:px-8"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sunlit-gold/55 to-transparent" />
      <BackgroundFoliage variant="canopy-top" opacity={0.045} color="var(--color-warm-cream)" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-10 border-b border-warm-cream/10 pb-10 md:grid-cols-12 md:gap-8">
          <motion.div variants={FOOTER_ITEM_VARIANTS} className="md:col-span-5">
            <Link href="/hub" className="inline-flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-warm-cream/10 text-sunlit-gold ring-1 ring-warm-cream/12">
                <Compass size={21} weight="duotone" />
              </span>
              <span className="font-heading text-2xl tracking-tight">TODAYS 2026</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-warm-cream/58">
              Panduan interaktif PKKMB Telkom University Purwokerto untuk memulai perjalanan kampusmu.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIALS.map((social) => {
                const Icon = social.icon

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={reduceMotion ? undefined : { y: -2, rotate: -3 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                    className="flex size-11 items-center justify-center rounded-xl border border-warm-cream/12 bg-warm-cream/5 text-warm-cream/62 transition-colors hover:border-sunlit-gold/45 hover:bg-sunlit-gold hover:text-jungle-deep"
                    aria-label={social.label}
                  >
                    <Icon size={17} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          <motion.nav variants={FOOTER_ITEM_VARIANTS} className="md:col-span-4" aria-label="Sitemap footer">
            <h2 className="mb-4 text-xs font-semibold text-sunlit-gold">Jelajahi</h2>
            <div className="grid grid-cols-1 gap-x-5 gap-y-1 min-[23rem]:grid-cols-2">
              {SITEMAP.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduceMotion ? 0 : 0.16 + index * 0.035 }}
                >
                  <Link
                    href={item.href}
                    className="inline-flex min-h-10 items-center text-sm text-warm-cream/58 transition-colors hover:text-warm-cream"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>

          <motion.div
            variants={FOOTER_ITEM_VARIANTS}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="rounded-2xl border border-warm-cream/12 bg-warm-cream/5 p-5 md:col-span-3"
          >
            <h2 className="text-xs font-semibold text-sunlit-gold">Kontak panitia</h2>
            <div className="mt-4 space-y-3.5 text-sm text-warm-cream/58">
              <a href="https://maps.app.goo.gl/8NskKq6Xjpg4Pf6s8" className="flex items-start gap-2.5 leading-relaxed transition-colors hover:text-warm-cream">
                <MapPin size={16} className="mt-0.5 shrink-0 text-warm-cream/38" weight="duotone" />
                Telkom University Purwokerto
              </a>
              <a
                href="mailto:pkkmb@telkomuniversity.ac.id"
                className="flex items-start gap-2.5 break-all leading-relaxed transition-colors hover:text-warm-cream"
              >
                <EnvelopeSimple size={16} className="mt-0.5 shrink-0 text-warm-cream/38" weight="duotone" />
                pkkmb@telkomuniversity.ac.id
              </a>
              <a
                href="tel:(0281) 641 629"
                className="flex items-start gap-2.5 break-all leading-relaxed transition-colors hover:text-warm-cream"
              >
                <Phone size={16} className="mt-0.5 shrink-0 text-warm-cream/38" weight="duotone" />
                (0281) 641 629
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={FOOTER_ITEM_VARIANTS}
          className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-1 text-[11px] text-warm-cream/35">
            <p>TODAYS 2026. PKKMB Telkom University Purwokerto.</p>
            <a
              href="https://www.streamlinehq.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-6 items-center transition-colors hover:text-warm-cream/65"
            >
              Ikon oleh Streamline
            </a>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="min-h-11 w-fit gap-2 rounded-xl px-3 text-xs text-warm-cream/48 hover:bg-warm-cream/8 hover:text-warm-cream"
          >
            <ArrowUp size={13} />
            Kembali ke atas
          </Button>
        </motion.div>
      </div>
    </motion.footer>
  )
}
