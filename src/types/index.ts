export type TaskStatus = "in_progress" | "queued" | "done" | "blocked";
export type Priority = "high" | "medium" | "low";
export type Conviction = "H" | "M" | "L";
export type ThreatLevel = "HIGH" | "MEDIUM" | "LOW";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  notes?: string;
  blockedReason?: string;
  startedAt?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  conviction: Conviction;
  summary: string;
  detail: {
    what: string;
    why: string;
    play: string;
    investment: string;
    returnEstimate: string;
    convictionReasoning: string;
  };
}

export interface Competitor {
  id: string;
  company: string;
  threatLevel: ThreatLevel;
  lastActivity: string;
  watchStatus: string;
  notes: string;
}

export interface BriefingEntry {
  id: string;
  date: string;
  focus: string;
  priorities: string[];
  marketObservation: string;
}

export interface ContextSnapshot {
  tokens: string;       // e.g. "61k/1.0m"
  percent: number;      // e.g. 6
  practicalPercent?: number; // % of 250K practical ceiling
  compactions: number;
  timestamp: string;    // ISO or human-readable
}

export interface SessionEntry {
  id: string;
  number: number;
  date: string;
  title: string;
  status: "active" | "completed";
  timeRange: string;
  opening: string;
  syncs: { label: string; summary: string; context?: ContextSnapshot }[];
  closeout: string;
  closeoutContext?: ContextSnapshot;
  currentContext?: ContextSnapshot; // live, for active session only
  accomplishments: string[];
  inProgress?: string[];
}

export interface TimelineWeek {
  week: number;
  label: string;
  dateRange: string;
  focus: string;
  status: "completed" | "active" | "future";
}


