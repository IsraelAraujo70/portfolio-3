"use client";

import { TerminalContent } from "@/components/macos/terminal-content";

interface TerminalAppProps {
  onClose: () => void;
}

export function TerminalApp({ onClose }: TerminalAppProps) {
  return (
    <div
      className="h-full w-full bg-black/95 flex flex-col"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 44px)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 36px)",
      }}
    >
      <TerminalContent onExit={onClose} className="flex-1 px-2" />
    </div>
  );
}
