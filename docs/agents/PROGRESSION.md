# Progression

## Unlock Flow

```
Guidebook completed (view all 6 pages)
  → Quiz signpost unlocks

Quiz submitted (any score)
  → Cari Kelompok signpost unlocks
  → Jejak Rimba signpost unlocks
```

- Quiz has 8 multiple-choice questions. Score shown at end as `X/8`.
- No passing threshold — completing the quiz is enough to unlock Cari Kelompok.
- **Quiz cannot be retaken.** Once submitted → redirect to `/badge`. Revisit `/quiz` → redirect to `/badge`.
- Badge (title generator lokal) shown after quiz, then user free to explore.

## Easter Egg

- 3 clicks on any locked signpost → modal appears: "Kamu menemukan jalan rahasia di balik dedaunan... [Fitur] telah terbuka!"
- Instantly unlocks that feature without normal requirements.
- **No UI hint.** Must be organic discovery.

## Revisit Behavior

- Cek localStorage saat `/` di-load.
- Jika **tidak ada progress** (belum input NIM/avatar) → splash 3 detik → `/welcome`.
- Jika **ada progress** (sudah punya NIM + avatar) → splash 1 detik → `/hub`.
- Skip link tersedia di kedua kasus.

## Badge

- Title digenerate secara lokal (no AI API) — array of predefined titles per score range.
- **Title tiers (skor → opsi title):**
  - 8/8: ["Maharaja Rimba", "Sang Penguasa Hutan", "Raja Belantara"]
  - 6-7/8: ["Penjelajah Sejati", "Ksatria Hutan", "Perantau Rimba"]
  - 4-5/8: ["Petualang Tangguh", "Sang Penemu", "Pejalan Hijau"]
  - 0-3/8: ["Penghuni Baru", "Si Mata Elang", "Pelajar Rimba"]
- Pilih title berdasarkan `nama` user (hash sederhana) — konsisten setiap revisit.
- **Icon tiers (score → animal):** 8/8 = harimau, 6-7/8 = rusa, 4-5/8 = burung, 0-3/8 = monyet. Kupu-kupu & ular sebagai cadangan/variasi.
- Title + icon disimpan ke `localStorage.badgeTitle` + `localStorage.badgeIcon` setelah generate.
- Displayed as card + animal icon + title + score.
- Jika user revisit `/badge`, baca dari localStorage — tidak regenerate.
