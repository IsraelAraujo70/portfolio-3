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
    input.style.height = `${Math.min(Math.max(input.scrollHeight, 44), 144)}px`;
  }, [draft, inputRef]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!busy) onSubmit();
      }}
      className="rounded-2xl border border-white/[0.1] bg-[#11161e]/95 shadow-[0_18px_50px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors focus-within:border-cyan-300/25"
    >
      <textarea
        ref={inputRef}
        value={draft}
        rows={1}
        aria-label="Message to Israel AI"
        placeholder="Ask about Israel's experience..."
        onChange={(event) => onDraftChange(event.target.value)}
        onKeyDown={(event) => {
          if (
            shouldSubmitChatKey({
              key: event.key,
              shiftKey: event.shiftKey,
              isComposing: event.nativeEvent.isComposing,
            })
          ) {
            event.preventDefault();
            if (!busy) onSubmit();
          }
        }}
        className="block min-h-11 max-h-36 w-full resize-none bg-transparent px-4 pb-1 pt-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600"
      />
      <div className="flex items-center justify-between gap-3 px-3 pb-2.5 pl-4">
        <span className="truncate text-[9px] text-slate-600">
          {busy ? "Response in progress" : "Enter sends · Shift+Enter adds a line"}
        </span>
        <button
          type={busy ? "button" : "submit"}
          onClick={busy ? onStop : undefined}
          disabled={!busy && !draft.trim()}
          aria-label={busy ? "Stop response" : "Send message"}
          className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 disabled:cursor-not-allowed disabled:opacity-30 ${
            busy
              ? "border border-white/10 bg-white/[0.05] text-slate-300 hover:bg-white/[0.09]"
              : "bg-cyan-300 text-cyan-950 hover:bg-cyan-200"
          }`}
        >
          {busy ? <Square aria-hidden="true" className="size-3 fill-current" /> : <ArrowUp aria-hidden="true" className="size-4" />}
        </button>
      </div>
    </form>
  );
}
