"use client";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { PointerEvent } from "react";
import { wedding } from "@/data/wedding";
import Reveal from "../Reveal";
import ModernSectionTitle from "./ModernSectionTitle";

function TiltCard({ city, children }: { city: string; children: React.ReactNode }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(260px circle at ${glowX}% ${glowY}%, color-mix(in srgb, var(--gold) 18%, transparent), transparent 70%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group modern-glass relative h-full overflow-hidden rounded-3xl text-center shadow-[0_10px_40px_rgba(0,0,0,.05)] transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,.12)]"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glow }} />
      <div
        className="relative flex h-28 items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(120deg, var(--gold-soft), var(--rose-soft), var(--violet-soft), var(--sky-soft))", backgroundSize: "300% auto" }}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(120deg, var(--gold-soft), var(--rose-soft), var(--violet-soft), var(--sky-soft))", backgroundSize: "300% auto" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <span className="modern-grad-text relative font-serif text-5xl opacity-90">{city[0]}</span>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.5),transparent_60%)]" />
      </div>
      {children}
    </motion.div>
  );
}

export default function ModernReceptions() {
  return (
    <section id="receptions" className="px-6 py-24">
      <ModernSectionTitle kicker="Join the celebration" title="Reception Celebrations" />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {wedding.receptions.map((r, i) => (
          <Reveal key={r.id} delay={i * 0.12}>
            <TiltCard city={r.city}>
              <div className="relative px-8 pb-6 pt-8">
                <h3 className="font-serif text-2xl text-ink transition group-hover:text-gold">{r.city} Reception</h3>
                <p className="mt-3 font-sans text-base font-medium tracking-wide text-ink/80" style={{ fontVariantNumeric: "tabular-nums" }}>{r.date}</p>
                <p className="text-sm tracking-wide text-ink/60">{r.time}</p>
                <div className="mx-auto my-5 h-px w-10 bg-gold" />
                <p className="font-serif text-lg text-ink">{r.venue}</p>
                <p className="mt-1 text-sm text-ink/60">{r.address}</p>
                <a
                  href={r.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block border-b border-gold pb-0.5 text-xs uppercase tracking-[0.3em] text-ink transition hover:text-gold"
                >
                  Get Directions →
                </a>
              </div>
              <iframe
                title={`${r.city} venue map`}
                src={r.mapEmbed}
                className="relative h-48 w-full grayscale-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
