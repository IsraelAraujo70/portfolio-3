"use client";

import { useEffect, useState } from "react";
import type { UIMessage } from "ai";
import { Check, Copy, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getMessageText } from "@/lib/chat-ux";

const markdownComponents = {
  a: ({ children, href }: React.ComponentPropsWithoutRef<"a">) =>
    href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-300 underline decoration-cyan-300/35 underline-offset-2 hover:decoration-cyan-300"
      >
        {children}
      </a>
    ) : (
      <span>{children}</span>
    ),
  blockquote: ({ children }: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-3 border-l border-cyan-300/30 pl-3 text-slate-400">
      {children}
    </blockquote>
  ),
  code: ({ children, className }: React.ComponentPropsWithoutRef<"code">) => (
    <code className={`${className ?? ""} rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[0.86em] text-cyan-100`}>
      {children}
    </code>
  ),
  h1: ({ children }: React.ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mb-2 mt-4 text-lg font-semibold text-white">{children}</h1>
  ),
  h2: ({ children }: React.ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mb-2 mt-4 text-base font-semibold text-white">{children}</h2>
  ),
  h3: ({ children }: React.ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mb-1 mt-3 text-sm font-semibold text-white">{children}</h3>
  ),
  ol: ({ children }: React.ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-2 list-decimal space-y-1.5 pl-5 marker:text-cyan-300/60">{children}</ol>
  ),
  p: ({ children }: React.ComponentPropsWithoutRef<"p">) => (
    <p className="my-2 first:mt-0 last:mb-0">{children}</p>
  ),
  pre: ({ children }: React.ComponentPropsWithoutRef<"pre">) => (
    <pre className="my-3 overflow-x-auto rounded-xl border border-white/[0.08] bg-black/25 p-3 text-xs [&>code]:bg-transparent [&>code]:p-0">
      {children}
    </pre>
  ),
  table: ({ children }: React.ComponentPropsWithoutRef<"table">) => (
    <div className="my-3 overflow-x-auto">
      <table className="w-full border-collapse text-left text-xs [&_td]:border [&_td]:border-white/10 [&_td]:p-2 [&_th]:border [&_th]:border-white/10 [&_th]:bg-white/[0.04] [&_th]:p-2">
        {children}
      </table>
    </div>
  ),
  ul: ({ children }: React.ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-2 list-disc space-y-1.5 pl-5 marker:text-cyan-300/60">{children}</ul>
  ),
};

export function ChatMessage({ message, streaming = false }: { message: UIMessage; streaming?: boolean }) {
  const [copied, setCopied] = useState(false);
  const text = getMessageText(message.parts);
  const user = message.role === "user";

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  if (!text) return null;

  if (user) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[88%] whitespace-pre-wrap rounded-2xl rounded-br-md border border-cyan-300/15 bg-cyan-300/[0.11] px-4 py-2.5 text-sm leading-6 text-cyan-50">
          {text}
        </div>
      </div>
    );
  }

  return (
    <article className="group relative pl-4">
      <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-cyan-300/70 via-cyan-300/20 to-transparent" />
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan-300/65">
          <Sparkles aria-hidden="true" className="size-3" />
          Israel AI
        </div>
        {!streaming ? (
          <button
            type="button"
            aria-label={copied ? "Response copied" : "Copy response"}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(text);
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[9px] text-slate-600 opacity-0 transition hover:bg-white/[0.05] hover:text-slate-300 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 group-hover:opacity-100"
          >
            {copied ? <Check aria-hidden="true" className="size-3" /> : <Copy aria-hidden="true" className="size-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        ) : null}
      </div>
      <div className="min-w-0 break-words text-sm leading-6 text-slate-300">
        <ReactMarkdown components={markdownComponents} remarkPlugins={[remarkGfm]}>
          {text}
        </ReactMarkdown>
        {streaming ? (
          <span role="status" aria-label="Response streaming" className="mt-2 inline-block size-1.5 animate-pulse rounded-full bg-cyan-300" />
        ) : null}
      </div>
    </article>
  );
}
