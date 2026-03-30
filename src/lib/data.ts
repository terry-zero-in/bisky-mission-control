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
    title: "Review entire Basis codebase + catalog every input",
    status: "in_progress",
    priority: "high",
    startedAt: "Session #5",
    notes:
      "Read every file, understand full architecture. Catalog every input field (assumptions, parameters, user-entered values). RRA extracts data that FEEDS the engine — must understand downstream consumer.",
  },
  {
    id: "t2",
    title: "Lock design system — 5 themes on Obsidian base",
    status: "queued",
    priority: "high",
    notes:
      "Apply Obsidian formatting spec to Marketing (#000+cyan), Obsidian (accentless), Frost (#5B93E8), Ember (#DC7E4C), Amethyst (#8B5CF6), Light (TBD). Claude Code creates gold standard file. Must be done BEFORE component builds.",
  },
  {
    id: "t3",
    title: "Update CC_RENT_ROLL_ANALYZER.md with new tokens + input catalog",
    status: "blocked",
    priority: "high",
    blockedReason: "Needs codebase review + design system lock",
    notes:
      "New locked design tokens from theme work + input catalog from Basis code review. This becomes the build instruction doc for Claude Code.",
  },
  {
    id: "t4",
    title: "Finalize component specs for Claude Code",
    status: "blocked",
    priority: "high",
    blockedReason: "Needs design system lock",
    notes:
      "13 components remaining (COMPONENT_BUILD_NOTES.md). Reference site screenshots needed. Package as Claude Code instruction set.",
  },
  {
    id: "t5",
    title: "Deploy parallel Claude Code sessions (RRA + components)",
    status: "blocked",
    priority: "high",
    blockedReason: "Needs steps 3 + 4",
    notes:
      "Two parallel sessions: RRA build + component builds. Both reference same design tokens. Both get Motion+ MCP access.",
  },
  {
    id: "t6",
    title: "Competitive monitoring — ongoing deep research",
    status: "in_progress",
    priority: "medium",
    notes:
      "Track redIQ/Radix, Cactus, Primer, QuickData, IntellCRE, CleanRoll. Enodo flagged — needs threat assessment. Mine competitor reviews for pain points.",
  },
  {
    id: "t7",
    title: "Marketing strategy deep dive",
    status: "in_progress",
    priority: "medium",
    notes:
      "Content marketing angles, QuickData's 800+ users as conversion target, Spencer Burton / A.CRE partnership timing.",
  },
  {
    id: "t8",
    title: "Research agent standup (Sonnet, Bisky oversees)",
    status: "queued",
    priority: "medium",
    notes:
      "Handles daily competitor monitoring, review mining (G2/Capterra/Trustpilot), Reddit/Twitter/LinkedIn scanning. Bisky keeps strategic interpretation.",
  },
  {
    id: "t9",
    title: "Mission Control semantic/action colors",
    status: "queued",
    priority: "medium",
    notes: "Terry flagged further tuning needed beyond initial Obsidian application.",
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "o1",
    title: "Radix Rebrand Window",
    conviction: "H",
    summary:
      "redIQ rebranded to Radix (acquired Aug 2024), rebuilt AI processor. Still Excel-native. Basis cloud-native advantage real but window closing.",
    detail: {
      what: "redIQ acquired by Radix Aug 2024, part of larger MF data ecosystem (RealRents, Radix Analytics). New AI column mapping + HITL review + CSV export. Still Excel-native.",
      why: "Most direct competitor in institutional MF. ~300+ clients, ~40% institutional MF transactions, 500K+ rent rolls processed. Their rebrand signals renewed investment.",
      play: "Ship Basis cloud-native split-pane experience before Radix marketing lands. Source-to-cell traceability is the differentiator they don't have.",
      investment: "Primary engineering effort Weeks 1-4. Marketing positioning Week 6.",
      returnEstimate: "First-mover in cloud-native MF analysis. Window closes if Radix goes cloud.",
      convictionReasoning: "HIGH — Direct competitor with renewed momentum. Our differentiation is real but time-boxed.",
    },
  },
  {
    id: "o2",
    title: "QuickData Conversion Target",
    conviction: "H",
    summary:
      "800+ customers paying $99/mo for a Windows Excel add-in. Basis at $149 is 5-10x the product. Validates pricing + provides conversion funnel.",
    detail: {
      what: "QuickData AI has 800+ customers paying $99/mo for Excel add-in doing basic CRE data extraction. Windows-only.",
      why: "Proves market willingness to pay. Their product is significantly less capable. Every QuickData user is a Basis prospect.",
      play: "Target QuickData users directly in marketing. Position Basis as the upgrade path. Use their traction as investor validation.",
      investment: "Targeted marketing spend + comparison content.",
      returnEstimate: "800+ pre-qualified leads. If 10% convert = 80 users × $149 = $11,920 MRR from one competitor's base alone.",
      convictionReasoning: "HIGH — Hard revenue data proving market willingness to pay. Direct conversion opportunity.",
    },
  },
  {
    id: "o3",
    title: "Agent Context Dashboard",
    conviction: "H",
    summary:
      "Internal tool: real token data (OpenClaw API) as ground truth, agent feel-% as comparison, WPP tracking, rotation cliff detection. Productize after validation.",
    detail: {
      what: "Multi-agent context monitoring dashboard. Real token metadata from OpenClaw API = ground truth. Agent self-estimate as comparison layer.",
      why: "No one is solving context window management for multi-agent workflows. Internal need + external product opportunity.",
      play: "Build internal first, validate with our own workflows, then productize as standalone SaaS for AI power users.",
      investment: "$0 upfront (internal build). Productization: ~$2-5K in design + marketing.",
      returnEstimate: "Internal: better agent performance, fewer context crashes. External: $29-49/mo SaaS, AI power user market growing fast.",
      convictionReasoning: "HIGH — Solves a real problem we hit daily. Paused for Basis but queued.",
    },
  },
  {
    id: "o4",
    title: "CRE AI Market Acceleration",
    conviction: "M",
    summary:
      "Multiple new entrants Q1 2026 = market education happening. Proptech VC $16.7B in 2025 (+68% YoY). Timing is right.",
    detail: {
      what: "Multiple CRE AI companies launching Q1 2026: CleanRoll (Jan 28, SOC 2, all property types), Cactus at 15K+ deals/mo, Primer with Excel plugin. Bisnow: proptech VC $16.7B (+68% YoY).",
      why: "Market education happening simultaneously. AI-native proptech VC share growing 42% YoY. Institutional expectation for AI workflows rising.",
      play: "Ride the wave. Position Basis as the institutional-grade option while others educate the broader market.",
      investment: "Positioning and messaging work.",
      returnEstimate: "Reduced customer education burden. Macro tailwind validation for fundraising.",
      convictionReasoning: "MEDIUM — Favorable trend, not directly actionable beyond positioning.",
    },
  },
];

