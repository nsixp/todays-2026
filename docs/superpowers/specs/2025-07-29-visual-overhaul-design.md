# Visual Overhaul Design — Hybrid C

> Game-like + Minimalist Natural untuk PKKMB Telkom University Purwokerto
> Date: 2025-07-29

---

## 1. Design Direction

| Aspek | Pilihan |
|-------|---------|
| Arah visual | Game-like (illustrated, playful) + Minimalist natural (organic textures, intentional whitespace) |
| Palette | Existing 11 jungle tokens — tidak ada warna baru |
| Font | Instrument Serif (heading) + Sora (body) — existing |
| Tone | Petualangan, hangat, misterius — bukan kartun |

### 1.1 Color Strategy

Palette saat ini sudah solid. Tidak perlu warna baru. Yang diubah adalah **bagaimana warna dipakai**:

| Token | Penggunaan Baru |
|-------|-----------------|
| `--jungle-shadow` | Base splash screen (dark start) |
| `--jungle-deep` | Background dominan untuk section dramatic |
| `--warm-cream` | Background utama tetap, dikombinasikan dengan texture overlay |
| `--sunlit-gold` | Cahaya, glow, progress — porsi lebih besar |
| `--jungle-mist` | Kabut, depth layer, background blur |

---

## 2. Global Components

### 2.1 `<BackgroundFoliage>`

Komponen yang menambahkan siluet dedaunan di tepi layar.

- **Props:** `variant: "canopy-top" | "vines-side" | "leaves-corner"`, `opacity?: number` (default 0.06)
- **Implementasi:** SVG inline — path siluet daun/ranting. Bukan gambar eksternal.
- **canopy-top:** Digunakan di halaman scroll (welcome, hub). Daun menggantung dari atas, full-width.
- **vines-side:** Digunakan di halaman konten terpusat (guidebook, quiz, badge). Sulur di kiri-kanan.
- **leaves-corner:** Digunakan di halaman ringan (faq, jadwal). Daun di 2-3 sudut.
- **Penempatan:** Di `layout-wrapper.tsx` sebagai sibling konten, atau per-halaman untuk kontrol lebih.

### 2.2 `<TextureOverlay>`

Lapisan tekstur halus di atas background.

- **Implementasi:** CSS `background-image` dengan SVG pattern inline — repeat. Opacity 0.03.
- **Pattern:** Daun kecil/geometric organik. Cukup 1 pattern untuk semua halaman.
- **Penempatan:** Di `globals.css` sebagai `body::after` pseudo-element, atau di `layout-wrapper`.

### 2.3 `<DappledLight>`

Efek cahaya menembus kanopi.

- **Props:** `count?: number` (default 4), `color?: string` (default sunlit-gold)
- **Implementasi:** 4-5 `motion.div` lingkaran dengan `background: radial-gradient(...)`, opacity 0.04-0.08
- **Animasi:** Pergerakan random lambat via Framer Motion — durasi 8-12s, repeat infinite
- **Penempatan:** Di section hero dan area konten utama.

### 2.4 `<AmbientParticles>`

Fireflies/particles ambient di halaman non-hub.

- **Props:** `count?: number` (default 4), `colors?: string[]`
- **Implementasi:** Sama seperti fireflies di hub tapi 3-4 titik per halaman
- **Warna:** Variasi sunlit-gold dan jungle-mist
- **Penempatan:** Welcome, badge, kelompok — halaman yang butuh "hidup"

---

## 3. Splash & Loading Screen

### 3.1 Flow

