# PRD: TODAYS 2026 Website

> **Product:** Website interaktif TODAYS (Telkom Orientation Days) 2026
> **Audience:** Mahasiswa baru Telkom University Purwokerto
> **Theme:** Hutan Rimba

## 1. Problem Statement

Mahasiswa baru perlu mengenal TODAYS dan mencari kelompok ospek mereka. Website ini menjadi satu pintu untuk: mendapatkan informasi (guidebook), menguji pengetahuan (quiz), dan menemukan kelompok.

## 2. User Flow

```
Splash Screen (logo + sambutan, auto-redirect 3s)
  → Onboarding (pilih avatar + input NIM, validasi ke DB)
    → Home (3 signpost: guidebook, quiz, cari kelompok)
      ├── Kitab Penjelajah (Guidebook) → ✅ terbuka dari awal
      ├── Ujian Rimba (Quiz)           → 🔒 unlock: password "RIMBA2026"
      └── Temukan Suku (Cari Kelompok) → 🔒 unlock: password "RIMBA2026"
```

**Completion condition:** Guidebook selesai ✅ + Quiz selesai ✅ + Kelompok ditemukan ✅ → Pop-up sukses dengan informasi WA pembimbing.

## 3. Functional Requirements

### F1: Splash Screen
- Animasi logo TODAYS (fade-in + scale)
- Teks sambutan setelah logo muncul
- Auto-redirect ke onboarding setelah 4 detik

### F2: Onboarding
- Grid 6 avatar hewan hutan (pilih salah satu)
- Preview lingkaran avatar yang dipilih di atas grid
- Input NIM dengan validasi 10-12 digit angka
- Cek NIM terhadap database (groups.json)
- Error state jika NIM tidak terdaftar
- Hint teks NIM dummy (2410100001-2410100009)
- Simpan avatar + NIM ke store

### F3: Home — Forest Crossroads
- Full viewport forest scene (h-screen)
- Avatar user berdiri di tengah persimpangan
- 3 signpost (papan penunjuk arah): guidebook, quiz, cari kelompok
- Setiap signpost menampilkan nama hutan (besar) + nama asli (kecil)
- Status per signpost: Terbuka / Terkunci 🔒 / Selesai ✅
- 3 totem/lentera di atas scene sebagai progress indicator
- Floating leaves + kunang-kunang (CSS particles)
- Unlock modal: password "RIMBA2026" — tidak ada easter egg. Klik luar = tutup.

### F4: Guidebook (Kitab Penjelajah)
- Layout buku digital dengan halaman flip
- 4 halaman konten (info TODAYS, jadwal, struktur, tips)
- Password "RIMBA2026" tersembunyi di halaman 2
- Tombol "Selesai Membaca" di halaman terakhir

### F5: Quiz (Ujian Rimba)
- 5 soal pilihan ganda
- Jika terkunci: unlock modal (password only)
- Feedback per jawaban (benar/salah)
- Skor di akhir

### F6: Cari Kelompok (Temukan Suku)
- Loading animation kompas (~1.5 detik)
- Tampilkan: nomor + nama kelompok, pembimbing + nomor WA (teks), daftar anggota (nama, NIM, prodi)
- Ambil data berdasarkan NIM dari store

### F7: Completion Popup
- Muncul otomatis di Home saat 3/3 misi selesai
- Animasi confetti (CSS)
- Tombol ✕ di pojok kanan atas
- Tampilkan nama kelompok, pembimbing + nomor WA
- Tombol "Hubungi Pembimbing" (link WA) dan "Tutup"

## 4. Data Requirements

### Groups JSON
```json
{
  "id": 1,
  "name": "Treetop Troop",
  "mentorName": "Budi Santoso",
  "mentorWa": "6281234567890",
  "members": [{ "nim": "2410100001", "name": "Ahmad Fauzi", "prodi": "Informatika" }]
}
```

### Quiz JSON
```json
{
  "id": 1,
  "question": "Apa kepanjangan TODAYS?",
  "options": ["A", "B", "C", "D"],
  "answer": 1
}
```

### Guidebook JSON
```json
{
  "page": 1,
  "title": "Apa itu TODAYS?",
  "content": "...",
  "illustration": "compass"
}
```

## 5. Non-Functional Requirements
- Desktop-first, responsive ke mobile & tablet
- Full viewport (h-screen) untuk splash, onboarding, home
- Bundle ringan (< 100KB JS)
- Zero server (static site)
- Animasi CSS smooth di perangkat mid-range
- Font: Barlow Condensed (heading), Sora (body)
- Asset hybrid: CSS + SVG inline + pattern gratis. Hanya favicon sebagai file gambar.

## 6. Success Metrics
- User dapat menyelesaikan flow dari splash → popup sukses
- Semua state unlock/complete persist selama session
- NIM validasi akurat terhadap data
- Tampilan full viewport di semua device tanpa ada area putih
