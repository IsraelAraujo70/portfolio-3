"use client";

import { useChat } from "@ai-sdk/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { UIMessage } from "ai";
import {
  CHAT_SESSION_STORAGE_KEY,
  parseStoredChatMessages,
} from "@/lib/chat-ux";

export function useAIChat() {
  const suppressNextPersistRef = useRef(false);
  const persistMessages = useCallback((messages: UIMessage[]) => {
    window.sessionStorage.setItem(CHAT_SESSION_STORAGE_KEY, JSON.stringify(messages));
  }, []);

  const {
    messages,
    sendMessage,
    setMessages,
    status,
    error,
    stop,
    regenerate,
    clearError,
  } = useChat({
    experimental_throttle: 40,
    onFinish: ({ messages: completedMessages }) => {
      if (suppressNextPersistRef.current) {
        suppressNextPersistRef.current = false;
        return;
      }
      persistMessages(completedMessages);
    },
  });
  const [input, setInput] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hydratedRef = useRef(false);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const stored = parseStoredChatMessages(
      window.sessionStorage.getItem(CHAT_SESSION_STORAGE_KEY),
    );
    if (stored.length > 0) setMessages(stored);
  }, [setMessages]);

  const handleSubmit = () => {
    const next = input.trim();
    if (!next || isLoading) return false;
    setNotice(null);
    clearError();
    void sendMessage({ text: next });
    setInput("");
    return true;
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(text.length, text.length);
    });
  };

  const handleStop = () => {
    if (!isLoading) return;
    stop();
    setNotice("Response stopped. You can continue with another question.");
  };

  const handleRetry = () => {
    setNotice(null);
    clearError();
    void regenerate();
  };

  const handleNewConversation = () => {
    if (isLoading) {
      suppressNextPersistRef.current = true;
      stop();
    }
    setMessages([]);
    setInput("");
    setNotice(null);
    clearError();
    window.sessionStorage.removeItem(CHAT_SESSION_STORAGE_KEY);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    status,
    error,
    notice,
    inputRef,
    handleSubmit,
    handleSuggestion,
    handleStop,
    handleRetry,
    handleNewConversation,
  };
}