```
Phase 1 (0-30%):  Latar jungle-shadow gelap total. Logo TODAYS muncul via glow-up:
                  opacity 0 → 1, filter blur(8px) → blur(0), scale 0.95 → 1
                  Durasi: 750ms (tapi progress tetap jalan linear)

Phase 2 (30-70%): Logo fully visible. Lingkaran progress (stroke-dasharray) di bawah
                  logo mulai terisi. Background particles (daun/kabut) muncul gradual.
                  Teks "Telkom University Purwokerto" fade in.
                  Lingkaran: 60px, border sunlit-gold, stroke-width 4px

Phase 3 (70-100%): Circle hampir penuh. Particles aktif penuh. Angka persentase
                   kecil di tengah lingkaran (font-heading text-sunlit-gold text-sm)

Phase 4 (100%):    Flash putih 300ms (opacity 0→1→0). Redirect.
```

### 3.2 Perubahan pada `loading-screen.tsx`

- Ubah `bg-warm-cream` → `bg-jungle-shadow` di base
- Tambah circle progress animation (SVG circle + stroke-dashoffset via Framer Motion)
- Logo TODAYS — animasi glow-up (blur + opacity + scale)
- Exit transition: bukan slide ke kiri — tapi overlay putih flash

### 3.3 Perubahan pada `page.tsx` (splash)

- Exit animation: opacity flash instead of slide
- Timing: 300ms flash → redirect

---

## 4. Welcome Page

### 4.1 Babak 1 — Hutan Rimba

- Tambah **<BackgroundFoliage variant="canopy-top">** di belakang teks
- Dua layer kabut (foreground + background) dengan parallax speed berbeda
- `useTransform(scrollYProgress, [0,1], [0, 100])` untuk fog foreground
- `useTransform(scrollYProgress, [0,1], [0, 40])` untuk fog background

### 4.2 Babak 2 — Jalur Setapak

- Tambah **animated path**: SVG path melengkung dari bawah kiri ke tengah
- Framer Motion `pathLength` animation trigger by `whileInView`: 0 → 1
- Durasi: 2s, ease easeInOut
- Path: stroke fern-mist, stroke-width 2, dashed (opsional)
- Di samping path: beberapa lingkaran kecil sebagai "batu" (opacity 0.15)

### 4.3 Babak 3 — Tiga Titik Cahaya

- Tiga orbs diperbesar (diameter 80-120px)
- Masing-masing orbs mendapat **icon SVG** di dalamnya:
  - Buku/guidebook (kiri)
  - Tanda tanya/quiz (tengah)
  - Orang/kelompok (kanan)
- Warna: sunlit-gold, jungle-mist, moss
- Animasi: floating + pulse — masing-masing dengan delay berbeda (0, 0.5, 1s)

### 4.4 Babak 4 — CTA

- Tidak banyak perubahan. Tambah subtle floating particles di sekitar tombol CTA
- 2-3 titik sunlit-gold bergerak lambat di sekitar button

### 4.5 Transisi Antar Babak

- Saat scroll antarbabak: overlay kabut berputar (opacity 0→0.15→0 selama 300px scroll)
- Implementasi: CSS `::before` pada section dengan `background: radial-gradient(...)` dan opacity transisi via Framer Motion `useTransform`

---

## 5. Hub Page — Jungle Hub Redesign

### 5.1 Background 3-Layer

```
Layer 1 (belakang):   gradien from-jungle-canopy/40 via-jungle-deep/20 to-transparent
                      — seperti hutan di kejauhan (existing, dipertegas)

Layer 2 (tengah):     Siluet pepohonan SVG — repeat horizontal, opacity-10
                      — dibuat sebagai komponen terpisah <ForestSilhouettes>
                      — treeSVG dengan 3-4 varian tinggi, di-repeat via CSS

Layer 3 (depan):      DappledLight — 5 titik cahaya sunlit-gold, opacity 0.04-0.06
```

### 5.2 Avatar Display Upgrade

- Lingkaran avatar tetap dengan conic ring
- Tambah **Inventory Satchel** di pojok kanan bawah avatar:

```
┌─────────────────────┐
│   [Avatar Ring]     │
│                     │
│    🐯 [icon]       │
│                     │
│   ┌── Satchel ──┐   │
│   │ 📕 🏅 🎖️    │   │  ← icon muncul sesuai progress
│   └─────────────┘   │
└─────────────────────┘
```

