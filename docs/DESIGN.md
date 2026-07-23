# DESIGN: TODAYS 2026 — Visual & Interaction Design

**Theme:** Hutan Rimba — immersive, warm, adventurous

## 1. Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--hutan-bg` | `#0D2818` | Background utama |
| `--hutan-card` | `#1A4A2E` | Kartu/elevasi |
| `--hutan-aksen` | `#6BAA3D` | Tombol, aksen aktif |
| `--hutan-terang` | `#F5C542` | Highlight, heading |
| `--hutan-cokelat` | `#5C3A21` | Kayu, divider |
| `--hutan-teks` | `#F0F0E8` | Teks utama |
| `--hutan-teks-sekunder` | `#A8C5A0` | Teks kedua |

## 2. Typography

- **Heading:** Poppins (700, 800) — bold, adventurous
- **Body:** Inter (400, 500, 600) — clean, readable
- **Scale:** 12/14/16/18/20/24/32/40 px

## 3. Page Layouts

### Splash (`/`)
- Full screen center
- Logo lingkaran hijau dengan teks TODAYS
- Teks sambutan di bawah
- Background gradient `#0D2818 → #0F331E → #0D2818`

### Onboarding (`/onboarding`)
- Center layout, max-width 400px
- Grid 3×2 avatar cards
- Input field NIM full-width
- Tombol CTA "Mulai Petualangan"

### Home (`/home`) — Forest Crossroads
- **Konsep:** Avatar berdiri di tengah persimpangan hutan. Tiga papan signpost menunjuk ke 3 arah.
- Signpost guidebook menunjuk ke atas-kanan, terbuka dari awal
- Signpost quiz menunjuk ke kiri, terkunci 🔒
- Signpost cari kelompok menunjuk ke kanan, terkunci 🔒
- Background: layered forest scene (canopy, trees, ground) — CSS + SVG, zero images
- Nama menu: label hutan (imersif) + nama asli sebagai subtitle
- Progress bar: 3 lentera/totem di atas scene
- Kunang-kunang floating (partikel CSS kecil warna kuning)

**Layout desktop (full viewport):**
```
      🌿🌿🌿  Canopy  🌿🌿🌿
        🏮🏮🏮 (totem progress)
            │
   ╔════════╧════════╗
   ║  📖 Kitab       ║  ← signpost atas (terbuka)
   ║  Penjelajah     ║
   ║  Guidebook      ║
   ╚════════╤════════╝
            │
╔═════╧══╗  │  ╔══╧═════╗
║ 🧠     ║  │  ║🔍      ║  ← signpost kiri/kanan
║ Ujian  ║──┼──║ Temukan ║    (terkunci)
║ Rimba  ║  │  ║ Suku    ║
║ Quiz   ║  │  ║ Cari    ║
╚════╤═══╝  │  ╚═══╤════╝
     │      │      │
     └──────🧑──────┘
          Ahmad
        Ahmad Fauzi
            │
         (tiang kayu)
```

**Signpost design:**
- Tiang: gradient cokelat `linear-gradient(90deg, #5C3A21, #8B5E3C, #5C3A21)`
- Papan: div dengan border-radius, bayangan, transform rotate()
- Paku: bulatan kecil silver di ujung papan
- Setiap papan bisa diklik → navigasi / modal unlock

**State visual per signpost:**

| State | Tampilan |
|-------|----------|
| Open | Papan hijau terang, jalur bersih |
| Locked | Papan abu-abu gelap, efek semak duri, 🔒 |
| Done | Papan hijau glow, ✅ di samping teks |

**Mobile:** Layout berubah jadi vertikal — avatar di atas, 3 signpost di bawah dalam bentuk kartu menu.

### Guidebook (`/guidebook`)
- Max-width 600px
- Card dengan border aksen
- Navigasi: Previous / Next page
- Tombol "Selesai Membaca" di akhir

### Quiz (`/quiz`)
- Max-width 600px
- Progress bar per soal
- Opsi jawaban stacked buttons
- Feedback warna: hijau (benar), merah (salah)

### Group (`/group`)
- Max-width 600px
- Loading: kompas berputar + text "Mencari kelompok..."
- Card informasi kelompok + daftar anggota

## 4. Interaction Design

### Animations

| Element | Teknik | Durasi |
|---------|--------|--------|
| Logo splash | CSS scale + opacity | 1.2s |
| Page transition | Daun CSS overlay (12 partikel) | 0.6s |
| Signpost muncul | Svelte fly + stagger per papan | 0.5s + 0.15s |
| Signpost hover | CSS scale(1.05) + brightness | 0.2s |
| Unlock modal | Scale + backdrop blur | 0.2s |
| Loading kelompok | CSS bounce infinite | 1.5s |
| Progress totem | CSS scale-up per lentera | 0.5s |
| Confetti popup | CSS keyframe fall | 2-4s |
| Floating leaves | CSS keyframe float | 6-14s infinite |
| Kunang-kunang | CSS keyframe float + glow pulse | 3-7s infinite |

### Menu Names

| Nama Hutan (imersif) | Nama Asli | Ikon |
|----------------------|-----------|------|
| Kitab Penjelajah | Guidebook | 📖 |
| Ujian Rimba | Quiz | 🧠 |
| Temukan Suku | Cari Kelompok | 🔍 |

### Unlock Mechanism

- Modal muncul saat klik signpost terkunci
- Satu-satunya cara unlock: password `RIMBA2026` (ditemukan di guidebook halaman 2)
- Klik di luar modal = tutup (gak unlock)

### State Visual

| State | Signpost Style |
|-------|----------------|
| Open | Papan hijau terang (`bg-hutan-aksen/20`), border glow |
| Locked | Papan gelap (`bg-hutan-card/50 opacity-60`), 🔒 |
| Done | Papan hijau glow (`bg-hutan-aksen/30 ring-2`), ✅ |

## 5. Forest Scene — Layer Composition

Home page menggunakan layered scene untuk efek hutan yang immersive:

| Layer | Isi | Teknik CSS |
|-------|-----|-----------|
| **Sky/Background** | Gradasi hijau tua ke biru samar | `radial-gradient` di `body` |
| **Far trees** | Siluet pohon transparan | Pseudo-elements with `clip-path` / SVG inline |
| **Mid trees** | Pohon lebih gelap di kiri-kanan | `::before` `::after` with fixed |
| **Ground** | Jalan tanah, rumput | Gradient horizontal `linear-gradient` |
| **Canopy** | Daun besar frame atas | Overflow hidden, CSS shapes |
| **Signpost** | Tiang + 3 papan arah | Div dengan CSS transform rotate |
| **Avatar** | User di tengah persimpangan | Emoji + nama + nama asli |

## 6. Immersive Elements

- **Floating leaves:** 6 partikel CSS dengan posisi/acak/kecepatan acak di background
- **Kunang-kunang:** Partikel CSS kecil warna `#F5C542` dengan glow + float acak
- **Semak duri (locked):** CSS pseudo-elements + emoji 🌵🔒 di jalur terkunci
- **Vines dekoratif:** SVG atau CSS border di sisi layout
- **Texture noise:** Background pattern subtle via CSS (heropatterns opsional)
- **Glow effect:** Shadow hijau lembut di logo splash dan signpost aktif
- **Totem progress:** 3 lentera/tiang kayu — nyala saat misi selesai
- **Zero images:** Semua efek cukup dengan CSS + emoji + SVG inline
