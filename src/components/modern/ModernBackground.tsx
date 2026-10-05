// Fixed, full-page ambient backdrop: a drifting multi-colour gradient mesh,
// an aurora sweep, film grain, and soft glowing bokeh lights + sparkles.
// Pure CSS animation for the mesh/orbs (see .modern-bg in globals.css) plus
// a lightweight framer-motion bokeh layer — no particle/constellation
// effect, just a warm, magical wash of colour and light.
import ModernBokeh from "./ModernBokeh";

export default function ModernBackground() {
  return (
    <>
      <div className="modern-bg" aria-hidden>
        <div className="modern-bg-aurora" />
        <div className="modern-bg-orb" />
        <div className="modern-bg-orb2" />
        <div className="modern-bg-orb3" />
        <div className="modern-grain" />
      </div>
      <ModernBokeh />
    </>
  );
}
