"use client";

import { useMemo } from "react";

export function CalendarWidget() {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();
  const today = now.getDate();
  const dayOfWeek = now.toLocaleString("en-US", { weekday: "long" }).toUpperCase();

  const { days, startDay } = useMemo(() => {
    const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();
    const startDay = new Date(year, now.getMonth(), 1).getDay();
    return {
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      startDay,
    };
  }, [year, now.getMonth()]);

  return (
    <div className="liquid-glass rounded-2xl p-4 w-full">
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <p className="text-[10px] text-red-400 font-semibold">{dayOfWeek}</p>
          <p className="text-2xl font-light text-white">{today}</p>
        </div>
        <p className="text-[11px] text-white/40">
          {month} {year}
        </p>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="text-[9px] text-white/30 py-0.5">
            {d}
          </span>
        ))}
        {Array.from({ length: startDay }).map((_, i) => (
          <span key={`empty-${i}`} />
        ))}
        {days.map((day) => (
          <span
            key={day}
            className={`text-[10px] py-0.5 rounded-full ${
              day === today
                ? "bg-red-500 text-white font-medium"
                : "text-white/50"
            }`}
          >
            {day}
          </span>
        ))}
      </div>
    </div>
  );
}
