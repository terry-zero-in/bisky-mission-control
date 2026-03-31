"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { currentTask, nextTask } from "@/lib/data";

export function StatusBanner() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full border-b border-border bg-sidebar">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-3 text-left"
      >
        <span className="font-mono text-[12px] text-text-primary">
          <span className="text-text-primary">Bisky</span>
          <span className="text-text-muted"> — </span>
          {currentTask.title}
          <span className="text-text-muted"> | Next: </span>
          {nextTask.title}
        </span>
        {expanded ? (
          <ChevronUp size={14} className="text-text-muted" />
        ) : (
          <ChevronDown size={14} className="text-text-muted" />
        )}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-5 py-3 space-y-2">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-text-muted">
                  Current
                </span>
                <p className="text-[14px] text-text-primary mt-1">
                  {currentTask.title}
                  {currentTask.startedAt && (
                    <span className="ml-2 font-mono text-[11px] text-text-muted">
                      Started {currentTask.startedAt}
                    </span>
                  )}
                </p>
                {currentTask.notes && (
                  <p className="text-[12px] text-text-secondary mt-1">
                    {currentTask.notes}
                  </p>
                )}
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-text-muted">
                  Next
                </span>
                <p className="text-[14px] text-text-primary mt-1">
                  {nextTask.title}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
