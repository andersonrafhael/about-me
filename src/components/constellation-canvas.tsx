"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const POINT_COUNT   = 38;
const LINK_DISTANCE = 0.17; // normalizado
const DRIFT         = 0.00018;

// Paleta do projeto (violet primário + mint)
const PALETTE = {
  point:    "rgba(139, 92, 246, 0.55)",
  linkFar:  (a: number) => `rgba(139, 92, 246, ${a})`,
  linkNear: (a: number) => `rgba(143, 214, 168, ${a})`,
};

export function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let pts: Point[] = [];

    function init() {
      pts = Array.from({ length: POINT_COUNT }, () => ({
        x:  Math.random(),
        y:  Math.random(),
        vx: (Math.random() - 0.5) * DRIFT,
        vy: (Math.random() - 0.5) * DRIFT,
      }));
    }

    function resize() {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      canvas!.width  = rect.width  * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      ctx!.clearRect(0, 0, w, h);

      for (const p of pts) {
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
      }

      ctx!.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx   = pts[i]!.x - pts[j]!.x;
          const dy   = pts[i]!.y - pts[j]!.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const proximity = 1 - dist / LINK_DISTANCE;
            const alpha     = proximity * 0.4;
            ctx!.strokeStyle =
              proximity > 0.7
                ? PALETTE.linkNear(alpha)
                : PALETTE.linkFar(alpha * 0.6);
            ctx!.beginPath();
            ctx!.moveTo(pts[i]!.x * w, pts[i]!.y * h);
            ctx!.lineTo(pts[j]!.x * w, pts[j]!.y * h);
            ctx!.stroke();
          }
        }
      }

      ctx!.fillStyle = PALETTE.point;
      for (const p of pts) {
        ctx!.beginPath();
        ctx!.arc(p.x * w, p.y * h, 1.2, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    init();
    resize();
    window.addEventListener("resize", resize);
    if (reducedMotion) {
      tick();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
    />
  );
}
