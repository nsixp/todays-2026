import Link from "next/link"

const SITEMAP = [
  { label: "Hub", href: "/hub" },
  { label: "Guidebook", href: "/guidebook" },
  { label: "Quiz", href: "/quiz" },
  { label: "JunglePedia", href: "/junglepedia" },
  { label: "Galeri", href: "/galeri" },
  { label: "Jadwal", href: "/jadwal" },
  { label: "FAQ", href: "/faq" },
  { label: "Cari Kelompok", href: "/kelompok" },
]

const SOSMED = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "TikTok", href: "https://tiktok.com" },
]

export default function Footer() {
  return (
    <footer className="bg-jungle-deep text-warm-cream font-sans px-6 py-12 mt-auto">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="font-heading text-xl tracking-tight">TODAYS 2026</h3>
          <p className="mt-2 text-sm text-warm-cream/60 leading-relaxed">
            Telkom Orientation Days — PKKMB Telkom University Purwokerto.
            Petualangan rimba mahasiswa baru.
          </p>
        </div>
        <div>
          <h4 className="text-xs text-sunlit-gold font-sans tracking-widest uppercase mb-4">Sitemap</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {SITEMAP.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-warm-cream/70 hover:text-warm-cream transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs text-sunlit-gold font-sans tracking-widest uppercase mb-4">Kontak & Sosial Media</h4>
          <p className="text-sm text-warm-cream/70 leading-relaxed mb-4">
            Panitia PKKMB Telkom University Purwokerto
            <br />
            Email: pkkmb@telkomuniversity.ac.id
          </p>
          <div className="flex flex-wrap gap-4">
            {SOSMED.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-warm-cream/70 hover:text-warm-cream transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-warm-cream/10 text-center text-xs text-warm-cream/40">
        TODAYS 2026 — PKKMB Telkom University Purwokerto
      </div>
    </footer>
  )
}
