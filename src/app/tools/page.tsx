"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Plus, MoreVertical, X } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";

interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  color: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

const defaultCategories: Category[] = [
  { id: "core", name: "Core Stack" },
  { id: "deploy", name: "Deploy & Prototyping" },
  { id: "comms", name: "Communications" },
  { id: "design", name: "Design & Docs" },
  { id: "ai", name: "AI & Research" },
];

const defaultTools: Tool[] = [
  { id: "1", name: "Linear", url: "https://linear.app", description: "Task management. Projects, issues, cycles, priorities.", color: "#5E6AD2", category: "core" },
  { id: "2", name: "GitHub", url: "https://github.com", description: "Source of truth for all code. Three repos.", color: "#F0F0F0", category: "core" },
  { id: "3", name: "Supabase", url: "https://supabase.com", description: "Database (Postgres), auth, real-time subscriptions, edge functions.", color: "#3ECF8E", category: "core" },
  { id: "4", name: "Vercel", url: "https://vercel.com", description: "Hosting and auto-deploy. Pushes to main deploy automatically.", color: "#F0F0F0", category: "deploy" },
  { id: "5", name: "v0", url: "https://v0.dev", description: "AI UI generation. Use for rapid design prototyping and layout.", color: "#F0F0F0", category: "deploy" },
  { id: "6", name: "Slack", url: "https://slack.com", description: "Notifications and bridge layer.", color: "#E01E5A", category: "comms" },
  { id: "7", name: "Gmail", url: "https://gmail.com", description: "Email communications and outreach.", color: "#EA4335", category: "comms" },
  { id: "8", name: "Figma", url: "https://figma.com", description: "Design reference and component specs.", color: "#A259FF", category: "design" },
  { id: "9", name: "Google Drive", url: "https://drive.google.com", description: "Documentation storage.", color: "#34A853", category: "design" },
  { id: "10", name: "Notion", url: "https://notion.so", description: "Notes, planning, personal organization hub.", color: "#F0F0F0", category: "design" },
  { id: "11", name: "Claude", url: "https://claude.ai", description: "The brain. Code (specialist), Chat (keeper/researcher), Cowork.", color: "#D97757", category: "ai" },
  { id: "12", name: "ChatGPT", url: "https://chat.openai.com", description: "Layer 2 verification. Research, analysis, second opinions.", color: "#10A37F", category: "ai" },
  { id: "13", name: "Gemini", url: "https://gemini.google.com", description: "Google AI. Research, analysis, multi-modal reasoning.", color: "#8B5CF6", category: "ai" },
  { id: "14", name: "Grok", url: "https://grok.x.ai", description: "X/Twitter adjacent context and analysis.", color: "#F0F0F0", category: "ai" },
  { id: "15", name: "Perplexity", url: "https://perplexity.ai", description: "AI-powered search. Real-time web research with citations.", color: "#20B8CD", category: "ai" },
  { id: "16", name: "NotebookLM", url: "https://notebooklm.google.com", description: "Living knowledge base. Upload docs, get AI synthesis.", color: "#FBBC04", category: "ai" },
];

const presetColors = ["#5E6AD2", "#3ECF8E", "#E01E5A", "#EA4335", "#A259FF", "#34A853", "#D97757", "#10A37F", "#8B5CF6", "#20B8CD", "#FBBC04", "#F0F0F0"];

