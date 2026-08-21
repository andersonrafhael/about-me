import { readFile } from "fs/promises";
import path from "path";
import { ImageResponse } from "next/og";
import { projects, statusLabel } from "@/data/projects";

export const alt = "Projeto — Anderson Rafhael";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Static export: Turbopack requires metadata routes to declare themselves static.
export const dynamic = "force-static";

// Static export renders one image per project at build time.
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  const name = project?.name ?? "Projeto";
  const subtitle = project?.subtitle;
  const category = project?.category ?? "Requiem Company";
  const status = project ? statusLabel[project.status] : "em operação";
  const tagline =
    project?.tagline ??
    "Infraestrutura digital para gestão pública, saúde e mobilidade.";

  // ImageResponse (Satori) só suporta ttf/otf/woff — woff2 falha em runtime.
  // As .ttf abaixo são as mesmas fontes, convertidas losslessly via
  // `woff2_decompress`.
  const [spaceGroteskBold, interRegular] = await Promise.all([
    readFile(
      path.join(process.cwd(), "src/assets/fonts/SpaceGrotesk-Bold.ttf"),
    ),
    readFile(path.join(process.cwd(), "src/assets/fonts/Inter-Regular.ttf")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#0e0e13",
        position: "relative",
        fontFamily: "Inter",
      }}
    >
      {/* Glow violeta — superior direito */}
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -160,
          width: 640,
          height: 640,
          borderRadius: 320,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Glow mint — inferior esquerdo, sutil */}
      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: -140,
          width: 560,
          height: 560,
          borderRadius: 280,
          background:
            "radial-gradient(circle, rgba(143,214,168,0.14) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Topo — label */}
      <div style={{ display: "flex" }}>
        <span
          style={{
            fontFamily: "Inter",
            fontSize: 18,
            color: "#938ea0",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          PROJETO · {category} · {status}
        </span>
      </div>

      {/* Centro — nome, subtítulo, tagline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: 96,
              color: "#f3f1f7",
              lineHeight: 1,
              letterSpacing: "-0.03em",
            }}
          >
            {name}
          </span>
          {subtitle ? (
            <span
              style={{
                fontFamily: "Inter",
                fontSize: 30,
                color: "#c8c5d0",
                marginTop: 12,
              }}
            >
              {subtitle}
            </span>
          ) : null}
        </div>

        <span
          style={{
            fontFamily: "Inter",
            fontSize: 26,
            color: "#938ea0",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {tagline}
        </span>
      </div>

      {/* Rodapé */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: "Inter", fontSize: 18, color: "#938ea0" }}>
          Anderson Rafhael · Requiem Company
        </span>
        <span style={{ fontFamily: "Inter", fontSize: 18, color: "#938ea0" }}>
          andersonrafhael.requiemcompany.com.br
        </span>
      </div>
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
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
      ],
    },
  );
}
