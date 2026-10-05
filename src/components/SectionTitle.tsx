import Reveal from "./Reveal";
import Ornament from "./Ornament";

export default function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-maroon/70">{kicker}</p>
      <h2 className="gold-text mt-3 font-serif text-4xl font-semibold sm:text-5xl">{title}</h2>
      <Ornament className="mt-4" />
    </Reveal>
  );
}
