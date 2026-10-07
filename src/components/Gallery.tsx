"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { wedding } from "@/data/wedding";
import { withBase } from "@/lib/assetPath";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

// Until real photos are added to wedding.gallery, show elegant placeholder tiles.
const placeholders = ["#e8d28a", "#d9b5a0", "#c9a227", "#e9c9c9", "#cfb98a", "#d8a7b1"];
const heights = ["h-56", "h-72", "h-64", "h-80", "h-60", "h-72"];

export default function Gallery() {
  const photos = wedding.gallery;
  const count = photos.length || placeholders.length;
  const [active, setActive] = useState<number | null>(null);
  const move = useCallback((d: number) => setActive((a) => (a === null ? a : (a + d + count) % count)), [count]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, move]);

  const tile = (i: number, full = false) =>
    photos.length ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={withBase(photos[i])} alt={`Photo ${i + 1}`} className={full ? "max-h-[85vh] max-w-full rounded-lg" : "w-full object-cover"} loading="lazy" />
    ) : (
      <div
        className={`flex items-center justify-center font-script text-3xl text-white/90 ${full ? "h-[70vh] w-[80vw] max-w-xl rounded-lg" : "h-full w-full"}`}
        style={{ background: `linear-gradient(135deg, ${placeholders[i]}, #fbf7f0)` }}
      >
        Photo {i + 1}
      </div>
    );

  return (
    <section id="gallery" className="mx-auto max-w-5xl px-6 py-24">
      <SectionTitle kicker="Moments" title="Gallery" />
      <div className="columns-2 gap-4 md:columns-3">
        {Array.from({ length: count }, (_, i) => (
          <Reveal key={i} delay={(i % 3) * 0.1} className="mb-4 break-inside-avoid">
            <button
              onClick={() => setActive(i)}
              aria-label={`Open photo ${i + 1}`}
              className={`group block w-full overflow-hidden rounded-xl border border-gold/30 shadow-sm ${photos.length ? "" : heights[i % heights.length]}`}
            >
              <div className="h-full w-full transition duration-500 group-hover:scale-105">{tile(i)}</div>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              key={active}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) move(1);
                else if (info.offset.x > 80) move(-1);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {tile(active, true)}
            </motion.div>
            <button onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Previous" className="absolute left-3 text-4xl text-white/80 hover:text-white">‹</button>
            <button onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Next" className="absolute right-3 text-4xl text-white/80 hover:text-white">›</button>
            <button onClick={() => setActive(null)} aria-label="Close" className="absolute right-4 top-4 text-3xl text-white/80 hover:text-white">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
