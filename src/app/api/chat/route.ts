import { streamText, convertToModelMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { systemPrompt } from "@/lib/resume-data";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = process.env.OPENROUTER_MODEL || "anthropic/claude-sonnet-4-20250514";
  const format = req.headers.get("x-format");

  const result = streamText({
    model: openrouter(model),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
  });

  if (format === "text") {
    return result.toTextStreamResponse();
  }

  return result.toUIMessageStreamResponse();
}
