# DESIGN: TODAYS 2026

**Theme:** Hutan Rimba. Warm, immersive, adventurous.

## 1. Color Palette

### Background

| Token | Hex | Usage |
|-------|-----|-------|
| `--hutan-bg` | `#0D2818` | Main page background |
| `--hutan-bg-gelap` | `#071A10` | Deeper layer, overlays, bottom gradient |
| `--hutan-bg-langit` | `#0F331E` | Sky fade, splash gradient top |
| `--hutan-bg-overlay` | `rgba(7, 26, 16, 0.6)` | Modal backdrop, scrim |

### Surface

| Token | Hex | Usage |
|-------|-----|-------|
| `--hutan-card` | `#1A4A2E` | Card, panel, elevated surface |
| `--hutan-card-hover` | `#205738` | Card hover state |
| `--hutan-card-terang` | `#23663E` | Highlighted card, active panel |
| `--hutan-card-border` | `#163D26` | Card inner border |

### Accent

| Token | Hex | Usage |
|-------|-----|-------|
| `--hutan-aksen` | `#6BAA3D` | Primary accent, buttons, active |
| `--hutan-aksen-hover` | `#5C9632` | Accent hover, button hover |
| `--hutan-aksen-ringan` | `#8FCF5C` | Light accent, subtle highlights |
| `--hutan-aksen-bg` | `rgba(107, 170, 61, 0.15)` | Accent background, tag, badge |

### State

| Token | Hex | Usage |
|-------|-----|-------|
| `--hutan-sukses` | `#2ECC71` | Success, correct answer |
| `--hutan-error` | `#E74C3C` | Error, wrong answer, alert |
| `--hutan-info` | `#3498DB` | Info, hint |
| `--hutan-warning` | `#F39C12` | Warning, caution |

### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `--hutan-teks` | `#F0F0E8` | Primary text, headings |
| `--hutan-teks-sekunder` | `#A8C5A0` | Secondary text, labels |
| `--hutan-teks-tertiary` | `#7A9A75` | Muted text, captions |
| `--hutan-teks-aksen` | `#D4A853` | Accent text, gold highlights |
| `--hutan-teks-cokelat` | `#C4956A` | Wood text, warm labels |

### Border

| Token | Hex | Usage |
|-------|-----|-------|
| `--hutan-border` | `#2A5E3E` | Default border |
| `--hutan-border-ringan` | `#1F4A2E` | Subtle border |
| `--hutan-border-aksen` | `#6BAA3D` | Accent border, focus ring |

### Nature

| Token | Hex | Usage |
|-------|-----|-------|
| `--hutan-cokelat` | `#5C3A21` | Wood texture, signpost post |
| `--hutan-cokelat-ringan` | `#8B5E3C` | Light wood, signpost board |
| `--hutan-cokelat-gelap` | `#3E2615` | Dark wood, divider |
| `--hutan-terang` | `#F5C542` | Sunlight, heading highlight |
| `--hutan-terang-gelap` | `#D4A530` | Golden accent hover |

## 2. Typography

- **Heading:** Barlow Condensed (600, 700, 800). Bold, condensed, adventurous.
- **Body:** Sora (400, 500, 600). Geometric warm, clean, readable.
- Both are variable-weight Google Fonts, lightweight.

### Heading Scale (Barlow Condensed 700)

| Token | Mobile | Tablet (md) | Desktop (lg) |
|-------|--------|-------------|--------------|
| h1 | 36px / 2.25rem | 48px / 3rem | 64px / 4rem |
| h2 | 28px / 1.75rem | 36px / 2.25rem | 48px / 3rem |
| h3 | 22px / 1.375rem | 26px / 1.625rem | 32px / 2rem |
| h4 | 18px / 1.125rem | 20px / 1.25rem | 24px / 1.5rem |
| h5 | 16px / 1rem | 18px / 1.125rem | 20px / 1.25rem |

### Body Scale (Sora 400)

| Token | Mobile | Tablet (md) | Desktop (lg) |
|-------|--------|-------------|--------------|
| body | 14px / 0.875rem | 15px / 0.9375rem | 16px / 1rem |
| small | 11px / 0.6875rem | 12px / 0.75rem | 13px / 0.8125rem |

### Spacing and Size Tokens

