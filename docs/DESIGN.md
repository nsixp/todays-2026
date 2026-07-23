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

- **Heading:** Barlow Condensed (600, 700, 800) — bold, condensed, adventurous
- **Body:** Sora (400, 500, 600) — geometric warm, clean, readable
- Keduanya dari Google Fonts, variable weight, ringan

### Heading Scale (Barlow Condensed 700)

| Token | Mobile | Tablet (md) | Desktop (lg) |
|-------|--------|-------------|--------------|
| h1 | 36px / 2.25rem | 48px / 3rem | 64px / 4rem |
| h2 | 28px / 1.75rem | 36px / 2.25rem | 48px / 3rem |
| h3 | 22px / 1.375rem | 26px / 1.625rem | 32px / 2rem |
| h4 | 18px / 1.125rem | 20px / 1.25rem | 24px / 1.5rem |
| h5 | 16px / 1rem | 18px / 1.125rem | 20px / 1.25rem |

### Body Scale (Sora 400)

| Token | Mobile | Tablet (md) | Desktop (lg) |
|-------|--------|-------------|--------------|
| body | 14px / 0.875rem | 15px / 0.9375rem | 16px / 1rem |
| small | 11px / 0.6875rem | 12px / 0.75rem | 13px / 0.8125rem |

### Spacing & Size Tokens

| Token | Value |
|-------|-------|
| Section padding | `p-4` `md:p-6` `lg:p-8` |
| Card padding | `p-5` `md:p-6` |
| Gap antar elemen | `gap-3` `md:gap-4` |
| Max width konten | `max-w-lg` (512px) `md:max-w-xl` (576px) |

### Border Radius

| Elemen | Tailwind |
|--------|----------|
| Cards, panel | `rounded-xl` (12px) |
| Modal, popup | `rounded-2xl` (16px) |
| Tombol | `rounded-lg` (8px) |
| Avatar circle | `rounded-full` |

### Shadows

| Level | Value |
|-------|-------|
| Card | `shadow-lg shadow-black/30` |
| Modal | `shadow-2xl` |
| Glow aksen | `shadow-[0_0_20px_rgba(107,170,61,0.4)]` |
| Signpost | `shadow-md` |

## 3. Full Viewport & Responsive

### Prinsip

| Halaman | Layout | Alasan |
|---------|--------|--------|
| **Splash, Onboarding, Home** | `h-screen` (100vh) | Immersive, gak ada scroll, semua elemen dalam 1 layar |
| **Guidebook, Quiz, Group** | `min-h-screen` | Konten mungkin melebihi layar, scroll kalau perlu |

Semua halaman menggunakan `h-screen` atau `min-h-screen` + `bg-hutan-bg` agar tidak ada area putih di manapun.

### Splash (`/`)
- `h-screen` — center horizontal + vertikal
- Logo TODAYS: lingkaran hijau 80px (mobile) / 100px (tablet) / 130px (desktop) di tengah
- Teks sambutan di bawah logo
- Background: gradient `#0D2818 → #0F331E → #0D2818`
- Floating glow di belakang logo

### Onboarding (`/onboarding`)
- `h-screen` — center horizontal + vertikal
- Preview avatar: lingkaran 72px di atas grid
- Grid avatar: 3×2, max 3 kolom
- Input NIM + tombol di bawah grid
- Scroll otomatis kebawah saat keyboard muncul (mobile)
- Max width: 360px (mobile) / 400px (tablet) / 420px (desktop)

### Home (`/home`) — Forest Crossroads
- **`h-screen`** — forest scene penuh layar, tidak ada scroll
- Elemen diposisikan dengan flex/grid/absolute agar memenuhi viewport

**Layout desktop (lg, ≥1024px):**
```
┌──────────────────────────────────────┐
│    🌲🌲🌲  Canopy  🌲🌲🌲           │ ~10%
│       🏮🏮🏮 (totem progress)        │
│                                      │
│          📖 Kitab Penjelajah         │ ~25%
│            ╱ (signpost up)           │
│           ╱                          │
│  🧠 Ujian ─── 🧑 ─── 🔍 Temukan     │ ~30%
│  Rimba           │    Suku           │
│            (tiang kayu)               │
│                                      │
│    🌿🌿  Ground / rumput  🌿🌿       │ ~35%
└──────────────────────────────────────┘
```

**Layout tablet (md, 768-1023px):**
- Signpost mengerut proporsional (font lebih kecil)
- Jarak antar papan dikurangi
- Scene hutan tetap penuh, layer pohon mengecil

**Layout mobile (<768px):**
- Scene hutan disederhanakan (2 layer instead of 3)
- Signpost berubah jadi **vertical stack** (atas ke bawah)
- Avatar di atas, 3 signpost di bawah dalam format kartu lebar penuh
- Kunang-kunang dihilangkan (performace), floating leaves dikurangi

