import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export const alt = "Anderson Rafhael — Escrita";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Static export: Turbopack requires metadata routes to declare themselves static.
export const dynamic = "force-static";

// Static export renders one image per post at build time.
export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

const MONTHS_ABBR = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function formatShortDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return `${String(date.getDate()).padStart(2, "0")} ${MONTHS_ABBR[date.getMonth()]} ${date.getFullYear()}`;
}

function titleFontSize(title: string): number {
  if (title.length <= 40) return 72;
  if (title.length <= 70) return 58;
  return 48;
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const spaceGroteskBold = await readFile(
    join(process.cwd(), "src/assets/fonts/SpaceGrotesk-Bold.ttf"),
  );

  const title = post?.title ?? "Escrita";
  const tag = post?.tags[0] ?? "Escrita";
  const date = post ? formatShortDate(post.date) : "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0e0e13",
        padding: "72px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -180,
          left: -120,
          width: 620,
          height: 620,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      <div
        style={{
          display: "flex",
          fontFamily: "monospace",
          fontSize: 15,
          letterSpacing: 3,
          textTransform: "uppercase",
          color: "#938ea0",
        }}
      >
        {`ESCRITA · ${tag} · ${date}`}
      </div>

      <div
        style={{
          display: "flex",
          fontFamily: "Space Grotesk",
          fontWeight: 700,
          fontSize: titleFontSize(title),
          lineHeight: 1.05,
          color: "#f3f1f7",
          maxWidth: 1000,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontFamily: "monospace",
          fontSize: 15,
          color: "#938ea0",
        }}
      >
        <span>Anderson Rafhael</span>
        <span>andersonrafhael.requiemcompany.com.br</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: spaceGroteskBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
