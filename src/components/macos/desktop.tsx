"use client";

import { useReducer, useEffect, useCallback, useMemo, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DesktopWallpaper } from "./desktop-wallpaper";
import { FinderWindow } from "./finder-window";
import { TerminalWindow } from "./terminal-window";
import { ChatWindow } from "./chat-window";
import { Dock } from "./dock";
import { StickyNotesLayer, StickyNoteForm } from "./sticky-notes";
import { useDrag } from "@/hooks/use-drag";
import { useResize } from "@/hooks/use-resize";

type WindowId = "finder" | "terminal" | "chat";

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { w: number; h: number };
  preMaximize: { position: { x: number; y: number }; size: { w: number; h: number } } | null;
  zIndex: number;
}

interface State {
  windows: Record<WindowId, WindowState>;
  nextZ: number;
}

type Action =
  | { type: "OPEN"; id: WindowId }
  | { type: "CLOSE"; id: WindowId }
  | { type: "MINIMIZE"; id: WindowId }
  | { type: "RESTORE"; id: WindowId }
  | { type: "FOCUS"; id: WindowId }
  | { type: "MOVE"; id: WindowId; position: { x: number; y: number } }
  | { type: "RESIZE"; id: WindowId; rect: { x: number; y: number; w: number; h: number } }
  | { type: "MAXIMIZE"; id: WindowId }
  | { type: "SET_POSITIONS"; positions: Record<WindowId, { x: number; y: number }> }
  | { type: "SET_SIZE"; id: WindowId; size: { w: number; h: number } };

const DEFAULT_SIZES: Record<WindowId, { w: number; h: number }> = {
  finder: { w: 900, h: 700 },
  terminal: { w: 680, h: 420 },
  chat: { w: 400, h: 520 },
};

const INITIAL_STATE: State = {
  windows: {
    finder: {
      isOpen: true, isMinimized: false, isMaximized: false,
      position: { x: 80, y: 24 }, size: DEFAULT_SIZES.finder, preMaximize: null, zIndex: 10,
    },
    terminal: {
      isOpen: false, isMinimized: false, isMaximized: false,
      position: { x: 120, y: 100 }, size: DEFAULT_SIZES.terminal, preMaximize: null, zIndex: 11,
    },
    chat: {
      isOpen: false, isMinimized: false, isMaximized: false,
      position: { x: 600, y: 60 }, size: DEFAULT_SIZES.chat, preMaximize: null, zIndex: 12,
    },
  },
  nextZ: 13,
};

const MAXIMIZE_PADDING = 4;

function reducer(state: State, action: Action): State {
  if (action.type === "SET_POSITIONS") {
    const updated = { ...state.windows };
    for (const id of Object.keys(action.positions) as WindowId[]) {
      updated[id] = { ...updated[id], position: action.positions[id] };
    }
    return { ...state, windows: updated };
  }
  if (action.type === "SET_SIZE") {
    const win = state.windows[action.id];
    return {
      ...state,
      windows: { ...state.windows, [action.id]: { ...win, size: action.size } },
    };
  }
  if (action.type === "RESIZE") {
    const win = state.windows[action.id];
    return {
      ...state,
      windows: {
        ...state.windows,
        [action.id]: {
          ...win,
          position: { x: action.rect.x, y: action.rect.y },
          size: { w: action.rect.w, h: action.rect.h },
          isMaximized: false,
          preMaximize: null,
        },
      },
    };
  }
  if (action.type === "MAXIMIZE") {
    const win = state.windows[action.id];
    if (win.isMaximized && win.preMaximize) {
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...win,
            isMaximized: false,
            position: win.preMaximize.position,
            size: win.preMaximize.size,
            preMaximize: null,
            zIndex: state.nextZ,
          },
        },
        nextZ: state.nextZ + 1,
      };
    }
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    return {
      ...state,
      windows: {
        ...state.windows,
        [action.id]: {
          ...win,
          isMaximized: true,
          preMaximize: { position: win.position, size: win.size },
          position: { x: MAXIMIZE_PADDING, y: MAXIMIZE_PADDING },
          size: { w: vw - MAXIMIZE_PADDING * 2, h: vh - MAXIMIZE_PADDING * 2 - 56 },
          zIndex: state.nextZ,
        },
      },
      nextZ: state.nextZ + 1,
    };
  }

  const win = state.windows[action.id];
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...win, isOpen: true, isMinimized: false, zIndex: state.nextZ },
        },
        nextZ: state.nextZ + 1,
      };
    case "CLOSE":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...win, isOpen: false, isMinimized: false, isMaximized: false, preMaximize: null },
        },
      };
    case "MINIMIZE":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...win, isMinimized: true },
        },
      };
    case "RESTORE":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...win, isMinimized: false, zIndex: state.nextZ },
        },
        nextZ: state.nextZ + 1,
      };
    case "FOCUS":
      if (win.zIndex === state.nextZ - 1) return state;
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: { ...win, zIndex: state.nextZ },
        },
        nextZ: state.nextZ + 1,
      };
    case "MOVE":
      return {
        ...state,
        windows: {
          ...state.windows,
          [action.id]: {
            ...win,
            position: action.position,
            isMaximized: false,
            preMaximize: null,
          },
        },
      };
    default:
      return state;
  }
}

