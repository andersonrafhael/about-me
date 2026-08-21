import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";

export function HomeCta() {
  return (
    <section
      className="section section-alt hairline relative overflow-hidden"
      aria-labelledby="cta-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
        }}
      />
      <Reveal className="container-site flex flex-col items-center gap-7 text-center">
        <p className="mono-label">
          <span className="text-primary-text">06</span> · Contato
        </p>
        <h2 id="cta-title" className="display text-[clamp(36px,5.2vw,80px)]">
          Vamos conversar<span className="punct">?</span>
        </h2>
        <p className="max-w-[46ch] text-[16px] leading-relaxed text-foreground/80">
          Projetos para prefeituras e hospitais, parcerias institucionais,
          pesquisa aplicada ou imprensa. E-mail direto, resposta em até 24 horas
          úteis.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <a href={`mailto:${site.email}`} className="btn btn-primary">
            {site.email}
          </a>
          <Link href="/contato" className="btn btn-ghost">
            Outros canais
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
