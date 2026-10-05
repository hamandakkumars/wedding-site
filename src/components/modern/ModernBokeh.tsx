"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["var(--gold)", "var(--rose)", "var(--violet)", "var(--sky)"];

// Soft, glowing, drifting light orbs + twinkling sparkles — a magical,
// fairy-light ambience behind the whole page. No connecting lines, no hard
// dots: everything is blurred and gentle so it reads as "wonder", not data.
export default function ModernBokeh() {
  const orbs = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: `${(i * 37 + 5) % 100}%`,
        top: `${(i * 53 + 11) % 100}%`,
        size: 60 + ((i * 29) % 140),
        color: COLORS[i % COLORS.length],
        dur: 16 + ((i * 7) % 18),
        delay: (i * 1.7) % 14,
        dx: ((i % 5) - 2) * 18,
        dy: ((i % 3) - 1) * 22,
      })),
    [],
  );
  const sparkles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        left: `${(i * 61 + 13) % 100}%`,
        top: `${(i * 41 + 7) % 100}%`,
        size: 10 + ((i * 5) % 10),
        color: COLORS[(i + 2) % COLORS.length],
        dur: 3 + ((i * 3) % 5),
        delay: (i * 0.9) % 6,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden" aria-hidden>
      {orbs.map((o, i) => (
        <motion.span
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, color-mix(in srgb, ${o.color} 55%, transparent), transparent 70%)`,
            filter: "blur(18px)",
          }}
          animate={{ x: [0, o.dx, 0], y: [0, o.dy, 0], opacity: [0.25, 0.55, 0.25], scale: [1, 1.15, 1] }}
          transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {sparkles.map((s, i) => (
        <motion.span
          key={`spark-${i}`}
          className="absolute select-none"
          style={{ left: s.left, top: s.top, fontSize: s.size, color: s.color, textShadow: `0 0 8px ${s.color}` }}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.1, 0.6], rotate: [0, 90, 0] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}
