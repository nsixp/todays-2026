"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from "@/components/loading-screen"

export default function SplashPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading")
  const [destination, setDestination] = useState("/welcome")

  const resolveDestination = useCallback(() => {
    try {
      const raw = localStorage.getItem("todays-progress")
      const hasProg = raw ? JSON.parse(raw).nim?.length > 0 : false
      setDestination(hasProg ? "/hub" : "/welcome")
    } catch {
      setDestination("/welcome")
    }
  }, [])

  useEffect(() => {
    if (phase === "done") router.replace(destination)
  }, [phase, destination, router])

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatePresence>
        {phase !== "done" && (
          <motion.div
            key="loader"
            animate={phase === "exiting" ? { x: "-100%" } : { x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              if (phase === "exiting") setPhase("done")
            }}
            className="absolute inset-0"
          >
            <LoadingScreen
              duration={2500}
              onComplete={() => {
                resolveDestination()
                setPhase("exiting")
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
