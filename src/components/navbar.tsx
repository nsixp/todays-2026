"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const NAV_ITEMS = [
  { label: "JunglePedia", href: "/junglepedia" },
  { label: "Galeri", href: "/galeri" },
  { label: "Jadwal", href: "/jadwal" },
  { label: "FAQ", href: "/faq" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-6 px-6 py-4 bg-warm-cream/80 backdrop-blur-md border-b border-fern-mist/50">
      <Link href="/hub" className="font-heading text-lg text-jungle-deep tracking-tight">
        TODAYS 2026
      </Link>

      <div className="hidden sm:flex items-center gap-6">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs font-sans tracking-wider uppercase transition-colors ${
                isActive ? "text-jungle-deep font-medium" : "text-moss hover:text-jungle-deep"
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>

      <button
        onClick={() => setSidebarOpen(true)}
        className="sm:hidden flex items-center justify-center w-8 h-8 text-moss hover:text-jungle-deep transition-colors"
        aria-label="Buka menu"
      >
        <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-jungle-shadow/30 z-50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-64 bg-warm-cream z-50 shadow-xl border-l border-fern-mist/50"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-fern-mist/50">
                <span className="font-heading text-base text-jungle-deep">Menu</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-moss hover:text-jungle-deep transition-colors"
                  aria-label="Tutup menu"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-2 p-6">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-sans tracking-wider transition-colors ${
                        isActive
                          ? "bg-white text-jungle-deep font-medium shadow-sm"
                          : "bg-white/60 text-moss hover:bg-white hover:text-jungle-deep"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
