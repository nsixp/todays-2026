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
