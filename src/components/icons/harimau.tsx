export default function Harimau({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <ellipse cx="50" cy="55" rx="24" ry="18" fill="#E8852E" />
      <circle cx="50" cy="38" r="16" fill="#E8852E" />
      <circle cx="42" cy="34" r="3.5" fill="#1A3A2B" />
      <circle cx="58" cy="34" r="3.5" fill="#1A3A2B" />
      <circle cx="40" cy="32" r="1.2" fill="white" />
      <circle cx="56" cy="32" r="1.2" fill="white" />
      <ellipse cx="50" cy="42" rx="5" ry="3" fill="#F5A0A0" />
      <circle cx="50" cy="42" r="2" fill="#1A3A2B" />
      <path d="M38 30 Q35 22 28 20" stroke="#1A3A2B" strokeWidth="2" />
      <path d="M42 28 Q38 18 32 15" stroke="#1A3A2B" strokeWidth="2" />
      <path d="M58 30 Q62 22 68 20" stroke="#1A3A2B" strokeWidth="2" />
      <path d="M56 28 Q60 18 65 15" stroke="#1A3A2B" strokeWidth="2" />
      <path d="M38 70 Q50 82 62 70" stroke="#E8852E" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M28 58 Q20 70 24 80" stroke="#E8852E" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M72 58 Q80 70 76 80" stroke="#E8852E" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}
