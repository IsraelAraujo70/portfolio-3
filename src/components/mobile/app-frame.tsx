import type { ReactNode } from "react";

interface AppFrameProps {
  gradient: string;
  children: ReactNode;
}

export function AppFrame({ gradient, children }: AppFrameProps) {
  return (
    <div
      className={`fixed inset-0 z-40 overflow-hidden bg-gradient-to-br ${gradient} app-frame-enter`}
    >
      {children}
    </div>
  );
}
