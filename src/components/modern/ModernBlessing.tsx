import { wedding } from "@/data/wedding";
import Reveal from "../Reveal";
import ModernDivider from "./ModernDivider";

// `completed` is shown plainly; `pursuing` gets a line over it — still
// studying, not yet finished.
function QualText({ completed, pursuing }: { completed?: string; pursuing: string }) {
  return (
    <>
      {completed ? `${completed}, ` : ""}
      <span className="[text-decoration:overline] [text-underline-offset:2px]">{pursuing}</span>
    </>
  );
}

function QualLine(props: { completed?: string; pursuing: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gold">
      <QualText {...props} />
    </p>
  );
}

// Three distinct styles so name / qualifications / designation never blend
// together: name is plain serif (identity), qualifications are small gold
// tracked caps (a "credential" look), designation is italic and muted (a
// caption). Qualifications also get their own full-width line so a long
// list wraps cleanly instead of stranding one abbreviation alone.
function ParentBlock({ name, qualifications, designation }: { name: string; qualifications: string; designation: string }) {
  return (
    <div>
      <p className="font-serif text-lg text-ink">{name}</p>
      <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold">{qualifications}</p>
      <p className="mt-1 font-serif text-sm italic text-ink/65">{designation}</p>
    </div>
  );
}

export default function ModernBlessing() {
  return (
    <section id="blessing" className="mx-auto max-w-2xl px-6 py-24 text-center">
      <Reveal><ModernDivider /></Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 font-serif text-xl italic leading-relaxed text-ink/90 sm:text-2xl">{wedding.blessing}</p>
      </Reveal>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <Reveal x={-30} y={0}>
          <p className="text-xs uppercase tracking-[0.3em] text-maroon/80">Bride</p>
          <p className="modern-grad-text mt-2 font-serif text-3xl">{wedding.bride.title} {wedding.bride.full}</p>
          <div className="mt-2">
            <QualLine {...wedding.bride.qualifications} />
          </div>
          <p className="mt-2 text-sm text-ink/80">D/o {wedding.bride.father.name} &amp; {wedding.bride.mother.name}</p>
        </Reveal>
        <Reveal x={30} y={0}>
          <p className="text-xs uppercase tracking-[0.3em] text-maroon/80">Groom</p>
          <p className="modern-grad-text mt-2 font-serif text-3xl">{wedding.groom.title} {wedding.groom.full}</p>
          <div className="mt-2">
            <QualLine {...wedding.groom.qualifications} />
          </div>
          <p className="mt-2 text-sm text-ink/80">S/o {wedding.groom.father.name} &amp; {wedding.groom.mother.name}</p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-16">
        <ModernDivider />
      </Reveal>

      <div className="mt-8 grid items-start gap-6 sm:grid-cols-2">
        <Reveal x={-20} y={0} className="modern-glass space-y-4 rounded-2xl p-6 text-left shadow-[0_8px_30px_rgba(0,0,0,.04)]">
          <p className="font-serif text-lg italic text-ink">{wedding.bride.name}&apos;s Family</p>
          <ParentBlock {...wedding.bride.father} />
          <ParentBlock {...wedding.bride.mother} />
        </Reveal>
        <Reveal x={20} y={0} className="modern-glass space-y-4 rounded-2xl p-6 text-left shadow-[0_8px_30px_rgba(0,0,0,.04)]">
          <p className="font-serif text-lg italic text-ink">{wedding.groom.name}&apos;s Family</p>
          <ParentBlock {...wedding.groom.father} />
          <ParentBlock {...wedding.groom.mother} />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-maroon/80">Brother</p>
            <p className="mt-1 font-serif text-lg text-ink">{wedding.groom.brother.name}</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold">
              <QualText {...wedding.groom.brother.qualifications} />
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-16">
        <ModernDivider />
        <p className="mt-6 font-serif text-lg italic text-ink">{wedding.grandparents.heading}</p>
        {wedding.grandparents.lines.map((line) => (
          <p key={line} className="mt-1 text-sm text-ink/80">{line}</p>
        ))}
      </Reveal>
    </section>
  );
}
