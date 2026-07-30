"use client"

import Link from "next/link"
import {
  ArrowUp,
  Compass,
  EnvelopeSimple,
  InstagramLogo,
  MapPin,
  YoutubeLogo,
} from "@phosphor-icons/react"
import BackgroundFoliage from "@/components/background-foliage"
import { Button } from "@/components/ui/button"

const SITEMAP = [
  { label: "Hub", href: "/hub" },
  { label: "Guidebook", href: "/guidebook" },
  { label: "Quiz", href: "/quiz" },
  { label: "JunglePedia", href: "/junglepedia" },
  { label: "Galeri", href: "/galeri" },
  { label: "Jadwal", href: "/jadwal" },
  { label: "FAQ", href: "/faq" },
  { label: "Cari Kelompok", href: "/kelompok" },
]

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: InstagramLogo,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: YoutubeLogo,
  },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-jungle-deep px-4 pb-6 pt-14 font-sans text-warm-cream sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sunlit-gold/55 to-transparent" />
      <BackgroundFoliage variant="canopy-top" opacity={0.045} color="var(--color-warm-cream)" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-10 border-b border-warm-cream/10 pb-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
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
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-xl border border-warm-cream/12 bg-warm-cream/5 text-warm-cream/62 transition-colors hover:border-sunlit-gold/45 hover:bg-sunlit-gold hover:text-jungle-deep"
                    aria-label={social.label}
                  >
                    <Icon size={17} />
                  </a>
                )
              })}
            </div>
          </div>

          <nav className="md:col-span-4" aria-label="Sitemap footer">
            <h2 className="mb-4 text-xs font-semibold text-sunlit-gold">Jelajahi</h2>
            <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
              {SITEMAP.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-warm-cream/58 transition-colors hover:text-warm-cream"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="rounded-2xl border border-warm-cream/12 bg-warm-cream/5 p-5 md:col-span-3">
            <h2 className="text-xs font-semibold text-sunlit-gold">Kontak panitia</h2>
            <div className="mt-4 space-y-3.5 text-sm text-warm-cream/58">
              <p className="flex items-start gap-2.5 leading-relaxed">
                <MapPin size={16} className="mt-0.5 shrink-0 text-warm-cream/38" weight="duotone" />
                Telkom University Purwokerto
              </p>
              <a
                href="mailto:pkkmb@telkomuniversity.ac.id"
                className="flex items-start gap-2.5 break-all leading-relaxed transition-colors hover:text-warm-cream"
              >
                <EnvelopeSimple size={16} className="mt-0.5 shrink-0 text-warm-cream/38" weight="duotone" />
                pkkmb@telkomuniversity.ac.id
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-warm-cream/35">
            TODAYS 2026. PKKMB Telkom University Purwokerto.
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="w-fit gap-2 rounded-xl px-3 text-xs text-warm-cream/48 hover:bg-warm-cream/8 hover:text-warm-cream"
          >
            <ArrowUp size={13} />
            Kembali ke atas
          </Button>
        </div>
      </div>
    </footer>
  )
}
