"use client";

import { motion, type PanInfo } from "framer-motion";

interface HomeIndicatorProps {
  appOpen: boolean;
  onClose: () => void;
}

export function HomeIndicator({ appOpen, onClose }: HomeIndicatorProps) {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (appOpen && info.offset.y < -40) onClose();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[65] flex justify-center pointer-events-none">
      <motion.div
        drag="y"
        dragConstraints={{ top: -120, bottom: 0 }}
        dragElastic={{ top: 0.6, bottom: 0 }}
        dragSnapToOrigin
        onDragEnd={handleDragEnd}
        onTap={() => {
          if (appOpen) onClose();
        }}
        className="pointer-events-auto px-12 pt-3 pb-1.5 touch-none cursor-pointer"
      >
        <div className="w-32 h-[5px] rounded-full bg-white/95" />
      </motion.div>
    </div>
  );
}
