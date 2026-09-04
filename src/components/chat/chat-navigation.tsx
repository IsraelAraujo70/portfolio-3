"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import type { UIMessage } from "ai";
import { projects } from "@/lib/resume-data";
import { navigationResult, parsePortfolioAction, type NavigatePortfolio, type PortfolioAction } from "@/lib/portfolio-navigation";

/** Render navigation status; historical actions run only when the visitor clicks View again. */
export function ChatNavigation({ part, onNavigate }: {
  part: UIMessage["parts"][number];
  onNavigate?: NavigatePortfolio;
}) {
  const [reopening, setReopening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (part.type !== "tool-showProject" && part.type !== "tool-showSection") return null;
  if (!("state" in part)) return null;
  let action: PortfolioAction | undefined;
  try {
    action = parsePortfolioAction(part.type.slice(5), "input" in part ? part.input : undefined, projects);
  } catch {
    // Partial streamed arguments are not a usable destination yet.
  }
  const completed = part.state === "output-available";
  const failed = part.state === "output-error";
  const summary = action ? navigationResult(action, projects) : null;
  const reopen = async () => {
    if (!action || !onNavigate) return;
    setReopening(true);
    setError(null);
    try {
      await onNavigate(action);
    } catch {
      setError("Could not open this destination. Try again.");
    } finally {
      setReopening(false);
    }
  };

  return (
    <div className="mac-chat-navigation" role="status">
      <div className="mac-chat-navigation-title">
        {completed ? <Check size={14} /> : !failed ? <Loader2 size={14} className="animate-spin" /> : null}
        <strong>{failed ? "Couldn't open" : completed ? "Opened" : "Opening"}{summary ? ` · ${summary.title}` : " portfolio"}</strong>
      </div>
      {failed ? <p>{part.errorText}</p> : completed && summary && <p>{summary.detail}</p>}
      {action && onNavigate && (completed || failed) && (
        <button type="button" onClick={reopen} disabled={reopening}>
          <ArrowUpRight size={13} />{reopening ? "Opening…" : failed ? "Try again" : "View again"}
        </button>
      )}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
