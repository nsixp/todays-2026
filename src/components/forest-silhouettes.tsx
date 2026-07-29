"use client"

export default function ForestSilhouettes() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      <svg
        className="w-full h-full opacity-[0.10]"
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMax slice"
        fill="#1A3A2B"
      >
        <defs>
          <g id="pine">
            <path d="M40,0 L80,180 L55,180 L70,250 L30,250 L45,180 L0,180 Z" />
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
        </defs>
        <use href="#pine" transform="translate(0,50) scale(0.8)" />
        <use href="#round" transform="translate(100,30)" />
        <use href="#tall" transform="translate(250,60) scale(0.9)" />
        <use href="#pine" transform="translate(350,40) scale(1.1)" />
        <use href="#branch" transform="translate(520,20)" />
        <use href="#round" transform="translate(680,50) scale(0.85)" />
        <use href="#tall" transform="translate(820,30)" />
        <use href="#pine" transform="translate(940,55) scale(0.9)" />
        <use href="#branch" transform="translate(1100,40) scale(1.05)" />
        <use href="#round" transform="translate(1260,60) scale(0.75)" />
        <use href="#pine" transform="translate(1380,35) scale(1.15)" />
      </svg>
    </div>
  )
}
