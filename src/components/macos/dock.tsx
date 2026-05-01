"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  Terminal,
  MessageCircle,
  Mail,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
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
  openWindows: string[];
}

export function Dock({ onToggleTerminal, onToggleChat, onClickFinder, openWindows }: DockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

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
      icon: <img src="/linkedin-icon.svg" alt="LinkedIn" className="w-7 h-7 brightness-0 invert drop-shadow-sm" />,
      gradient: "from-[#0077B5] to-[#005fa3]",
      href: personalInfo.linkedin,
    },
  ];

  const handleMouseMove = (e: MouseEvent) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  const handleMouseLeave = () => setMouseX(null);

  const windowIdMap: Record<string, string> = {
    finder: "finder",
    terminal: "terminal",
    messages: "chat",
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[60]">
      <motion.div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        style={{
          backdropFilter: "blur(50px) saturate(150%)",
          WebkitBackdropFilter: "blur(50px) saturate(150%)",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow:
            "0 8px 40px rgba(0, 0, 0, 0.35), inset 0 0.5px 0 rgba(255, 255, 255, 0.2), inset 0 -0.5px 0 rgba(255, 255, 255, 0.05)",
        }}
        className="flex items-end gap-1.5 px-2.5 pt-2 pb-1.5 rounded-2xl"
      >
        {items.map((item, index) => (
          <DockItem
            key={item.id}
            item={item}
            index={index}
            mouseX={mouseX}
            dockRef={dockRef}
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
  mouseX,
  dockRef,
  isOpen,
}: {
  item: DockItemConfig;
  index: number;
  mouseX: number | null;
  dockRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  let scale = 1;
  if (mouseX !== null && itemRef.current && dockRef.current) {
    const rect = itemRef.current.getBoundingClientRect();
    const dockRect = dockRef.current.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2 - dockRect.left;
    const distance = Math.abs(mouseX - itemCenter);
    const maxDistance = 120;
    scale = 1 + 0.6 * Math.max(0, 1 - distance / maxDistance);
  }

  const Wrapper = item.href ? "a" : "button";
  const wrapperProps = item.href
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick: item.onClick };

  return (
    <>
      {item.separator && index > 0 && (
        <div className="w-px h-7 bg-white/[0.12] mx-0.5 self-center" />
      )}
      <div
        ref={itemRef}
        className="relative flex flex-col items-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.12 }}
              style={{
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                background: "rgba(30, 30, 30, 0.85)",
              }}
              className="absolute -top-9 rounded-md px-2.5 py-1 text-[11px] font-medium text-white/90 whitespace-nowrap pointer-events-none border border-white/10 shadow-lg"
            >
              {item.label}
            </motion.div>
          )}
        </AnimatePresence>
        <Wrapper
          {...(wrapperProps as Record<string, unknown>)}
          className="block"
        >
          <motion.div
            animate={{ scale }}
            transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
            className={`w-12 h-12 rounded-[13px] bg-gradient-to-br ${item.gradient} flex items-center justify-center cursor-pointer`}
            style={{
              originY: 1,
              boxShadow: "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.15)",
            }}
          >
            {item.icon}
          </motion.div>
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
