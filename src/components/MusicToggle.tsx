"use client";

export default function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-ivory/90 text-xl text-maroon shadow-lg backdrop-blur transition hover:scale-110"
    >
      <span className={playing ? "animate-pulse" : "opacity-50"}>{playing ? "♫" : "♪"}</span>
    </button>
  );
}
