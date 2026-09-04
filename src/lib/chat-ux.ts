import type { UIMessage } from "ai";

export const CHAT_SESSION_STORAGE_KEY = "portfolio:israel-ai:messages:v1";

export const chatSuggestions = [
  {
    id: "experience",
    label: "Current role & impact",
    prompt: "What is Israel working on now, and what impact does he own?",
  },
  {
    id: "projects",
    label: "SocialTerminal",
    prompt: "Tell me about SocialTerminal and the decisions behind its SSH and web clients.",
  },
  {
    id: "opensource",
    label: "Open-source evidence",
    prompt: "What open-source contributions show Israel's engineering depth?",
  },
  {
    id: "availability",
    label: "Remote availability",
    prompt: "Is Israel available for international remote work, and what roles fit him best?",
  },
] as const;

export function getMessageText(parts: Array<{ type: string; text?: string }>): string {
  return parts
    .filter((part) => part.type === "text")
    .map((part) => part.text ?? "")
    .join("");
}

export function parseStoredChatMessages(raw: string | null): UIMessage[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((message): message is UIMessage => {
      if (!message || typeof message !== "object") return false;
      const candidate = message as Partial<UIMessage>;
      return (
        typeof candidate.id === "string" &&
        (candidate.role === "user" || candidate.role === "assistant") &&
        Array.isArray(candidate.parts)
      );
    });
  } catch {
    return [];
  }
}

export function isNearScrollEnd(
  metrics: Pick<HTMLElement, "scrollTop" | "clientHeight" | "scrollHeight">,
  threshold = 72,
): boolean {
  return metrics.scrollHeight - metrics.scrollTop - metrics.clientHeight <= threshold;
}

export function shouldSubmitChatKey(event: {
  key: string;
  shiftKey: boolean;
  isComposing: boolean;
}): boolean {
  return event.key === "Enter" && !event.shiftKey && !event.isComposing;
}
