import type {
  Task,
  Opportunity,
  Competitor,
  BriefingEntry,
  TimelineWeek,
  SessionEntry,
} from "@/types";

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Run first market scan + Mission Control setup",
    status: "in_progress",
    priority: "high",
    startedAt: "9:00 AM",
    notes:
      "Initial market scan across CRE AI competitors. Simultaneously building Mission Control dashboard for operational visibility.",
  },
  {
    id: "t2",
    title: "Find rental home in San Antonio",
    status: "queued",
    priority: "high",
    notes: "URGENT this week. Needs criteria from Terry — budget, bedrooms, neighborhoods.",
  },
  {
    id: "t3",
    title: "Write first DAILY_BRIEFING",
    status: "queued",
    priority: "high",
    notes: "Establish daily briefing format. Key sections: focus, priorities, market observations.",
  },
  {
    id: "t4",
    title: "Set up session-logs skill",
    status: "queued",
    priority: "medium",
    notes: "Skill for persisting session activity and key decisions to Supabase.",
  },
  {
    id: "t5",
    title: "Set up daily market scan workflow",
    status: "queued",
    priority: "medium",
    notes: "Automated daily scan of CRE AI market — new entrants, funding, product launches.",
  },
  {
    id: "t6",
    title: "Set up nightly innovation task",
    status: "queued",
    priority: "medium",
    notes: "Nightly autonomous task for exploring new ideas, prototyping, research.",
  },
  {
    id: "t7",
    title: "Configure heartbeat intervals",
    status: "queued",
    priority: "medium",
    notes: "Set up regular check-in intervals for agent health monitoring.",
  },
  {
    id: "t8",
    title: "Set up xurl skill for X/Twitter scanning",
    status: "queued",
    priority: "low",
    notes: "Skill to pull and summarize relevant X/Twitter posts from CRE AI accounts.",
  },
  {
    id: "t9",
    title: "Set up blogwatcher skill",
    status: "queued",
    priority: "low",
    notes: "Monitor competitor blogs and CRE industry publications for updates.",
  },
  {
    id: "t10",
    title: "Set up summarize skill",
    status: "queued",
    priority: "low",
    notes: "General-purpose summarization skill for documents, articles, transcripts.",
  },
  {
    id: "t11",
    title: "Clean up file structure",
    status: "queued",
    priority: "low",
    notes: "Organize project files, remove unused templates, establish conventions.",
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "o1",
    title: "Radix Rebrand Window",
    conviction: "H",
    summary:
      "redIQ rebranded to Radix, rebuilt AI processor. Still Excel-native. Basis cloud-native advantage real but window closing.",
    detail: {
      what: "redIQ has rebranded to Radix and rebuilt their AI rent roll processor. They remain Excel-native — upload, process, download.",
      why: "Radix is the most direct competitor in institutional multifamily rent roll analysis. Their rebrand signals renewed investment and marketing push.",
      play: "Ship Basis cloud-native split-pane experience before Radix marketing lands. Emphasize real-time collaboration, no file uploads, institutional-grade accuracy.",
      investment: "Primary engineering effort on Basis Week 1-4. Marketing positioning in Week 6.",
      returnEstimate: "First-mover in cloud-native MF analysis. If Radix goes cloud before us, this window closes permanently.",
      convictionReasoning: "HIGH — Direct competitor with renewed momentum. Our differentiation is real but time-boxed. Ship before their marketing campaign lands.",
    },
  },
  {
    id: "o2",
    title: "QuickData Market Validation",
    conviction: "H",
    summary:
      "~$79K MRR for inferior Excel add-in validates $149/mo price point. Use in investor pitches.",
    detail: {
      what: "QuickData AI has 800+ customers paying for an Excel add-in that does basic CRE data extraction. Estimated ~$79K MRR.",
      why: "Validates that CRE professionals will pay $99-149/mo for AI-powered analysis tools. QuickData's product is significantly less capable than what Basis will offer.",
      play: "Use QuickData's traction as market validation in investor conversations. Position Basis as the next-generation replacement.",
      investment: "No direct investment needed — this is intelligence for positioning and fundraising.",
      returnEstimate: "Stronger investor pitch, validated pricing strategy, competitive positioning.",
      convictionReasoning: "HIGH — Hard revenue data proving market willingness to pay. Direct validation of our business model.",
    },
  },
  {
    id: "o3",
    title: "Cactus Inbox Agent Play",
    conviction: "M",
    summary:
      "Q1 2026 adding no-login inbox AI agents. Different lane than Basis institutional depth. Monitor, do not chase.",
    detail: {
      what: "Cactus AI (1200+ users) is adding no-login inbox AI agents in Q1 2026. Users email documents and get AI analysis back.",
      why: "Novel distribution model that could accelerate CRE AI adoption broadly. However, targets different segment than Basis institutional focus.",
      play: "Monitor their agent architecture and user adoption. Do not pivot to compete — their lane (convenience/accessibility) is different from ours (depth/accuracy).",
      investment: "Weekly monitoring only. No engineering pivot.",
      returnEstimate: "Market intelligence. Potential partnership or acquisition target long-term.",
      convictionReasoning: "MEDIUM — Interesting innovation but different market segment. Worth watching, not chasing.",
    },
  },
  {
    id: "o4",
    title: "CRE AI Market Acceleration",
    conviction: "M",
    summary:
      "Multiple new entrants in one quarter = market education happening. First-mover in institutional MF segment is real.",
    detail: {
      what: "Multiple new CRE AI companies launching in Q1 2026 — CleanRoll AI, PropRise/Primer pivot, continued Cactus growth.",
      why: "Multiple entrants = the market is being educated simultaneously. Customers are starting to expect AI in their CRE workflows.",
      play: "Ride the wave of market education. Position Basis as the institutional-grade option while others educate the broader market.",
      investment: "Positioning and messaging work. Ensure Basis brand communicates institutional quality from day one.",
      returnEstimate: "Reduced customer education burden. Market timing alignment.",
      convictionReasoning: "MEDIUM — Macro trend is favorable. Not directly actionable beyond positioning, but validates timing.",
    },
  },
];

