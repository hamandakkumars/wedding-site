import { wedding } from "@/data/wedding";
import Reveal from "./Reveal";
import Ornament from "./Ornament";

export default function Blessing() {
  return (
    <section id="blessing" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <Reveal><Ornament /></Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 font-serif text-2xl italic leading-relaxed text-ink/85 sm:text-3xl">{wedding.blessing}</p>
      </Reveal>
      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        <Reveal x={-40} y={0}>
          <p className="text-xs uppercase tracking-[0.3em] text-maroon/70">Bride</p>
          <p className="gold-text font-script text-4xl">{wedding.bride.full}</p>
          <p className="mt-1 font-serif text-ink/70">D/o {wedding.bride.father} & {wedding.bride.mother}</p>
        </Reveal>
        <Reveal x={40} y={0}>
          <p className="text-xs uppercase tracking-[0.3em] text-maroon/70">Groom</p>
          <p className="gold-text font-script text-4xl">{wedding.groom.full}</p>
          <p className="mt-1 font-serif text-ink/70">S/o {wedding.groom.father} & {wedding.groom.mother}</p>
        </Reveal>
      </div>
    </section>
  );
}
