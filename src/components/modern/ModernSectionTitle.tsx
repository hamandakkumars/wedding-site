import Reveal from "../Reveal";
import ModernDivider from "./ModernDivider";

export default function ModernSectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal className="mb-14 text-center">
      <p className="text-[11px] uppercase tracking-[0.5em] text-maroon/85">{kicker}</p>
      <h2 className="modern-grad-text mt-4 font-serif text-4xl font-medium sm:text-5xl">{title}</h2>
      <ModernDivider className="mt-5" />
    </Reveal>
  );
}
