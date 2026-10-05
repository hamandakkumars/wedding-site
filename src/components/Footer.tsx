import { wedding } from "@/data/wedding";
import Reveal from "./Reveal";
import Ornament from "./Ornament";

export default function Footer() {
  return (
    <footer className="bg-maroon px-6 pb-20 text-center text-ivory">
      <div className="temple-border mb-16 -mx-6" />
      <Reveal>
        <Ornament />
        <p className="mt-8 font-serif text-2xl italic text-gold-soft">With love &amp; gratitude, see you at our receptions</p>
        <p className="mt-6 font-script text-6xl text-gold-soft">
          {wedding.bride.name[0]} <span className="text-3xl">&amp;</span> {wedding.groom.name[0]}
        </p>
        <p className="mt-6 text-sm tracking-[0.3em] text-ivory/70">{wedding.hashtag}</p>
      </Reveal>
    </footer>
  );
}
