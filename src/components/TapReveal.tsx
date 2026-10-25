"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Gold button over `children`; one tap opens it and fades the content in.
export default function TapReveal({
  children, className = "", label = "✦  Tap for the dates  ✦",
}: { children: React.ReactNode; className?: string; label?: string }) {
  const [open, setOpen] = useState(false);

  // Button and dates share one grid cell so the height never jumps.
  return (
    <div className={`grid ${className}`}>
      <motion.div
        className="col-start-1 row-start-1 flex flex-col items-center justify-center"
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open ? 0 : 12 }}
        transition={{ duration: 0.8, delay: open ? 0.3 : 0 }}
        aria-hidden={!open}
        style={{ visibility: open ? "visible" : "hidden" }}
      >
        {children}
      </motion.div>
      <AnimatePresence>
        {!open && (
          <motion.div
            className="col-start-1 row-start-1 flex items-center justify-center"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="tap-pulse cursor-pointer rounded-full px-6 py-3 font-sans text-[13px] font-semibold tracking-wide text-maroon shadow-md"
              style={{
                background: "linear-gradient(135deg,#a8801a,#f1d97a 35%,#c9a227 65%,#a8801a)",
                animation: "tapPulse 2.4s ease-in-out infinite",
              }}
            >
              {label}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
