# TASKS: TODAYS 2026 Implementation

> **Execution order:** sequential. Each task depends on the one before it.
> **Svelte 5 rules:** Use `$state()`, `$derived()`, `$effect()`, `$props()`. No `export let`, no `on:click`, no `let count = 0`.
> **Routing:** Each page is a folder with `+page.svelte`, not a direct `.svelte` file.

---

## Task 1: Project Scaffold + Tailwind CSS

**Goal:** Get SvelteKit running with Tailwind CSS v4.

**Files:**
- Create: `package.json`, `svelte.config.js`, `vite.config.js`, `src/app.css`, `src/app.html`

**Steps:**
1. Run `npm create svelte@latest` or manually create package.json
2. `npm install -D @tailwindcss/vite @sveltejs/adapter-static`
3. Configure `vite.config.js` with the Tailwind plugin
4. Configure `svelte.config.js` with the static adapter
5. Create `src/app.css` with `@import "tailwindcss"` and `@theme` (all color tokens: hutan-bg, hutan-card, hutan-aksen, hutan-terang, hutan-cokelat, hutan-teks, hutan-teks-sekunder)
6. Update `src/app.html` with Google Fonts (Barlow Condensed + Sora)
7. Create `src/routes/+layout.svelte` as a basic wrapper
8. Run `npm run dev` and verify a blank green page

---

## Task 2: Data Layer (JSON + Store)

**Goal:** Create all data files and the global store.

**Files:**
- Create: `src/lib/data/groups.json`, `src/lib/data/quiz.json`, `src/lib/data/guidebook.json`
- Create: `src/lib/stores/progress.ts`

**Steps:**
1. `groups.json`: 3 groups, 9 total members (3 each), NIM 2410100001 through 2410100009
2. `quiz.json`: 5 questions about TODAYS and the jungle (in Indonesian)
3. `guidebook.json`: 4 pages, password "RIMBA2026" on page 2 (footer note)
4. `progress.ts`: `writable` stores for `avatar(null)`, `nim(null)`, `guidebookDone(false)`, `quizUnlocked(false)`, `quizDone(false)`, `groupUnlocked(false)`, `groupDone(false)`. Export a `derived` `allDone` and a `reset()` function.

---

## Task 3: Splash Page

**Goal:** Video-like intro using only CSS clip-path and keyframes.

**File:** `src/routes/+page.svelte`

**Steps:**
1. Start with black screen, a circle `clip-path: circle(0)` at center expands to full screen, revealing the forest gradient background (0 to 0.8s)
2. TODAYS logo scales up with `box-shadow` glow behind it (0.3 to 1.2s)
3. Teks sambutan sweeps in with `clip-path: inset(0 100% 0 0)` transitioning to `inset(0)` (1.2 to 2s)
4. Background gradient subtly shifts position via keyframe (continuous)
5. Auto-redirect to `/onboarding` after 4s using `goto()` and `setTimeout`

---

## Task 4: Onboarding Page

**Goal:** Let users pick an avatar and enter their NIM with validation.

**Files:**
- Create: `src/routes/onboarding/+page.svelte`
- Create: `src/lib/components/AvatarPicker.svelte`

**Steps:**
1. `AvatarPicker.svelte`: 6 avatars (monyet, harimau, rusa, burung, kupu-kupu, gajah) as emoji buttons in a 3 by 2 grid. Props: `selected`, `onSelect`.
2. `onboarding/+page.svelte`: render AvatarPicker with a preview circle above the grid. If nothing is selected, show "Belum dipilih" with ❓.
3. NIM input with placeholder "Masukkan NIM kamu"
4. Hint text: "Contoh: 2410100001 - 2410100009"
5. Validation: NIM must be 10-12 digits and must exist in groups.json
6. On success, set `avatar` and `nim` stores, then `goto('/home')`
7. Error states: "NIM tidak terdaftar", "Pilih avatar dulu", "NIM harus 10-12 digit"

---

## Task 5: Home Page (Forest Crossroads)

**Goal:** Full-screen forest scene with avatar at the crossroads, 3 signposts, and a progress totem.

**Menu names:**

| Forest Name (label) | Real Name (subtitle) | Icon | Route |
|---------------------|----------------------|------|-------|
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

A wooden board with a post. The board rotates based on direction:
- `up`: rotate(0deg) with arrow ↑
- `left`: rotate(-20deg) with arrow ↖
- `right`: rotate(20deg) with arrow ↗

Visual details:
- Post: vertical brown gradient
- Board: rounded with shadow and border
- Nails: small circles at board ends
- Open: green background, badge "Terbuka"
- Locked: dark gray background, badge "🔒 Terkunci"
- Done: green glow, badge "✅ Selesai"

