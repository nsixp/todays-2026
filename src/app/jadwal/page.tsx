"use client"

import { motion } from "framer-motion"
import { Clock, MapPin } from "@phosphor-icons/react"
import { getSchedule } from "@/lib/data"

const schedule = getSchedule()

export default function JadwalPage() {
  return (
    <div className="relative w-full min-h-dvh overflow-x-hidden bg-linear-to-b from-warm-cream to-sage/20 pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-jungle-deep/10 text-[10px] text-moss font-sans tracking-[0.2em] uppercase border border-fern-mist/40 mb-4">
            TODAYS 2026
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl text-jungle-deep leading-tight mb-3">
            Jadwal Kegiatan
          </h1>
          <p className="text-sm text-moss font-sans max-w-md mx-auto leading-relaxed">
            Rangkaian acara PKKMB Telkom University Purwokerto. Catat tanggalnya dan jangan sampai terlewat.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Garis timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-fern-mist/60 hidden sm:block" />

          <div className="space-y-6">
            {schedule.map((item, i) => (
              <motion.div
                key={item.hari}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative flex gap-5 sm:gap-6"
              >
                {/* Day indicator */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-sunlit-gold/60 shadow-sm flex items-center justify-center">
                    <span className="font-heading text-sm text-sunlit-gold">{item.hari}</span>
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0 bg-white/70 backdrop-blur-sm rounded-2xl border border-fern-mist/60 p-5 hover:bg-white/90 hover:border-sunlit-gold/30 transition-all duration-300">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h3 className="font-heading text-base text-jungle-deep">
                      Hari {item.hari}
                    </h3>
                    <span className="text-[11px] text-moss font-sans whitespace-nowrap bg-sage/10 px-2.5 py-1 rounded-full">
                      {item.tanggal}
                    </span>
                  </div>

                  <p className="text-sm font-sans text-jungle-deep mb-3 leading-relaxed">
                    {item.kegiatan}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-sans text-moss">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} className="text-moss shrink-0" />
                      {item.waktu}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={14} className="text-moss shrink-0" />
                      {item.lokasi}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
