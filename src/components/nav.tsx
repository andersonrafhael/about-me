"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const links = [
  { href: "/projetos", label: "Projetos", n: "01" },
  { href: "/escrita", label: "Escrita", n: "02" },
  { href: "/pesquisa", label: "Pesquisa", n: "03" },
  { href: "/sobre", label: "Sobre", n: "04" },
  { href: "/contato", label: "Contato", n: "05" },
] as const;

function useLocalClock(timeZone: string) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pt-BR", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function Nav() {
  const pathname = usePathname();
  const time = useLocalClock("America/Fortaleza");
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // fecha no Escape e ao trocar de rota; devolve o foco ao botão
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    firstLinkRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // fecha o menu ao trocar de rota (estado derivado, ajustado durante o render)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-14 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "nav-glass" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Principal"
        className="container-site px-site grid h-full grid-cols-[1fr_auto] items-center gap-6 md:grid-cols-[1fr_auto_1fr]"
      >
        {/* esquerda — monograma + estúdio */}
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/"
            className="font-display flex items-baseline gap-px text-[20px] leading-none tracking-tight text-foreground transition-colors hover:text-fg-bright"
          >
            AR<span className="text-primary">.</span>
            <span className="sr-only"> Anderson Rafhael — início</span>
          </Link>
          <span className="h-5 w-px shrink-0 bg-border-2" aria-hidden />
          <Link
            href="/sobre#requiem"
            className="mono-label hidden text-[10.5px] text-foreground/70 transition-colors hover:text-fg-bright sm:inline"
          >
            Requiem Company
          </Link>
        </div>

        {/* centro — estado */}
        <div
          className="chip hidden border-border text-foreground/80 md:inline-flex"
          aria-live="off"
        >
          <span className="relative inline-flex h-2 w-2 items-center justify-center text-mint">
            <span className="status-dot ping" data-tone="live" />
          </span>
          <span className="text-mint">disponível</span>
          <span className="text-muted-2" aria-hidden>
            ·
          </span>
          <span className="tabular text-foreground/80" suppressHydrationWarning>
            {/* placeholder com a mesma largura: o relógio não move o layout ao hidratar */}
            {time ?? "--:--"} Maceió
          </span>
        </div>

        {/* direita — links */}
        <div className="flex items-center justify-end gap-1">
          <ul className="hidden items-center gap-0.5 md:flex">
            {links.map(({ href, label, n }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex min-h-10 items-center gap-1.5 rounded-md px-3 py-2 font-mono text-[13px] transition-colors hover:bg-white/[0.03] hover:text-fg-bright ${
                      active ? "text-primary-text" : "text-foreground/80"
                    }`}
                  >
                    <span
                      className={`text-[10px] ${active ? "text-primary-text" : "text-foreground/60"}`}
                    >
                      {n}
                    </span>
                    {label}
                    {active && (
                      <span
                        className="absolute inset-x-3 bottom-1 h-px bg-primary-text"
                        aria-hidden
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            ref={toggleRef}
            type="button"
            className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 rounded-md text-foreground/80 transition-colors hover:text-fg-bright md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls={menuId}
          >
            <span
              className={`block h-px w-5 bg-current transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* menu mobile */}
      <div
        id={menuId}
        hidden={!open}
        className="nav-glass border-t border-border/40 md:hidden"
      >
        <ul className="flex flex-col px-site py-3">
          {links.map(({ href, label, n }, i) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-12 items-center gap-3 border-b border-border/40 font-mono text-[15px] last:border-0 ${
                    active ? "text-primary-text" : "text-foreground/85"
                  }`}
                >
                  <span className="text-[11px] text-foreground/60">{n}</span>
                  {label}
                </Link>
              </li>
            );
          })}
          <li className="pt-3">
            <Link
              href="/sobre#requiem"
              className="mono-label flex min-h-11 items-center text-foreground/70"
            >
              Requiem Company
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
