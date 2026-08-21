/**
 * Grão fino sobre a página inteira. SVG inline (não data-URI) para o filtro
 * `url(#grain)` resolver no próprio documento — um data-URI com `url(%23id)`
 * dispara um request a `/%23id` em alguns navegadores.
 */
export function Grain() {
  return (
    <svg className="grain" aria-hidden="true" focusable="false">
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
