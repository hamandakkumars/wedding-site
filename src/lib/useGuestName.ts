"use client";
import { useSyncExternalStore } from "react";

// Reads ?to=Name from the URL. Uses useSyncExternalStore (not state-in-effect)
// so there's no hydration mismatch: the server/static snapshot is always
// `undefined` (no browser, no query string at build time), and React swaps
// in the real client-side value right after hydration with no flash of
// mismatched content and no lint warning about setState-in-effect.
const subscribe = () => () => {};
const getSnapshot = () => {
  const raw = new URLSearchParams(window.location.search).get("to");
  return raw?.trim().slice(0, 60) || undefined;
};
const getServerSnapshot = () => undefined;

export function useGuestName() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
