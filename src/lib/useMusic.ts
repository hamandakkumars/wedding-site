"use client";
import { useRef, useState } from "react";
import { wedding } from "@/data/wedding";
import { withBase } from "./assetPath";

// Background music: starts `musicStart` seconds into the track and, when the
// track ends, jumps back to that point (the native `loop` attribute would
// restart from 0:00). Spread `audioProps` onto an <audio> element.
export function useMusic() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const from = wedding.musicStart;

  const play = () => {
    const a = audio.current;
    if (!a) return;
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
