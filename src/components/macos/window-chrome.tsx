"use client";

import { type ReactNode, type CSSProperties } from "react";
import { motion } from "framer-motion";

interface WindowChromeProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
  dragHandleProps?: Record<string, unknown>;
  sidebar?: ReactNode;
  className?: string;
  dark?: boolean;
  style?: CSSProperties;
}

/** Shared glass frame; window movement and visibility are owned by Desktop. */
export function WindowChrome({
  title,
  icon,
  children,
  isOpen = true,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  dragHandleProps,
  sidebar,
  className = "",
  dark = false,
  style,
}: WindowChromeProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      data-window
      role="region"
      aria-label={title}
      style={style}
      className={`mac-window ${dark ? "mac-window-dark" : ""} ${sidebar ? "mac-window-with-sidebar" : ""} ${className}`}
      onPointerDown={onFocus}
    >
      <div className="mac-titlebar" {...dragHandleProps}>
        <div className="mac-traffic-lights">
          <button
            type="button"
            aria-label={`Close ${title}`}
            onClick={onClose}
            className="bg-[#ff5f57]"
          >
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="m3 3 6 6m0-6-6 6" stroke="#6b1310" strokeWidth="1.4" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={`Minimize ${title}`}
            onClick={onMinimize}
            className="bg-[#febc2e]"
          >
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 6h8" stroke="#825309" strokeWidth="1.4" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={`Toggle fullscreen ${title}`}
            onClick={onMaximize}
            className="bg-[#28c840]"
          >
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path
                d="M2 5V2h3m5 5v3H7M2 2l3 3m5 5L7 7"
                stroke="#0b6220"
                fill="none"
                strokeWidth="1.2"
              />
            </svg>
          </button>
        </div>
        <div className="mac-title">
          {icon}
          <span>{title}</span>
        </div>
        <div className="mac-titlebar-spacer" />
      </div>
      <div className="mac-window-body">
        {sidebar && <aside className="mac-window-sidebar">{sidebar}</aside>}
        <div className="mac-window-content">{children}</div>
      </div>
    </motion.div>
  );
}
