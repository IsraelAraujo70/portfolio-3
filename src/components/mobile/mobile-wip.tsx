"use client";

import { Monitor, Smartphone, Construction } from "lucide-react";

export function MobileWIP() {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/wallpaper.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div
        style={{
          backdropFilter: "blur(80px)",
          WebkitBackdropFilter: "blur(80px)",
          background: "rgba(0, 0, 0, 0.45)",
        }}
        className="max-w-sm w-full rounded-3xl border border-white/15 p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
            <Construction size={32} className="text-cyan-400" />
          </div>
        </div>

        <h1 className="text-xl font-bold text-white mb-2">
          Work in Progress
        </h1>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          A versão mobile está sendo construída como uma experiência iOS-like.
          Por enquanto, recomendo acessar pelo computador.
        </p>

        <div className="flex items-center justify-center gap-3 text-gray-500 text-xs">
          <div className="flex items-center gap-1.5">
            <Monitor size={14} className="text-cyan-400" />
            <span>Desktop ready</span>
          </div>
          <span className="text-white/10">|</span>
          <div className="flex items-center gap-1.5">
            <Smartphone size={14} className="text-gray-600" />
            <span>Mobile em breve</span>
          </div>
        </div>

        <div className="mt-8">
          <img src="/dev-icon.svg" alt="" className="w-10 h-10 mx-auto opacity-40" />
        </div>
      </div>
    </div>
  );
}
