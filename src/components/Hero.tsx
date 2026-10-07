"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { wedding } from "@/data/wedding";
import ScratchReveal from "./ScratchReveal";
import { Diya, Garland, Gopuram } from "./SouthIndian";

// CSS-animated (not Framer Motion): Hero never unmounts, so its 16 petals
// would otherwise run on the JS main thread for the entire visit, even long
// after the user has scrolled past this section. @keyframes keeps them on
// the compositor instead.
function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        left: `${(i * 137) % 100}%`,
        size: 8 + ((i * 7) % 12),
        dur: 9 + ((i * 5) % 8),
        delay: (i * 1.3) % 8,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute -top-6 rounded-[60%_0_60%_0] bg-gold/40"
          style={{
            left: p.left, width: p.size, height: p.size,
            animationName: "petalFall",
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const item = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1 } } };

  return (
    <section ref={ref} id="home" className="paper relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      <motion.div style={{ y }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,210,138,.35),transparent_65%)]" />
      <div className="absolute inset-4 rounded-sm border border-gold/50 sm:inset-8" />
      <div className="absolute inset-6 rounded-sm border border-gold/25 sm:inset-11" />
      <Gopuram windowFill="#fff7e6" className="pointer-events-none absolute bottom-10 left-1/2 w-[min(56vw,340px)] -translate-x-1/2 text-maroon/[0.08]" />
      <div className="temple-border absolute inset-x-8 bottom-8 sm:inset-x-14" />
      <Garland className="z-10 px-6 sm:px-14" />
      <Diya className="absolute bottom-[14%] left-[10%] z-10" />
      <Diya className="absolute bottom-[14%] right-[10%] z-10" />
      <Petals />
      <motion.div
        style={{ opacity: fade }}
        initial="hidden"
        animate={started ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.35, delayChildren: 1 }}
        className="relative z-10 pt-16"
      >
        <motion.p variants={item} className="text-xs uppercase tracking-[0.5em] text-maroon/80">The Reception Of</motion.p>
        <motion.h1 variants={item} className="mt-6 font-script text-6xl leading-tight sm:text-8xl">
          <span className="gold-text">{wedding.bride.name}</span>
          <span className="mx-3 block font-serif text-3xl text-maroon sm:inline sm:text-5xl">&amp;</span>
          <span className="gold-text">{wedding.groom.name}</span>
        </motion.h1>
        <motion.p variants={item} className="mt-6 font-serif text-xl italic text-ink/80 sm:text-2xl">invite you to their wedding reception</motion.p>
        <motion.p variants={item} className="font-tamil mt-1 text-sm text-maroon/80">{wedding.tamilTitle}</motion.p>
        <motion.div variants={item} className="mx-auto mt-8 max-w-xs">
          <ScratchReveal
            label="✦  SCRATCH TO REVEAL THE DATES  ✦"
            className="flex flex-col items-center justify-center gap-2 px-4 py-5 font-serif text-base text-maroon"
          >
            {wedding.receptions.map((r) => (
              <span key={r.id}>
                <span className="text-lg font-semibold">{r.city}</span> <span className="mx-1 text-gold">·</span> <b className="font-date text-xl font-bold">{r.date}</b>
              </span>
            ))}
          </ScratchReveal>
        </motion.div>
      </motion.div>
      <a
        href="#blessing"
        aria-label="Scroll down"
        className="absolute bottom-10 z-10 text-gold"
        style={{ display: "inline-block", animation: "bounceArrow 1.8s ease-in-out infinite" }}
      >
        ▼
      </a>
    </section>
  );
}
