import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "notes.db");
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      content    TEXT NOT NULL,
      author     TEXT DEFAULT 'Anonymous',
      color      TEXT NOT NULL DEFAULT 'yellow',
      rotation   REAL NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')),
      ip_hash    TEXT NOT NULL
    )
  `);

  return db;
}
