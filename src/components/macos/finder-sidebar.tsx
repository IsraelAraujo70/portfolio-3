"use client";

import {
  Home,
  User,
  FolderOpen,
  Cpu,
  Briefcase,
  GitBranch,
  Mail,
} from "lucide-react";

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "opensource", label: "Open Source", icon: GitBranch },
  { id: "contact", label: "Contact", icon: Mail },
];

const techTags = [
  { label: "Python", color: "#3776AB" },
  { label: "TypeScript", color: "#3178C6" },
  { label: "Rust", color: "#DEA584" },
  { label: "Go", color: "#00ADD8" },
];

interface FinderSidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function FinderSidebar({ activeSection, onNavigate }: FinderSidebarProps) {
  return (
    <div className="py-3 px-2 flex flex-col h-full">
      <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider px-2 mb-2">
        Favorites
      </p>

      <nav className="space-y-0.5">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[13px] transition-all ${
                active
                  ? "bg-white/[0.12] text-white"
                  : "text-white/50 hover:text-white/70 hover:bg-white/[0.05]"
              }`}
            >
              <Icon size={14} className={active ? "text-cyan-400" : ""} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <p className="text-[10px] font-semibold text-white/30 uppercase tracking-wider px-2 mb-2">
          Tags
        </p>
        <div className="space-y-1">
          {techTags.map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2 px-2.5 py-1 text-[12px] text-white/40">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