| Token | Value |
|-------|-------|
| Section padding | `p-4` `md:p-6` `lg:p-8` |
| Card padding | `p-5` `md:p-6` |
| Element gap | `gap-3` `md:gap-4` |
| Max content width | `max-w-lg` (512px) `md:max-w-xl` (576px) |

### Border Radius

| Element | Tailwind |
|---------|----------|
| Cards, panels | `rounded-xl` (12px) |
| Modal, popup | `rounded-2xl` (16px) |
| Buttons | `rounded-lg` (8px) |
| Avatar circle | `rounded-full` |

### Shadows

| Level | Value |
|-------|-------|
| Card | `shadow-lg shadow-black/30` |
| Modal | `shadow-2xl` |
| Accent glow | `shadow-[0_0_20px_rgba(107,170,61,0.4)]` |
| Signpost | `shadow-md` |

## 3. Full Viewport and Responsive

### Principles

| Page | Layout | Reason |
|------|--------|--------|
| **Splash, Onboarding, Home** | `h-screen` (100vh) | No scroll, all elements in one screen |
| **Guidebook, Quiz, Group** | `min-h-screen` | Content may exceed screen |

All pages use `h-screen` or `min-h-screen` with `bg-hutan-bg` so there are no white gaps.

### Splash (`/`)
- `h-screen` centered both axes
- TODAYS logo: green circle, 80px mobile / 100px tablet / 130px desktop
- Teks sambutan below the logo
- Background gradient: `#0D2818 → #0F331E → #0D2818`
- Floating glow behind the logo

### Onboarding (`/onboarding`)
- `h-screen` centered both axes
- Avatar preview: 72px circle above grid
- Avatar grid: 3 by 2, max 3 columns
- Input NIM + button below grid
- Auto-scroll down when keyboard appears (mobile)
- Max width: 360px mobile / 400px tablet / 420px desktop

### Home (`/home`) (Forest Crossroads)
- `h-screen`, full-screen forest scene, no scroll
- Elements positioned with flex/grid/absolute to fill viewport

**Desktop layout (lg, 1024px and up):**
```
┌──────────────────────────────────────┐
│    🌲🌲🌲  Canopy  🌲🌲🌲           │ ~10%
│       🏮🏮🏮 (totem progress)        │
│                                      │
│          📖 Kitab Penjelajah         │ ~25%
│            ╱ (signpost up)           │
│           ╱                          │
│  🧠 Ujian ─── 🧑 ─── 🔍 Temukan     │ ~30%
│  Rimba           │    Suku           │
│            (wooden post)              │
│                                      │
│    🌿🌿  Ground / rumput  🌿🌿       │ ~35%
└──────────────────────────────────────┘
```

**Tablet (md, 768 to 1023px):**
- Signposts scale down with smaller font
- Board gaps reduced
- Forest stays full, tree layer shrinks

**Mobile (under 768px):**
- Forest simplified to 2 layers instead of 3
- Signposts become a vertical stack (top to bottom)
- Avatar on top, 3 signposts as full-width cards below
- Fireflies removed for performance, floating leaves reduced

