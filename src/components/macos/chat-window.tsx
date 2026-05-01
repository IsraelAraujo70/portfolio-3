"use client";

import { type CSSProperties } from "react";
import { WindowChrome } from "./window-chrome";
import { ChatContent } from "./chat-content";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  dragHandleProps?: Record<string, unknown>;
  style?: CSSProperties;
}

export function ChatWindow({
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  dragHandleProps,
  style,
}: ChatWindowProps) {
  return (
    <WindowChrome
      title="Messages — AI Assistant"
      isOpen={isOpen}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onFocus={onFocus}
      dragHandleProps={dragHandleProps}
      style={style}
      className="flex flex-col w-full h-full shadow-2xl"
    >
      <ChatContent autoFocus={isOpen} />
    </WindowChrome>
  );
}
