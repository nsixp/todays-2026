"use client"

import { motion } from "framer-motion"
import type { JejakRimbaPilihan, AvatarId } from "@/types"
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
  monyet: { border: "border-yellow-700/40", shadow: "rgba(161,98,7,0.15)" },
  burung: { border: "border-sky-500/40", shadow: "rgba(14,165,233,0.15)" },
  rusa: { border: "border-emerald-600/40", shadow: "rgba(5,150,105,0.15)" },
  harimau: { border: "border-orange-500/40", shadow: "rgba(249,115,22,0.15)" },
  "kupu-kupu": { border: "border-pink-400/50", shadow: "rgba(219,39,119,0.15)" },
  ular: { border: "border-purple-500/40", shadow: "rgba(147,51,234,0.15)" },
}

interface JejakRimbaCardProps {
  pilihan: JejakRimbaPilihan
  index: number
  total: number
  onSelect: () => void
  disabled: boolean
  selected?: boolean
}

export default function JejakRimbaCard({ pilihan, index, total, onSelect, disabled, selected }: JejakRimbaCardProps) {
  const Icon = ICON_MAP[pilihan.icon]
  const style = CARD_STYLES[pilihan.icon]
  const fanAngle = total > 1 ? (index - (total - 1) / 2) * 3.5 : 0
  const yOffset = total > 1 ? -Math.abs(index - (total - 1) / 2) * 3 : 0

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 80, rotate: fanAngle - 10 }}
      animate={
        selected
          ? { opacity: 0, scale: 0.5, y: -80, rotate: 0 }
          : { opacity: 1, y: yOffset, rotate: fanAngle }
      }
      exit={{ opacity: 0, scale: 0.5, y: -60, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 22,
        delay: index * 0.07,
      }}
      whileHover={
        disabled || selected
          ? {}
          : {
              scale: 1.08,
              y: yOffset - 18,
              rotate: 0,
              transition: { type: "spring", stiffness: 350, damping: 12 },
            }
      }
      whileTap={disabled || selected ? {} : { scale: 0.95 }}
      onClick={disabled ? undefined : onSelect}
      disabled={disabled}
      className={`group relative flex flex-col items-center w-[8.5rem] sm:w-40 shrink-0 rounded-xl border-2 bg-white cursor-pointer disabled:cursor-default select-none transition-shadow duration-300 ${
        style.border
      } ${selected ? "opacity-0 pointer-events-none" : ""}`}
      style={{
        boxShadow: `0 4px 16px ${style.shadow}, inset 0 0 0 1px rgba(255,255,255,0.6)`,
        backgroundImage: `linear-gradient(to bottom, #fff, #fff)`,
      }}
    >
      {/* Top accent strip */}
      <div className="absolute top-0 left-2 right-2 h-[2px] rounded-full bg-linear-to-r from-transparent via-sunlit-gold/30 to-transparent" />

      {/* Corner top-left */}
      <div className="absolute top-2 left-2 flex items-center gap-0.5">
        <div className="w-4 h-4 opacity-50 group-hover:opacity-80 transition-opacity duration-300">
          <Icon className="w-full h-full" />
        </div>
      </div>

      {/* Center icon */}
      <div className="flex-1 flex items-center justify-center w-full pt-6 pb-2">
        <div className="w-14 h-14 sm:w-16 sm:h-16 opacity-80 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
          <Icon className="w-full h-full" />
        </div>
      </div>

      {/* Divider */}
      <div className="w-12 h-px bg-linear-to-r from-transparent via-fern-mist/50 to-transparent" />

      {/* Action text */}
      <span className="text-xs sm:text-sm font-heading text-jungle-deep text-center leading-snug px-3 pb-4 pt-2 line-clamp-2">
        {pilihan.text}
      </span>

      {/* Corner bottom-right */}
      <div className="absolute bottom-2 right-2 w-4 h-4 rotate-180 opacity-50 group-hover:opacity-80 transition-opacity duration-300">
        <Icon className="w-full h-full" />
      </div>
    </motion.button>
  )
}
