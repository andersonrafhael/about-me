import Link from "next/link";

export const metadata = { title: "Página não encontrada" };

const links = [
  { href: "/projetos", label: "Projetos" },
  { href: "/escrita", label: "Escrita" },
  { href: "/pesquisa", label: "Pesquisa" },
  { href: "/sobre", label: "Sobre" },
] as const;

export default function NotFound() {
  return (
    <div className="container-site px-site">
      <div className="pt-page flex min-h-[60vh] flex-col justify-center gap-8 py-[clamp(64px,10vh,120px)]">
        <p className="mono-label">Erro · 404</p>
        <h1 className="editorial-title">
          Não encontrado<span className="punct">.</span>
        </h1>
        <p className="max-w-[46ch] text-[15px] leading-relaxed text-foreground/70">
          Esta página não existe ou foi movida. Verifique o endereço ou volte ao
          início.
        </p>
        <div className="flex flex-col gap-6 pt-4">
          <Link href="/" className="link-quiet w-fit font-mono text-[13px]">
            ← Voltar ao início
          </Link>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="mono-label text-foreground/70 transition-colors hover:text-fg-bright"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
