import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type ScatterNode = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  driftX: number;
  driftY: number;
};

type ScatteredPawPrintsProps = {
  pawImageSrc: string;
  className?: string;
  minHeight?: string;
  children?: React.ReactNode;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const DESKTOP_PATTERN = [
  { x: 0.06, y: 0.12, scale: 1.06, rotation: -18, driftX: -8, driftY: 8 },
  { x: 0.14, y: 0.23, scale: 0.72, rotation: 10, driftX: 5, driftY: 6 },
  { x: 0.24, y: 0.16, scale: 0.95, rotation: 18, driftX: 8, driftY: 6 },
  { x: 0.32, y: 0.28, scale: 0.58, rotation: -8, driftX: -5, driftY: 5 },
  { x: 0.42, y: 0.14, scale: 1.02, rotation: 8, driftX: -6, driftY: 7 },
  { x: 0.5, y: 0.22, scale: 0.42, rotation: 4, driftX: 0, driftY: 5 },
  { x: 0.6, y: 0.18, scale: 0.88, rotation: -10, driftX: 6, driftY: 6 },
  { x: 0.7, y: 0.26, scale: 0.64, rotation: 12, driftX: 6, driftY: 5 },
  { x: 0.8, y: 0.14, scale: 0.94, rotation: -12, driftX: -6, driftY: 6 },
  { x: 0.9, y: 0.24, scale: 0.76, rotation: 14, driftX: 5, driftY: 5 },

  { x: 0.08, y: 0.42, scale: 0.84, rotation: -15, driftX: -7, driftY: 7 },
  { x: 0.18, y: 0.52, scale: 1.04, rotation: 16, driftX: 8, driftY: 7 },
  { x: 0.3, y: 0.46, scale: 0.46, rotation: -2, driftX: 0, driftY: 5 },
  { x: 0.4, y: 0.56, scale: 0.92, rotation: 12, driftX: 7, driftY: 5 },
  { x: 0.52, y: 0.44, scale: 0.78, rotation: -14, driftX: -6, driftY: 6 },
  { x: 0.62, y: 0.54, scale: 1, rotation: 18, driftX: 8, driftY: 6 },
  { x: 0.72, y: 0.48, scale: 0.44, rotation: -5, driftX: -2, driftY: 5 },
  { x: 0.82, y: 0.58, scale: 0.98, rotation: -8, driftX: 6, driftY: 7 },
  { x: 0.92, y: 0.46, scale: 0.74, rotation: 10, driftX: -5, driftY: 5 },

  { x: 0.1, y: 0.74, scale: 1.08, rotation: -16, driftX: -8, driftY: 8 },
  { x: 0.22, y: 0.86, scale: 0.86, rotation: 20, driftX: 6, driftY: 6 },
  { x: 0.34, y: 0.78, scale: 0.96, rotation: 14, driftX: 6, driftY: 6 },
  { x: 0.46, y: 0.9, scale: 0.5, rotation: -6, driftX: -4, driftY: 5 },
  { x: 0.58, y: 0.8, scale: 1, rotation: 12, driftX: 5, driftY: 6 },
  { x: 0.7, y: 0.88, scale: 0.72, rotation: -10, driftX: -5, driftY: 5 },
  { x: 0.82, y: 0.76, scale: 0.94, rotation: 16, driftX: 6, driftY: 6 },
  { x: 0.92, y: 0.88, scale: 0.8, rotation: -12, driftX: -5, driftY: 5 },
];

const TABLET_PATTERN = [
  { x: 0.12, y: 0.16, scale: 1.02, rotation: -18, driftX: -7, driftY: 8 },
  { x: 0.33, y: 0.26, scale: 0.88, rotation: 15, driftX: 7, driftY: 6 },
  { x: 0.56, y: 0.18, scale: 0.98, rotation: 10, driftX: -6, driftY: 7 },
  { x: 0.68, y: 0.24, scale: 0.42, rotation: 6, driftX: 0, driftY: 5 },
  { x: 0.83, y: 0.3, scale: 0.92, rotation: -10, driftX: 6, driftY: 6 },

  { x: 0.15, y: 0.6, scale: 1.04, rotation: -15, driftX: -7, driftY: 7 },
  { x: 0.45, y: 0.58, scale: 0.44, rotation: 3, driftX: 0, driftY: 5 },
  { x: 0.64, y: 0.48, scale: 0.92, rotation: 16, driftX: 7, driftY: 5 },
  { x: 0.84, y: 0.56, scale: 0.98, rotation: -8, driftX: 6, driftY: 7 },

  { x: 0.22, y: 0.84, scale: 0.98, rotation: 18, driftX: -7, driftY: 7 },
  { x: 0.42, y: 0.8, scale: 0.92, rotation: 14, driftX: 6, driftY: 6 },
];

const MOBILE_PATTERN = [
  { x: 0.16, y: 0.14, scale: 0.96, rotation: -16, driftX: -6, driftY: 7 },
  { x: 0.42, y: 0.25, scale: 0.82, rotation: 15, driftX: 6, driftY: 6 },
  { x: 0.66, y: 0.16, scale: 0.9, rotation: 8, driftX: -5, driftY: 6 },
  { x: 0.8, y: 0.22, scale: 0.38, rotation: 4, driftX: 0, driftY: 4 },

  { x: 0.18, y: 0.52, scale: 1, rotation: -14, driftX: -6, driftY: 7 },
  { x: 0.48, y: 0.54, scale: 0.4, rotation: 3, driftX: 0, driftY: 4 },
  { x: 0.72, y: 0.46, scale: 0.86, rotation: 14, driftX: 6, driftY: 5 },

  { x: 0.24, y: 0.82, scale: 0.94, rotation: 18, driftX: -6, driftY: 6 },
  { x: 0.52, y: 0.78, scale: 0.88, rotation: 14, driftX: 6, driftY: 5 },
];

function getPattern(width: number) {
  if (width < 640) return MOBILE_PATTERN;
  if (width < 1024) return TABLET_PATTERN;
  return DESKTOP_PATTERN;
}

function buildScatterNodes(width: number, height: number): ScatterNode[] {
  return getPattern(width).map((node) => ({
    x: node.x * width,
    y: node.y * height,
    scale: node.scale,
    rotation: node.rotation,
    driftX: node.driftX,
    driftY: node.driftY,
  }));
}

export default function ScatteredPawPrints({
  pawImageSrc,
  className = "",
  minHeight = "100svh",
  children,
}: ScatteredPawPrintsProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const pawRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [nodes, setNodes] = useState<ScatterNode[]>([]);
  const [baseSize, setBaseSize] = useState(48);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReducedMotion(mediaQuery.matches);

    handleChange();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    let frameId = 0;

    const updateLayout = () => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      setNodes(buildScatterNodes(rect.width, rect.height));
      setBaseSize(clamp(Math.min(rect.width, rect.height) * 0.11, 26, 72));
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateLayout);
    };

    updateLayout();

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(element);

    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("orientationchange", scheduleUpdate);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("orientationchange", scheduleUpdate);
    };
  }, []);

  useLayoutEffect(() => {
    const pawElements = pawRefs.current.filter(Boolean) as HTMLImageElement[];
    if (!pawElements.length || pawElements.length !== nodes.length) return;

    const ctx = gsap.context(() => {
      gsap.killTweensOf(pawElements);

      gsap.set(pawElements, {
        xPercent: -50,
        yPercent: -50,
        autoAlpha: reducedMotion ? 0.4 : 0,
        scale: 0.92,
        x: 0,
        y: 0,
        rotation: (index: number) => nodes[index]?.rotation ?? 0,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      if (reducedMotion) return;

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.2,
      });

      pawElements.forEach((paw, index) => {
        const node = nodes[index];
        const at = index * 0.08;

        tl.fromTo(
          paw,
          {
            autoAlpha: 0,
            scale: 0.84,
            x: node.driftX,
            y: node.driftY,
            rotation: node.rotation - 9,
          },
          {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotation: node.rotation,
            duration: 0.24,
            ease: "power2.out",
          },
          at
        );
      });

      tl.to(
        pawElements,
        {
          autoAlpha: 0,
          scale: 0.97,
          duration: 0.65,
          stagger: {
            each: 0.06,
            from: "random",
          },
          ease: "power1.inOut",
        },
        ">+=0.5"
      );
    }, rootRef);

    return () => ctx.revert();
  }, [nodes, reducedMotion]);

  pawRefs.current = pawRefs.current.slice(0, nodes.length);

  return (
    <section
      ref={rootRef}
      className={`fixed inset-0 z-50 overflow-hidden bg-[#006838] ${className}`.trim()}
      style={{ minHeight }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {nodes.map((node, index) => (
          <img
            key={index}
            ref={(el) => {
              pawRefs.current[index] = el;
            }}
            src={pawImageSrc}
            alt=""
            draggable={false}
            className="absolute select-none will-change-transform"
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              width: `${baseSize * node.scale}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-full items-center justify-center">
        {children}
      </div>
    </section>
  );
}