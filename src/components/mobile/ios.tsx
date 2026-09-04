"use client";

import { useState, type ReactNode } from "react";
import { DesktopWallpaper } from "@/components/macos/desktop-wallpaper";
import { StatusBar } from "./status-bar";
import { HomeScreen, type AppId, type AppLaunch } from "./home-screen";
import { HomeIndicator } from "./home-indicator";
import { AppFrame } from "./app-frame";

const GRADIENTS: Record<AppId, string> = {
  portfolio: "from-blue-400 to-blue-600",
  terminal: "from-zinc-700 to-zinc-900",
  chat: "from-green-400 to-emerald-600",
  notes: "from-amber-400 to-yellow-500",
};

interface LoadedApp {
  id: AppId;
  render: () => ReactNode;
}

export function IOS() {
  const [open, setOpen] = useState<AppLaunch | null>(null);
  const [loadedApp, setLoadedApp] = useState<LoadedApp | null>(null);

  const close = () => setOpen(null);

  const launch = async (target: AppLaunch) => {
    setOpen(target);
    setLoadedApp(null);

    if (target.id === "portfolio") {
      const { PortfolioApp } = await import("./apps/portfolio-app");
      setLoadedApp({
        id: target.id,
        render: () => (
          <PortfolioApp
            onOpenChat={() => void launch({ id: "chat", source: "grid" })}
          />
        ),
      });
      return;
    }

    if (target.id === "terminal") {
      const { TerminalApp } = await import("./apps/terminal-app");
      setLoadedApp({
        id: target.id,
        render: () => <TerminalApp onClose={close} />,
      });
      return;
    }

    if (target.id === "chat") {
      const { ChatApp } = await import("./apps/chat-app");
      setLoadedApp({ id: target.id, render: () => <ChatApp /> });
      return;
    }

    const { NotesApp } = await import("./apps/notes-app");
    setLoadedApp({ id: target.id, render: () => <NotesApp /> });
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <DesktopWallpaper />
      <HomeScreen onLaunch={(target) => void launch(target)} />

      {open && (
        <AppFrame gradient={GRADIENTS[open.id]}>
          {loadedApp?.id === open.id ? (
            loadedApp.render()
          ) : (
              <div className="h-full w-full flex items-center justify-center text-white/70 text-sm">
                Opening…
              </div>
          )}
        </AppFrame>
      )}

      <StatusBar />
      <HomeIndicator appOpen={!!open} onClose={close} />
    </div>
  );
}
