"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding, type Reception } from "@/data/wedding";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]|\.\d{3}/g, "");

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-16 w-14 items-center justify-center overflow-hidden rounded-lg border border-gold/50 bg-white/70 shadow-md sm:h-24 sm:w-20">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={text}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="gold-text font-serif text-3xl font-bold sm:text-5xl"
          >
            {text}
          </motion.span>
        </AnimatePresence>
        <span className="absolute inset-x-0 top-1/2 h-px bg-gold/30" />
      </div>
      <span className="mt-2 text-[9px] uppercase tracking-[0.3em] text-maroon/70 sm:text-xs">{label}</span>
    </div>
  );
}

function ReceptionCountdown({ reception, now }: { reception: Reception; now: number | null }) {
  const target = new Date(reception.start).getTime();
  const diff = now === null ? 0 : Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor(diff / 3600000) % 24;
  const m = Math.floor(diff / 60000) % 60;
  const s = Math.floor(diff / 1000) % 60;

  const title = `${wedding.bride.name} & ${wedding.groom.name} Reception — ${reception.city}`;

  const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${stamp(reception.start)}/${stamp(reception.end)}&location=${encodeURIComponent(`${reception.venue}, ${reception.address}`)}`;

  return (
    <Reveal className="rounded-2xl border border-gold/30 bg-white/40 px-5 py-8 text-center shadow-sm sm:px-8">
      <p className="text-xs uppercase tracking-[0.4em] text-maroon/70">{reception.city}</p>
      <p className="mt-1 font-date text-base font-bold text-maroon sm:text-lg">{reception.date}</p>
      <div className="mt-5 flex justify-center gap-2 sm:gap-4">
        <Unit value={d} label="Days" />
        <Unit value={h} label="Hours" />
        <Unit value={m} label="Mins" />
        <Unit value={s} label="Secs" />
      </div>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <a href={gcal} target="_blank" rel="noreferrer" className="rounded-full bg-maroon px-5 py-2.5 text-xs tracking-widest text-ivory transition hover:bg-maroon/85">ADD TO CALENDAR</a>
      </div>
    </Reveal>
  );
}

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="bg-maroon/[0.04] px-6 py-24">
      <SectionTitle kicker="Save the dates" title="Counting Down" />
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        {wedding.receptions.map((r) => (
          <ReceptionCountdown key={r.id} reception={r} now={now} />
        ))}
      </div>
    </section>
  );
}
