# TODAYS 2026

Telkom Orientation Days 2026 website. It guides new students of Telkom University Purwokerto to learn about TODAYS and find their groups before PKKMB starts.

## Tech Stack

- **SvelteKit 5** as framework
- **Tailwind CSS v4** for styling
- **@sveltejs/adapter-static** for static site generation

## Commands

```bash
npm run dev      # Development server
npm run build    # Build static site (output in build/)
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── routes/        # Pages (splash, onboarding, home, guidebook, quiz, group)
├── lib/
│   ├── components/  # UI components
│   ├── stores/      # Svelte stores (progress state)
│   └── data/        # Static JSON data
├── app.css        # Tailwind + custom theme
└── app.html       # Entry HTML
```

## Theme

Immersive forest experience with floating leaves, signposts at a crossroads, and password based unlock mechanics.
