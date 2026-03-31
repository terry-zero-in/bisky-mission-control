import { Card } from "@/components/ui/Card";
import { currentTask } from "@/lib/data";

export function ActiveTask() {
  return (
    <div>
      <h2 className="mb-3 text-[12px] uppercase tracking-[0.06em] text-text-secondary">
        Active Task
      </h2>
      <Card>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber animate-pulse-dot" />
          <span className="text-sm font-semibold text-text-primary">
            {currentTask.title}
          </span>
        </div>
        {currentTask.startedAt && (
          <p className="mt-1.5 font-mono text-[11px] text-text-muted pl-4">
            Started {currentTask.startedAt}
          </p>
        )}
        {currentTask.notes && (
          <p className="mt-2 text-[12px] text-text-secondary pl-4">
            {currentTask.notes}
          </p>
        )}
      </Card>
    </div>
  );
}
