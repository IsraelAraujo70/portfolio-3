"use client";

import { Sun, Cloud, CloudRain, CloudSun } from "lucide-react";

const forecast = [
  { day: "Mon", icon: Sun, temp: "28" },
  { day: "Tue", icon: CloudSun, temp: "26" },
  { day: "Wed", icon: Cloud, temp: "24" },
  { day: "Thu", icon: CloudRain, temp: "22" },
  { day: "Fri", icon: Sun, temp: "27" },
];

export function WeatherWidget() {
  return (
    <div className="liquid-glass rounded-2xl p-4 w-full">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[11px] text-white/40 font-medium">Curitiba</p>
          <p className="text-3xl font-light text-white">26°</p>
        </div>
        <Sun size={32} className="text-yellow-300" />
      </div>
      <p className="text-[10px] text-white/40 mb-3">Mostly Sunny · H:30° L:18°</p>
      <div className="flex justify-between border-t border-white/[0.08] pt-2">
        {forecast.map(({ day, icon: Icon, temp }) => (
          <div key={day} className="flex flex-col items-center gap-1">
            <span className="text-[9px] text-white/40">{day}</span>
            <Icon size={14} className="text-white/60" />
            <span className="text-[10px] text-white/70">{temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}
