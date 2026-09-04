"use client";

import { useChat } from "@ai-sdk/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls, type UIMessage } from "ai";
import { parsePortfolioAction, type NavigatePortfolio } from "@/lib/portfolio-navigation";
import { projects } from "@/lib/resume-data";
import {
  CHAT_SESSION_STORAGE_KEY,
  parseStoredChatMessages,
} from "@/lib/chat-ux";

/** Maintains a tab-scoped conversation with streaming, cancellation, and retry. */
export function useAIChat(onNavigate?: NavigatePortfolio) {
  const suppressNextPersistRef = useRef(false);
  const handledTools = useRef(new Set<string>());
  const autoContinue = useRef(false);
  const requestEpoch = useRef(0);
  const transport = useMemo(() => new DefaultChatTransport({
    body: { desktopNavigation: Boolean(onNavigate) },
  }), [onNavigate]);
  const persistMessages = useCallback((messages: UIMessage[]) => {
    window.sessionStorage.setItem(
      CHAT_SESSION_STORAGE_KEY,
      JSON.stringify(messages),
    );
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
    addToolOutput,
  } = useChat({
    transport,
    experimental_throttle: 40,
    sendAutomaticallyWhen: (state) => autoContinue.current && lastAssistantMessageIsCompleteWithToolCalls(state),
    onToolCall: async ({ toolCall }) => {
      if (!autoContinue.current) return;
      if (handledTools.current.has(toolCall.toolCallId)) return;
      handledTools.current.add(toolCall.toolCallId);
      const epoch = requestEpoch.current;
      try {
        if (!onNavigate) throw new Error("Navigation is available in the desktop chat.");
        const action = parsePortfolioAction(toolCall.toolName, toolCall.input, projects);
        const output = await onNavigate(action);
        if (epoch !== requestEpoch.current) return;
        // Do not await: the SDK serializes tool output with the incoming stream.
        void addToolOutput({ tool: toolCall.toolName, toolCallId: toolCall.toolCallId, output });
      } catch (error) {
        if (epoch !== requestEpoch.current) return;
        void addToolOutput({
          tool: toolCall.toolName,
          toolCallId: toolCall.toolCallId,
          state: "output-error",
          errorText: error instanceof Error ? error.message : "Could not open this destination.",
        });
      }
    },
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

  useEffect(() => () => {
    autoContinue.current = false;
    requestEpoch.current += 1;
    void stop();
  }, [stop]);

  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const stored = parseStoredChatMessages(
      window.sessionStorage.getItem(CHAT_SESSION_STORAGE_KEY),
    );
    for (const message of stored) {
      for (const part of message.parts) {
        if ("toolCallId" in part) handledTools.current.add(part.toolCallId);
      }
    }
    if (stored.length > 0) setMessages(stored);
  }, [setMessages]);

  const handleSubmit = () => {
    const next = input.trim();
    if (!next || isLoading) return false;
    autoContinue.current = true;
    requestEpoch.current += 1;
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
    autoContinue.current = false;
    requestEpoch.current += 1;
    stop();
    setNotice("Response stopped. You can continue with another question.");
  };

  const handleRetry = () => {
    autoContinue.current = true;
    requestEpoch.current += 1;
    setNotice(null);
    clearError();
    void regenerate();
  };

  const handleNewConversation = () => {
    autoContinue.current = false;
    requestEpoch.current += 1;
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
