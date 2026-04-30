import React, { useRef, useState } from "react";
import images from "../assests/images";

// ── Types ──────────────────────────────────────────────────────────────────

export type UrgentCardMedia =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string };

export interface UrgentCareCardProps {
  /** Media — pass { type: "image", src } or { type: "video", src } */
  media: UrgentCardMedia;
  /** Card label / title */
  title: string;
  /**
   * "overlay" — title sits on top of the media (bottom-left, like the cat image)
   * "below"   — title sits underneath the card (like a caption)
   */
  titlePosition?: "overlay" | "below";
  /** Rotation in degrees applied to the whole card, e.g. -3 or 6 */
  rotation?: number;
  /** Optional extra Tailwind classes for the outer wrapper */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

// ── Volume icons ───────────────────────────────────────────────────────────

const VolumeOn: React.FC = () => <img src={images.speaker} alt="" />;

const VolumeOff: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────

const UrgentCareCard: React.FC<UrgentCareCardProps> = ({
  media,
  title,
  titlePosition = "overlay",
  rotation = 0,
  className = "",
  onClick,
}) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted((prev) => !prev);
    }
  };

  return (
    <div
      onClick={onClick}
      style={{ transform: `rotate(${rotation}deg)` }}
      className={[
        "flex flex-col gap-3 lg:h-[305px] h-[400px] lg:w-[546px] w-full  ",
        onClick ? "cursor-pointer" : "cursor-default",
        className,
      ].join(" ")}
    >
      {/* ── Card frame ── */}
      <div
        className={[
          "relative overflow-hidden rounded-[7px] ",
          // White border + shadow → the "polaroid / sticker" look
          "border-[6px]  border-white",
          "shadow-[0_8px_32px_rgba(0,0,0,0.35)] h-full",
          "transition-transform duration-300 ease-out hover:scale-[1.02]",
        ].join(" ")}
      >
        {/* Media */}
        {media.type === "image" ? (
          <img
            src={media.src}
            alt={media.alt ?? title}
            className="w-full h-full  scale-120 object-cover block"
            draggable={false}
          />
        ) : (
          <video
            ref={videoRef}
            src={media.src}
            poster={media.poster}
            autoPlay
            loop
            muted={muted}
            playsInline
            className="w-full h-full object-cover block"
          />
        )}

        {/* Overlay title */}
        {titlePosition === "overlay" && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        )}
        {titlePosition === "overlay" && (
          <p
            className="absolute bottom-3 left-4 lg:block hidden  text-center text-[28px] right-12 text-white  manrope  leading-tight drop-shadow-lg"
            style={{ letterSpacing: "-0.5px" }}
          >
            {title}
          </p>
        )}

        {/* Volume toggle — video only */}
        {media.type === "video" && (
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className={[
              "absolute bottom-3 right-3 z-10",
              "w-8 h-8 rounded-full flex items-center justify-center",
              "bg-black/50 text-white backdrop-blur-sm",
              "transition-all duration-150 hover:bg-black/70 hover:scale-110 active:scale-95 ",
            ].join(" ")}
          >
            {muted ? <VolumeOff /> : <VolumeOn />}
          </button>
        )}
      </div>

      {/* Below title */}
      {titlePosition === "below" && (
        <p className="text-white manrope lg:hidden block text-[48px] leading-tight text-center drop-shadow-md">
          {title}
        </p>
      )}
    </div>
  );
};

export default UrgentCareCard;
