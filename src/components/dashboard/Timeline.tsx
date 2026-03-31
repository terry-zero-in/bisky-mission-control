"use client";

import { useState } from "react";
import { timeline } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { TimelineWeek } from "@/types";

export function Timeline() {
  const [hoveredWeek, setHoveredWeek] = useState<TimelineWeek | null>(null);

  return (
    <div>
      <h2 className="mb-3 text-[12px] uppercase tracking-[0.06em] text-text-secondary">
        Basis Build Timeline
      </h2>
      <div className="rounded-lg bg-surface p-4">
        <div className="relative flex items-center justify-between">
          {/* Progress line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-border -translate-y-1/2" />

          {timeline.map((week) => (
            <div
              key={week.week}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredWeek(week)}
              onMouseLeave={() => setHoveredWeek(null)}
            >
              <div
                className={cn(
                  "relative z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[10px] font-medium transition-all",
                  week.status === "completed" &&
                    "bg-green text-bg",
                  week.status === "active" &&
                    "bg-text-primary text-bg ring-2 ring-text-primary/20 ring-offset-2 ring-offset-bg",
                  week.status === "future" &&
                    "bg-surface-elevated text-text-muted hover:bg-border hover:text-text-secondary"
                )}
              >
                {week.label}
              </div>
              <span className="mt-2 text-[10px] text-text-muted hidden sm:block">
                {week.focus}
              </span>

              <AnimatePresence>
                {hoveredWeek?.week === week.week && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-md bg-surface-elevated px-3 py-2 shadow-lg"
                  >
                    <p className="text-[11px] font-semibold text-text-primary">
                      {week.focus}
                    </p>
                    <p className="text-[10px] text-text-muted">{week.dateRange}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
