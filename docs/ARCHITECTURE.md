# ARCHITECTURE: TODAYS 2026 Website

## 1. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | SvelteKit 5 | Small bundle, built-in animations, file-based routing |
| Adapter | `@sveltejs/adapter-static` | Static site, zero server, deploy anywhere |
| Styling | Tailwind CSS v4 | Utility-first, design tokens, responsive out of the box |
| Animations | Svelte transitions + CSS keyframes | Lightweight, no extra libraries |
| State | Svelte `writable` + `derived` from `svelte/store` | Simple, enough for global state |
| Data | Static JSON imports | Zero backend, can swap to API later |
| Font | Google Fonts: Barlow Condensed + Sora | Suits the adventure theme |
| Deploy | Vercel / Netlify | Free tier, static hosting |

## 2. File Structure

```
todays-2026/
├── docs/                           # Documentation
│   ├── PRD.md
│   ├── DESIGN.md
│   ├── ARCHITECTURE.md
│   ├── AGENTS.md
│   └── TASKS.md
├── src/
│   ├── routes/
│   │   ├── +layout.svelte          # Global layout (forest background, page transitions)
│   │   ├── +page.svelte            # Splash screen (/)
│   │   ├── onboarding/             # Pick avatar + input NIM
│   │   │   └── +page.svelte
│   │   ├── home/                   # Forest Crossroads: avatar + 3 signposts
│   │   │   └── +page.svelte
│   │   ├── guidebook/              # Guidebook flip pages
│   │   │   └── +page.svelte
│   │   ├── quiz/                   # Multiple choice quiz
│   │   │   └── +page.svelte
│   │   └── group/                  # Group data by NIM
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
├── Floating leaves + fireflies (decorative)
├── Page transition overlay (animated leaves)
└── <slot> (page content)
    │
    ├── +page.svelte (splash)
    │   └── Logo animation + greeting text
    │
    ├── onboarding/+page.svelte
    │   └── AvatarPicker.svelte
    │
    ├── home/+page.svelte
    │   ├── Forest background (CSS/SVG layers)
    │   ├── TotemProgress.svelte
    │   ├── Signpost.svelte (x3: up, left, right)
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
groups.json ──→ onboarding (NIM validation)
             ──→ group (show data by NIM)

quiz.json   ──→ quiz (questions)

guidebook.json ──→ guidebook (content pages)

stores/progress.ts:
  avatar, nim           ← set from onboarding
  guidebookDone          ← set from guidebook
  quizUnlocked, quizDone ← set from quiz
  groupUnlocked, groupDone ← set from group
  allDone (derived)      ← used by home to trigger popup
```

## 5. State Shape

All state uses `writable` from `svelte/store` in `src/lib/stores/progress.ts`.

```
avatar: writable(null)           // avatar ID
nim: writable(null)              // user NIM
guidebookDone: writable(false)
quizUnlocked: writable(false)
quizDone: writable(false)
groupUnlocked: writable(false)
groupDone: writable(false)
allDone: derived(...)            // guidebookDone && quizDone && groupDone
reset()                          // reset all to defaults
```

## 6. Route Design

| Route | Page | Auth Check | Notes |
|-------|------|------------|-------|
| `/` | Splash | None | Auto-redirect to /onboarding after 3s |
| `/onboarding` | Onboarding | None | Sets avatar + nim stores |
| `/home` | Home | avatar + nim required | Redirect to /onboarding if missing |
| `/guidebook` | Guidebook | None (open) | Set guidebookDone on finish |
| `/quiz` | Quiz | quizUnlocked | Redirect to /home if locked |
| `/group` | Group | groupUnlocked | Redirect to /home if locked |

## 7. Performance Notes

- **CSS animations over JS** for floating leaves, confetti, page transitions
- **No runtime animation library.** Svelte transitions + CSS keyframes (clip-path, scale, inset) handle everything including the splash video-like intro.
- **Static JSON import** means zero network requests for data
- **Hybrid assets:** emoji + SVG inline + CSS pattern (heropatterns.com). Only favicon as image file.
- **Full viewport:** `h-screen` for splash, onboarding, home. `min-h-screen` for content pages.
