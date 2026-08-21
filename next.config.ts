import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// 'unsafe-inline' em script-src: o Next injeta scripts inline de hidratação sem
// nonce, e o layout tem o marcador `html.js` e o JSON-LD. Sem terceiros, o resto
// fica restrito à própria origem.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920],
  },
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      // DEC-011: SGTU passou a se chamar UniPass — Passaporte Universitário.
      {
        source: "/projetos/sgtu",
        destination: "/projetos/unipass",
        permanent: true,
      },
      // Tela Brasil sai do site até a checagem jurídica (TED/Serpro, mar/2027).
      {
        source: "/projetos/tela-brasil",
        destination: "/projetos",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
