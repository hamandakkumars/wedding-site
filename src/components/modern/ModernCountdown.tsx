"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding, type Reception } from "@/data/wedding";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import Reveal from "../Reveal";
import ModernSectionTitle from "./ModernSectionTitle";

const ACCENTS = ["var(--gold)", "var(--violet)", "var(--sky)", "var(--rose)"];

// Ticks every second — kept deliberately simple (no blur/scale/shimmer
// fighting each other on a fast-remounting element, which read as flicker).
// A plain, slightly-eased slide-fade in the reception's own accent colour.
function Unit({ value, label, accent }: { value: number; label: string; accent: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-12 w-14 overflow-hidden sm:h-16 sm:w-20">
        <AnimatePresence initial={false}>
          <motion.span
            key={text}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            style={{ color: accent, fontVariantNumeric: "tabular-nums" }}
            className="absolute inset-0 flex items-center justify-center font-sans text-3xl font-semibold sm:text-5xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 text-[9px] uppercase tracking-[0.3em] text-maroon/60 sm:text-xs">{label}</span>
    </div>
  );
}

function ReceptionCountdown({ reception, now, accent }: { reception: Reception; now: number | null; accent: string }) {
  const target = new Date(reception.start).getTime();
  const diff = now === null ? 0 : Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;

  return (
    <Reveal className="group relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-[2rem] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />
      <div className="modern-glass relative rounded-3xl px-5 py-10 text-center shadow-[0_10px_40px_rgba(0,0,0,.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,.08)] sm:px-8">
        <p className="text-xs uppercase tracking-[0.4em] text-maroon/60">{reception.city}</p>
        <p className="mt-1 font-sans text-base font-medium tracking-wide text-ink" style={{ fontVariantNumeric: "tabular-nums" }}>{reception.date}</p>
        <div className="mt-6 flex justify-center gap-1 divide-x divide-ink/10 sm:gap-2">
          <Unit value={d} label="Days" accent={accent} />
          <Unit value={h} label="Hours" accent={accent} />
          <Unit value={m} label="Mins" accent={accent} />
          <Unit value={s} label="Secs" accent={accent} />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={googleCalendarUrl(wedding, reception)}
            target="_blank"
            rel="noreferrer"
            className="border px-5 py-2.5 text-[11px] uppercase tracking-[0.3em] text-ink transition hover:text-ivory"
            style={{ borderColor: accent }}
            onMouseEnter={(e) => (e.currentTarget.style.background = accent)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Add to Calendar
          </a>
          <button
            onClick={() => downloadIcs(wedding, reception)}
            className="border border-ink/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.3em] text-ink transition hover:border-gold hover:text-gold"
          >
            Download .ics
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function ModernCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="px-6 py-24">
      <ModernSectionTitle kicker="Save the dates" title="Counting Down" />
      <div className="mx-auto grid max-w-3xl gap-10 sm:grid-cols-2">
        {wedding.receptions.map((r, i) => (
          <ReceptionCountdown key={r.id} reception={r} now={now} accent={ACCENTS[i % ACCENTS.length]} />
        ))}
      </div>
    </section>
  );
}
