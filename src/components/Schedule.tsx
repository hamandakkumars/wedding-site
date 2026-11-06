"use client";
import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import Reveal from "./Reveal";
import Ornament from "./Ornament";
import SectionTitle from "./SectionTitle";

// Two-day programme: one arched card per day, each a vertical gold timeline.
export default function Schedule() {
  const { schedule } = wedding;
  return (
    <section id="schedule" className="px-6 py-24">
      <SectionTitle kicker={schedule.dates} title={schedule.title} />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {schedule.days.map((d, di) => (
          <Reveal key={d.label} x={di === 0 ? -40 : 40} y={0}>
            <div className="h-full overflow-hidden rounded-t-[7rem] rounded-b-2xl border border-gold/40 bg-ivory px-6 pb-8 pt-12 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:px-8">
              <div className="text-center">
                <span className="inline-block rounded-full bg-maroon px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-ivory">
                  {d.label}
                </span>
                <p className="title-text mt-4 font-date text-6xl font-bold leading-none">{d.day}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.4em] text-maroon/70">{d.month}</p>
                <div className="mx-auto mt-5 h-px w-12 bg-gold" />
              </div>

              <ol className="relative mt-8 space-y-3 text-left">
                {/* The timeline's spine, running through the icon centres. */}
                <span aria-hidden className="absolute bottom-5 left-5 top-5 w-px bg-gradient-to-b from-gold/70 via-gold/40 to-gold/70" />
                {d.items.map((it, i) => (
                  <motion.li
                    key={it.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-start gap-4 py-2 pr-3"
                  >
                    <span
                      aria-hidden
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold bg-ivory text-lg shadow-sm"
                    >
                      {it.icon}
                    </span>
                    <div className="pt-0.5">
                      <p className="font-date text-xs font-bold uppercase tracking-[0.12em] text-maroon">{it.time}</p>
                      <p className="mt-0.5 font-serif text-lg leading-snug text-ink">{it.title}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-14 text-center">
        <Ornament />
        <p className="mx-auto mt-6 max-w-xl font-serif text-2xl italic leading-relaxed text-ink/85 sm:text-3xl">{schedule.tagline}</p>
      </Reveal>
    </section>
  );
}
