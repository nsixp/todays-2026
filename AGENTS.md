# AGENTS.md — TODAYS 2026

## Project Overview

Website interaktif untuk TODAYS 2026 (Telkom Orientation Days) dengan tema Hutan Rimba. Membantu mahasiswa baru mengenal TODAYS dan mencari kelompok ospek mereka.

**Tech:** SvelteKit 5 + Tailwind CSS v4 + Static Adapter
**Data:** Static JSON (groups.json, quiz.json, guidebook.json)
**State:** Svelte stores (progress.ts)

## Commands

```bash
npm run dev          # Development server
npm run build        # Build static site
npm run preview      # Preview build
npm run check        # TypeScript check
```

## Key Conventions

### Code Style
- **No TypeScript types** — use `.svelte` with `<script>` (no lang=ts) for simplicity
- **No comments** except `ponytail:` annotations
- **One component per file**, file named same as component
- **Svelte 5 runes:** use `$state()`, `$derived()`, `$effect()`, `$props()` — NO `let count = 0` (reactive not needed), NO `export let`, NO `on:click` (use `onclick`)

### Data Files
- Static JSON imported directly: `import groups from '$lib/data/groups.json'`
- Store default values: avatar=null, nim=null, all flags=false

### Styling
- Use `@apply` in `<style>` blocks for component-specific styles
- Custom theme in `app.css` using `@theme` directive
- Breakpoints: `md:` for tablet (768px), `lg:` for desktop (1024px)

### Color Tokens
```
bg-hutan-bg, bg-hutan-card, bg-hutan-aksen, bg-hutan-terang
text-hutan-teks, text-hutan-teks-sekunder
border-hutan-aksen
```

### Routing
- SvelteKit folder-based routing: setiap route adalah folder dengan `+page.svelte`
- Contoh: `/onboarding` → `src/routes/onboarding/+page.svelte`
- `goto()` for programmatic navigation
- Guard: `/home`, `/quiz`, `/group` harus cek store sebelum render

## Menu Names

| Nama Hutan | Nama Asli | Ikon |
|-----------|-----------|------|
| Kitab Penjelajah | Guidebook | 📖 |
| Ujian Rimba | Quiz | 🧠 |
| Temukan Suku | Cari Kelompok | 🔍 |

## Unlock Logic (PENTING)

- Quiz (Ujian Rimba) dan Cari Kelompok (Temukan Suku) terkunci dari awal
- Satu-satunya cara unlock: password "RIMBA2026"
- Guidebook (Kitab Penjelajah) terbuka dari awal
- Setelah semua 3 selesai → popup completion

## Home Page — Forest Crossroads

- Avatar user berdiri di tengah persimpangan hutan
- 3 signpost (papan penunjuk arah) menunjuk ke 3 menu
- Signpost menampilkan nama hutan (besar) + nama asli (kecil) sebagai label
- Signpost bisa diklik → navigasi / modal unlock
- Background: layered forest scene (CSS + SVG + CSS pattern)
- Progress: 3 totem/lentera di atas scene
- Status per signpost: Open / Locked 🔒 / Done ✅

## Data Structure

### `groups.json`
```json
[{ "id": 1, "name": "Treetop Troop", "mentorName": "...", "mentorWa": "...", "members": [{ "nim": "...", "name": "...", "prodi": "..." }] }]
```

### `quiz.json`
```json
[{ "id": 1, "question": "...", "options": ["A","B","C","D"], "answer": 1 }]
```

### `guidebook.json`
```json
[{ "page": 1, "title": "...", "content": "...", "illustration": "compass" }]
```

## State Shape (progress.ts — menggunakan `writable` dari svelte/store)

```
avatar: writable(null)
nim: writable(null)
guidebookDone: writable(false)
quizUnlocked: writable(false)
quizDone: writable(false)
groupUnlocked: writable(false)
groupDone: writable(false)
allDone: derived([guidebookDone, quizDone, groupDone], ...)
reset(): fungsi untuk reset semua store ke default
```

## Deployment

```bash
npm run build
# Output di build/ — deploy ke Vercel/Netlify
```

## Referenced Skills (gunakan saat implementasi)

1. **tailwind-design-system** — untuk proper Tailwind v4 tokens
2. **design-taste-frontend** — untuk styling yang gak keliatan AI-generated
3. **ponytail** — minimal code, no over-engineering
4. **full-output-enforcement** — complete code, no placeholders
