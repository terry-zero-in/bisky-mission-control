"use client";

import { StatCard } from "@/components/ui/StatCard";
import { tasks, competitors } from "@/lib/data";
import { daysUntilLaunch } from "@/lib/utils";

export function StatsRow() {
  const completedToday = tasks.filter((t) => t.status === "done").length;
  const queued = tasks.filter(
    (t) => t.status === "queued" || t.status === "in_progress"
  ).length;

  return (
    <div>
      <h2 className="mb-3 text-[12px] uppercase tracking-[0.06em] text-text-secondary">
        Quick Stats
      </h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Tasks Complete (today)" value={completedToday} />
        <StatCard label="Tasks In Queue" value={queued} />
        <StatCard label="Days to Launch" value={daysUntilLaunch()} />
        <StatCard label="Competitors Monitored" value={competitors.length} />
      </div>
    </div>
  );
}
