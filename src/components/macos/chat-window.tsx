"use client";

import { type CSSProperties } from "react";
import { WindowChrome } from "./window-chrome";
import { ChatContent } from "@/components/chat/chat-content";
import type { NavigatePortfolio } from "@/lib/portfolio-navigation";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  dragHandleProps?: Record<string, unknown>;
  style?: CSSProperties;
  onNavigate?: NavigatePortfolio;
}

/** Host the AI chat inside the desktop window frame. */
export function ChatWindow({
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  dragHandleProps,
  style,
  onNavigate,
}: ChatWindowProps) {
  return (
    <WindowChrome
      title="AI assistant"
      isOpen={isOpen}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onFocus={onFocus}
      dragHandleProps={dragHandleProps}
      style={style}
      className="flex flex-col w-full h-full shadow-2xl"
    >
      <ChatContent autoFocus={isOpen} onNavigate={onNavigate} />
    </WindowChrome>
  );
}
