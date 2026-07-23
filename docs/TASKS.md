# TASKS: TODAYS 2026 Implementation

> **Execution order:** sequential. Setiap task dependen pada task sebelumnya.
> **Mode:** Kerangka website (no styling). Gunakan emoji sebagai placeholder asset gambar.

---

## Task 1: Project Scaffold + Tailwind CSS

**Goal:** SvelteKit project running with Tailwind CSS v4.

**Files:**
- Create: `package.json`, `svelte.config.js`, `vite.config.js`, `src/app.css`, `src/app.html`

**Steps:**
1. `npx sv create todays-2026 --template minimal` di folder parent, lalu copy isinya
2. `npm install -D @tailwindcss/vite @sveltejs/adapter-static`
3. Config `vite.config.js` with Tailwind plugin
4. Config `svelte.config.js` with static adapter
5. Create `src/app.css` with `@import "tailwindcss"` + `@theme` (all color tokens)
6. Update `src/app.html` with Google Fonts link (Poppins + Inter)
7. Create `src/routes/+layout.svelte` — basic wrapper
8. `npm run dev` → verify blank green page

---

## Task 2: Data Layer — JSON + Store

**Goal:** All data files and global store.

**Files:**
- Create: `src/lib/data/groups.json`, `src/lib/data/quiz.json`, `src/lib/data/guidebook.json`
- Create: `src/lib/stores/progress.ts`

**Steps:**
1. `groups.json` — 3 groups, 9 total members (3 each), with NIM 2410100001-2410100009
2. `quiz.json` — 5 questions about TODAYS/hutan
3. `guidebook.json` — 4 pages, password "RIMBA2026" on page 2
4. `progress.ts` — `$state` runes untuk avatar, nim, guidebookDone, quizUnlocked, quizDone, groupUnlocked, groupDone. Export `reset()` function.

---

## Task 3: Splash Page

**Goal:** Logo animation + welcome text → auto-redirect.

**File:** `src/routes/+page.svelte`

**Steps:**
1. Logo TODAYS (div lingkaran hijau dengan teks) — muncul dengan scale animation after 300ms
2. Welcome text — fade in after 1.8s
3. Auto-redirect to `/onboarding` after 4s via `goto()`
4. Use `setTimeout`, no onMount return cleanup needed (simple case)

---

## Task 4: Onboarding Page

**Goal:** Pilih avatar + input NIM with validation.

**Files:**
- Create: `src/routes/onboarding.svelte`
- Create: `src/lib/components/AvatarPicker.svelte`

**Steps:**
1. `AvatarPicker.svelte` — 6 avatars (monkey, tiger, deer, bird, butterfly, elephant) as emoji buttons in 3×2 grid
2. `onboarding.svelte` — render AvatarPicker, input field for NIM
3. Validation: NIM must be 10-12 digits, must exist in groups.json
4. On success: set avatar + nim stores, `goto('/home')`
5. Error state: merah "NIM tidak terdaftar" / "Pilih avatar dulu" / "NIM harus 10-12 digit"

---

## Task 5: Home Page — Forest Crossroads

**Goal:** Full-screen forest scene dengan avatar di persimpangan + 3 signpost.

**Files:**
- Create: `src/routes/home.svelte`
- Modify: `src/routes/+layout.svelte` (global forest effect)
- Create: `src/lib/components/Signpost.svelte`
- Create: `src/lib/components/UnlockModal.svelte`
- Create: `src/lib/components/TotemProgress.svelte`

**Steps:**
1. `Signpost.svelte` — props: icon, title, subtitle (nama asli), status ('open'|'locked'|'done'), onclick, direction ('up'|'left'|'right'). Render sebagai papan kayu dengan tiang + rotate sesuai arah.
2. `UnlockModal.svelte` — props: show, onUnlock, onClose. Modal dengan input password. Klik backdrop = onClose.
3. `TotemProgress.svelte` — 3 lentera/totem. Props: current, total. Setiap totem nyala (glow) jika sudah selesai.
4. `home.svelte` — full-viewport forest scene:
   - Layer 1: Sky background gradient
   - Layer 2: Siluet pohon kiri-kanan (SVG/CSS)
   - Layer 3: Ground + path intersection
   - Layer 4: Avatar emoji + nama (nama depan + nama asli)
   - Layer 5: 3 Signposts (guidebook up, quiz left, cari kelompok right)
   - Layer 6: TotemProgress di atas
   - Layer 7: Floating leaves + kunang-kunang (CSS particles)
5. Klik signpost guidebook → `/guidebook`. Klik signpost terkunci → modal unlock.
6. Render CompletionPopup jika allDone.

---

## Task 6: Guidebook Page

**Goal:** Flip page guidebook with "Selesai" button.

**File:** `src/routes/guidebook.svelte`

**Steps:**
1. Render pages from `guidebook.json` — one page at a time
2. Previous/Next navigation buttons
3. Last page: "Selesai Membaca" button → set `guidebookDone = true` → `goto('/home')`
4. Back button → `/home`

---

## Task 7: Quiz Page

**Goal:** 5 multiple choice questions with scoring.

**File:** `src/routes/quiz.svelte`

**Steps:**
1. Render questions from `quiz.json` one at a time
2. Click option → highlight selected → "Jawab" button
3. After answer: show green/red feedback on options → "Selanjutnya" button
4. Last question → "Lihat Skor" → set `quizDone = true`
5. Back button → `/home`

---

## Task 8: Group Page

**Goal:** Loading animation → show group data.

**File:** `src/routes/group.svelte`

**Steps:**
1. On mount: show loading state (🧭 emoji bouncing + "Mencari kelompokmu di hutan...")
2. After 1.5s: tampilkan data kelompok dari `groups.json` berdasarkan `$nim`
3. Show: group name, mentor name + WA link, member list (name + NIM + prodi)
4. Set `groupDone = true`
5. Back button → `/home`

---

## Task 9: Completion Popup + Global Effects

**Goal:** Popup confetti when all 3 done, page transition leaves.

**Files:**
- Create: `src/lib/components/CompletionPopup.svelte`
- Modify: `src/routes/+layout.svelte`

**Steps:**
1. `CompletionPopup.svelte` — modal with confetti (CSS keyframe fall particles), "🎉 Misi Selesai!", group name, mentor name, WA link button, close button
2. `+layout.svelte` — floating leaf particles (CSS keyframe), page transition overlay (leaves falling on navigate via `beforeNavigate`)

---

## Task 10: Navigation Guards

**Files:**
- Modify: `src/routes/home.svelte`, `src/routes/quiz.svelte`, `src/routes/group.svelte`

**Steps:**
1. `home.svelte` — jika avatar/null, redirect ke `/onboarding`
2. `quiz.svelte` — jika !quizUnlocked, redirect ke `/home`
3. `group.svelte` — jika !groupUnlocked, redirect ke `/home`
