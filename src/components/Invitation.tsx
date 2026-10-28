"use client";
import { useEffect, useState } from "react";
import { useGuestName } from "@/lib/useGuestName";
import { useMusic } from "@/lib/useMusic";
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
  // Personalised greeting: /?to=Ravi%20%26%20Family — read client-side
  // (there's no server at request time on a static export).
  const guest = useGuestName();
  const { audioProps, playing, play, toggle } = useMusic();

  // Always start at the top on reload instead of the browser-restored section.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Lock scroll until the envelope is opened.
  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <audio {...audioProps} />
      <InviteCover onOpen={play} onReveal={() => setOpen(true)} guest={guest} />
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