function ToolCard({ tool, onEdit, onDelete }: { tool: Tool; onEdit: () => void; onDelete: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <div className="group relative border border-border rounded-lg bg-surface p-4 transition-colors hover:bg-surface-elevated">
      <div className="flex items-start gap-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold"
          style={{ backgroundColor: tool.color + "22", color: tool.color }}
        >
          {tool.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <button
            onClick={() => window.open(tool.url, "_blank")}
            className="flex items-center gap-1.5 text-[14px] font-semibold text-text-primary hover:underline"
          >
            {tool.name}
            <ExternalLink size={12} className="text-text-muted" />
          </button>
          <p className="text-[12px] text-text-secondary line-clamp-2 mt-0.5">{tool.description}</p>
        </div>
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
                <button onClick={() => { setMenuOpen(false); onDelete(); }} className="w-full px-3 py-1.5 text-left text-[12px] text-red hover:bg-red/10 transition-colors">Delete</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

interface ToolFormData {
  name: string;
  url: string;
  description: string;
  category: string;
  color: string;
}

function ToolModal({ open, onClose, onSave, categories, initial }: {
  open: boolean;
  onClose: () => void;
  onSave: (data: ToolFormData) => void;
  categories: Category[];
  initial?: ToolFormData;
}) {
  const [form, setForm] = useState<ToolFormData>(initial ?? { name: "", url: "", description: "", category: categories[0]?.id ?? "", color: "#F0F0F0" });

  useEffect(() => {
    if (open) setForm(initial ?? { name: "", url: "", description: "", category: categories[0]?.id ?? "", color: "#F0F0F0" });
  }, [open, initial, categories]);

  if (!open) return null;

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
          <h2 className="text-[14px] font-semibold text-text-primary">{initial ? "Edit Tool" : "Add Tool"}</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-secondary transition-colors"><X size={16} /></button>
        </div>
        <div className="flex flex-col gap-3">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong" />
          <input placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong" />
          <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary focus:outline-none focus:border-border-strong">
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div>
            <label className="text-[12px] text-text-muted mb-1.5 block">Icon Color</label>
            <div className="flex gap-1.5 flex-wrap">
              {presetColors.map((c) => (
                <button key={c} onClick={() => setForm({ ...form, color: c })} className={cn("h-6 w-6 rounded-full border-2 transition-colors", form.color === c ? "border-text-primary" : "border-transparent")} style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <button onClick={() => { if (form.name && form.url) onSave(form); }} className="mt-2 border border-border rounded-md px-3 py-2 text-[13px] text-text-secondary hover:bg-surface hover:text-text-primary transition-colors disabled:opacity-50">
            {initial ? "Save Changes" : "Add Tool"}
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
          <h2 className="text-[14px] font-semibold text-text-primary">{initial ? "Rename Category" : "Add Category"}</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-secondary transition-colors"><X size={16} /></button>
        </div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" className="w-full bg-bg border border-border rounded-md px-3 py-2 text-[14px] text-text-primary placeholder:text-text-muted focus:outline-none focus:border-border-strong mb-3" />
        <button onClick={() => { if (name.trim()) onSave(name.trim()); }} className="w-full border border-border rounded-md px-3 py-2 text-[13px] text-text-secondary hover:bg-surface hover:text-text-primary transition-colors">
          Save
        </button>
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

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>(defaultTools);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [toolModal, setToolModal] = useState<{ open: boolean; editing?: Tool }>({ open: false });
  const [catModal, setCatModal] = useState<{ open: boolean; editing?: Category }>({ open: false });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; type: "tool" | "category"; id: string; label: string }>({ open: false, type: "tool", id: "", label: "" });
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

  let nextId = useRef(100);
  const genId = () => String(nextId.current++);

  const handleSaveTool = (data: ToolFormData) => {
    if (toolModal.editing) {
      setTools((prev) => prev.map((t) => (t.id === toolModal.editing!.id ? { ...t, ...data } : t)));
    } else {
      setTools((prev) => [...prev, { id: genId(), ...data }]);
    }
    setToolModal({ open: false });
  };

  const handleDeleteTool = (id: string) => {
    setTools((prev) => prev.filter((t) => t.id !== id));
    setDeleteModal({ open: false, type: "tool", id: "", label: "" });
  };

  const handleSaveCategory = (name: string) => {
    if (catModal.editing) {
      setCategories((prev) => prev.map((c) => (c.id === catModal.editing!.id ? { ...c, name } : c)));
    } else {
      const id = name.toLowerCase().replace(/\s+/g, "-") + "-" + genId();
      setCategories((prev) => [...prev, { id, name }]);
    }
    setCatModal({ open: false });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setTools((prev) => prev.filter((t) => t.category !== id));
    setDeleteModal({ open: false, type: "tool", id: "", label: "" });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:pl-[220px]">
        <div className="mx-auto max-w-5xl px-5 py-8 pt-14 lg:pt-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-text-primary text-lg font-semibold">Tools</h1>
              <p className="text-[14px] text-text-secondary">Every tool in your stack. Click to open.</p>
            </div>
            <button
              onClick={() => setToolModal({ open: true })}
              className="flex items-center gap-1.5 border border-border rounded-md px-3 py-1.5 text-[12px] text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <Plus size={12} />
              Add Tool
            </button>
          </div>

          {categories.map((cat) => {
            const catTools = tools.filter((t) => t.category === cat.id);
            if (catTools.length === 0) return null;
            return (
              <div key={cat.id} className="mb-8">
                <div className="flex items-center gap-2 mb-3 group/cat">
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
                          <button onClick={() => { setCatMenuOpen(null); setDeleteModal({ open: true, type: "category", id: cat.id, label: `"${cat.name}" and all its tools` }); }} className="w-full px-3 py-1.5 text-left text-[12px] text-red hover:bg-red/10 transition-colors">Delete</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {catTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onEdit={() => setToolModal({ open: true, editing: tool })}
                      onDelete={() => setDeleteModal({ open: true, type: "tool", id: tool.id, label: `"${tool.name}"` })}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          <button
            onClick={() => setCatModal({ open: true })}
            className="text-[12px] text-text-muted hover:text-text-secondary transition-colors"
          >
            + Add Category
          </button>
        </div>
      </main>

      <ToolModal
        open={toolModal.open}
        onClose={() => setToolModal({ open: false })}
        onSave={handleSaveTool}
        categories={categories}
        initial={toolModal.editing ? { name: toolModal.editing.name, url: toolModal.editing.url, description: toolModal.editing.description, category: toolModal.editing.category, color: toolModal.editing.color } : undefined}
      />
      <CategoryRenameModal
        open={catModal.open}
        onClose={() => setCatModal({ open: false })}
        onSave={handleSaveCategory}
        initial={catModal.editing?.name ?? ""}
      />
      <DeleteConfirmModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, type: "tool", id: "", label: "" })}
        onConfirm={() => deleteModal.type === "tool" ? handleDeleteTool(deleteModal.id) : handleDeleteCategory(deleteModal.id)}
        label={deleteModal.label}
      />
    </div>
  );
}
