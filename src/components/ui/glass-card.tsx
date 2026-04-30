import { type HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl ${
        hover
          ? "hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
