"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projetos", label: "Projetos" },
  { href: "/escrita", label: "Escrita" },
  { href: "/pesquisa", label: "Pesquisa" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 glass-card">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="layout-cluster gap-4">
          <Link
            href="/"
            className="font-display text-lg text-foreground hover:text-primary transition-colors"
          >
            AR
          </Link>
          <a
            href="https://requiemcompany.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-foreground transition-colors hidden sm:block"
          >
            Requiem Company ↗
          </a>
        </div>

        <ul className="layout-cluster gap-6 list-none">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm transition-colors hover:text-foreground ${
                  pathname?.startsWith(href)
                    ? "text-foreground font-medium"
                    : "text-muted"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
