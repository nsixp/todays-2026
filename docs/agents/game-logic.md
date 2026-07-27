# Game Logic

## Unlock Flow

```
Guidebook completed (view all 6 pages)
  → Quiz signpost unlocks

Quiz submitted (any score)
  → Cari Kelompok signpost unlocks
```

- Quiz has 8 multiple-choice questions. Score shown at end as `X/8`.
- No passing threshold — completing the quiz is enough to unlock Cari Kelompok.
- Badge (title via Anthropic API) shown after quiz, then user free to explore.

## Easter Egg

- 3 clicks on any locked signpost → modal appears: "Kamu menemukan jalan rahasia di balik dedaunan... [Fitur] telah terbuka!"
- Instantly unlocks that feature without normal requirements.
- **No UI hint.** Must be organic discovery.

## Revisit Behavior

- Splash shows for 1 second, then redirects to `/hub` if progress exists in localStorage.
- First-time users: splash → `/welcome`.

## Badge

- Generated via Anthropic API (claude-sonnet-4-6) — just a title string.
- Displayed as card + one of the 6 animal icons + title + score.
- Fallback title: "Penjelajah Belantara" if API fails.
