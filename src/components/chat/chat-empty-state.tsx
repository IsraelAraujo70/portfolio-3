"use client";

import {
  BriefcaseBusiness,
  GitPullRequest,
  Globe2,
  Network,
  Sparkles,
} from "lucide-react";
import { chatSuggestions } from "@/lib/chat-ux";

const suggestionIcons = {
  experience: BriefcaseBusiness,
  projects: Network,
  opensource: GitPullRequest,
  availability: Globe2,
};

export function ChatEmptyState({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <div className="flex min-h-full flex-col justify-center px-5 py-10 sm:px-7">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid size-11 shrink-0 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Sparkles aria-hidden="true" className="size-5 text-cyan-300" />
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/70">
              Portfolio assistant
            </p>
            <p className="mt-0.5 text-xs text-slate-500">Read-only · grounded in Israel&apos;s work</p>
          </div>
        </div>

        <h2 className="max-w-sm text-2xl font-semibold leading-tight tracking-[-0.03em] text-white">
          What would you like to know about Israel?
        </h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
          Explore production experience, engineering decisions, selected work, and availability.
        </p>

        <div className="mt-7 flex flex-wrap gap-2" aria-label="Suggested questions">
          {chatSuggestions.map((suggestion) => {
            const Icon = suggestionIcons[suggestion.id];
            return (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => onPick(suggestion.prompt)}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.025] px-3 py-2 text-left text-[11px] text-slate-400 transition-colors hover:border-cyan-300/25 hover:bg-cyan-300/[0.04] hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
              >
                <Icon aria-hidden="true" className="size-3.5 text-cyan-300/65" />
                {suggestion.label}
              </button>
            );
          })}
        </div>

        <p className="mt-8 border-l border-cyan-300/25 pl-3 text-[10px] leading-4 text-slate-600">
          Suggestions fill the composer first, so you can edit the question before sending it.
        </p>
      </div>
    </div>
  );
}
