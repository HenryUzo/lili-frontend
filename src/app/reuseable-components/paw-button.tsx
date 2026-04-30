import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import svgPaths from "../components/svgpath";
import { useNavigate } from "react-router";
import { ROUTE } from "../../router";
import HoverCursorWrapper from "./hover-cursor-wrapper";
import images from "../assests/images";


type PawButtonVariant = "primary" | "secondary";

interface PawButtonProps {
  label?: string;
  variant?: PawButtonVariant;
  onClick?: () => void;
  onPawClick?: () => void;
  pawTiltAngle?: number;
  sideGap?: number;
  className?: string;
  icon?: string;
  showIcon?: boolean;

  /**
   * Pass your paw cursor image here.
   * Example: cursorImage={images.pawCursor}
   */
  cursorImage?: string;
}

const variantStyles = {
  primary: {
    surface: "bg-[#006838]",
    text: "text-white",
    paw: "text-white",
    shadow: "shadow-[0_10px_28px_rgba(0,104,56,0.18)]",
  },
  secondary: {
    surface: "bg-white",
    text: "text-[#214a1e]",
    paw: "text-[#204E1C]",
    shadow: "shadow-[0_10px_28px_rgba(32,78,28,0.10)]",
  },
};

function PawIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative shrink-0 ${className}`} data-name="ion:paw">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="ion:paw">
          <path d={svgPaths.p15f8a400} fill="currentColor" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function PawButton({
  label = "Book Appointment",
  variant = "secondary",
  onClick,
  onPawClick,
  pawTiltAngle = 12,
  sideGap = 12,
  className = "",
  icon,
  showIcon = true,

}: PawButtonProps) {
  const styles = variantStyles[variant];
  const navigate = useNavigate();

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const labelButtonRef = useRef<HTMLButtonElement | null>(null);
  const pawButtonRef = useRef<HTMLButtonElement | null>(null);
  const pawIconRef = useRef<HTMLDivElement | null>(null);
  const hoverTlRef = useRef<gsap.core.Timeline | null>(null);

  const handleDefaultClick = () => {
    navigate(ROUTE.bookAppointment);
  };

  const handleMainClick = onClick ?? handleDefaultClick;
  const handlePawClick = onPawClick ?? onClick ?? handleDefaultClick;

  useLayoutEffect(() => {
    if (
      !labelButtonRef.current ||
      !pawButtonRef.current ||
      !pawIconRef.current
    ) {
      return;
    }

    gsap.set(
      [labelButtonRef.current, pawButtonRef.current, pawIconRef.current],
      {
        transformOrigin: "50% 50%",
      }
    );

    return () => {
      hoverTlRef.current?.kill();
    };
  }, []);

  const playHover = () => {
    if (
      !labelButtonRef.current ||
      !pawButtonRef.current ||
      !pawIconRef.current
    ) {
      return;
    }

    hoverTlRef.current?.kill();

    const labelRect = labelButtonRef.current.getBoundingClientRect();
    const pawRect = pawButtonRef.current.getBoundingClientRect();

    const moveX = labelRect.width / 1.4 - pawRect.width / 2 + sideGap;
    const moveY = -(labelRect.height / 2 + pawRect.height / 2 + 8);

    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

    tl.to(
      labelButtonRef.current,
      {
        y: -2,
        scaleX: 1.03,
        scaleY: 0.98,
        duration: 0.22,
        ease: "back.out(2.6)",
      },
      0
    )
      .to(
        pawButtonRef.current,
        {
          x: moveX,
          y: moveY,
          rotation: pawTiltAngle,
          duration: 0.72,
          ease: "elastic.out(1, 0.52)",
        },
        0
      )
      .to(
        pawIconRef.current,
        {
          rotation: -pawTiltAngle * 0.45,
          scale: 1.1,
          duration: 0.4,
          ease: "back.out(3)",
        },
        0.05
      );

    hoverTlRef.current = tl;
  };

  const resetHover = () => {
    if (
      !labelButtonRef.current ||
      !pawButtonRef.current ||
      !pawIconRef.current
    ) {
      return;
    }

    hoverTlRef.current?.kill();

    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

    tl.to(
      labelButtonRef.current,
      {
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.26,
        ease: "back.out(2.2)",
      },
      0
    )
      .to(
        pawButtonRef.current,
        {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
        0
      )
      .to(
        pawIconRef.current,
        {
          rotation: 0,
          scale: 1,
          duration: 0.32,
          ease: "back.out(2.4)",
        },
        0
      );

    hoverTlRef.current = tl;
  };

  return (
    <HoverCursorWrapper  cursorImage={images.pawWhite} >
      <div
        ref={wrapperRef}
        className={`flex w-full shrink-0 flex-col items-center justify-center gap-2 lg:w-fit ${className}`}
        onMouseEnter={playHover}
        onMouseLeave={resetHover}
      >
        <button
          ref={labelButtonRef}
          type="button"
          onClick={handleMainClick}
          className={[
            styles.surface,
            styles.text,
            "flex items-center justify-center overflow-hidden font-medium rounded-[36px]",
            "px-5 py-3 sm:px-6 sm:py-4 lg:px-6 lg:py-6",
            "text-sm sm:text-base lg:text-[24px]",
            "will-change-transform",
          ].join(" ")}
        >
          <span className="font-founders leading-none text-center whitespace-nowrap font-semibold">
            {label}
          </span>
        </button>

        {showIcon && (
          <button
            ref={pawButtonRef}
            type="button"
            onClick={handlePawClick}
            aria-label={label}
            className={[
              styles.surface,
              styles.paw,
              styles.shadow,
              "flex items-center justify-center overflow-hidden font-founders rounded-[36px]",
              "p-3 sm:p-4 lg:p-4",
              "will-change-transform",
            ].join(" ")}
          >
            {icon ? (
              <div ref={pawIconRef} className="will-change-transform">
                <div
                  className={[
                    styles.surface,
                    "will-change-transform",
                    "flex items-center justify-center",
                  ].join(" ")}
                >
                  <img src={icon} alt="" />
                </div>
              </div>
            ) : (
              <div ref={pawIconRef} className="will-change-transform">
                <PawIcon className="size-5 sm:size-6 lg:size-6" />
              </div>
            )}
          </button>
        )}
      </div>
    </HoverCursorWrapper>
  );
}