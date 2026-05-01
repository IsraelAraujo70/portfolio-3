import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

const moderationSchema = z.object({
  decision: z.enum(["approved", "rejected"]),
});

export async function moderateNote(
  content: string,
  author: string,
): Promise<{ approved: boolean }> {
  const model = process.env.OPENROUTER_MODEL || "anthropic/claude-sonnet-4-20250514";

  const { object } = await generateObject({
    model: openrouter.chat(model),
    schema: moderationSchema,
    system: `You are a content moderator for sticky notes on a software engineer's portfolio website.
Respond with a JSON object containing a "decision" field set to "approved" or "rejected".

APPROVED if the note is:
- A friendly message, compliment, or greeting
- A professional comment about the portfolio
- A tech-related comment or joke
- A short, appropriate message a visitor might leave

REJECTED if the note is:
- Spam, advertising, or promotional
- Offensive, hateful, or inappropriate
- Contains personally identifying information (phone numbers, emails, addresses)
- Nonsensical character spam or gibberish
- Contains links or URLs
- An attempt to inject HTML/scripts`,
    prompt: `Note content: "${content}"\nAuthor name: "${author}"`,
  });

  return { approved: object.decision === "approved" };
}
