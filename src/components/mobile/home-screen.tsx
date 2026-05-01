"use client";

import {
  FolderOpen,
  Terminal,
  MessageCircle,
  StickyNote,
  Mail,
} from "lucide-react";
import { GitHubIcon, XIcon } from "@/components/ui/icons";
import { personalInfo } from "@/lib/resume-data";
import { AppIcon, type AppIconConfig } from "./app-icon";

export type AppId = "portfolio" | "terminal" | "chat" | "notes";
export type AppSource = "grid" | "dock";
export interface AppLaunch {
  id: AppId;
  source: AppSource;
}

interface HomeScreenProps {
  onLaunch: (target: AppLaunch) => void;
}

const ACTIONABLE: { id: AppId; label: string; gradient: string; icon: React.ReactNode }[] = [
  {
    id: "portfolio",
    label: "Portfolio",
    gradient: "from-blue-400 to-blue-600",
    icon: <FolderOpen size={32} className="text-white drop-shadow-sm" />,
  },
  {
    id: "terminal",
    label: "Terminal",
    gradient: "from-zinc-700 to-zinc-900",
    icon: <Terminal size={32} className="text-white drop-shadow-sm" />,
  },
  {
    id: "chat",
    label: "AI Chat",
    gradient: "from-green-400 to-emerald-600",
    icon: <MessageCircle size={32} className="text-white drop-shadow-sm" />,
  },
  {
    id: "notes",
    label: "Notes",
    gradient: "from-amber-400 to-yellow-500",
    icon: <StickyNote size={32} className="text-white drop-shadow-sm" />,
  },
];

export function HomeScreen({ onLaunch }: HomeScreenProps) {
  const linkIcons: AppIconConfig[] = [
    {
      id: "github",
      label: "GitHub",
      gradient: "from-neutral-700 to-neutral-900",
      icon: <GitHubIcon width={36} height={36} className="text-white drop-shadow-sm" />,
      href: personalInfo.github,
    },
    {
      id: "mail",
      label: "Mail",
      gradient: "from-sky-400 to-blue-600",
      icon: <Mail size={32} className="text-white drop-shadow-sm" />,
      href: `mailto:${personalInfo.email}`,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      gradient: "from-[#0077B5] to-[#005fa3]",
      icon: (
        <img
          src="/linkedin-icon.svg"
          alt=""
          className="w-9 h-9 brightness-0 invert drop-shadow-sm"
        />
      ),
      href: personalInfo.linkedin,
    },
    {
      id: "x",
      label: "X",
      gradient: "from-zinc-800 to-black",
      icon: <XIcon width={28} height={28} className="text-white drop-shadow-sm" />,
      href: personalInfo.x,
    },
  ];

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 44px)" }}
    >
      <div className="flex-1 px-7 pt-10">
        <div className="grid grid-cols-4 gap-x-4 gap-y-7">
          {ACTIONABLE.map((app) => (
            <AppIcon
              key={`grid-${app.id}`}
              id={`grid-${app.id}`}
              label={app.label}
              gradient={app.gradient}
              icon={app.icon}
              morphLayoutId={`grid-${app.id}`}
              onTap={() => onLaunch({ id: app.id, source: "grid" })}
            />
          ))}
          {linkIcons.map((cfg) => (
            <AppIcon key={cfg.id} {...cfg} />
          ))}
        </div>
      </div>

      <div
        className="flex flex-col items-center gap-3 px-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 28px)" }}
      >
        <div className="flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        </div>
        <div
          style={{
            backdropFilter: "blur(40px) saturate(160%)",
            WebkitBackdropFilter: "blur(40px) saturate(160%)",
            background: "rgba(255, 255, 255, 0.18)",
            border: "1px solid rgba(255, 255, 255, 0.22)",
          }}
          className="grid grid-cols-4 gap-3 px-3 py-3 rounded-[28px]"
        >
          {ACTIONABLE.map((app) => (
            <div key={`dock-${app.id}`} className="w-14">
              <AppIcon
                id={`dock-${app.id}`}
                label=""
                gradient={app.gradient}
                icon={app.icon}
                morphLayoutId={`dock-${app.id}`}
                onTap={() => onLaunch({ id: app.id, source: "dock" })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
