import fs from "fs";
import path from "path";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
// Static export: Turbopack requires metadata routes to declare themselves static.
export const dynamic = "force-static";

export default async function Icon() {
  // ImageResponse (Satori) só suporta ttf/otf/woff — woff2 falha em runtime com
  // "Unsupported OpenType signature wOF2". src/assets/fonts/SpaceGrotesk-Bold.ttf
  // é a mesma fonte, convertida losslessly via `woff2_decompress`.
  const spaceGroteskBold = fs.readFileSync(
    path.join(process.cwd(), "src/assets/fonts/SpaceGrotesk-Bold.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0e0e13",
        border: "1px solid rgba(139,92,246,0.35)",
        borderRadius: 7,
      }}
    >
      <span
        style={{
          fontFamily: "Space Grotesk",
          fontSize: 16,
          fontWeight: 700,
          color: "#8b5cf6",
          letterSpacing: "-0.02em",
        }}
      >
        AR
      </span>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: spaceGroteskBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
