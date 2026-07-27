import type { AvatarId } from "@/types"

const TITLES: Record<string, string[]> = {
  harimau: ["Maharaja Rimba", "Sang Penguasa Hutan", "Raja Belantara"],
  rusa: ["Penjelajah Sejati", "Ksatria Hutan", "Perantau Rimba"],
  burung: ["Petualang Tangguh", "Sang Penemu", "Pejalan Hijau"],
  monyet: ["Penghuni Baru", "Si Mata Elang", "Pelajar Rimba"],
}

function hashName(nama: string): number {
  let hash = 0
  for (let i = 0; i < nama.length; i++) {
    hash = ((hash << 5) - hash + nama.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export function getBadgeIcon(score: number, total: number): AvatarId {
  const pct = score / total
  if (pct === 1) return "harimau"
  if (pct >= 0.75) return "rusa"
  if (pct >= 0.5) return "burung"
  return "monyet"
}

export function getBadgeTitle(score: number, total: number, nama: string): string {
  const icon = getBadgeIcon(score, total)
  const options = TITLES[icon]
  return options[hashName(nama) % options.length]
}
