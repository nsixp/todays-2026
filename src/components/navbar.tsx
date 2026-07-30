"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, LayoutGroup } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu"
import { Compass, Image, CalendarBlank, Question, List, ArrowLeft } from "@phosphor-icons/react"

const NAV_ITEMS = [
  { label: "JunglePedia", href: "/junglepedia" },
  { label: "Galeri", href: "/galeri" },
  { label: "Jadwal", href: "/jadwal" },
  { label: "FAQ", href: "/faq" },
]

const ICONS: Record<string, React.ReactNode> = {
  "/junglepedia": <Compass size={16} />,
  "/galeri": <Image size={16} />,
  "/jadwal": <CalendarBlank size={16} />,
  "/faq": <Question size={16} />,
}

const NAVBAR_BG: Record<string, string> = {
  "/hub": "bg-warm-cream/85",
  "/junglepedia": "bg-sage/20",
  "/galeri": "bg-sunlit-gold/10",
  "/jadwal": "bg-moss/20",
  "/faq": "bg-fern-mist/30",
}

function getNavbarBg(pathname: string): string {
  for (const [route, bg] of Object.entries(NAVBAR_BG)) {
    if (pathname === route || pathname.startsWith(route + "/")) return bg
  }
  return "bg-warm-cream/85"
}

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const navbarBg = getNavbarBg(pathname)

  function close() {
    setOpen(false)
  }

  return (
    <LayoutGroup>
      <nav className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-6 px-5 py-2.5 ${navbarBg} backdrop-blur-lg border border-fern-mist/40 rounded-2xl shadow-lg shadow-jungle-deep/5 w-[calc(100%-24px)] sm:w-auto sm:min-w-160 lg:min-w-180 max-w-4xl transition-colors duration-300`}>
        <Link href="/hub" className="font-heading text-lg text-jungle-deep tracking-tight shrink-0">
          TODAYS 2026
        </Link>

        {/* Desktop */}
        <NavigationMenu className="hidden sm:flex">
          <NavigationMenuList className="gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-sans tracking-wider uppercase transition-colors hover:bg-jungle-deep/5"
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-sunlit-gold"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile */}
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Buka menu">
                  <List size={20} />
                </Button>
              }
            />
            <SheetContent side="right" className="w-72 p-0 flex flex-col gap-0 bg-white border-l border-fern-mist/40 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-fern-mist/20">
                <span className="font-heading text-lg text-jungle-deep">Menu</span>
              </div>

              {/* Links — no background, hanya teks */}
              <div className="flex-1 flex flex-col gap-1 px-4 pt-4">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                  const icon = ICONS[item.href]
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      className={`relative flex items-center gap-3 px-4 py-3.5 text-sm font-sans tracking-wider transition-all ${
                        isActive
                          ? "text-jungle-deep font-medium"
                          : "text-moss/70 hover:text-jungle-deep"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-sunlit-gold" />
                      )}
                      <span className={`w-4 h-4 shrink-0 ${isActive ? "text-sunlit-gold" : "text-sage"}`}>{icon}</span>
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              {/* Bottom */}
              <div className="px-4 pb-6 pt-4 border-t border-fern-mist/20 mt-auto">
                <Link
                  href="/hub"
                  onClick={close}
                  className="flex items-center gap-2.5 px-4 py-3 text-xs text-moss/50 font-sans tracking-wider hover:text-jungle-deep transition-colors"
                >
                  <ArrowLeft size={14} />
                  Kembali ke Hub
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </LayoutGroup>
  )
}
