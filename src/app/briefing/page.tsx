import { Sidebar } from "@/components/layout/Sidebar";
import { briefings } from "@/lib/data";

export default function BriefingPage() {
  const latest = briefings[0];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:pl-[220px]">
        <div className="mx-auto max-w-3xl px-5 py-8 pt-14 lg:pt-8">
          <h1 className="mb-6 text-[13px] font-medium uppercase tracking-widest text-text-muted">
            Daily Briefing
          </h1>

          {/* Latest briefing */}
          <article className="space-y-6">
            <div>
              <span className="font-mono text-[12px] text-text-muted">
                {latest.date}
              </span>
              <h2 className="mt-2 text-lg font-semibold text-text-primary leading-snug">
                Daily Briefing
              </h2>
            </div>

            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-widest text-text-muted mb-2">
                Focus
              </h3>
              <p className="text-[15px] leading-relaxed text-text-secondary">
                {latest.focus}
              </p>
            </div>

            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-widest text-text-muted mb-2">
                Key Priorities
              </h3>
              <ul className="space-y-2">
                {latest.priorities.map((p, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[14px] text-text-secondary"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] font-medium uppercase tracking-widest text-text-muted mb-2">
                Market Observation
              </h3>
              <p className="text-[15px] leading-relaxed text-text-secondary">
                {latest.marketObservation}
              </p>
            </div>
          </article>

          {/* Previous briefings */}
          {briefings.length > 1 && (
            <div className="mt-12">
              <h2 className="mb-4 text-[13px] font-medium uppercase tracking-widest text-text-muted">
                Previous Briefings
              </h2>
              <div className="space-y-2">
                {briefings.slice(1).map((b) => (
                  <div
                    key={b.id}
                    className="rounded-lg bg-surface px-4 py-3 transition-colors hover:bg-surface-elevated"
                  >
                    <span className="font-mono text-[12px] text-text-muted">
                      {b.date}
                    </span>
                    <p className="mt-1 text-[13px] text-text-secondary line-clamp-2">
                      {b.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
