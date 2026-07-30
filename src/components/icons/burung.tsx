export default function Burung({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <circle cx="50" cy="52" r="30" fill="#E85D3A" />
      <path d="M30 28 Q16 20 20 10 Q24 4 34 12 Q38 18 36 26Z" fill="#E85D3A" />
      <path d="M28 24 Q18 16 22 10" stroke="#C47A22" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M74 50 L94 44 L74 48 L74 52 L94 58Z" fill="#F3C46B" />
      <line x1="74" y1="50" x2="88" y2="50" stroke="#C47A22" strokeWidth="1.5" />
      <circle cx="40" cy="44" r="5" fill="#1A3A2B" />
      <circle cx="62" cy="44" r="5" fill="#1A3A2B" />
      <circle cx="38" cy="42" r="2.5" fill="white" />
      <circle cx="60" cy="42" r="2.5" fill="white" />
      <circle cx="36" cy="41" r="1" fill="white" />
      <circle cx="58" cy="41" r="1" fill="white" />
      <path d="M44 58 Q50 64 56 58" stroke="#1A3A2B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="66" r="4" fill="#F5DEB3" opacity="0.4" />
    </svg>
  )
}
