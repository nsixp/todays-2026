"use client"

import { useCallback, useSyncExternalStore } from "react"
import type { Progress, AvatarId } from "@/types"

const STORAGE_KEY = "todays-progress"

const DEFAULT_PROGRESS: Progress = {
  nim: "",
  nama: "",
  avatar: "monyet",
  pagesRead: [],
  quizDone: false,
  quizScore: 0,
  badgeTitle: "",
  badgeIcon: "monyet",
  easterEggs: {},
}

function getSnapshot(): Progress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Progress) : DEFAULT_PROGRESS
  } catch {
    return DEFAULT_PROGRESS
  }
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const save = useCallback((update: Partial<Progress>) => {
    const current = getSnapshot()
    const next = { ...current, ...update }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    window.dispatchEvent(new Event("storage"))
  }, [])

  const hasProgress = progress.nim.length > 0

  return { progress, save, hasProgress }
}
