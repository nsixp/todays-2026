export default function Ular({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <path d="M50 15 Q70 20 75 35 Q80 50 65 55 Q50 60 55 70 Q60 80 50 88" stroke="#4E7053" strokeWidth="8" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="15" r="8" fill="#4E7053" />
      <circle cx="47" cy="12" r="2" fill="#1A3A2B" />
      <circle cx="53" cy="12" r="2" fill="#1A3A2B" />
      <path d="M42 16 L38 10" stroke="#1A3A2B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M58 16 L62 10" stroke="#1A3A2B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M48 18 Q50 22 52 18 Q50 20 48 18" fill="#F33" />
      <circle cx="46" cy="28" r="1.5" fill="#8EA98D" />
      <circle cx="60" cy="38" r="1.5" fill="#8EA98D" />
      <circle cx="52" cy="52" r="1.5" fill="#8EA98D" />
      <circle cx="58" cy="68" r="1.5" fill="#8EA98D" />
    </svg>
  )
}
