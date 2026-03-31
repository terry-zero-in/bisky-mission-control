"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, MoreVertical, Plus, X, Check } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

interface Skill {
  id: string;
  command: string;
  title: string;
  description: string;
  usage: string;
  category: string;
  agent: string;
}

interface Category {
  id: string;
  name: string;
  agent: string;
}

const agents = [
  { id: "code", label: "Code" },
  { id: "cowork", label: "Cowork" },
  { id: "chat", label: "Chat" },
  { id: "gpt", label: "GPT" },
  { id: "gemini", label: "Gemini" },
  { id: "grok", label: "Grok" },
];

const defaultCategories: Category[] = [
  { id: "code-session", name: "Session Orchestration", agent: "code" },
  { id: "code-workflow", name: "Workflow", agent: "code" },
  { id: "cowork-research", name: "Research", agent: "cowork" },
  { id: "cowork-ops", name: "Operations", agent: "cowork" },
];

const defaultSkills: Skill[] = [
  { id: "1", command: "/sync", title: "Sync Sessions", description: "Read all active sessions, print status, update your own.", usage: "Type /sync in any Claude Code terminal", category: "code-session", agent: "code" },
  { id: "2", command: "/status", title: "Quick Status", description: "One-line summary of all active sessions. Shows status, current task, and blockers at a glance.", usage: "Type /status in any Claude Code terminal", category: "code-session", agent: "code" },
  { id: "3", command: "/delegate", title: "Delegate Task", description: "Generate a structured prompt for a new session. Follows CLAUDE_INSTRUCTIONS.md format.", usage: "Type /delegate, then describe what the new session should do", category: "code-session", agent: "code" },
  { id: "4", command: "/commit", title: "Commit", description: "Stage changes, create a descriptive commit message, and push to GitHub.", usage: "Type /commit in any Claude Code terminal", category: "code-workflow", agent: "code" },
  { id: "5", command: "/build", title: "Build Check", description: "Run build, report errors, fix if possible.", usage: "Type /build in any Claude Code terminal", category: "code-workflow", agent: "code" },
  { id: "6", command: "/test", title: "Run Tests", description: "Execute test suite and report results.", usage: "Type /test in any Claude Code terminal", category: "code-workflow", agent: "code" },
  { id: "7", command: "/scan", title: "Market Scan", description: "Run daily market intelligence scan across competitors, Reddit, Product Hunt, and X.", usage: "Type /scan to start", category: "cowork-research", agent: "cowork" },
  { id: "8", command: "/compete", title: "Competitor Check", description: "Deep dive on a specific competitor. Pricing, features, reviews, recent changes.", usage: "Type /compete [company name]", category: "cowork-research", agent: "cowork" },
  { id: "9", command: "/sync", title: "Sync", description: "Summarize session, log to memory, update Mission Control.", usage: "Type /sync periodically", category: "cowork-ops", agent: "cowork" },
  { id: "10", command: "/closeout", title: "Closeout", description: "Final session sync, full memory write, update all status files.", usage: "Type /closeout at end of session", category: "cowork-ops", agent: "cowork" },
];

