import { test } from "node:test";
import assert from "node:assert/strict";
import { desktopBounds, fitToDesktop } from "./desktop-geometry";

test("fullscreen leaves both the menu and Dock reachable", () => {
  const viewport = { width: 1366, height: 768 };
  const bounds = desktopBounds(viewport);
  assert.ok(bounds.y >= 32);
  assert.ok(bounds.y + bounds.h <= viewport.height - 90);
  assert.ok(bounds.x + bounds.w <= viewport.width);
});

test("oversized and offscreen windows fit a smaller desktop", () => {
  const viewport = { width: 800, height: 600 };
  const result = fitToDesktop({ x: 900, y: -20, w: 1100, h: 700 }, viewport);
  assert.deepEqual(result, desktopBounds(viewport));
});

test("resizing the viewport preserves a window that already fits", () => {
  const rect = { x: 60, y: 70, w: 500, h: 300 };
  assert.deepEqual(fitToDesktop(rect, { width: 1280, height: 800 }), rect);
});
