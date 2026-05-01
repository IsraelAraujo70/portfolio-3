import { getDb } from "./db";

export interface NoteRow {
  id: number;
  content: string;
  author: string;
  color: string;
  rotation: number;
  created_at: string;
}

const ALLOWED_COLORS = ["yellow", "pink", "green", "blue", "purple"] as const;
export type NoteColor = (typeof ALLOWED_COLORS)[number];

export function isValidColor(color: string): color is NoteColor {
  return ALLOWED_COLORS.includes(color as NoteColor);
}

export function getRecentNotes(limit = 20): NoteRow[] {
  const db = getDb();
  return db
    .prepare(
      "SELECT id, content, author, color, rotation, created_at FROM notes ORDER BY created_at DESC LIMIT ?",
    )
    .all(limit) as NoteRow[];
}

export function insertNote(note: {
  content: string;
  author: string;
  color: string;
  ipHash: string;
}): NoteRow {
  const db = getDb();
  const rotation = Math.round((Math.random() * 8 - 4) * 10) / 10;
  const result = db
    .prepare(
      "INSERT INTO notes (content, author, color, rotation, ip_hash) VALUES (?, ?, ?, ?, ?)",
    )
    .run(note.content, note.author, note.color, rotation, note.ipHash);

  return db
    .prepare(
      "SELECT id, content, author, color, rotation, created_at FROM notes WHERE id = ?",
    )
    .get(result.lastInsertRowid) as NoteRow;
}

export function countRecentByIp(ipHash: string, windowMinutes = 10): number {
  const db = getDb();
  const row = db
    .prepare(
      "SELECT COUNT(*) as count FROM notes WHERE ip_hash = ? AND created_at > datetime('now', ?)",
    )
    .get(ipHash, `-${windowMinutes} minutes`) as { count: number };
  return row.count;
}
