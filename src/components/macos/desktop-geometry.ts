interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
interface Viewport {
  width: number;
  height: number;
}

/** Reserve space for the menu bar and magnified Dock, including on short screens. */
export function desktopBounds({ width, height }: Viewport): Rect {
  return {
    x: 12,
    y: 44,
    w: Math.max(1, width - 24),
    h: Math.max(1, height - 144),
  };
}

/** Keep the whole window reachable after dragging, resizing, or a viewport change. */
export function fitToDesktop(rect: Rect, viewport: Viewport): Rect {
  const bounds = desktopBounds(viewport);
  const w = Math.min(rect.w, bounds.w);
  const h = Math.min(rect.h, bounds.h);
  return {
    x: Math.max(bounds.x, Math.min(rect.x, bounds.x + bounds.w - w)),
    y: Math.max(bounds.y, Math.min(rect.y, bounds.y + bounds.h - h)),
    w,
    h,
  };
}
