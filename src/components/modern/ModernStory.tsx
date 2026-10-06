"use client";
import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import Reveal from "../Reveal";
import ModernSectionTitle from "./ModernSectionTitle";

const ACCENTS = ["var(--gold)", "var(--rose)", "var(--violet)", "var(--sky)"];

// Connector segment: a short, scroll-revealed line. Rendered as a normal-flow
// sibling (never absolutely positioned behind the cards) so it only ever
// occupies the gap it's placed in — it can't visually cross a card's text,
// even though the glass cards are intentionally translucent.
function Connector({ height, color }: { height: string; color: string }) {
  return (
    <motion.span
      aria-hidden
      className="w-[3px] origin-top rounded-full"
      style={{ height, background: color }}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  );
}

export default function ModernStory() {
  return (
    <section id="story" className="mx-auto max-w-2xl px-6 py-24">
      <ModernSectionTitle kicker="How it began" title="Our Story" />
      <div className="flex flex-col items-center">
        {wedding.story.map((s, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          const nextAccent = ACCENTS[(i + 1) % ACCENTS.length];
          const isLast = i === wedding.story.length - 1;
          return (
            <div key={s.year} className="flex flex-col items-center">
              <Reveal y={0} className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute h-3 w-3 rounded-full" style={{ background: accent }} />
                <motion.span
                  className="absolute h-7 w-7 rounded-full opacity-25"
                  style={{ background: accent }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                />
              </Reveal>
              <Connector height="1.25rem" color={accent} />
              <Reveal delay={0.1} className="modern-glass w-full max-w-sm rounded-2xl px-6 py-6 text-center shadow-[0_8px_30px_rgba(0,0,0,.04)] transition hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(0,0,0,.07)]">
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: accent }}>{s.year}</p>
                <h3 className="mt-2 font-serif text-2xl text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/85">{s.text}</p>
              </Reveal>
              {!isLast && (
                <Connector height="4rem" color={`linear-gradient(to bottom, ${accent}, ${nextAccent})`} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
