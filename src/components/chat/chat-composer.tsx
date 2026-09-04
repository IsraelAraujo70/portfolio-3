"use client";

import { useEffect, type RefObject } from "react";
import { ArrowUp, Square } from "lucide-react";
import { shouldSubmitChatKey } from "@/lib/chat-ux";

interface ChatComposerProps {
  draft: string;
  busy: boolean;
  inputRef: RefObject<HTMLTextAreaElement | null>;
  onDraftChange: (draft: string) => void;
  onSubmit: () => void;
  onStop: () => void;
}

/** Multiline composer with IME-aware submission and cancellation that preserves drafts. */
export function ChatComposer({
  draft,
  busy,
  inputRef,
  onDraftChange,
  onSubmit,
  onStop,
}: ChatComposerProps) {
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    input.style.height = "0px";
    input.style.height = `${Math.min(Math.max(input.scrollHeight, 62), 160)}px`;
  }, [draft, inputRef]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!busy) onSubmit();
      }}
      className="mac-chat-composer"
    >
      <textarea
        ref={inputRef}
        value={draft}
        rows={2}
        aria-label="Message to Israel's AI assistant"
        placeholder="Ask about Israel's work…"
        onChange={(event) => onDraftChange(event.target.value)}
        onKeyDown={(event) => {
          if (
            shouldSubmitChatKey({
              key: event.key,
              shiftKey: event.shiftKey,
              isComposing:
                event.nativeEvent.isComposing || event.keyCode === 229,
            })
          ) {
            event.preventDefault();
            if (!busy) onSubmit();
          }
        }}
        className="mac-chat-input"
      />
      <div className="mac-chat-composer-toolbar">
        <span>
          {busy
            ? "Response in progress"
            : "Enter sends · Shift+Enter adds a line"}
        </span>
        <button
          type={busy ? "button" : "submit"}
          onClick={
            busy
              ? (event) => {
                  event.preventDefault();
                  onStop();
                }
              : undefined
          }
          disabled={!busy && !draft.trim()}
          aria-label={busy ? "Stop response" : "Send message"}
          className="mac-chat-send"
        >
          {busy ? (
            <Square aria-hidden="true" className="size-3 fill-current" />
          ) : (
            <ArrowUp aria-hidden="true" className="size-4" />
          )}
        </button>
      </div>
    </form>
  );
}
