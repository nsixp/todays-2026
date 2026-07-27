# Architecture

## Routes

```
/ (splash) → /welcome → /avatar → /hub → /guidebook → /quiz → /badge → bebas
                                  ├── /kelompok (unlocked after quiz)
                                  ├── /jadwal
                                  └── /faq
```

## Data Files

All content lives in `data/` as JSON — panitia edits these without touching code:

| File | Content |
|------|---------|
| `participants.json` | `{ nim, nama, nomor_kelompok, nama_kelompok, mentor }` |
| `guidebook.json` | 6 sections: `{ id, title, content }` |
| `quiz.json` | 8 questions: `{ id, question, options[], correctIndex }` |
| `faq.json` | FAQ items: `{ id, question, answer }` |
| `schedule.json` | Event schedule |

## Components

- `src/components/` — splash, welcome, avatar-selector, nim-input, jungle-hub, signpost, guidebook-viewer, quiz-view, badge-result, navbar
- `src/components/icons/` — 6 inline SVG animal icons (monyet, burung, rusa, harimau, kupu-kupu, ular)

## Hooks

- `src/hooks/use-progress.ts` — reads/writes localStorage: `{ nim, avatar, pagesRead, quizDone, quizScore, easterEggs }`

## Server Actions

- `src/lib/badge.ts` — calls Anthropic API (`/v1/messages`, claude-sonnet-4-6) to generate badge title. Fallback to default "Penjelajah Belantara" on failure.
- `src/lib/data.ts` — loads JSON from `data/`

## Setup (first-time only)

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --import-alias "@/*" --src-dir
npm install framer-motion
npx shadcn@latest init
npx shadcn@latest add button card progress accordion dialog
```
