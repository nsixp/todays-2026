# TASKS: TODAYS 2026 Implementation

> **Execution order:** sequential. Setiap task dependen pada task sebelumnya.
> **Svelte 5 rules:** Gunakan `$state()`, `$derived()`, `$effect()`, `$props()`. NO `export let`, NO `on:click`, NO `let count = 0`.
> **Routing:** Setiap halaman = folder + `+page.svelte`, bukan file `.svelte` langsung.

---

## Task 1: Project Scaffold + Tailwind CSS

**Goal:** SvelteKit project running with Tailwind CSS v4.

**Files:**
- Create: `package.json`, `svelte.config.js`, `vite.config.js`, `src/app.css`, `src/app.html`

**Steps:**
1. `npm create svelte@latest todays-2026 -- --template minimal` atau manual buat package.json
2. `npm install -D @tailwindcss/vite @sveltejs/adapter-static`
3. Config `vite.config.js` with Tailwind plugin
4. Config `svelte.config.js` with static adapter
5. Create `src/app.css` with `@import "tailwindcss"` + `@theme` (all color tokens: hutan-bg, hutan-card, hutan-aksen, hutan-terang, hutan-cokelat, hutan-teks, hutan-teks-sekunder)
6. Update `src/app.html` with Google Fonts link (Barlow Condensed + Sora)
7. Create `src/routes/+layout.svelte` — basic wrapper
8. `npm run dev` → verify blank green page

---

## Task 2: Data Layer — JSON + Store

**Goal:** All data files and global store.

**Files:**
- Create: `src/lib/data/groups.json`, `src/lib/data/quiz.json`, `src/lib/data/guidebook.json`
- Create: `src/lib/stores/progress.ts`

**Steps:**
1. `groups.json` — 3 groups, 9 total members (3 each), NIM 2410100001-2410100009
2. `quiz.json` — 5 questions about TODAYS/hutan
3. `guidebook.json` — 4 pages, password "RIMBA2026" on page 2 (footer note)
4. `progress.ts` — `writable` stores: `avatar(null)`, `nim(null)`, `guidebookDone(false)`, `quizUnlocked(false)`, `quizDone(false)`, `groupUnlocked(false)`, `groupDone(false)`. Export `derived` `allDone` and `reset()` function.

---

## Task 3: Splash Page

**Goal:** Logo animation + welcome text → auto-redirect.

**File:** `src/routes/+page.svelte`

**Steps:**
1. Logo TODAYS (div lingkaran hijau dengan teks) — muncul dengan scale animation after 300ms
2. Welcome text — fade in after 1.8s
3. Auto-redirect to `/onboarding` after 4s via `goto()`
4. Use `setTimeout`

---

## Task 4: Onboarding Page

**Goal:** Pilih avatar + input NIM with validation.

**Files:**
- Create: `src/routes/onboarding/+page.svelte`
- Create: `src/lib/components/AvatarPicker.svelte`

**Steps:**
1. `AvatarPicker.svelte` — 6 avatars (monkey, tiger, deer, bird, butterfly, elephant) as emoji buttons in 3×2 grid. Props: `selected`, `onSelect`.
2. `onboarding/+page.svelte` — render AvatarPicker, plus preview circle di atas grid (lingkaran besar dengan emoji avatar yang dipilih + label nama hewan). Kalau belum pilih, tampilkan ❓"Belum dipilih".
3. Input field for NIM — placeholder "Masukkan NIM kamu"
4. Hint text di bawah input: "Contoh: 2410100001 — 2410100009"
5. Validation: NIM must be 10-12 digit angka, must exist in groups.json
6. On success: set `avatar` + `nim` stores, `goto('/home')`
7. Error state: merah "NIM tidak terdaftar" / "Pilih avatar dulu" / "NIM harus 10-12 digit"

---

## Task 5: Home Page — Forest Crossroads

**Goal:** Full-screen forest scene dengan avatar di persimpangan + 3 signpost + progress totem.

**Menu names:**

| Nama Hutan (label) | Nama Asli (subtitle) | Ikon | Route |
|--------------------|----------------------|------|-------|
| Kitab Penjelajah | Guidebook | 📖 | `/guidebook` |
| Ujian Rimba | Quiz | 🧠 | `/quiz` |
| Temukan Suku | Cari Kelompok | 🔍 | `/group` |

**Files:**
- Create: `src/routes/home/+page.svelte`
- Create: `src/lib/components/Signpost.svelte`
- Create: `src/lib/components/UnlockModal.svelte`
- Create: `src/lib/components/TotemProgress.svelte`

**Steps:**

### 5a: Signpost.svelte
Props: `icon`, `title` (nama hutan), `subtitle` (nama asli), `status` ('open'|'locked'|'done'), `onclick`, `direction` ('up'|'left'|'right')

Render sebagai papan kayu dengan tiang — papan di-rotate sesuai arah:
- `up`: rotate(0deg), tanda panah ↑
- `left`: rotate(-20deg), tanda panah ↖
- `right`: rotate(20deg), tanda panah ↗

Visual papan:
- Tiang: gradient cokelat vertikal
- Papan: rounded, bayangan, border
- Paku: bulatan kecil di ujung papan
- Status open: background hijau, badge "Terbuka"
- Status locked: background abu-abu gelap, badge "🔒 Terkunci"
- Status done: background hijau glow, badge "✅ Selesai"

