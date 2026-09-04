"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type CSSProperties,
} from "react";
import { FolderOpen } from "lucide-react";
import { MotionConfig } from "framer-motion";
import { WindowChrome } from "./window-chrome";
import { FinderSidebar } from "./finder-sidebar";
import { FinderHero } from "./sections/finder-hero";
import { FinderAbout } from "./sections/finder-about";
import { FinderExperience } from "./sections/finder-experience";
import { FinderProjects } from "./sections/finder-projects";
import { FinderOpenSource } from "./sections/finder-opensource";
import { FinderContact } from "./sections/finder-contact";
import { navigationTarget, type NavigationRequest } from "@/lib/portfolio-navigation";

interface FinderWindowProps {
  onOpenChat: () => void;
  onOpenTerminal?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  dragHandleProps?: Record<string, unknown>;
  style?: CSSProperties;
  selectedProjectId?: string;
  onSelectProject?: (id: string) => void;
  navigation?: NavigationRequest | null;
  onNavigationComplete?: (id: string, success: boolean) => void;
}

const sectionIds = [
  "hero",
  "projects",
  "about",
  "experience",
  "opensource",
  "contact",
];

/** Scrollable portfolio hosted in the desktop window manager. */
export function FinderWindow({
  onOpenChat,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  dragHandleProps,
  style,
  selectedProjectId,
  onSelectProject,
  navigation,
  onNavigationComplete,
}: FinderWindowProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<{ element: HTMLElement; timer: ReturnType<typeof setTimeout> } | null>(null);

  useEffect(() => {
    if (!navigation) return;
    const element = document.getElementById(navigationTarget(navigation.action));
    if (!element || !contentRef.current?.contains(element)) {
      onNavigationComplete?.(navigation.id, false);
      return;
    }
    const previous = highlightRef.current;
    if (previous) {
      clearTimeout(previous.timer);
      previous.element.classList.remove("portfolio-ai-highlight");
    }
    // Finish scrolling before acknowledging the tool, including in background tabs.
    element.scrollIntoView({ behavior: "instant", block: "start" });
    element.classList.add("portfolio-ai-highlight");
    highlightRef.current = {
      element,
      timer: setTimeout(() => element.classList.remove("portfolio-ai-highlight"), 4000),
    };
    onNavigationComplete?.(navigation.id, true);
  }, [navigation, onNavigationComplete]);

  useEffect(() => () => {
    const highlight = highlightRef.current;
    if (highlight) {
      clearTimeout(highlight.timer);
      highlight.element.classList.remove("portfolio-ai-highlight");
    }
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(`finder-${id}`);
    if (el && contentRef.current) {
      el.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
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
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(`finder-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <WindowChrome
        title="Portfolio"
        icon={<FolderOpen size={17} className="text-mac-blue" />}
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
        <div
          ref={contentRef}
          className="portfolio-surface overflow-y-auto h-full"
        >
          <div id="finder-hero">
            <FinderHero onOpenChat={onOpenChat} />
          </div>
          <div id="finder-projects">
            <FinderProjects selectedProjectId={selectedProjectId} onSelectProject={onSelectProject} />
          </div>
          <div id="finder-about">
            <FinderAbout />
          </div>
          <div id="finder-experience">
            <FinderExperience />
          </div>
          <div id="finder-opensource">
            <FinderOpenSource />
          </div>
          <div id="finder-contact">
            <FinderContact />
          </div>
        </div>
      </WindowChrome>
    </MotionConfig>
  );
}
