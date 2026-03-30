"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { tasks as initialTasks } from "@/lib/data";
import { StatusBadge } from "@/components/ui/Badge";
import { Drawer } from "@/components/ui/Drawer";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types";

const filters: { label: string; value: TaskStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "In Progress", value: "in_progress" },
  { label: "Queued", value: "queued" },
  { label: "Done", value: "done" },
  { label: "Blocked", value: "blocked" },
];

const statusOptions: TaskStatus[] = ["in_progress", "queued", "done", "blocked"];

export default function TasksPage() {
  const [taskList, setTaskList] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<TaskStatus | "all">("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filtered =
    filter === "all" ? taskList : taskList.filter((t) => t.status === filter);

  function updateStatus(taskId: string, newStatus: TaskStatus) {
    setTaskList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    if (selectedTask?.id === taskId) {
      setSelectedTask((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:pl-[220px]">
        <div className="mx-auto max-w-5xl px-5 py-8 pt-14 lg:pt-8">
          <h1 className="mb-6 text-[13px] font-medium uppercase tracking-widest text-text-muted">
            Tasks
          </h1>

          {/* Filters */}
          <div className="mb-4 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-medium transition-colors",
                  filter === f.value
                    ? "bg-accent text-white"
                    : "bg-surface text-text-secondary hover:text-text-primary"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Task list */}
          <div className="rounded-lg bg-surface">
            {filtered.length === 0 && (
              <p className="px-4 py-8 text-center text-[13px] text-text-muted">
                No tasks match this filter.
              </p>
            )}
            {filtered.map((task, i) => (
              <button
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-elevated",
                  i !== 0 && "border-t border-border",
                  task.status === "in_progress" &&
                    "border-l-2 border-l-amber bg-amber/5",
                  task.status === "done" && "opacity-50"
                )}
              >
                <StatusBadge status={task.status} />
                <span
                  className={cn(
                    "flex-1 text-[13px]",
                    task.status === "done"
                      ? "text-text-muted line-through"
                      : "text-text-primary"
                  )}
                >
                  {task.title}
                </span>
                <span
                  className={cn(
                    "text-[10px] font-medium",
                    task.priority === "high"
                      ? "text-red"
                      : task.priority === "medium"
                      ? "text-amber"
                      : "text-text-muted"
                  )}
                >
                  {task.priority.toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <Drawer
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        title={selectedTask?.title}
      >
        {selectedTask && (
          <div className="space-y-5">
            <div>
              <label className="text-[11px] uppercase tracking-widest text-text-muted">
                Status
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selectedTask.id, s)}
                    className={cn(
                      "rounded-full px-3 py-1 text-[11px] font-medium transition-colors",
                      selectedTask.status === s
                        ? "bg-accent text-white"
                        : "bg-surface-elevated text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {s === "in_progress"
                      ? "In Progress"
                      : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-widest text-text-muted">
                Priority
              </label>
              <p className="mt-1 text-[13px] capitalize text-text-primary">
                {selectedTask.priority}
              </p>
            </div>

            {selectedTask.notes && (
              <div>
                <label className="text-[11px] uppercase tracking-widest text-text-muted">
                  Notes
                </label>
                <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
                  {selectedTask.notes}
                </p>
              </div>
            )}

            {selectedTask.blockedReason && (
              <div>
                <label className="text-[11px] uppercase tracking-widest text-text-muted">
                  Blocked Reason
                </label>
                <p className="mt-1 text-[13px] text-red">
                  {selectedTask.blockedReason}
                </p>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
}
