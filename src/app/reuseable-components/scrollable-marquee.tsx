import React, { useId, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import images from "../assests/images";
gsap.registerPlugin(ScrollTrigger);

const MARQUEE_CURVE_PATH =
  "M-120 528.32C120 342.876 734.503 81.9502 1052.92 67.4765C1371.34 53.0028 1646.95 203.167 1825 280.058";

function ScrollableMarquee() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const curveId = useId().replace(/:/g, "");

  const marqueeText = useMemo(
    () => Array(12).fill("🚨 Emergencies hotline: 121-789-646").join("   •   "),
    [],
  );

  useLayoutEffect(() => {
    if (!rootRef.current || !textPathRef.current) return;

    const ctx = gsap.context(() => {
      const setOffset = (value: number) => {
        textPathRef.current?.setAttribute("startOffset", `${value}%`);
      };

      setOffset(0);

      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.1,
        onUpdate: (self) => {
          setOffset(-self.progress * 95);
        },
      });

      return () => {
        trigger.kill();
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative size-full overflow-visible ">
      <div className="absolute left-1/2 top-1/2 aspect-[2100/700]  w-[165%] min-w-[980px]  -translate-x-1/2 -translate-y-[44%] sm:w-[150%] md:w-[145%] lg:w-[140%] xl:w-[135%] z-[10000]">
        <svg
          className="block size-full overflow-visible"
          viewBox="-180 0 2100 700"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d={MARQUEE_CURVE_PATH}
            stroke="#214A1E"
            strokeWidth="133"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          <defs>
            <path id={curveId} d={MARQUEE_CURVE_PATH} />
          </defs>

          <text
            fill="#adc59b"
            fontWeight="800"
            letterSpacing="0.04em"
            style={{
              fontSize: "clamp(69px, 8vw, 119px)",
              textTransform: "uppercase",
            }}
            dy="30"
          >
            <textPath
              ref={textPathRef}
              href={`#${curveId}`}
              startOffset="0%"
              method="align"
              spacing="auto"
            >
              {marqueeText}
            </textPath>
          </text>
        </svg>
      </div>
      <div className="relative w-full ">
        <img
          src={images.compassionatewriting}
          className="absolute top-[10rem]  z-30 right-[10rem] md:block hidden"
          alt=""
        />
        <img
          src={images.greenCurve}
          alt="Green Curve"
          className="w-full md:block hidden"
        />
      </div>
    </div>
  );
}

export default ScrollableMarquee;
