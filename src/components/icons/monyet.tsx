export default function Monyet({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <circle cx="50" cy="50" r="32" fill="#8B6914" />
      <circle cx="24" cy="40" r="10" fill="#8B6914" />
      <circle cx="76" cy="40" r="10" fill="#8B6914" />
      <circle cx="24" cy="40" r="5" fill="#C4952E" />
      <circle cx="76" cy="40" r="5" fill="#C4952E" />
      <ellipse cx="50" cy="56" rx="20" ry="16" fill="#C4952E" />
      <circle cx="38" cy="44" r="4.5" fill="#1A3A2B" />
      <circle cx="62" cy="44" r="4.5" fill="#1A3A2B" />
      <circle cx="36" cy="42" r="1.5" fill="white" />
      <circle cx="60" cy="42" r="1.5" fill="white" />
      <circle cx="50" cy="54" r="3.5" fill="#1A3A2B" />
      <path d="M42 62 Q50 68 58 62" stroke="#1A3A2B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
