"use client";

import { useEffect, useRef } from "react";

/**
 * Barra fixa de progresso de leitura. Mede a posição de rolagem do elemento
 * `[data-article]` e escreve `--progress` (0..1) via custom property —
 * `.reading-progress` (globals.css) aplica `scaleX(var(--progress))`.
 * Atualiza em throttle de requestAnimationFrame, sem estado React (só a custom
 * property muda); sob `prefers-reduced-motion` só remove a transição suave.
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const articleEl = document.querySelector<HTMLElement>("[data-article]");
    const barEl = barRef.current;
    if (!articleEl || !barEl) return;
    // Consts com tipo não-nulo explícito: evita depender de narrowing entre
    // closures (perdido em `function` aninhada), sem non-null assertion.
    const article: HTMLElement = articleEl;
    const bar: HTMLDivElement = barEl;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    bar.style.transition = reduceMotion ? "none" : "transform 120ms linear";

    let frameId = 0;

    function measure() {
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress =
        total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      bar.style.setProperty("--progress", progress.toFixed(4));
      frameId = 0;
    }

    function requestMeasure() {
      if (frameId) return;
      frameId = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", requestMeasure, { passive: true });
    window.addEventListener("resize", requestMeasure);
    return () => {
      window.removeEventListener("scroll", requestMeasure);
      window.removeEventListener("resize", requestMeasure);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    // Indicador decorativo: anunciar 100 atualizações por artigo é ruído para
    // leitor de tela; a posição já é comunicada pela rolagem.
    <div ref={barRef} className="reading-progress" aria-hidden="true" />
  );
}
