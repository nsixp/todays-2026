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

const NO_NAVBAR = ["/", "/guidebook", "/quiz", "/welcome", "/avatar", "/jejak-rimba", "/kelompok"]
const NO_FOOTER = ["/", "/guidebook", "/quiz", "/welcome", "/avatar", "/jejak-rimba", "/kelompok"]

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHub = pathname === "/hub"
  const showNavbar = !NO_NAVBAR.includes(pathname)
  const showFooter = !NO_FOOTER.includes(pathname)
  const hasTopPadding = showNavbar && !isHub
  const foliageVariant = FOLIAGE_ROUTES[pathname]

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="relative flex flex-col min-h-dvh">
        {foliageVariant && <BackgroundFoliage variant={foliageVariant} />}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className={`relative flex-1 z-10${hasTopPadding ? " pt-14" : ""}`}
          >
            {children}
          </motion.div>
        </AnimatePresence>
        {showFooter && <Footer />}
      </div>
    </>
  )
}
