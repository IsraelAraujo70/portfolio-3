"use client";
import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import type { UIMessage } from "ai";
import { getMessageText } from "@/lib/chat-ux";
import { ChatMarkdown } from "./chat-markdown";
import { ChatNavigation } from "./chat-navigation";
import type { NavigatePortfolio } from "@/lib/portfolio-navigation";

/** Copies the original Markdown and reports clipboard failures without losing the response. */
function CopyResponse({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  };

  return (
    <button
      type="button"
      className="mac-chat-copy"
      onClick={copy}
      aria-label={state === "copied" ? "Response copied" : "Copy response"}
    >
      {state === "copied" ? <Check size={13} /> : <Copy size={13} />}
      <span aria-live="polite">
        {state === "copied"
          ? "Copied"
          : state === "error"
            ? "Couldn't copy. Try again"
            : "Copy"}
      </span>
    </button>
  );
}

/** Displays user bubbles and unboxed Markdown answers with copy controls. */
export function ChatMessage({
  message,
  streaming = false,
  onNavigate,
}: {
  message: UIMessage;
  streaming?: boolean;
  onNavigate?: NavigatePortfolio;
}) {
  const text = getMessageText(message.parts);
  const navigationParts = message.parts.filter((part) => part.type === "tool-showProject" || part.type === "tool-showSection");
  if (!text && navigationParts.length === 0) return null;
  const isUser = message.role === "user";
  return (
    <article
      className={`mac-chat-message ${isUser ? "mac-chat-user" : "mac-chat-assistant"}`}
      aria-label={isUser ? "You" : "Assistant"}
    >
      {isUser ? (
        <div className="mac-chat-bubble">{text}</div>
      ) : (
        <ChatMarkdown>{text}</ChatMarkdown>
      )}
      {!isUser && navigationParts.map((part, index) => (
        <ChatNavigation key={"toolCallId" in part ? part.toolCallId : index} part={part} onNavigate={onNavigate} />
      ))}
      {!isUser && text && !streaming && <CopyResponse text={text} />}
    </article>
  );
}
