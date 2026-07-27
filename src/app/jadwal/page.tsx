import { getSchedule } from "@/lib/data"

export default function JadwalPage() {
  const schedule = getSchedule()

  return (
    <div className="min-h-dvh bg-gradient-to-b from-warm-cream to-sage/20 px-6 py-8">
      <div className="mx-auto max-w-lg">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl text-jungle-deep">Jadwal Kegiatan</h1>
          <p className="text-xs text-moss font-sans mt-1">Rangkaian acara PKKMB 2026</p>
        </div>

        <div className="space-y-4">
          {schedule.map((item) => (
            <div
              key={item.hari}
              className="bg-white/70 rounded-2xl border border-fern-mist p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading text-lg text-sunlit-gold">Hari {item.hari}</span>
                <span className="text-xs text-moss font-sans">{item.tanggal}</span>
              </div>
              <div className="space-y-1 text-sm font-sans">
                <div><span className="text-moss w-20 inline-block">Kegiatan</span><span className="text-jungle-deep">{item.kegiatan}</span></div>
                <div><span className="text-moss w-20 inline-block">Waktu</span><span className="text-jungle-deep">{item.waktu}</span></div>
                <div><span className="text-moss w-20 inline-block">Lokasi</span><span className="text-jungle-deep">{item.lokasi}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
