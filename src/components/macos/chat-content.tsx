"use client";

import { useEffect } from "react";
import { ArrowUp, Loader2, MessageCircle } from "lucide-react";
import {
  useAIChat,
  getMessageText,
  chatSuggestions,
} from "@/hooks/use-ai-chat";

interface ChatContentProps {
  autoFocus?: boolean;
  className?: string;
}

/** Shared Messages-style chat surface for desktop and mobile. */
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
    scrollRef,
    inputRef,
    handleSubmit,
    handleSuggestion,
  } = useAIChat();

  useEffect(() => {
    if (!autoFocus) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, [autoFocus, inputRef]);

  return (
    <div className={`mac-chat flex flex-col h-full min-h-0 ${className}`}>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <div className="mac-chat-welcome">
            <div className="mac-chat-avatar">
              <MessageCircle size={27} />
            </div>
            <h2>Meet my AI assistant</h2>
            <p>
              Ask about my work, experience, or the decisions behind a project.
            </p>
            <div className="space-y-2">
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
        {messages.map((message) => {
          const text = getMessageText(message.parts);
          if (!text) return null;
          return (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap break-words text-sm px-4 py-2.5 rounded-2xl leading-relaxed ${message.role === "user" ? "bg-[#007aff] text-white rounded-br-md" : "bg-[#2b2c30] text-mac-ink rounded-bl-md"}`}
              >
                {text}
              </div>
            </div>
          );
        })}
        {isLoading && messages.at(-1)?.role === "user" && (
          <Loader2
            size={16}
            className="animate-spin text-mac-muted"
            aria-label="Assistant is responding"
          />
        )}
        {error && (
          <p role="alert" className="text-red-400 text-xs text-center">
            Couldn&apos;t get a response. Please try again.
          </p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="mac-chat-form">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about Israel…"
            aria-label="Message to Israel's AI assistant"
            className="mac-chat-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim() || isLoading}
            className="mac-chat-send"
          >
            <ArrowUp size={19} />
          </button>
        </div>
      </form>
    </div>
  );
}
