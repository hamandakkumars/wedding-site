"use client";
import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";
import Reveal from "../Reveal";
import ModernDivider from "./ModernDivider";
import ModernSectionTitle from "./ModernSectionTitle";

const banner = "linear-gradient(120deg, var(--gold-soft), var(--rose-soft), var(--violet-soft), var(--sky-soft))";

// Two-day programme: one glass card per day, each a vertical timeline.
export default function ModernSchedule() {
  const { schedule } = wedding;
  return (
    <section id="schedule" className="px-6 py-24">
      <ModernSectionTitle kicker={schedule.dates} title={schedule.title} />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {schedule.days.map((d, di) => (
          <Reveal key={d.label} x={di === 0 ? -30 : 30} y={0}>
            <div className="modern-glass h-full overflow-hidden rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,.05)]">
              <div className="relative flex h-28 items-center justify-center gap-4 overflow-hidden">
                <motion.div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: banner, backgroundSize: "300% auto" }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
                <span className="modern-grad-text relative font-serif text-6xl leading-none" style={{ fontVariantNumeric: "lining-nums" }}>{d.day}</span>
                <span className="relative text-left">
                  <span className="block text-[11px] uppercase tracking-[0.4em] text-maroon/85">{d.label}</span>
                  <span className="block font-serif text-xl text-ink">{d.month}</span>
                </span>
              </div>

              <ol className="relative space-y-3 px-6 pb-8 pt-6 sm:px-8">
                <span aria-hidden className="absolute bottom-10 left-11 top-8 w-px bg-gold/40 sm:left-[3.25rem]" />
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
                      className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm ring-1 ring-gold/50"
                    >
                      {it.icon}
                    </span>
                    <div className="pt-0.5">
                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-maroon/85" style={{ fontVariantNumeric: "tabular-nums" }}>{it.time}</p>
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
        <ModernDivider />
        <p className="modern-grad-text mx-auto mt-6 max-w-xl font-serif text-2xl italic leading-snug sm:text-3xl">{schedule.tagline}</p>
      </Reveal>
    </section>
  );
}
