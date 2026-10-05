"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { wedding } from "@/data/wedding";
import ModernParticles from "./ModernParticles";

const nameWord = {
  hidden: { opacity: 0, y: 36, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 130, damping: 15 } },
};

const CHIP_COLORS = ["var(--gold)", "var(--violet)", "var(--sky)", "var(--rose)"];

export default function ModernHero({ started }: { started: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const ampY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9 } } };

  return (
    <section ref={ref} id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      <motion.div style={{ y }} className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--gold)_18%,transparent),transparent_70%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[20%] h-56 w-56 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--violet) 55%, transparent), transparent 70%)", filter: "blur(50px)", y }}
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-[15%] right-[10%] h-64 w-64 rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--sky) 55%, transparent), transparent 70%)", filter: "blur(55px)" }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.span
        style={{ y: ampY }}
        aria-hidden
        className="modern-grad-text pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[48vw] opacity-[0.06] sm:text-[32vw]"
      >
        &amp;
      </motion.span>
      <ModernParticles count={12} className="opacity-80" />

      <motion.div
        style={{ opacity: fade }}
        initial="hidden"
        animate={started ? "visible" : "hidden"}
        transition={{ staggerChildren: 0.25, delayChildren: 0.3 }}
        className="relative z-10"
      >
        <motion.p variants={item} className="text-[11px] uppercase tracking-[0.5em] text-maroon/60">The Reception Of</motion.p>
        <h1 className="mt-7 font-serif text-6xl font-medium leading-[1.05] text-ink sm:text-8xl">
          <motion.span variants={nameWord} className="inline-block">{wedding.bride.name}</motion.span>
          <motion.span variants={nameWord} className="modern-grad-text mx-4 inline-block">&amp;</motion.span>
          <motion.span variants={nameWord} className="inline-block">{wedding.groom.name}</motion.span>
        </h1>
        <motion.p variants={item} className="mt-7 font-serif text-lg italic text-ink/70 sm:text-xl">
          invite you to their wedding reception
        </motion.p>
        <motion.div variants={item} className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          {wedding.receptions.map((r, i) => {
            const accent = CHIP_COLORS[i % CHIP_COLORS.length];
            return (
              <motion.div
                key={r.id}
                whileHover={{
                  y: -4,
                  scale: 1.04,
                  boxShadow: `0 14px 40px -8px color-mix(in srgb, ${accent} 55%, transparent)`,
                }}
                className="modern-glass flex min-w-[180px] flex-col items-center gap-1 rounded-2xl px-8 py-4 shadow-[0_8px_30px_rgba(0,0,0,.05)]"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-maroon/60">{r.city}</p>
                <p
                  className="font-sans text-lg font-medium tracking-wide"
                  style={{ color: accent, fontVariantNumeric: "tabular-nums" }}
                >
                  {r.date}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
      <motion.a
        href="#blessing"
        aria-label="Scroll down"
        className="modern-grad-text absolute bottom-10 z-10 text-xl"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ▾
      </motion.a>
    </section>
  );
}
