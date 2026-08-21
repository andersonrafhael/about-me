import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anderson Rafhael — Requiem Company",
    short_name: "Anderson Rafhael",
    description: site.description,
    start_url: "/",
    display: "standalone",
    lang: "pt-BR",
    background_color: "#0e0e13",
    theme_color: "#0e0e13",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
