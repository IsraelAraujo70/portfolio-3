"use client";

import { useState, useEffect } from "react";
import { Signal, Wifi, BatteryFull } from "lucide-react";

function useTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function StatusBar() {
  const time = useTime();
  return (
    <div className="fixed top-0 left-0 right-0 z-[70] pt-safe pl-safe pr-safe pointer-events-none select-none">
      <div className="h-11 flex items-center justify-between px-7 text-white text-[15px] font-semibold">
        <span className="tabular-nums" suppressHydrationWarning>
          {time || " "}
        </span>
        <div className="flex items-center gap-1.5">
          <Signal size={16} />
          <Wifi size={16} />
          <BatteryFull size={20} />
        </div>
      </div>
    </div>
  );
}
