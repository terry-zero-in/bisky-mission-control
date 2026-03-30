"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Drawer({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className={cn(
              "fixed right-0 top-0 z-50 flex h-full w-full max-w-[480px] flex-col bg-surface",
              className
            )}
          >
            <div className="flex items-center justify-between px-6 py-4">
              {title && (
                <h2 className="text-sm font-semibold text-text-primary">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                className="ml-auto rounded-md p-1 text-text-muted transition-colors hover:bg-surface-elevated hover:text-text-secondary"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
