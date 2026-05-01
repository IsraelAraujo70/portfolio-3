"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DesktopWallpaper } from "@/components/macos/desktop-wallpaper";
import { StatusBar } from "./status-bar";
import { HomeScreen, type AppId, type AppLaunch } from "./home-screen";
import { HomeIndicator } from "./home-indicator";
import { AppFrame } from "./app-frame";
import { PortfolioApp } from "./apps/portfolio-app";
import { TerminalApp } from "./apps/terminal-app";
import { ChatApp } from "./apps/chat-app";
import { NotesApp } from "./apps/notes-app";

const GRADIENTS: Record<AppId, string> = {
  portfolio: "from-blue-400 to-blue-600",
  terminal: "from-zinc-700 to-zinc-900",
  chat: "from-green-400 to-emerald-600",
  notes: "from-amber-400 to-yellow-500",
};

export function IOS() {
  const [open, setOpen] = useState<AppLaunch | null>(null);

  const close = () => setOpen(null);
  const launchChat = () => setOpen({ id: "chat", source: "grid" });

  const morphId = open ? `${open.source}-${open.id}` : "";

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <DesktopWallpaper />
      <HomeScreen onLaunch={setOpen} />

      <AnimatePresence>
        {open && (
          <AppFrame
            key={morphId}
            morphLayoutId={morphId}
            gradient={GRADIENTS[open.id]}
          >
            {open.id === "portfolio" && (
              <PortfolioApp onOpenChat={launchChat} />
            )}
            {open.id === "terminal" && <TerminalApp onClose={close} />}
            {open.id === "chat" && <ChatApp />}
            {open.id === "notes" && <NotesApp />}
          </AppFrame>
        )}
      </AnimatePresence>

      <StatusBar />
      <HomeIndicator appOpen={!!open} onClose={close} />
    </div>
  );
}