- Satchel: icon tas kecil (SVG), bisa diklik → popover tooltip progress ringkas
- Item dalam satchel:
  - Guidebook selesai → icon buku
  - Quiz selesai → icon medali
  - Badge didapat → icon badge
- Popover: `AnimatePresence` + spring animation. Posisi di atas satchel.

### 5.3 Signposts — Peta Landmark

- Tidak menggunakan grid seragam. Posisi asimetris mengelilingi avatar:

```
         [Guidebook]          [Quiz]
              \               /
               \  [AVATAR]  /
              /               \
         [Cari Kelompok]   [Jejak Rimba]
```

- Masing-masing terhubung ke avatar via **dashed trail path** (CSS border-image / SVG line)
- Trail path: animated dash offset (existing di Phase 10, dipertahankan)
- Jarak dan ukuran disesuaikan per viewport:
  - Desktop (>1024px): 4 signposts di 4 kuadran, jarak 200-250px dari avatar
  - Tablet (768-1024px): grid 2×2, avatar di tengah
  - Mobile (<768px): grid 2×2, avatar kecil di tengah

### 5.4 Progress Display — Item Display

- **Guidebook:** Buku dengan ketebalan bertambah (`scaleX` animation per halaman)
  - Icon buku SVG dengan halaman yang bertambah sesuai `pagesRead / 6`
  - Progress bar diganti: buku terlihat dari samping (spine thickness)
- **Quiz:** Amplop tertutup → medali/lencana
  - Sebelum: icon amplop dengan segel
  - Sesudah: icon medali emas dengan centang
- **Badge:** Menampilkan badge icon yang sudah didapat
  - Sebelum: siluet badge (grayscale, opacity rendah)
  - Sesudah: badge penuh warna dengan subtle glow

### 5.5 Jelajahi Section — Varied Card Patterns

Setiap kartu fitur mendapat background pattern unik:

| Fitur | Pattern | CSS |
|-------|---------|-----|
| Guidebook | Garis horizontal seperti halaman buku | `repeating-linear-gradient(0deg, transparent, transparent 20px, fern-mist/5 20px, fern-mist/5 21px)` |
| Quiz | Circle dots seperti lembar jawaban | `radial-gradient(circle, fern-mist/5 1px, transparent 1px)` background-size 16px |
| Cari Kelompok | Network dots + connecting lines | `radial-gradient` dots + pseudo-element garis |
| Jejak Rimba | Kontur peta (waves) | `repeating-linear-gradient` dengan sudut/opacity variasi |

---

## 6. Page Transitions

### 6.1 Directional Awareness

Navigasi antar halaman menggunakan arah yang konsisten:

| Route | Arah | Animasi |
|-------|------|---------|
| hub → guidebook/quiz | Masuk lebih dalam | slide kiri |
| guidebook/quiz → hub | Kembali ke base | slide kanan |
| hub → kelompok/jadwal/faq | Buka samping | fade + scale(0.95→1) |
| hub → kompas/galeri | Buka peta | fade + scale(0.95→1) |
| antar halaman navbar | Navigasi biasa | fade 200ms (existing) |

### 6.2 Overlay Transisi

- Saat transisi masuk: overlay daun/kabut muncul 150ms, lalu konten
- `AnimatePresence mode="popLayout"` dengan custom variants di `layout-wrapper.tsx`
- Durasi total: 300ms — tidak bikin mual

### 6.3 Navbar Ambient Glow

- Background navbar mendapat subtle tint sesuai halaman aktif:
  - Hub → warm-cream (existing)
  - Kompas → sage/20
  - Galeri → sunlit-gold/10
  - Jadwal → moss/20
  - FAQ → fern-mist/30

---

## 7. Component Polish

### 7.1 Button System

