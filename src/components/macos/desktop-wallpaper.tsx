"use client";

import Image from "next/image";

export function DesktopWallpaper() {
  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src="/wallpaper.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        quality={90}
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
