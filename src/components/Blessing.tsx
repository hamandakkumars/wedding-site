import { wedding } from "@/data/wedding";
import Reveal from "./Reveal";
import Ornament from "./Ornament";

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
// caption). Name and qualifications share a line (wrapping together if
// long) with the designation on its own line below.
function ParentBlock({ name, qualifications, designation }: { name: string; qualifications: string; designation: string }) {
  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-serif text-lg text-ink">{name}</span>
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gold">{qualifications}</span>
      </p>
      <p className="mt-1 font-serif text-sm italic text-ink/65">{designation}</p>
    </div>
  );
}

export default function Blessing() {
  return (
    <section id="blessing" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <Reveal><Ornament /></Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 font-serif text-2xl italic leading-relaxed text-ink/85 sm:text-3xl">{wedding.blessing}</p>
      </Reveal>

      <div className="mt-14 grid gap-10 sm:grid-cols-2">
        <Reveal x={-40} y={0}>
          <p className="text-xs uppercase tracking-[0.3em] text-maroon/70">Bride</p>
          <p className="gold-text pt-2 font-script text-4xl leading-[1.3]">{wedding.bride.title} {wedding.bride.full}</p>
          <div className="mt-2">
            <QualLine {...wedding.bride.qualifications} />
          </div>
          <p className="mt-2 font-serif text-ink/70">D/o {wedding.bride.father.name} &amp; {wedding.bride.mother.name}</p>
        </Reveal>
        <Reveal x={40} y={0}>
          <p className="text-xs uppercase tracking-[0.3em] text-maroon/70">Groom</p>
          <p className="gold-text pt-2 font-script text-4xl leading-[1.3]">{wedding.groom.title} {wedding.groom.full}</p>
          <div className="mt-2">
            <QualLine {...wedding.groom.qualifications} />
          </div>
          <p className="mt-2 font-serif text-ink/70">S/o {wedding.groom.father.name} &amp; {wedding.groom.mother.name}</p>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-16">
        <Ornament />
      </Reveal>

      <div className="mt-8 grid items-start gap-10 text-left sm:grid-cols-2">
        <Reveal x={-30} y={0} className="space-y-4">
          <p className="text-center font-serif text-xl italic text-maroon sm:text-left">{wedding.bride.name}&apos;s Family</p>
          <ParentBlock {...wedding.bride.father} />
          <ParentBlock {...wedding.bride.mother} />
        </Reveal>
        <Reveal x={30} y={0} className="space-y-4">
          <p className="text-center font-serif text-xl italic text-maroon sm:text-left">{wedding.groom.name}&apos;s Family</p>
          <ParentBlock {...wedding.groom.father} />
          <ParentBlock {...wedding.groom.mother} />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-maroon/70">Brother</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className="font-serif text-lg text-ink">{wedding.groom.brother.name}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gold">
                <QualText {...wedding.groom.brother.qualifications} />
              </span>
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-16">
        <Ornament />
        <p className="mt-6 font-serif text-lg italic text-maroon">{wedding.grandparents.heading}</p>
        {wedding.grandparents.lines.map((line) => (
          <p key={line} className="mt-1 text-sm text-ink/70">{line}</p>
        ))}
      </Reveal>
    </section>
  );
}