| State | Primary (jungle-deep) | CTA (sunlit-gold) | Ghost |
|-------|----------------------|-------------------|-------|
| Default | `bg-jungle-deep text-warm-cream` + inner shadow | `bg-sunlit-gold text-jungle-deep` + inner shadow | `bg-transparent border border-fern-mist` |
| Hover | `bg-moss` translateY(-1px) shadow-lg | `bg-ember` translateY(-1px) | `bg-fern-mist/20` |
| Active | scale(0.97) | scale(0.97) | scale(0.97) |

Inner shadow: `box-shadow: inset 0 1px 2px rgba(255,255,255,0.08)`

### 7.2 Badge Card Redesign

- Border dipertebal: `border-2` → `border-3` dengan `border-sunlit-gold/60`
- Tambah ornamental corner: SVG path di 4 sudut kartu (subtle, opacity 0.2)
- Icon hewan di dalam lingkaran emas dengan sinar di belakang:
  - Lingkaran: `bg-sunlit-gold/20 border-2 border-sunlit-gold`
  - Sinar: 4-6 garis pendek di sekitar lingkaran (CSS `::before`/`::after`)
- Score (`X/8`): tampilkan dalam format rune/ukiran
  - Font: `font-heading text-4xl` — sudah cukup, tambah `tracking-tight`
  - Background subtle pattern di belakang score

### 7.3 Locked State Redesign

- Bukan grayscale + opacity rendah
- Tapi: overlay gradien gelap dari bawah (dark-to-transparent) menutupi icon
- Tooltip: "Temukan jalannya dengan menyelesaikan [nama fitur sebelumnya]"
  - Mobile: muncul di bawah card setelah tap
  - Desktop: muncul saat hover

### 7.4 Easter Egg — Efek Lebih Dramatis

- Saat klik ke-3 pada locked signpost:
  1. Layar shake 200ms (Framer Motion `x: [0, -4, 4, -4, 4, 0]`)
  2. "Retakan" muncul (clip-path polygon berubah bentuk cepat)
  3. Modal muncul dengan spring scale (existing)
- Durasi total efek: 600ms

### 7.5 Spacing Standardization

- Antar section besar: `py-24` (96px) atau `py-28` (112px) — konsisten
- Padding horizontal konten: `px-4 sm:px-6 lg:px-8`
- Max-width:
  - Guidebook text: `max-w-prose` (65ch)
  - Halaman konten (faq, jadwal, kelompok): `max-w-2xl`
  - Halaman grid (hub, galeri, kompas): `max-w-5xl`
  - Welcome narration: `max-w-lg`

---

## 8. Files Affected

### New Components
| File | Deskripsi |
|------|-----------|
| `src/components/background-foliage.tsx` | SVG foliage silhouette overlay |
| `src/components/texture-overlay.tsx` | Subtle paper/leaf texture |
| `src/components/dappled-light.tsx` | Sunlight-through-canopy effect |
| `src/components/ambient-particles.tsx` | Reusable fireflies/particles |
| `src/components/inventory-satchel.tsx` | Progress display bag |
| `src/components/forest-silhouettes.tsx` | Tree silhouettes for hub background |

### Modified Components
| File | Perubahan |
|------|-----------|
| `src/components/loading-screen.tsx` | Dark start, glow-up logo, circle progress, flash exit |
| `src/components/layout-wrapper.tsx` | Directional transitions, overlay, navbar tint |
| `src/components/navbar.tsx` | Per-page ambient glow |
| `src/app/page.tsx` | Flash exit transition |
| `src/app/hub/page.tsx` | 3-layer bg, signpost layout, satchel, item display |
| `src/app/welcome/page.tsx` | Foliage, animated path, icon orbs, fog transisi |
| `src/app/badge/page.tsx` | Pigura, ornamental, rune score |
| `src/globals.css` | Button inner shadow utility, pattern utilities, keyframes |

---

## 9. Non-Goals (Out of Scope untuk fase ini)

- Data JSON content changes
- Route structure changes
- New pages
- Backend/infrastructure
- Real images (tetap SVG placeholder untuk galeri)
- Multiplayer/social features
