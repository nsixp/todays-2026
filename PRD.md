# Product Requirements Document

## TODAYS 2026 — Telkom Orientation Days
### PKKMB Telkom University Purwokerto | Tema: Hutan Rimba (Jungle)

*Disusun mengikuti struktur 7 section inti PRD (Problem Statement, Goals, Target Users, User Stories, Functional Requirements, Non-Functional Requirements, Scope). Dokumen ini bersifat living document — bagian yang masih TBD boleh diisi/diupdate seiring proses development.*

---

## SECTION 1 — Problem Statement

**Masalah yang ingin dipecahkan:**

Setiap tahun, mahasiswa baru Telkom University Purwokerto menerima guidebook PKKMB dalam bentuk dokumen statis (PDF/booklet) yang seringkali tidak dibaca tuntas. Akibatnya banyak mahasiswa baru datang ke hari-H tanpa memahami rangkaian acara, atribut yang harus dibawa, atau bahkan tidak tahu kelompok/gugus mereka sendiri — sehingga panitia harus menjawab pertanyaan yang sama berulang kali secara manual (japri, tanya di lokasi, dsb).

Di sisi lain, proses "cari tahu info PKKMB" saat ini terasa membosankan dan tidak ada insentif bagi mahasiswa baru untuk benar-benar membaca sampai selesai — tidak ada elemen yang membuat mereka termotivasi untuk eksplorasi.

**Celah yang ingin diisi:** sebuah media informasi PKKMB yang tetap informatif (guidebook, jadwal, info kelompok) tetapi dikemas dengan pengalaman interaktif (progress, quiz, reward) sehingga mahasiswa baru terdorong membaca sampai tuntas sebelum mendapat akses ke info kelompoknya.

**Data pendukung:** *(TBD — bisa dilengkapi panitia, misalnya: persentase mahasiswa baru yang tidak membaca guidebook cetak tahun lalu, jumlah pertanyaan berulang yang masuk ke panitia, hasil survei singkat ke beberapa mahasiswa baru)*

---

## SECTION 2 — Goals

| ID  | Tujuan                                                                           | Metrik Kesuksesan                                                                                                                               |
| --- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| G1  | Mahasiswa baru membaca guidebook secara tuntas, bukan sekadar dilewati           | ≥70% mahasiswa baru menyelesaikan seluruh halaman guidebook sebelum hari-H                                                                      |
| G2  | Mahasiswa baru menemukan kelompok PKKMB-nya sendiri tanpa bantuan manual panitia | ≥80% mahasiswa baru berhasil menemukan info kelompoknya sendiri via fitur Cari Kelompok                                                         |
| G3  | Pengalaman terasa menyenangkan tanpa mengorbankan performa                       | Waktu load awal < 3 detik di koneksi 4G rata-rata; animasi tidak lag di HP kelas menengah                                                       |
| G4  | Mengurangi beban tanya-jawab manual ke panitia                                   | Penurunan jumlah pertanyaan berulang (jadwal, kelompok, atribut) yang masuk ke panitia dibanding tahun sebelumnya *(butuh baseline pembanding)* |

---

## SECTION 3 — Target Users / Personas

| Persona                                                         | Deskripsi                                                                                                                                                                                                                                 |
| --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Persona 1: Mahasiswa Baru Antusias**                          | Baru lulus SMA, excited menyambut kampus baru, cenderung mengeksplorasi semua fitur (termasuk kemungkinan menemukan easter egg). Butuh: pengalaman yang terasa "worth it" untuk dieksplorasi, bukan sekadar formulir.                     |
| **Persona 2: Mahasiswa Baru Sibuk/Malas Baca**                  | Cenderung ingin cepat selesai, langsung cari info penting (kelompok, jadwal) tanpa mau membaca panjang. Butuh: alur yang tetap memaksa mereka membaca inti guidebook secara ringkas sebelum lanjut, tapi tidak terasa dipaksa berlebihan. |
| **Persona 3: Mahasiswa Baru dengan Perangkat/Koneksi Terbatas** | Mengakses lewat HP dengan spesifikasi menengah ke bawah dan koneksi tidak selalu stabil. Butuh: website ringan, cepat dimuat, tetap bisa diakses walau koneksi lambat.                                                                    |

---

## SECTION 4 — User Stories

Diurutkan berdasarkan prioritas:

