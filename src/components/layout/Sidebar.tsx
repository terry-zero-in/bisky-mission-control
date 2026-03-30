"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ListChecks,
  Calendar,
  Crosshair,
  Activity,
  FileText,
  Terminal,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: ListChecks },
  { href: "/commands", label: "Commands", icon: Terminal },
  { href: "/opportunities", label: "Opportunities", icon: Crosshair },
  { href: "/briefing", label: "Briefing", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-md p-2 text-text-muted transition-colors hover:bg-surface hover:text-text-secondary lg:hidden"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-[220px] flex-col bg-surface py-6 transition-transform duration-200 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile close */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute right-3 top-4 rounded-md p-1 text-text-muted transition-colors hover:text-text-secondary lg:hidden"
        >
          <X size={16} />
        </button>

        {/* Logo */}
        <div className="mb-8 px-5">
          <div className="flex items-center gap-2">
            <span className="text-lg">🦞</span>
            <span className="text-sm font-semibold text-text-primary">
              Bisky
            </span>
          </div>
          <span className="mt-0.5 block text-[11px] text-text-muted pl-7">
            Mission Control
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5 px-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-[13px] transition-colors",
                  isActive
                    ? "border-l-2 border-accent bg-accent/8 text-text-primary"
                    : "border-l-2 border-transparent text-text-secondary hover:bg-surface-elevated hover:text-text-primary"
                )}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Agent status */}
        <div className="px-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green" />
            <span className="text-[11px] text-green">Online</span>
          </div>
        </div>
      </aside>
    </>
  );
}
