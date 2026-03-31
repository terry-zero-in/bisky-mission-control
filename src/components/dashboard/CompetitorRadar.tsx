"use client";

import { useState } from "react";
import { competitors } from "@/lib/data";
import { ThreatBadge } from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";
import type { Competitor } from "@/types";

export function CompetitorRadar() {
  const [selected, setSelected] = useState<Competitor | null>(null);

  return (
    <div>
      <h2 className="mb-3 text-[12px] uppercase tracking-[0.06em] text-text-secondary">
        Competitor Radar
      </h2>
      <div className="rounded-lg bg-surface overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-[10px] uppercase tracking-wider text-text-muted">
              <th className="px-4 py-2.5 font-medium">Company</th>
              <th className="px-4 py-2.5 font-medium">Threat</th>
              <th className="px-4 py-2.5 font-medium hidden sm:table-cell">
                Last Activity
              </th>
              <th className="px-4 py-2.5 font-medium hidden md:table-cell">
                Watch
              </th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((comp, i) => (
              <tr
                key={comp.id}
                onClick={() => setSelected(comp)}
                className="cursor-pointer transition-colors hover:bg-surface-elevated border-t border-border first:border-t-0"
              >
                <td className="px-4 py-2.5 text-[14px] text-text-primary">
                  {comp.company}
                </td>
                <td className="px-4 py-2.5">
                  <ThreatBadge level={comp.threatLevel} />
                </td>
                <td className="px-4 py-2.5 hidden sm:table-cell font-mono text-[11px] text-text-secondary">
                  {comp.lastActivity}
                </td>
                <td className="px-4 py-2.5 hidden md:table-cell text-[11px] text-text-muted">
                  {comp.watchStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.company}
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ThreatBadge level={selected.threatLevel} />
              <span className="text-[11px] text-text-muted">
                {selected.watchStatus}
              </span>
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-text-muted">
                Last Activity
              </label>
              <p className="mt-1 font-mono text-[12px] text-text-secondary">
                {selected.lastActivity}
              </p>
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-widest text-text-muted">
                Notes
              </label>
              <p className="mt-1 text-[14px] leading-relaxed text-text-secondary">
                {selected.notes}
              </p>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
