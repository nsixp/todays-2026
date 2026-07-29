# Tasks — TODAYS 2026

> Implementation order. Each task blocks the next. Tick when done.

---

## Phase 1: Foundation

- [ ] **1.1** Init Next.js project + install dependencies
  - `create-next-app` + `framer-motion` + `shadcn/ui` init + `shadcn add button card progress accordion dialog`
- [ ] **1.2** Global config — Tailwind palette tokens, font imports (Instrument Serif + Sora), CSS variables, `layout.tsx` shell
- [ ] **1.3** Create `data/` JSON files — `participants.json`, `guidebook.json`, `quiz.json`, `faq.json`, `schedule.json` (dummy content)
- [ ] **1.4** Types (`src/types/index.ts`) + data loader (`src/lib/data.ts`) + `use-progress` hook (`src/hooks/use-progress.ts`)

## Phase 2: Core Flow

- [ ] **2.1** Splash page (`/`) — logo + kabut/daun animation, auto-redirect logic (new vs returning user)
- [ ] **2.2** Welcome page (`/welcome`) — 3 babak scroll-storytelling with Framer Motion `whileInView`
- [ ] **2.3** Avatar page (`/avatar`) — 6 SVG animal icons (pick one) + NIM input + validation against `participants.json`
- [ ] **2.4** Navbar component — Jadwal | FAQ links, visible on all pages except splash

## Phase 3: Hub + Signposts

- [ ] **3.1** Hub page (`/hub`) — jungle scene CSS illustration, avatar display, layout grid (desktop: horizontal, mobile: 2-1-2)
- [ ] **3.2** Signpost component — icon + label, grayscale when locked / full color when unlocked, dashed trail paths connecting them
- [ ] **3.3** Unlock logic — read `use-progress` state to set `locked`/`unlocked` per signpost

## Phase 4: Guidebook

- [ ] **4.1** Guidebook page (`/guidebook`) — section viewer with Next/Prev, progress bar `X/6`
- [ ] **4.2** Mark guidebook as completed when all 6 pages viewed → update localStorage → redirect to `/hub` with Quiz unlocked

## Phase 5: Quiz + Badge

- [ ] **5.1** Quiz page (`/quiz`) — 8 multiple-choice questions, submit button, score calculation `X/8`
- [ ] **5.2** Badge result page (`/badge`) — card + animal icon + score + local title generator (predefined array per score tier, pick based on nama hash)
- [ ] **5.3** Mark quiz as completed → update localStorage → redirect to `/hub` with Cari Kelompok unlocked

## Phase 6: Cari Kelompok + Utility Pages

- [ ] **6.1** Cari Kelompok page (`/kelompok`) — NIM input → lookup → display nomor kelompok, nama kelompok, mentor
- [ ] **6.2** Jadwal page (`/jadwal`) — table of event schedule from `data/schedule.json`
- [ ] **6.3** FAQ page (`/faq`) — accordion from `data/faq.json`

## Phase 7: Easter Egg + Polish

- [ ] **7.1** Easter egg — track clicks on locked signposts, show modal on 3rd click, instant unlock
- [ ] **7.2** Revisit flow — splash 1s → redirect to `/hub` if localStorage has progress
- [ ] **7.3** Responsive pass — test all pages at 375px, 768px, 1024px
- [ ] **7.4** Animations review — transisi mulus antar halaman, tidak ada flash/lag

## Phase 8: Pre-deploy

- [ ] **8.1** `npm run build` — fix any type/build errors
- [ ] **8.2** Final review — verify all unlock flow, easter egg, badge fallback work end-to-end

---

## Phase 9: Visual Foundation Overhaul

> Cinematic upgrade: loading screen, parallax scroll, global page transitions, expanded CSS tokens.

- [ ] **9.1** CSS token expansion — add `--jungle-mist`, `--jungle-glow`, `--jungle-shadow`, `--jungle-canopy` to `globals.css` for new visual depth
- [ ] **9.2** Loading screen component — `src/components/loading-screen.tsx`
  - Logo TODAYS di tengah + progress bar bergaya jungle (sunlit-gold) 0→100%
  - Floating leaves animation (existing) sebagai background
  - Auto-dismiss setelah progress selesai + Framer Motion exit transition
  - Props: `duration` (default 2000), `onComplete` callback
