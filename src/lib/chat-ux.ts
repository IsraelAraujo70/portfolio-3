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

/** Restore conversation history and settle interrupted navigation without executing it. */
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
    }).map((message) => ({
      ...message,
      parts: message.parts.map((part) => {
        if ((part.type === "tool-showProject" || part.type === "tool-showSection") &&
            "state" in part && part.state !== "output-available" && part.state !== "output-error") {
          return {
            type: part.type,
            toolCallId: part.toolCallId,
            input: part.input,
            state: "output-error" as const,
            errorText: "Navigation was interrupted. Ask again to open this destination.",
          };
        }
        return part;
      }),
    }));
  } catch {
    return [];
  }
}

/** End the navigation step after its result so the model explains instead of opening more windows. */
export function hasNavigationResult(messages: UIMessage[]): boolean {
  const lastUserIndex = messages.findLastIndex((message) => message.role === "user");
  return messages.slice(lastUserIndex + 1).some((message) =>
    message.parts.some((part) =>
      (part.type === "tool-showProject" || part.type === "tool-showSection") &&
      "state" in part && (part.state === "output-available" || part.state === "output-error")),
  );
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
