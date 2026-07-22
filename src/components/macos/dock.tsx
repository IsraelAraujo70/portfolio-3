"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Terminal,
  MessageCircle,
  StickyNote,
  Mail,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon, XIcon } from "@/components/ui/icons";
import { personalInfo } from "@/lib/resume-data";

interface DockItemConfig {
  id: string;
  label: string;
  icon: ReactNode;
  gradient: string;
  onClick?: () => void;
  href?: string;
  separator?: boolean;
}

interface DockProps {
  onToggleTerminal: () => void;
  onToggleChat: () => void;
  onClickFinder: () => void;
  onToggleNotes: () => void;
  openWindows: string[];
}

export function Dock({ onToggleTerminal, onToggleChat, onClickFinder, onToggleNotes, openWindows }: DockProps) {
  const items: DockItemConfig[] = [
    {
      id: "finder",
      label: "Portfolio",
      icon: <FolderOpen size={26} className="text-white drop-shadow-sm" />,
      gradient: "from-blue-400 to-blue-600",
      onClick: onClickFinder,
    },
    {
      id: "terminal",
      label: "Terminal",
      icon: <Terminal size={26} className="text-white drop-shadow-sm" />,
      gradient: "from-zinc-600 to-zinc-800",
      onClick: onToggleTerminal,
    },
    {
      id: "messages",
      label: "AI Chat",
      icon: <MessageCircle size={26} className="text-white drop-shadow-sm" />,
      gradient: "from-green-400 to-emerald-600",
      onClick: onToggleChat,
    },
    {
      id: "notes",
      label: "Sticky Notes",
      icon: <StickyNote size={26} className="text-white drop-shadow-sm" />,
      gradient: "from-amber-400 to-yellow-500",
      onClick: onToggleNotes,
      separator: true,
    },
    {
      id: "github",
      label: "GitHub",
      icon: <GitHubIcon width={26} height={26} className="text-white drop-shadow-sm" />,
      gradient: "from-neutral-600 to-neutral-800",
      href: personalInfo.github,
    },
    {
      id: "mail",
      label: "Mail",
      icon: <Mail size={26} className="text-white drop-shadow-sm" />,
      gradient: "from-sky-400 to-blue-600",
      href: `mailto:${personalInfo.email}`,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <LinkedInIcon width={27} height={27} className="text-white drop-shadow-sm" />,
      gradient: "from-[#0077B5] to-[#005fa3]",
      href: personalInfo.linkedin,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: <WhatsAppIcon width={27} height={27} className="text-white drop-shadow-sm" />,
      gradient: "from-[#25D366] to-[#128C7E]",
      href: personalInfo.whatsapp,
    },
    {
      id: "x",
      label: "X",
      icon: <XIcon width={24} height={24} className="text-white drop-shadow-sm" />,
      gradient: "from-zinc-800 to-black",
      href: personalInfo.x,
    },
  ];

  const windowIdMap: Record<string, string> = {
    finder: "finder",
    terminal: "terminal",
    messages: "chat",
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[60]">
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        style={{
          backdropFilter: "blur(20px) saturate(130%)",
          WebkitBackdropFilter: "blur(20px) saturate(130%)",
          background: "rgba(20, 20, 24, 0.72)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 0.5px 0 rgba(255, 255, 255, 0.2)",
        }}
        className="flex items-end gap-1.5 px-2.5 pt-2 pb-1.5 rounded-2xl"
      >
        {items.map((item, index) => (
          <DockItem
            key={item.id}
            item={item}
            index={index}
            isOpen={openWindows.includes(windowIdMap[item.id] ?? "")}
          />
        ))}
      </motion.div>
    </div>
  );
}

function DockItem({
  item,
  index,
  isOpen,
}: {
  item: DockItemConfig;
  index: number;
  isOpen: boolean;
}) {
  const Wrapper = item.href ? "a" : "button";
  const wrapperProps = item.href
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick: item.onClick, type: "button" };

  return (
    <>
      {item.separator && index > 0 && (
        <div className="w-px h-7 bg-white/[0.12] mx-0.5 self-center" />
      )}
      <div className="relative flex flex-col items-center group">
        <div
          role="tooltip"
          className="absolute -top-9 rounded-md px-2.5 py-1 text-[11px] font-medium text-white/90 whitespace-nowrap pointer-events-none border border-white/10 bg-neutral-900/95 shadow-lg opacity-0 translate-y-1 transition-[opacity,transform] duration-150 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0"
        >
          {item.label}
        </div>
        <Wrapper
          {...(wrapperProps as Record<string, unknown>)}
          aria-label={item.label}
          className="block origin-bottom transition-transform duration-150 ease-out hover:scale-125 hover:-translate-y-1 focus-visible:scale-110 focus-visible:-translate-y-0.5 focus-visible:outline-none"
        >
          <div
            className={`w-12 h-12 rounded-[13px] bg-gradient-to-br ${item.gradient} flex items-center justify-center cursor-pointer`}
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.15)",
            }}
          >
            {item.icon}
          </div>
        </Wrapper>
        <div
          className={`w-1 h-1 rounded-full mt-1 transition-opacity duration-200 ${
            isOpen ? "bg-white/70 opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </>
  );
}
