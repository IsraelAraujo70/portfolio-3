"use client";

import { useIsMobile } from "@/hooks/use-is-mobile";
import { Desktop } from "@/components/macos/desktop";
import { MobileWIP } from "@/components/mobile/mobile-wip";

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile) return <MobileWIP />;
  return <Desktop />;
}
