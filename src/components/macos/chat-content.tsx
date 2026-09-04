"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Check,
  Copy,
  Loader2,
  MessageCircle,
  Square,
} from "lucide-react";
import {
  useAIChat,
  getMessageText,
  chatSuggestions,
} from "@/hooks/use-ai-chat";
import { ChatMarkdown } from "./chat-markdown";

interface ChatContentProps {
  autoFocus?: boolean;
  className?: string;
}

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

/** T3Code-inspired conversation surface shared by the desktop window and mobile app. */
export function ChatContent({
  autoFocus = true,
  className = "",
}: ChatContentProps) {
  const {
    messages,
    input,
    setInput,
    isLoading,
    error,
    stop,
    regenerate,
    scrollRef,
    inputRef,
    handleScroll,
    handleSubmit,
    handleSuggestion,
  } = useAIChat();

  useEffect(() => {
    if (!autoFocus) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, [autoFocus, inputRef]);

  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  }, [input, inputRef]);

  const lastMessage = messages.at(-1);
  const awaitingText =
    isLoading &&
    (!lastMessage ||
      lastMessage.role === "user" ||
      !getMessageText(lastMessage.parts));

  return (
    <div className={`mac-chat flex flex-col h-full min-h-0 ${className}`}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="mac-chat-timeline"
        role="log"
        aria-label="Conversation"
        aria-live="polite"
      >
        <div className="mac-chat-thread">
          {messages.length === 0 && (
            <div className="mac-chat-welcome">
              <div className="mac-chat-avatar">
                <MessageCircle size={24} strokeWidth={1.5} />
              </div>
              <h2>What would you like to know?</h2>
              <p>
                Explore Israel&apos;s projects, experience, and the decisions
                behind his work.
              </p>
              <div className="mac-chat-suggestions">
                {chatSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestion(suggestion)}
                    className="mac-chat-suggestion"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((message, index) => {
            const text = getMessageText(message.parts);
            if (!text) return null;
            const isUser = message.role === "user";
            return (
              <article
                key={message.id}
                className={`mac-chat-message ${isUser ? "mac-chat-user" : "mac-chat-assistant"}`}
                aria-label={isUser ? "You" : "Assistant"}
              >
                {isUser ? (
                  <div className="mac-chat-bubble">{text}</div>
                ) : (
                  <ChatMarkdown>{text}</ChatMarkdown>
                )}
                {!isUser && !(isLoading && index === messages.length - 1) && (
                  <CopyResponse text={text} />
                )}
              </article>
            );
          })}
          {awaitingText && (
            <div className="mac-chat-thinking" role="status">
              <Loader2 size={14} className="animate-spin" /> Thinking…
            </div>
          )}
          {error && (
            <div role="alert" className="mac-chat-error">
              Couldn&apos;t get a response.{" "}
              <button type="button" onClick={() => void regenerate()}>
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mac-chat-form">
        <div className="mac-chat-composer">
          <textarea
            ref={inputRef}
            rows={2}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing &&
                event.keyCode !== 229
              ) {
                event.preventDefault();
                if (!isLoading) event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="Ask about Israel's work…"
            aria-label="Message to Israel's AI assistant"
            className="mac-chat-input"
          />
          <div className="mac-chat-composer-toolbar">
            <span>Shift + Enter for a new line</span>
            {isLoading ? (
              <button
                type="button"
                aria-label="Stop response"
                onClick={(event) => {
                  // Cancelling swaps this button to submit before the click default runs.
                  event.preventDefault();
                  void stop();
                }}
                className="mac-chat-send"
              >
                <Square size={13} fill="currentColor" />
              </button>
            ) : (
              <button
                type="submit"
                aria-label="Send message"
                disabled={!input.trim()}
                className="mac-chat-send"
              >
                <ArrowUp size={18} />
              </button>
            )}
          </div>
        </div>
        <p className="mac-chat-disclaimer">
          AI assistant · Based on Israel&apos;s portfolio and résumé
        </p>
      </form>
    </div>
  );
}
