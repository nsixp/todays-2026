export default function Monyet({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <circle cx="50" cy="45" r="25" fill="#8B6914" />
      <ellipse cx="50" cy="50" rx="18" ry="15" fill="#C4952E" />
      <circle cx="40" cy="40" r="4" fill="#1A3A2B" />
      <circle cx="60" cy="40" r="4" fill="#1A3A2B" />
      <circle cx="50" cy="48" r="3" fill="#1A3A2B" />
      <path d="M45 55 Q50 60 55 55" stroke="#1A3A2B" strokeWidth="2" fill="none" />
      <circle cx="38" cy="38" r="1.5" fill="white" />
      <circle cx="58" cy="38" r="1.5" fill="white" />
      <path d="M30 42 Q20 30 25 20" stroke="#8B6914" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M70 42 Q80 30 75 20" stroke="#8B6914" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M40 68 Q50 80 60 68" stroke="#C4952E" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}
