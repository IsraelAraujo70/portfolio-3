"use client";

import { WeatherWidget } from "./widgets/weather";
import { CalendarWidget } from "./widgets/calendar";
import { MusicWidget } from "./widgets/music";
import { TogglesWidget } from "./widgets/toggles";

export function LeftWidgets() {
  return (
    <div className="hidden 2xl:flex flex-col gap-3 w-[280px] absolute left-4 top-10 bottom-[76px] py-2 overflow-y-auto">
      <WeatherWidget />
      <CalendarWidget />
    </div>
  );
}

export function RightWidgets() {
  return (
    <div className="hidden 2xl:flex flex-col gap-3 w-[280px] absolute right-4 top-10 bottom-[76px] py-2 overflow-y-auto">
      <TogglesWidget />
      <MusicWidget />
    </div>
  );
}
