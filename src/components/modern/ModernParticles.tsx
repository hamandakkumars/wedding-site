"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["var(--gold)", "var(--rose)", "var(--violet)", "var(--sky)"];

// A few slow, glowing, multi-coloured dots drifting upward — used on the
// cover, hero and footer for bursts of festive motion.
export default function ModernParticles({ count = 16, className = "" }: { count?: number; className?: string }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 53 + 7) % 100}%`,
        size: 2 + ((i * 3) % 4),
        dur: 9 + ((i * 7) % 9),
        delay: (i * 1.1) % 9,
        color: COLORS[i % COLORS.length],
      })),
    [count],
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {items.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            bottom: "-5%",
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 10px 3px color-mix(in srgb, ${p.color} 55%, transparent)`,
          }}
          animate={{ y: ["0vh", "-70vh"], x: [0, 14, -10, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
