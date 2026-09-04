"use client";

import { useState, useEffect } from "react";
import { Command, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/lib/resume-data";

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    update();
    const timer = setInterval(update, 30000);
    return () => clearInterval(timer);
  }, []);
  return <time className="mac-menu-clock">{time}</time>;
}

interface MenuBarProps {
  onOpenPortfolio: () => void;
  onOpenTerminal: () => void;
  onOpenChat: () => void;
}

/** Desktop menu actions open the same applications as the Dock. */
export function MenuBar({
  onOpenPortfolio,
  onOpenTerminal,
  onOpenChat,
}: MenuBarProps) {
  return (
    <header className="mac-menu-bar">
      <nav className="mac-menu-group" aria-label="Desktop applications">
        <Command size={16} className="mr-2" aria-hidden="true" />
        <button
          type="button"
          className="font-semibold"
          onClick={onOpenPortfolio}
        >
          Portfolio
        </button>
        <button type="button" onClick={onOpenTerminal}>
          Terminal
        </button>
        <button type="button" onClick={onOpenChat}>
          AI assistant
        </button>
      </nav>
      <div className="mac-menu-group">
        <a
          href={personalInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5"
        >
          GitHub <ArrowUpRight size={12} />
        </a>
        <Clock />
      </div>
    </header>
  );
}
