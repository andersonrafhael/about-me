const sizes = {
  sm: { box: "w-14 h-14", text: "text-xl" },
  md: { box: "w-20 h-20", text: "text-2xl" },
  lg: { box: "w-24 h-24", text: "text-3xl" },
} as const;

interface Props {
  size?: keyof typeof sizes;
}

export function AvatarInitials({ size = "md" }: Props) {
  const { box, text } = sizes[size];

  return (
    <div
      className={`${box} relative flex items-center justify-center rounded-2xl shrink-0`}
      style={{
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.18) 0%, var(--color-void-deep) 100%)",
        border: "1px solid rgba(139,92,246,0.22)",
        boxShadow:
          "0 0 28px rgba(139,92,246,0.10), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      <span
        className={`font-headline font-bold text-primary select-none ${text}`}
        style={{ letterSpacing: "-0.03em" }}
        aria-label="Anderson Rafhael"
      >
        AR
      </span>
    </div>
  );
}
