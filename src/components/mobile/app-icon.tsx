"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface AppIconConfig {
  id: string;
  label: string;
  gradient: string;
  icon: ReactNode;
  onTap?: () => void;
  href?: string;
}

interface AppIconProps extends AppIconConfig {
  morphLayoutId?: string;
}

export function AppIcon({
  label,
  gradient,
  icon,
  onTap,
  href,
  morphLayoutId,
}: AppIconProps) {
  const tile = (
    <motion.div
      layoutId={morphLayoutId}
      className={`w-full aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center`}
      style={{
        borderRadius: "22%",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.15)",
      }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
    >
      {icon}
    </motion.div>
  );

  const labelEl = label ? (
    <span
      className="text-[11px] text-white mt-1.5 text-center select-none"
      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
    >
      {label}
    </span>
  ) : null;

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="flex flex-col items-center touch-manipulation w-full"
      >
        <motion.div whileTap={{ scale: 0.92 }} className="w-full">
          {tile}
        </motion.div>
        {labelEl}
      </a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onTap}
      whileTap={{ scale: 0.92 }}
      className="flex flex-col items-center touch-manipulation w-full"
    >
      {tile}
      {labelEl}
    </motion.button>
  );
}
