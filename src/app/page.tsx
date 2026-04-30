"use client";

import { useState, useEffect } from "react";
import { Background } from "@/components/background";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { OpenSource } from "@/components/open-source";
import { Contact } from "@/components/contact";
import { AIChat } from "@/components/ai-chat";
import { TerminalOverlay } from "@/components/terminal";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Background />
      <Navigation onToggleTerminal={() => setTerminalOpen((p) => !p)} />

      <main>
        <Hero onOpenChat={() => setChatOpen(true)} />
        <About />
        <Experience />
        <Projects />
        <OpenSource />
        <Contact />
      </main>

      <AIChat isOpen={chatOpen} onToggle={() => setChatOpen((p) => !p)} />
      <TerminalOverlay
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </>
  );
}
