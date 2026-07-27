# JunglePedia — Content Structure Spec

## Overview

JunglePedia adalah halaman informasi kampus untuk mahasiswa baru, padanan dari PIONIRPEDIA milik UGM. Menampilkan informasi tentang fasilitas kampus, UKM/organisasi, dan platform akademik dalam format filterable card grid. Akses bebas tanpa unlock.

## Categories

### 1. Fasilitas Kampus (`fasilitas`)
Informasi tentang sarana dan prasarana kampus Telkom University Purwokerto.

| Item | Deskripsi |
|------|-----------|
| Gedung Kuliah | Ruang kelas, laboratorium, dan auditorium |
| Perpustakaan | Koleksi buku, akses jurnal online, ruang baca |
| Masjid/Musholla | Fasilitas ibadah di area kampus |
| UKS / Klinik | Layanan kesehatan mahasiswa |
| Kantin | Tempat makan dan area istirahat |
| Olahraga | Lapangan, gym, fasilitas olahraga |

### 2. UKM & Organisasi (`ukm`)
Informasi tentang kegiatan kemahasiswaan.

| Item | Deskripsi |
|------|-----------|
| BEM | Badan Eksekutif Mahasiswa |
| HIMA | Himpunan Mahasiswa per jurusan |
| UKM Olahraga | Futsal, basket, voli, dll |
| UKM Seni | Teater, musik, tari, dll |
| UKM IT | Kelompok studi teknologi informasi |
| Relawan | Kegiatan sosial dan relawan |

### 3. Platform Akademik (`platform`)
Informasi tentang platform digital kampus.

| Item | Deskripsi |
|------|-----------|
| EduRoom / iBird | E-learning untuk akses materi kuliah |
| Portal Akademik | Akses KHS, KRS, jadwal kuliah |
| Email Kampus | Email resmi mahasiswa |
| SIAKAD | Sistem Informasi Akademik |
| Perpus Digital | Akses jurnal dan e-book |

## Data JSON Structure

File: `data/junglepedia.json`

```json
[
  {
    "id": 1,
    "kategori": "fasilitas",
    "judul": "Gedung Kuliah",
    "deskripsi": "Ruang kelas modern dengan LCD proyektor, AC, dan akses Wi-Fi di seluruh gedung.",
    "icon": "gedung"
  },
  {
    "id": 2,
    "kategori": "fasilitas",
    "judul": "Perpustakaan",
    "deskripsi": "Koleksi buku akademik lengkap, akses jurnal online, ruang baca nyaman.",
    "icon": "buku"
  }
]
```

## UI Spec

### Page Layout
- **Hero:** Judul "JunglePedia" + deskripsi "Kenali kampusmu lebih dekat"
- **Filter Tabs:** Tiga tombol kategory + "Semua"
  - Semua | Fasilitas | UKM | Platform Akademik
  - Active tab: bg-sunlit-gold, text-jungle-deep
  - Inactive: border-fern-mist, text-moss
- **Card Grid:**
  - Mobile: 2 columns
  - Tablet: 2 columns
  - Desktop: 3 columns
  - Gap: 4 (16px)

### Card Design
- Border: 2px, rounded-2xl
- Default: border-fern-mist, bg-white/60
- Hover: border-sunlit-gold, shadow-sm
- Inside: icon SVG (32x32) + judul (text-sm font-medium) + deskripsi (text-xs text-moss)

### Animations
- Staggered card entrance via Framer Motion, delay berdasarkan index
- `initial: { opacity: 0, y: 20 }`, `animate: { opacity: 1, y: 0 }`
- Transition: 0.4s easeOut, delay: index * 0.05

## TypeScript Types

```typescript
interface JunglePediaItem {
  id: number
  kategori: "fasilitas" | "ukm" | "platform"
  judul: string
  deskripsi: string
  icon: string
}
```

## File Locations

| File | Path |
|------|------|
| Data JSON | `data/junglepedia.json` |
| Page | `src/app/junglepedia/page.tsx` |
| Card component | `src/components/junglepedia-card.tsx` |
| Types | `src/types/index.ts` |
| Data loader | `src/lib/data.ts` |

## Content Notes

- Semua konten dummy bisa diupdate panitia tanpa deploy ulang — cukup edit `data/junglepedia.json`
- Ikon menggunakan inline SVG sederhana (bisa lucide-react atau custom SVG)
- Hindari teks terlalu panjang di deskripsi (maks 2 kalimat per item)
