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

export const DESKTOP_INSETS = { top: 44, right: 12, bottom: 100, left: 12 };

/** Reserve space for the menu bar and magnified Dock, including on short screens. */
export function desktopBounds({ width, height }: Viewport): Rect {
  return {
    x: DESKTOP_INSETS.left,
    y: DESKTOP_INSETS.top,
    w: Math.max(1, width - DESKTOP_INSETS.left - DESKTOP_INSETS.right),
    h: Math.max(1, height - DESKTOP_INSETS.top - DESKTOP_INSETS.bottom),
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
