import confetti from "canvas-confetti";

const palette = ["#d79f3f", "#e8807e", "#9b6fd6", "#4fb3c9", "#f6dfa3"];

// A warm, colourful confetti burst from the center of the screen — used when
// the invitation cover is opened.
export function celebrate() {
  confetti({
    particleCount: 90,
    spread: 100,
    startVelocity: 38,
    gravity: 0.9,
    ticks: 200,
    origin: { y: 0.55 },
    colors: palette,
    scalar: 1.05,
  });
  confetti({
    particleCount: 50,
    spread: 140,
    startVelocity: 28,
    gravity: 0.85,
    ticks: 220,
    origin: { y: 0.55 },
    colors: palette,
    scalar: 0.8,
  });
}
