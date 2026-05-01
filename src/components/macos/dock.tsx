"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  FolderOpen,
  Terminal,
  MessageCircle,
  Globe,
  Mail,
  Settings,
  Music,
  Camera,
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
}

export function Dock({ onToggleTerminal, onToggleChat }: DockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const items: DockItemConfig[] = [
    {
      id: "finder",
      label: "Finder",
      icon: <FolderOpen size={24} className="text-white" />,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      id: "terminal",
      label: "Terminal",
      icon: <Terminal size={24} className="text-white" />,
      gradient: "from-gray-700 to-gray-900",
      onClick: onToggleTerminal,
    },
    {
      id: "messages",
      label: "Messages",
      icon: <MessageCircle size={24} className="text-white" />,
      gradient: "from-green-400 to-green-600",
      onClick: onToggleChat,
      separator: true,
    },
    {
      id: "github",
      label: "GitHub",
      icon: <GitHubIcon width={24} height={24} className="text-white" />,
      gradient: "from-gray-600 to-gray-800",
      href: personalInfo.github,
    },
    {
      id: "mail",
      label: "Mail",
      icon: <Mail size={24} className="text-white" />,
      gradient: "from-blue-500 to-blue-700",
      href: `mailto:${personalInfo.email}`,
    },
    {
      id: "safari",
      label: "LinkedIn",
      icon: <Globe size={24} className="text-white" />,
      gradient: "from-sky-400 to-blue-500",
      href: personalInfo.linkedin,
      separator: true,
    },
    {
      id: "music",
      label: "Music",
      icon: <Music size={22} className="text-white" />,
      gradient: "from-red-400 to-pink-600",
    },
    {
      id: "photos",
      label: "Photos",
      icon: <Camera size={22} className="text-white" />,
      gradient: "from-orange-300 via-pink-400 to-purple-500",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={24} className="text-white" />,
      gradient: "from-gray-400 to-gray-600",
    },
  ];

  const handleMouseMove = (e: MouseEvent) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  const handleMouseLeave = () => setMouseX(null);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40">
      <motion.div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="flex items-end gap-1 px-3 py-1.5 rounded-2xl liquid-glass-heavy"
      >
        {items.map((item, index) => (
          <DockItem
            key={item.id}
            item={item}
            index={index}
            mouseX={mouseX}
            dockRef={dockRef}
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
}: {
  item: DockItemConfig;
  index: number;
  mouseX: number | null;
  dockRef: React.RefObject<HTMLDivElement | null>;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  let scale = 1;
  if (mouseX !== null && itemRef.current && dockRef.current) {
    const rect = itemRef.current.getBoundingClientRect();
    const dockRect = dockRef.current.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2 - dockRect.left;
    const distance = Math.abs(mouseX - itemCenter);
    const maxDistance = 100;
    scale = 1 + 0.5 * Math.max(0, 1 - distance / maxDistance);
  }

  const Wrapper = item.href ? "a" : "button";
  const wrapperProps = item.href
    ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
    : { onClick: item.onClick };

  return (
    <>
      {item.separator && index > 0 && (
        <div className="w-px h-8 bg-white/10 mx-0.5 self-center" />
      )}
      <div
        ref={itemRef}
        className="relative flex flex-col items-center"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && (
          <div className="absolute -top-9 liquid-glass-heavy rounded-md px-2.5 py-1 text-[11px] text-white whitespace-nowrap pointer-events-none">
            {item.label}
          </div>
        )}
        <Wrapper
          {...(wrapperProps as Record<string, unknown>)}
          className="block"
        >
          <motion.div
            animate={{ scale }}
            transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
            className={`w-11 h-11 rounded-xl bg-gradient-to-b ${item.gradient} flex items-center justify-center shadow-lg cursor-pointer`}
            style={{ originY: 1 }}
          >
            {item.icon}
          </motion.div>
        </Wrapper>
      </div>
    </>
  );
}
