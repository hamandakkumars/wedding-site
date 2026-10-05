import { wedding } from "@/data/wedding";
import Reveal from "../Reveal";
import ModernDivider from "./ModernDivider";

export default function ModernBlessing() {
  return (
    <section id="blessing" className="mx-auto max-w-2xl px-6 py-24 text-center">
      <Reveal><ModernDivider /></Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 font-serif text-xl italic leading-relaxed text-ink/80 sm:text-2xl">{wedding.blessing}</p>
      </Reveal>
      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <Reveal x={-30} y={0}>
          <p className="text-xs uppercase tracking-[0.3em] text-maroon/60">Bride</p>
          <p className="mt-2 font-serif text-3xl text-ink">{wedding.bride.full}</p>
          <p className="mt-1 text-sm text-ink/60">D/o {wedding.bride.father} &amp; {wedding.bride.mother}</p>
        </Reveal>
        <Reveal x={30} y={0}>
          <p className="text-xs uppercase tracking-[0.3em] text-maroon/60">Groom</p>
          <p className="mt-2 font-serif text-3xl text-ink">{wedding.groom.full}</p>
          <p className="mt-1 text-sm text-ink/60">S/o {wedding.groom.father} &amp; {wedding.groom.mother}</p>
        </Reveal>
      </div>
    </section>
  );
}