| ID   | Pri | User Story                                                                                                                                                                           |
| ---- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| US-1 | P1  | Sebagai mahasiswa baru, saya ingin memasukkan NIM saya di awal agar sistem mengenali identitas saya.                                                                                 |
| US-2 | P1  | Sebagai mahasiswa baru, saya ingin membaca guidebook dengan nyaman di HP maupun laptop, dengan indikator progres berapa banyak yang sudah saya baca.                                 |
| US-3 | P1  | Sebagai mahasiswa baru, saya ingin mengerjakan quiz singkat setelah membaca guidebook, supaya saya tahu seberapa paham saya terhadap isi guidebook.                                  |
| US-4 | P1  | Sebagai mahasiswa baru, saya ingin mendapatkan badge/reward unik setelah menyelesaikan quiz, sebagai kenang-kenangan sekaligus motivasi menyelesaikan tugas.                         |
| US-5 | P1  | Sebagai mahasiswa baru, saya ingin mengetahui kelompok PKKMB saya (nama kelompok, nomor gugus, lokasi) setelah menyelesaikan quiz.                                                   |
| US-6 | P2  | Sebagai mahasiswa baru yang penasaran, saya ingin bisa mengeksplorasi hub jungle secara bebas (bukan cuma linear), termasuk menemukan hal tersembunyi jika saya mengulik lebih jauh. |
| US-7 | P2  | Sebagai mahasiswa baru, saya ingin melihat jadwal kegiatan PKKMB secara jelas tanpa harus mencari-cari di grup chat.                                                                 |
| US-8 | P3  | Sebagai mahasiswa baru, saya ingin bisa mengunduh atau membagikan badge hasil quiz saya ke media sosial.                                                                             |

---

## SECTION 5 — Functional Requirements

| ID    | Kebutuhan                                                                                                                                                                  | Pri |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| FR-1  | Splash screen menampilkan animasi logo TODAYS dengan elemen jungle (kabut/daun) sebelum masuk ke welcome page                                                              | P1  |
| FR-2  | Halaman welcome menampilkan teks sambutan dengan transisi scroll yang halus                                                                                                | P2  |
| FR-3  | Form input avatar (pilihan sederhana) + input NIM                                                                                                                          | P1  |
| FR-4  | Validasi NIM: sistem mencocokkan NIM dengan data peserta (JSON/CSV/DB); tampilkan pesan error yang jelas jika NIM tidak ditemukan/format salah                             | P1  |
| FR-5  | Hub utama: jungle scene dengan avatar user + 3 signpost (Guidebook, Minigame/Quiz, Cari Kelompok)                                                                          | P1  |
| FR-6  | Guidebook ditampilkan per section/halaman dengan progress tracker (X dari Y halaman terbaca)                                                                               | P1  |
| FR-7  | Signpost Minigame/Quiz berstatus locked secara default, berubah unlocked otomatis setelah guidebook selesai dibaca                                                         | P1  |
| FR-8  | Quiz: 5-10 soal pilihan ganda seputar isi guidebook, skor dihitung otomatis di akhir                                                                                       | P1  |
| FR-9  | Badge generator: judul gelar unik berdasarkan skor quiz, dipilih dari array predefined — ditampilkan sebagai card + ikon hewan + skor                                       | P2  |
| FR-10 | Signpost Cari Kelompok berstatus locked secara default, berubah unlocked otomatis setelah quiz selesai dikerjakan                                                          | P1  |
| FR-11 | Fitur Cari Kelompok: input NIM menampilkan nama kelompok, nomor gugus, lokasi, dan info mentor/kating terkait                                                              | P1  |
| FR-12 | Easter egg: jika user mengklik signpost yang masih locked sebanyak 3 kali, tampilkan pesan rahasia dan unlock fitur tersebut tanpa syarat normal — tanpa hint apapun di UI | P2  |
| FR-13 | Halaman jadwal kegiatan PKKMB yang bisa diakses terpisah dari alur utama                                                                                                   | P2  |
| FR-14 | Halaman FAQ (accordion) untuk pertanyaan umum seputar PKKMB                                                                                                                | P3  |
| FR-15 | Tombol unduh/screenshot badge hasil quiz                                                                                                                                   | P3  |
| FR-16 | Error handling: tampilkan pesan jelas jika data peserta gagal dimuat atau NIM tidak ditemukan                                                                              | P2  |

---

## SECTION 6 — Non-Functional Requirements

