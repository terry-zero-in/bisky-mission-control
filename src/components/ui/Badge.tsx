import { cn } from "@/lib/utils";
import type { TaskStatus, ThreatLevel, Conviction } from "@/types";

const statusStyles: Record<TaskStatus, string> = {
  in_progress: "bg-amber/15 text-amber",
  queued: "bg-text-muted/15 text-text-secondary",
  done: "bg-green/15 text-green",
  blocked: "bg-red/15 text-red",
};

const statusLabels: Record<TaskStatus, string> = {
  in_progress: "In Progress",
  queued: "Queued",
  done: "Done",
  blocked: "Blocked",
};

const threatStyles: Record<ThreatLevel, string> = {
  HIGH: "bg-red/15 text-red",
  MEDIUM: "bg-amber/15 text-amber",
  LOW: "bg-text-muted/15 text-text-secondary",
};

const convictionStyles: Record<Conviction, string> = {
  H: "bg-green/15 text-green",
  M: "bg-amber/15 text-amber",
  L: "bg-text-muted/15 text-text-secondary",
};

export function StatusBadge({
  status,
  className,
}: {
  status: TaskStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        statusStyles[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

export function ThreatBadge({
  level,
  className,
}: {
  level: ThreatLevel;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        threatStyles[level],
        className
      )}
    >
      {level}
    </span>
  );
}

export function ConvictionBadge({
  conviction,
  className,
}: {
  conviction: Conviction;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
        convictionStyles[conviction],
        className
      )}
    >
      {conviction}
    </span>
  );
}
