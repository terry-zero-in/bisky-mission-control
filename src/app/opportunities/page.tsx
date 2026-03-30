"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { opportunities } from "@/lib/data";
import { ConvictionBadge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import type { Opportunity } from "@/types";

export default function OpportunitiesPage() {
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sorted = [...opportunities].sort((a, b) => {
    const order = { H: 0, M: 1, L: 2 };
    return order[a.conviction] - order[b.conviction];
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:pl-[220px]">
        <div className="mx-auto max-w-5xl px-5 py-8 pt-14 lg:pt-8">
          <h1 className="mb-6 text-[13px] font-medium uppercase tracking-widest text-text-muted">
            Market Intelligence
          </h1>

          <div className="rounded-lg bg-surface">
            {sorted.map((opp, i) => (
              <div
                key={opp.id}
                className={cn(
                  "transition-colors",
                  i !== 0 && "border-t border-border"
                )}
              >
                <button
                  onClick={() =>
                    setExpandedId(expandedId === opp.id ? null : opp.id)
                  }
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-elevated"
                >
                  <ConvictionBadge conviction={opp.conviction} />
                  <span className="flex-1 text-[13px] text-text-primary">
                    {opp.title}
                  </span>
                  <span className="text-[12px] text-text-muted hidden sm:block max-w-xs truncate">
                    {opp.summary}
                  </span>
                </button>

                {expandedId === opp.id && (
                  <div className="border-t border-border bg-surface-elevated/50 px-4 py-4 space-y-3">
                    <p className="text-[13px] leading-relaxed text-text-secondary">
                      {opp.summary}
                    </p>
                    <button
                      onClick={() => setSelected(opp)}
                      className="text-[11px] font-medium text-accent hover:underline"
                    >
                      View full detail
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

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
                <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
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
