"use client"

import { motion, useReducedMotion } from "framer-motion"

type Variant = "canopy-top" | "vines-side" | "leaves-corner"

function LeafCluster({
  mirrored = false,
  className = "",
}: {
  mirrored?: boolean
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 360 250"
      fill="none"
      className={className}
      style={{ transform: mirrored ? "scaleX(-1)" : undefined }}
    >
      <path
        d="M-20 21c89 18 151 73 187 163M32-22c62 44 108 104 127 184M167 184c29-70 77-118 150-149"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        opacity=".52"
      />
      <g fill="currentColor">
        <ellipse cx="42" cy="47" rx="65" ry="30" transform="rotate(31 42 47)" />
        <ellipse cx="112" cy="83" rx="67" ry="31" transform="rotate(48 112 83)" opacity=".84" />
        <ellipse cx="83" cy="8" rx="60" ry="27" transform="rotate(55 83 8)" opacity=".76" />
        <ellipse cx="155" cy="31" rx="70" ry="32" transform="rotate(72 155 31)" opacity=".64" />
        <ellipse cx="226" cy="115" rx="68" ry="30" transform="rotate(-42 226 115)" opacity=".72" />
        <ellipse cx="290" cy="65" rx="76" ry="34" transform="rotate(-26 290 65)" />
        <ellipse cx="322" cy="142" rx="68" ry="31" transform="rotate(-54 322 142)" opacity=".68" />
      </g>
    </svg>
  )
}

function Vine() {
  return (
    <svg viewBox="0 0 130 900" fill="none" className="h-full w-auto">
      <path
        d="M18-20c57 110-15 178 37 281 47 93-19 167 26 257 42 85-17 165 25 261 19 44 22 90 13 141"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        opacity=".42"
      />
      <g fill="currentColor">
        <ellipse cx="39" cy="91" rx="35" ry="17" transform="rotate(39 39 91)" />
        <ellipse cx="30" cy="194" rx="39" ry="18" transform="rotate(-35 30 194)" opacity=".82" />
        <ellipse cx="77" cy="302" rx="36" ry="17" transform="rotate(42 77 302)" opacity=".72" />
        <ellipse cx="59" cy="417" rx="42" ry="19" transform="rotate(-38 59 417)" />
        <ellipse cx="94" cy="555" rx="36" ry="17" transform="rotate(45 94 555)" opacity=".76" />
        <ellipse cx="78" cy="682" rx="43" ry="19" transform="rotate(-31 78 682)" opacity=".84" />
        <ellipse cx="111" cy="806" rx="36" ry="17" transform="rotate(48 111 806)" />
      </g>
    </svg>
  )
}

export default function BackgroundFoliage({
  variant,
  opacity = 0.08,
  color = "var(--color-jungle-deep)",
}: {
  variant: Variant
  opacity?: number
  color?: string
}) {
  const reduceMotion = useReducedMotion()
  const sway = reduceMotion ? undefined : { rotate: [-0.7, 0.8, -0.7], y: [0, 3, 0] }
  const transition = { duration: 9, repeat: Infinity, ease: "easeInOut" as const }
  if (variant === "canopy-top") {
    return (
      <div className="absolute inset-x-0 top-0 h-48 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute -left-16 -top-16 w-[28rem] max-w-[72vw] origin-top-left"
          style={{ opacity, color }}
          animate={sway}
          transition={transition}
        >
          <LeafCluster className="h-auto w-full" />
        </motion.div>
        <motion.div
          className="absolute -right-16 -top-14 w-[30rem] max-w-[76vw] origin-top-right"
          style={{ opacity: opacity * 0.9, color }}
          animate={reduceMotion ? undefined : { rotate: [0.8, -0.6, 0.8], y: [0, 4, 0] }}
          transition={{ ...transition, duration: 11 }}
        >
          <LeafCluster mirrored className="h-auto w-full" />
        </motion.div>
      </div>
    )
  }

  if (variant === "leaves-corner") {
    return (
      <>
        <motion.div
          className="absolute -left-20 -top-16 w-72 origin-top-left pointer-events-none sm:w-96"
          style={{ opacity, color }}
          animate={sway}
          transition={transition}
          aria-hidden="true"
        >
          <LeafCluster className="h-auto w-full" />
        </motion.div>
        <motion.div
          className="absolute -right-20 -bottom-16 w-72 origin-bottom-right rotate-180 pointer-events-none sm:w-96"
          style={{ opacity: opacity * 0.8, color }}
          animate={reduceMotion ? undefined : { rotate: [179.4, 180.7, 179.4] }}
          transition={{ ...transition, duration: 10 }}
          aria-hidden="true"
        >
          <LeafCluster className="h-auto w-full" />
        </motion.div>
      </>
    )
  }

  return (
    <>
      <motion.div
        className="absolute inset-y-0 left-0 w-16 origin-top-left overflow-hidden pointer-events-none sm:w-24 lg:w-28"
        style={{ opacity, color }}
        animate={reduceMotion ? undefined : { rotate: [-0.4, 0.5, -0.4] }}
        transition={transition}
        aria-hidden="true"
      >
        <Vine />
      </motion.div>
      <motion.div
        className="absolute inset-y-0 right-0 flex w-16 origin-top-right justify-end overflow-hidden pointer-events-none sm:w-24 lg:w-28"
        style={{ opacity: opacity * 0.88, color }}
        animate={reduceMotion ? undefined : { rotate: [0.5, -0.4, 0.5] }}
        transition={{ ...transition, duration: 10 }}
        aria-hidden="true"
      >
        <div className="h-full -scale-x-100">
          <Vine />
        </div>
      </motion.div>
    </>
  )
}
