import type { ReactNode } from "react";

type SectionHeaderProps = {
  /** Índice editorial, ex.: "02". */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  /** Texto curto à direita (desktop) ou abaixo (mobile). */
  aside?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  aside,
  as: Tag = "h2",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}
    >
      <div className="flex flex-col gap-3">
        <p className="mono-label flex items-center gap-3">
          {index && <span className="text-primary-text">{index}</span>}
          <span>{eyebrow}</span>
        </p>
        <Tag className="display section-heading">{title}</Tag>
      </div>
      {aside && (
        <div className="max-w-[40ch] text-[15px] leading-relaxed text-foreground/75 md:text-right">
          {aside}
        </div>
      )}
    </div>
  );
}
