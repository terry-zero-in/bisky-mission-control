"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatusBanner } from "@/components/layout/StatusBanner";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { sessions } from "@/lib/data";
import type { SessionEntry } from "@/types";
import { CheckCircle2, Circle, Clock, ChevronRight, Cpu } from "lucide-react";
import type { ContextSnapshot } from "@/types";

function ContextBadge({ ctx, label }: { ctx: ContextSnapshot; label?: string }) {
  // Color based on practical percent (250K ceiling)
  const pp = ctx.practicalPercent ?? 0;
  const color =
    pp >= 90
      ? "text-red bg-red/10"
      : pp >= 60
        ? "text-amber bg-amber/10"
        : "text-green bg-green/10";

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 ${color}`}>
      <Cpu size={10} />
      <span className="font-[family-name:var(--font-jetbrains)] text-[10px] font-medium">
        {label ? `${label}: ` : ""}{ctx.percent}%
        {ctx.practicalPercent !== undefined && (
          <span className="text-text-muted"> · {ctx.practicalPercent}% ceil</span>
        )}
      </span>
    </div>
  );
}

function ContextBar({ ctx }: { ctx: ContextSnapshot }) {
  const pp = ctx.practicalPercent ?? 0;
  const color =
    pp >= 90
      ? "bg-red"
      : pp >= 60
        ? "bg-amber"
        : "bg-green";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-text-muted">Context Window</span>
        <span className="font-[family-name:var(--font-jetbrains)] text-text-secondary">
          {ctx.tokens}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-border">
        <div
          className={`h-full rounded-full ${color} transition-all`}
          style={{ width: `${Math.min(ctx.percent, 100)}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-[10px] text-text-muted">
        <span>{ctx.percent}% of 1M</span>
        {ctx.practicalPercent !== undefined && (
          <span>{ctx.practicalPercent}% of 250K ceiling</span>
        )}
      </div>
    </div>
  );
}