type Edge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const EDGE_CURSORS: Record<Edge, string> = {
  n: "ns-resize", s: "ns-resize",
  e: "ew-resize", w: "ew-resize",
  ne: "nesw-resize", sw: "nesw-resize",
  nw: "nwse-resize", se: "nwse-resize",
};

function ResizeHandles({
  rect,
  onResizeStart,
  onResizeMove,
  onResizeUp,
}: {
  rect: { x: number; y: number; w: number; h: number };
  onResizeStart: (e: React.PointerEvent, dir: Edge, rect: { x: number; y: number; w: number; h: number }) => void;
  onResizeMove: (e: React.PointerEvent) => void;
  onResizeUp: (e: React.PointerEvent) => void;
}) {
  const edges: { edge: Edge; className: string }[] = [
    { edge: "n", className: "absolute -top-1 left-2 right-2 h-2" },
    { edge: "s", className: "absolute -bottom-1 left-2 right-2 h-2" },
    { edge: "w", className: "absolute top-2 -left-1 w-2 bottom-2" },
    { edge: "e", className: "absolute top-2 -right-1 w-2 bottom-2" },
    { edge: "nw", className: "absolute -top-1 -left-1 w-3 h-3" },
    { edge: "ne", className: "absolute -top-1 -right-1 w-3 h-3" },
    { edge: "sw", className: "absolute -bottom-1 -left-1 w-3 h-3" },
    { edge: "se", className: "absolute -bottom-1 -right-1 w-3 h-3" },
  ];

  return (
    <>
      {edges.map(({ edge, className }) => (
        <div
          key={edge}
          className={className}
          style={{ cursor: EDGE_CURSORS[edge], zIndex: 50 }}
          onPointerDown={(e) => onResizeStart(e, edge, rect)}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
        />
      ))}
    </>
  );
}

