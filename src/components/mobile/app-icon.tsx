import type { ReactNode } from "react";

export interface AppIconConfig {
  id: string;
  label: string;
  gradient: string;
  icon: ReactNode;
  onTap?: () => void;
  href?: string;
}

interface AppIconProps extends AppIconConfig {
  morphLayoutId?: string;
  accessibleLabel?: string;
}

/** Renders a launch target with an accessible name even when its caption is hidden. */
export function AppIcon({
  label,
  accessibleLabel,
  gradient,
  icon,
  onTap,
  href,
}: AppIconProps) {
  const tile = (
    <div
      className={`w-full aspect-square bg-gradient-to-br ${gradient} flex items-center justify-center`}
      style={{
        borderRadius: "22%",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.15)",
      }}
    >
      {icon}
    </div>
  );

  const labelEl = label ? (
    <span
      className="text-[11px] text-white mt-1.5 text-center select-none"
      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
    >
      {label}
    </span>
  ) : null;

  if (href) {
    return (
      <a
        href={href}
        aria-label={accessibleLabel ?? label}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className="flex flex-col items-center touch-manipulation w-full active:scale-[0.92] transition-transform"
      >
        {tile}
        {labelEl}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-label={accessibleLabel ?? label}
      onClick={onTap}
      className="flex flex-col items-center touch-manipulation w-full active:scale-[0.92] transition-transform"
    >
      {tile}
      {labelEl}
    </button>
  );
}
