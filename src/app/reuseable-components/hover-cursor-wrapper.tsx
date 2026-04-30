import type { CSSProperties, ReactNode } from "react";

interface HoverCursorWrapperProps {
  children: ReactNode;
  cursorImage?: string;
  className?: string;
  hotspotX?: number;
  hotspotY?: number;
}

export default function HoverCursorWrapper({
  children,
  cursorImage,
  className = "",
  hotspotX = 8,
  hotspotY = 8,
}: HoverCursorWrapperProps) {
  return (
    <div
      className={`paw-cursor-wrapper ${className}`}
      style={
        {
          "--paw-cursor": cursorImage
            ? `url("${cursorImage}") ${hotspotX} ${hotspotY}, pointer`
            : "pointer",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}