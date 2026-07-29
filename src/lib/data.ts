import type { Participant, GuidebookSection, QuizQuestion, FAQItem, ScheduleItem, JunglePediaItem, GalleryItem, JejakRimbaNode } from "@/types"

import participantsData from "@/../data/participants.json"
import guidebookData from "@/../data/guidebook.json"
import quizData from "@/../data/quiz.json"
import faqData from "@/../data/faq.json"
import scheduleData from "@/../data/schedule.json"
import junglepediaData from "@/../data/junglepedia.json"
import galleryData from "@/../data/gallery.json"
import jejakRimbaData from "@/../data/jejak-rimba.json"

export function getParticipants(): Participant[] {
  return participantsData as Participant[]
}

export function getParticipantByNim(nim: string): Participant | undefined {
  return getParticipants().find((p) => p.nim === nim)
}

export function getGuidebook(): GuidebookSection[] {
  return guidebookData as GuidebookSection[]
}

export function getQuiz(): QuizQuestion[] {
  return quizData as QuizQuestion[]
}

export function getFAQ(): FAQItem[] {
  return faqData as FAQItem[]
}

export function getSchedule(): ScheduleItem[] {
  return scheduleData as ScheduleItem[]
}

export function getJunglePedia(): JunglePediaItem[] {
  return junglepediaData as JunglePediaItem[]
}

export function getGallery(): GalleryItem[] {
  return galleryData as GalleryItem[]
}

export function getJejakRimba(): JejakRimbaNode[] {
  return jejakRimbaData as JejakRimbaNode[]
}
