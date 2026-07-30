"use client"

import { motion } from "framer-motion"

export default function ForestSilhouettes() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* Pohon latar belakang — framing kiri & kanan dengan gerakan lembut */}
      <motion.svg
        className="absolute inset-0 w-full h-full opacity-[0.08]"
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMax slice"
        fill="#1A3A2B"
        animate={{ x: [0, 3, 0, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <g id="pine">
            <path d="M40,0 L80,180 L55,180 L70,250 L30,250 L45,180 L0,180 Z" />
          </g>
          <g id="pine-thin">
            <path d="M25,0 L50,160 L35,160 L45,250 L5,250 L15,160 L0,160 Z" />
          </g>
          <g id="round">
            <path d="M60,250 L60,180 C0,180 0,40 60,40 C120,40 120,180 60,180 Z" />
          </g>
          <g id="tall">
            <path d="M25,0 L35,100 L20,100 L40,250 L0,250 L20,100 L5,100 Z" />
          </g>
          <g id="branch">
            <path d="M35,250 L35,150 C70,150 110,130 110,60 C110,20 60,20 55,60 L35,100 L0,100 Z" />
          </g>
          <g id="bush">
            <circle cx="20" cy="20" r="20" />
            <circle cx="40" cy="18" r="22" />
            <circle cx="60" cy="22" r="18" />
            <circle cx="80" cy="20" r="20" />
            <circle cx="55" cy="10" r="12" />
          </g>
        </defs>
        {/* Kiri */}
        <use href="#pine" transform="translate(-20,20) scale(1.4)" />
        <use href="#tall" transform="translate(40,40) scale(1.1)" />
        <use href="#round" transform="translate(90,60) scale(0.9)" />
        <use href="#pine-thin" transform="translate(130,80) scale(1.0)" />
        {/* Kanan */}
        <use href="#pine" transform="translate(1200,10) scale(1.6)" />
        <use href="#round" transform="translate(1270,40) scale(1.2)" />
        <use href="#tall" transform="translate(1330,70) scale(1.3)" />
        <use href="#branch" transform="translate(1380,30) scale(1.5)" />
        <use href="#pine-thin" transform="translate(1420,50) scale(1.1)" />
        {/* Tengah belakang */}
        <use href="#pine-thin" transform="translate(200,20) scale(0.6)" opacity="0.6" />
        <use href="#round" transform="translate(580,10) scale(0.5)" opacity="0.5" />
        <use href="#tall" transform="translate(760,20) scale(0.55)" opacity="0.5" />
        <use href="#branch" transform="translate(1000,15) scale(0.6)" opacity="0.6" />
      </motion.svg>

      {/* Semak foreground bawah — gerakan berbeda */}
      <motion.svg
        className="absolute bottom-0 w-full h-24 sm:h-32 opacity-[0.07]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="xMidYMax slice"
        fill="#1A3A2B"
        animate={{ x: [0, -2, 0, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <g id="bush-cluster">
            <ellipse cx="15" cy="30" rx="18" ry="20" />
            <ellipse cx="35" cy="28" rx="20" ry="22" />
            <ellipse cx="55" cy="32" rx="16" ry="18" />
            <ellipse cx="30" cy="18" rx="10" ry="10" />
          </g>
          <g id="grass-clump">
            <path d="M10,30 Q15,0 20,30" strokeWidth="1.5" stroke="currentColor" fill="none" />
            <path d="M15,30 Q22,5 28,30" strokeWidth="1.5" stroke="currentColor" fill="none" />
            <path d="M20,30 Q28,8 35,30" strokeWidth="1.5" stroke="currentColor" fill="none" />
            <path d="M25,30 Q32,3 40,30" strokeWidth="1.5" stroke="currentColor" fill="none" />
          </g>
        </defs>
        {/* Semak kiri */}
        <use href="#bush-cluster" transform="translate(20,50) scale(1.2)" />
        <use href="#grass-clump" transform="translate(0,70) scale(0.9)" />
        {/* Semak kanan */}
        <use href="#bush-cluster" transform="translate(1250,40) scale(1.5)" />
        <use href="#bush-cluster" transform="translate(1330,55) scale(1.1)" />
        <use href="#grass-clump" transform="translate(1280,65) scale(1.2)" />
        {/* Semak tengah tipis */}
        <use href="#grass-clump" transform="translate(360,75) scale(0.7)" opacity="0.6" />
        <use href="#grass-clump" transform="translate(720,70) scale(0.5)" opacity="0.5" />
        <use href="#grass-clump" transform="translate(1050,75) scale(0.6)" opacity="0.5" />
      </motion.svg>
    </div>
  )
}
