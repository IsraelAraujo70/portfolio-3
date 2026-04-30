"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const suggestions = [
  "What's your experience with Rust?",
  "Tell me about your AI projects",
  "What open source work have you done?",
  "Are you available for remote work?",
];

function getMessageText(
  parts: Array<{ type: string; text?: string }>
): string {
  return parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

export function AIChat({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleSuggestion = (text: string) => {
    if (isLoading) return;
    sendMessage({ text });
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={onToggle}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 flex items-center justify-center shadow-lg shadow-cyan-400/5"
          >
            <MessageCircle size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-40 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-6rem)] bg-black/80 backdrop-blur-2xl border border-white/[0.08] rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-sm font-medium text-white">
                  Talk to my AI
                </h3>
                <p className="text-xs text-gray-500">
                  Ask anything about my experience
                </p>
              </div>
              <button
                onClick={onToggle}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
            >
              {messages.length === 0 && (
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm">
                    Hi! I&apos;m Israel&apos;s AI assistant. Ask me anything
                    about his skills, experience, or projects.
                  </p>
                  <div className="space-y-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestion(s)}
                        className="block w-full text-left text-xs px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-cyan-400 hover:border-cyan-400/20 transition-all"
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
                          : "bg-white/[0.05] text-gray-300 rounded-bl-md"
                      }`}
                    >
                      {text}
                    </div>
                  </div>
                );
              })}

              {isLoading &&
                messages.length > 0 &&
                messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="bg-white/[0.05] text-gray-400 px-4 py-2.5 rounded-2xl rounded-bl-md">
                      <Loader2 size={16} className="animate-spin" />
                    </div>
                  </div>
                )}

              {error && (
                <p className="text-red-400/80 text-xs text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="px-5 py-4 border-t border-white/[0.08]"
            >
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
                  className="p-2.5 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
