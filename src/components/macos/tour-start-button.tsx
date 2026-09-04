"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";

/** Launch an AI tour with a contained particle effect that respects reduced motion. */
export function TourStartButton({ onStart, preparing = false }: {
  onStart: () => void;
  preparing?: boolean;
}) {
  return (
    <button type="button" className="tour-start-button" onClick={onStart} disabled={preparing} aria-busy={preparing}>
      <span className="tour-start-particles" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => <i key={index} />)}
      </span>
      <Sparkles size={19} aria-hidden="true" />
      <span className="tour-start-label">{preparing ? "Preparing your tour…" : "Start AI tour"}</span>
      <span className="tour-start-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
    </button>
  );
}
