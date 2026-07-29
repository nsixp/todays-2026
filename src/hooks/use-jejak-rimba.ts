"use client"

import { useState, useEffect, useCallback } from "react"
import { getJejakRimba } from "@/lib/data"

const STORAGE_KEY = "todays-jejak-rimba"

interface JejakRimbaState {
  currentNodeId: string
  history: string[]
  ending: string | null
}

const DEFAULT_STATE: JejakRimbaState = {
  currentNodeId: "node-1",
  history: [],
  ending: null,
}

function loadState(): JejakRimbaState {
  if (typeof window === "undefined") return DEFAULT_STATE
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as JejakRimbaState) : DEFAULT_STATE
  } catch {
    return DEFAULT_STATE
  }
}

export function useJejakRimba() {
  const [state, setState] = useState<JejakRimbaState>(loadState)
  const nodes = getJejakRimba()

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const currentNode = nodes.find((n) => n.id === state.currentNodeId) ?? nodes[0]

  const isEnding = state.ending !== null
  const canGoBack = state.history.length > 1

  const pilih = useCallback(
    (nextId: string) => {
      setState((prev) => {
        const nextNode = nodes.find((n) => n.id === nextId)
        if (!nextNode) return prev
        const newHistory = [...prev.history, prev.currentNodeId]
        return {
          currentNodeId: nextId,
          history: newHistory,
          ending: nextNode.ending ? nextNode.id : null,
        }
      })
    },
    [nodes]
  )

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.history.length < 1) return prev
      const newHistory = prev.history.slice(0, -1)
      return {
        currentNodeId: prev.history[prev.history.length - 1],
        history: newHistory,
        ending: null,
      }
    })
  }, [])

  const reset = useCallback(() => {
    setState({ ...DEFAULT_STATE })
  }, [])

  return { state, currentNode, nodes, isEnding, canGoBack, pilih, goBack, reset }
}
