"use client";

import { cn } from "@/lib/utils";

function getWeekDays(): { date: Date; label: string; dayNum: number; isToday: boolean }[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

  const days = [];
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    days.push({
      date: d,
      label: dayLabels[i],
      dayNum: d.getDate(),
      isToday: d.toDateString() === today.toDateString(),
    });
  }

  return days;
}

export function CalendarStrip() {
  const days = getWeekDays();

  return (
    <div>
      <h2 className="mb-3 text-[12px] uppercase tracking-[0.06em] text-text-secondary">
        This Week
      </h2>
      <div className="rounded-lg bg-surface p-4">
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <div
              key={day.label}
              className={cn(
                "flex flex-col items-center rounded-md py-2 transition-colors",
                day.isToday
                  ? "bg-text-primary/10"
                  : "hover:bg-surface-elevated"
              )}
            >
              <span className="text-[10px] text-text-muted">{day.label}</span>
              <span
                className={cn(
                  "mt-1 font-mono text-[14px] font-medium",
                  day.isToday ? "text-text-primary" : "text-text-primary"
                )}
              >
                {day.dayNum}
              </span>
              {day.isToday && (
                <span className="mt-1.5 h-1 w-1 rounded-full bg-text-primary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
