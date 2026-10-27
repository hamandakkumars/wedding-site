"use client";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";
import { withBase } from "@/lib/assetPath";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

// 3D "coverflow" of arch-framed portraits (the same temple-arch shape as the
// reception cards). The centre photo is large; neighbours tilt back and fade.
// Swipe / arrows / dots / keys to browse, tap the centre photo to view it
// full-screen. Auto-advances gently while on screen, and stops once touched.
const AUTO_MS = 2500;

export default function Gallery() {
  const photos = wedding.gallery;
  const n = photos.length;
  const [cur, setCur] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [auto, setAuto] = useState(true);
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { margin: "-20% 0px" });

  const go = useCallback((d: number) => setCur((c) => (c + d + n) % n), [n]);
  const moveLightbox = useCallback((d: number) => setLightbox((a) => (a === null ? a : (a + d + n) % n)), [n]);
  const manual = useCallback((fn: () => void) => { setAuto(false); fn(); }, []);

  useEffect(() => {
    if (!auto || !inView || lightbox !== null || n < 2) return;
    const t = setTimeout(() => go(1), AUTO_MS);
    return () => clearTimeout(t);
  }, [auto, inView, lightbox, cur, go, n]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") moveLightbox(1);
      if (e.key === "ArrowLeft") moveLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, moveLightbox]);

  if (!n) return null;

  // Signed shortest distance from the centre, wrapping around the ends.
  const dist = (i: number) => {
    let d = i - cur;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  };

  return (
    <section ref={section} id="gallery" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute left-1/2 top-[55%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,162,39,.22),transparent_65%)]" />
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle kicker="Moments" title="Gallery" />
      </div>

      <Reveal>
        <div
          className="relative mx-auto select-none"
          style={{ ["--w" as string]: "min(64vw, 290px)", perspective: "1100px" }}
        >
          <motion.div
            className="relative mx-auto h-[calc(var(--w)*1.25)] w-full max-w-3xl touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) manual(() => go(1));
              else if (info.offset.x > 60) manual(() => go(-1));
            }}
          >
            {photos.map((src, i) => {
              const d = dist(i);
              const a = Math.abs(d);
              const center = d === 0;
              return (
                <motion.div
                  key={src}
                  role="button"
                  tabIndex={a > 2 ? -1 : 0}
                  aria-label={center ? `Open photo ${i + 1} full screen` : `Show photo ${i + 1}`}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter" && e.key !== " ") return;
                    e.preventDefault();
                    if (center) setLightbox(i);
                    else manual(() => setCur(i));
                  }}
                  onTap={() => (center ? (setAuto(false), setLightbox(i)) : manual(() => setCur(i)))}
                  className="absolute top-0 cursor-pointer overflow-hidden rounded-b-2xl rounded-t-[9999px] border-[3px] border-gold bg-ivory shadow-[0_18px_40px_-12px_rgba(91,26,46,.45)]"
                  style={{ left: "50%", width: "var(--w)", height: "calc(var(--w) * 1.25)", marginLeft: "calc(var(--w) * -0.5)", pointerEvents: a > 2 ? "none" : "auto" }}
                  initial={false}
                  animate={{
                    x: `${d * 62}%`,
                    scale: 1 - a * 0.16,
                    rotateY: d * -26,
                    opacity: a > 2 ? 0 : 1 - a * 0.3,
                    zIndex: 10 - a,
                  }}
                  transition={{ type: "spring", stiffness: 140, damping: 20 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={withBase(src)}
                    alt={`${wedding.bride.name} and ${wedding.groom.name}, photo ${i + 1}`}
                    draggable={false}
                    loading={a <= 1 ? "eager" : "lazy"}
                    className="h-full w-full object-cover object-top"
                  />
                  {!center && <div className="absolute inset-0 bg-ivory/25" />}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Reveal>

      <div className="mt-10 flex items-center justify-center gap-8">
        <button onClick={() => manual(() => go(-1))} aria-label="Previous photo" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-2xl text-maroon transition hover:bg-gold/15">‹</button>
        <button onClick={() => manual(() => go(1))} aria-label="Next photo" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-2xl text-maroon transition hover:bg-gold/15">›</button>
      </div>
      <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Choose photo">
        {photos.map((src, i) => (
          <button
            key={src}
            role="tab"
            aria-selected={i === cur}
            aria-label={`Photo ${i + 1}`}
            onClick={() => manual(() => setCur(i))}
            className={`h-2 rounded-full transition-all ${i === cur ? "w-7 bg-maroon" : "w-2 bg-gold/60"}`}
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setCur(lightbox); setLightbox(null); }}
          >
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) moveLightbox(1);
                else if (info.offset.x > 80) moveLightbox(-1);
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase(photos[lightbox])} alt={`Photo ${lightbox + 1}`} draggable={false} className="max-h-[88vh] max-w-full rounded-lg" />
            </motion.div>
            <button onClick={(e) => { e.stopPropagation(); moveLightbox(-1); }} aria-label="Previous" className="absolute left-3 text-4xl text-white/80 hover:text-white">‹</button>
            <button onClick={(e) => { e.stopPropagation(); moveLightbox(1); }} aria-label="Next" className="absolute right-3 text-4xl text-white/80 hover:text-white">›</button>
            <button onClick={() => { setCur(lightbox); setLightbox(null); }} aria-label="Close" className="absolute right-4 top-4 text-3xl text-white/80 hover:text-white">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
