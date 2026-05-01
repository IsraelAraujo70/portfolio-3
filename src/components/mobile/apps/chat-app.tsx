"use client";

import { ChatContent } from "@/components/macos/chat-content";

export function ChatApp() {
  return (
    <div className="h-full w-full bg-[#0a0a0f] flex flex-col">
      <div
        className="shrink-0 flex items-center justify-center h-12 border-b border-white/[0.08]"
        style={{ marginTop: "calc(env(safe-area-inset-top) + 44px)" }}
      >
        <span className="text-white/85 text-sm font-medium">AI Assistant</span>
      </div>
      <div className="flex-1 min-h-0">
        <ChatContent autoFocus />
      </div>
      <div style={{ height: "calc(env(safe-area-inset-bottom) + 36px)" }} />
    </div>
  );
}
