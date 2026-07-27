export default function Burung({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <ellipse cx="45" cy="55" rx="20" ry="14" fill="#E85D3A" />
      <circle cx="52" cy="45" r="12" fill="#E85D3A" />
      <circle cx="55" cy="42" r="2" fill="#1A3A2B" />
      <circle cx="54" cy="41" r="0.8" fill="white" />
      <path d="M66 45 L80 42 L66 47 Z" fill="#F3C46B" />
      <path d="M25 60 Q15 50 20 40" stroke="#E85D3A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M25 60 Q10 65 15 55" stroke="#E85D3A" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M45 68 Q50 80 60 82" stroke="#E85D3A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M45 68 Q40 78 35 80" stroke="#E85D3A" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}
