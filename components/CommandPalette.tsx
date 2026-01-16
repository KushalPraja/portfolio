"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { ComponentType } from "react";
import { useTheme } from "@/lib/theme-context";
import { useEffect, useState } from "react";

// global Inter provided in layout
type IconType = ComponentType<{ size?: number; className?: string }>;

interface MenuItem {
  label: string;
  key: string;
  description: string;
  action?: () => void;
  href?: string;
  icon?: IconType;
  isAskCommand?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onAsk?: (question: string) => void;
}

export default function CommandPalette({ isOpen, onClose, menuItems, onAsk }: Props) {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isOpen) setSearchQuery("");
  }, [isOpen]);

  const filteredItems = menuItems.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 ${isDark ? "bg-black/40" : "bg-black/20"} backdrop-blur-sm z-[100] flex items-start justify-center pt-32`}
          onClick={() => {
            onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            onClick={(e) => e.stopPropagation()}
            className={`${isDark ? "bg-[#0a0a0a] border-white/10" : "bg-white border-black/10"} rounded-lg shadow-2xl border w-full max-w-md overflow-hidden`}
          >
            <div className={`p-4 border-b ${isDark ? "border-white/10" : "border-black/5"}`}>
              <input
                type="text"
                placeholder={searchQuery.startsWith("ask ") ? "ask me anything..." : "type a command or search..."}
                className={`w-full bg-transparent text-xs outline-none ${isDark ? "text-white placeholder:text-white/40" : "text-black placeholder:text-black/40"}`}
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.startsWith("ask ")) {
                    const question = searchQuery.replace("ask ", "").trim();
                    if (question && onAsk) onAsk(question);
                    onClose();
                  }
                }}
              />
            </div>

            <div className="p-2 max-h-[400px] overflow-y-auto">
              {searchQuery.startsWith("ask ") ? (
                <div className={`px-3 py-4 text-xs ${isDark ? "text-white/60" : "text-black/60"}`}>
                  press <kbd className={`px-1.5 py-0.5 ${isDark ? "bg-white/5" : "bg-black/5"} rounded text-[9px]`}>enter</kbd> to ask your question
                </div>
              ) : filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const Icon = item.icon;
                  if (item.action) {
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          if (item.action) item.action();
                          onClose();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"} transition-colors group`}
                      >
                        <div className="flex items-center gap-3">
                          {Icon && <Icon size={14} className={isDark ? "text-white/40" : "text-black/40"} />}
                          <div className="flex flex-col gap-0.5 items-start">
                            <span className={`text-xs ${isDark ? "text-white/90 group-hover:text-white" : "text-black/90 group-hover:text-black"} font-medium`}>{item.label}</span>
                            <span className={`text-[11px] ${isDark ? "text-white/40" : "text-black/40"}`}>{item.description}</span>
                          </div>
                        </div>
                        <kbd className={`text-[11px] ${isDark ? "text-white/40 bg-white/5" : "text-black/40 bg-black/5"} px-2 py-1 rounded`}>{item.key}</kbd>
                      </button>
                    );
                  } else if (item.isAskCommand) {
                    return (
                      <button
                        key={item.label}
                        onClick={() => setSearchQuery("ask ")}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"} transition-colors group`}
                      >
                        <div className="flex items-center gap-3">
                          {Icon && <Icon size={14} className={isDark ? "text-white/40" : "text-black/40"} />}
                          <div className="flex flex-col gap-0.5 items-start">
                            <span className={`text-xs ${isDark ? "text-white/90 group-hover:text-white" : "text-black/90 group-hover:text-black"} font-medium`}>{item.label}</span>
                            <span className={`text-[11px] ${isDark ? "text-white/40" : "text-black/40"}`}>{item.description}</span>
                          </div>
                        </div>
                        <kbd className={`text-[11px] ${isDark ? "text-white/40 bg-white/5" : "text-black/40 bg-black/5"} px-2 py-1 rounded`}>{item.key}</kbd>
                      </button>
                    );
                  } else {
                    return (
                      <Link
                        key={item.href}
                        href={item.href!}
                        onClick={() => onClose()}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-md ${isDark ? "hover:bg-white/5" : "hover:bg-black/5"} transition-colors group`}
                      >
                        <div className="flex items-center gap-3">
                          {Icon && <Icon size={14} className={isDark ? "text-white/40" : "text-black/40"} />}
                          <div className="flex flex-col gap-0.5">
                            <span className={`text-xs ${isDark ? "text-white/90 group-hover:text-white" : "text-black/90 group-hover:text-black"} font-medium`}>{item.label}</span>
                            <span className={`text-[11px] ${isDark ? "text-white/40" : "text-black/40"}`}>{item.description}</span>
                          </div>
                        </div>
                        <kbd className={`text-[11px] ${isDark ? "text-white/40 bg-white/5" : "text-black/40 bg-black/5"} px-2 py-1 rounded`}>{item.key}</kbd>
                      </Link>
                    );
                  }
                })
              ) : (
                <div className={`px-3 py-8 text-center text-xs ${isDark ? "text-white/40" : "text-black/40"}`}>no results found for &quot;{searchQuery}&quot;</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
