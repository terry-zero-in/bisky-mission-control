import { cn } from "@/lib/utils";
import { Card } from "./Card";

export function StatCard({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col gap-1", className)}>
      <span className="font-mono text-[28px] font-bold tracking-tight text-text-primary">
        {value}
      </span>
      <span className="text-[11px] text-text-muted">{label}</span>
    </Card>
  );
}
