import type { NextConfig } from "next";

// Set by the GitHub Actions workflow (.github/workflows/deploy.yml) when
// building for GitHub Pages, where the site is served from a subpath
// (https://<user>.github.io/wedding-site) rather than the domain root.
// Locally (`npm run dev` / `npm run build`), this is unset and the site
// behaves exactly as before, at the root path.
const isGhPages = process.env.GH_PAGES === "true";
const basePath = isGhPages ? "/wedding-site" : "";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files — no Node server, no SSR/API
  // routes. This produces a fully static `out/` directory at build time.
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