export const competitors: Competitor[] = [
  {
    id: "c1",
    company: "redIQ / Radix",
    threatLevel: "HIGH",
    lastActivity: "Acquired by Radix Aug 2024. New AI processor with column mapping + HITL review.",
    watchStatus: "Active",
    notes:
      "Most direct competitor. ~300+ clients, ~40% institutional MF, 500K+ rent rolls. Still Excel-native — upload/process/download. Source-to-cell traceability gap = Basis differentiation. Moving faster than expected.",
  },
  {
    id: "c2",
    company: "Cactus AI",
    threatLevel: "HIGH",
    lastActivity: "15K+ deals/mo, 1500+ users, added deck gen + model import",
    watchStatus: "Active",
    notes:
      "trycactus.com (NOT cactus.ai). Broad but shallow. Now claims ability to import YOUR underwriting model — competing with Primer. Different segment but could expand upmarket.",
  },
  {
    id: "c3",
    company: "Primer / PropRise",
    threatLevel: "MEDIUM",
    lastActivity: "YC S23 — Excel plugin, doc reconciliation, industry partnerships",
    watchStatus: "Monitoring",
    notes:
      "$1,500-3,000/mo premium segment. Excel plugin for direct model population. Reconciles multiple docs. Different distribution model.",
  },
  {
    id: "c4",
    company: "QuickData AI",
    threatLevel: "MEDIUM",
    lastActivity: "800+ customers, $99/mo Windows Excel add-in",
    watchStatus: "Conversion Target",
    notes:
      "Validates market but product is significantly less capable. Windows-only Excel add-in. Every user is a Basis prospect at $149/mo.",
  },
  {
    id: "c5",
    company: "IntellCRE",
    threatLevel: "LOW",
    lastActivity: "Watching waterfall depth",
    watchStatus: "Watching",
    notes:
      "Monitoring waterfall analysis depth. Not a direct threat currently.",
  },
  {
    id: "c6",
    company: "CleanRoll AI",
    threatLevel: "LOW",
    lastActivity: "Launched Jan 28 2026 — SOC 2, 50K+ rent rolls, all property types",
    watchStatus: "Watching",
    notes:
      "$49-99/mo. Positioning vs redIQ with comparison page. Self-serve, transparent pricing. Not targeting institutional segment.",
  },
  {
    id: "c7",
    company: "Enodo",
    threatLevel: "MEDIUM",
    lastActivity: "Flagged Mar 30 — AI-powered MF underwriting + market analytics",
    watchStatus: "Needs Assessment",
    notes:
      "Flagged in 4 AM market scan. Not yet on watch list. AI-powered MF underwriting + market analytics. Needs full threat assessment.",
  },
];

