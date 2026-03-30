"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

interface Command {
  name: string;
  description: string;
  detail: string;
}

const tabs = [
  { id: "bisky", label: "Agent (Bisky)" },
  { id: "code", label: "Claude Code" },
  { id: "cowork", label: "Claude Cowork" },
  { id: "chat", label: "Claude Chat" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const commands: Record<TabId, Command[]> = {
  bisky: [
    {
      name: "/sync",
      description: "Summarize context since last sync",
      detail:
        "Reports words exchanged + estimated context % used + one-sentence feel assessment. Logs summary to memory/YYYY-MM-DD.md. On repeat syncs, starts from last sync point, not session start.",
    },
    {
      name: "/closeout",
      description: "Final sync before clearing context",
      detail:
        "Full session summary covering all syncs. Final context % estimate. Updates TODO.md, STATUS.md, INDEX.md. Writes complete memory log. Use this before every /new or /reset.",
    },
    {
      name: "/update",
      description: "Quick status update + file sync",
      detail:
        "Gives a current state summary (tasks, blockers, what is next). Also audits all Mission Control files and ensures everything mirrors reality \u2014 TODO, STATUS, INDEX all in sync.",
    },
    {
      name: "/rule [text]",
      description: "Log a global rule to RULES.md",
      detail:
        "Any rule tagged this way applies universally across all agents, all surfaces, all projects. Appended to RULES.md immediately.",
    },
    {
      name: "/newagentcmmd [command] [description]",
      description: "Add a new Agent command to COMMANDS.md",
      detail:
        "Registers a new command for the Agent tab. Updates COMMANDS.md. Use this to extend the command list without manual file edits.",
    },
  ],
  code: [
    {
      name: "/new",
      description: "Start a fresh context window",
      detail:
        "Clears the current session and starts clean. Use when context is getting full or you are starting an unrelated task.",
    },
    {
      name: "/reset",
      description: "Alias for /new",
      detail: "Same as /new. Clears session context.",
    },
    {
      name: "/review",
      description: "Review recent changes",
      detail:
        "Summarizes what was built or changed in the current session. Useful for handoff notes before closing.",
    },
    {
      name: "/newcccmmd [command] [description]",
      description: "Add a new Claude Code command",
      detail:
        "Registers a new command for the Claude Code tab in COMMANDS.md.",
    },
  ],
  cowork: [
    {
      name: "/new",
      description: "Start a fresh context window",
      detail: "Clears the current session and starts clean.",
    },
    {
      name: "/reset",
      description: "Alias for /new",
      detail: "Same as /new.",
    },
    {
      name: "/newcwcmmd [command] [description]",
      description: "Add a new Cowork command",
      detail:
        "Registers a new command for the Claude Cowork tab in COMMANDS.md.",
    },
  ],
  chat: [
    {
      name: "/new",
      description: "Start a fresh context window",
      detail: "Clears the current session and starts clean.",
    },
    {
      name: "/reset",
      description: "Alias for /new",
      detail: "Same as /new.",
    },
    {
      name: "/newchatcmmd [command] [description]",
      description: "Add a new Chat command",
      detail:
        "Registers a new command for the Claude Chat tab in COMMANDS.md.",
    },
  ],
};

function CommandRow({ command }: { command: Command }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "border-b border-border last:border-b-0 transition-colors",
        open && "bg-surface-elevated/50"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-elevated"
      >
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15, ease: [0.32, 0.72, 0, 1] }}
          className="text-text-muted"
        >
          <ChevronRight size={14} />
        </motion.div>
        <span className="font-mono text-[13px] text-accent">{command.name}</span>
        <span className="flex-1 text-[13px] text-text-secondary">
          {command.description}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-3 pl-11 text-[12px] leading-relaxed text-text-muted">
              {command.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CommandsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("bisky");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:pl-[220px]">
        <div className="mx-auto max-w-5xl px-5 py-8 pt-14 lg:pt-8">
          <h1 className="mb-6 text-[13px] font-medium uppercase tracking-widest text-text-muted">
            Commands
          </h1>

          {/* Tabs */}
          <div className="mb-4 flex gap-1 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative px-3 py-2 text-[13px] transition-colors",
                  activeTab === tab.id
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-secondary"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                    transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Command list */}
          <div className="rounded-lg bg-surface">
            {commands[activeTab].map((cmd) => (
              <CommandRow key={`${activeTab}-${cmd.name}`} command={cmd} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
