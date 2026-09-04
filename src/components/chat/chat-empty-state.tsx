"use client";
import { MessageCircle } from "lucide-react";
import { chatSuggestions } from "@/lib/chat-ux";

/** Offers editable questions about the portfolio before a conversation begins. */
export function ChatEmptyState({
  onPick,
}: {
  onPick: (prompt: string) => void;
}) {
  return (
    <div className="mac-chat-welcome">
      <div className="mac-chat-avatar">
        <MessageCircle size={24} strokeWidth={1.5} />
      </div>
      <h2>What would you like to know?</h2>
      <p>
        Explore Israel&apos;s projects, experience, and the decisions behind his
        work.
      </p>
      <div className="mac-chat-suggestions" aria-label="Suggested questions">
        {chatSuggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            type="button"
            onClick={() => onPick(suggestion.prompt)}
            className="mac-chat-suggestion"
          >
            {suggestion.label}
          </button>
        ))}
      </div>
    </div>
  );
}
