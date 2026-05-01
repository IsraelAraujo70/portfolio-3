"use client";

import { useRef, useCallback } from "react";

interface UseDragOptions {
  onMove: (pos: { x: number; y: number }) => void;
  onStart?: () => void;
}

export function useDrag({ onMove, onStart }: UseDragOptions) {
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      dragging.current = true;
      const el = e.currentTarget as HTMLElement;
      const parentEl = el.closest("[data-window]") as HTMLElement | null;
      const rect = parentEl
        ? parentEl.getBoundingClientRect()
        : el.getBoundingClientRect();
      offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      el.setPointerCapture(e.pointerId);
      onStart?.();
    },
    [onStart]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const x = Math.max(0, e.clientX - offset.current.x);
      const y = Math.max(0, e.clientY - offset.current.y);
      onMove({ x, y });
    },
    [onMove]
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    style: {
      cursor: "default",
      touchAction: "none" as const,
    },
  };
}
