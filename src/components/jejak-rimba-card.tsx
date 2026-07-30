"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, CheckCircle } from "@phosphor-icons/react"
import type { AvatarId, JejakRimbaPilihan } from "@/types"
import Monyet from "@/components/icons/monyet"
import Burung from "@/components/icons/burung"
import Rusa from "@/components/icons/rusa"
import Harimau from "@/components/icons/harimau"
import KupuKupu from "@/components/icons/kupu-kupu"
import Ular from "@/components/icons/ular"

const ICON_MAP: Record<AvatarId, typeof Monyet> = {
  monyet: Monyet,
  burung: Burung,
  rusa: Rusa,
  harimau: Harimau,
  "kupu-kupu": KupuKupu,
  ular: Ular,
}

interface CardStyle {
  border: string
  shadow: string
}

const CARD_STYLES: Record<AvatarId, CardStyle> = {
  monyet: { border: "border-yellow-700/45", shadow: "rgba(161,98,7,0.2)" },
  burung: { border: "border-sky-600/45", shadow: "rgba(14,165,233,0.2)" },
  rusa: { border: "border-emerald-700/45", shadow: "rgba(5,150,105,0.2)" },
  harimau: { border: "border-orange-600/45", shadow: "rgba(249,115,22,0.2)" },
  "kupu-kupu": { border: "border-pink-500/50", shadow: "rgba(219,39,119,0.2)" },
  ular: { border: "border-purple-600/45", shadow: "rgba(147,51,234,0.2)" },
}

interface JejakRimbaCardProps {
  pilihan: JejakRimbaPilihan
  index: number
  total: number
  onSelect: () => void
  disabled: boolean
  selected?: boolean
}

export default function JejakRimbaCard({
  pilihan,
  index,
  total,
  onSelect,
  disabled,
  selected = false,
}: JejakRimbaCardProps) {
  const reduceMotion = useReducedMotion()
  const Icon = ICON_MAP[pilihan.icon]
  const style = CARD_STYLES[pilihan.icon]
  const fanAngle = total > 1 ? (index - (total - 1) / 2) * 4.5 : 0
  const yOffset = total > 1 ? -Math.abs(index - (total - 1) / 2) * 4 : 0

  return (
    <motion.button
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 64, rotate: fanAngle - 8 }}
      animate={
        selected
          ? { opacity: 1, scale: 0.96, y: -24, rotate: 0 }
          : { opacity: 1, scale: 1, y: yOffset, rotate: fanAngle }
      }
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.86, y: -40, rotate: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 250,
              damping: 22,
              delay: selected ? 0 : index * 0.07,
            }
      }
      whileHover={
        disabled || selected || reduceMotion
          ? undefined
          : {
              scale: 1.055,
              y: yOffset - 16,
              rotate: 0,
              transition: { type: "spring", stiffness: 350, damping: 18 },
            }
      }
      whileTap={disabled || selected || reduceMotion ? undefined : { scale: 0.97 }}
      onClick={disabled ? undefined : onSelect}
      disabled={disabled}
      aria-label={`Pilih jalur ${index + 1}: ${pilihan.text}`}
      className={`group relative flex min-h-52 w-[9.25rem] shrink-0 cursor-pointer select-none flex-col overflow-hidden rounded-2xl border-2 bg-warm-cream text-left transition-[box-shadow,border-color] duration-300 disabled:cursor-default sm:min-h-56 sm:w-44 ${style.border}`}
      style={{
        boxShadow: `0 12px 30px ${style.shadow}, 0 2px 0 rgba(255,255,255,0.5) inset`,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(135deg, rgba(255,255,255,0.6), rgba(247,241,222,0.85))",
        backgroundSize: "100% 7px, 100% 100%",
      }}
    >
      <div className="pointer-events-none absolute inset-1 rounded-[0.75rem] border border-jungle-deep/8" />
      <div className="absolute inset-x-3 top-0 h-px bg-linear-to-r from-transparent via-sunlit-gold/70 to-transparent" />

      <div className="relative z-10 flex items-center justify-between px-3.5 pt-3">
        <span className="flex items-center gap-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-jungle-deep/55">
          <Icon className="size-3.5 opacity-70" />
          Aksi
        </span>
        <span className="font-heading text-lg leading-none text-jungle-deep/35">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center py-2">
        <div className="relative flex size-16 items-center justify-center rounded-full border border-jungle-deep/15 bg-white/45 shadow-[inset_0_0_0_5px_rgba(255,255,255,0.2)] sm:size-[4.5rem]">
          <span className="absolute inset-1 rounded-full border border-dashed border-jungle-deep/12" />
          <Icon className="relative size-11 opacity-90 transition-transform duration-300 group-hover:scale-105 sm:size-12" />
        </div>
      </div>

      <div className="relative z-10 px-3.5">
        <span className="line-clamp-2 block min-h-9 text-center font-heading text-sm leading-snug text-jungle-deep sm:text-[0.95rem]">
          {pilihan.text}
        </span>
      </div>

      <div className="relative z-10 mx-3.5 mt-3 flex items-center justify-between border-t border-jungle-deep/12 py-2.5 font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-jungle-deep/60">
        <span>Pilih jalur</span>
        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" weight="bold" />
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.16 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-jungle-deep/94 text-warm-cream"
          >
            <CheckCircle className="size-8 text-sunlit-gold" weight="fill" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em]">
              Jalur dipilih
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
