"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FolderOpen,
  Terminal,
  MessageCircle,
  StickyNote,
  Mail,
} from "lucide-react";
import {
  GitHubIcon,
  WhatsAppIcon,
  XIcon,
  LinkedInIcon,
} from "@/components/ui/icons";
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

/** Glass application launcher with focusable labels and running indicators. */
export function Dock({
  onToggleTerminal,
  onToggleChat,
  onClickFinder,
  onToggleNotes,
  openWindows,
}: DockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [scales, setScales] = useState<Record<string, number>>({});
  const reducedMotion = useReducedMotion();

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
      icon: (
        <GitHubIcon
          width={26}
          height={26}
          className="text-white drop-shadow-sm"
        />
      ),
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
      icon: (
        <LinkedInIcon
          width={27}
          height={27}
          className="text-white drop-shadow-sm"
        />
      ),
      gradient: "from-[#0077B5] to-[#005fa3]",
      href: personalInfo.linkedin,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: (
        <WhatsAppIcon
          width={27}
          height={27}
          className="text-white drop-shadow-sm"
        />
      ),
      gradient: "from-[#25D366] to-[#128C7E]",
      href: personalInfo.whatsapp,
    },
    {
      id: "x",
      label: "X",
      icon: (
        <XIcon width={24} height={24} className="text-white drop-shadow-sm" />
      ),
      gradient: "from-zinc-800 to-black",
      href: personalInfo.x,
    },
  ];

  const handleMouseMove = (event: MouseEvent) => {
    if (!dockRef.current || reducedMotion) return;
    const next: Record<string, number> = {};
    dockRef.current
      .querySelectorAll<HTMLElement>("[data-dock-item]")
      .forEach((element) => {
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(event.clientX - rect.left - rect.width / 2);
        next[element.dataset.dockItem!] =
          1 + 0.45 * Math.max(0, 1 - distance / 110);
      });
    setScales(next);
  };

  const handleMouseLeave = () => setScales({});

  const windowIdMap: Record<string, string> = {
    finder: "finder",
    terminal: "terminal",
    messages: "chat",
  };

  return (
    <nav
      aria-label="Dock"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[90]"
    >
      <motion.div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="mac-dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={item.id}
            item={item}
            index={index}
            scale={reducedMotion ? 1 : (scales[item.id] ?? 1)}
            isOpen={openWindows.includes(windowIdMap[item.id] ?? "")}
          />
        ))}
      </motion.div>
    </nav>
  );
}

function DockItem({
  item,
  index,
  scale,
  isOpen,
}: {
  item: DockItemConfig;
  index: number;
  scale: number;
  isOpen: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

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
        data-dock-item={item.id}
        className="relative flex flex-col items-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.12 }}
              className="mac-dock-tooltip absolute -top-10 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap pointer-events-none"
            >
              {item.label}
            </motion.div>
          )}
        </AnimatePresence>
        <Wrapper
          {...(wrapperProps as Record<string, unknown>)}
          aria-label={item.label}
          className="block rounded-[14px]"
        >
          <motion.div
            animate={{ scale }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.5,
            }}
            className={`mac-app-icon w-12 h-12 rounded-[14px] bg-gradient-to-br ${item.gradient} flex items-center justify-center cursor-pointer`}
            style={{
              originY: 1,
            }}
          >
            {item.icon}
          </motion.div>
        </Wrapper>
        <div
          className={`w-1 h-1 rounded-full mt-1 transition-opacity duration-200 ${
            isOpen ? "bg-white opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </>
  );
}
