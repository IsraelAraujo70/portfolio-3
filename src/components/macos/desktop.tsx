"use client";

import { useState, useEffect } from "react";
import { DesktopWallpaper } from "./desktop-wallpaper";
import { FinderWindow } from "./finder-window";
import { TerminalWindow } from "./terminal-window";
import { ChatWindow } from "./chat-window";

export function Desktop() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <DesktopWallpaper />

      <FinderWindow
        onOpenChat={() => setChatOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      <TerminalWindow
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
      <ChatWindow
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </div>
  );
}
