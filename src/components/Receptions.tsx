import QRCode from "react-qr-code";
import { wedding } from "@/data/wedding";
import Reveal from "./Reveal";
import SectionTitle from "./SectionTitle";

const icons: Record<string, string> = { ring: "💍", flame: "🪔", glass: "🥂" };

export default function Receptions() {
  return (
    <section id="receptions" className="bg-maroon/[0.04] px-6 py-24">
      <SectionTitle kicker="Join the celebration" title="Reception Celebrations" />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {wedding.receptions.map((r, i) => (
          <Reveal key={r.id} delay={i * 0.15}>
            <div className="group h-full overflow-hidden rounded-t-[7rem] rounded-b-2xl border border-gold/40 bg-ivory px-8 pb-8 pt-14 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="text-4xl transition group-hover:scale-110">{icons[r.icon] ?? "✨"}</div>
              <h3 className="gold-text mt-4 font-serif text-3xl font-semibold">{r.city} Reception</h3>
              <p className="mt-4 font-date text-base font-bold text-maroon sm:text-lg">{r.date}</p>
              <p className="text-sm tracking-wide text-ink/70">{r.time}</p>
              <div className="mx-auto my-5 h-px w-12 bg-gold" />
              <p className="font-serif text-xl">{r.venue}</p>
              <p className="mt-1 text-sm text-ink/60">{r.address}</p>
              <a
                href={r.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block rounded-full border border-gold px-5 py-2 text-xs tracking-widest text-maroon transition hover:bg-gold hover:text-white"
              >
                GET DIRECTIONS
              </a>
              <div className="mt-6 overflow-hidden rounded-xl border border-gold/30">
                <iframe
                  title={`${r.city} venue map`}
                  src={r.mapEmbed}
                  className="h-48 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="mx-auto mt-6 flex w-fit flex-col items-center rounded-xl bg-white p-3 shadow-sm">
                <a href={r.mapUrl} target="_blank" rel="noreferrer" aria-label={`Scan to open ${r.venue} in Google Maps`}>
                  <QRCode value={r.mapUrl} size={88} level="M" />
                </a>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-ink/50">Scan for directions</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