- [ ] **9.3** Rebuild splash page (`/`) — integrate loading screen component
  - Loading screen: progress bar 0→100% selama ~2 detik
  - Setelah complete → fade out → redirect (hasProgress → /hub, else → /welcome)
  - Skip button tetap ada (skip loading, langsung redirect)
- [ ] **9.4** Rebuild welcome page (`/welcome`) — 4 babak full-screen with parallax depth
  - Babak 1: "Hutan Rimba" — full-screen jungle canopy background (CSS gradient layers + animated fog/mist overlay via Framer Motion `useScroll` + `useTransform`)
  - Babak 2: "Jalur Setapak" — parallax foreground/background (siluet hewan, jalur)
  - Babak 3: "Tiga Titik Cahaya" — floating glowing orbs dengan parallax
  - Babak 4: "Petualanganmu Dimulai" — CTA "Mulai Petualangan"
  - Setiap babak: `min-h-dvh`, teks overlay dengan Instrument Serif
- [ ] **9.5** Global page transitions — `src/components/layout-wrapper.tsx`
  - Wrap page content dengan `AnimatePresence mode="wait"` + `motion.div` fade/slide
  - Key berdasarkan `pathname` untuk trigger re-animasi tiap navigasi
  - Duration: 0.2s fade (ringan, tidak bikin mual)
- [ ] **9.6** Create `public/images/` subdirectory structure:
  - `public/images/hero/` — untuk background hero
  - `public/images/gallery/` — untuk galeri foto
  - `public/images/guidebook/` — untuk ilustrasi guidebook
  - Isi: placeholder SVG ilustrasi hutan (kanopi, daun, kabut)

## Phase 10: Hub & Navigation Redesign

> Immersive jungle hub + expanded navbar + full footer.

- [ ] **10.1** Hub background enhancement — `src/app/hub/page.tsx`
  - Animated kabut layer (CSS pseudo-element bergerak lambat)
  - Fireflies: 5-7 titik cahaya kecil bergerak acak via Framer Motion (sama seperti leaves di splash, tapi kuning/hijau)
  - Daun jatuh: 3-4 daun berguguran di sisi layar
  - Background gradient lebih dalam: `from-jungle-deep/10 via-warm-cream to-sage/30`
- [ ] **10.2** Signpost redesign — `src/components/signpost.tsx`
  - Saat unlocked: glow pulse halus (animasi box-shadow loop)
  - Saat locked: grayscale + opacity lebih rendah dari sekarang
  - Trail path: dashed lines connecting signposts dengan animated dash offset
- [ ] **10.3** Navbar expansion — `src/components/navbar.tsx`
  - Tambah item: `JunglePedia | Galeri | Jadwal | FAQ`
  - Active state: highlight link sesuai halaman aktif (gunakan `usePathname()`)
- [ ] **10.4** Footer component — `src/components/footer.tsx`
  - Sitemap: Hub, Guidebook, Quiz, JunglePedia, Galeri, Jadwal, FAQ
  - Kontak: informasi panitia / help desk
  - Sosial media: link Instagram, YouTube, dll (placeholder)
  - Credit: "TODAYS 2026 — PKKMB Telkom University Purwokerto"
  - Tampil di semua halaman kecuali splash, guidebook, quiz
  - Style: bg-jungle-deep, text-warm-cream, font-sans

## Phase 11: JunglePedia

> Informasi kampus dalam format filterable card grid.

- [ ] **11.1** Create `data/junglepedia.json`
  - Struktur: `{ id, kategori, judul, deskripsi, icon }`
  - 3 kategori: `fasilitas`, `ukm`, `platform`
  - Minimal 3-4 item per kategori (dummy content)
  - Data mudah diupdate panitia tanpa deploy ulang
- [ ] **11.2** Update types (`src/types/index.ts`) — tambah `JunglePediaItem` interface
- [ ] **11.3** Update data loader (`src/lib/data.ts`) — tambah `getJunglePedia()`
- [ ] **11.4** Create halaman `/junglepedia` — `src/app/junglepedia/page.tsx`
  - Hero section: judul "JunglePedia" + deskripsi
  - Filter tabs: Semua | Fasilitas | UKM | Platform Akademik
  - Card grid (2 kolom mobile, 3 kolom desktop)
  - Card: icon SVG inline + judul + deskripsi singkat
  - Animasi: staggered card entrance via Framer Motion
