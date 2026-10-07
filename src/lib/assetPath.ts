// GitHub Pages serves this site from a subpath (e.g. /wedding-site), not the
// domain root. next/image and next/link auto-prefix that subpath, but a raw
// `src="/music/wedding.mp3"` on a plain <audio>/<img> tag does not — wrap
// any hardcoded /public path with this so it resolves correctly both in
// local dev (no prefix) and on GitHub Pages (prefixed).
export function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
