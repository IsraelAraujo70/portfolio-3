import { type HTMLAttributes } from "react";

const blurStyle = {
  backdropFilter: "blur(40px)",
  WebkitBackdropFilter: "blur(40px)",
};

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  style,
  ...props
}: GlassCardProps) {
  return (
    <div
      style={{ ...blurStyle, ...style }}
      className={`liquid-glass-light ${
        hover ? "hover:bg-white/[0.08] transition-all duration-300" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