- [ ] **11.5** Create `src/components/junglepedia-card.tsx`
  - Props: `item: JunglePediaItem`, `index: number`
  - Motion div with stagger delay
  - Border, icon, judul, deskripsi

## Phase 12: Galeri

> Gallery page dengan responsive grid + lightbox.

- [ ] **12.1** Create `data/gallery.json`
  - Struktur: `{ id, src, alt, kategori? }`
  - Isi: 6-9 placeholder entries dengan SVG ilustrasi/pattern
- [ ] **12.2** Update types — tambah `GalleryItem` interface
- [ ] **12.3** Update data loader — tambah `getGallery()`
- [ ] **12.4** Create halaman `/galeri` — `src/app/galeri/page.tsx`
  - Hero section: judul "Galeri" + deskripsi
  - Responsive grid: 2 kolom mobile, 3 kolom tablet, 4 kolom desktop
  - Thumbnail dengan aspect-ratio square
  - Animasi: fade-in on scroll
- [ ] **12.5** Create `src/components/lightbox.tsx`
  - Overlay full-screen saat thumbnail diklik
  - Gambar besar di tengah + tombol close
  - Navigasi prev/next antar item galeri
  - Animasi: Framer Motion scale + fade
  - Aksesibilitas: close on backdrop click, escape key

## Phase 13: Jejak Rimba

> Interactive fiction game dengan UI kartu. Petualangan pilih-pilihan bertema jungle dengan 3 ending berbeda.

- [ ] **13.1** Game design — tulis `docs/agents/JEJAK-RIMBA.md`
  - Storyline: 6-8 babak dengan cabang pilihan
  - 3 ending berbeda (good, neutral, hidden)
  - Mapping pilihan ke ending
- [ ] **13.2** Create `data/jejak-rimba.json`
  - Struktur: `{ id, narasi, pilihan: [{ text, icon, nextId }], ending?: { title, deskripsi } }`
  - Setiap node: narasi + 3-4 kartu pilihan
  - Kartu punya icon hewan (salah satu dari 6), judul aksi pendek
  - Cabang pilihan mengarah ke node berbeda
  - End node: title + deskripsi ending
- [ ] **13.3** Update types — tambah `JejakRimbaNode`, `JejakRimbaPilihan`, `JejakRimbaEnding`
- [ ] **13.4** Update data loader — tambah `getJejakRimba()`
- [ ] **13.5** Create game state hook — `src/hooks/use-jejak-rimba.ts`
  - State: currentNodeId, history (node id list), ending (null | string)
  - Actions: `pilih(nodeId)`, `reset()`, `canGoBack`
  - Simpan progress ke localStorage.key `todays-jejak-rimba`
- [ ] **13.6** Create game page — `src/app/jejak-rimba/page.tsx`
  - Layout: narasi di bagian atas (60% tinggi), tangan kartu di bawah (40%)
  - Kartu: melengkung seperti pegangan kartu remi (CSS flex + rotate)
  - Kartu andalan (avatar user) muncul lebih sering
  - Animasi: kartu flip saat dipilih, slide narasi baru
  - Saat ending: tampilkan full-screen result card
  - Tombol "Main Lagi" untuk replay
- [ ] **13.7** Create `src/components/jejak-rimba-card.tsx`
  - Props: `pilihan`, `index`, `onSelect`, `disabled`
  - Card: icon hewan, border warna sesuai hewan, judul aksi
  - Animasi: Framer Motion spring masuk, hover scale
- [ ] **13.8** Add Signpost ke-4 di Hub — unlocked setelah badge (quizDone)
  - Update `src/app/hub/page.tsx` signposts array
  - Label: "Jejak Rimba", icon: kompas/peta, href: "/jejak-rimba"
  - Locked: `!quizDone && !progress.easterEggs["Jejak Rimba"]`
  - Easter egg support untuk Jejak Rimba

## Phase 14: Final Polish & Pre-deploy

