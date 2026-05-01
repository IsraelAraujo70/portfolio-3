import {
  personalInfo,
  skillCategories,
  experience,
  projects,
  openSourceContributions,
} from "./resume-data";

export interface CommandResult {
  output: string;
  isError?: boolean;
  action?: "clear" | "exit" | "tui";
  stream?: ReadableStream<Uint8Array>;
}

const MOTD = [
  "\x1b[38;5;245mWelcome to Israel's terminal.\x1b[0m",
  "",
  "\x1b[1mAvailable commands:\x1b[0m",
  "",
  "  \x1b[38;5;81mabout\x1b[0m        Learn about Israel",
  "  \x1b[38;5;81mskills\x1b[0m       Technical skills",
  "  \x1b[38;5;81mexperience\x1b[0m   Work experience",
  "  \x1b[38;5;81mprojects\x1b[0m     Personal projects",
  "  \x1b[38;5;81mopensource\x1b[0m   Open source contributions",
  "  \x1b[38;5;81mcontact\x1b[0m      Get in touch",
  "  \x1b[38;5;81mchat\x1b[0m         Interactive AI chat (TUI)",
  "  \x1b[38;5;81mchat <msg>\x1b[0m   Quick question to the AI",
  "  \x1b[38;5;81mclear\x1b[0m        Clear terminal",
  "  \x1b[38;5;81mexit\x1b[0m         Close terminal",
  "",
].join("\r\n");

const HELP_TEXT = [
  "\x1b[1mAvailable commands:\x1b[0m",
  "",
  "  \x1b[38;5;81mabout\x1b[0m        Learn about Israel",
  "  \x1b[38;5;81mskills\x1b[0m       Technical skills",
  "  \x1b[38;5;81mexperience\x1b[0m   Work experience",
  "  \x1b[38;5;81mprojects\x1b[0m     Personal projects",
  "  \x1b[38;5;81mopensource\x1b[0m   Open source contributions",
  "  \x1b[38;5;81mcontact\x1b[0m      Get in touch",
  "  \x1b[38;5;81mchat\x1b[0m         Interactive AI chat (TUI)",
  "  \x1b[38;5;81mchat <msg>\x1b[0m   Quick question to the AI",
  "  \x1b[38;5;81mclear\x1b[0m        Clear terminal",
  "  \x1b[38;5;81mexit\x1b[0m         Close terminal",
].join("\r\n");

function formatAbout(): string {
  return [
    `\x1b[1m${personalInfo.fullName}\x1b[0m`,
    `\x1b[38;5;245m${personalInfo.title} | ${personalInfo.location}\x1b[0m`,
    "",
    "Full Stack Engineer with 2+ years building production systems",
    "in Python, TypeScript, Go & Rust.",
    "",
    "Open source contributor to Zed Editor (23k+ stars).",
    "1,500+ commits in the last 7 months. 100 public repos.",
    "",
    "Currently open to international/remote opportunities.",
  ].join("\r\n");
}

function formatSkills(): string {
  return skillCategories
    .map(
      (c) =>
        `  \x1b[38;5;81m${c.name.padEnd(16)}\x1b[0m ${c.items.join(" \x1b[38;5;245m·\x1b[0m ")}`
    )
    .join("\r\n");
}

function formatExperience(): string {
  return experience
    .map(
      (job) =>
        [
          `\x1b[1m${job.company}\x1b[0m \x1b[38;5;245m—\x1b[0m ${job.role} \x1b[38;5;245m(${job.period})\x1b[0m`,
          ...job.highlights.slice(0, 3).map((h) => `  \x1b[38;5;81m▸\x1b[0m ${h}`),
        ].join("\r\n")
    )
    .join("\r\n\r\n");
}

function formatProjects(): string {
  return projects
    .map(
      (p, i) =>
        [
          `\x1b[1m${i + 1}. ${p.name}\x1b[0m \x1b[38;5;245m—\x1b[0m ${p.tagline}`,
          `   \x1b[38;5;245m${p.tech.join(", ")}\x1b[0m`,
          `   \x1b[4m${p.github}\x1b[0m`,
        ].join("\r\n")
    )
    .join("\r\n\r\n");
}

function formatOpenSource(): string {
  return openSourceContributions
    .map(
      (c) =>
        [
          `\x1b[1m${c.project}\x1b[0m${c.stars ? ` \x1b[33m★ ${c.stars}\x1b[0m` : ""} \x1b[38;5;245m—\x1b[0m ${c.language}`,
          ...c.prs.map((pr) => `  \x1b[38;5;81m▸\x1b[0m ${pr.title}`),
        ].join("\r\n")
    )
    .join("\r\n\r\n");
}

function formatContact(): string {
  return [
    `  \x1b[38;5;81mEmail\x1b[0m      ${personalInfo.email}`,
    `  \x1b[38;5;81mLinkedIn\x1b[0m   \x1b[4m${personalInfo.linkedin}\x1b[0m`,
    `  \x1b[38;5;81mGitHub\x1b[0m     \x1b[4m${personalInfo.github}\x1b[0m`,
  ].join("\r\n");
}

const COMMANDS: Record<string, () => CommandResult> = {
  help: () => ({ output: HELP_TEXT }),
  about: () => ({ output: formatAbout() }),
  skills: () => ({ output: formatSkills() }),
  experience: () => ({ output: formatExperience() }),
  projects: () => ({ output: formatProjects() }),
  opensource: () => ({ output: formatOpenSource() }),
  contact: () => ({ output: formatContact() }),
  clear: () => ({ output: "", action: "clear" }),
  exit: () => ({ output: "", action: "exit" }),
  quit: () => ({ output: "", action: "exit" }),
};

export function getMotd(): string {
  return MOTD;
}

export function getPrompt(): string {
  return "\x1b[38;5;81misrael\x1b[0m\x1b[38;5;245m@\x1b[0m\x1b[38;5;81mportfolio\x1b[0m \x1b[38;5;245m$\x1b[0m ";
}

export function executeCommand(input: string): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "" };

  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1).join(" ");

  if (command === "chat") {
    if (!args) {
      return { output: "", action: "tui" };
    }
    return startChat(args);
  }

  const handler = COMMANDS[command];
  if (handler) return handler();

  return {
    output: `\x1b[31mCommand not found: ${command}. Type 'help' for available commands.\x1b[0m`,
    isError: true,
  };
}

function startChat(query: string): CommandResult {
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        controller.enqueue(encoder.encode("\x1b[38;5;245mConnecting to AI...\x1b[0m"));
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Format": "text" },
          body: JSON.stringify({ messages: [{ role: "user", content: query }] }),
        });
        if (!response.ok) throw new Error("API error");
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No stream");

        controller.enqueue(encoder.encode("\r\x1b[2K"));

        const decoder = new TextDecoder();
        let fullText = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          controller.enqueue(encoder.encode("\r\x1b[2K" + fullText.replace(/\n/g, "\r\n")));
        }
        controller.enqueue(encoder.encode("\r\n"));
      } catch {
        controller.enqueue(encoder.encode("\r\n\x1b[31mFailed to connect to AI.\x1b[0m\r\n"));
      } finally {
        controller.close();
      }
    },
  });

  return { output: "", stream };
}