export const briefings: BriefingEntry[] = [
  {
    id: "b1",
    date: "March 30, 2026",
    focus:
      "Session #5 — Basis codebase review, design system lock, Claude Code deployment prep. 53 days to launch. Zero code written yet — first commit critical.",
    priorities: [
      "Review entire Basis codebase + catalog every input field",
      "Lock design system (5 themes on Obsidian base)",
      "Update RRA spec with new tokens + input catalog",
      "Finalize component specs → deploy parallel Claude Code sessions",
    ],
    marketObservation:
      "SmartCapitalCenter confirms 2026 as AI underwriting inflection point. Perplexity launched 'Computer' — 20-model enterprise AI agent with SOC 2, targeting CRE investors. Enodo flagged as potential new competitor — needs assessment.",
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
    timeRange: "~7:00 PM – 11:34 PM CDT",
    opening:
      "First boot. Terry onboarded Bisky with full briefing + workspace files. Hard rules established: DO NOT MAKE ASSUMPTIONS, two modes (task list → execute vs. new direction → listen), pixel-level standards, proactive always, honesty above everything.",
    syncs: [],
    closeout:
      "Full Mission Control operational. All identity and operating files created. First market scan complete. Basis repo reviewed + font fix committed. Mission Control web app shipped. 💡 Protocol created. OCR recommendation delivered. WEEK1_KICKOFF_BRIEF built overnight.",
    accomplishments: [
      "🦞 Bisky alive — identity, voice, operating system locked",
      "Full Mission Control file structure (13+ files)",
      "San Antonio rental report delivered",
      "Basis repo reviewed, font fix committed + pushed (4a70b8e)",
      "Mission Control web app shipped (40 files, 4 pages)",
      "💡 Protocol created and locked",
      "OCR recommendation delivered (Azure Document Intelligence)",
      "WEEK1_KICKOFF_BRIEF.md built overnight",
      "Design standards locked: Geist Sans, JetBrains Mono, Linear north star",
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
          "~4,800 words | ~10% context. Locked /sync + /closeout protocol. Created TODO, STATUS, INDEX, COMMANDS, RULES, OPPORTUNITIES. Agent Context Dashboard concept developed. OCR decision confirmed (Azure). Model upgraded Sonnet → Opus.",
      },
    ],
    closeout: "~7,200 words | ~15% context | Sharp, no degradation.",
    accomplishments: [
      "📋 Full command framework operational (COMMANDS.md, RULES.md, all slash commands)",
      "🧠 Agent Context Dashboard concept (H conviction, internal → productize)",
      "🔬 OCR provider decided: Azure Document Intelligence",
      "⬆️ Upgraded to Opus 4.6",
      "📁 Created TODO.md, STATUS.md, INDEX.md, COMMANDS.md, RULES.md, OPPORTUNITIES.md",
      "🔄 /sync + /closeout protocol locked",
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
      "Massive ingestion session. Terry sent Strategy Session PDF (14 pages), all 18 project files (zipped), and full HTML export with interactive split-pane mockup.",
    syncs: [
      {
        label: "Sync #1 (12:55 PM)",
        summary:
          "~45,000 words | ~55-60% context. Read full Strategy PDF, researched all competitor links live, extracted all 18 project files, created BASIS_MASTER_BIBLE_v2.md. All doc conflicts resolved — Strategy Session is decision of record.",
      },
    ],
    closeout: "~50,000 words | ~65% context | Sharp, no degradation.",
    accomplishments: [
      "📖 BASIS_MASTER_BIBLE_v2.md — single source of truth, 22 sections, 35K+ bytes",
      "🎯 /basis and /ccrentrollanalyzer commands ready",
      "🔍 Live competitor research — new intel (Cactus 15K+/mo, redIQ→Radix, CleanRoll SOC 2)",
      "🏗️ CC_RENT_ROLL_ANALYZER.md — 15.5KB Claude Code build spec",
      "📁 All 18 project files extracted and integrated",
      "⚖️ All doc conflicts resolved",
      "🤖 Research agent architecture decided (Sonnet, Bisky oversees)",
    ],
  },
  {
    id: "s4",
    number: 4,
    date: "March 30, 2026",
    title: "Integrations & UI Deep Dive",
    status: "completed",
    timeRange: "1:35 PM – 5:53 PM CDT",
    opening:
      "Integrations audit — reviewed all 50 OpenClaw skills and 42+ plugins. Set up Notion, browser, session logging. Massive UI/UX deep dive with theme testing and component consolidation.",
    syncs: [
      {
        label: "Sync #1 (3:36 PM)",
        summary:
          "~85,000+ words | 16% of 1M context. Integrations audit complete. Notion connected. Sessions page deployed. v0 repo analyzed. v6.3 HTML themes extracted. 4 Figma screenshots analyzed. 5-theme recommendation proposed. 13.6KB component spec consolidated.",
      },
    ],
    closeout:
      "~245K / 1M (24%) — 98% of 250K practical ceiling. Sharp throughout. Massive session.",
    accomplishments: [
      "✅ Notion integration live (Maton OAuth)",
      "✅ Browser automation live (Chrome CDP, Playwright)",
      "✅ Session Orchestrator built (SESSION_LOG.md + rules)",
      "✅ Sessions page deployed to Mission Control",
      "✅ COMPONENT_BUILD_NOTES.md — 13.6KB consolidated spec",
      "✅ 6 themes locked: Marketing, Obsidian, Frost, Ember, Amethyst, Light",
      "✅ Obsidian Apex exact spec applied to Mission Control (4 commits)",
      "✅ Logo direction: icon left (arrow-up-right), wordmark right",
      "✅ Motion+ access documented",
      "✅ Context tracking rule: 250K practical ceiling",
    ],
  },
  {
    id: "s5",
    number: 5,
    date: "March 30, 2026",
    title: "Codebase Review + Design System Lock",
    status: "active",
    timeRange: "5:57 PM CDT –",
    opening:
      "New session. Executed 3 carryover items from Session #4 closeout: fleshed out Sessions #1-3 with full raw detail, established briefing hierarchy rule, full TODO.md audit. New rule: always read previous notes on session start.",
    syncs: [],
    closeout: "",
    accomplishments: [
      "Session #4 carryover items executed (3/3)",
      "New rule: read previous session notes on startup, never ask",
      "SESSION_LOG.md Sessions #1-3 fleshed out with raw detail",
      "TODO.md fully audited and updated",
    ],
    inProgress: [
      "Basis codebase review (step 1 of 5)",
      "Design system lock pending",
      "Claude Code deployment prep",
    ],
  },
];

export const currentTask = tasks.find((t) => t.status === "in_progress")!;
export const nextTask = tasks.find((t) => t.status === "queued")!;
