"use client";

import { FinderHero } from "@/components/macos/sections/finder-hero";
import { FinderAbout } from "@/components/macos/sections/finder-about";
import { FinderExperience } from "@/components/macos/sections/finder-experience";
import { FinderProjects } from "@/components/macos/sections/finder-projects";
import { FinderOpenSource } from "@/components/macos/sections/finder-opensource";
import { FinderContact } from "@/components/macos/sections/finder-contact";

interface PortfolioAppProps {
  onOpenChat: () => void;
}

export function PortfolioApp({ onOpenChat }: PortfolioAppProps) {
  return (
    <div
      className="h-full w-full overflow-y-auto bg-[#0a0a0f]"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 44px)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 36px)",
      }}
    >
      <div id="finder-hero">
        <FinderHero onOpenChat={onOpenChat} />
      </div>
      <div id="finder-about">
        <FinderAbout />
      </div>
      <div id="finder-experience">
        <FinderExperience />
      </div>
      <div id="finder-projects">
        <FinderProjects />
      </div>
      <div id="finder-opensource">
        <FinderOpenSource />
      </div>
      <div id="finder-contact">
        <FinderContact />
      </div>
    </div>
  );
}
