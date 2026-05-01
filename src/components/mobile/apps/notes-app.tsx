"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { StickyNoteForm } from "@/components/macos/sticky-notes";

interface Note {
  id: number;
  content: string;
  author: string;
  color: string;
  rotation: number;
  created_at: string;
}

const COLOR_MAP: Record<string, { bg: string; tape: string; border: string }> = {
  yellow: { bg: "bg-amber-100", tape: "bg-amber-300/80", border: "border-amber-200" },
  pink: { bg: "bg-pink-100", tape: "bg-pink-300/80", border: "border-pink-200" },
  green: { bg: "bg-emerald-100", tape: "bg-emerald-300/80", border: "border-emerald-200" },
  blue: { bg: "bg-sky-100", tape: "bg-sky-300/80", border: "border-sky-200" },
  purple: { bg: "bg-violet-100", tape: "bg-violet-300/80", border: "border-violet-200" },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await fetch("/api/notes");
      if (res.ok) {
        const data = await res.json();
        setNotes(data.notes);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div
      className="h-full w-full flex flex-col relative"
      style={{ background: "#fef9e7" }}
    >
      <div
        className="shrink-0 flex items-center justify-center h-12 border-b border-amber-300/30 bg-amber-100/70"
        style={{ marginTop: "calc(env(safe-area-inset-top) + 44px)" }}
      >
        <span className="text-amber-950 text-sm font-semibold">Notes</span>
      </div>

      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 90px)" }}
      >
        {notes.length === 0 && (
          <p className="text-center text-amber-950/50 text-sm pt-12">
            No notes yet. Be the first to leave one!
          </p>
        )}
        {notes.map((note, i) => {
          const c = COLOR_MAP[note.color] || COLOR_MAP.yellow;
          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              className={`${c.bg} ${c.border} border rounded-md shadow-sm`}
            >
              <div className="flex justify-center">
                <div className={`w-12 h-3 ${c.tape} rounded-b-sm -mt-px`} />
              </div>
              <div className="px-4 pb-3 pt-1">
                <p
                  className="text-gray-800 text-base leading-snug break-words"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  {note.content}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span
                    className="text-gray-500 text-sm"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                  >
                    — {note.author}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {timeAgo(note.created_at)}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowForm(true)}
        className="absolute right-5 z-50 w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center shadow-lg touch-manipulation"
        style={{ bottom: "calc(env(safe-area-inset-bottom) + 70px)" }}
      >
        <Plus size={28} className="text-white" />
      </motion.button>

      <StickyNoteForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onNoteAdded={fetchNotes}
      />
    </div>
  );
}