| ID    | Kebutuhan                                                                                                                      | Pri |
| ----- | ------------------------------------------------------------------------------------------------------------------------------ | --- |
| NFR-1 | Performa: waktu load awal < 3 detik pada koneksi 4G rata-rata                                                                  | P1  |
| NFR-2 | Responsif penuh, mobile-first (mayoritas akses lewat HP)                                                                       | P1  |
| NFR-3 | Animasi/parallax dibatasi (maks 2-3 layer di hero) agar tidak lag di HP kelas menengah                                         | P1  |
| NFR-4 | Optimasi gambar: format WebP, lazy load untuk aset non-kritikal                                                                | P2  |
| NFR-5 | Aksesibilitas dasar: kontras warna cukup, ukuran font body minimal 14px                                                        | P2  |
| NFR-6 | Data peserta (NIM, kelompok) mudah diperbarui panitia tanpa perlu deploy ulang kode (misal via file JSON/spreadsheet terpisah) | P2  |

*Catatan: target performa diasumsikan diukur di koneksi 4G standar dan perangkat kelas menengah, mengingat mayoritas mahasiswa baru mengakses lewat HP.*

---

## SECTION 7 — Scope (In/Out)

**In Scope v1.0**
- Splash screen + welcome page dengan animasi jungle
- Input avatar + NIM dengan validasi ke data peserta
- Hub utama jungle scene dengan 3 signpost interaktif
- Guidebook dengan progress tracker
- Quiz pilihan ganda dengan skor otomatis
- Badge generator berbasis skor (title local, tanpa AI)
- Fitur Cari Kelompok berbasis NIM
- Logic unlock antar-fitur + easter egg tersembunyi
- Halaman jadwal kegiatan
- Responsif mobile-first

**Out of Scope v1.0 (Ditunda/Tidak Dikerjakan)**
- Sistem login/akun penuh dengan password
- Fitur chat/forum antar-mahasiswa
- Dashboard admin kompleks (data peserta cukup dikelola via file JSON/spreadsheet manual)
- Galeri foto/dokumentasi acara (baru relevan setelah acara berlangsung)
- Integrasi pihak ketiga (kalender, notifikasi push, dsb)
- Multi-bahasa

*Catatan: dokumen ini masih bisa berkembang — beberapa bagian (data pendukung problem statement, baseline metrik G4) sengaja ditandai TBD dan bisa diisi begitu tersedia datanya.*

---

## SECTION 8 — Technical & Design Decisions (Final)

*Bagian ini mencatat seluruh keputusan teknis dan desain yang telah difinalisasi melalui sesi grill/brainstorming. Digunakan sebagai acuan tunggal selama development.*

### 8.1 Tech Stack

| Layer | Pilihan | Alasan |
|-------|---------|--------|
| Framework | Next.js 15 (App Router) + TypeScript | Standar Vercel, performa, SEO |
| Styling | Tailwind CSS v4 | Mobile-first, utility-first |
| Component Library | shadcn/ui | Komponen fungsional siap pakai (button, progress, accordion, card, dialog) |
| Animasi | Framer Motion (saja) | Transisi antar-state + scroll-storytelling via `useScroll` + `useTransform`. GSAP tidak dipakai — overkill untuk 2-3 babak scroll |
| State Persistence | localStorage | Satu object JSON: `{ nim, avatar, pagesRead, quizDone, quizScore, badgeTitle, easterEggs }` |
| Package Manager | npm | Zero config, standar Next.js |

### 8.2 Typography

| Role | Font | Sumber |
|------|------|--------|
| Heading | **Instrument Serif** | Google Fonts |
| Body | **Sora** | Google Fonts |

*Keputusan: menghindari Inter/Roboto/Open Sans (AI slop). Instrument Serif memberi karakter editorial hangat, Sora sebagai sans pendamping yang tidak berebut perhatian.*

### 8.3 Color Palette (Hybrid A + C)

| Token | Hex | Role |
|-------|-----|------|
| `--jungle-deep` | `#1A3A2B` | Background dark, headings, nav |
| `--moss` | `#4E7053` | Secondary text, decorative |
| `--sage` | `#8EA98D` | Muted surface, kartu |
| `--fern-mist` | `#D5D7C8` | Border, separator, garis dekoratif |
| `--warm-cream` | `#FBF7EE` | Background utama, surface |
| `--sunlit-gold` | `#F3C46B` | CTA, highlight, aksen interaktif |
| `--ember` | `#C47A22` | Hover state CTA |

