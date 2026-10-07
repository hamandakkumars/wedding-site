"use client";
import { useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";
import { withBase } from "@/lib/assetPath";
import { useGuestName } from "@/lib/useGuestName";
import ModernBackground from "./ModernBackground";
import ModernCover from "./ModernCover";
import ModernHero from "./ModernHero";
import ModernBlessing from "./ModernBlessing";
import ModernCountdown from "./ModernCountdown";
import ModernStory from "./ModernStory";
import ModernReceptions from "./ModernReceptions";
import ModernGallery from "./ModernGallery";
import ModernFooter from "./ModernFooter";
import MusicToggle from "../MusicToggle";

export default function ModernInvitation() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  // Personalised greeting: /?to=Ravi%20%26%20Family — read client-side
  // (there's no server at request time on a static export).
  const guest = useGuestName();
  const audio = useRef<HTMLAudioElement>(null);

  // Always start at the top: the cover has no fixed height of its own to
  // scroll against, so a browser-restored scroll position (e.g. on reload)
  // would otherwise show the wrong section bleeding through behind it.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Lock scroll until the cover is tapped.
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
    <div className="theme-modern text-ink">
      <ModernBackground />
      <audio ref={audio} src={withBase(wedding.music)} loop preload="none" />
      <ModernCover onOpen={start} onReveal={() => setOpen(true)} guest={guest} />
      <main>
        <ModernHero started={open} />
        <ModernBlessing />
        <ModernCountdown />
        <ModernStory />
        <ModernReceptions />
        <ModernGallery />
      </main>
      <ModernFooter />
      <MusicToggle playing={playing} onToggle={toggle} />
    </div>
  );
}
