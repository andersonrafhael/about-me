import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { channels, conversations } from "@/data/site";
import { breadcrumb, collectionPage, serializeJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contato",
  description:
    "Fale com Anderson Rafhael sobre projetos para prefeituras e hospitais, parcerias institucionais, pesquisa ou imprensa. E-mail direto, resposta em 24 h úteis.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            breadcrumb([
              { name: "Início", path: "/" },
              { name: "Contato", path: "/contato" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            collectionPage({
              name: "Contato",
              description:
                "Canais de contato de Anderson Rafhael e temas para conversar.",
              path: "/contato",
            }),
          ),
        }}
      />
      <div className="container-site px-site">
        <div className="pt-page mb-12">
          <nav
            aria-label="Trilha"
            className="mono-label flex items-center gap-2.5"
          >
            <Link
              href="/"
              className="text-foreground/70 transition-colors hover:text-fg-bright"
            >
              Início
            </Link>
            <span className="text-muted-2" aria-hidden>
              /
            </span>
            <span className="text-foreground">Contato</span>
          </nav>
        </div>

        <header className="mb-[clamp(48px,7vh,88px)] grid gap-6 border-b border-border pb-[clamp(32px,5vh,56px)] md:grid-cols-[1fr_auto] md:items-end">
          <h1 className="editorial-title">
            Contato<span className="punct">.</span>
          </h1>
          <p className="mono-label md:text-right">
            resposta em até 24 h úteis · Maceió, AL
          </p>
        </header>

        <section className="mb-[clamp(64px,9vh,112px)]">
          <h2 className="sr-only">Canais de contato</h2>
          <div className="flex flex-col divide-y divide-border border-t border-border">
            {channels.map((c) => {
              const isExternal = c.href.startsWith("http");
              return (
                <a
                  key={c.n}
                  href={c.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="surface-hover grid grid-cols-1 items-center gap-3 rounded-lg px-3 py-7 -mx-3 md:grid-cols-[56px_1fr_auto] md:gap-6"
                >
                  <span className="font-mono text-[12px] text-foreground/60">
                    {c.n}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-headline text-[22px] leading-tight text-fg-bright">
                      {c.label}
                      {isExternal && (
                        <span className="sr-only"> (abre em nova aba)</span>
                      )}
                    </span>
                    <span className="font-mono text-foreground/80">
                      {c.value}
                    </span>
                    <span className="text-[13px] text-foreground/65">
                      {c.hint}
                    </span>
                  </div>
                  <span className="text-lg text-foreground/50" aria-hidden>
                    {isExternal ? "↗" : ""}
                  </span>
                </a>
              );
            })}
          </div>
          <p className="mt-8 text-[13px] text-foreground/65">
            Sem formulário: e-mail direto chega mais rápido e fica registrado.
          </p>
        </section>

        <section className="pb-[clamp(64px,9vh,112px)]">
          <SectionHeader
            index="02"
            eyebrow="Contato"
            title={
              <>
                Sobre o que conversar<span className="punct">.</span>
              </>
            }
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {conversations.map((c) => (
              <div key={c.title} className="surface rounded-xl p-6">
                <h3 className="font-headline text-[17px] leading-snug text-fg-bright">
                  {c.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-foreground/75">
                  {c.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
