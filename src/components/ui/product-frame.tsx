import Image from "next/image";
import type { MediaItem } from "@/data/media";

type ProductFrameProps = {
  item: MediaItem;
  /** Responsive `sizes` do next/image. */
  sizes?: string;
  priority?: boolean;
  /** Mostra a legenda de proveniência abaixo da moldura. */
  caption?: boolean;
  className?: string;
  tilt?: boolean;
};

const kindLabel: Record<MediaItem["kind"], string> = {
  captura: "captura",
  demo: "demonstração",
  estudo: "estudo",
};

export function ProductFrame({
  item,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  caption = true,
  className = "",
  tilt = false,
}: ProductFrameProps) {
  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div className={`frame ${tilt ? "tilt" : ""}`}>
        <Image
          src={item.src}
          alt={item.alt}
          sizes={sizes}
          priority={priority}
          placeholder="blur"
        />
      </div>
      {caption && (
        <figcaption className="mono-sublabel flex flex-wrap items-center gap-x-3 gap-y-1 normal-case tracking-[0.04em] text-foreground/65">
          <span className="uppercase tracking-[0.14em] text-primary-text">
            {kindLabel[item.kind]}
          </span>
          <span>{item.caption}</span>
        </figcaption>
      )}
    </figure>
  );
}
