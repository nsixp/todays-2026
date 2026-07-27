# Jejak Rimba — Interactive Fiction Game Design

## Overview

Jejak Rimba adalah game interactive fiction / choose-your-own-adventure bertema jungle. Pemain adalah mahasiswa baru yang "tersesat" di hutan kampus pada hari pertama PKKMB. Setiap babak menampilkan narasi dan 3-4 kartu pilihan yang menentukan arah cerita. Game muncul sebagai signpost ke-4 di Hub, unlocked setelah badge quiz.

## Story Premise

Hari pertama PKKMB. Kamu terbangun di tengah hutan rimba kampus — kabut tebal, suara dedaunan, dan 6 jalur berbeda di depanmu. Setiap hewan (avatar-mu) muncul sebagai "roh penuntun" yang memberi petunjuk di titik-titik kritis. Pilihanmu menentukan apakah kamu akan menemukan jalan keluar dengan bijak, tersesat lebih dalam, atau menemukan rahasia tersembunyi hutan.

## Game Structure

### Node Count: 6-8 branching nodes per playthrough
### Endings: 3
### Replayability: Full (progress & ending disimpan per sesi)

## Node Data Structure

```typescript
interface JejakRimbaNode {
  id: string           // unique node id, e.g. "node-1", "node-a2"
  narasi: string       // story text, 2-4 kalimat
  latar?: string       // background mood: "canopy" | "river" | "cave" | "clearing" | "ruins"
  pilihan: JejakRimbaPilihan[]
  ending?: JejakRimbaEnding  // only on terminal nodes
}

interface JejakRimbaPilihan {
  text: string         // short action text, 2-4 words: "Ikuti Cahaya", "Daki Tebing"
  icon: AvatarId       // animal icon: monyet, burung, rusa, harimau, kupu-kupu, ular
  nextId: string       // target node id
}

interface JejakRimbaEnding {
  title: string        // ending title: "Penjelajah Bijaksana", "Tersesat Selamanya"
  deskripsi: string    // 1-2 paragraph ending story
  tier: "good" | "neutral" | "hidden"
}
```

## Flow Design

```
                    ┌─ node-2 ── node-4 ── node-6 ── [good ending]
                    │
node-1 ──┬── node-3 ── node-5 ── node-7 ── [neutral ending]
         │
         └── node-8 ── node-9 ── [hidden ending]
                        ↑
              (requires selecting specific
               animal card 3 times in a row)
```

- **Good ending (tier: "good"):** Pemain memilih jalur berani namun bijaksana → ditemani roh harimau
- **Neutral ending (tier: "neutral"):** Pemain memilih jalur aman namun lambat → ditemani roh rusa
- **Hidden ending (tier: "hidden"):** Pemain memilih kartu dengan ikon yang SAMA dengan avatar-nya 3x berturut-turut → membuka lorong rahasia

## Card UI Mechanics

### Layout
- **Atas (60% tinggi layar):** Narasi + background latar (CSS gradient sesuai `latar`)
- **Bawah (40%):** Kartu pilihan tersebar melengkung (CSS flex + rotate transform)

### Card Design
- Icon hewan (salah satu dari 6) di tengah card
- Border berwarna sesuai hewan (monyet: gold, burung: biru, rusa: hijau, harimau: orange, kupu: pink, ular: ungu)
- Judul aksi pendek di bawah icon
- Avatar player muncul LEBIH SERING di opsi pilihan (sekali setiap 3 kartu pasti ada kartu avatar)

### Animations (Framer Motion)
1. **Card appear:** Spring masuk dari bawah, `stiffness: 200, damping: 20`, staggered tiap card
2. **Hover:** Scale 1.05, border glow
3. **Select:** Card terpilih flip (rotateY 180) + fade ke tengah
4. **Narasi slide:** Narasi baru slide dari kanan, yang lama slide ke kiri
5. **Ending:** Full-screen fade in, scale text

## State Management

```typescript
interface JejakRimbaState {
  currentNodeId: string
  history: string[]         // list of node ids visited (for back button)
  ending: string | null     // ending id if reached
}

// Stored in localStorage key: "todays-jejak-rimba"
// Hook: useJejakRimba() returns { state, pilih, reset, canGoBack, goBack }
```

## Unlock Logic

- **Default:** Locked
- **Unlock when:** `progress.quizDone === true`
- **Easter egg:** 3 clicks on locked Jejak Rimba signpost
- **Hub signpost position:** 4th signpost, di pojok kanan bawah layout

## File Locations

| File | Path |
|------|------|
| Game data JSON | `data/jejak-rimba.json` |
| Game page | `src/app/jejak-rimba/page.tsx` |
| Card component | `src/components/jejak-rimba-card.tsx` |
| Game state hook | `src/hooks/use-jejak-rimba.ts` |
| Types | `src/types/index.ts` |
| Data loader | `src/lib/data.ts` |
