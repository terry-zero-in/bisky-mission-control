"use client";

import { useState } from "react";
import { opportunities } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { ConvictionBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import type { Opportunity } from "@/types";

export function Opportunities() {
  const [selected, setSelected] = useState<Opportunity | null>(null);

  return (
    <div>
      <h2 className="mb-3 text-[12px] uppercase tracking-[0.06em] text-text-secondary">
        Opportunities
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {opportunities.slice(0, 3).map((opp) => (
          <Card
            key={opp.id}
            className="cursor-pointer transition-colors hover:bg-surface-elevated"
            onClick={() => setSelected(opp)}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-text-primary">
                {opp.title}
              </h3>
              <ConvictionBadge conviction={opp.conviction} />
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-text-secondary line-clamp-2">
              {opp.summary}
            </p>
          </Card>
        ))}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ConvictionBadge conviction={selected.conviction} />
              <span className="text-[11px] text-text-muted">Conviction</span>
            </div>
            {(
              [
                ["What", selected.detail.what],
                ["Why", selected.detail.why],
                ["Play", selected.detail.play],
                ["Investment", selected.detail.investment],
                ["Expected Return", selected.detail.returnEstimate],
                ["Conviction Reasoning", selected.detail.convictionReasoning],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <label className="text-[11px] uppercase tracking-widest text-text-muted">
                  {label}
                </label>
                <p className="mt-1 text-[14px] leading-relaxed text-text-secondary">
                  {value}
                </p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
}
