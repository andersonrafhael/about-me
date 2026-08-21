import type { CSSProperties } from "react";
import Link from "next/link";
import { ConstellationCanvas } from "@/components/constellation-canvas";
import { ProductFrame } from "@/components/ui/product-frame";
import { StatusBadge } from "@/components/ui/status-badge";
import { media } from "@/data/media";
import { featuredProjects } from "@/data/projects";
import { hero, heroMetrics } from "@/data/site";

const rise = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

function Domain({ children }: { children: string }) {
  return (
    <em className="not-italic text-fg-bright underline decoration-primary/70 decoration-2 underline-offset-[0.18em]">
      {children}
    </em>
  );
}

export function Hero() {
  const [d1, d2, d3] = hero.subline.domains;
  return (
    <section className="relative overflow-hidden px-site" aria-labelledby="hero-title">
      <ConstellationCanvas />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[38%] top-[40%] -z-10 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 68%)" }}
      />
      <div
        aria-hidden
        className="numeral absolute -bottom-[5vw] -right-[2vw] -z-10 hidden lg:block"
        style={{ fontSize: "clamp(280px, 34vw, 600px)" }}
      >
        01
      </div>

      <div className="container-site grid min-h-[calc(100dvh-56px)] items-center gap-14 py-16 lg:grid-cols-[7fr_5fr] lg:gap-20 lg:py-24">
        {/* ── copy ── */}
        <div className="flex flex-col gap-8">
          <div className="rise">
            <p className="mono-label flex items-center gap-3 text-mint">
              <span className="relative inline-flex h-2 w-2 items-center justify-center text-mint">
                <span className="status-dot ping" data-tone="live" aria-hidden />
              </span>
              {hero.eyebrow}
            </p>
          </div>

          <div className="rise" style={rise(80)}>
            <h1 id="hero-title" className="display hero-headline">
              {hero.headline}
              <span className="punct">.</span>
            </h1>
            <p className="hero-subline mt-3 font-headline font-medium leading-[1.05] tracking-[-0.03em] text-foreground/85">
              {hero.subline.lead} <Domain>{d1}</Domain>, <Domain>{d2}</Domain> e <Domain>{d3}</Domain>.
            </p>
          </div>

          <div className="rise" style={rise(160)}>
            <p className="lede">{hero.dek}</p>
          </div>

          <div className="rise" style={rise(240)}>
            <div className="flex flex-wrap gap-3">
              <Link href={hero.primaryCta.href} className="btn btn-primary">
                {hero.primaryCta.label}
                <span aria-hidden>→</span>
              </Link>
              <Link href={hero.secondaryCta.href} className="btn btn-ghost">
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="rise" style={rise(320)}>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-6 sm:grid-cols-4">
              {heroMetrics.map((m) => (
                <div key={m.label} className="flex flex-col gap-1.5">
                  <dd className="tabular font-headline text-[26px] font-bold leading-none text-fg-bright">{m.value}</dd>
                  <dt className="font-mono text-[11px] leading-snug tracking-[0.04em] text-foreground/65">{m.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── prova: um único DOM, colagem no desktop e pilha no mobile ── */}
        <div className="rise" style={rise(280)}>
          <div className="relative flex flex-col gap-5 lg:block lg:aspect-[5/4]">
            <div className="lg:absolute lg:right-0 lg:top-0 lg:w-[88%]">
              <ProductFrame item={media.sigmaLanding} caption={false} priority sizes="(min-width: 1024px) 38vw, 100vw" />
            </div>
            <div className="hidden lg:absolute lg:bottom-0 lg:left-0 lg:block lg:w-[52%]">
              <ProductFrame item={media.unipassPainelDemo} caption={false} sizes="(min-width: 1024px) 22vw, 100vw" tilt />
            </div>
            <div className="glass rounded-xl p-4 lg:absolute lg:-bottom-8 lg:right-0 lg:w-[250px]">
              <p className="mono-sublabel mb-2">Estado dos produtos</p>
              <ul className="flex flex-col">
                {featuredProjects.map((p) => (
                  <li key={p.slug} className="flex items-center justify-between gap-3 border-b border-white/5 py-1.5 last:border-0">
                    <Link href={`/projetos/${p.slug}`} className="text-[13px] text-foreground transition-colors hover:text-fg-bright">
                      {p.name}
                    </Link>
                    <StatusBadge status={p.status} className="border-transparent px-0" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-5 font-mono text-[10px] tracking-[0.06em] text-foreground/60 lg:mt-14 lg:text-right">
            capturas · sigma.requiemcompany.com.br · painel do UniPass em demonstração
          </p>
        </div>
      </div>
    </section>
  );
}
