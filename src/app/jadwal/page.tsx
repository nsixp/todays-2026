"use client"

import { motion, useReducedMotion } from "framer-motion"
import { CalendarBlank, Clock, FlagCheckered, MapPin } from "@/components/icons/streamline"
import { getSchedule } from "@/lib/data"

const schedule = getSchedule()

export default function JadwalPage() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="schedule-manifest-surface min-h-dvh pb-24 pt-24">
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="grid min-h-92 items-center gap-8 py-8 md:grid-cols-[1fr_auto] md:py-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ember">
              Rute empat hari
            </span>
            <h1 className="mt-4 max-w-2xl font-heading text-4xl leading-[1.02] text-jungle-deep sm:text-5xl lg:text-6xl">
              Datang tepat waktu, pulang membawa cerita.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-moss sm:text-base">
              Simpan waktu dan lokasi setiap kegiatan agar perjalanan PKKMB tetap lancar.
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, rotate: 5, scale: 0.92 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.12, duration: reduceMotion ? 0 : 0.65 }}
            className="calendar-ticket relative mx-auto w-56 overflow-hidden rounded-2xl border border-jungle-deep/15 bg-warm-cream shadow-xl shadow-jungle-shadow/10"
            aria-label="PKKMB dimulai 12 Agustus 2026"
          >
            <div className="flex items-center justify-between bg-jungle-deep px-5 py-3 text-warm-cream">
              <CalendarBlank size={19} className="text-sunlit-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">Agustus 2026</span>
            </div>
            <div className="px-5 py-7 text-center">
              <span className="block font-heading text-8xl leading-none text-jungle-deep">12</span>
              <span className="mt-2 block text-xs font-semibold text-ember">Hari pertama</span>
            </div>
            <div className="border-t border-dashed border-jungle-deep/20 px-5 py-3 text-center text-[10px] text-moss">
              Telkom University Purwokerto
            </div>
          </motion.div>
        </section>

        <section className="border-t border-jungle-deep/15 pt-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-3xl text-jungle-deep sm:text-4xl">Itinerary kegiatan</h2>
              <p className="mt-2 text-sm text-moss">Empat pemberhentian utama selama masa orientasi.</p>
            </div>
            <FlagCheckered size={30} weight="duotone" className="shrink-0 text-ember" />
          </div>

          <div className="grid gap-4 sm:gap-5">
            {schedule.map((item, index) => (
              <motion.article
                key={item.hari}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.07, duration: reduceMotion ? 0 : 0.46 }}
                className={`schedule-card group grid overflow-hidden rounded-2xl border border-jungle-deep/12 md:grid-cols-[7rem_1fr_auto] ${
                  index % 2 === 0 ? "bg-warm-cream/78" : "bg-sage/12"
                }`}
              >
                <div className="flex items-center gap-3 border-b border-jungle-deep/10 px-5 py-4 md:block md:border-b-0 md:border-r md:py-5">
                  <span className="font-heading text-4xl leading-none text-jungle-deep/22">0{item.hari}</span>
                  <span className="text-xs font-semibold text-ember md:mt-2 md:block">Hari {item.hari}</span>
                </div>

                <div className="px-5 py-4 md:px-6 md:py-5">
                  <p className="text-xs font-semibold text-moss">{item.tanggal}</p>
                  <h3 className="mt-1.5 max-w-2xl font-heading text-xl leading-tight text-jungle-deep sm:text-2xl">
                    {item.kegiatan}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-moss">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={15} weight="duotone" />
                      {item.waktu}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={15} weight="duotone" />
                      {item.lokasi}
                    </span>
                  </div>
                </div>

                <div className="hidden items-center px-6 md:flex">
                  <span className="h-px w-12 bg-jungle-deep/20 transition-all group-hover:w-16 group-hover:bg-sunlit-gold" />
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
