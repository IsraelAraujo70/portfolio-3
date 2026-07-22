"use client";

import { useRef } from "react";

interface HomeIndicatorProps {
  appOpen: boolean;
  onClose: () => void;
}

export function HomeIndicator({ appOpen, onClose }: HomeIndicatorProps) {
  const pointerStartY = useRef<number | null>(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[65] flex justify-center pointer-events-none">
      <button
        type="button"
        aria-label={appOpen ? "Close app" : "Home indicator"}
        onPointerDown={(event) => {
          pointerStartY.current = event.clientY;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          const startY = pointerStartY.current;
          pointerStartY.current = null;
          if (appOpen && startY !== null && event.clientY - startY < -40) {
            onClose();
          }
        }}
        onClick={() => appOpen && onClose()}
        className="pointer-events-auto px-12 pt-3 pb-1.5 touch-none cursor-pointer active:-translate-y-1 transition-transform"
      >
        <div className="w-32 h-[5px] rounded-full bg-white/95" />
      </button>
    </div>
  );
}
