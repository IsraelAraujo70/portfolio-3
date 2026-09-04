"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";

export const chatSuggestions = [
  "What's your experience with Rust?",
  "Tell me about SocialTerminal",
  "What open source work have you done?",
  "Are you available for remote work?",
];

/** Extracts the visible text from an AI SDK message, including streamed parts. */
export function getMessageText(
  parts: Array<{ type: string; text?: string }>,
): string {
  return parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("");
}

/** Shares streaming, cancellation, and scroll-following behavior across chat surfaces. */
export function useAIChat() {
  const { messages, sendMessage, status, error, stop, regenerate } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const followsBottom = useRef(true);
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (followsBottom.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  const handleScroll = () => {
    const element = scrollRef.current;
    if (element) {
      followsBottom.current =
        element.scrollHeight - element.scrollTop - element.clientHeight < 80;
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || isLoading) return;
    followsBottom.current = true;
    void sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSuggestion = (text: string) => {
    if (isLoading) return;
    followsBottom.current = true;
    void sendMessage({ text });
  };

  return {
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
  };
}
