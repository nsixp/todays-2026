"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/loading-screen"

export default function SplashPage() {
  const router = useRouter()
  const [done, setDone] = useState(false)
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
    if (done) router.replace(destination)
  }, [done, destination, router])

  return (
    <div className="fixed inset-0 overflow-hidden bg-jungle-shadow">
      <LoadingScreen
        duration={3000}
        onComplete={() => {
          resolveDestination()
          setDone(true)
        }}
      />
    </div>
  )
}
