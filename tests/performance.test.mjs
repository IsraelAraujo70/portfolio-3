import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("renders the correct responsive shell on the server", async () => {
  const [page, proxy, mobile, desktop] = await Promise.all([
    read("src/app/page.tsx"),
    read("src/proxy.ts"),
    read("src/app/mobile/page.tsx"),
    read("src/app/desktop/page.tsx"),
  ]);

  assert.doesNotMatch(page, /^"use client"/);
  assert.doesNotMatch(page, /useIsMobile/);
  assert.match(proxy, /NextResponse\.rewrite/);
  assert.match(proxy, /mobile \? "\/mobile" : "\/desktop"/);
  assert.match(mobile, /<IOS\s*\/>/);
  assert.doesNotMatch(mobile, /Desktop/);
  assert.match(desktop, /<Desktop\s*\/>/);
  assert.doesNotMatch(desktop, /IOS/);
});

test("keeps expensive glass effects and pointer work out of hot paths", async () => {
  const files = await Promise.all([
    read("src/components/macos/window-chrome.tsx"),
    read("src/components/macos/dock.tsx"),
    read("src/components/macos/sections/finder-about.tsx"),
    read("src/components/macos/sections/finder-experience.tsx"),
    read("src/components/macos/sections/finder-projects.tsx"),
    read("src/components/macos/sections/finder-opensource.tsx"),
    read("src/components/macos/sections/finder-contact.tsx"),
    read("src/components/mobile/home-screen.tsx"),
  ]);
  const source = files.join("\n");
  const dock = files[1];

  assert.doesNotMatch(source, /blur\((?:3[0-9]|[4-9][0-9]|\d{3,})px\)/);
  assert.doesNotMatch(dock, /getBoundingClientRect|mouseX|onMouseMove/);
});

test("renders mobile home icons without hydration-dependent animation", async () => {
  const [appIcon, ios, appFrame, homeIndicator] = await Promise.all([
    read("src/components/mobile/app-icon.tsx"),
    read("src/components/mobile/ios.tsx"),
    read("src/components/mobile/app-frame.tsx"),
    read("src/components/mobile/home-indicator.tsx"),
  ]);

  assert.doesNotMatch(`${appIcon}\n${ios}\n${appFrame}\n${homeIndicator}`, /framer-motion|motion\./);
  assert.match(appIcon, /active:scale-\[0\.92\]/);
  assert.match(homeIndicator, /onPointerDown/);
});

test("defers optional code and third-party analytics", async () => {
  const [desktop, ios, layout] = await Promise.all([
    read("src/components/macos/desktop.tsx"),
    read("src/components/mobile/ios.tsx"),
    read("src/app/layout.tsx"),
  ]);

  assert.match(desktop, /dynamic\(/);
  assert.match(desktop, /import\("\.\/terminal-window"\)/);
  assert.match(desktop, /import\("\.\/chat-window"\)/);
  assert.match(ios, /const launch = async/);
  assert.match(ios, /await import\("\.\/apps\/portfolio-app"\)/);
  assert.doesNotMatch(ios, /next\/dynamic/);
  assert.doesNotMatch(ios, /\blazy\(/);
  assert.match(layout, /strategy="lazyOnload"/);
  assert.match(layout, /}, 8000\)/);
  assert.doesNotMatch(layout, /next\/font\/google/);
});

test("keeps above-the-fold images cheap and discoverable", async () => {
  const [wallpaper, mobileHome, dock] = await Promise.all([
    read("src/components/macos/desktop-wallpaper.tsx"),
    read("src/components/mobile/home-screen.tsx"),
    read("src/components/macos/dock.tsx"),
  ]);

  assert.match(wallpaper, /quality=\{55\}/);
  assert.match(wallpaper, /sizes="100vw"/);
  assert.doesNotMatch(`${mobileHome}\n${dock}`, /linkedin-icon\.svg/);
});
