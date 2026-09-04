"use client";

import { ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react";
import type { ActiveTour } from "@/hooks/use-portfolio-tour";

/** Keep narration and manual tour controls visible while the conversation scrolls. */
export function ChatTour({ tour, busy, onGoTo, onEnd }: {
  tour: ActiveTour;
  busy: boolean;
  onGoTo: (index: number) => void;
  onEnd: () => void;
}) {
  const step = tour.plan.steps[tour.index];
  const last = tour.index === tour.plan.steps.length - 1;
  return (
    <section className="mac-chat-tour" aria-label="AI-guided tour">
      <div className="mac-chat-tour-header">
        <span><Sparkles size={13} />{tour.paused ? "Tour paused" : "AI tour"}</span>
        <span>{tour.index + 1} / {tour.plan.steps.length}</span>
        <button type="button" onClick={onEnd} aria-label="End tour"><X size={15} /></button>
      </div>
      <div className="mac-chat-tour-copy" aria-live="polite" aria-atomic="true">
        <span className="mac-chat-tour-name">{tour.plan.title}</span>
        <h2>{step.title}</h2>
        {!tour.paused && <p>{step.narration}</p>}
        {tour.paused && <p>Ask anything, change the focus, or resume where you left off.</p>}
        {tour.error && <p role="alert">{tour.error}</p>}
      </div>
      <div className="mac-chat-tour-controls">
        <button type="button" onClick={() => onGoTo(tour.index - 1)} disabled={busy || tour.index === 0}>
          <ArrowLeft size={14} /> Previous
        </button>
        {tour.paused ? (
          <button type="button" className="mac-chat-tour-next" onClick={() => onGoTo(tour.index)} disabled={busy}>
            Resume tour <ArrowRight size={14} />
          </button>
        ) : last ? (
          <button type="button" className="mac-chat-tour-next" onClick={onEnd}>Finish tour</button>
        ) : (
          <button type="button" className="mac-chat-tour-next" onClick={() => onGoTo(tour.index + 1)} disabled={busy}>
            Next <ArrowRight size={14} />
          </button>
        )}
      </div>
    </section>
  );
}
