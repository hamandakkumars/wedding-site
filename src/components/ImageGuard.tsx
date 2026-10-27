"use client";
import { useEffect } from "react";

// Deterrent against casual saving of the photos: blocks the right-click menu,
// dragging, and Ctrl/Cmd+S on the page. This cannot stop a determined person
// (anything a browser displays can still be fetched via DevTools or the file's
// URL), it just removes the one-click "Save image as" paths.
export default function ImageGuard() {
  useEffect(() => {
    const block = (e: Event) => e.preventDefault();
    const onContext = (e: Event) => {
      if ((e.target as HTMLElement | null)?.closest("img, canvas, [data-protect]")) e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) e.preventDefault();
    };
    document.addEventListener("contextmenu", onContext);
    document.addEventListener("dragstart", block);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return null;
}
