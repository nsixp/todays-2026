"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "JunglePedia",
    href: "/junglepedia",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <path d="M10 2l8 4v8l-8 4-8-4V6l8-4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M10 2v8l8 4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M2 6l8 4-8 4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Galeri",
    href: "/galeri",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <rect x="2" y="4" width="16" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="7" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M2 14l5-4 3 2.5 3-3.5 5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Jadwal",
    href: "/jadwal",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <rect x="2" y="3" width="16" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M2 7h16M6 1v4M14 1v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M6 11h2M10 11h2M14 11h2M6 14h2M10 14h2M14 14h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "FAQ",
    href: "/faq",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 8.5c0-1.5 4-1.5 4 0 0 1.5-4 1-4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="10" cy="14.5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <LayoutGroup>
      <nav className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-6 px-5 py-2.5 bg-warm-cream/85 backdrop-blur-lg border border-fern-mist/40 rounded-2xl shadow-lg shadow-jungle-deep/5 w-[calc(100%-24px)] sm:w-auto sm:min-w-[640px] lg:min-w-[720px] max-w-4xl">
        {/* Logo */}
        <Link href="/hub" className="font-heading text-lg text-jungle-deep tracking-tight shrink-0">
          TODAYS 2026
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-sans tracking-wider uppercase transition-colors hover:bg-jungle-deep/5"
              >
                <span className="w-3.5 h-3.5 flex items-center justify-center">{item.icon}</span>
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-sunlit-gold"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="sm:hidden flex items-center justify-center w-10 h-10 text-moss hover:text-jungle-deep transition-colors"
          aria-label="Buka menu"
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-jungle-shadow/40 z-50"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed right-0 top-0 bottom-0 w-64 bg-warm-cream z-50 shadow-xl border-l border-fern-mist/50"
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-fern-mist/40">
                  <span className="font-heading text-lg text-jungle-deep">Menu</span>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="w-9 h-9 flex items-center justify-center text-moss hover:text-jungle-deep transition-colors rounded-xl hover:bg-jungle-deep/5"
                    aria-label="Tutup menu"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col gap-1.5 p-4">
                  {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans tracking-wider transition-all ${
                          isActive
                            ? "bg-white text-jungle-deep font-medium shadow-sm border border-fern-mist/30"
                            : "text-moss hover:bg-white/60 hover:text-jungle-deep"
                        }`}
                      >
                        <span className={`w-5 h-5 flex items-center justify-center ${isActive ? "text-sunlit-gold" : ""}`}>
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-fern-mist/30">
                  <Link
                    href="/hub"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-moss font-sans tracking-wider hover:text-jungle-deep transition-colors"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                      <path d="M3 10l7-7 7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 8v7h4v-4h4v4h4V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Kembali ke Hub
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </LayoutGroup>
  )
}