**Signpost design:**
- Post: brown gradient `linear-gradient(90deg, #5C3A21, #8B5E3C, #5C3A21)`
- Board: div with wood grain gradient (same as Card pattern), border radius, shadow, transform rotate
- Label: forest name (Barlow Condensed h3) on top, real name (Sora small) on bottom
- Nails: small circles (#C0C0C0) at each board end, same style as card corner nails
- Each board is clickable for navigation or unlock modal

**Signpost state visual:**

| State | Appearance |
|-------|------------|
| Open | Light green board (`bg-hutan-aksen/20` `border-hutan-aksen`), clear path |
| Locked | Dark board (`bg-hutan-card/50 opacity-60`), 🔒 next to name |
| Done | Green glow board (`shadow-[0_0_15px_rgba(107,170,61,0.5)]`), ✅ next to name |

### Guidebook (`/guidebook`)
- `min-h-screen`, full background, content centered
- Max width: 100% mobile / 520px tablet / 600px desktop
- Guidebook card: `bg-hutan-card` with border, 24px padding
- Previous/Next navigation below the card

### Quiz (`/quiz`)
- `min-h-screen`, full background, content centered
- Max width same as guidebook
- Question in card, answer options stacked
- Thin progress bar above the card

### Group (`/group`)
- `min-h-screen`, full background
- Loading state fills the screen
- Result card centered, max width 600px desktop

## 4. Interaction Design

### Philosophy

No external animation library. CSS keyframes + Svelte built-in transitions are enough. The splash screen should feel like stepping into a video intro, not a loading bar.

### Splash Intro (video-like sequence)

The splash is a choreographed CSS sequence, no JavaScript animation lib:
1. Start with black screen (0 to 0.3s)
2. Circle `clip-path: circle(0)` grows to full screen, revealing the forest gradient (0.3 to 0.8s)
3. TODAYS logo scales up with a soft glow `box-shadow` behind it (0.3 to 1.2s)
4. Teks sambutan sweeps in via `clip-path: inset(0 100% 0 0)` to `inset(0)` (1.2 to 2s)
5. Background gradient subtly shifts position (continuous)
6. Auto-redirect at 4s

### Animations

| Element | Technique | Duration |
|---------|-----------|----------|
| Splash lens open | `clip-path: circle()` expanding | 0.5s |
| Splash logo | CSS scale + glow | 1.2s |
| Teks sambutan | `clip-path: inset()` sweep | 0.8s |
| Page transition | Leaf bush overlay, CSS clip-path sweep covering screen | 0.6s |
| Signpost appear | Svelte fly + stagger per board | 0.5s + 0.15s |
| Signpost hover | CSS scale(1.05) + brightness | 0.2s |
| Unlock modal | Scale + backdrop blur | 0.2s |
| Loading kelompok | CSS bounce infinite | 1.5s |
| Progress totem | CSS scale-up per lantern | 0.5s |
| Confetti popup | CSS keyframe fall | 2-4s |
| Floating leaves | CSS keyframe float | 6-14s infinite |
| Kunang-kunang | CSS keyframe float + glow pulse | 3-7s infinite |

### Menu Names

| Forest Name (immersive) | Real Name | Icon |
|----------------------|-----------|------|
| Kitab Penjelajah | Guidebook | 📖 |
| Ujian Rimba | Quiz | 🧠 |
| Temukan Suku | Cari Kelompok | 🔍 |

### Unlock Mechanism

- Modal appears when clicking a locked signpost
- Only way to unlock: password `RIMBA2026` (found on guidebook page 2)
- Clicking outside the modal closes it without unlocking

### State Visual

| State | Signpost Style |
|-------|----------------|
| Open | Light green board (`bg-hutan-aksen/20`), border glow |
| Locked | Dark board (`bg-hutan-card/50 opacity-60`), 🔒 |
| Done | Green glow board (`bg-hutan-aksen/30 ring-2`), ✅ |

## 5. Forest Scene Layer Composition (z-index)

Home uses layered scenes for an immersive forest. Z-index from back to front:

| z-index | Layer | Content | Technique |
|---------|-------|---------|-----------|
| 0 | **Sky/Background** | Dark green to faint blue gradient | `radial-gradient` |
| 1 | **Far trees** | Transparent thin tree silhouettes | SVG inline / CSS pseudo |
| 2 | **Mid trees** | Solid trees on left and right | SVG inline / CSS pseudo |
| 3 | **Ground** | Dirt path + grass below | `linear-gradient` horizontal |
| 4 | **Canopy** | Top leaf frame (overflow hidden) | CSS shapes / SVG |
| 5 | **Totem progress** | 3 lanterns above the scene | Absolute divs |
| 10 | **Signpost** | Post + 3 direction boards | Div + CSS transform |
| 15 | **Avatar** | User emoji + name + real name | Relative/flex div |
| 20 | **Floating leaves** | Falling leaf particles | CSS keyframe fixed |
| 25 | **Kunang-kunang** | Yellow light particles | CSS keyframe fixed |

**Responsive simplification (mobile):**
- Far trees and Mid trees merged into 1 layer
- Fireflies removed
- Floating leaves reduced to 3 particles

**Asset approach (hybrid):**
- Tree silhouettes: SVG inline, AI generated or from undraw.co
- Leaf texture (ground): CSS pattern from heropatterns.com
- Signpost icons: built-in emoji
- Wood pattern: CSS gradient, no images
- Avatar: emoji for v1, can upgrade to humaaans.com later
- Only favicon as image file (.png)

## 6. Immersive Elements

- **Floating leaves:** 6 CSS keyframe particles with random position and speed. Mobile: 3.
- **Kunang-kunang:** Small CSS particles in `#F5C542` with glow and random float. Desktop only.
- **Semak duri (locked):** CSS pseudo-elements + emoji 🌵🔒 on locked paths (desktop) or badge (mobile).
- **Vines:** SVG inline on left and right sides of layout (desktop). Simplified on mobile.
- **Noise texture:** Subtle background pattern via CSS from heropatterns.com.
- **Glow effect:** `text-shadow` soft green on splash logo (0 0 40px #6BAA3D) and active signpost.
- **Totem progress:** 3 carved wooden totems with ring details (see Forest Themed Components).
- **Avatar bounce:** Gentle translateY(-3px) float animation, infinite on home.

## 7. Asset Strategy

| Asset | Type | Source | Implementation |
|-------|------|--------|----------------|
| Tree silhouettes | SVG inline | AI generate or undraw.co | Inline in Home component |
| Menu icons | Emoji | Built-in | 📖 🧠 🔍 |
| Background pattern | CSS | heropatterns.com | `background-image` in app.css |
| Font | Google Fonts | fonts.google.com | `<link>` in app.html |
| Animal avatars | Emoji (v1) | Built-in | Can upgrade to humaaans.com later |
| Wood pattern | CSS gradient | Built-in | `linear-gradient` without images |
| Favicon | .png file | Self-made | `static/favicon.png` |
| Vines decorative | SVG inline | AI generate or lucide.dev | Inline in layout component |

**Note:** All SVG and code assets are inline in Svelte components, not external files. Only the favicon is an image file.

## 8. Forest Themed Components

Each component is designed to feel carved from the forest, not borrowed from a generic design system. No standard rounded rectangles. No flat white cards. Everything should look like it belongs in a jungle clearing.

### Card (Papan Kayu)

Cards look like wooden planks lashed together.

```
┌──────────────────────────────┐
│  ═══  ═══  ═══  ═══  ═══    │  ← wood grain (subtle CSS gradient)
│  ┌──────────────────────┐    │
│  │                      │    │
│  │     Content here     │    │
│  │                      │    │
│  └──────────────────────┘    │
│  ●                    ●      │  ← nail heads at corners
└──────────────────────────────┘
```

- Background: `linear-gradient(135deg, #1A4A2E, #205738)` with a subtle repeating `linear-gradient` for wood grain stripes (1px, < 5% opacity)
- Border: `border-hutan-border`, `rounded-xl`
- Corner nails: two small circles via `::before` / `::after` pseudo-elements (8px, `bg-zinc-400`, `rounded-full`, positioned top-left and bottom-right)
- Inner content area: slightly inset, `bg-hutan-bg/30`
- Hover: grain stripes shift position slightly via `background-position` transition (0.4s)
- No generic `shadow-lg` alone. Shadow is tinted green: `box-shadow: 0 4px 20px rgba(6, 26, 16, 0.5)`

### Popup / Modal (Ranting Frame)

Modal looks like a clearing surrounded by branches. No standard blurred glass.

```
       ╱╲        ╱╲
      ╱  ╲──────╱  ╲              ← corner branches (SVG inline)
     │    Modal    │
     │   content   │
     │    ────     │
     │  [close]    │
     ╲  ╱──────╲  ╱
      ╲╱        ╲╱
```

- Backdrop: `bg-hutan-bg-gelap` at 70% opacity, not a blur overlay (blur is fine but secondary)
- Four corner vines rendered as inline SVG paths (drawn once, reused via `<use>`)
- Modal body: same wood plank treatment as Card, but with `rounded-2xl` and a subtle `clip-path: polygon(2% 0, 98% 0, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0 98%, 0 2%)` that slightly indents the corners for an organic feel
- Close button (✕): sits on a small leaf-shaped badge (`clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%)`), green background
- Entrance: CSS `scale(0.9)` + `opacity(0)` to `scale(1)` + `opacity(1)`, 0.25s, cubic-bezier spring

### Button (Kayu / Daun)

Two variants, picked by context:

**Wood button (primary):**
- Background: `linear-gradient(135deg, #5C3A21, #8B5E3C)` with subtle wood grain overlay
- Text: `text-hutan-teks`, Barlow Condensed 600
- Hover: brightness increase, slight scale
- Active: `translateY(1px)` + darker shadow
- Shape: `rounded-lg` with `clip-path` that gives a hand-carved irregular edge: `polygon(4% 0, 96% 0, 100% 20%, 100% 80%, 96% 100%, 4% 100%, 0 80%, 0 20%)`

**Leaf button (accent / secondary):**
- Background: `bg-hutan-aksen`, no grain
- Bottom edge: pointed like a leaf tip via `clip-path: polygon(5% 0, 95% 0, 100% 100%, 50% 85%, 0 100%)`
- Hover: glow `shadow-[0_0_15px_rgba(107,170,61,0.4)]`
- Shape width: shorter than wood button (leaf proportions)

### Form Input (Ukiran Kayu)

Inputs look like text carved into a wooden surface.

- Background: `bg-hutan-card` (recessed)
- Inner shadow: `box-shadow: inset 0 2px 4px rgba(0,0,0,0.3)` (carved feel)
- Border: `border-hutan-border-ringan`
- Focus: glow ring using `ring-hutan-aksen/40`, not a thick solid color
- Placeholder: `text-hutan-teks-tertiary`, italic
- The input surface has a subtle wood grain (same as card, but darker)
- Cursor: styled `caret-color: #6BAA3D` (green glow, like a firefly)

### Progress Indicator (Totem Ukir)

Three wooden totems, each carved with rings. Replaces generic dots or progress bars.

```
    ┌──┐    ┌──┐    ┌──┐
    │▓▓│    │  │    │  │         ← carved rings on each totem
    │▓▓│    │  │    │  │
    │▓▓│    │  │    │  │
    └──┘    └──┘    └──┘
   (done)  (curr)  (locked)
```

- Each totem is a narrow vertical rectangle (`w-5 h-16`), `rounded-sm`
- Base color: `bg-hutan-cokelat` with vertical grain stripe
- Horizontal carved rings: 3 `box-shadow: inset` stripes (1px, darker brown, evenly spaced)
- Done state: top section glows green (`box-shadow: 0 -4px 12px rgba(107,170,61,0.5)`), filled with `bg-hutan-aksen`
- Active state: middle section has pulsing glow animation
- Locked: completely dark, `opacity-40`
- Spacing: `gap-4` between totems, connected at the base by a horizontal wooden beam (`w-full h-2 bg-hutan-cokelat-gelap` underneath)

### Divider (Akar / Ranting)

Dividers between sections look like exposed roots or fallen branches, not `<hr>` lines.

- `height: 4px`, full width
- Background: `linear-gradient(90deg, transparent, #5C3A21, #8B5E3C, #5C3A21, transparent)` (fades in from edges)
- Before/after pseudo: small branch knots (6px circles) at 25% and 75% position
- Alternative: wavy variant via `clip-path: polygon(0 40%, 10% 60%, 20% 35%, 30% 65%, ...)` repeating

### Badge / Tag (Daun Kecil)

Status badges (open, locked, done) are small leaf shapes, not rectangles.

- Background: `bg-hutan-card`
- Shape: `clip-path: polygon(0 50%, 15% 0, 85% 0, 100% 50%, 85% 100%, 15% 100%)` (oval leaf with pointed ends)
- Rotated slightly (-5deg to 5deg, random per instance)
- Done badge: green fill `bg-hutan-sukses`
- Locked badge: dark fill with 🔒 emoji
- Text: 11px, uppercase, tighter tracking

### Avatar Frame

The avatar preview is not a plain circle. It sits inside a wooden medallion.

```
    ┌────┐
   ╱ .  . ╲              ← wooden ring frame
  │  (🐒)  │
   ╲      ╱
    └────┘
    ═══════               ← small name plaque below
     Monyet
```

- Outer ring: `border-4 border-hutan-cokelat-ringan`, `rounded-full`, with a carved inner ring (`box-shadow: inset 0 0 0 3px #3E2615`)
- Plaque below: rectangle with pointed bottom (`clip-path: polygon(5% 0, 95% 0, 100% 100%, 50% 85%, 0 100%)`), background `bg-hutan-cokelat`, text Barlow Condensed
- Selected avatar: ring glows green (`box-shadow: 0 0 12px rgba(107,170,61,0.5)`)

### Glass / Container Cards

For cards that need to show background forest scene through them (e.g., guidebook page on home):

```
  ┌─── translucent ───┐
  │  forest visible   │
  │  through card     │
  │                   │
  └───────────────────┘
```

- Background: `rgba(13, 40, 24, 0.85)` instead of `backdrop-blur` (avoids performance hit and glassmorphism cliché)
- Border: thin, `1px solid rgba(107, 170, 61, 0.2)`
- This is NOT frosted glass. It is a thin layer of forest mist.
