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
    → Home (3 menu: guidebook, quiz, cari kelompok)
      ├── Guidebook   → ✅ terbuka dari awal
      ├── Quiz        → 🔒 unlock: 3x klik ATAU password "RIMBA2026"
      └── Cari Kelompok → 🔒 unlock: 3x klik ATAU password "RIMBA2026"
```

**Completion condition:** Guidebook selesai ✅ + Quiz selesai ✅ + Kelompok ditemukan ✅ → Pop-up sukses dengan link WA pembimbing.

## 3. Functional Requirements

### F1: Splash Screen
- Animasi logo TODAYS (fade-in + scale)
- Teks sambutan setelah logo muncul
- Auto-redirect ke onboarding setelah 3 detik

### F2: Onboarding
- Grid 6 avatar hewan hutan (pilih salah satu)
- Input NIM dengan validasi 10-12 digit angka
- Cek NIM terhadap database (groups.json)
- Error state jika NIM tidak terdaftar
- Simpan avatar + NIM ke store

### F3: Home
- Tampilkan avatar + NIM user
- 3 kartu menu: Guidebook, Quiz, Cari Kelompok
- Status per menu: Terbuka / Terkunci / Selesai
- Progress bar (tanaman merambat)
- Unlock modal: input password ATAU 3x klik di luar modal

### F4: Guidebook
- Layout buku digital dengan halaman flip
- 4 halaman konten (info TODAYS, jadwal, struktur, tips)
- Password "RIMBA2026" tersembunyi di halaman 2
- Tombol "Selesai Membaca" di halaman terakhir

### F5: Quiz
- 5 soal pilihan ganda
- Jika terkunci: unlock modal (password / 3x klik)
- Feedback per jawaban (benar/salah)
- Skor di akhir

### F6: Cari Kelompok
- Loading animation (~1.5 detik)
- Tampilkan: nomor + nama kelompok, pembimbing + WA, daftar anggota (nama, NIM, prodi)
- Ambil data berdasarkan NIM dari store

### F7: Completion Popup
- Muncul otomatis di Home saat 3/3 misi selesai
- Animasi confetti (CSS)
- Tampilkan link WA pembimbing
- Tombol "Hubungi Pembimbing" dan "Tutup"

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
- Desktop-first, responsive ke mobile
- Bundle ringan (< 100KB JS)
- Zero server (static site)
- Animasi smooth di perangkat mid-range
- Font: Poppins (heading), Inter (body)

## 6. Success Metrics
- User dapat menyelesaikan flow dari splash → popup sukses
- Semua state unlock/complete persist selama session
- NIM validasi akurat terhadap data
