import { streamText, convertToModelMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { systemPrompt } from "@/lib/resume-data";
import { navigationInstructions, portfolioTools } from "@/lib/portfolio-tools";
import { hasNavigationResult } from "@/lib/chat-ux";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

/** Streams portfolio answers and cancels the model when the client disconnects. */
export async function POST(req: Request) {
  const { messages, desktopNavigation } = await req.json();

  const model = process.env.OPENROUTER_MODEL || "meta/muse-spark-1.3-contributor";
  const format = req.headers.get("x-format");
  const canNavigate = desktopNavigation === true && format !== "text";

  const modelMessages =
    format === "text" ? messages : await convertToModelMessages(messages, { ignoreIncompleteToolCalls: true });

  const result = streamText({
    model: openrouter.chat(model),
    system: systemPrompt + (canNavigate ? navigationInstructions : "\nInterface navigation is unavailable in this conversation. Answer in text; never claim to open or highlight content."),
    // Muse supports only automatic tool choice. Omit tools after navigation
    // so the next response explains the result instead of navigating again.
    tools: canNavigate && !hasNavigationResult(messages) ? portfolioTools : undefined,
    messages: modelMessages,
    abortSignal: req.signal,
  });

  if (format === "text") {
    return result.toTextStreamResponse();
  }

  return result.toUIMessageStreamResponse();
}
