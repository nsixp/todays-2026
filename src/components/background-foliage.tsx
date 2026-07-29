"use client"

import { useId } from "react"

type Variant = "canopy-top" | "vines-side" | "leaves-corner"

const CANOPY_TOP = (
  <svg viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
    <path d="M0 160V80c60-20 140-30 220-10s160 30 240 10 140-30 220-10 160 30 240 10 140-30 220-10 160 30 240 10 140-30 220 0v80H0Z" fill="currentColor" />
    <path d="M0 160V100c80-25 180-15 280 5s180 30 280 10 180-30 280-10 180 30 280 10 180-30 280 0v60H0Z" fill="currentColor" opacity="0.6" />
    <path d="M0 160V120c120-20 200 0 320 10s200-10 320-10 200 10 320 0 200-10 320-10 200 20 320 10 200-10 320 0v40H0Z" fill="currentColor" opacity="0.3" />
  </svg>
)

const VINES_SIDE = (
  <svg viewBox="0 0 120 1080" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto">
    <path d="M0 0c20 60 30 140 10 220S-10 380 10 460s30 160 10 240-20 180 0 260 30 160 10 240-20 180 0 220v-20c-10-40-30-140-10-220s30-160 10-240-30-160-10-240 30-160 10-220S0 60 0 0Z" fill="currentColor" />
    <path d="M40 0c15 50 25 120 8 190s-25 140-8 210 25 140 8 200-25 130-8 190 25 140 8 200-25 130-8 190 25 140 8 200-25 130-8 180V0Z" fill="currentColor" opacity="0.5" />
  </svg>
)

const LEAVES_CORNER_LEFT = (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-auto h-full">
    <path d="M0 200c20-40 50-80 100-90s80-20 100-40-20-30-50-40C120 30 100 10 80 0L0 0v200Z" fill="currentColor" />
    <path d="M0 200c40-30 80-50 110-70s60-30 70-50-10-20-30-30c-20-10-50-20-70-30L0 0v200Z" fill="currentColor" opacity="0.4" />
  </svg>
)

const LEAVES_CORNER_RIGHT = (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-auto h-full">
    <path d="M200 200c-20-40-50-80-100-90S20 90 0 70s20-30 50-40C80 30 100 10 120 0l80 0v200Z" fill="currentColor" />
    <path d="M200 200c-40-30-80-50-110-70s-60-30-70-50 10-20 30-30c20-10 50-20 70-30l80 0v200Z" fill="currentColor" opacity="0.4" />
  </svg>
)

const FOLIAGE_MAP: Record<Variant, { left?: React.ReactNode; right?: React.ReactNode }> = {
  "canopy-top": { left: undefined, right: undefined },
  "vines-side": { left: VINES_SIDE, right: VINES_SIDE },
  "leaves-corner": { left: LEAVES_CORNER_LEFT, right: LEAVES_CORNER_RIGHT },
}

export default function BackgroundFoliage({
  variant,
  opacity = 0.06,
}: {
  variant: Variant
  opacity?: number
}) {
  const id = useId()

  if (variant === "canopy-top") {
    return (
      <div
        key={`foliage-${id}`}
        className="absolute inset-x-0 top-0 pointer-events-none z-0 overflow-hidden"
        style={{ opacity, color: "#1A3A2B" }}
      >
        {CANOPY_TOP}
      </div>
    )
  }

  const sides = FOLIAGE_MAP[variant]

  return (
    <>
      {sides.left && (
        <div
          key={`foliage-left-${id}`}
          className="absolute inset-y-0 left-0 pointer-events-none z-0 overflow-hidden w-16 sm:w-24 lg:w-32"
          style={{ opacity, color: "#1A3A2B" }}
        >
          {sides.left}
        </div>
      )}
      {sides.right && (
        <div
          key={`foliage-right-${id}`}
          className="absolute inset-y-0 right-0 pointer-events-none z-0 overflow-hidden w-16 sm:w-24 lg:w-32"
          style={{ opacity, color: "#1A3A2B" }}
        >
          {sides.right}
        </div>
      )}
    </>
  )
}
