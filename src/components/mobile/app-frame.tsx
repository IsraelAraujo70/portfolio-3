"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AppFrameProps {
  morphLayoutId: string;
  gradient: string;
  children: ReactNode;
}

const SPRING = { type: "spring" as const, stiffness: 320, damping: 30 };

export function AppFrame({ morphLayoutId, gradient, children }: AppFrameProps) {
  return (
    <>
      <motion.div
        layoutId={morphLayoutId}
        className={`fixed inset-0 z-40 bg-gradient-to-br ${gradient}`}
        style={{ borderRadius: 0 }}
        transition={SPRING}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, delay: 0.18 }}
        className="fixed inset-0 z-40 overflow-hidden"
      >
        {children}
      </motion.div>
    </>
  );
}
