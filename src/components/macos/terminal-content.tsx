"use client";

import { useRef, useEffect, useCallback, type CSSProperties } from "react";
import { getMotd, getPrompt, executeCommand } from "@/lib/terminal-sdk";
import { TerminalTUI } from "@/lib/terminal-tui";

interface TerminalContentProps {
  onExit: () => void;
  autoFocus?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function TerminalContent({
  onExit,
  autoFocus = true,
  className = "",
  style,
}: TerminalContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<import("@xterm/xterm").Terminal | null>(null);
  const fitAddonRef = useRef<import("@xterm/addon-fit").FitAddon | null>(null);
  const lineBuffer = useRef("");
  const streamingRef = useRef(false);
  const tuiRef = useRef<TerminalTUI | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  const handleInput = useCallback(async (term: import("@xterm/xterm").Terminal, input: string) => {
    if (!input.trim()) {
      term.write(getPrompt());
      return;
    }

    const result = executeCommand(input);

    if (result.action === "clear") {
      term.clear();
      term.write(getPrompt());
      return;
    }

    if (result.action === "exit") {
      onExitRef.current();
      return;
    }

    if (result.action === "tui") {
      tuiRef.current = new TerminalTUI({
        write: (data: string) => term.write(data),
        cols: term.cols,
        rows: term.rows,
        onExit: () => {
          tuiRef.current = null;
          term.write(getPrompt());
        },
      });
      return;
    }

    if (result.stream) {
      streamingRef.current = true;
      const reader = result.stream.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = new TextDecoder().decode(value);
          term.write(text);
        }
      } finally {
        streamingRef.current = false;
        term.write(getPrompt());
      }
      return;
    }

    if (result.output) {
      term.write(result.output + "\r\n");
    }
    term.write(getPrompt());
  }, []);

  const initTerminal = useCallback(async () => {
    if (!containerRef.current || termRef.current) return;

    const [{ Terminal }, { FitAddon }, { WebLinksAddon }] = await Promise.all([
      import("@xterm/xterm"),
      import("@xterm/addon-fit"),
      import("@xterm/addon-web-links"),
    ]);

    const fitAddon = new FitAddon();
    const term = new Terminal({
      cursorBlink: true,
      cursorStyle: "bar",
      fontSize: 13,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, monospace",
      lineHeight: 1.3,
      theme: {
        background: "transparent",
        foreground: "#d4d4d4",
        cursor: "#22d3ee",
        cursorAccent: "#0a0a0f",
        selectionBackground: "rgba(34, 211, 238, 0.25)",
        black: "#1e1e2e",
        red: "#f38ba8",
        green: "#a6e3a1",
        yellow: "#f9e2af",
        blue: "#89b4fa",
        magenta: "#cba6f7",
        cyan: "#22d3ee",
        white: "#d4d4d4",
        brightBlack: "#585b70",
        brightRed: "#f38ba8",
        brightGreen: "#a6e3a1",
        brightYellow: "#f9e2af",
        brightBlue: "#89b4fa",
        brightMagenta: "#cba6f7",
        brightCyan: "#22d3ee",
        brightWhite: "#ffffff",
      },
      allowTransparency: true,
      scrollback: 1000,
      convertEol: false,
    });

    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon());
    term.open(containerRef.current);
    fitAddon.fit();

    termRef.current = term;
    fitAddonRef.current = fitAddon;

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        try {
          fitAddon.fit();
          if (tuiRef.current) {
            tuiRef.current.resize(term.cols, term.rows);
          }
        } catch {}
      });
    });
    observer.observe(containerRef.current);
    resizeObserverRef.current = observer;

    term.write(getMotd());
    term.write(getPrompt());

    term.onData((data: string) => {
      if (tuiRef.current) {
        tuiRef.current.handleInput(data);
        return;
      }
      if (streamingRef.current) return;

      if (data === "\r") {
        term.write("\r\n");
        const input = lineBuffer.current;
        lineBuffer.current = "";
        handleInput(term, input);
      } else if (data === "\x7f" || data === "\b") {
        if (lineBuffer.current.length > 0) {
          lineBuffer.current = lineBuffer.current.slice(0, -1);
          term.write("\b \b");
        }
      } else if (data === "\x03") {
        lineBuffer.current = "";
        term.write("^C\r\n");
        term.write(getPrompt());
      } else if (data === "\x0c") {
        term.clear();
        term.write(getPrompt());
      } else if (data >= " ") {
        lineBuffer.current += data;
        term.write(data);
      }
    });

    term.onResize(({ cols, rows }) => {
      tuiRef.current?.resize(cols, rows);
    });
  }, [handleInput]);

  useEffect(() => {
    const timer = setTimeout(() => initTerminal(), 100);
    return () => {
      clearTimeout(timer);
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      termRef.current?.dispose();
      termRef.current = null;
      fitAddonRef.current = null;
      tuiRef.current = null;
    };
  }, [initTerminal]);

  useEffect(() => {
    if (!autoFocus) return;
    const t = setTimeout(() => {
      try {
        fitAddonRef.current?.fit();
      } catch {}
      termRef.current?.focus();
    }, 300);
    return () => clearTimeout(t);
  }, [autoFocus]);

  return (
    <div
      ref={containerRef}
      className={`min-h-0 px-1 py-1 ${className}`}
      style={style}
      onClick={() => termRef.current?.focus()}
    />
  );
}
