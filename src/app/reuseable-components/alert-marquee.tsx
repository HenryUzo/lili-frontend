import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import images from "../assests/images";

export interface AlertMarqueeProps {
  message?: string;
  phone?: string;
  bgColor?: string;
  textColor?: string;
  duration?: number;
  copies?: number;
}

const SirenIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block shrink-0"
    style={{ marginRight: 10 }}
  >
    <rect width="36" height="36" rx="6" fill={color} fillOpacity="0.25" />
    <path d="M10 22h16v3a1 1 0 01-1 1H11a1 1 0 01-1-1v-3z" fill={color} />
    <path d="M13 14h10l2 8H11l2-8z" fill={color} />
    <path d="M18 8a6 6 0 016 6h-12a6 6 0 016-6z" fill={color} />
    <line
      x1="18"
      y1="4"
      x2="18"
      y2="6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="10"
      y1="7"
      x2="11.5"
      y2="8.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="26"
      y1="7"
      x2="24.5"
      y2="8.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const AlertMarquee: React.FC<AlertMarqueeProps> = ({
  message = " ALERT!!! If your pet is in distress, call us immediately.",
  phone = "210-257-8800",
  bgColor = "#ED1C24",
  textColor = "#FFFFFF",
  duration = 18,
  copies = 6,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const singleWidth = track.scrollWidth / copies;

    tweenRef.current = gsap.fromTo(
      track,
      { x: 0 },
      {
        x: -singleWidth,
        duration,
        ease: "none",
        repeat: -1,
      }
    );

    const banner = track.parentElement;
    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();

    banner?.addEventListener("mouseenter", pause);
    banner?.addEventListener("mouseleave", resume);

    return () => {
      tweenRef.current?.kill();
      banner?.removeEventListener("mouseenter", pause);
      banner?.removeEventListener("mouseleave", resume);
    };
  }, [duration, copies]);

  const items = Array.from({ length: copies });

  return (
    <div
      className="w-full overflow-hidden h-[64px] md:h-[100px]"
      style={{ background: bgColor }}
      aria-label={`${message} ${phone}`}
      role="marquee"
    >
      <div
        ref={trackRef}
        className="flex items-center h-full will-change-transform"
        style={{ width: "max-content" }}
      >
        {items.map((_, i) => (
          <span
            key={i}
            className="flex items-center shrink-0 py-2 md:py-3 font-founders pr-6 md:pr-10"
            style={{
              color: textColor,
              fontWeight: 900,
              fontSize: "clamp(18px, 3vw, 48px)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              paddingLeft: i === 0 ? 16 : 0,
            }}
          >
            <img
              src={images.redFlasher}
              className="w-10 md:w-40 mr-2 md:mr-4 shrink-0"
              alt=""
            />
            {message}&nbsp;
            <span style={{ marginLeft: 4 }}>{phone}</span>

            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: textColor,
                opacity: 0.6,
                margin: "0 20px",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default AlertMarquee;