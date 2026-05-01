"use client";

import { useState } from "react";
import { Wifi, Bluetooth, Moon, Send } from "lucide-react";

const toggleItems = [
  { id: "wifi", label: "Wi-Fi", icon: Wifi, defaultOn: true, color: "bg-blue-500" },
  { id: "bluetooth", label: "Bluetooth", icon: Bluetooth, defaultOn: true, color: "bg-blue-500" },
  { id: "focus", label: "Focus", icon: Moon, defaultOn: false, color: "bg-purple-500" },
  { id: "airdrop", label: "AirDrop", icon: Send, defaultOn: false, color: "bg-blue-500" },
];

export function TogglesWidget() {
  const [toggles, setToggles] = useState(
    Object.fromEntries(toggleItems.map((t) => [t.id, t.defaultOn]))
  );

  return (
    <div className="liquid-glass rounded-2xl p-3 w-full">
      <div className="grid grid-cols-2 gap-2">
        {toggleItems.map(({ id, label, icon: Icon, color }) => {
          const on = toggles[id];
          return (
            <button
              key={id}
              onClick={() => setToggles((p) => ({ ...p, [id]: !p[id] }))}
              className={`flex items-center gap-2 p-2.5 rounded-xl transition-all ${
                on ? "bg-white/[0.12]" : "bg-white/[0.04]"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  on ? color : "bg-white/10"
                }`}
              >
                <Icon size={13} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-medium text-white/80">{label}</p>
                <p className="text-[9px] text-white/30">{on ? "On" : "Off"}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
