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
  const tourParts = message.parts.filter((part) => part.type === "tool-startTour");
  if (!text && navigationParts.length === 0 && tourParts.length === 0) return null;
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
      {!isUser && tourParts.map((part) => "state" in part && "toolCallId" in part && (
        <div className="mac-chat-tour-event" role="status" key={part.toolCallId}>
          {part.state === "output-available" ? "AI tour prepared" : part.state === "output-error" ? `Couldn't prepare the tour. ${part.errorText}` : streaming ? "Preparing your tour…" : "Tour preparation was interrupted. Please try again."}
        </div>
      ))}
      {!isUser && text && !streaming && <CopyResponse text={text} />}
    </article>
  );
}
