"use client"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BackgroundFoliage from "@/components/background-foliage"

const FOLIAGE_ROUTES: Record<string, "canopy-top" | "vines-side" | "leaves-corner"> = {
  "/hub": "canopy-top",
  "/welcome": "canopy-top",
  "/badge": "canopy-top",
  "/jadwal": "leaves-corner",
  "/faq": "leaves-corner",
  "/avatar": "vines-side",
  "/kelompok": "leaves-corner",
  "/junglepedia": "vines-side",
  "/galeri": "vines-side",
  "/jejak-rimba": "canopy-top",
}

const NO_NAVBAR = ["/", "/guidebook", "/quiz", "/jejak-rimba"]
const NO_FOOTER = ["/", "/guidebook", "/quiz", "/jejak-rimba"]

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion()
  const pathname = usePathname()
  const showNavbar = !NO_NAVBAR.includes(pathname)
  const showFooter = !NO_FOOTER.includes(pathname)
  const foliageVariant = FOLIAGE_ROUTES[pathname]

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="relative flex flex-col min-h-dvh">
        {foliageVariant && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <BackgroundFoliage variant={foliageVariant} />
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex-1"
          >
            {children}
          </motion.div>
        </AnimatePresence>
        {showFooter && <Footer />}
      </div>
    </>
  )
}
