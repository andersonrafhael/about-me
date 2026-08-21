"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  /** Elemento renderizado (default: div). */
  as?: ElementType;
  className?: string;
  /** Atraso em ms — usado para stagger entre irmãos. */
  delay?: number;
  /** Direção do deslocamento inicial. */
  from?: "up" | "left" | "right" | "none";
  style?: CSSProperties;
  id?: string;
};

/**
 * Reveal por IntersectionObserver + CSS. Substitui framer-motion para entradas
 * de seção: o HTML chega renderizado (sem flash), a animação é só transform/
 * opacity e `prefers-reduced-motion` é respeitado no CSS (`.reveal`).
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  from = "up",
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.shown = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.dataset.shown = "true";
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );
    io.observe(el);
    // marcador de hidratação para ferramentas (screenshots esperam por ele)
    el.dataset.observed = "true";
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      id={id}
      data-reveal={from}
      className={`reveal ${className}`}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
