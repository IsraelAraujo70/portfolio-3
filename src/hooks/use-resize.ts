"use client";

import { useRef, useCallback } from "react";

type Edge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface UseResizeOptions {
  onResize: (rect: { x: number; y: number; w: number; h: number }) => void;
  onStart?: () => void;
  minWidth?: number;
  minHeight?: number;
}

export function useResize({
  onResize,
  onStart,
  minWidth = 300,
  minHeight = 200,
}: UseResizeOptions) {
  const dragging = useRef(false);
  const edge = useRef<Edge>("se");
  const origin = useRef({ mx: 0, my: 0, x: 0, y: 0, w: 0, h: 0 });

  const onPointerDown = useCallback(
    (e: React.PointerEvent, dir: Edge, rect: { x: number; y: number; w: number; h: number }) => {
      e.stopPropagation();
      dragging.current = true;
      edge.current = dir;
      origin.current = { mx: e.clientX, my: e.clientY, ...rect };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      onStart?.();
    },
    [onStart]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - origin.current.mx;
      const dy = e.clientY - origin.current.my;
      const o = origin.current;
      let { x, y, w, h } = { x: o.x, y: o.y, w: o.w, h: o.h };

      const dir = edge.current;
      if (dir.includes("e")) w = Math.max(minWidth, o.w + dx);
      if (dir.includes("w")) {
        const newW = Math.max(minWidth, o.w - dx);
        x = o.x + (o.w - newW);
        w = newW;
      }
      if (dir.includes("s")) h = Math.max(minHeight, o.h + dy);
      if (dir.includes("n")) {
        const newH = Math.max(minHeight, o.h - dy);
        y = o.y + (o.h - newH);
        h = newH;
      }

      onResize({ x, y, w, h });
    },
    [onResize, minWidth, minHeight]
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp };
}
