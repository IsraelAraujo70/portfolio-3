"use client";

import { Play, SkipBack, SkipForward } from "lucide-react";

export function MusicWidget() {
  return (
    <div className="liquid-glass rounded-2xl p-4 w-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center shrink-0">
          <span className="text-[10px] font-bold text-white/80">♪</span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-white truncate">Weights</p>
          <p className="text-[10px] text-white/40 truncate">Sampha</p>
        </div>
      </div>

      <div className="w-full h-0.5 bg-white/10 rounded-full mb-2">
        <div className="w-[35%] h-full bg-white/40 rounded-full" />
      </div>

      <div className="flex items-center justify-center gap-4">
        <button className="text-white/40 hover:text-white/70 transition-colors">
          <SkipBack size={14} />
        </button>
        <button className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">
          <Play size={12} fill="currentColor" />
        </button>
        <button className="text-white/40 hover:text-white/70 transition-colors">
          <SkipForward size={14} />
        </button>
      </div>
    </div>
  );
}
