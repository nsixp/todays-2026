# ARCHITECTURE: TODAYS 2026 Website

## 1. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | SvelteKit 5 | Bundle terkecil, built-in animations, file-based routing |
| Adapter | `@sveltejs/adapter-static` | Static site, zero server, deploy anywhere |
| Styling | Tailwind CSS v4 | Utility-first, design tokens, responsive mudah |
| Animations | Svelte transitions + CSS keyframes | Ringan, tanpa library tambahan |
| State | Svelte `$state()` + `$derived()` | Built-in, no Redux/Zustand needed |
| Data | Static JSON imports | Zero backend, bisa diganti API nanti |
| Font | Google Fonts: Poppins + Inter | CDN, cached |
| Deploy | Vercel / Netlify | Free tier, static hosting |

## 2. File Structure

```
todays-2026/
├── docs/                           # Dokumentasi
│   ├── PRD.md
│   ├── DESIGN.md
│   ├── ARCHITECTURE.md
│   ├── AGENTS.md
│   └── TASKS.md
├── src/
│   ├── routes/
│   │   ├── +layout.svelte          # Layout global (forest background, page transitions)
│   │   ├── +page.svelte            # Splash screen (/)
│   │   ├── onboarding/             # Pilih avatar + input NIM
│   │   │   └── +page.svelte
│   │   ├── home/                   # Forest Crossroads — avatar + 3 signpost
│   │   │   └── +page.svelte
│   │   ├── guidebook/              # Guidebook flip pages
│   │   │   └── +page.svelte
│   │   ├── quiz/                   # Quiz pilihan ganda
│   │   │   └── +page.svelte
│   │   └── group/                  # Data kelompok by NIM
│   │       └── +page.svelte
│   ├── lib/
│   │   ├── components/
│   │   │   ├── AvatarPicker.svelte
│   │   │   ├── Signpost.svelte
│   │   │   ├── TotemProgress.svelte
│   │   │   ├── UnlockModal.svelte
│   │   │   └── CompletionPopup.svelte
│   │   ├── stores/
│   │   │   └── progress.ts         # Global state management
│   │   └── data/
│   │       ├── groups.json
│   │       ├── quiz.json
│   │       └── guidebook.json
│   ├── app.css                     # Tailwind import + custom theme
│   └── app.html                    # HTML shell
├── static/
│   └── favicon.png
├── svelte.config.js
├── vite.config.js
├── package.json
└── README.md
```

## 3. Component Tree

```
+layout.svelte
├── Floating leaves + kunang-kunang (decorative)
├── Page transition overlay (animated leaves)
└── <slot> (page content)
    │
    ├── +page.svelte (splash)
    │   └── Logo animation + welcome text
    │
    ├── onboarding/+page.svelte
    │   └── AvatarPicker.svelte
    │
    ├── home/+page.svelte
    │   ├── Forest background (CSS/SVG layers)
    │   ├── TotemProgress.svelte
    │   ├── Signpost.svelte (×3 — up, left, right)
    │   ├── UnlockModal.svelte
    │   └── CompletionPopup.svelte
    │
    ├── guidebook/+page.svelte
    │   └── Navigation buttons
    │
    ├── quiz/+page.svelte
    │   └── Answer options
    │
    └── group/+page.svelte
        └── Member list
```

## 4. Data Flow

```
groups.json ──→ onboarding (validasi NIM)
             ──→ group (tampilkan data berdasarkan NIM)

quiz.json   ──→ quiz (soal)

guidebook.json ──→ guidebook (halaman konten)

stores/progress.ts:
  avatar, nim           ← di-set dari onboarding
  guidebookDone          ← di-set dari guidebook
  quizUnlocked, quizDone ← di-set dari quiz
  groupUnlocked, groupDone ← di-set dari group
  allDone (derived)      ← digunakan oleh home untuk trigger popup
```

## 5. State Shape

```typescript
// Core user state
avatar: string | null        // avatar ID
nim: string | null           // NIM user

// Progress flags
guidebookDone: boolean
quizUnlocked: boolean
quizDone: boolean
groupUnlocked: boolean
groupDone: boolean

// Derived
allDone: boolean             // guidebookDone && quizDone && groupDone
```

## 6. Route Design

| Route | Page | Auth Check | Notes |
|-------|------|------------|-------|
| `/` | Splash | None | Auto-redirect to /onboarding after 3s |
| `/onboarding` | Onboarding | None | Sets avatar + nim stores |
| `/home` | Home | avatar + nim required | Jika tidak ada, redirect ke /onboarding |
| `/guidebook` | Guidebook | None (open) | Set guidebookDone on finish |
| `/quiz` | Quiz | quizUnlocked | Jika locked, redirect ke /home |
| `/group` | Group | groupUnlocked | Jika locked, redirect ke /home |

## 7. Performance Notes

- **CSS animations over JS** — floating leaves, confetti, page transitions
- **No runtime animation library** — Svelte built-in transitions + CSS keyframes cukup
- **Static JSON import** — zero network request untuk data
- **No images** — semua asset pake emoji/SVG inline (kecuali favicon)
