"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cva } from "class-variance-authority";

const links = [
  { href: "/projetos", label: "Projetos", n: "01" },
  { href: "/escrita", label: "Escrita", n: "02" },
  { href: "/pesquisa", label: "Pesquisa", n: "03" },
  { href: "/sobre", label: "Sobre", n: "04" },
  { href: "/contato", label: "Contato", n: "05" },
];

const navLinkClass = cva(
  "relative flex items-center gap-1 px-3 py-2 text-[13px] font-mono transition-colors rounded hover:text-foreground hover:bg-white/[0.02]",
  {
    variants: {
      active: {
        true: "text-primary",
        false: "text-foreground/55",
      },
    },
    defaultVariants: { active: false },
  }
);

const navNumClass = cva("text-[10px]", {
  variants: {
    active: {
      true: "text-primary/70",
      false: "text-foreground/50",
    },
  },
  defaultVariants: { active: false },
});

const mobileNavLinkClass = cva(
  "flex items-center gap-3 py-3 text-sm font-mono transition-colors border-b border-border/30 last:border-0",
  {
    variants: {
      active: {
        true: "text-primary",
        false: "text-muted hover:text-foreground",
      },
    },
    defaultVariants: { active: false },
  }
);

function useBRTClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("pt-BR", {
          timeZone: "America/Fortaleza",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function Nav() {
  const pathname = usePathname();
  const time = useBRTClock();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 nav-glass">
      <nav
        className="h-full max-w-[1440px] mx-auto px-[clamp(24px,4.5vw,80px)]
                   grid grid-cols-[1fr_auto_1fr] items-center gap-6"
      >
        {/* ── Esquerda: logo + studio ── */}
        <div className="flex items-center gap-[18px] min-w-0 whitespace-nowrap">
          <Link
            href="/"
            className="font-display font-bold text-[28px] leading-none tracking-tight
                       text-foreground hover:text-fg-bright transition-colors flex items-baseline gap-px"
          >
            AR
            <span className="italic text-primary">.</span>
          </Link>

          <span className="w-px h-[22px] bg-border-2 shrink-0" aria-hidden />

          <a
            href="https://requiemcompany.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] tracking-[0.16em] uppercase text-foreground/50
                       flex items-center gap-1.5 whitespace-nowrap
                       hover:text-foreground transition-colors group hidden sm:flex"
          >
            Requiem Company
            <span className="text-[10px] text-muted-2 group-hover:text-primary
                             group-hover:translate-x-px group-hover:-translate-y-px
                             transition-transform inline-block">↗</span>
          </a>
        </div>

        {/* ── Centro: status live ── */}
        <div
          className="hidden md:flex items-center gap-3 font-mono text-[11px]
                     tracking-[0.2em] uppercase text-foreground
                     px-3.5 py-1.5 border border-border rounded-full
                     bg-white/1.5 whitespace-nowrap"
        >
          <span className="relative w-2 h-2 rounded-full bg-mint shrink-0">
            <span
              className="absolute inset-[-3px] rounded-full border border-mint
                         animate-[nav-ping_2.4s_ease-out_infinite] opacity-0"
              aria-hidden
            />
          </span>
          <span className="text-mint font-medium">no ar</span>
          <span className="text-muted-2">·</span>
          <span className="text-foreground/65 tabular-nums">{time}</span>
          <span className="text-foreground/60">BRT</span>
        </div>

        {/* ── Direita: links numerados ── */}
        <div className="flex items-center justify-end gap-1">
          <ul className="hidden md:flex items-center gap-1 list-none">
            {links.map(({ href, label, n }) => {
              const active = pathname === href || pathname?.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link href={href} className={navLinkClass({ active })}>
                    <span className={navNumClass({ active })}>{n}</span>
                    {label}
                    {active && (
                      <span
                        className="absolute left-3 right-3 bottom-1 h-px bg-primary/70"
                        aria-hidden
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            data-open={menuOpen}
            className="group md:hidden flex flex-col gap-1.5 p-2 text-muted hover:text-foreground transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <span className="block w-5 h-px bg-current transition-transform group-data-[open=true]:rotate-45 group-data-[open=true]:translate-y-[7px]" />
            <span className="block w-5 h-px bg-current transition-opacity group-data-[open=true]:opacity-0" />
            <span className="block w-5 h-px bg-current transition-transform group-data-[open=true]:-rotate-45 group-data-[open=true]:translate-y-[-7px]" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden nav-glass border-t border-border/40">
          <ul className="flex flex-col list-none px-6 py-4 gap-1">
            {links.map(({ href, label, n }) => {
              const active = pathname === href || pathname?.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={mobileNavLinkClass({ active })}
                  >
                    <span className="text-[10px] text-muted-2">{n}</span>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