function SkillCard({ skill, onEdit, onDelete, onDuplicate }: {
  skill: Skill;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(skill.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group relative border border-border rounded-lg bg-surface p-4 transition-colors hover:bg-surface-elevated">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center">
            <span className="font-mono text-[13px] text-text-primary font-medium">{skill.command}</span>
            <span className="text-[14px] font-semibold text-text-primary ml-2">{skill.title}</span>
          </div>
          <p className="text-[13px] text-text-secondary mt-1">{skill.description}</p>
          <p className="text-[11px] text-text-muted mt-1">{skill.usage}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-3">
          <button onClick={handleCopy} className="rounded-md p-1 text-text-muted hover:text-text-secondary transition-colors">
            {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
          </button>
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-md p-1 text-text-muted opacity-0 transition-all hover:text-text-secondary group-hover:opacity-100"
            >
              <MoreVertical size={14} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="absolute right-0 top-7 z-30 w-28 border border-border rounded-md bg-surface-elevated py-1"
                >
                  <button onClick={() => { setMenuOpen(false); onEdit(); }} className="w-full px-3 py-1.5 text-left text-[12px] text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">Edit</button>
                  <button onClick={() => { setMenuOpen(false); onDuplicate(); }} className="w-full px-3 py-1.5 text-left text-[12px] text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">Duplicate</button>
                  <button onClick={() => { setMenuOpen(false); onDelete(); }} className="w-full px-3 py-1.5 text-left text-[12px] text-red hover:bg-red/10 transition-colors">Delete</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SkillFormData {
  command: string;
  title: string;
  description: string;
  usage: string;
  category: string;
  agent: string;
}

function SkillModal({ open, onClose, onSave, categories, activeAgent, initial }: {
  open: boolean;
  onClose: () => void;
  onSave: (data: SkillFormData) => void;
  categories: Category[];
  activeAgent: string;
  initial?: SkillFormData;
}) {
  const [form, setForm] = useState<SkillFormData>(initial ?? { command: "/", title: "", description: "", usage: "", category: "", agent: activeAgent });
  const [newCat, setNewCat] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  const agentCats = categories.filter((c) => c.agent === (initial?.agent ?? activeAgent));

  useEffect(() => {
    if (open) {
      setForm(initial ?? { command: "/", title: "", description: "", usage: "", category: agentCats[0]?.id ?? "", agent: activeAgent });
      setNewCat(false);
      setNewCatName("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const handleCommandChange = (val: string) => {
    setForm({ ...form, command: val.startsWith("/") ? val : "/" + val });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="border border-border rounded-lg bg-surface-elevated p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[14px] font-semibold text-text-primary">{initial ? "Edit Skill" : "Add Skill"}</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-secondary transition-colors"><X size={16} /></button>
        </div>
        <div className="flex flex-col gap-3">
          <input placeholder="/command" value={form.command} onChange={(e) => handleCommandChange(e.target.value)} className="font-mono bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong" />
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong" />
          <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong" />
          <input placeholder="Usage hint" value={form.usage} onChange={(e) => setForm({ ...form, usage: e.target.value })} className="bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong" />
          <select value={form.agent} onChange={(e) => setForm({ ...form, agent: e.target.value, category: "" })} className="bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary focus:outline-none focus:border-border-strong">
            {agents.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
          </select>
          {!newCat ? (
            <div className="flex gap-2">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="flex-1 bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary focus:outline-none focus:border-border-strong">
                <option value="">Select category...</option>
                {categories.filter((c) => c.agent === form.agent).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <button onClick={() => setNewCat(true)} className="text-[12px] text-text-muted hover:text-text-secondary transition-colors whitespace-nowrap">+ New</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input placeholder="New category name" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} className="flex-1 bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong" />
              <button onClick={() => setNewCat(false)} className="text-[12px] text-text-muted hover:text-text-secondary transition-colors">Cancel</button>
            </div>
          )}
          <button
            onClick={() => {
              if (form.command.length > 1 && form.title) onSave({ ...form, category: newCat && newCatName ? "__new__:" + newCatName : form.category });
            }}
            className="mt-2 border border-border rounded-md px-3 py-2 text-[13px] text-text-secondary hover:bg-surface hover:text-text-primary transition-colors"
          >
            {initial ? "Save Changes" : "Add Skill"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function CategoryRenameModal({ open, onClose, onSave, initial }: {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initial: string;
}) {
  const [name, setName] = useState(initial);
  useEffect(() => { if (open) setName(initial); }, [open, initial]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="border border-border rounded-lg bg-surface-elevated p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[14px] font-semibold text-text-primary">Rename Category</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-secondary transition-colors"><X size={16} /></button>
        </div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" className="w-full bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong mb-3" />
        <button onClick={() => { if (name.trim()) onSave(name.trim()); }} className="w-full border border-border rounded-md px-3 py-2 text-[13px] text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">Save</button>
      </motion.div>
    </div>
  );
}

function DeleteConfirmModal({ open, onClose, onConfirm, label }: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  label: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="border border-border rounded-lg bg-surface-elevated p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[14px] text-text-primary mb-4">Delete {label}? This can&apos;t be undone.</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="border border-border rounded-md px-3 py-1.5 text-[12px] text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">Cancel</button>
          <button onClick={onConfirm} className="border border-border rounded-md px-3 py-1.5 text-[12px] text-red hover:bg-red/10 transition-colors">Delete</button>
        </div>
      </motion.div>
    </div>
  );
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [activeAgent, setActiveAgent] = useState("code");
  const [skillModal, setSkillModal] = useState<{ open: boolean; editing?: Skill }>({ open: false });
  const [catModal, setCatModal] = useState<{ open: boolean; editing?: Category }>({ open: false });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; type: "skill" | "category"; id: string; label: string }>({ open: false, type: "skill", id: "", label: "" });
  const [catMenuOpen, setCatMenuOpen] = useState<string | null>(null);
  const catMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!catMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (catMenuRef.current && !catMenuRef.current.contains(e.target as Node)) setCatMenuOpen(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [catMenuOpen]);

  const nextId = useRef(100);
  const genId = () => String(nextId.current++);

  const agentSkills = skills.filter((s) => s.agent === activeAgent);
  const agentCategories = categories.filter((c) => c.agent === activeAgent);

  const handleSaveSkill = (data: SkillFormData) => {
    let categoryId = data.category;

    // Handle new category creation
    if (categoryId.startsWith("__new__:")) {
      const catName = categoryId.replace("__new__:", "");
      const newCatId = catName.toLowerCase().replace(/\s+/g, "-") + "-" + genId();
      setCategories((prev) => [...prev, { id: newCatId, name: catName, agent: data.agent }]);
      categoryId = newCatId;
    }

    if (skillModal.editing) {
      setSkills((prev) => prev.map((s) => (s.id === skillModal.editing!.id ? { ...s, ...data, category: categoryId } : s)));
    } else {
      setSkills((prev) => [...prev, { id: genId(), ...data, category: categoryId }]);
    }
    setSkillModal({ open: false });
  };

  const handleDuplicateSkill = (skill: Skill) => {
    setSkills((prev) => [...prev, { ...skill, id: genId(), command: skill.command + "-copy" }]);
  };

  const handleDeleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
    setDeleteModal({ open: false, type: "skill", id: "", label: "" });
  };

  const handleSaveCategory = (name: string) => {
    if (catModal.editing) {
      setCategories((prev) => prev.map((c) => (c.id === catModal.editing!.id ? { ...c, name } : c)));
    } else {
      const id = name.toLowerCase().replace(/\s+/g, "-") + "-" + genId();
      setCategories((prev) => [...prev, { id, name, agent: activeAgent }]);
    }
    setCatModal({ open: false });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setSkills((prev) => prev.filter((s) => s.category !== id));
    setDeleteModal({ open: false, type: "skill", id: "", label: "" });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:pl-[220px]">
        <div className="mx-auto max-w-5xl px-5 py-8 pt-14 lg:pt-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-text-primary text-lg font-semibold">Skills & Shortcuts</h1>
              <p className="text-[14px] text-text-secondary">Custom commands and shortcuts. Organized by agent.</p>
            </div>
            <button
              onClick={() => setSkillModal({ open: true })}
              className="flex items-center gap-1.5 border border-border rounded-md px-3 py-1.5 text-[12px] text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <Plus size={12} />
              Add Skill
            </button>
          </div>

          {/* Agent toggle */}
          <div className="border border-border rounded-lg p-1 inline-flex gap-1 mb-6">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent.id)}
                className={cn(
                  "px-3 py-1.5 text-[13px] rounded-md transition-colors",
                  activeAgent === agent.id
                    ? "bg-surface-elevated text-text-primary"
                    : "text-text-muted hover:text-text-secondary"
                )}
              >
                {agent.label}
              </button>
            ))}
          </div>

          {agentSkills.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-[14px] text-text-muted">No skills configured for {agents.find((a) => a.id === activeAgent)?.label}. Add one to get started.</p>
            </div>
          ) : (
            <>
              {agentCategories.map((cat) => {
                const catSkills = agentSkills.filter((s) => s.category === cat.id);
                if (catSkills.length === 0) return null;
                return (
                  <div key={cat.id}>
                    <div className="flex items-center gap-2 mb-2 mt-6 group/cat">
                      <h2 className="text-[12px] uppercase tracking-[0.06em] text-text-secondary">{cat.name}</h2>
                      <div className="relative" ref={catMenuOpen === cat.id ? catMenuRef : undefined}>
                        <button
                          onClick={() => setCatMenuOpen(catMenuOpen === cat.id ? null : cat.id)}
                          className="rounded-md p-0.5 text-text-muted opacity-0 transition-all hover:text-text-secondary group-hover/cat:opacity-100"
                        >
                          <MoreVertical size={12} />
                        </button>
                        <AnimatePresence>
                          {catMenuOpen === cat.id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.1 }}
                              className="absolute left-0 top-5 z-30 w-32 border border-border rounded-md bg-surface-elevated py-1"
                            >
                              <button onClick={() => { setCatMenuOpen(null); setCatModal({ open: true, editing: cat }); }} className="w-full px-3 py-1.5 text-left text-[12px] text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">Rename</button>
                              <button onClick={() => { setCatMenuOpen(null); setDeleteModal({ open: true, type: "category", id: cat.id, label: `"${cat.name}" and all its skills` }); }} className="w-full px-3 py-1.5 text-left text-[12px] text-red hover:bg-red/10 transition-colors">Delete</button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {catSkills.map((skill) => (
                        <SkillCard
                          key={skill.id}
                          skill={skill}
                          onEdit={() => setSkillModal({ open: true, editing: skill })}
                          onDelete={() => setDeleteModal({ open: true, type: "skill", id: skill.id, label: `"${skill.command}"` })}
                          onDuplicate={() => handleDuplicateSkill(skill)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}

              <button
                onClick={() => setCatModal({ open: true })}
                className="mt-6 text-[12px] text-text-muted hover:text-text-secondary transition-colors"
              >
                + Add Category
              </button>
            </>
          )}
        </div>
      </main>

      <SkillModal
        open={skillModal.open}
        onClose={() => setSkillModal({ open: false })}
        onSave={handleSaveSkill}
        categories={categories}
        activeAgent={activeAgent}
        initial={skillModal.editing ? { command: skillModal.editing.command, title: skillModal.editing.title, description: skillModal.editing.description, usage: skillModal.editing.usage, category: skillModal.editing.category, agent: skillModal.editing.agent } : undefined}
      />
      <CategoryRenameModal
        open={catModal.open}
        onClose={() => setCatModal({ open: false })}
        onSave={handleSaveCategory}
        initial={catModal.editing?.name ?? ""}
      />
      <DeleteConfirmModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, type: "skill", id: "", label: "" })}
        onConfirm={() => deleteModal.type === "skill" ? handleDeleteSkill(deleteModal.id) : handleDeleteCategory(deleteModal.id)}
        label={deleteModal.label}
      />
    </div>
  );
}