**Signpost design:**
- Tiang: gradient cokelat `linear-gradient(90deg, #5C3A21, #8B5E3C, #5C3A21)`
- Papan: div dengan border-radius, bayangan, transform rotate()
- Label: nama hutan (Barlow Condensed h3) di baris atas, nama asli (Sora small) di baris bawah
- Paku: bulatan kecil (#C0C0C0) di setiap ujung papan
- Setiap papan bisa diklik → navigasi / modal unlock

**State visual per signpost:**

| State | Tampilan |
|-------|----------|
| Open | Papan hijau terang (`bg-hutan-aksen/20` `border-hutan-aksen`), jalur bersih |
| Locked | Papan gelap (`bg-hutan-card/50 opacity-60`), 🔒 di samping nama |
| Done | Papan hijau glow (`shadow-[0_0_15px_rgba(107,170,61,0.5)]`), ✅ di samping nama |

### Guidebook (`/guidebook`)
- `min-h-screen` — background penuh layar, konten tengah
- Max width: 100% (mobile) / 520px (tablet) / 600px (desktop)
- Card guidebook: `bg-hutan-card` dengan border, padding 24px
- Navigasi Previous/Next di bawah card

### Quiz (`/quiz`)
- `min-h-screen` — background penuh layar, konten tengah
- Max width sama dengan guidebook
- Soal di card, opsi jawaban stacked
- Progress bar tipis di atas card

### Group (`/group`)
- `min-h-screen` — background penuh
- Loading state: center horizontal + vertikal (memenuhi layar)
- Hasil: card tengah, max width 600px desktop

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

## 5. Forest Scene — Layer Composition (z-index)

Home page menggunakan layered scene untuk efek hutan yang immersive. Urutan z-index dari belakang ke depan:

| z-index | Layer | Isi | Teknik |
|---------|-------|-----|--------|
| 0 | **Sky/Background** | Gradasi hijau tua ke biru samar | `radial-gradient` |
| 1 | **Far trees** | Siluet pohon tipis transparan | SVG inline / CSS pseudo |
| 2 | **Mid trees** | Pohon lebih solid di kiri-kanan | SVG inline / CSS pseudo |
| 3 | **Ground** | Jalan tanah + rumput di bawah | `linear-gradient` horizontal |
| 4 | **Canopy** | Daun frame atas (overflow hidden) | CSS shapes / SVG |
| 5 | **Totem progress** | 3 lentera di atas scene | Div absolute |
| 10 | **Signpost** | Tiang + 3 papan arah | Div + CSS transform |
| 15 | **Avatar** | Emoji user + nama + nama asli | Div relative/flex |
| 20 | **Floating leaves** | Partikel daun jatuh | CSS keyframe fixed |
| 25 | **Kunang-kunang** | Partikel cahaya kuning | CSS keyframe fixed |

**Responsive simplification (mobile):**
- Far trees + Mid trees digabung jadi 1 layer
- Kunang-kunang dihilangkan
- Floating leaves dikurangi jadi 3 partikel

**Asset approach (hybrid):**
- Siluet pohon: SVG inline, bisa digenerate AI atau dari undraw.co
- Texture daun (ground): CSS pattern dari heropatterns.com
- Ikon signpost: emoji bawaan
- Pattern kayu: CSS gradient (tanpa gambar)
- Avatar: emoji (versi awal), nanti bisa diganti ilustrasi dari humaaans.com
- Hanya favicon sebagai file gambar (.png)

## 6. Immersive Elements

- **Floating leaves:** 6 partikel CSS keyframe dengan posisi/acak/kecepatan acak. Mobile: 3 partikel.
- **Kunang-kunang:** Partikel CSS kecil warna `#F5C542` dengan glow + float acak. Desktop only.
- **Semak duri (locked):** CSS pseudo-elements + emoji 🌵🔒 di jalur terkunci (desktop) / badge (mobile).
- **Vines dekoratif:** SVG inline di sisi kiri-kanan layout (desktop). Mobile: simplified.
- **Texture noise:** Background pattern subtle via CSS dari heropatterns.com.
- **Glow effect:** `text-shadow` hijau lembut di logo splash (0 0 40px #6BAA3D) dan signpost aktif.
- **Totem progress:** 3 lentera/tiang kayu — scale + glow saat misi selesai.
- **Avatar bounce:** Animasi float ringan (translateY -3px) infinite di home.

## 7. Asset Strategy

| Asset | Type | Source | Implementasi |
|-------|------|--------|-------------|
| Siluet pohon | SVG inline | AI generate atau undraw.co | Inline di komponen Home |
| Ikon menu | Emoji | Built-in | 📖 🧠 🔍 |
| Background pattern | CSS | heropatterns.com | `background-image` di app.css |
| Font | Google Fonts | fonts.google.com | `<link>` di app.html |
| Avatar hewan | Emoji (v1) | Built-in | Nanti bisa upgrade ke ilustrasi dari humaaans.com |
| Pattern kayu | CSS gradient | Built-in | `linear-gradient` tanpa gambar |
| Favicon | .png file | Dibuat sendiri | `static/favicon.png` |
| Dekorasi vines | SVG inline | AI generate atau lucide.dev | Inline di komponen layout |

**Catatan:** Semua asset SVG/code ditaruh inline di komponen Svelte (bukan file eksternal), kecuali favicon. Tidak ada file gambar eksternal (png/jpg) selain favicon.
