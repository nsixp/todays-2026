# TODAYS 2026

Website interaktif untuk mendampingi mahasiswa baru dalam rangkaian PKKMB Telkom University Purwokerto. TODAYS 2026 menyajikan panduan kegiatan, informasi kampus, kuis, badge, dan pencarian kelompok dalam pengalaman bertema rimba.

## Fitur

- Onboarding mahasiswa baru melalui NIM dan pemilihan avatar.
- Jungle Hub sebagai pusat navigasi.
- Guidebook interaktif seputar PKKMB.
- Kuis pemahaman dan badge personal.
- Informasi kelompok dan mentor.
- Jadwal kegiatan dan FAQ.
- JunglePedia untuk mengenal lingkungan kampus.
- Galeri kegiatan.
- Jejak Rimba, petualangan interaktif dengan cerita bercabang.

## Alur singkat

```text
Splash → Masukkan NIM → Pilih Avatar → Jungle Hub
                                         ├── Guidebook
                                         ├── Kuis & Badge
                                         ├── Kelompok
                                         ├── Jadwal
                                         ├── FAQ
                                         ├── JunglePedia
                                         ├── Galeri
                                         └── Jejak Rimba
```

Progres pengguna tersimpan pada browser sehingga perjalanan dapat dilanjutkan ketika pengguna kembali menggunakan perangkat dan browser yang sama.

## Teknologi

- Next.js dengan App Router
- React dan TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Menjalankan proyek

Pastikan Node.js dan npm sudah tersedia, kemudian jalankan:

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) pada browser.

## Perintah

| Perintah | Keterangan |
| --- | --- |
| `npm run dev` | Menjalankan development server |
| `npm run lint` | Memeriksa kualitas kode |
| `npm run build` | Membuat production build |
| `npm run start` | Menjalankan production build |

## Dokumentasi internal

Dokumentasi teknis dan aturan pengembangan tersedia di:

- [Product Requirements Document](PRD.md)
- [Panduan pengembangan](AGENTS.md)
- [Dokumentasi proyek](docs/agents/)