export const competitors: Competitor[] = [
  {
    id: "c1",
    company: "redIQ / Radix",
    threatLevel: "HIGH",
    lastActivity: "Mar 2026 — Full rebrand + AI processor rebuild",
    watchStatus: "Active",
    notes:
      "Most direct competitor. Rebranded from redIQ to Radix. Rebuilt AI rent roll processor. Still Excel-native upload/download workflow. Strong institutional relationships. Our cloud-native split-pane is differentiated but window is closing.",
  },
  {
    id: "c2",
    company: "Cactus AI",
    threatLevel: "HIGH",
    lastActivity: "Q1 2026 — Inbox AI agents, 1200+ users",
    watchStatus: "Active",
    notes:
      "1200+ users, growing fast. Adding no-login inbox AI agents in Q1 2026. Different segment (accessibility/convenience vs institutional depth) but could expand upmarket.",
  },
  {
    id: "c3",
    company: "Primer / PropRise",
    threatLevel: "MEDIUM",
    lastActivity: "YC S23 — Email-based CRE analysis",
    watchStatus: "Monitoring",
    notes:
      "YC S23 company. Email-based workflow — send documents, get analysis. $1500-3000/mo pricing targets larger firms. Different distribution model.",
  },
  {
    id: "c4",
    company: "QuickData AI",
    threatLevel: "MEDIUM",
    lastActivity: "800+ customers, Excel add-in",
    watchStatus: "Monitoring",
    notes:
      "800+ customers using Excel add-in for CRE data extraction. Estimated ~$79K MRR. Validates market but product is significantly less capable. Excel-only limitation.",
  },
  {
    id: "c5",
    company: "IntellCRE",
    threatLevel: "LOW",
    lastActivity: "Watching waterfall depth",
    watchStatus: "Watching",
    notes:
      "Monitoring their waterfall analysis depth. Could become more relevant if they expand AI capabilities. Currently not a direct threat.",
  },
  {
    id: "c6",
    company: "CleanRoll AI",
    threatLevel: "LOW",
    lastActivity: "Feb 2026 launch — $49-99/mo",
    watchStatus: "Watching",
    notes:
      "Launched Feb 2026 at $49-99/mo. Early-stage, consumer-friendly pricing. Not targeting institutional segment. Watch for traction signals.",
  },
];

export const briefings: BriefingEntry[] = [
  {
    id: "b1",
    date: "March 29, 2026",
    focus:
      "First operational day. Mission Control live. Market scan complete. Basis Week 1 starts now — 5 days left in the week, zero code written.",
    priorities: [
      "Basis Week 1 build (start NOW)",
      "San Antonio rental search (needs criteria from Terry)",
      "Daily market scan running",
    ],
    marketObservation:
      "Radix (redIQ) just rebuilt their rent roll processor with AI and rebranded. Still Excel-native. Basis cloud-native split-pane is differentiated — but this window will not stay open forever.",
  },
];

