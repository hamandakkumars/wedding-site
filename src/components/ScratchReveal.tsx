"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Gold foil over `children`; scratch it away with finger/mouse to reveal.
export default function ScratchReveal({
  children, className = "", label = "✦  SCRATCH TO REVEAL  ✦",
}: { children: React.ReactNode; className?: string; label?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const c = canvas.current, w = wrap.current;
    if (!c || !w) return;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const { width, height } = w.getBoundingClientRect();
    c.width = width;
    c.height = height;

    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#a8801a");
    g.addColorStop(0.35, "#f1d97a");
    g.addColorStop(0.65, "#c9a227");
    g.addColorStop(1, "#a8801a");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(91,26,46,.75)";
    ctx.font = "600 13px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, width / 2, height / 2);

    let down = false;
    const scratch = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(e.clientX - r.left, e.clientY - r.top, 22, 0, Math.PI * 2);
      ctx.fill();
    };
    const check = () => {
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      let clear = 0, total = 0;
      for (let i = 3; i < data.length; i += 16) { total++; if (data[i] === 0) clear++; }
      if (clear / total > 0.45) setDone(true);
    };
    const onDown = (e: PointerEvent) => { down = true; c.setPointerCapture(e.pointerId); scratch(e); };
    const onMove = (e: PointerEvent) => { if (down) scratch(e); };
    const onUp = () => { if (down) { down = false; check(); } };
    c.addEventListener("pointerdown", onDown);
    c.addEventListener("pointermove", onMove);
    c.addEventListener("pointerup", onUp);
    c.addEventListener("pointercancel", onUp);
    return () => {
      c.removeEventListener("pointerdown", onDown);
      c.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerup", onUp);
      c.removeEventListener("pointercancel", onUp);
    };
  }, [label]);

  return (
    <div ref={wrap} className={`relative ${className}`}>
      {children}
      <motion.canvas
        ref={canvas}
        aria-label={label}
        className="absolute inset-0 h-full w-full cursor-pointer touch-none rounded-lg shadow-md"
        animate={{ opacity: done ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: done ? "none" : "auto" }}
      />
    </div>
  );
}
