# TODAYS 2026

Interactive orientation companion for new students of Telkom University Purwokerto. Explore a jungle-themed guidebook, test your TODAYS knowledge, and find your group.

## Features

- **Splash Intro.** A cinematic clip-path animation that feels like stepping into a forest.
- **Avatar Picker.** Choose from 6 forest animals.
- **Kitab Penjelajah (Guidebook).** A digital flip book with 4 chapters of TODAYS info.
- **Ujian Rimba (Quiz).** 5 questions with instant feedback on each answer.
- **Temukan Suku (Find Group).** Enter your NIM to find your orientation group.
- **Password Unlock.** The quiz and group finder stay locked until you find the password in the guidebook.
- **Progress Tracking.** 3 carved totems show how far you have come.
- **Completion Popup.** Confetti and a WA contact button appear when all missions are done.

## Design

A warm forest aesthetic with wood textures, organic shapes, and glow accents. All visuals are pure CSS and inline SVG with no external image files.

## Built With

SvelteKit 5, Tailwind CSS v4, deployed as a static site.

## Project Structure

```
src/
├── routes/          # Pages
├── lib/
│   ├── components/  # UI components
│   ├── stores/      # State management
│   └── data/        # Static JSON data
├── app.css          # Global styles
└── app.html         # Entry HTML
```

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production (output: build/)
npm run preview  # Preview production build
```
