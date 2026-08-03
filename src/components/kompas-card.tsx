"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  Books,
  Buildings,
  ChartBar,
  ClipboardText,
  Envelope,
  FirstAid,
  Flask,
  HandsPraying,
  Laptop,
  MaskHappy,
  Mosque,
  SoccerBall,
  UsersThree,
  type StreamlineIcon,
} from "@/components/icons/streamline"
import type { KompasItem } from "@/types"

interface KompasCardProps {
  item: KompasItem
  index: number
}

const ITEM_ICONS: Record<string, StreamlineIcon> = {
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

export default function KompasCard({ item, index }: KompasCardProps) {
  const reduceMotion = useReducedMotion()
  const Icon = ITEM_ICONS[item.icon] ?? Buildings

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: reduceMotion ? 0 : index * 0.06,
        duration: reduceMotion ? 0 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className={`group relative min-h-48 overflow-hidden rounded-2xl border border-jungle-deep/12 p-3 transition-colors duration-300 hover:border-sunlit-gold/55 sm:min-h-44 sm:p-4 ${
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
        <p className="mt-2 line-clamp-4 font-sans text-sm leading-relaxed text-moss sm:line-clamp-3">
          {item.deskripsi}
        </p>
      </div>
    </motion.div>
  )
}
