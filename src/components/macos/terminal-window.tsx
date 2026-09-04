"use client";

import { type CSSProperties } from "react";
import { WindowChrome } from "./window-chrome";
import { TerminalContent } from "./terminal-content";

interface TerminalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  dragHandleProps?: Record<string, unknown>;
  style?: CSSProperties;
}

/** Host the terminal inside the dark desktop window frame. */
export function TerminalWindow({
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  dragHandleProps,
  style,
}: TerminalWindowProps) {
  return (
    <WindowChrome
      title="israel@portfolio: ~"
      isOpen={isOpen}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onFocus={onFocus}
      dragHandleProps={dragHandleProps}
      style={style}
      dark
      className="flex flex-col w-full h-full shadow-2xl"
    >
      <TerminalContent onExit={onClose} autoFocus={isOpen} className="flex-1" />
    </WindowChrome>
  );
}
