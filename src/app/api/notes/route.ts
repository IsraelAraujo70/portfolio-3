import { createHash } from "crypto";
import { getRecentNotes, insertNote, countRecentByIp, isValidColor } from "@/lib/notes";
import { moderateNote } from "@/lib/moderate";

export async function GET() {
  const notes = getRecentNotes(20);
  return Response.json({ notes });
}

export async function POST(req: Request) {
  const body = await req.json();
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const author = typeof body.author === "string" && body.author.trim() ? body.author.trim() : "Anonymous";
  const color = typeof body.color === "string" && isValidColor(body.color) ? body.color : "yellow";

  if (content.length < 1 || content.length > 200) {
    return Response.json(
      { error: "validation", message: "Content must be between 1 and 200 characters." },
      { status: 400 },
    );
  }

  if (author.length > 30) {
    return Response.json(
      { error: "validation", message: "Author name must be 30 characters or less." },
      { status: 400 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = createHash("sha256").update(ip).digest("hex");

  const recentCount = countRecentByIp(ipHash);
  if (recentCount >= 3) {
    return Response.json(
      { error: "rate_limited", message: "You've posted too many notes recently. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const { approved } = await moderateNote(content, author);
    if (!approved) {
      return Response.json(
        { error: "rejected", message: "Your note didn't pass moderation. Please keep it friendly and appropriate." },
        { status: 422 },
      );
    }
  } catch (err) {
    console.error("Moderation error:", err);
    return Response.json(
      { error: "service_unavailable", message: "Moderation service temporarily unavailable. Please try again." },
      { status: 503 },
    );
  }

  const note = insertNote({ content, author, color, ipHash });
  return Response.json({ note }, { status: 201 });
}
