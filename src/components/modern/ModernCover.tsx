"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { wedding } from "@/data/wedding";
import { celebrate } from "@/lib/confetti";
import ModernBokeh from "./ModernBokeh";
import ModernParticles from "./ModernParticles";

const REVEAL_MS = 650;
const GONE_MS = 1400;

const word = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring" as const, stiffness: 140, damping: 16 } },
};

export default function ModernCover({
  onOpen, onReveal, guest,
}: { onOpen: () => void; onReveal: () => void; guest?: string }) {
  const [phase, setPhase] = useState<"idle" | "opening" | "gone">("idle");
  const opening = phase === "opening";

  const tap = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    onOpen(); // user gesture, so the page can start the music
    celebrate();
    setTimeout(onReveal, REVEAL_MS);
    setTimeout(() => setPhase("gone"), GONE_MS);
  };

  if (phase === "gone") return null;

  return (
    <AnimatePresence>
      {phase === "idle" || phase === "opening" ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6 text-center"
          exit={{ opacity: 0, scale: 1.04, filter: "blur(4px)" }}
          transition={{ duration: 0.7, ease: "easeIn" }}
        >
          {/* Its own always-opaque copy of the ambient mesh background — not
              reliant on seeing through to the fixed page backdrop, so a
              restored scroll position behind it can never show through. */}
          <div className="modern-bg" aria-hidden>
            <div className="modern-bg-aurora" />
            <div className="modern-bg-orb" />
            <div className="modern-bg-orb2" />
            <div className="modern-bg-orb3" />
            <div className="modern-grain" />
          </div>
          <ModernBokeh />
          <ModernParticles count={22} />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[46vmax] w-[46vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
            style={{ background: "conic-gradient(from 0deg, var(--gold), var(--rose), var(--violet), var(--sky), var(--gold))", filter: "blur(90px)" }}
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.div
            animate={opening ? { opacity: 0, scale: 0.97, filter: "blur(6px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.55 }}
            className="relative z-10"
          >
            {guest && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-6 font-serif text-lg italic text-ink/70"
              >
                Dear {guest},
              </motion.p>
            )}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[11px] uppercase tracking-[0.5em] text-maroon/60"
            >
              The Reception Of
            </motion.p>
            <h1 className="mt-5 font-serif text-5xl font-medium leading-tight text-ink sm:text-7xl">
              <motion.span variants={word} initial="hidden" animate="visible" transition={{ delay: 0.5 }} className="inline-block">
                {wedding.bride.name}
              </motion.span>{" "}
              <motion.span
                variants={word}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.7 }}
                className="modern-grad-text inline-block"
              >
                &amp;
              </motion.span>{" "}
              <motion.span variants={word} initial="hidden" animate="visible" transition={{ delay: 0.9 }} className="inline-block">
                {wedding.groom.name}
              </motion.span>
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              <motion.button
                onClick={tap}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="modern-glass mt-14 cursor-pointer rounded-xl px-10 py-3.5 text-xs uppercase tracking-[0.5em] text-ink shadow-[0_10px_30px_rgba(0,0,0,.1)] transition-shadow hover:text-gold hover:shadow-[0_16px_40px_rgba(0,0,0,.16)]"
              >
                Enter
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
