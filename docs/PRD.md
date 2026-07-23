# PRD: TODAYS 2026 Website

> **Product:** TODAYS (Telkom Orientation Days) 2026 interactive website
> **Audience:** New students of Telkom University Purwokerto
> **Theme:** Hutan Rimba

## 1. Problem Statement

New students need to learn about TODAYS and find their orientation group. This website is a single entry point for guidebook info, a quiz, and group finding.

## 2. User Flow

```
Splash Screen (logo + sambutan, auto-redirect 3s)
  → Onboarding (pick avatar + input NIM, validate against DB)
    → Home (3 signpost: guidebook, quiz, cari kelompok)
      ├── Kitab Penjelajah (Guidebook) → ✅ terbuka dari awal
      ├── Ujian Rimba (Quiz)           → 🔒 unlock: password "RIMBA2026"
      └── Temukan Suku (Cari Kelompok) → 🔒 unlock: password "RIMBA2026"
```

**Completion:** Guidebook selesai ✅, Quiz selesai ✅, Kelompok ditemukan ✅. Success popup with mentor WA info.

## 3. Functional Requirements

### F1: Splash Screen
- Feels like stepping into a video intro, purely CSS
- Circle clip-path expands from center, revealing the forest gradient
- TODAYS logo scales up with soft glow behind it
- Teks sambutan sweeps in from right via clip-path
- Background gradient shifts subtly to feel alive
- Auto-redirect to /onboarding after 4s

### F2: Onboarding
- 6 forest animal avatar grid (pick one)
- Preview circle for the selected avatar above the grid
- Input NIM with 10-12 digit number validation
- Check NIM against groups.json
- Error state: "NIM tidak terdaftar", "Pilih avatar dulu", "NIM harus 10-12 digit"
- Hint: "Contoh: 2410100001 - 2410100009"
- Save avatar + NIM to store

### F3: Home (Forest Crossroads)
- Full viewport forest scene (h-screen)
- User avatar stands at the crossroads
- 3 signposts: guidebook, quiz, cari kelompok
- Each signpost: forest name (large) + real name (small)
- Status: Terbuka / Terkunci 🔒 / Selesai ✅
- 3 totems or lanterns above the scene
- Floating leaves + kunang-kunang (CSS particles)
- Unlock modal: password "RIMBA2026". No easter egg. Click outside = close.

### F4: Guidebook (Kitab Penjelajah)
- Digital book layout with page flip
- 4 pages: info TODAYS, jadwal, struktur, tips
- Password "RIMBA2026" is hidden on page 2
- "Selesai Membaca" button on the last page

### F5: Quiz (Ujian Rimba)
- 5 multiple choice questions
- If locked, an unlock modal appears (password only)
- Feedback per answer: "Benar!" or "Salah!"
- Final score: "Skor kamu: X/5"

### F6: Cari Kelompok (Temukan Suku)
- Compass loading animation (about 1.5s)
- Loading text: "Mencari kelompokmu di hutan..."
- Show group number and name, mentor + WA number (text), member list (name, NIM, major)
- Fetch data by NIM from store

### F7: Completion Popup
- Auto-shows at Home when 3 of 3 missions done
- Confetti animation (CSS)
- Title: "Misi Selesai!"
- Body: "Selamat! Kamu telah menyelesaikan semua misi TODAYS 2026!"
- Show group name, mentor, WA number
- "📱 Hubungi Pembimbing" button (WA link) and "Tutup" button

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
- Desktop-first, responsive to mobile and tablet
- Full viewport (h-screen) for splash, onboarding, home
- Bundle under 100KB JS
- Zero server (static site)
- Smooth CSS animations on mid-range devices
- Fonts: Barlow Condensed (heading), Sora (body)
- Hybrid assets: CSS + SVG inline + free patterns. Only favicon as image file.

## 6. Success Metrics
- User can complete the flow from splash to success popup
- All unlock and complete states persist during session
- NIM validation accurate against data
- Full viewport on all devices with no white gaps
