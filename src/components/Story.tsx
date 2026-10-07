import { wedding } from "@/data/wedding";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

export default function Story() {
  return (
    <section id="story" className="mx-auto max-w-4xl px-6 py-24">
      <SectionTitle kicker="How it began" title="Our Story" />
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold to-transparent sm:left-1/2" />
        {wedding.story.map((s, i) => {
          const left = i % 2 === 0;
          return (
            <div key={s.title} className="relative mb-12 pl-12 sm:flex sm:pl-0">
              <span className="absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-gold bg-ivory sm:left-1/2" />
              <Reveal
                x={left ? -50 : 50}
                y={0}
                className={`sm:w-1/2 ${left ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"}`}
              >
                <div className="rounded-xl border border-gold/30 bg-white/70 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  {s.year && <span className="gold-text font-date text-xl font-bold">{s.year}</span>}
                  <h3 className="mt-1 font-serif text-2xl text-maroon">{s.title}</h3>
                  {s.text && <p className="mt-2 text-sm leading-relaxed text-ink/75">{s.text}</p>}
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
