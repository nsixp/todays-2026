export interface Participant {
  nim: string
  nama: string
  nomor_kelompok: number
  nama_kelompok: string
  mentor: string
}

export interface GuidebookSection {
  id: number
  title: string
  content: string[]
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
}

export interface FAQItem {
  id: number
  question: string
  answer: string
}

export interface ScheduleItem {
  hari: number
  tanggal: string
  kegiatan: string
  waktu: string
  lokasi: string
}

export type AvatarId = "monyet" | "burung" | "rusa" | "harimau" | "kupu-kupu" | "ular"

export interface JunglePediaItem {
  id: number
  kategori: "fasilitas" | "ukm" | "platform"
  judul: string
  deskripsi: string
  icon: string
}

export interface GalleryItem {
  id: number
  src: string
  alt: string
  kategori?: string
}

export interface JejakRimbaPilihan {
  text: string
  icon: AvatarId
  nextId: string
}

export interface JejakRimbaEnding {
  title: string
  deskripsi: string
  tier: "good" | "neutral" | "hidden"
}

export interface JejakRimbaNode {
  id: string
  narasi: string
  latar?: "canopy" | "river" | "cave" | "clearing" | "ruins"
  pilihan: JejakRimbaPilihan[]
  ending?: JejakRimbaEnding
}

export interface Progress {
  nim: string
  nama: string
  avatar: AvatarId
  pagesRead: number[]
  quizDone: boolean
  quizScore: number
  badgeTitle: string
  badgeIcon: AvatarId
  easterEggs: Record<string, boolean>
}
