import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Não encontrado",
};

const navLinks = [
  { href: "/projetos", label: "Projetos" },
  { href: "/escrita", label: "Escrita" },
  { href: "/pesquisa", label: "Pesquisa" },
  { href: "/sobre", label: "Sobre" },
];

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-56px)] px-site max-w-[1280px] mx-auto
                    flex flex-col justify-center py-[clamp(64px,10vh,120px)]">

      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted mb-8">
        Erro · 404
      </p>

      <h1 className="editorial-title mb-6">
        Não encontrado<span className="punct">.</span>
      </h1>

      <p className="text-foreground/65 text-[15px] leading-relaxed max-w-[40ch] mb-12">
        Esta página não existe ou foi movida. Verifique o endereço ou
        volte ao início.
      </p>

      <div className="flex flex-col gap-6">
        <Link
          href="/"
          className="font-mono text-[13px] tracking-[0.06em] text-primary
                     hover:text-fg-bright transition-colors w-fit"
        >
          ← Voltar ao início
        </Link>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3
                        border-t border-border pt-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-[11px] tracking-[0.14em] uppercase
                         text-muted hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