export const timeline: TimelineWeek[] = [
  {
    week: 1,
    label: "W1",
    dateRange: "Mar 28 – Apr 3",
    focus: "Analyzer UI Foundation",
    status: "active",
  },
  {
    week: 2,
    label: "W2",
    dateRange: "Apr 4 – Apr 10",
    focus: "Analyzer UI Complete",
    status: "future",
  },
  {
    week: 3,
    label: "W3",
    dateRange: "Apr 11 – Apr 17",
    focus: "AI Pipeline",
    status: "future",
  },
  {
    week: 4,
    label: "W4",
    dateRange: "Apr 18 – Apr 24",
    focus: "Engine Core",
    status: "future",
  },
  {
    week: 5,
    label: "W5",
    dateRange: "Apr 25 – May 1",
    focus: "Platform Assembly",
    status: "future",
  },
  {
    week: 6,
    label: "W6",
    dateRange: "May 2 – May 8",
    focus: "Marketing Site",
    status: "future",
  },
  {
    week: 7,
    label: "W7",
    dateRange: "May 9 – May 15",
    focus: "QA + Polish",
    status: "future",
  },
  {
    week: 8,
    label: "W8",
    dateRange: "May 16 – May 22",
    focus: "Launch",
    status: "future",
  },
];

export const sessions: SessionEntry[] = [
  {
    id: "s1",
    number: 1,
    date: "March 29, 2026",
    title: "Setup Day",
    status: "completed",
    timeRange: "Initial setup session",
    opening:
      "First boot. OpenClaw installed, Telegram connected, identity established. Built the entire Mission Control file system from scratch.",
    syncs: [],
    closeout:
      "Full Mission Control operational. All identity and operating files created. First market scan complete. Web app shipped.",
    accomplishments: [
      "Bisky is alive — identity, voice, operating system all locked",
      "Full Mission Control file structure operational",
      "First market scan complete",
      "Mission Control web app shipped same day",
    ],
  },
  {
    id: "s2",
    number: 2,
    date: "March 30, 2026",
    title: "Framework & Commands",
    status: "completed",
    timeRange: "12:13 AM – 12:13 PM CDT",
    opening:
      "Overnight into morning. Framework and command system buildout, then Agent Context Dashboard deep dive with Terry.",
    syncs: [
      {
        label: "Sync #1 (10:20 AM)",
        summary:
          "~4,800 words | ~10% context. Locked /sync + /closeout protocol. Created TODO, STATUS, INDEX, COMMANDS, RULES, OPPORTUNITIES. Agent Context Dashboard concept developed.",
      },
    ],
    closeout: "~7,200 words | ~15% context | Sharp, no degradation.",
    accomplishments: [
      "Full command framework operational",
      "Agent Context Dashboard concept — internal tool with productization path",
      "OCR provider decided (Azure Document Intelligence)",
      "Upgraded to Opus 4.6",
    ],
  },
  {
    id: "s3",
    number: 3,
    date: "March 30, 2026",
    title: "Basis Ingestion",
    status: "completed",
    timeRange: "12:15 PM – 1:24 PM CDT",
    opening:
      "Massive ingestion session. Terry sent the full Basis Strategy Session PDF (14 pages), all 18 project files (zipped), and the full HTML export with interactive split-pane mockup.",
    syncs: [
      {
        label: "Sync #1 (12:55 PM)",
        summary:
          "~45,000 words | ~55-60% context. Read full Strategy PDF, researched all competitor links live, extracted and read all 18 project files, created BASIS_MASTER_BIBLE_v2.md.",
      },
    ],
    closeout: "~50,000 words | ~65% context | Sharp, no degradation.",
    accomplishments: [
      "BASIS_MASTER_BIBLE_v2.md — single source of truth, 22 sections",
      "/basis and /ccrentrollanalyzer commands ready for instant context load",
      "Live competitor research surfaced intel not in any docs",
      "Claude Code build spec written and ready to send",
    ],
  },
  {
    id: "s4",
    number: 4,
    date: "March 30, 2026",
    title: "Integrations & Session System",
    status: "active",
    timeRange: "1:35 PM CDT –",
    opening:
      "New session. Integrations audit — reviewed all 50 OpenClaw skills and 42+ plugins. Setting up Notion, browser, and session logging system.",
    syncs: [],
    closeout: "",
    accomplishments: [],
    inProgress: [
      "Notion connected (Maton OAuth active)",
      "Browser setup discussed (Brave, Playwright needed)",
      "Session Orchestrator system built",
      "Integrations prioritized: Notion → Google Workspace → Brave Search",
      "Sessions page added to Mission Control",
    ],
  },
];

export const currentTask = tasks.find((t) => t.status === "in_progress")!;
export const nextTask = tasks.find(
  (t) => t.status === "queued"
)!;
