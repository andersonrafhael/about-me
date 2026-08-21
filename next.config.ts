import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Static export served by Cloudflare Workers static assets (see wrangler.jsonc).
// `headers()` and `redirects()` are not applied by `output: "export"`, so the
// security headers live in public/_headers and the redirects in public/_redirects
// (both copied verbatim into out/ by the build).
const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  images: {
    // The default loader needs a server; every asset is a pre-sized WebP (≤ ~90 KB).
    unoptimized: true,
  },
  experimental: {
    viewTransition: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
