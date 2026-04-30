import { PropsWithChildren, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

/**
 * RECONSTRUCTED PATH GEOMETRY
 * ---------------------------
 * The raw live SVG `d` from mindmarket.com was not exposed in the accessible DOM.
 * This path was traced from the published full-height site artwork so the motion
 * matches the original thread behavior closely.
 *
 * Original animation logic that IS exact from the creators' case study:
 * - main path: 5% -> 100%
 * - secondary path: 0% -> 100%
 * - shadow opacity: 0 -> 1 at 0.95
 * - custom ease: M0,0 C0.952,0.017 0.744,0.69 1,1
 */
const THREAD_PATH_D =
  "M 1010 0 C 998 37, 968 147, 940 220 C 913 293, 919 367, 843 440 C 768 513, 558 587, 485 660 C 412 733, 399 807, 405 880 C 412 953, 526 1027, 524 1100 C 522 1173, 394 1247, 392 1320 C 390 1393, 463 1467, 510 1540 C 557 1613, 612 1687, 675 1760 C 738 1833, 787 1907, 886 1980 C 985 2053, 1183 2127, 1269 2200 C 1356 2273, 1365 2347, 1404 2420 C 1444 2493, 1565 2567, 1507 2640 C 1450 2713, 1147 2787, 1061 2860 C 975 2933, 1008 3007, 991 3080 C 974 3153, 888 3227, 960 3300 C 1032 3373, 1324 3447, 1424 3520 C 1524 3593, 1674 3667, 1560 3740 C 1445 3813, 883 3887, 737 3960 C 591 4033, 665 4107, 683 4180 C 701 4253, 684 4327, 846 4400 C 1008 4473, 1538 4547, 1656 4620 C 1775 4693, 1597 4767, 1558 4840 C 1518 4913, 1470 4987, 1419 5060 C 1367 5133, 1333 5207, 1248 5280 C 1162 5353, 986 5427, 904 5500 C 823 5573, 797 5647, 759 5720 C 721 5793, 714 5867, 678 5940 C 643 6013, 562 6087, 548 6160 C 534 6233, 588 6307, 597 6380 C 605 6453, 554 6527, 598 6600 C 643 6673, 804 6747, 864 6820 C 925 6893, 944 7003, 960 7040";

type MindMarketThreadSectionProps = PropsWithChildren<{
  className?: string;
  contentClassName?: string;
}>;

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

/**
 * Minimal DrawSVG-style helper without the paid DrawSVGPlugin.
 * This version only needs "0 -> end%" reveals, which is enough to match
 * the published MindMarket thread behavior.
 */
function setDraw(path: SVGPathElement, endPercent: number) {
  const totalLength = path.getTotalLength();
  const pct = clamp01(endPercent);
  const visibleLength = Math.max(totalLength * pct, 0.0001);

  path.style.strokeDasharray = `${visibleLength} ${totalLength}`;
  path.style.strokeDashoffset = "0";
}

export default function MindMarketThreadSection({
  children,
  className = "",
  contentClassName = "",
}: MindMarketThreadSectionProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mainPathRef = useRef<SVGPathElement | null>(null);
  const secondaryPathRef = useRef<SVGPathElement | null>(null);
  const shadowPathRef = useRef<SVGPathElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const mainPath = mainPathRef.current;
    const secondaryPath = secondaryPathRef.current;
    const shadowPath = shadowPathRef.current;

    if (!section || !mainPath || !secondaryPath || !shadowPath) return;

    const state = {
      main: 0.05, // exact published starting value
      secondary: 0,
      shadowOpacity: 0,
    };

    const render = () => {
      setDraw(mainPath, state.main);
      setDraw(secondaryPath, state.secondary);
      shadowPath.style.opacity = String(state.shadowOpacity);
    };

    render();

    const ctx = gsap.context(() => {
      const threadEase = CustomEase.create(
        "mindmarket-thread-ease",
        "M0,0 C0.952,0.017 0.744,0.69 1,1"
      );

      // This mirrors the original architecture: paused GSAP timeline,
      // driven by scroll progress.
      const masterTimeline = gsap.timeline({
        paused: true,
        onUpdate: render,
      });

      masterTimeline.to(
        state,
        {
          main: 1,
          duration: 0.9,
          ease: threadEase,
        },
        0
      );

      masterTimeline.to(
        state,
        {
          secondary: 1,
          duration: 1,
          ease: "none",
        },
        0
      );

      masterTimeline.to(
        state,
        {
          shadowOpacity: 1,
          duration: 0.15,
          ease: "none",
        },
        0.95
      );

      // Reconstructed ScrollTrigger equivalent of the original
      // Locomotive Scroll normalized progress.
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          masterTimeline.progress(self.progress);
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <svg
          viewBox="0 0 1920 7065"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mindmarket-thread-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8AD44F" stopOpacity="0" />
              <stop offset="45%" stopColor="#76BF3F" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#5EA62C" stopOpacity="0.45" />
            </linearGradient>

            <filter id="mindmarket-thread-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>

          {/* Main/base path */}
          <path
            ref={mainPathRef}
            d={THREAD_PATH_D}
            fill="none"
            stroke="#95d85f"
            strokeWidth="380"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Shadow path, fades in near the overlap point like the original */}
          <path
            ref={shadowPathRef}
            d={THREAD_PATH_D}
            fill="none"
            stroke="url(#mindmarket-thread-shadow)"
            strokeWidth="340"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#mindmarket-thread-blur)"
            opacity="0"
          />

          {/* Secondary/top path */}
          <path
            ref={secondaryPathRef}
            d={THREAD_PATH_D}
            fill="none"
            stroke="#8fd457"
            strokeWidth="300"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </section>
  );
}