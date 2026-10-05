"use client";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { wedding } from "@/data/wedding";
import Ornament from "./Ornament";
import { Diya, Garland, Gopuram } from "./SouthIndian";

const ease = [0.65, 0, 0.35, 1] as const;
const REVEAL_MS = 1700; // site starts animating underneath
const GONE_MS = 2700; // cover removed

function Sparkles() {
  const items = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({ left: `${(i * 47 + 9) % 100}%`, size: 2 + ((i * 3) % 5), dur: 7 + ((i * 5) % 7), delay: (i * 0.9) % 7 })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p, i) => (
        <motion.span
          key={i}
          className="absolute -bottom-4 rounded-full bg-gold-soft"
          style={{ left: p.left, width: p.size, height: p.size, boxShadow: "0 0 8px 2px rgba(240,215,140,.7)" }}
          animate={{ y: [0, -900], opacity: [0, 1, 0.8, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function Mandala({ className = "", spin = false }: { className?: string; spin?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 400 400"
      className={`pointer-events-none absolute text-gold-soft ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth=".6"
      animate={spin ? { rotate: 360 } : undefined}
      transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
      aria-hidden
    >
      {[190, 160, 120, 80].map((r) => <circle key={r} cx="200" cy="200" r={r} strokeDasharray={r === 160 ? "2 6" : undefined} />)}
      {Array.from({ length: 24 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 15} 200 200)`}>
          <path d="M200 10 Q215 60 200 110 Q185 60 200 10Z" />
          <circle cx="200" cy="128" r="3" />
        </g>
      ))}
    </motion.svg>
  );
}

// The printed face of the card. Rendered twice (left/right half) so it can split open.
function CardFace({ guest }: { guest?: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-[#8f1128] via-[#6d0b1e] to-[#460614] text-gold-soft">
      <Mandala className="left-1/2 top-[42%] h-[125%] w-[125%] -translate-x-1/2 -translate-y-1/2 opacity-[0.13]" />
      <Garland className="z-10" />
      <div className="absolute inset-3 border border-gold/70" />
      <div className="absolute inset-[18px] border border-gold/30" />
      <div className="temple-border absolute inset-x-5 bottom-5 opacity-80" />

      <Gopuram windowFill="#5a0a1c" className="absolute bottom-9 left-1/2 w-[44%] -translate-x-1/2 text-gold/20" />
      <Diya className="absolute bottom-[27%] left-[11%]" />
      <Diya className="absolute bottom-[27%] right-[11%]" />

      <div className="relative z-10 flex h-full flex-col items-center px-8 pt-[19%] text-center">
        <Ornament className="!h-6" />
        <p className="mt-4 text-[10px] uppercase tracking-[0.5em] text-gold-soft/80">The Reception Of</p>
        <h1 className="mt-3 font-script text-5xl leading-[1.05] text-[#f6dc8a] drop-shadow-[0_2px_6px_rgba(0,0,0,.35)] sm:text-6xl">
          {wedding.bride.name}
          <span className="block font-serif text-2xl text-gold-soft">&amp;</span>
          {wedding.groom.name}
        </h1>
        <p className="font-tamil mt-4 text-lg text-gold-soft">{wedding.tamilTitle}</p>
        {guest && <p className="mt-2 font-serif text-base italic text-gold-soft/85">Dear {guest},</p>}
      </div>
    </div>
  );
}

export default function InviteCover({
  onOpen, onReveal, guest,
}: { onOpen: () => void; onReveal: () => void; guest?: string }) {
  const [phase, setPhase] = useState<"idle" | "opening" | "gone">("idle");
  const opening = phase === "opening";

  const tap = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    onOpen(); // user gesture, so the page can start the music
    setTimeout(onReveal, REVEAL_MS);
    setTimeout(() => setPhase("gone"), GONE_MS);
  };

  if (phase === "gone") return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${opening ? "pointer-events-none" : ""}`}>
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#5a0f22_0%,#33091a_55%,#1c040d_100%)]"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 1.1, delay: 1.5 }}
      >
        <Mandala spin className="left-1/2 top-1/2 h-[min(150vw,1000px)] w-[min(150vw,1000px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.1]" />
        <Sparkles />
      </motion.div>

      {/* card */}
      <motion.div
        className="relative h-[min(86vh,780px)] w-[min(90vw,470px)]"
        style={{ perspective: 1800 }}
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={opening ? { opacity: [1, 1, 0], y: 0, scale: [1, 1, 3.4] } : { opacity: 1, y: 0, scale: 1 }}
        transition={opening ? { duration: 2.6, times: [0, 0.5, 1], ease: "easeIn" } : { duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* glow + inner page revealed as the doors open */}
        <div className="absolute inset-[3px] overflow-hidden bg-[#fff3d6] shadow-[0_0_80px_20px_rgba(240,190,80,.45)]">
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fffbe9_0%,#f6dc8a_55%,#c99a1e_100%)]"
            initial={{ opacity: 0.3 }}
            animate={opening ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
          <Mandala className="left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 text-gold opacity-40" />
        </div>

        {(["left", "right"] as const).map((side) => (
          <motion.div
            key={side}
            className={`absolute -top-px h-[calc(100%+2px)] overflow-hidden ${side === "left" ? "left-0 w-1/2" : "left-[calc(50%-1px)] w-[calc(50%+1px)]"}`}
            style={{ transformOrigin: side === "left" ? "left center" : "right center", backfaceVisibility: "hidden" }}
            animate={opening ? { rotateY: side === "left" ? -112 : 112 } : { rotateY: 0 }}
            transition={{ duration: 1.5, delay: 0.25, ease }}
          >
            <div className={`absolute top-0 h-full ${side === "left" ? "left-0 w-[200%]" : "right-0 w-[calc((100%-1px)*2)]"}`}>
              <CardFace guest={guest} />
            </div>
          </motion.div>
        ))}

        {/* open button (sits over the seam) */}
        <div className="absolute inset-x-0 bottom-[15%] z-30 flex justify-center">
        <motion.button
          onClick={tap}
          aria-label="Open invitation"
          className="relative cursor-pointer whitespace-nowrap rounded-full border border-gold-soft bg-gradient-to-r from-[#a8801a] via-[#f1d97a] to-[#a8801a] px-8 py-3 text-xs font-semibold tracking-[0.35em] text-maroon shadow-[0_8px_24px_rgba(0,0,0,.45)] sm:px-10 sm:text-sm"
          animate={opening ? { opacity: 0, scale: 0.8 } : { scale: [1, 1.05, 1] }}
          transition={opening ? { duration: 0.3 } : { duration: 2.2, repeat: Infinity }}
          whileHover={opening ? undefined : { scale: 1.1 }}
          whileTap={opening ? undefined : { scale: 0.95 }}
        >
          {!opening && (
            <motion.span
              className="absolute inset-0 rounded-full border border-gold-soft"
              animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
          OPEN INVITATION
        </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
