"use client";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";
import { withBase } from "@/lib/assetPath";
import { useGuestName } from "@/lib/useGuestName";
import InviteCover from "./InviteCover";
import Hero from "./Hero";
import Blessing from "./Blessing";
import Countdown from "./Countdown";
import Story from "./Story";
import Receptions from "./Receptions";
import Gallery from "./Gallery";
import Footer from "./Footer";
import MusicToggle from "./MusicToggle";

export default function Invitation() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  // Personalised greeting: /?to=Ravi%20%26%20Family — read client-side
  // (there's no server at request time on a static export).
  const guest = useGuestName();
  const audio = useRef<HTMLAudioElement>(null);

  // Lock scroll until the envelope is opened.
  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const start = () => {
    audio.current?.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };
  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else { a.pause(); setPlaying(false); }
  };

  return (
    <>
      <audio ref={audio} src={withBase(wedding.music)} loop preload="none" />
      <InviteCover onOpen={start} onReveal={() => setOpen(true)} guest={guest} />
      <main>
        <Hero started={open} />
        <Blessing />
        <Countdown />
        <Story />
        <Receptions />
        <Gallery />
      </main>
      <Footer />
      <MusicToggle playing={playing} onToggle={toggle} />
    </>
  );
}
