"use client"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
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

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHub = pathname === "/hub"
  const hideNavbar = pathname === "/" || pathname === "/guidebook" || pathname === "/quiz"
  const hideFooter = pathname === "/" || pathname === "/guidebook" || pathname === "/quiz"
  const foliageVariant = FOLIAGE_ROUTES[pathname]

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={`relative flex flex-col min-h-dvh ${!hideNavbar && !isHub ? "pt-14" : ""}`}>
        {foliageVariant && <BackgroundFoliage variant={foliageVariant} />}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative flex-1 z-10"
          >
            {children}
          </motion.div>
        </AnimatePresence>
        {!hideFooter && <Footer />}
      </div>
    </>
  )
}