function SessionCard({
  session,
  onClick,
}: {
  session: SessionEntry;
  onClick: () => void;
}) {
  const isActive = session.status === "active";

  return (
    <button
      onClick={onClick}
      className={`group w-full text-left transition-all duration-150 ${
        isActive
          ? "rounded-lg border-l-2 border-green bg-surface ring-1 ring-green/20"
          : "rounded-lg bg-surface hover:ring-1 hover:ring-border"
      }`}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Session number */}
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md font-[family-name:var(--font-jetbrains)] text-xs font-semibold ${
            isActive
              ? "bg-green/15 text-green"
              : "bg-text-muted/10 text-text-secondary"
          }`}
        >
          #{session.number}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-text-primary">
              {session.title}
            </span>
            {isActive ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green/15 px-2 py-0.5 text-[10px] font-medium text-green">
                <Circle size={6} fill="currentColor" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-text-muted/10 px-2 py-0.5 text-[10px] font-medium text-text-muted">
                <CheckCircle2 size={10} />
                Completed
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-[11px] text-text-muted">
            <span>{session.date}</span>
            <span>·</span>
            <span>{session.timeRange}</span>
          </div>
          {/* Context badge on card */}
          {(session.closeoutContext || session.currentContext) && (
            <div className="mt-1.5">
              <ContextBadge
                ctx={(session.currentContext || session.closeoutContext)!}
                label={session.currentContext ? "Live" : "Close"}
              />
            </div>
          )}
          <p className="mt-1 truncate text-[12px] text-text-secondary">
            {session.opening}
          </p>
        </div>

        {/* Arrow */}
        <ChevronRight
          size={16}
          className="flex-shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5"
        />
      </div>
    </button>
  );
}

function SessionDetail({ session }: { session: SessionEntry }) {
  const isActive = session.status === "active";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-md font-[family-name:var(--font-jetbrains)] text-xs font-semibold ${
            isActive
              ? "bg-green/15 text-green"
              : "bg-text-muted/10 text-text-secondary"
          }`}
        >
          #{session.number}
        </div>
        <div>
          <div className="text-[11px] text-text-muted">
            {session.date} · {session.timeRange}
          </div>
        </div>
      </div>

      {/* Opening */}
      <div>
        <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
          Opening
        </div>
        <p className="text-[13px] leading-relaxed text-text-secondary">
          {session.opening}
        </p>
      </div>

      {/* Syncs */}
      {session.syncs.length > 0 && (
        <div>
          <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-text-muted">
            Syncs
          </div>
          <div className="space-y-2">
            {session.syncs.map((sync, i) => (
              <div
                key={i}
                className="rounded-md bg-bg p-3"
              >
                <div className="mb-1 flex items-center gap-2 text-[11px] font-medium text-text-primary">
                  <Clock size={12} className="text-text-muted" />
                  Sync #{sync.number} ({sync.time})
                </div>
                <div className="text-[12px] leading-relaxed text-text-secondary whitespace-pre-wrap">
                  {sync.summary}
                </div>
                {sync.context && (
                  <div className="mt-2">
                    <ContextBar ctx={sync.context} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Context snapshot */}
      {isActive && session.currentContext && (
        <div>
          <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-text-muted">
            Live Context
          </div>
          <div className="rounded-md bg-bg p-3">
            <ContextBar ctx={session.currentContext} />
            <div className="mt-1.5 text-[10px] text-text-muted">
              Updated {session.currentContext.timestamp} · {session.currentContext.compactions} compactions
            </div>
          </div>
        </div>
      )}

      {!isActive && session.closeoutContext && (
        <div>
          <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-text-muted">
            Context at Close
          </div>
          <div className="rounded-md bg-bg p-3">
            <ContextBar ctx={session.closeoutContext} />
          </div>
        </div>
      )}

      {/* Closeout or In Progress */}
      {isActive && session.inProgress && session.inProgress.length > 0 ? (
        <div>
          <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-text-muted">
            In Progress
          </div>
          <ul className="space-y-1.5">
            {session.inProgress.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[12px] text-text-secondary"
              >
                <Circle
                  size={6}
                  fill="currentColor"
                  className="mt-1.5 flex-shrink-0 text-amber"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : session.closeout ? (
        <div>
          <div className="mb-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
            Closeout
          </div>
          <p className="text-[13px] leading-relaxed text-text-secondary">
            {session.closeout}
          </p>
        </div>
      ) : null}

      {/* Accomplishments */}
      {session.accomplishments.length > 0 && (
        <div>
          <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-text-muted">
            Key Accomplishments
          </div>
          <ul className="space-y-1.5">
            {session.accomplishments.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[12px] text-text-secondary"
              >
                <CheckCircle2
                  size={14}
                  className="mt-0.5 flex-shrink-0 text-green"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function SessionsPage() {
  const [selected, setSelected] = useState<SessionEntry | null>(null);

  // Show active first, then reverse chronological
  const sorted = [...sessions].sort((a, b) => {
    if (a.status === "active" && b.status !== "active") return -1;
    if (b.status === "active" && a.status !== "active") return 1;
    return b.number - a.number;
  });

  const activeCount = sessions.filter((s) => s.status === "active").length;
  const totalCount = sessions.length;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:pl-[220px]">
        <StatusBanner />
        <div className="mx-auto max-w-3xl space-y-6 px-5 py-8 pt-14 lg:pt-8">
          {/* Header */}
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-text-primary">
              Session Orchestrator
            </h1>
            <p className="mt-0.5 text-[13px] text-text-muted">
              {activeCount} active · {totalCount} total sessions
            </p>
          </div>

          {/* Session list */}
          <div className="space-y-2">
            {sorted.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onClick={() => setSelected(session)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={
          selected
            ? `Bisky #${selected.number} — ${selected.title}`
            : undefined
        }
        className="max-w-2xl"
      >
        {selected && <SessionDetail session={selected} />}
      </Modal>
    </div>
  );
}
