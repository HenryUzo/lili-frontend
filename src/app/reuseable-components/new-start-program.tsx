import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Icon components (inline SVGs to avoid dependencies)
const GrowthIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-6 w-6"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect x="3" y="8" width="4" height="13" rx="1" />
    <rect x="10" y="4" width="4" height="17" rx="1" />
    <rect x="17" y="11" width="4" height="10" rx="1" />
    <path d="M3 5l5-3 5 4 5-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NutritionIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-6 w-6"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      d="M12 2C8 2 5 5 5 9c0 2.5 1 4.5 2.5 6L9 21h6l1.5-6C18 13.5 19 11.5 19 9c0-4-3-7-7-7z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 2v8" strokeLinecap="round" />
    <path d="M9 7c0 0 1 2 3 2s3-2 3-2" strokeLinecap="round" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="h-4 w-4"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface FeatureBadgeProps {
  icon: ReactNode;
  label: ReactNode;
  bgColor: string;
  iconColor: string;
}

const FeatureBadge = ({
  icon,
  label,
  bgColor,
  iconColor,
}: FeatureBadgeProps) => (
  <div
    data-feature-badge
    className="group flex cursor-default items-center gap-3"
  >
    <div
      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl transition-transform duration-200 group-hover:scale-110 ${bgColor} ${iconColor}`}
    >
      {icon}
    </div>

    <div className="leading-tight text-[#1a3a2a]">{label}</div>
  </div>
);

export default function NewStartProgramCard() {
  const [hovered, setHovered] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const badges = gsap.utils.toArray<HTMLElement>(
        "[data-feature-badge]",
        root
      );

      const setInitialState = () => {
        gsap.set(root, {
          y: 90,
          rotate: -6,
          scale: 0.96,
          autoAlpha: 0,
          transformOrigin: "center center",
          willChange: "transform, opacity",
        });

        gsap.set(
          [labelRef.current, headingRef.current, bodyRef.current],
          {
            y: 28,
            autoAlpha: 0,
            willChange: "transform, opacity",
          }
        );

        gsap.set(badges, {
          y: 22,
          scale: 0.92,
          autoAlpha: 0,
          willChange: "transform, opacity",
        });

        gsap.set(buttonRef.current, {
          x: -14,
          autoAlpha: 0,
          willChange: "transform, opacity",
        });
      };

      setInitialState();

      const tl = gsap.timeline({ paused: true });

      tl.to(root, {
        y: 0,
        rotate: -8,
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        ease: "back.out(1.15)",
      })
        .to(
          labelRef.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .to(
          headingRef.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .to(
          bodyRef.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.38"
        )
        .to(
          badges,
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.12,
            ease: "back.out(1.3)",
          },
          "-=0.25"
        )
        .to(
          buttonRef.current,
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.2"
        );

      ScrollTrigger.create({
        trigger: root,
        start: "top 82%",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
        onLeaveBack: () => setInitialState(),
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative lg:rotate-[-4deg]">
      <div
        className="relative flex h-[626px] w-[380px] flex-col justify-center overflow-hidden rounded-[2rem] bg-[#ffffff] px-10 pb-10 pt-10 md:w-[608px] lg:px-24"
        style={{ transform: "rotate(0deg)" }}
      >
        <p
          ref={labelRef}
          className="manrope mb-3 text-[12px] font-bold uppercase leading-[18px] tracking-[1.4px] text-[#95442D] md:text-[13px] md:leading-[19px] lg:text-[14px] lg:leading-[20px]"
        >
          New Additions
        </p>

        <h1
          ref={headingRef}
          className="font-founders mb-5 text-[32px] font-medium leading-[36px] tracking-[-1.2px] text-[#416352] md:text-[40px] md:leading-[42px] lg:text-[48px] lg:leading-[48px]"
        >
          The &ldquo;New Start&rdquo;
          <br />
          Program
        </h1>

        <p
          ref={bodyRef}
          className="font-manrope mb-8 text-[16px] font-normal leading-[26px] tracking-[0] text-[#414844] md:text-[18px] md:leading-[29px] lg:text-[20px] lg:leading-[32.5px]"
        >
          Puppies and kittens require a series of booster shots in their first
          months to build up their immunity as their mother&apos;s natural
          protection fades. We guide you through the{" "}
          <span className="font-semibold text-[#1e5c38]">
            8, 12, and 16-week
          </span>{" "}
          marks with care, education, and treats.
        </p>

        <div className="mb-9 flex gap-6">
          <FeatureBadge
            icon={<GrowthIcon />}
            label={
              <span className="manrope text-[16px] font-bold leading-[24px] tracking-[0] text-[#1B1C19] md:text-[17px] md:leading-[26px] lg:text-[18px] lg:leading-[28px]">
                Growth
                <br />
                Monitoring
              </span>
            }
            bgColor="bg-[#d9eedf]"
            iconColor="text-[#3a7a50]"
          />

          <FeatureBadge
            icon={<NutritionIcon />}
            label={
              <span className="manrope text-[16px] font-bold leading-[24px] tracking-[0] text-[#1B1C19] md:text-[17px] md:leading-[26px] lg:text-[18px] lg:leading-[28px]">
                Nutrition
                <br />
                Advice
              </span>
            }
            bgColor="bg-[#fde8d8]"
            iconColor="text-[#c4662a]"
          />
        </div>

        <button
          ref={buttonRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="group flex items-center gap-2 text-[0.88rem] font-bold tracking-wide transition-all duration-200"
          style={{ color: "#1e5c38" }}
        >
          <span className="manrope text-center text-[16px] font-black leading-[24px] tracking-[0] text-[#416352] md:text-[17px] md:leading-[26px] lg:text-[18px] lg:leading-[28px]">
            Download New Pet Guide
          </span>

          <span
            className="transition-transform duration-200"
            style={{
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              color: hovered ? "#b85c38" : "#1e5c38",
            }}
          >
            <ArrowIcon />
          </span>
        </button>
      </div>
    </div>
  );
}