"use client";

import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowDown,
  LoaderCircle,
  Plus,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useAIChat } from "@/hooks/use-ai-chat";
import { isNearScrollEnd } from "@/lib/chat-ux";
import { ChatComposer } from "./chat-composer";
import { ChatEmptyState } from "./chat-empty-state";
import { ChatMessage } from "./chat-message";

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
    status,
    error,
    notice,
    inputRef,
    handleSubmit,
    handleSuggestion,
    handleStop,
    handleRetry,
    handleNewConversation,
  } = useAIChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  const stickToBottomRef = useRef(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [composerHeight, setComposerHeight] = useState(112);

  const scrollToLatest = (behavior: ScrollBehavior = "smooth") => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stickToBottomRef.current = true;
    setShowScrollButton(false);
    endRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : behavior, block: "end" });
  };

  useEffect(() => {
    if (!autoFocus) return;
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 250);
    return () => window.clearTimeout(timeout);
  }, [autoFocus, inputRef]);

  useEffect(() => {
    const composer = composerRef.current;
    if (!composer) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setComposerHeight(entry.contentRect.height);
    });
    observer.observe(composer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!stickToBottomRef.current) return;
    const frame = requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
    });
    return () => cancelAnimationFrame(frame);
  }, [messages, status]);

  const submitAndFollow = () => {
    if (!handleSubmit()) return;
    stickToBottomRef.current = true;
    setShowScrollButton(false);
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }));
  };

  return (
    <div className={`flex h-full min-h-0 flex-col bg-[#0d1117] ${className}`}>
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-white/[0.07] px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="relative grid size-8 shrink-0 place-items-center rounded-xl border border-cyan-300/15 bg-cyan-300/[0.06]">
            <Sparkles aria-hidden="true" className="size-4 text-cyan-300" />
            <span aria-hidden="true" className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full border-2 border-[#0d1117] bg-emerald-400" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-medium text-white">Israel AI</h2>
            <p className="truncate text-[10px] text-slate-500">Portfolio-grounded answers</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            handleNewConversation();
            stickToBottomRef.current = true;
            setShowScrollButton(false);
          }}
          aria-label="Start a new conversation"
          title="New conversation"
          className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
        >
          <Plus aria-hidden="true" className="size-4" />
        </button>
      </header>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={(event) => {
            const nearEnd = isNearScrollEnd(event.currentTarget);
            stickToBottomRef.current = nearEnd;
            setShowScrollButton(!nearEnd);
          }}
          aria-label="Conversation messages"
          aria-busy={isLoading}
          className="h-full overflow-y-auto overscroll-contain px-5 [scrollbar-gutter:stable]"
        >
          <div
            className="mx-auto flex min-h-full w-full max-w-2xl flex-col"
            style={{ paddingBottom: composerHeight + 22 }}
          >
            {messages.length === 0 && !isLoading ? (
              <ChatEmptyState onPick={handleSuggestion} />
            ) : (
              <div className="space-y-6 py-6">
                {messages.map((message, index) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    streaming={
                      isLoading &&
                      message.role === "assistant" &&
                      index === messages.length - 1
                    }
                  />
                ))}

                {status === "submitted" ? (
                  <div role="status" className="flex items-center gap-2 pl-4 text-xs text-slate-500">
                    <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin text-cyan-300/70" />
                    Thinking through the portfolio...
                  </div>
                ) : null}

                {error ? (
                  <div role="alert" className="flex items-start justify-between gap-3 rounded-xl border border-red-400/15 bg-red-400/[0.05] p-3 text-xs text-red-200/75">
                    <div className="flex items-start gap-2">
                      <AlertCircle aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
                      <span>The response could not be completed. Your question is still here.</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-red-100 transition hover:bg-red-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/60"
                    >
                      <RotateCcw aria-hidden="true" className="size-3" />
                      Retry
                    </button>
                  </div>
                ) : null}

                {notice ? (
                  <p role="status" className="pl-4 text-xs text-slate-500">{notice}</p>
                ) : null}
              </div>
            )}
            <div ref={endRef} aria-hidden="true" className="h-px" />
          </div>
        </div>

        {showScrollButton && messages.length > 0 ? (
          <button
            type="button"
            onClick={() => scrollToLatest()}
            aria-label="Scroll to latest message"
            style={{ bottom: composerHeight + 10 }}
            className="absolute left-1/2 z-20 grid size-8 -translate-x-1/2 place-items-center rounded-full border border-white/10 bg-[#151b24] text-slate-400 shadow-lg transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
          >
            <ArrowDown aria-hidden="true" className="size-4" />
          </button>
        ) : null}

        <div
          ref={composerRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/95 via-70% to-transparent px-4 pb-4 pt-10"
        >
          <div className="pointer-events-auto mx-auto w-full max-w-2xl">
            <ChatComposer
              draft={input}
              busy={isLoading}
              inputRef={inputRef}
              onDraftChange={setInput}
              onSubmit={submitAndFollow}
              onStop={handleStop}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
