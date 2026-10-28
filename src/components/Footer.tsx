import { wedding } from "@/data/wedding";
import { withBase } from "@/lib/assetPath";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="px-6 pb-24 pt-12 text-center">
      <Reveal>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBase("/images/logo-heart.png")}
          alt={`${wedding.bride.name} & ${wedding.groom.name}`}
          draggable={false}
          className="mx-auto w-56 sm:w-72"
          loading="lazy"
        />
      </Reveal>
    </footer>
  );
}
