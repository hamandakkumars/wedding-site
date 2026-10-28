"use client";
import { useEffect, useState } from "react";
import { useGuestName } from "@/lib/useGuestName";
import { useMusic } from "@/lib/useMusic";
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
  // Personalised greeting: /?to=Ravi%20%26%20Family — read client-side
  // (there's no server at request time on a static export).
  const guest = useGuestName();
  const { audioProps, playing, play, toggle } = useMusic();

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

  return (
    <div className="theme-modern text-ink">
      <ModernBackground />
      <audio {...audioProps} />
      <ModernCover onOpen={play} onReveal={() => setOpen(true)} guest={guest} />
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