*Catatan: hanya 1 warna dari opsi C (Sunlit Gold) yang dipakai sebagai CTA hangat. Sisanya struktur muted dari opsi A. Tanpa terracotta agar tidak terlalu ramai.*

### 8.4 Routes & Alur Halaman

```
/ (splash) → /welcome → /avatar → /hub → /guidebook → /quiz → /badge → bebas
                                  ├── /jadwal
                                  ├── /faq
                                  └── /kelompok (unlocked setelah quiz)
```

Detail tiap halaman:

| Route | Konten | Animasi Transisi |
|-------|--------|------------------|
| `/` | Splash: logo TODAYS + kabut/daun (SVG) | Fade out 1.5s, auto redirect setelah 3 detik (atau klik skip) — ke `/hub` jika sudah punya progress, ke `/welcome` jika baru |
| `/welcome` | 3 babak scroll-storytelling (siluet hutan, jalur setapak, 3 titik cahaya) | Framer Motion `whileInView` |
| `/avatar` | Pilih 1 dari 6 ikon hewan hutan SVG + input NIM + lookup ke JSON | Slide up |
| `/hub` | Jungle scene: avatar di tengah, 3 signpost (Guidebook ✅, Quiz 🔒, Kelompok 🔒) | Stagger children |
| `/guidebook` | 6 section, Next/Prev, progress bar | Slide horizontal |
| `/quiz` | 8 soal pilihan ganda, skor di akhir | Fade |
| `/badge` | Card + ikon hewan + title AI (Anthropic) + skor | Scale in |
| `/kelompok` | Input NIM → tampilkan nomor+nama kelompok + mentor | Fade |
| `/jadwal` | Tabel jadwal kegiatan | Fade |
| `/faq` | Accordion FAQ | Accordion expand |

### 8.5 Hub Jungle Scene — Visual Spec

- **Approach:** CSS illustration + SVG dekoratif (siluet daun floating)
- **Background:** Gradien Warm Cream → Sage tipis
- **Avatar:** Posisi tengah bawah
- **3 Signpost:** Menyebar (kiri, tengah atas, kanan), dihubungkan jalur setapak putus-putus (`border-dashed`)
- **Status locked:** Grayscale
- **Status unlocked:** Warna penuh + glow halus
- **Desktop:** Horizontal
- **Mobile (HP):** Grid 2-1-2 (baris 1: 2 signpost, baris 2: avatar, baris 3: 1 signpost)
- **Animasi:** Signpost muncul staggered saat pertama kali render

### 8.6 Guidebook Spec

- **Jumlah section:** 6 (Sambutan, Rundown, Atribut, Tata Tertib, Peta, Kontak)
- **Navigasi:** Next/Prev buttons, satu section per layar
- **Progress bar:** `X/6 halaman` di atas
- **Completion:** View semua 6 halaman (tekan Next sampai akhir) = guidebook selesai
- **Trigger:** Segera redirect ke `/hub` dengan Quiz signpost unlocked

### 8.7 Quiz Spec

- **Jumlah soal:** 8 pilihan ganda (4 opsi per soal)
- **Feedback:** Skor total di akhir (`X/8` + persentase) — tidak ada feedback per soal
- **Passing threshold:** Tidak ada — selesai = unlock Cari Kelompok
- **Retake:** Tidak bisa. Sekali submit → redirect ke `/badge`. Revisit `/quiz` → redirect ke `/badge`.
- **Trigger badge:** Segera setelah submit, tampilkan `/badge`

### 8.8 Badge Generator

- **Method:** Local title generator — predefined array of titles per score range. Zero external API calls.
- **Title tiers (skor → opsi title):**
  - 8/8: "Maharaja Rimba", "Sang Penguasa Hutan", "Raja Belantara"
  - 6-7/8: "Penjelajah Sejati", "Ksatria Hutan", "Perantau Rimba"
  - 4-5/8: "Petualang Tangguh", "Sang Penemu", "Pejalan Hijau"
  - 0-3/8: "Penghuni Baru", "Si Mata Elang", "Pelajar Rimba"
- **Icon tiers (score → animal):** 8/8 = harimau, 6-7/8 = rusa, 4-5/8 = burung, 0-3/8 = monyet
- **Selection:** Title dipilih berdasarkan hash `nama` user agar konsisten tiap revisit
- **Persistence:** Title + icon disimpan ke `localStorage.badgeTitle` + `localStorage.badgeIcon`
- **Catatan:** Hanya title, tanpa SVG/deskripsi di v1.0

### 8.9 Cari Kelompok Spec

