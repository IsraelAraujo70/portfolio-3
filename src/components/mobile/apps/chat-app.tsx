"use client";

import { ChatContent } from "@/components/chat/chat-content";

export function ChatApp() {
  return (
    <div
      className="h-full w-full bg-mac-surface"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 44px)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 36px)",
      }}
    >
      <div className="h-full min-h-0">
        <ChatContent autoFocus />
      </div>
    </div>
  );
}
