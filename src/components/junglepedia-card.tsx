"use client"

import { motion } from "framer-motion"
import type { JunglePediaItem } from "@/types"

interface JunglepediaCardProps {
  item: JunglePediaItem
  index: number
}

export default function JunglepediaCard({ item, index }: JunglepediaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
      className="group rounded-2xl border border-fern-mist/60 bg-white/60 p-6 hover:bg-white hover:border-sunlit-gold/40 hover:shadow-lg hover:shadow-sunlit-gold/5 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mb-4 text-xl group-hover:bg-sunlit-gold/20 transition-colors">
        {item.icon}
      </div>
      <h3 className="font-heading text-base text-jungle-deep mb-1.5 group-hover:text-jungle-deep transition-colors">
        {item.judul}
      </h3>
      <p className="text-xs text-moss font-sans leading-relaxed line-clamp-3">
        {item.deskripsi}
      </p>
    </motion.div>
  )
}
