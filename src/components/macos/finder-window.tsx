"use client";

import { useState, useRef, useEffect, useCallback, type CSSProperties } from "react";
import { WindowChrome } from "./window-chrome";
import { FinderSidebar } from "./finder-sidebar";
import { FinderHero } from "./sections/finder-hero";
import { FinderAbout } from "./sections/finder-about";
import { FinderExperience } from "./sections/finder-experience";
import { FinderProjects } from "./sections/finder-projects";
import { FinderOpenSource } from "./sections/finder-opensource";
import { FinderContact } from "./sections/finder-contact";

interface FinderWindowProps {
  onOpenChat: () => void;
  onOpenTerminal?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  dragHandleProps?: Record<string, unknown>;
  style?: CSSProperties;
}

const sectionIds = ["hero", "about", "experience", "projects", "opensource", "contact"];

export function FinderWindow({
  onOpenChat,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  dragHandleProps,
  style,
}: FinderWindowProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(`finder-${id}`);
    if (el && contentRef.current) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("finder-", "");
            setActiveSection(id);
          }
        }
      },
      {
        root: container,
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(`finder-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <WindowChrome
      title="Israel Araujo — Portfolio"
      icon={
        <img src="/dev-icon.svg" alt="" className="w-4 h-4" />
      }
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      onFocus={onFocus}
      dragHandleProps={dragHandleProps}
      style={style}
      className="flex flex-col w-full h-full"
      sidebar={
        <FinderSidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />
      }
    >
      <div ref={contentRef} className="overflow-y-auto h-full scroll-smooth">
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
    </WindowChrome>
  );
}
