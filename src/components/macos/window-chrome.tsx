"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WindowChromeProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  sidebar?: ReactNode;
  className?: string;
  dark?: boolean;
}

export function WindowChrome({
  title,
  icon,
  children,
  isOpen = true,
  onClose,
  sidebar,
  className = "",
  dark = false,
}: WindowChromeProps) {
  const [hoverTrafficLights, setHoverTrafficLights] = useState(false);

  if (!isOpen) return null;

  const glassClass = dark
    ? "bg-black/80 border border-white/[0.1]"
    : "liquid-glass";

  const blurStyle = {
    backdropFilter: "blur(80px) saturate(120%)",
    WebkitBackdropFilter: "blur(80px) saturate(120%)",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={blurStyle}
          className={`rounded-xl overflow-hidden flex flex-col ${glassClass} ${className}`}
        >
          <div
            className={`flex items-center h-12 px-4 border-b ${
              dark ? "border-white/[0.08]" : "border-white/[0.08]"
            } select-none shrink-0`}
          >
            <div
              className="flex items-center gap-2 mr-4"
              onMouseEnter={() => setHoverTrafficLights(true)}
              onMouseLeave={() => setHoverTrafficLights(false)}
            >
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center group"
              >
                {hoverTrafficLights && (
                  <svg viewBox="0 0 12 12" className="w-2 h-2">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="#4a0002" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </button>
              <button className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center">
                {hoverTrafficLights && (
                  <svg viewBox="0 0 12 12" className="w-2 h-2">
                    <path d="M2 6h8" stroke="#995700" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </button>
              <button className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center">
                {hoverTrafficLights && (
                  <svg viewBox="0 0 12 12" className="w-2 h-2">
                    <path d="M3 3l3 3-3 3M9 3l-3 3 3 3" stroke="#006500" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center gap-2">
              {icon}
              <span className={`text-xs ${dark ? "text-gray-400" : "text-white/60"}`}>
                {title}
              </span>
            </div>

            <div className="w-[52px]" />
          </div>

          <div className="flex flex-1 min-h-0 overflow-hidden">
            {sidebar && (
              <div className={`w-[200px] shrink-0 overflow-y-auto border-r ${
                dark ? "border-white/[0.06] bg-white/[0.02]" : "border-white/[0.06] bg-white/[0.03]"
              }`}>
                {sidebar}
              </div>
            )}
            <div className="flex-1 min-h-0 overflow-hidden">
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
