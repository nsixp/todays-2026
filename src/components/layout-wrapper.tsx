"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavbar = pathname === "/" || pathname === "/guidebook" || pathname === "/quiz"

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={!hideNavbar ? "pt-14" : ""}>{children}</div>
    </>
  )
}
