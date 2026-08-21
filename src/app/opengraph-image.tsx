import { ImageResponse } from "next/og";

export const alt = "Anderson Rafhael — Requiem Company";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Static export: Turbopack requires metadata routes to declare themselves static.
export const dynamic = "force-static";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#131318",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Violet glow — top left */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -80,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* AR monogram badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 14,
            background: "rgba(139,92,246,0.15)",
            border: "1px solid rgba(139,92,246,0.28)",
            marginBottom: 36,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#8b5cf6",
              letterSpacing: "-0.03em",
            }}
          >
            AR
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 700,
            color: "#f3f1f7",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginBottom: 20,
          }}
        >
          Anderson Rafhael
        </div>

        {/* Tagline — two lines via flex column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            fontSize: 22,
            color: "#938ea0",
            lineHeight: 1.4,
            maxWidth: 680,
          }}
        >
          <span>Engenheiro e fundador da Requiem Company.</span>
          <span>Infraestrutura digital para municípios brasileiros.</span>
        </div>

        {/* Dot separator */}
        <div
          style={{
            display: "flex",
            width: 32,
            height: 2,
            background: "#8b5cf6",
            marginTop: 32,
            borderRadius: 2,
          }}
        />

        {/* Domain */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 44,
            right: 72,
            fontSize: 13,
            color: "#4a4654",
            fontFamily: "monospace",
            letterSpacing: "0.06em",
          }}
        >
          andersonrafhael.requiemcompany.com.br
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
