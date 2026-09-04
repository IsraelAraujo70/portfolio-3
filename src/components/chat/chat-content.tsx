"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Loader2, Plus } from "lucide-react";
import { useAIChat } from "@/hooks/use-ai-chat";
import { getMessageText, isNearScrollEnd } from "@/lib/chat-ux";
import { ChatComposer } from "./chat-composer";
import type { NavigatePortfolio } from "@/lib/portfolio-navigation";
import { ChatEmptyState } from "./chat-empty-state";
import { ChatMessage } from "./chat-message";
import { ChatTour } from "./chat-tour";

/** T3Code-inspired chat that retains session history, retry, and reader-controlled scrolling. */
export function ChatContent({
  autoFocus = true,
  className = "",
  onNavigate,
  tourLaunchId,
  onTourLaunchHandled,
}: {
  autoFocus?: boolean;
  className?: string;
  onNavigate?: NavigatePortfolio;
  tourLaunchId?: string | null;
  onTourLaunchHandled?: (id: string) => void;
}) {
  const {
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
    tour,
    handleEndTour,
  } = useAIChat(onNavigate, tourLaunchId, onTourLaunchHandled);
  const scrollRef = useRef<HTMLDivElement>(null);
  const followsBottom = useRef(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (!autoFocus) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, [autoFocus, inputRef]);

  useEffect(() => {
    if (followsBottom.current && scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, status]);

  const lastMessage = messages.at(-1);
  const awaitingText =
    isLoading &&
    (!lastMessage ||
      lastMessage.role === "user" ||
      !getMessageText(lastMessage.parts));

  return (
    <div className={`mac-chat flex flex-col h-full min-h-0 ${className}`}>
      <header className="mac-chat-toolbar">
        <span>Israel AI</span>
        <button
          type="button"
          aria-label="Start a new conversation"
          title="New conversation"
          onClick={() => {
            handleNewConversation();
            followsBottom.current = true;
            setShowScrollButton(false);
          }}
        >
          <Plus size={15} />
          <span>New chat</span>
        </button>
      </header>
      {tour.state && (
        <ChatTour tour={tour.state} busy={isLoading || tour.busy} onGoTo={tour.goTo} onEnd={handleEndTour} />
      )}
      <div
        ref={scrollRef}
        onScroll={(event) => {
          const near = isNearScrollEnd(event.currentTarget);
          followsBottom.current = near;
          setShowScrollButton(!near);
        }}
        className="mac-chat-timeline"
        role="log"
        aria-label="Conversation"
        aria-live="polite"
      >
        <div className="mac-chat-thread">
          {messages.length === 0 && (
            <ChatEmptyState onPick={handleSuggestion} canNavigate={Boolean(onNavigate)} />
          )}
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              onNavigate={onNavigate}
              streaming={isLoading && index === messages.length - 1}
            />
          ))}
          {awaitingText && (
            <div className="mac-chat-thinking" role="status">
              <Loader2 size={14} className="animate-spin" />
              Thinking…
            </div>
          )}
          {error && (
            <div role="alert" className="mac-chat-error">
              Couldn&apos;t get a response.{" "}
              <button type="button" onClick={handleRetry}>
                Retry
              </button>
            </div>
          )}
          {notice && (
            <p role="status" className="mac-chat-notice">
              {notice}
            </p>
          )}
        </div>
      </div>
      <div className="mac-chat-form">
        {showScrollButton && messages.length > 0 && (
          <button
            type="button"
            className="mac-chat-latest"
            aria-label="Scroll to latest message"
            onClick={() => {
              followsBottom.current = true;
              setShowScrollButton(false);
              if (scrollRef.current)
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }}
          >
            <ArrowDown size={14} />
            Latest message
          </button>
        )}
        <ChatComposer
          draft={input}
          busy={isLoading}
          inputRef={inputRef}
          onDraftChange={setInput}
          onSubmit={() => {
            if (handleSubmit()) {
              followsBottom.current = true;
              setShowScrollButton(false);
            }
          }}
          onStop={handleStop}
        />
        <p className="mac-chat-disclaimer">
          AI assistant · Based on Israel&apos;s portfolio and résumé
        </p>
      </div>
    </div>
  );
}
