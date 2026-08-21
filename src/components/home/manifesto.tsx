import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { manifesto } from "@/data/site";

export function Manifesto() {
  return (
    <section
      className="section section-alt hairline"
      aria-labelledby="manifesto-title"
    >
      <div className="container-site grid gap-12 lg:grid-cols-[220px_1fr]">
        <Reveal>
          <h2 id="manifesto-title" className="mono-label">
            <span className="text-primary-text">04</span> · Manifesto
          </h2>
        </Reveal>
        <div className="flex max-w-[62ch] flex-col gap-10">
          <Reveal>
            <blockquote className="font-headline text-[clamp(26px,3.2vw,44px)] font-medium leading-[1.15] tracking-[-0.03em] text-fg-bright">
              “{manifesto.quote}”
            </blockquote>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-[17px] leading-relaxed text-foreground/80">
              {manifesto.body}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <dl className="grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
              {manifesto.markers.map((m) => (
                <div key={m.label} className="flex flex-col gap-1.5">
                  <dt className="font-headline text-[15px] font-semibold text-foreground">
                    {m.label}
                  </dt>
                  <dd className="text-[13px] leading-snug text-foreground/70">
                    {m.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={200}>
            <Link
              href="/sobre"
              className="link-quiet w-fit font-mono text-[13px]"
            >
              Sobre mim e a Requiem →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