function WindowWrapper({
  id,
  state,
  dispatch,
  children,
}: {
  id: WindowId;
  state: State;
  dispatch: React.Dispatch<Action>;
  children: (props: {
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
    onFocus: () => void;
    dragHandleProps: Record<string, unknown>;
    style: React.CSSProperties;
  }) => React.ReactNode;
}) {
  const win = state.windows[id];

  const onMove = useCallback(
    (pos: { x: number; y: number }) => dispatch({ type: "MOVE", id, position: pos }),
    [dispatch, id]
  );
  const onDragStart = useCallback(() => dispatch({ type: "FOCUS", id }), [dispatch, id]);

  const dragProps = useDrag({ onMove, onStart: onDragStart });

  const dragHandleProps = {
    onPointerDown: dragProps.onPointerDown,
    onPointerMove: dragProps.onPointerMove,
    onPointerUp: dragProps.onPointerUp,
    style: dragProps.style,
  };

  const onResize = useCallback(
    (rect: { x: number; y: number; w: number; h: number }) =>
      dispatch({ type: "RESIZE", id, rect }),
    [dispatch, id]
  );
  const onResizeStart = useCallback(() => dispatch({ type: "FOCUS", id }), [dispatch, id]);

  const resizeProps = useResize({ onResize, onStart: onResizeStart });

  if (!win.isOpen) return null;

  const wrapperStyle: React.CSSProperties = {
    left: win.position.x,
    top: win.position.y,
    width: win.size.w,
    height: win.size.h,
    zIndex: win.zIndex,
  };

  const rect = { x: win.position.x, y: win.position.y, w: win.size.w, h: win.size.h };

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.5, y: 300 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 300 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className="fixed"
          style={wrapperStyle}
        >
          {children({
            onClose: () => dispatch({ type: "CLOSE", id }),
            onMinimize: () => dispatch({ type: "MINIMIZE", id }),
            onMaximize: () => dispatch({ type: "MAXIMIZE", id }),
            onFocus: () => dispatch({ type: "FOCUS", id }),
            dragHandleProps,
            style: { width: "100%", height: "100%" },
          })}
          {!win.isMaximized && (
            <ResizeHandles
              rect={rect}
              onResizeStart={resizeProps.onPointerDown}
              onResizeMove={resizeProps.onPointerMove}
              onResizeUp={resizeProps.onPointerUp}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Desktop() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const notesRefetchRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const finderW = Math.min(vw * 0.76, vw - 160);
    const finderH = vh - 80;
    dispatch({
      type: "SET_POSITIONS",
      positions: {
        finder: { x: (vw - finderW) / 2, y: 24 },
        terminal: { x: vw * 0.08, y: vh * 0.15 },
        chat: { x: vw - 400 - vw * 0.05, y: vh * 0.12 },
      },
    });
    dispatch({ type: "SET_SIZE", id: "finder", size: { w: finderW, h: finderH } });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        e.preventDefault();
        const terminal = state.windows.terminal;
        if (!terminal.isOpen) {
          dispatch({ type: "OPEN", id: "terminal" });
        } else if (terminal.isMinimized) {
          dispatch({ type: "RESTORE", id: "terminal" });
        } else {
          dispatch({ type: "CLOSE", id: "terminal" });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.windows.terminal]);

  const handleDockTerminal = useCallback(() => {
    const terminal = state.windows.terminal;
    if (!terminal.isOpen) {
      dispatch({ type: "OPEN", id: "terminal" });
    } else if (terminal.isMinimized) {
      dispatch({ type: "RESTORE", id: "terminal" });
    } else {
      dispatch({ type: "MINIMIZE", id: "terminal" });
    }
  }, [state.windows.terminal]);

  const handleDockChat = useCallback(() => {
    const chat = state.windows.chat;
    if (!chat.isOpen) {
      dispatch({ type: "OPEN", id: "chat" });
    } else if (chat.isMinimized) {
      dispatch({ type: "RESTORE", id: "chat" });
    } else {
      dispatch({ type: "MINIMIZE", id: "chat" });
    }
  }, [state.windows.chat]);

  const handleDockFinder = useCallback(() => {
    const finder = state.windows.finder;
    if (!finder.isOpen) {
      dispatch({ type: "OPEN", id: "finder" });
    } else if (finder.isMinimized) {
      dispatch({ type: "RESTORE", id: "finder" });
    } else {
      dispatch({ type: "FOCUS", id: "finder" });
    }
  }, [state.windows.finder]);

  const openWindows = useMemo(
    () =>
      (Object.keys(state.windows) as WindowId[]).filter(
        (id) => state.windows[id].isOpen
      ),
    [state.windows]
  );

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <DesktopWallpaper />
      <StickyNotesLayer refetchRef={notesRefetchRef} />

      <WindowWrapper id="finder" state={state} dispatch={dispatch}>
        {({ onClose, onMinimize, onMaximize, onFocus, dragHandleProps, style }) => (
          <FinderWindow
            onOpenChat={() => dispatch({ type: "OPEN", id: "chat" })}
            onOpenTerminal={() => dispatch({ type: "OPEN", id: "terminal" })}
            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onFocus={onFocus}
            dragHandleProps={dragHandleProps}
            style={style}
          />
        )}
      </WindowWrapper>

      <WindowWrapper id="terminal" state={state} dispatch={dispatch}>
        {({ onClose, onMinimize, onMaximize, onFocus, dragHandleProps, style }) => (
          <TerminalWindow
            isOpen
            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onFocus={onFocus}
            dragHandleProps={dragHandleProps}
            style={style}
          />
        )}
      </WindowWrapper>

      <WindowWrapper id="chat" state={state} dispatch={dispatch}>
        {({ onClose, onMinimize, onMaximize, onFocus, dragHandleProps, style }) => (
          <ChatWindow
            isOpen
            onClose={onClose}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onFocus={onFocus}
            dragHandleProps={dragHandleProps}
            style={style}
          />
        )}
      </WindowWrapper>

      <StickyNoteForm
        isOpen={showNoteForm}
        onClose={() => setShowNoteForm(false)}
        onNoteAdded={() => notesRefetchRef.current?.()}
      />

      <Dock
        onToggleTerminal={handleDockTerminal}
        onToggleChat={handleDockChat}
        onClickFinder={handleDockFinder}
        onToggleNotes={() => setShowNoteForm((v) => !v)}
        openWindows={openWindows}
      />
    </div>
  );
}
