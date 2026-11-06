"use client";
import { useRef, useState } from "react";
import { wedding } from "@/data/wedding";
import { withBase } from "./assetPath";

// Background music: starts `musicStart` seconds into the track and, when the
// track ends, jumps back to that point (the native `loop` attribute would
// restart from 0:00). Spread `audioProps` onto an <audio> element.
export function useMusic() {
  const audio = useRef<HTMLAudioElement>(null);
  const ctx = useRef<AudioContext | null>(null);
  const [playing, setPlaying] = useState(false);
  const from = wedding.musicStart;

  // Play at `musicVolume` of the device volume. iOS Safari ignores
  // `audio.volume`, so route the element through a Web Audio gain node
  // instead; it's created on the first tap, since browsers only allow
  // audio to start from a user gesture.
  const applyVolume = (a: HTMLAudioElement) => {
    if (!ctx.current) {
      try {
        const c = new AudioContext();
        const gain = c.createGain();
        gain.gain.value = wedding.musicVolume;
        c.createMediaElementSource(a).connect(gain).connect(c.destination);
        ctx.current = c;
      } catch {
        a.volume = wedding.musicVolume;
        return;
      }
    }
    if (ctx.current.state === "suspended") ctx.current.resume().catch(() => {});
  };

  const play = () => {
    const a = audio.current;
    if (!a) return;
    applyVolume(a);
    if (a.currentTime < from) a.currentTime = from;
    a.play().catch(() => setPlaying(false));
  };

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) play();
    else a.pause();
  };

  const audioProps = {
    ref: audio,
    // `#t=` makes the browser begin loading/playing from the start offset.
    src: `${withBase(wedding.music)}#t=${from}`,
    preload: "auto" as const,
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    onEnded: () => {
      const a = audio.current;
      if (!a) return;
      a.currentTime = from;
      a.play().catch(() => {});
    },
  };

  return { audioProps, playing, play, toggle };
}
