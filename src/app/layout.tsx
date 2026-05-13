import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "@/app/globals.css";
import { Nav } from "@/components/nav";

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

export const metadata: Metadata = {
  title: {
    default: "Anderson Rafhael — Requiem Company",
    template: "%s | Anderson Rafhael",
  },
  description:
    "Engenheiro e fundador da Requiem Company. Construo infraestrutura digital para municípios brasileiros.",
  metadataBase: new URL("https://andersonrafhael.requiemcompany.com.br"),
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
        <Nav />
        <main className="pt-14">{children}</main>
      </body>
    </html>
  );
}