- [ ] **14.1** Badge screenshot — tambah tombol "Simpan Badge"
  - Gunakan `html-to-image` atau canvas native untuk screenshot card badge
  - Download sebagai **PNG**
- [ ] **14.2** `npm run build` — fix any type/build errors
- [ ] **14.3** Responsive final pass — test all pages at 375px, 768px, 1024px
- [ ] **14.4** Final review — verify all unlock flow, Jejak Rimba, loading screen, lightbox work end-to-end

---

## Phase 15: Global Ambient Layers & Textures

> Komponen atmosferik global: background foliage, texture overlay, dappled light, ambient particles.

- [ ] **15.1** Create `src/components/background-foliage.tsx`
  - SVG inline siluet dedaunan — 3 varian: `canopy-top`, `vines-side`, `leaves-corner`
  - Props: `variant`, `opacity?` (default 0.06)
  - Integrasikan di `layout-wrapper.tsx` per route
  - Test di semua halaman — tidak mengganggu konten
- [ ] **15.2** Create `src/components/dappled-light.tsx`
  - 4-5 titik cahaya (radial-gradient) bergerak lambat via Framer Motion
  - Props: `count?` (default 4), `color?` (default sunlit-gold)
  - Integrasikan di hub hero, welcome, badge
- [ ] **15.3** Create `src/components/ambient-particles.tsx`
  - Reusable fireflies untuk halaman non-hub
  - Props: `count?` (default 4), `colors?: string[]`
  - Integrasikan di welcome, badge, kelompok
- [ ] **15.4** Add texture overlay di `globals.css`
  - SVG pattern inline — opacity 0.03
  - `body::after` pseudo-element atau utility class
- [ ] **15.5** `npm run build` — fix any type/build errors

## Phase 16: Splash & Loading Screen Overhaul

> Dark start, logo glow-up, circle progress, flash white exit.

- [ ] **16.1** Redesign `src/components/loading-screen.tsx`
  - Ubah base bg dari `warm-cream` → `jungle-shadow`
  - Logo TODAYS: glow-up animation (blur 8px→0, opacity 0→1, scale 0.95→1)
  - Circle progress: SVG lingkaran 60px, stroke sunlit-gold, stroke-dashoffset
  - Angka persentase di tengah lingkaran (font-heading, text-sm, sunlit-gold)
  - Particles (daun/kabut) mulai muncul gradual setelah 30% progress
  - Exit: bukan slide, tapi overlay putih flash 300ms
- [ ] **16.2** Update `src/app/page.tsx` (splash)
  - Exit animation: opacity flash instead of slide kiri
  - Timing: 300ms flash → redirect
- [ ] **16.3** `npm run build` — fix any type/build errors

## Phase 17: Welcome Page Upgrade

> Foliage layer, animated path, icon dalam orbs, fog transisi antar babak.

- [ ] **17.1** Babak 1 — tambah `<BackgroundFoliage variant="canopy-top">` + dua layer fog parallax (foreground/background kecepatan berbeda)
- [ ] **17.2** Babak 2 — tambah animated path (SVG path melengkung, Framer Motion `pathLength` 0→1 via `whileInView`, durasi 2s) + batu-batu kecil di samping path
- [ ] **17.3** Babak 3 — upgrade tiga orbs: perbesar diameter (80-120px), tambah icon SVG di dalam (buku, tanda tanya, orang), floating + pulse dengan delay berbeda
- [ ] **17.4** Babak 4 — tambah 2-3 floating subtle particles di sekitar CTA button
- [ ] **17.5** Transisi antar babak — overlay kabut berputar (Framer Motion `useTransform` via scroll), opacity 0→0.15→0
- [ ] **17.6** `npm run build` — fix any type/build errors

## Phase 18: Hub Redesign (Centerpiece)

> Background 3-layer, signposts sebagai landmark, inventory satchel, item display, varied card patterns.

- [ ] **18.1** Create `src/components/forest-silhouettes.tsx`
  - SVG tree silhouettes — 3-4 varian tinggi, repeat horizontal
  - Opacity 0.10, ditempatkan sebagai layer tengah di hub
