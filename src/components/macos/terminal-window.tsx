"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { WindowChrome } from "./window-chrome";
import {
  personalInfo,
  skillCategories,
  experience,
  projects,
  openSourceContributions,
} from "@/lib/resume-data";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string;
}

const HELP_TEXT = `
Available commands:
  about       Learn about Israel
  skills      Technical skills
  experience  Work experience
  projects    Personal projects
  opensource  Open source contributions
  contact     Get in touch
  chat <msg>  Ask the AI anything
  clear       Clear terminal
  exit        Close terminal
`.trim();

const ABOUT_TEXT = `
${personalInfo.fullName}
${personalInfo.title} | ${personalInfo.location}

Full Stack Engineer with 2+ years building production systems
in Python, TypeScript, Go & Rust.

Open source contributor to Zed Editor (23k+ stars).
1,500+ commits in the last 7 months. 100 public repos.

Currently open to international/remote opportunities.
`.trim();

function formatSkills(): string {
  return skillCategories
    .map((c) => `  ${c.name.padEnd(16)} ${c.items.join(" · ")}`)
    .join("\n");
}

function formatExperience(): string {
  return experience
    .map(
      (job) =>
        `${job.company} — ${job.role} (${job.period})\n${job.highlights
          .slice(0, 3)
          .map((h) => `  ▸ ${h}`)
          .join("\n")}`
    )
    .join("\n\n");
}

function formatProjects(): string {
  return projects
    .map(
      (p, i) =>
        `${i + 1}. ${p.name} — ${p.tagline}\n   ${p.tech.join(", ")}\n   ${p.github}`
    )
    .join("\n\n");
}

function formatOpenSource(): string {
  return openSourceContributions
    .map(
      (c) =>
        `${c.project}${c.stars ? ` (⭐ ${c.stars})` : ""} — ${c.language}\n${c.prs
          .map((pr) => `  ▸ ${pr.title}`)
          .join("\n")}`
    )
    .join("\n\n");
}

const CONTACT_TEXT = `
  Email     ${personalInfo.email}
  LinkedIn  ${personalInfo.linkedin}
  GitHub    ${personalInfo.github}
`.trim();

interface TerminalWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TerminalWindow({ isOpen, onClose }: TerminalWindowProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", content: "Welcome to Israel's terminal. Type 'help' for available commands." },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const addLine = useCallback((type: TerminalLine["type"], content: string) => {
    setLines((prev) => [...prev, { type, content }]);
  }, []);

  const handleChat = useCallback(async (query: string) => {
    setIsStreaming(true);
    addLine("system", "Connecting to AI...");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Format": "text" },
        body: JSON.stringify({ messages: [{ role: "user", content: query }] }),
      });
      if (!response.ok) throw new Error("API error");
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No stream");
      const decoder = new TextDecoder();
      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setLines((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.type === "system" && last?.content === "Connecting to AI...") {
            updated[updated.length - 1] = { type: "output", content: fullText };
          } else if (last?.type === "output") {
            updated[updated.length - 1] = { type: "output", content: fullText };
          } else {
            updated.push({ type: "output", content: fullText });
          }
          return updated;
        });
      }
    } catch {
      addLine("error", "Failed to connect to AI. Check your connection.");
    } finally {
      setIsStreaming(false);
    }
  }, [addLine]);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1).join(" ");
    addLine("input", `> ${cmd}`);
    switch (command) {
      case "help": addLine("output", HELP_TEXT); break;
      case "about": addLine("output", ABOUT_TEXT); break;
      case "skills": addLine("output", formatSkills()); break;
      case "experience": addLine("output", formatExperience()); break;
      case "projects": addLine("output", formatProjects()); break;
      case "opensource": addLine("output", formatOpenSource()); break;
      case "contact": addLine("output", CONTACT_TEXT); break;
      case "clear": setLines([]); break;
      case "exit": case "quit": onClose(); break;
      case "chat":
        if (!args) addLine("error", "Usage: chat <your question>");
        else handleChat(args);
        break;
      default:
        addLine("error", `Command not found: ${command}. Type 'help' for available commands.`);
    }
  }, [addLine, onClose, handleChat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <WindowChrome
          title="Terminal — israel@portfolio"
          isOpen={isOpen}
          onClose={onClose}
          dark
          className="fixed z-[45] w-[680px] max-w-[calc(100vw-2rem)] h-[420px] max-h-[calc(100vh-8rem)] top-[15%] left-[8%] flex flex-col shadow-2xl"
        >
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-5 py-3 font-mono text-sm space-y-1"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line.type === "input" && <span className="text-cyan-400">{line.content}</span>}
                {line.type === "output" && <span className="text-gray-300">{line.content}</span>}
                {line.type === "error" && <span className="text-red-400/80">{line.content}</span>}
                {line.type === "system" && <span className="text-gray-500">{line.content}</span>}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="px-5 py-3 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-cyan-400 shrink-0">{">"}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isStreaming}
                className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-gray-700"
                placeholder={isStreaming ? "Waiting for response..." : "Type a command..."}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </form>
        </WindowChrome>
      )}
    </AnimatePresence>
  );
}
