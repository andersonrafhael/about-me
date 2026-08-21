import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const layers = [
  {
    n: "01",
    name: "Requiem Forge",
    href: "/projetos/requiem-forge",
    kicker: "Especificação antes de código",
    detail:
      "Harness de desenvolvimento dirigido por especificação: toda tarefa é dimensionada, recebe critério de aceite e só vale como pronta depois de um gate mecânico. Revisão em contexto limpo, separada de quem implementou. Versão 6.8, em uso em todos os projetos — inclusive neste site.",
  },
  {
    n: "02",
    name: "RHEMA",
    href: "/projetos/rhema",
    kicker: "Requisitos com validade",
    detail:
      "Três modelos formais dão a cada requisito posição na hierarquia, data de validade e maturidade composta. O requisito envelhecido é sinalizado antes de virar bug em produção. Paper em escrita para o ICSE-SEIP 2027.",
  },
  {
    n: "03",
    name: "Lumen OS · Requiem Intelligence · DevOps Core",
    href: "/projetos/requiem-forge",
    kicker: "Operar um portfólio sozinho",
    detail:
      "A camada zero que lê repositórios, vault e disco e audita tudo; o relatório semanal com sete métricas sobre o portfólio inteiro; e o PaaS interno que leva cada produto à produção com rotas, DNS e certificados.",
  },
] as const;

export function Method() {
  return (
    <section className="section hairline" aria-labelledby="metodo-title">
      <div className="container-site flex flex-col gap-14">
        <Reveal>
          <SectionHeader
            index="03"
            eyebrow="Método"
            title={
              <span id="metodo-title">
                Software público que não vira cemitério de aplicativos
                <span className="punct">.</span>
              </span>
            }
            aside="Sistemas de governo morrem por falta de método, não de código. Esta é a infraestrutura que faz uma pessoa sustentar vários produtos em operação."
          />
        </Reveal>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-3">
          {layers.map((l, i) => (
            <Reveal
              key={l.n}
              delay={i * 80}
              className="flex flex-col gap-5 bg-void-deep p-7 lg:p-9"
            >
              <p className="mono-label">
                <span className="text-primary-text">{l.n}</span> · {l.kicker}
              </p>
              <h3 className="font-headline text-[clamp(22px,2.2vw,30px)] font-bold leading-tight tracking-[-0.03em] text-fg-bright">
                {l.name}
              </h3>
              <p className="text-[15px] leading-relaxed text-foreground/80">
                {l.detail}
              </p>
              <Link
                href={l.href}
                className="link-quiet mt-auto w-fit font-mono text-[12px]"
              >
                Como funciona →
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
