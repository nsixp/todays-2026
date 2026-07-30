"use client"

import { motion } from "framer-motion"
import {
  Buildings,
  Flask,
  Books,
  Mosque,
  FirstAid,
  SoccerBall,
  MaskHappy,
  ClipboardText,
  UsersThree,
  HandsPraying,
  Laptop,
  ChartBar,
  Envelope,
  type Icon,
} from "@phosphor-icons/react"
import type { JunglePediaItem } from "@/types"

interface JunglepediaCardProps {
  item: JunglePediaItem
  index: number
}

const ITEM_ICONS: Record<string, Icon> = {
  "🏛️": Buildings,
  "🔬": Flask,
  "📚": Books,
  "🕌": Mosque,
  "🏥": FirstAid,
  "⚽": SoccerBall,
  "🎭": MaskHappy,
  "📋": ClipboardText,
  "👥": UsersThree,
  "🙏": HandsPraying,
  "💻": Laptop,
  "📊": ChartBar,
  "📧": Envelope,
}

export default function JunglepediaCard({ item, index }: JunglepediaCardProps) {
  const Icon = ITEM_ICONS[item.icon] ?? Buildings

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
      className={`group relative min-h-44 overflow-hidden rounded-2xl border border-jungle-deep/12 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sunlit-gold/55 ${
        index % 4 === 1
          ? "bg-sage/14"
          : index % 4 === 2
            ? "bg-sunlit-gold/9"
            : "bg-warm-cream/75"
      }`}
    >
      <span className="absolute right-4 top-3 font-heading text-3xl leading-none text-jungle-deep/10">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-sage/12 transition-colors group-hover:bg-sunlit-gold/20">
        <Icon size={20} weight="duotone" className="text-jungle-deep" />
      </div>
      <div>
        <h3 className="font-heading text-lg leading-tight text-jungle-deep">
          {item.judul}
        </h3>
        <p className="mt-2 line-clamp-3 font-sans text-xs leading-relaxed text-moss">
          {item.deskripsi}
        </p>
      </div>
    </motion.div>
  )
}
