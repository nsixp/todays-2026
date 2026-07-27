"use client"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHub = pathname === "/hub"
  const hideNavbar = pathname === "/" || pathname === "/guidebook" || pathname === "/quiz"
  const hideFooter = pathname === "/" || pathname === "/guidebook" || pathname === "/quiz"

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={`flex flex-col min-h-dvh ${!hideNavbar && !isHub ? "pt-14" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex-1"
          >
            {children}
          </motion.div>
        </AnimatePresence>
        {!hideFooter && <Footer />}
      </div>
    </>
  )
}
