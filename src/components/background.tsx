"use client";

import { useEffect, useState } from "react";

export function Background() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] -left-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] animate-float" />
        <div className="absolute top-[60%] right-[5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] animate-float-delayed" />
        <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[150px] animate-float-slow" />
        <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] animate-float-delayed" />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(34, 211, 238, 0.04), transparent 80%)`,
        }}
      />
    </>
  );
}
