import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [page, proxy, mobilePage, desktopPage, desktop, ios, dock, windowChrome, mobileHome, appIcon, appFrame, homeIndicator, wallpaper, layout] = await Promise.all([
  read("src/app/page.tsx"),
  read("src/proxy.ts"),
  read("src/app/mobile/page.tsx"),
  read("src/app/desktop/page.tsx"),
  read("src/components/macos/desktop.tsx"),
  read("src/components/mobile/ios.tsx"),
  read("src/components/macos/dock.tsx"),
  read("src/components/macos/window-chrome.tsx"),
  read("src/components/mobile/home-screen.tsx"),
  read("src/components/mobile/app-icon.tsx"),
  read("src/components/mobile/app-frame.tsx"),
  read("src/components/mobile/home-indicator.tsx"),
  read("src/components/macos/desktop-wallpaper.tsx"),
  read("src/app/layout.tsx"),
]);

const criteria = [
  ["device-specific route bundles", proxy.includes("NextResponse.rewrite") && mobilePage.includes("<IOS />") && !mobilePage.includes("Desktop") && desktopPage.includes("<Desktop />") && !desktopPage.includes("IOS") && !page.includes("useIsMobile")],
  ["desktop optional windows split", desktop.includes("dynamic(") && desktop.includes('import("./terminal-window")')],
  ["mobile optional apps load on action", ios.includes("const launch = async") && ios.includes('await import("./apps/portfolio-app")') && !ios.includes("next/dynamic")],
  ["dock avoids pointer-driven React renders", !/mouseX|getBoundingClientRect|onMouseMove/.test(dock)],
  ["window blur is bounded", !/blur\((?:3[0-9]|[4-9][0-9]|\d{3,})px\)/.test(windowChrome)],
  ["LinkedIn icon is inline", !`${mobileHome}\n${dock}`.includes("linkedin-icon.svg")],
  ["mobile home paints without motion hydration", !/framer-motion|motion\./.test(`${appIcon}\n${ios}\n${appFrame}\n${homeIndicator}`)],
  ["wallpaper budget", wallpaper.includes("quality={55}") && wallpaper.includes('sizes="100vw"')],
  ["analytics deferred", layout.includes('strategy="lazyOnload"') && layout.includes("}, 8000)")],
  ["initial text uses system fonts", !layout.includes("next/font/google")],
];

const passed = criteria.filter(([, result]) => result).length;
for (const [name, result] of criteria) {
  console.log(`${result ? "PASS" : "FAIL"}: ${name}`);
}
console.log(`SCORE: ${passed}/${criteria.length}`);
console.log(`VERDICT: ${passed === criteria.length ? "PASS" : "FAIL"}`);

if (passed !== criteria.length) process.exitCode = 1;
