"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { NavigatePortfolio, PortfolioTour, TourContext } from "@/lib/portfolio-navigation";

export interface ActiveTour {
  plan: PortfolioTour;
  index: number;
  paused: boolean;
  error: string | null;
}

/** Keep a generated route in this chat session; acknowledge stops only after navigation succeeds. */
export function usePortfolioTour(navigate?: NavigatePortfolio) {
  const [state, setState] = useState<ActiveTour | null>(null);
  const [busy, setBusy] = useState(false);
  const version = useRef(0);

  const visit = useCallback(async (plan: PortfolioTour, index: number) => {
    if (!navigate || !plan.steps[index]) throw new Error("This tour stop is unavailable.");
    const request = ++version.current;
    setBusy(true);
    try {
      const opened = await navigate(plan.steps[index].destination);
      if (request !== version.current) throw new Error("Tour navigation was cancelled.");
      setState({ plan, index, paused: false, error: null });
      return { title: plan.title, stops: plan.steps.length, opened: opened.title };
    } catch (error) {
      if (request === version.current) {
        setState((previous) => previous && { ...previous, paused: true, error: "Couldn't open this stop. Try resuming the tour." });
      }
      throw error;
    } finally {
      if (request === version.current) setBusy(false);
    }
  }, [navigate]);

  const start = useCallback((plan: PortfolioTour) => visit(plan, 0), [visit]);

  const goTo = async (index: number) => {
    if (!state || busy || index < 0 || index >= state.plan.steps.length) return;
    try { await visit(state.plan, index); } catch { /* The card displays the navigation error. */ }
  };

  const pause = useCallback(() => {
    version.current += 1;
    setBusy(false);
    setState((previous) => previous && { ...previous, paused: true });
  }, []);

  const end = useCallback(() => {
    version.current += 1;
    setBusy(false);
    setState(null);
  }, []);

  useEffect(() => () => { version.current += 1; }, []);

  const context: TourContext | undefined = state ? {
    index: state.index,
    destinations: state.plan.steps.map((step) => step.destination),
  } : undefined;

  return { state, busy, context, start, goTo, pause, end };
}
