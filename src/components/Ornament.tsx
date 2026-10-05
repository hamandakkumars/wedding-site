// Lotus divider
export default function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 28" className={`mx-auto h-7 w-60 text-gold ${className}`} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M0 14h92M148 14h92" />
      <g transform="translate(120 16)" fill="currentColor" fillOpacity=".3">
        {[-55, -28, 0, 28, 55].map((r) => (
          <path key={r} d="M0 -13 Q7 -2 0 8 Q-7 -2 0 -13Z" transform={`rotate(${r})`} />
        ))}
      </g>
      <circle cx="102" cy="14" r="2" fill="currentColor" />
      <circle cx="138" cy="14" r="2" fill="currentColor" />
    </svg>
  );
}
