import { useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverCursorWrapper from "./hover-cursor-wrapper";
import images from "../assests/images";

gsap.registerPlugin(Draggable, ScrollTrigger);

type SplitRevealSliderProps = {
  leftImage: string;
  rightImage: string;
  leftAlt?: string;
  rightAlt?: string;
  leftLabel?: string;
  rightLabel?: string;
  heightClassName?: string;
};

const HEART_ITEMS = [
  { left: "6%", size: 250, delay: 0.1 },
  { left: "1%", size: 224, delay: 0.5 },
  { left: "24%", size: 30, delay: 0.9 },
  { left: "36%", size: 26, delay: 0.2 },
  { left: "48%", size: 18, delay: 0.8 },
  { left: "58%", size: 24, delay: 0.4 },
  { left: "68%", size: 20, delay: 0.02 },
  { left: "78%", size: 28, delay: 0.3 },
  { left: "88%", size: 22, delay: 0.7 },
  { left: "94%", size: 116, delay: 1.1 },
  { left: "94%", size: 16, delay: 1.1 },
  { left: "94%", size: 16, delay: 0.8 },
  { left: "94%", size: 16, delay: 0.6 },
  { left: "9%", size: 126, delay: 1 },
  { left: "4%", size: 16, delay: 1.1 },
  { left: "94%", size: 216, delay: 1.1 },
  { left: "94%", size: 16, delay: 1.1 },
  { left: "94%", size: 116, delay: 1.1 },
  { left: "94%", size: 16, delay: 1.1 },
  { left: "94%", size: 16, delay: 1.1 },
];

const HEART_COLORS = [
  "#FF6B9A",
  "#FF8FAB",
  "#FF4D79",
  "#FF3366",
  "#E91E8C",
  "#FF85A1",
  "#FFB3C6",
  "#C9184A",
];

const HEART_PATH =
  "M12 21s-6.716-4.33-9.192-8.023C.785 9.995 1.38 5.91 4.72 4.26c2.226-1.1 4.526-.305 5.9 1.324C11.993 3.955 14.293 3.16 16.519 4.26c3.34 1.65 3.935 5.735 1.912 8.717C18.716 13.403 12 21 12 21Z";

export default function SplitRevealSlider({
  leftImage,
  rightImage,
  leftAlt = "Left image",
  rightAlt = "Right image",
  leftLabel = "Before",
  rightLabel = "After",
  heightClassName = "h-[420px] md:h-[520px] lg:h-[900px]",
}: SplitRevealSliderProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const scrubberRef = useRef<HTMLDivElement | null>(null);
  const handleButtonRef = useRef<HTMLButtonElement | null>(null);
  const progressRef = useRef(0.5);

  // ── click-to-spawn hearts ──────────────────────────────────────────────────
  const spawnHeartsAt = useCallback((clientX: number, clientY: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const originX = clientX - rect.left;
    const originY = clientY - rect.top;

    const count = Math.floor(Math.random() * 10) + 20; // 20–30 hearts per click

    for (let i = 0; i < count; i++) {
      const size = Math.floor(Math.random() * 32) + 16; // 16–48 px
      const color =
        HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];

      // Build a positioned SVG element
      const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      el.setAttribute("viewBox", "0 0 24 24");
      el.setAttribute("width", String(size));
      el.setAttribute("height", String(size));
      el.style.cssText = `
          position: absolute;
          left: ${originX - size / 2}px;
          top: ${originY - size / 2}px;
          pointer-events: none;
          z-index: 50;
          overflow: visible;
        `;

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("d", HEART_PATH);
      path.setAttribute("fill", color);
      el.appendChild(path);
      section.appendChild(el);

      const rise = gsap.utils.random(100, 180);
      const drift = gsap.utils.random(-80, 80);
      const spin = gsap.utils.random(-25, 25);
      const delay = i * 0.045;

      gsap.fromTo(
        el,
        {
          y: 0,
          x: 0,
          scale: 0,
          autoAlpha: 0,
          rotate: spin,
          transformOrigin: "center center",
        },
        {
          keyframes: [
            // pop in
            {
              y: -40,
              scale: 1.2,
              autoAlpha: 1,
              rotate: spin,
              duration: 0.28,
              ease: "back.out(3)",
            },
            // float up & fade out
            {
              y: -rise,
              x: drift,
              scale: 0.85,
              autoAlpha: 0,
              rotate: spin + gsap.utils.random(-15, 15),
              duration: 0.85,
              ease: "power1.out",
            },
          ],
          delay,
          onComplete: () => el.remove(),
        },
      );
    }
  }, []);

  const handleSectionClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      // Don't interfere with the draggable scrubber button
      if ((e.target as HTMLElement).closest("[data-no-heart]")) return;
      spawnHeartsAt(e.clientX, e.clientY);
    },
    [spawnHeartsAt],
  );
  // ──────────────────────────────────────────────────────────────────────────

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const slider = sliderRef.current;
    const reveal = revealRef.current;
    const scrubber = scrubberRef.current;

    if (!section || !slider || !reveal || !scrubber) return;

    const ctx = gsap.context(() => {
      let sliderWidth = 0;
      let dragInstance: Draggable | null = null;

      const clamp = gsap.utils.clamp(0, 1);

      const setProgress = (value: number) => {
        const progress = clamp(value);
        progressRef.current = progress;

        sliderWidth = slider.offsetWidth;
        const x = sliderWidth * progress;
        const rightInset = (1 - progress) * 100;

        gsap.set(reveal, { clipPath: `inset(0 ${rightInset}% 0 0)` });
        gsap.set(scrubber, { x });

        if (handleButtonRef.current) {
          handleButtonRef.current.setAttribute(
            "aria-valuenow",
            Math.round(progress * 100).toString(),
          );
        }
      };

      const setFromX = (x: number) => {
        sliderWidth = slider.offsetWidth;
        const progress = sliderWidth > 0 ? x / sliderWidth : 0.5;
        setProgress(progress);
      };

      const buildDraggable = () => {
        dragInstance?.kill();
        sliderWidth = slider.offsetWidth;

        dragInstance = Draggable.create(scrubber, {
          type: "x",
          bounds: { minX: 0, maxX: sliderWidth },
          inertia: false,
          cursor: "ew-resize",
          activeCursor: "ew-resize",
          onDrag() {
            setFromX(this.x);
          },
          onPress() {
            setFromX(this.x);
          },
        })[0];

        setProgress(progressRef.current);
      };

      gsap.set(section, { autoAlpha: 0, y: 48 });
      gsap.to(section, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 82%" },
      });

      buildDraggable();

      const hearts = gsap.utils.toArray<HTMLElement>("[data-heart]", section);
      hearts.forEach((heart) => {
        const rise = gsap.utils.random(840, 1020);
        const drift = gsap.utils.random(-80, 80);
        const spin = gsap.utils.random(-20, 20);
        const delay = Number(heart.dataset.delay || 0);

        gsap.set(heart, {
          y: 50,
          x: 0,
          scale: 0,
          autoAlpha: 0,
          rotate: spin,
          transformOrigin: "center center",
        });

        const tl = gsap.timeline({
          repeat: -1,
          delay,
          repeatDelay: gsap.utils.random(0.2, 1.1),
        });

        tl.to(heart, {
          y: -24,
          scale: 1.15,
          autoAlpha: 1,
          duration: 0.35,
          ease: "back.out(3.2)",
        })
          .to(
            heart,
            {
              y: -rise,
              x: drift,
              scale: 0.9,
              rotate: spin + gsap.utils.random(-12, 12),
              duration: 2.4,
              ease: "power1.out",
            },
            ">",
          )
          .to(
            heart,
            { autoAlpha: 0, scale: 0.55, duration: 0.45, ease: "power1.in" },
            "-=0.4",
          );
      });

      window.addEventListener("resize", buildDraggable);
      return () => {
        dragInstance?.kill();
        window.removeEventListener("resize", buildDraggable);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  const nudge = (amount: number) => {
    const target = gsap.utils.clamp(0, 1, progressRef.current + amount);
    gsap.to(progressRef, {
      current: target,
      duration: 0.18,
      ease: "power2.out",
      onUpdate: () => {
        const slider = sliderRef.current;
        const reveal = revealRef.current;
        const scrubber = scrubberRef.current;
        const button = handleButtonRef.current;
        if (!slider || !reveal || !scrubber) return;

        const width = slider.offsetWidth;
        const x = width * progressRef.current;
        const rightInset = (1 - progressRef.current) * 100;

        gsap.set(reveal, { clipPath: `inset(0 ${rightInset}% 0 0)` });
        gsap.set(scrubber, { x });
        if (button) {
          button.setAttribute(
            "aria-valuenow",
            Math.round(progressRef.current * 100).toString(),
          );
        }
      },
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 0.08 : 0.03;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      nudge(-step);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nudge(step);
    }
    if (event.key === "Home") {
      event.preventDefault();
      nudge(-1);
    }
    if (event.key === "End") {
      event.preventDefault();
      nudge(1);
    }
  };

  return (
    <section
      ref={sectionRef}
      onClick={handleSectionClick} // ← spawn hearts on click
      className="relative w-full flex justify-center overflow-hidden bg-[#f1ffeb] px-6 py-10 md:px-10 lg:px-16"
    >
      <div className="absolute left-[80px] top-3 font-queen text-[14px] leading-[108%] text-[#214A1E] md:text-[56px] lg:text-[40px] -rotate-40 max-w-[200px] opacity-80">
        Click to show love for Luna!{" "}
        <span className="inline-block animate-pulse text-2xl ">❤️</span>
        <img src={images.bentArrow} alt=""  className="rotate-180 scale-x-[-1]"/>
      </div>
      {/* floating hearts */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {HEART_ITEMS.map((heart, index) => (
          <span
            key={index}
            data-heart
            data-delay={heart.delay}
            className="absolute bottom-[-30px] block"
            style={{
              left: heart.left,
              width: `${heart.size}px`,
              height: `${heart.size}px`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-full w-full drop-shadow-[0_6px_16px_rgba(255,105,150,0.22)]"
              fill="none"
            >
              <path d={HEART_PATH} fill="#FF6B9A" />
            </svg>
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-center font-queen text-[60px] leading-[108%] text-[#214A1E] md:text-[56px] lg:text-[72px]">
            Meet Luna's Recovery Journey
          </h1>
          <h2 className="mx-auto max-w-2xl text-center text-lg font-medium leading-relaxed text-[#2F5A2B] md:text-xl">
            Drag the slider to see Luna before treatment and after the care that
            helped her heal.
          </h2>
        </div>

        <div
          ref={sliderRef}
          className={`relative overflow-hidden rounded-[28px] bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.35)] ${heightClassName}`}
        >
          <img
            src={leftImage}
            alt={leftAlt}
            className="absolute inset-0 h-full w-full object-cover grayscale"
            draggable={false}
          />

          <div
            ref={revealRef}
            className="absolute inset-0"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          >
            <img
              src={rightImage}
              alt={rightAlt}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          <div className="pointer-events-none absolute left-5 top-5 rounded-full bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md md:left-7 md:top-7">
            {leftLabel}
          </div>
          <div className="pointer-events-none absolute right-5 top-5 rounded-full bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md md:right-7 md:top-7">
            {rightLabel}
          </div>

          <div
            ref={scrubberRef}
            data-no-heart // ← clicks here won't spawn hearts
            className="absolute inset-y-0 left-0 z-20 w-0"
            style={{ transform: "translateX(0px)" }}
          >
            <div className="pointer-events-none absolute left-0 top-0 h-full w-[2px] -translate-x-1/2 bg-white/85 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" />
            <HoverCursorWrapper cursorImage={images.drag}>
              <button
                ref={handleButtonRef}
                type="button"
                aria-label="Drag to compare images"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={50}
                onKeyDown={handleKeyDown}
                className="absolute left-0 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white text-black shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/70"
              >
                <span className="pointer-events-none flex items-center justify-center gap-1">
                  <span className="text-lg">←</span>
                  <span className="text-lg">→</span>
                </span>
              </button>
            </HoverCursorWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
