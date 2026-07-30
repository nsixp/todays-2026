"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, LayoutGroup, useReducedMotion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu"
import {
  ArrowLeftIcon as ArrowLeft,
  CalendarBlankIcon as CalendarBlank,
  CompassIcon as Compass,
  ImageIcon,
  ListIcon as List,
  QuestionIcon as Question,
} from "@phosphor-icons/react"

const NAV_ITEMS = [
  { label: "JunglePedia", href: "/junglepedia" },
  { label: "Galeri", href: "/galeri" },
  { label: "Jadwal", href: "/jadwal" },
  { label: "FAQ", href: "/faq" },
]

const ICONS: Record<string, React.ReactNode> = {
  "/junglepedia": <Compass size={16} />,
  "/galeri": <ImageIcon size={16} />,
  "/jadwal": <CalendarBlank size={16} />,
  "/faq": <Question size={16} />,
}

export default function Navbar() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)

  function close() {
    setOpen(false)
  }

  return (
    <LayoutGroup>
      <motion.nav
        initial={reduceMotion ? false : { opacity: 0, y: -18, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ duration: reduceMotion ? 0 : 0.52, ease: [0.16, 1, 0.3, 1] }}
        className="forest-nav fixed left-1/2 top-3 z-50 flex w-[calc(100%-24px)] max-w-5xl items-center justify-between gap-4 rounded-2xl border border-fern-mist/70 bg-warm-cream/88 px-2.5 py-2 backdrop-blur-xl sm:top-4 sm:px-3"
      >
        <Link href="/hub" className="group flex shrink-0 items-center gap-2.5 rounded-xl px-1.5 py-1 text-jungle-deep">
          <motion.span
            whileHover={reduceMotion ? undefined : { rotate: -7, scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            className="flex size-8 items-center justify-center rounded-lg bg-jungle-deep text-sunlit-gold"
          >
            <Compass size={17} weight="duotone" />
          </motion.span>
          <span className="font-heading text-lg tracking-tight">TODAYS 2026</span>
        </Link>

        {/* Desktop */}
        <NavigationMenu className="hidden sm:flex">
          <NavigationMenuList className="gap-0.5 rounded-xl border border-jungle-deep/6 bg-jungle-deep/4 p-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                      isActive ? "text-warm-cream" : "text-moss hover:bg-warm-cream/70 hover:text-jungle-deep"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-jungle-deep shadow-sm"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 32 }
                        }
                      />
                    )}
                    <span className={`relative ${isActive ? "text-sunlit-gold" : "text-sage"}`}>{ICONS[item.href]}</span>
                    <span className="relative">{item.label}</span>
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl border border-jungle-deep/10 bg-jungle-deep/4 text-jungle-deep hover:bg-jungle-deep hover:text-warm-cream"
                  aria-label="Buka menu"
                >
                  <List size={20} />
                </Button>
              }
            />
            <SheetContent side="right" className="flex w-80 flex-col gap-0 border-l border-fern-mist/60 bg-warm-cream p-0 shadow-2xl">
              {/* Header */}
              <SheetHeader className="border-b border-fern-mist/35 px-6 py-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-jungle-deep text-sunlit-gold">
                    <Compass size={18} weight="duotone" />
                  </span>
                  <SheetTitle className="font-heading text-xl text-jungle-deep">Navigasi Rimba</SheetTitle>
                </div>
                <SheetDescription className="mt-2 max-w-56 text-xs leading-relaxed text-moss">
                  Temukan informasi kampus dan kebutuhan PKKMB.
                </SheetDescription>
              </SheetHeader>

              {/* Links */}
              <div className="flex flex-1 flex-col gap-1.5 px-4 pt-5">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                  const icon = ICONS[item.href]
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={close}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all active:translate-y-px ${
                        isActive
                          ? "bg-jungle-deep text-warm-cream shadow-sm"
                          : "text-moss hover:bg-sage/10 hover:text-jungle-deep"
                      }`}
                    >
                      <span className={`size-4 shrink-0 ${isActive ? "text-sunlit-gold" : "text-sage"}`}>{icon}</span>
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              {/* Bottom */}
              <div className="mt-auto border-t border-fern-mist/35 px-4 pb-6 pt-4">
                <Link
                  href="/hub"
                  onClick={close}
                  className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs font-semibold text-moss transition-colors hover:bg-sage/10 hover:text-jungle-deep"
                >
                  <ArrowLeft size={14} />
                  Kembali ke Hub
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </LayoutGroup>
  )
}
