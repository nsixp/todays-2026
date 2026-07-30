"use client"

import { motion, useReducedMotion } from "framer-motion"

export default function ForestSilhouettes({
  className = "",
}: {
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.svg
        className="absolute inset-x-0 top-0 h-[68%] w-full text-jungle-canopy opacity-[0.16]"
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMidYMin slice"
        fill="currentColor"
        animate={reduceMotion ? undefined : { x: [0, 4, 0, -3, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <g id="tropical-tree-left">
            <path d="M86 520c8-136 3-248-15-336l26-2c-8 99 2 212 22 338H86Z" opacity=".72" />
            <path d="M93 225c-8-63-35-114-83-154 47 15 82 45 103 91-5-55 8-106 39-153 3 58-9 112-36 161 36-37 79-57 129-61-46 23-85 58-116 105l-36 11Z" />
            <ellipse cx="34" cy="75" rx="70" ry="42" transform="rotate(18 34 75)" />
            <ellipse cx="155" cy="43" rx="73" ry="38" transform="rotate(-34 155 43)" />
            <ellipse cx="211" cy="127" rx="74" ry="38" transform="rotate(-12 211 127)" />
            <ellipse cx="82" cy="151" rx="78" ry="43" transform="rotate(38 82 151)" />
          </g>
          <g id="slender-tree">
            <path d="M43 520c4-149 0-276-12-381l20-2c-5 109 4 237 23 383H43Z" opacity=".72" />
            <ellipse cx="25" cy="92" rx="55" ry="30" transform="rotate(24 25 92)" />
            <ellipse cx="78" cy="50" rx="64" ry="32" transform="rotate(-30 78 50)" />
            <ellipse cx="111" cy="117" rx="59" ry="30" transform="rotate(8 111 117)" />
          </g>
          <g id="forest-bush">
            <ellipse cx="22" cy="42" rx="35" ry="39" />
            <ellipse cx="66" cy="29" rx="44" ry="50" />
            <ellipse cx="113" cy="43" rx="39" ry="41" />
            <ellipse cx="90" cy="12" rx="30" ry="31" />
          </g>
          <linearGradient id="forest-fade" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity=".12" />
          </linearGradient>
        </defs>

        <g fill="url(#forest-fade)">
          <use href="#tropical-tree-left" transform="translate(-42 -12) scale(1.15)" />
          <use href="#slender-tree" transform="translate(205 40) scale(.72)" opacity=".55" />
          <use href="#slender-tree" transform="translate(1070 24) scale(.75)" opacity=".5" />
          <use href="#tropical-tree-left" transform="translate(1450 -10) scale(-1.2 1.2)" />
        </g>
      </motion.svg>

      <motion.svg
        className="absolute inset-x-0 bottom-0 h-40 w-full text-jungle-deep opacity-[0.13] sm:h-52"
        viewBox="0 0 1440 220"
        preserveAspectRatio="xMidYMax slice"
        fill="currentColor"
        animate={reduceMotion ? undefined : { x: [0, -3, 0, 2, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <g id="foreground-bush">
            <ellipse cx="28" cy="60" rx="50" ry="55" />
            <ellipse cx="86" cy="42" rx="61" ry="66" />
            <ellipse cx="151" cy="58" rx="56" ry="58" />
            <ellipse cx="119" cy="18" rx="39" ry="41" />
          </g>
          <g id="fern">
            <path d="M35 120C30 79 35 39 62 3c-9 44-10 81-2 117H35Z" opacity=".75" />
            <path d="M46 76C23 66 8 49 2 26c25 12 41 29 48 50Zm4 11c29-12 49-31 59-57-29 10-50 30-59 57ZM42 51C25 41 16 28 13 12c18 7 30 20 35 37l-6 2Zm12 8c24-8 42-22 53-42-25 6-43 20-53 42Z" />
          </g>
        </defs>
        <path d="M0 172c125-42 236-44 350-14 116 31 218 27 339-7 137-38 264-35 386 2 126 38 246 34 365-5v72H0v-48Z" opacity=".36" />
        <use href="#foreground-bush" transform="translate(-22 105) scale(1.25)" />
        <use href="#fern" transform="translate(88 80) scale(.9)" />
        <use href="#foreground-bush" transform="translate(1190 100) scale(1.35)" />
        <use href="#fern" transform="translate(1320 72) scale(1.05)" />
        <use href="#fern" transform="translate(360 142) scale(.48)" opacity=".48" />
        <use href="#fern" transform="translate(810 136) scale(.55)" opacity=".42" />
      </motion.svg>

      <motion.div
        className="absolute inset-x-[-12%] bottom-[8%] h-20 rounded-[50%] bg-jungle-mist/20 blur-2xl"
        animate={reduceMotion ? undefined : { x: ["-3%", "3%", "-3%"], opacity: [0.18, 0.36, 0.18] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
