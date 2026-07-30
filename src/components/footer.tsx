"use client"

import Link from "next/link"
import { ArrowUp } from "@phosphor-icons/react"

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

const SOSMED = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <rect x="2" y="2" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="15" cy="5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <rect x="1" y="4" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 7l6 3-6 3V7Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M14 2v6a4 4 0 0 1-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M14 8a4 4 0 0 0 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="10" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" />
        <path d="M10 12V2h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

export default function Footer() {
  return (
    <footer className="relative bg-jungle-deep text-warm-cream font-sans px-4 sm:px-6 lg:px-8 pb-8 pt-16 mt-auto overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-sunlit-gold/40 to-transparent" />

      {/* Decorative foliage */}
      <div className="absolute top-0 left-0 right-0 h-12 pointer-events-none opacity-[0.04]" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0 48V24c60 8 120 4 180-4s120-12 180-8 120 8 180 4 120-8 180-12 120 4 180 8 120 4 180-4 120-12 180-8 120 12 180 16v24H0Z" fill="#FBF7EE" />
        </svg>
      </div>

      <div className="mx-auto max-w-5xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
          {/* Brand */}
          <div className="sm:col-span-1">
            <h3 className="font-heading text-xl tracking-tight">TODAYS 2026</h3>
            <p className="mt-2 text-sm text-warm-cream/60 leading-relaxed max-w-xs">
              Telkom Orientation Days — PKKMB Telkom University Purwokerto.
            </p>
            <div className="mt-5 flex gap-3">
              {SOSMED.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-warm-cream/10 flex items-center justify-center text-warm-cream/60 hover:bg-sunlit-gold hover:text-jungle-deep transition-all duration-200"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="text-[10px] text-sunlit-gold/80 font-sans tracking-[0.2em] uppercase mb-4">Sitemap</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {SITEMAP.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-warm-cream/60 hover:text-warm-cream transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-[10px] text-sunlit-gold/80 font-sans tracking-[0.2em] uppercase mb-4">Kontak</h4>
            <p className="text-sm text-warm-cream/60 leading-relaxed">
              Panitia PKKMB
              <br />
              Telkom University Purwokerto
            </p>
            <p className="mt-3 text-sm text-warm-cream/50">
              pkkmb@telkomuniversity.ac.id
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-5 border-t border-warm-cream/8 flex items-center justify-between">
          <p className="text-[11px] text-warm-cream/35">
            TODAYS 2026 — PKKMB Telkom University Purwokerto
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[11px] text-warm-cream/35 hover:text-warm-cream/70 transition-colors"
            aria-label="Kembali ke atas"
          >
            <ArrowUp size={12} />
            Kembali ke atas
          </button>
        </div>
      </div>
    </footer>
  )
}
