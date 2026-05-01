"use client";

import dynamic from "next/dynamic";
import { useIsMobile } from "@/hooks/use-is-mobile";

const Desktop = dynamic(
  () => import("@/components/macos/desktop").then((m) => ({ default: m.Desktop })),
  { ssr: false }
);

const IOS = dynamic(
  () => import("@/components/mobile/ios").then((m) => ({ default: m.IOS })),
  { ssr: false }
);

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile === null) return null;
  if (isMobile) return <IOS />;
  return <Desktop />;
}
