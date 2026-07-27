export default function KupuKupu({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <ellipse cx="50" cy="55" rx="4" ry="14" fill="#1A3A2B" />
      <circle cx="50" cy="42" r="4" fill="#1A3A2B" />
      <circle cx="48" cy="40" r="1" fill="white" />
      <circle cx="52" cy="40" r="1" fill="white" />
      <path d="M46 50 Q20 30 30 20 Q40 12 46 38 Z" fill="#F3C46B" />
      <path d="M54 50 Q80 30 70 20 Q60 12 54 38 Z" fill="#F3C46B" />
      <path d="M46 55 Q20 70 30 80 Q40 88 46 62 Z" fill="#C47A22" />
      <path d="M54 55 Q80 70 70 80 Q60 88 54 62 Z" fill="#C47A22" />
      <circle cx="30" cy="28" r="1.5" fill="#C47A22" />
      <circle cx="70" cy="28" r="1.5" fill="#C47A22" />
      <circle cx="30" cy="72" r="1.5" fill="#F3C46B" />
      <circle cx="70" cy="72" r="1.5" fill="#F3C46B" />
    </svg>
  )
}
