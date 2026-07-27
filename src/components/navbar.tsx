import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-6 px-6 py-4 bg-warm-cream/80 backdrop-blur-md border-b border-fern-mist/50">
      <Link href="/hub" className="font-heading text-lg text-jungle-deep tracking-tight">
        TODAYS 2026
      </Link>
      <div className="flex items-center gap-6">
        <Link
          href="/jadwal"
          className="text-xs text-moss font-sans tracking-wider uppercase hover:text-jungle-deep transition-colors"
        >
          Jadwal
        </Link>
        <Link
          href="/faq"
          className="text-xs text-moss font-sans tracking-wider uppercase hover:text-jungle-deep transition-colors"
        >
          FAQ
        </Link>
      </div>
    </nav>
  )
}