### 5b: UnlockModal.svelte
Props: `show`, `onUnlock`, `onClose`

- Modal dengan input password
- Password yang benar: `RIMBA2026`
- Error state jika salah: "Password salah!"
- Tombol ✕ di pojok kanan atas untuk nutup
- Klik backdrop (di luar modal) = panggil `onClose` (gak unlock)
- Satu-satunya cara unlock: password. Tidak ada easter egg.

### 5c: TotemProgress.svelte
Props: `current`, `total` (default 3)

- Render 3 totem/lentera secara horizontal
- Setiap totem nyala (glow + scale up) jika sudah selesai
- Animasi CSS scale-up per lentera

### 5d: home/+page.svelte
Full-viewport forest scene dengan layer:

1. **Sky background** — radial gradient hijau gelap
2. **Siluet pohon** — pseudo-elements / SVG inline di kiri-kanan
3. **Ground** — gradient horizontal warna tanah
4. **Avatar** — emoji user di tengah persimpangan, dengan nama depan (dari data JSON) + nama asli di bawahnya
5. **3 Signposts** — guidebook di atas (arah up), quiz di kiri (arah left), cari kelompok di kanan (arah right)
6. **TotemProgress** — di atas scene, menunjukkan progress
7. **Floating leaves + kunang-kunang** — CSS keyframe particles

Interaksi:
- Klik signpost guidebook → `goto('/guidebook')`
- Klik signpost quiz/group yang **terkunci** → show UnlockModal
- Klik signpost quiz/group yang **sudah di-unlock** → `goto('/quiz')` / `goto('/group')`
- Jika `allDone` true → render CompletionPopup (delay 500ms)

Guard: jika `$avatar` atau `$nim` null saat mount → redirect ke `/onboarding`

---

## Task 6: Guidebook Page

**Goal:** Flip page guidebook with "Selesai" button.

**File:** `src/routes/guidebook/+page.svelte`

**Steps:**
1. Render pages from `guidebook.json` — one page at a time
2. Show page number: "Halaman X dari Y"
3. Previous/Next navigation buttons
4. Last page: "Selesai Membaca" button → set `guidebookDone = true` → `goto('/home')`
5. Back button → `/home`
6. Content ditampilkan dengan `white-space: pre-line` (karena ada newline di konten)

---

## Task 7: Quiz Page

**Goal:** 5 multiple choice questions with scoring.

**File:** `src/routes/quiz/+page.svelte`

**Steps:**
1. Render questions from `quiz.json` one at a time
2. Progress bar per soal
3. Click option → highlight selected → "Jawab" button
4. After answer: show green feedback on correct option, red on wrong selected → "Selanjutnya" button
5. Last question → "Lihat Skor" → set `quizDone = true`
6. Score screen: 🏆, "Skor kamu: X/5", "Kembali ke Home" button
7. Back button → `/home`
8. Guard: jika `$quizUnlocked` false saat mount → redirect ke `/home`

---

## Task 8: Group Page

**Goal:** Loading animation → show group data by NIM.

**File:** `src/routes/group/+page.svelte`

**Steps:**
1. On mount: jika `$groupUnlocked` false → redirect ke `/home`
2. Show loading state: 🧭 bouncing + "Mencari kelompokmu di hutan..." (1.5 detik)
3. After 1.5s: cari data kelompok dari `groups.json` berdasarkan `$nim`
4. Tampilkan: nama kelompok, pembimbing + nomor WhatsApp (teks, bukan link), daftar anggota (nama + NIM + prodi)
5. Set `groupDone = true`
6. Back button → `/home`
7. Jika NIM tidak ditemukan: tampilkan pesan error

---

## Task 9: Completion Popup + Global Effects

**Goal:** Popup confetti when all 3 done, page transition leaves overlay.

**Files:**
- Create: `src/lib/components/CompletionPopup.svelte`
- Modify: `src/routes/+layout.svelte`

**Steps:**

### 9a: CompletionPopup.svelte
Props: `onClose`

- Modal dengan backdrop blur
- Confetti: 20 partikel CSS keyframe `fall` (warna acak dari palet hutan)
- 🎉 "Misi Selesai!" heading
- "Selamat! Kamu telah menyelesaikan semua misi TODAYS 2026!"
- Tampilkan data kelompok: nama kelompok, nama pembimbing, nomor WA (teks)
- Tombol "📱 Hubungi Pembimbing" dengan link WA
- Tombol ✕ di pojok kanan atas
- Tombol "Tutup" di bawah

### 9b: +layout.svelte
- Floating leaf particles (6-8 partikel CSS keyframe)
- Kunang-kunang particles (3-4 partikel CSS keyframe, warna #F5C542)
- Page transition: dedaunan nutup layar saat navigasi (via `beforeNavigate`)

---

## Task 10: Navigation Guards

**Files:**
- Modify: `src/routes/home/+page.svelte`, `src/routes/quiz/+page.svelte`, `src/routes/group/+page.svelte`

**Steps:**
1. `home/+page.svelte` — guard: jika `$avatar` atau `$nim` null, redirect ke `/onboarding`
2. `quiz/+page.svelte` — guard: jika `$quizUnlocked` false, redirect ke `/home`
3. `group/+page.svelte` — guard: jika `$groupUnlocked` false, redirect ke `/home`
