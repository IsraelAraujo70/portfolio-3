"use client";

import { useReducer, useEffect, useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DesktopWallpaper } from "./desktop-wallpaper";
import { FinderWindow } from "./finder-window";
import { TerminalWindow } from "./terminal-window";
import { ChatWindow } from "./chat-window";
import { Dock } from "./dock";
import { useDrag } from "@/hooks/use-drag";

type WindowId = "finder" | "terminal" | "chat";

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
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
  | { type: "SET_POSITIONS"; positions: Record<WindowId, { x: number; y: number }> };

const INITIAL_STATE: State = {
  windows: {
    finder: { isOpen: true, isMinimized: false, position: { x: 80, y: 24 }, zIndex: 10 },
    terminal: { isOpen: false, isMinimized: false, position: { x: 120, y: 100 }, zIndex: 11 },
    chat: { isOpen: false, isMinimized: false, position: { x: 600, y: 60 }, zIndex: 12 },
  },
  nextZ: 13,
};

function reducer(state: State, action: Action): State {
  if (action.type === "SET_POSITIONS") {
    const updated = { ...state.windows };
    for (const id of Object.keys(action.positions) as WindowId[]) {
      updated[id] = { ...updated[id], position: action.positions[id] };
    }
    return { ...state, windows: updated };
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
          [action.id]: { ...win, isOpen: false, isMinimized: false },
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
          [action.id]: { ...win, position: action.position },
        },
      };
    default:
      return state;
  }
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
  const onStart = useCallback(() => dispatch({ type: "FOCUS", id }), [dispatch, id]);

  const dragProps = useDrag({ onMove, onStart });

  const dragHandleProps = {
    onPointerDown: dragProps.onPointerDown,
    onPointerMove: dragProps.onPointerMove,
    onPointerUp: dragProps.onPointerUp,
    style: dragProps.style,
  };

  const posStyle: React.CSSProperties = {
    left: win.position.x,
    top: win.position.y,
    zIndex: win.zIndex,
  };

  if (!win.isOpen) return null;

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
          style={posStyle}
        >
          {children({
            onClose: () => dispatch({ type: "CLOSE", id }),
            onMinimize: () => dispatch({ type: "MINIMIZE", id }),
            onFocus: () => dispatch({ type: "FOCUS", id }),
            dragHandleProps,
            style: {},
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Desktop() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const finderW = Math.min(vw * 0.76, vw - 160);
    dispatch({
      type: "SET_POSITIONS",
      positions: {
        finder: { x: (vw - finderW) / 2, y: 24 },
        terminal: { x: vw * 0.08, y: vh * 0.15 },
        chat: { x: vw - 400 - vw * 0.05, y: vh * 0.12 },
      },
    });
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

  const [finderSize, setFinderSize] = useState({ w: 900, h: 700 });

  useEffect(() => {
    const update = () => {
      setFinderSize({
        w: Math.min(window.innerWidth * 0.76, window.innerWidth - 160),
        h: window.innerHeight - 80,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <DesktopWallpaper />

      <WindowWrapper id="finder" state={state} dispatch={dispatch}>
        {({ onClose, onMinimize, onFocus, dragHandleProps }) => (
          <FinderWindow
            onOpenChat={() => dispatch({ type: "OPEN", id: "chat" })}
            onOpenTerminal={() => dispatch({ type: "OPEN", id: "terminal" })}
            onClose={onClose}
            onMinimize={onMinimize}
            onFocus={onFocus}
            dragHandleProps={dragHandleProps}
            style={{ width: finderSize.w, height: finderSize.h }}
          />
        )}
      </WindowWrapper>

      <WindowWrapper id="terminal" state={state} dispatch={dispatch}>
        {({ onClose, onMinimize, onFocus, dragHandleProps }) => (
          <TerminalWindow
            isOpen
            onClose={onClose}
            onMinimize={onMinimize}
            onFocus={onFocus}
            dragHandleProps={dragHandleProps}
          />
        )}
      </WindowWrapper>

      <WindowWrapper id="chat" state={state} dispatch={dispatch}>
        {({ onClose, onMinimize, onFocus, dragHandleProps }) => (
          <ChatWindow
            isOpen
            onClose={onClose}
            onMinimize={onMinimize}
            onFocus={onFocus}
            dragHandleProps={dragHandleProps}
          />
        )}
      </WindowWrapper>

      <Dock
        onToggleTerminal={handleDockTerminal}
        onToggleChat={handleDockChat}
        onClickFinder={handleDockFinder}
        openWindows={openWindows}
      />
    </div>
  );
}
