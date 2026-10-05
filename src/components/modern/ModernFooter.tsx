import { wedding } from "@/data/wedding";
import Reveal from "../Reveal";
import ModernParticles from "./ModernParticles";

export default function ModernFooter() {
  return (
    <footer
      className="relative overflow-hidden px-6 py-24 text-center text-ivory"
      style={{
        background:
          "linear-gradient(160deg, var(--ink) 0%, color-mix(in srgb, var(--ink) 75%, var(--violet)) 55%, color-mix(in srgb, var(--ink) 70%, var(--gold)) 100%)",
      }}
    >
      <ModernParticles count={16} className="opacity-70" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{ background: "conic-gradient(from 0deg, var(--gold), var(--rose), var(--violet), var(--sky), var(--gold))", filter: "blur(70px)" }}
      />
      <Reveal className="relative z-10">
        <p className="font-serif text-xl italic text-ivory/85">With love &amp; gratitude, see you at our receptions</p>
        <p className="modern-grad-text mt-6 font-serif text-6xl">
          {wedding.bride.name[0]} <span>&amp;</span> {wedding.groom.name[0]}
        </p>
        <p className="mt-6 text-xs tracking-[0.4em] text-ivory/60">{wedding.hashtag}</p>
      </Reveal>
    </footer>
  );
}
