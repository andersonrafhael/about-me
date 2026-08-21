import { statusLabel, statusTone, type ProjectStatus } from "@/data/projects";

export function StatusBadge({
  status,
  className = "",
}: {
  status: ProjectStatus;
  className?: string;
}) {
  const tone = statusTone[status];
  return (
    <span className={`chip ${className}`}>
      <span
        className={`status-dot ${tone === "live" ? "pulse" : ""}`}
        data-tone={tone}
        aria-hidden
      />
      <span
        className={
          tone === "live"
            ? "text-mint"
            : tone === "warm"
              ? "text-warning"
              : "text-primary-light"
        }
      >
        {statusLabel[status]}
      </span>
    </span>
  );
}
