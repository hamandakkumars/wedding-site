// Colourful spinning-halo divider — the modern page's replacement for the lotus Ornament.
export default function ModernDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`mx-auto flex w-40 items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-gold opacity-50" />
      <span className="relative flex h-2.5 w-2.5 items-center justify-center">
        <span className="modern-halo absolute h-2.5 w-2.5 rounded-full" />
        <span className="absolute h-5 w-5 animate-ping rounded-full bg-gold opacity-20" />
      </span>
      <span className="h-px flex-1 bg-gold opacity-50" />
    </div>
  );
}
