import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ViewTransition } from "react";
import "@/app/fonts.css";
import "@/app/globals.css";
import { Footer } from "@/components/footer";
import { Grain } from "@/components/grain";
import { Nav } from "@/components/nav";
import { site } from "@/data/site";
import { rootGraph, serializeJsonLd } from "@/lib/json-ld";

const jetbrainsMono = localFont({
  src: [
    {
      path: "../assets/fonts/JetBrainsMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/JetBrainsMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains-mono",
  // optional: sem swap (zero CLS/LCP tardio); entra a partir do 2º carregamento, já em cache
  display: "optional",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});

const duneRise = localFont({
  src: "../assets/fonts/DuneRise.ttf",
  variable: "--font-dune",
  display: "swap",
  preload: false,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Anderson Rafhael",
    "Requiem Company",
    "GovTech",
    "infraestrutura digital",
    "gestão pública",
    "sinalização viária",
    "transporte universitário",
    "dispositivos implantáveis",
    "Maceió",
  ],
  alternates: {
    canonical: site.url,
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  formatDetection: { email: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0e0e13",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${duneRise.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        <script
          // marca que há JS antes da hidratação: .reveal só esconde em html.js
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(rootGraph()) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:border focus:border-border-2 focus:bg-void focus:px-4 focus:py-2 focus:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Ir para o conteúdo principal
        </a>
        <Nav />
        <ViewTransition>
          <main id="main-content" tabIndex={-1} className="flex-1 pt-14 outline-none">
            {children}
          </main>
        </ViewTransition>
        <Footer />
        <Grain />
      </body>
    </html>
  );
}
