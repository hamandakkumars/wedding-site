"use client";
import { motion } from "framer-motion";

// Hanging marigold strands, swaying gently.
export function Garland({ className = "" }: { className?: string }) {
  const strands = Array.from({ length: 13 }, (_, i) => ({ len: 3 + ((i * 5) % 5), delay: i * 0.25 }));
  return (
    <div className={`pointer-events-none absolute inset-x-0 top-0 flex justify-between px-1 ${className}`} aria-hidden>
      {strands.map((s, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center"
          style={{ transformOrigin: "top" }}
          animate={{ rotate: [-2.5, 2.5, -2.5] }}
          transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        >
          <span className="h-4 w-px bg-gold" />
          {Array.from({ length: s.len }, (_, j) => (
            <span
              key={j}
              className="-mt-1 block h-4 w-4 rounded-full sm:h-5 sm:w-5"
              style={{
                background: j % 2 ? "radial-gradient(circle at 35% 35%,#ffd45c,#f59e0b)" : "radial-gradient(circle at 35% 35%,#ff9a3c,#e2530b)",
                boxShadow: "inset 0 -2px 3px rgba(0,0,0,.25)",
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// Temple tower (gopuram) silhouette: tapering tiers (talas) with kalasam finials
// and a corbelled entrance arch, in the manner of a South Indian gateway tower.
export function Gopuram({ className = "", windowFill = "#000" }: { className?: string; windowFill?: string }) {
  // Each tala (tier) is a gently concave trapezoid that narrows as it rises,
  // capped with a row of small kalasam (pot) finials — the classic gopuram taper.
  const tiers = 6;
  const baseW = 256, baseY = 232, tierH = 21, overlap = 5;
  const rows = Array.from({ length: tiers }, (_, i) => {
    const t = i / (tiers - 1);
    const w = baseW * (1 - t * 0.62);
    const wNext = baseW * (1 - ((i + 1) / (tiers - 1)) * 0.62);
    const y = baseY - i * (tierH - overlap) - (i > 0 ? (tierH - overlap) * 0 : 0);
    return { i, w, wNext, y, x: 150 - w / 2, xNext: 150 - wNext / 2 };
  });
  const topY = baseY - (tiers - 1) * (tierH - overlap) - 4;

  return (
    <svg viewBox="0 0 300 260" className={className} fill="currentColor" aria-hidden>
      {/* plinth */}
      <rect x="14" y={baseY + 10} width="272" height="18" rx="1" />
      <rect x="22" y={baseY} width="256" height="12" rx="1" />

      {rows.map(({ i, w, wNext, y, x, xNext }) => (
        <g key={i}>
          {/* tapering wall of this tala, slightly bowed in (batter) */}
          <path
            d={`M${x} ${y + tierH} Q${150} ${y + tierH - 4} ${x + w} ${y + tierH} L${xNext + wNext} ${y} Q${150} ${y - 3} ${xNext} ${y} Z`}
          />
          {/* cornice shadow line under each tala */}
          <rect x={x - 5} y={y + tierH - 3} width={w + 10} height="3.5" opacity={0.55} />
          {/* niche windows, more on lower/wider talas */}
          {(() => {
            const n = Math.max(3, 7 - i);
            return Array.from({ length: n }, (_, k) => {
              const cx = 150 - w / 2.6 + (k / (n - 1 || 1)) * (w / 1.3);
              return <rect key={k} x={cx - 3.2} y={y + 6} width="6.4" height="9" rx="3" fill={windowFill} opacity={0.85} />;
            });
          })()}
          {/* finials along the tala ridge */}
          {(() => {
            const n = Math.max(2, 5 - i);
            return Array.from({ length: n }, (_, k) => {
              const cx = 150 - wNext / 2.3 + (n === 1 ? wNext / 2.3 : (k / (n - 1)) * (wNext / 1.15));
              return (
                <g key={k} transform={`translate(${cx} ${y - 2})`}>
                  <path d="M-4 0 Q0 -9 4 0Z" />
                  <circle cy="-10" r="2.1" />
                </g>
              );
            });
          })()}
        </g>
      ))}

      {/* crowning shikhara + kalasam */}
      <path d={`M126 ${topY + 4} Q150 ${topY - 20} 174 ${topY + 4}Z`} />
      <rect x="147" y={topY - 32} width="6" height="12" rx="2" />
      <ellipse cx="150" cy={topY - 36} rx="7" ry="5" />
      <path d="M150 -4 Q146 -10 150 -16 Q154 -10 150 -4Z" transform={`translate(0 ${topY - 32})`} />

      {/* corbelled entrance arch + doorway at the base */}
      <path d={`M${150 - 60} ${baseY} Q150 ${baseY - 86} ${150 + 60} ${baseY} L${150 + 48} ${baseY} Q150 ${baseY - 68} ${150 - 48} ${baseY} Z`} />
      <path
        d={`M${150 - 26} ${baseY} L${150 - 26} ${baseY - 18} Q150 ${baseY - 46} ${150 + 26} ${baseY - 18} L${150 + 26} ${baseY} Z`}
        fill={windowFill}
      />
    </svg>
  );
}

// Oil lamp with a flickering flame.
export function Diya({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`} aria-hidden>
      <motion.div
        className="h-6 w-3 rounded-[50%_50%_50%_50%/65%_65%_35%_35%] bg-gradient-to-t from-orange-500 via-yellow-300 to-white"
        style={{ boxShadow: "0 0 20px 7px rgba(255,190,60,.65)", transformOrigin: "bottom" }}
        animate={{ scaleY: [1, 1.25, 0.95, 1.15, 1], scaleX: [1, 0.9, 1.05, 0.95, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      <svg viewBox="0 0 60 24" className="-mt-1 h-6 w-14 text-gold">
        <path d="M2 6 Q6 22 30 22 Q54 22 58 6 Q30 12 2 6Z" fill="currentColor" />
      </svg>
    </div>
  );
}
