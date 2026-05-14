import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "@/app/globals.css";
import { Nav } from "@/components/nav";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://andersonrafhael.requiemcompany.com.br";
const siteDescription =
  "Engenheiro e fundador da Requiem Company. Construo infraestrutura digital para municípios brasileiros.";

export const metadata: Metadata = {
  title: {
    default: "Anderson Rafhael — Requiem Company",
    template: "%s | Anderson Rafhael",
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Anderson Rafhael" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Anderson Rafhael",
    title: "Anderson Rafhael — Requiem Company",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "Anderson Rafhael — Requiem Company",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999
                     focus:px-4 focus:py-2 focus:bg-void focus:text-foreground focus:rounded-lg
                     focus:border focus:border-border focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Ir para o conteúdo principal
        </a>
        <Providers>
          <Nav />
          <main id="main-content" className="pt-14">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
