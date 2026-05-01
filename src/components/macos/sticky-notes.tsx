"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";

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

const COLORS = Object.keys(COLOR_MAP);

const COLOR_DOTS: Record<string, string> = {
  yellow: "bg-amber-300",
  pink: "bg-pink-300",
  green: "bg-emerald-300",
  blue: "bg-sky-300",
  purple: "bg-violet-300",
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

function getNotePosition(id: number, _index: number) {
  const seed = Math.imul(id, 2654435761) >>> 0;
  const x = 40 + ((seed % 1000) / 1000) * 65;
  const y = 5 + (((seed >>> 10) % 1000) / 1000) * 55;
  return { x, y };
}

function StickyNote({ note, index }: { note: Note; index: number }) {
  const colors = COLOR_MAP[note.color] || COLOR_MAP.yellow;
  const pos = getNotePosition(note.id, index);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`absolute w-44 ${colors.bg} ${colors.border} border rounded-sm shadow-md cursor-default select-none`}
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: `rotate(${note.rotation}deg)`,
        zIndex: 2,
      }}
    >
      <div className="flex justify-center pt-0">
        <div className={`w-10 h-3 ${colors.tape} rounded-b-sm -mt-px`} />
      </div>
      <div className="px-3 pb-2 pt-1">
        <p
          className="text-gray-800 text-sm leading-snug break-words"
          style={{ fontFamily: "var(--font-caveat), cursive" }}
        >
          {note.content}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span
            className="text-gray-500 text-xs"
            style={{ fontFamily: "var(--font-caveat), cursive" }}
          >
            — {note.author}
          </span>
          <span className="text-gray-400 text-[10px]">{timeAgo(note.created_at)}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function StickyNotesLayer({ refetchRef }: { refetchRef?: React.RefObject<(() => void) | null> }) {
  const [notes, setNotes] = useState<Note[]>([]);

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

  useEffect(() => {
    if (refetchRef) {
      refetchRef.current = fetchNotes;
    }
  }, [refetchRef, fetchNotes]);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      {notes.map((note, i) => (
        <StickyNote key={note.id} note={note} index={i} />
      ))}
    </div>
  );
}

export function StickyNoteForm({
  isOpen,
  onClose,
  onNoteAdded,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNoteAdded?: () => void;
}) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [color, setColor] = useState<string>("yellow");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          author: author.trim() || undefined,
          color,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setContent("");
        setAuthor("");
        setColor("yellow");
        onNoteAdded?.();
        setTimeout(() => {
          setStatus("idle");
          onClose();
        }, 1500);
      } else {
        const data = await res.json();
        setErrorMsg(data.message || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Failed to submit. Please try again.");
      setStatus("error");
    }
  };

  const colors = COLOR_MAP[color] || COLOR_MAP.yellow;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            style={{ zIndex: 55 }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 ${colors.bg} ${colors.border} border rounded-sm shadow-xl`}
            style={{ zIndex: 56 }}
          >
            <div className="flex justify-center">
              <div className={`w-12 h-3 ${colors.tape} rounded-b-sm -mt-px`} />
            </div>

            <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2">
              <div className="flex items-center justify-between mb-2">
                <h3
                  className="text-gray-700 font-semibold text-lg"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  Leave a note!
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={200}
                rows={4}
                placeholder="Write something nice..."
                className="w-full bg-transparent border-none outline-none resize-none text-gray-800 text-sm placeholder:text-gray-400"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              />
              <div className="text-right text-[10px] text-gray-400 -mt-1 mb-2">
                {content.length}/200
              </div>

              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={30}
                placeholder="Your name (optional)"
                className="w-full bg-white/40 rounded px-2 py-1 text-sm text-gray-700 placeholder:text-gray-400 outline-none mb-3"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              />

              <div className="flex items-center gap-2 mb-3">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-6 h-6 rounded-full ${COLOR_DOTS[c]} transition-all ${
                      color === c
                        ? "ring-2 ring-gray-500 ring-offset-1 scale-110"
                        : "hover:scale-110"
                    }`}
                  />
                ))}
              </div>

              {status === "success" && (
                <p
                  className="text-green-700 text-sm text-center mb-2"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  Note posted!
                </p>
              )}
              {status === "error" && (
                <p
                  className="text-red-600 text-xs text-center mb-2"
                  style={{ fontFamily: "var(--font-caveat), cursive" }}
                >
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={!content.trim() || status === "loading"}
                className="w-full py-1.5 rounded bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Checking...
                  </>
                ) : (
                  "Post note"
                )}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
