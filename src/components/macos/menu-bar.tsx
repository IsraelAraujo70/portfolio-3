"use client";

import { useState, useEffect } from "react";
import { Wifi, Battery, Search, Volume2 } from "lucide-react";

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date())
      );
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return <span className="text-[13px] text-white/90">{time}</span>;
}

export function MenuBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-7 flex items-center justify-between px-4 liquid-glass-heavy select-none"
      style={{ borderTop: "none", borderLeft: "none", borderRight: "none", borderRadius: 0 }}
    >
      <div className="flex items-center gap-5">
        <svg viewBox="0 0 814 1000" className="w-[14px] h-[14px]" fill="white">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.3-81.4-105.1-211-105.1-334.4C-0.6 382.4 42.9 252 125.3 183c54.7-46 109.6-69.4 166.4-69.4 62 0 113.4 40.8 174 40.8 56.6 0 100.7-40.8 174-40.8 56.6 0 107.9 20.7 155.5 59.5C778.9 183.9 793.9 337.8 788.1 340.9z M554.1 0c3.2 42.8-12.4 85.5-37.5 117.9-28.3 36.2-74.6 64.2-120.2 64.2-3.8 0-7.6-.3-11.4-.9-1.3-5.4-2.2-11.4-2.2-17.3 0-41.5 15.5-86.1 42.8-117.3 13.6-16.1 34.9-31.5 56.9-43.4C504.7 15.5 530.4 3.8 554.1 0z"/>
        </svg>
        <span className="text-[13px] font-semibold text-white/90">Finder</span>
        <span className="text-[13px] text-white/60">File</span>
        <span className="text-[13px] text-white/60">Edit</span>
        <span className="text-[13px] text-white/60">View</span>
        <span className="text-[13px] text-white/60">Go</span>
        <span className="text-[13px] text-white/60">Window</span>
        <span className="text-[13px] text-white/60">Help</span>
      </div>

      <div className="flex items-center gap-3">
        <Battery size={16} className="text-white/70" />
        <Wifi size={14} className="text-white/70" />
        <Volume2 size={14} className="text-white/70" />
        <Search size={14} className="text-white/70" />
        <Clock />
      </div>
    </div>
  );
}