### 5b: UnlockModal.svelte
Props: `show`, `onUnlock`, `onClose`

- Modal with a password input
- Correct password: `RIMBA2026`
- Wrong password: show "Password salah!"
- ✕ button on the top right to close
- Clicking the backdrop calls `onClose` without unlocking
- No easter egg. Password is the only way.

### 5c: TotemProgress.svelte
Props: `current`, `total` (default 3)

- Renders 3 totems or lanterns horizontally
- Each totem lights up (glow + scale) when completed
- CSS scale-up animation per lantern

### 5d: home/+page.svelte
Full-viewport forest scene with these layers:

1. **Sky background:** dark green radial gradient
2. **Tree silhouettes:** pseudo-elements or SVG inline on left and right
3. **Ground:** horizontal earth tone gradient
4. **Avatar:** user emoji at center of the crossroads, with first name (from JSON) and real name below
5. **3 Signposts:** guidebook on top (up), quiz on left, cari kelompok on right
6. **TotemProgress** above the scene
7. **Floating leaves and kunang-kunang:** CSS keyframe particles

Interactions:
- Click guidebook: `goto('/guidebook')`
- Click a locked quiz or group signpost: show UnlockModal
- Click an unlocked quiz or group signpost: `goto('/quiz')` or `goto('/group')`
- If `allDone` is true, render CompletionPopup after a 500ms delay

Guard: if `$avatar` or `$nim` is null on mount, redirect to `/onboarding`

---

## Task 6: Guidebook Page

**Goal:** A flip-page guidebook with a "Selesai" button.

**File:** `src/routes/guidebook/+page.svelte`

**Steps:**
1. Render pages from `guidebook.json` one at a time
2. Show "Halaman X dari Y"
3. Previous and Next navigation buttons
4. On the last page, show "Selesai Membaca" button. Clicking it sets `guidebookDone = true` and goes to `/home`
5. Back button goes to `/home`
6. Use `white-space: pre-line` for content (it has newlines)

---

## Task 7: Quiz Page

**Goal:** 5 multiple choice questions with scoring.

**File:** `src/routes/quiz/+page.svelte`

**Steps:**
1. Render questions from `quiz.json` one at a time
2. Show a progress bar per question
3. Click an option, it highlights, then click "Jawab"
4. After answering, green on the correct option, red on the wrong one. Then "Selanjutnya"
5. On the last question, show "Lihat Skor". Sets `quizDone = true`.
6. Score screen: 🏆, "Skor kamu: X/5", "Kembali ke Home" button
7. Back button goes to `/home`
8. Guard: if `$quizUnlocked` is false on mount, redirect to `/home`

---

## Task 8: Group Page

**Goal:** Loading animation, then show group data by NIM.

**File:** `src/routes/group/+page.svelte`

**Steps:**
1. On mount, if `$groupUnlocked` is false, redirect to `/home`
2. Show a bouncing 🧭 with "Mencari kelompokmu di hutan..." for 1.5 seconds
3. After 1.5s, find the group from `groups.json` by `$nim`
4. Show group name, mentor name + WhatsApp number (text, not a link), and member list (nama + NIM + prodi)
5. Set `groupDone = true`
6. Back button goes to `/home`
7. If NIM is not found, show an error message

---

## Task 9: Completion Popup + Global Effects

**Goal:** Confetti popup when all 3 missions are done, plus a page transition with leaf overlay.

**Files:**
- Create: `src/lib/components/CompletionPopup.svelte`
- Modify: `src/routes/+layout.svelte`

**Steps:**

### 9a: CompletionPopup.svelte
Props: `onClose`

- Modal with backdrop blur
- Confetti: 20 CSS keyframe fall particles (random colors from the forest palette)
- 🎉 "Misi Selesai!" heading
- "Selamat! Kamu telah menyelesaikan semua misi TODAYS 2026!"
- Show group name, mentor name, and WA number (text)
- "📱 Hubungi Pembimbing" button with a WA link
- ✕ button on top right
- "Tutup" button below

### 9b: +layout.svelte
- Floating leaf particles: 6 to 8 CSS keyframe particles
- Kunang-kunang: 3 to 4 CSS keyframe particles in `#F5C542`
- Page transition: leaves cover the screen during navigation (via `beforeNavigate`)

---

## Task 10: Navigation Guards

**Files:**
- Modify: `src/routes/home/+page.svelte`, `src/routes/quiz/+page.svelte`, `src/routes/group/+page.svelte`

**Steps:**
1. `home/+page.svelte`: if `$avatar` or `$nim` is null, redirect to `/onboarding`
2. `quiz/+page.svelte`: if `$quizUnlocked` is false, redirect to `/home`
3. `group/+page.svelte`: if `$groupUnlocked` is false, redirect to `/home`
