"use client";

export default function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={playing ? "Mute music" : "Play music"}
      aria-pressed={playing}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-ivory/90 text-maroon shadow-lg backdrop-blur transition hover:scale-110"
    >
      {/* Music note; when muted, a diagonal line crosses it out. */}
      <svg
        viewBox="0 0 24 24"
        className={`h-6 w-6 ${playing ? "animate-pulse" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" fill="currentColor" />
        <circle cx="18" cy="16" r="3" fill="currentColor" />
        {/* The ivory underlay keeps the slash readable where it crosses the note. */}
        {!playing && <line x1="3" y1="3" x2="21" y2="21" stroke="#fff7e6" strokeWidth={5} />}
        {!playing && <line x1="3" y1="3" x2="21" y2="21" strokeWidth={2.5} />}
      </svg>
    </button>
  );
}