- **Input:** NIM (cocokkan ke `participants.json`)
- **Output:** Nomor kelompok, nama kelompok, mentor
- **Unlock:** Setelah quiz selesai
- **Note:** Field `gugus` tidak dipakai. Data: `{ nomor_kelompok: number, nama_kelompok: string, mentor: string }`

### 8.10 Avatar Spec

- **Jumlah:** 6 pilihan
- **Jenis:** Ikon hewan hutan flat SVG inline (monyet, burung, rusa, harimau, kupu-kupu, ular)
- **Format:** React component SVG inline (tidak perlu load gambar eksternal)
- **Penyimpanan:** `avatar` key di localStorage

### 8.11 Easter Egg

- **Trigger:** 3 klik pada signpost yang masih locked
- **Feedback:** Modal popup dengan pesan "Kamu menemukan jalan rahasia di balik dedaunan... Fitur [nama] telah terbuka!"
- **Efek:** Langsung unlock fitur tersebut tanpa syarat normal
- **Hint di UI:** Tidak ada — harus organic discovery

### 8.12 Loading & Error States

| Skenario | State | Behavior |
|----------|-------|----------|
| NIM lookup (avatar page) | Error | Tampilkan "NIM tidak ditemukan" — input tetap bisa diedit |
| Data JSON loading | Loading | Tidak perlu skeleton — data lokal, instan (<10ms) |
| Halaman tidak dikenal | 404 | Next.js default not-found page — tidak perlu kustomisasi |

### 8.13 Navbar

- **Muncul di:** Semua halaman kecuali splash, guidebook, dan quiz
- **Item:** Jadwal | FAQ
- **Posisi:** Fixed top (kecuali di halaman welcome yang full-screen)

### 8.13 Revisit Behavior

- Cek localStorage saat `/` di-load.
- Durasi splash tetap sama (3 detik / klik skip) untuk semua user.
- Jika **tidak ada progress** (belum input NIM/avatar) → setelah splash → `/welcome`.
- Jika **ada progress** (sudah punya NIM + avatar) → setelah splash → `/hub`.

### 8.14 NIM Validation

- Tidak ada validasi format spesifik (prefix/panjang)
- Cukup cocokkan NIM input dengan data di `participants.json`
- Jika tidak ditemukan → tampilkan pesan error: "NIM tidak ditemukan"

### 8.15 Data Files (Modular JSON)

| File | Isi |
|------|-----|
| `data/participants.json` | 30+ peserta: `{ nim, nama, nomor_kelompok, nama_kelompok, mentor }` |
| `data/guidebook.json` | 6 section: `{ id, title, content: string[] }` — content adalah array of paragraphs |
| `data/quiz.json` | 8 soal: `{ id, question, options[], correctIndex }` |
| `data/faq.json` | 6-8 FAQ: `{ id, question, answer }` |
| `data/schedule.json` | Jadwal kegiatan |

### 8.16 File Structure

```
todays-2026/
├── data/
│   ├── participants.json
│   ├── guidebook.json
│   ├── quiz.json
│   ├── faq.json
│   └── schedule.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          (splash)
│   │   ├── globals.css
│   │   ├── welcome/page.tsx
│   │   ├── avatar/page.tsx
│   │   ├── hub/page.tsx
│   │   ├── guidebook/page.tsx
│   │   ├── quiz/page.tsx
│   │   ├── badge/page.tsx
│   │   ├── kelompok/page.tsx
│   │   ├── jadwal/page.tsx
│   │   └── faq/page.tsx
│   ├── components/
│   │   ├── splash-screen.tsx
│   │   ├── welcome-section.tsx
│   │   ├── avatar-selector.tsx
│   │   ├── nim-input.tsx
│   │   ├── jungle-hub.tsx
│   │   ├── signpost.tsx
│   │   ├── guidebook-viewer.tsx
│   │   ├── quiz-view.tsx
│   │   ├── badge-result.tsx
│   │   └── navbar.tsx
│   │   └── icons/
│   │       ├── monyet.tsx
│   │       ├── burung.tsx
│   │       ├── rusa.tsx
│   │       ├── harimau.tsx
│   │       ├── kupu-kupu.tsx
│   │       └── ular.tsx
│   ├── hooks/
│   │   └── use-progress.ts
│   ├── lib/
│   │   ├── data.ts
│   │   └── badge.ts
│   └── types/
│       └── index.ts
├── public/
│   └── images/
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```