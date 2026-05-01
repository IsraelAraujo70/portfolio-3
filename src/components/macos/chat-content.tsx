"use client";

import { useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import {
  useAIChat,
  getMessageText,
  chatSuggestions,
} from "@/hooks/use-ai-chat";

interface ChatContentProps {
  autoFocus?: boolean;
  className?: string;
}

export function ChatContent({ autoFocus = true, className = "" }: ChatContentProps) {
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
    if (autoFocus) setTimeout(() => inputRef.current?.focus(), 300);
  }, [autoFocus, inputRef]);

  return (
    <div className={`flex flex-col h-full min-h-0 ${className}`}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-gray-400 text-sm">
              Hi! I&apos;m Israel&apos;s AI assistant. Ask me anything about his
              skills, experience, or projects.
            </p>
            <div className="space-y-2">
              {chatSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="block w-full text-left text-xs px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 hover:text-cyan-400 hover:border-cyan-400/20 active:bg-white/[0.08] transition-all touch-manipulation"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const text = getMessageText(msg.parts);
          if (!text) return null;
          return (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] text-sm px-4 py-2.5 rounded-2xl leading-relaxed ${
                  msg.role === "user"
                    ? "bg-cyan-400/15 text-cyan-100 rounded-br-md"
                    : "bg-white/[0.06] text-gray-300 rounded-bl-md"
                }`}
              >
                {text}
              </div>
            </div>
          );
        })}

        {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-white/[0.06] text-gray-400 px-4 py-2.5 rounded-2xl rounded-bl-md">
              <Loader2 size={16} className="animate-spin" />
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-400/80 text-xs text-center">Something went wrong. Please try again.</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="px-5 py-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my experience..."
            className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/30 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 active:bg-cyan-400/25 disabled:opacity-30 disabled:cursor-not-allowed transition-all touch-manipulation"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
