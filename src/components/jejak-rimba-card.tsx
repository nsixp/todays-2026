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

const BORDER_COLORS: Record<AvatarId, string> = {
  monyet: "border-yellow-600/60 hover:border-yellow-600",
  burung: "border-blue-400/60 hover:border-blue-400",
  rusa: "border-emerald-500/60 hover:border-emerald-500",
  harimau: "border-orange-500/60 hover:border-orange-500",
  "kupu-kupu": "border-pink-400/60 hover:border-pink-400",
  ular: "border-purple-500/60 hover:border-purple-500",
}

interface JejakRimbaCardProps {
  pilihan: JejakRimbaPilihan
  index: number
  onSelect: () => void
  disabled: boolean
}

export default function JejakRimbaCard({ pilihan, index, onSelect, disabled }: JejakRimbaCardProps) {
  const Icon = ICON_MAP[pilihan.icon]
  const borderColor = BORDER_COLORS[pilihan.icon]

  return (
    <motion.button
      initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -8 : 8 }}
      animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -4 : 4 }}
      exit={{ opacity: 0, scale: 0.8, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: index * 0.08,
      }}
      whileHover={disabled ? {} : { scale: 1.08, y: -8 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={disabled ? undefined : onSelect}
      disabled={disabled}
      className={`relative flex flex-col items-center gap-2 w-28 sm:w-32 shrink-0 rounded-2xl border-2 bg-white/80 backdrop-blur-sm p-4 shadow-md transition-shadow ${
        borderColor
      } disabled:opacity-50 disabled:cursor-default cursor-pointer hover:shadow-lg`}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12">
        <Icon className="w-full h-full" />
      </div>
      <span className="text-[11px] sm:text-xs font-heading text-jungle-deep text-center leading-tight">
        {pilihan.text}
      </span>
    </motion.button>
  )
}
