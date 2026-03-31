import { Card } from "@/components/ui/Card";
import { briefings } from "@/lib/data";

export function TodayFocus() {
  const today = briefings[0];

  return (
    <div>
      <h2 className="mb-3 text-[12px] uppercase tracking-[0.06em] text-text-secondary">
        Today&apos;s Focus
      </h2>
      <Card>
        <p className="text-[11px] font-mono text-text-muted mb-2">
          {today.date}
        </p>
        <p className="text-[14px] leading-relaxed text-text-secondary">
          {today.focus}
        </p>
      </Card>
    </div>
  );
}
