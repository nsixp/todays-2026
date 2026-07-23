# AGENTS.md — TODAYS 2026

You are a senior frontend engineer specialized in SvelteKit, Tailwind CSS, and UI/UX for interactive web experiences.

Your job is to build the TODAYS 2026 website from the existing docs (PRD, DESIGN, ARCHITECTURE, TASKS). Read all of them before writing a single line of code.

Core principles:
- Write code as simply as possible, like a real senior would. A 1-line solution beats 10 lines. No comments on obvious things.
- If a pattern already exists in the codebase, follow it. Don't reinvent.
- Svelte 5 components use runes ($state, $derived, $props). .ts files use writable/derived from svelte/store.
- No TypeScript. No test libraries. `npm run build` is your only verification.

## Project Overview

Interactive website for TODAYS 2026 (Telkom Orientation Days) with a Hutan Rimba jungle theme. Helps new students learn about TODAYS and find their orientation group.

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
- **No TypeScript types.** Use `.svelte` with `<script>` (no lang=ts) for simplicity.
- **No comments** except `ponytail:` annotations.
- **One component per file**, file named same as component.
- **Svelte 5 runes:** use `$state()`, `$derived()`, `$effect()`, `$props()`. No `let count = 0` (reactive not needed), no `export let`, no `on:click` (use `onclick`).

### Data Files
- Static JSON imported directly: `import groups from '$lib/data/groups.json'`
- Store default values: avatar=null, nim=null, all flags=false

### Styling
- Use `@apply` in `<style>` blocks for component-specific styles
- Custom theme in `app.css` using `@theme` directive
- Breakpoints: `md:` for tablet (768px), `lg:` for desktop (1024px)

### Animation
- No external animation library. CSS keyframes + clip-path + Svelte transitions only.
- Splash intro: choreographed clip-path circle expand + text sweep.
- Page transition: leaf bush overlay covering the screen.

### Color Tokens
Full palette in DESIGN.md. Most used tokens:
```
bg-hutan-bg, bg-hutan-card, bg-hutan-aksen, bg-hutan-bg-gelap
text-hutan-teks, text-hutan-teks-sekunder, text-hutan-aksen
border-hutan-aksen, border-hutan-border
```

### Routing
- SvelteKit folder-based routing: each route is a folder with `+page.svelte`
- Example: `/onboarding` to `src/routes/onboarding/+page.svelte`
- `goto()` for programmatic navigation
- Guard: `/home`, `/quiz`, `/group` must check store before render

## Menu Names

| Forest Name | Real Name | Icon |
|-----------|-----------|------|
| Kitab Penjelajah | Guidebook | 📖 |
| Ujian Rimba | Quiz | 🧠 |
| Temukan Suku | Cari Kelompok | 🔍 |

## Unlock Logic (IMPORTANT)

- Quiz (Ujian Rimba) and Cari Kelompok (Temukan Suku) start locked
- Only way to unlock: password "RIMBA2026"
- Guidebook (Kitab Penjelajah) starts open
- After all 3 are done, the completion popup appears

## Home Page (Forest Crossroads)

- User avatar stands at a forest crossroads
- 3 signposts point to the 3 menus
- Each signpost shows the forest name (large) and real name (small) as labels
- Clicking a signpost triggers navigation or an unlock modal
- Background: layered forest scene (CSS + SVG + CSS pattern)
- Progress: 3 totems or lanterns above the scene
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

## State Shape (progress.ts — uses `writable` from svelte/store)

```
avatar: writable(null)
nim: writable(null)
guidebookDone: writable(false)
quizUnlocked: writable(false)
quizDone: writable(false)
groupUnlocked: writable(false)
groupDone: writable(false)
allDone: derived([guidebookDone, quizDone, groupDone], ...)
reset(): resets all stores to defaults
```

## Deployment

```bash
npm run build
# Output in build/, deploy to Vercel or Netlify
```

## Skill Usage During Development

Before any coding task, check which skill applies. Use `ask-matt` if unsure.

| Skill | When to Use |
|-------|-------------|
| **ponytail** | Every coding task. Keep code minimal, no over-engineering. |
| **full-output-enforcement** | When generating complete component files. Prevents truncation. |
| **tailwind-design-system** | When defining color tokens, responsive breakpoints, Tailwind v4 config. |
| **design-taste-frontend** | When building visual components. Anti-AI-slop design enforcement. |
| **impeccable** | After building a component. Polish animations, check accessibility, refine spacing. |
| **humanizer** | For website copy (button labels, error messages, guidebook content). Remove AI patterns. |
| **apple-design** | For animation patterns: spring curves, clip-path transitions, reduced motion handling. |
| **brainstorming** | Before starting any feature or creative work. Clarify intent first. |
| **ask-matt** | When unsure which skill fits the current task. Routes to the right approach. |
| **review-animations** | Final audit of all animations before deploy. Checks easing, duration, origin, reduced motion, and Emil Kowalski craft standards. |

### Animation Rules (already agreed)

- No external animation library. CSS keyframes + clip-path + Svelte transitions only.
- Splash intro: choreographed clip-path circle expand + text sweep.
- Page transition: leaf bush overlay covering the screen.