- [ ] **18.2** Redesign hub background — 3-layer stack:
  - Belakang: gradient dipertegas `from-jungle-canopy/40 via-jungle-deep/20 to-transparent`
  - Tengah: `<ForestSilhouettes />`
  - Depan: `<DappledLight count={5} />`
- [ ] **18.3** Create `src/components/inventory-satchel.tsx`
  - Icon tas SVG di pojok kanan bawah avatar
  - Item muncul sesuai progress: guidebook→buku, quiz→medali, badge→badge
  - Klik: popover tooltip progress ringkas (AnimatePresence + spring)
- [ ] **18.4** Redesign signpost layout — dari grid seragam jadi landmark asimetris:
  - 4 kuadran: Guidebook (kiri atas), Quiz (kanan tengah), Cari Kelompok (kiri bawah), Jejak Rimba (kanan bawah)
  - Trail path dashed connecting ke avatar (existing, dipertahankan)
  - Responsif: desktop 4 kuadran, tablet grid 2×2, mobile grid 2×2
- [ ] **18.5** Redesign progress display (3 item guidebook/quiz/badge)
  - Guidebook: icon buku dengan ketebalan bertambah (scaleX per halaman)
  - Quiz: amplop tertutup → medali emas
  - Badge: siluet (belum) → badge penuh (sudah)
- [ ] **18.6** Varied card patterns di Jelajahi section
  - Guidebook: garis horizontal seperti halaman (repeating-linear-gradient)
  - Quiz: dots seperti lembar jawaban (radial-gradient)
  - Cari Kelompok: network dots + garis
  - Jejak Rimba: kontur peta (repeating-linear-gradient wave)
- [ ] **18.7** `npm run build` — fix any type/build errors

## Phase 19: Page Transitions & Navigation Upgrade

> Directional awareness, transition overlays, navbar ambient glow.

- [ ] **19.1** Update `src/components/layout-wrapper.tsx`
  - Directional awareness: slide kiri (masuk hutan), slide kanan (kembali base camp), fade+scale (halaman samping)
  - Implement via custom Framer Motion variants per route pattern
  - `AnimatePresence mode="popLayout"` untuk transisi lebih halus
- [ ] **19.2** Transition overlays — overlay daun/kabut selama 150ms saat transisi
- [ ] **19.3** Update `src/components/navbar.tsx`
  - Background tint berubah sesuai halaman aktif:
    - Hub → warm-cream, JunglePedia → sage/20, Galeri → sunlit-gold/10
    - Jadwal → moss/20, FAQ → fern-mist/30
- [ ] **19.4** `npm run build` — fix any type/build errors

## Phase 20: Component Polish & Game UI Details

> Button tactile upgrade, badge pigura, locked state misterius, easter egg dramatis, spacing standardisasi.

- [ ] **20.1** Button system upgrade — tambah utility di `globals.css`:
  - Inner shadow: `box-shadow: inset 0 1px 2px rgba(255,255,255,0.08)`
  - Hover lift: translateY(-1px) + shadow increase
  - Active press: scale(0.97)
- [ ] **20.2** Badge card redesign (`src/app/badge/page.tsx`)
  - Border tebal `border-3 border-sunlit-gold/60`
  - Ornamental corner (SVG path di 4 sudut, opacity 0.2)
  - Sinar di belakang icon hewan (4-6 garis pendek via CSS)
  - Score: `tracking-tight` + background subtle pattern
- [ ] **20.3** Locked state redesign — overlay gradien gelap (dark-to-transparent) bukan grayscale
  - Tooltip/hint: "Temukan jalannya dengan menyelesaikan [syarat]"
- [ ] **20.4** Easter egg effect upgrade (`src/app/hub/page.tsx`)
  - Shake animation 200ms (x: [0, -4, 4, -4, 4, 0])
  - Clip-path "retakan" cepat sebelum modal
  - Total durasi efek: 600ms
- [ ] **20.5** Spacing standardisasi — review semua halaman:
  - Antar section: `py-24` atau `py-28`
  - Horizontal padding: `px-4 sm:px-6 lg:px-8`
  - Max-width: prose (guidebook), max-w-2xl (konten), max-w-5xl (grid)
- [ ] **20.6** `npm run build` — fix any type/build errors
