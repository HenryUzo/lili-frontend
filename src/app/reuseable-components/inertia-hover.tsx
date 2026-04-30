import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(InertiaPlugin);

/**
 * InertiaHover
 *
 * Props:
 *   strength         — how far elements drift (default 30px)
 *   rotation         — max rotation in deg from mouse inertia (default 15)
 *   resistance       — how fast inertia decays (default 180)
 *   scale            — subtle scale on hover (default 1.04)
 *   infiniteRotate   — enables endless idle rotation (default false)
 *   rotateSpeed      — seconds per full turn when infiniteRotate is true (default 12)
 *   rotateDirection  — "clockwise" | "counterclockwise" (default "clockwise")
 *   className        — forwarded to wrapper div
 */
export default function InertiaHover({
  children,
  strength = 30,
  rotation = 15,
  resistance = 180,
  scale = 1.04,
  infiniteRotate = false,
  rotateSpeed = 12,
  rotateDirection = "clockwise",
  className = "",
}) {
  const wrapperRef = useRef(null);
  const prevPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ vx: 0, vy: 0 });
  const idleSpinTween = useRef(null);

  const startIdleSpin = useCallback(() => {
    const el = wrapperRef.current;
    if (!el || !infiniteRotate) return;

    idleSpinTween.current?.kill();

    idleSpinTween.current = gsap.to(el, {
      rotation: rotateDirection === "clockwise" ? "+=360" : "-=360",
      duration: rotateSpeed,
      ease: "none",
      repeat: -1,
      transformOrigin: "center center",
    });
  }, [infiniteRotate, rotateSpeed, rotateDirection]);

  const stopIdleSpin = useCallback(() => {
    if (idleSpinTween.current) {
      idleSpinTween.current.kill();
      idleSpinTween.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    stopIdleSpin();
  }, [stopIdleSpin]);

  const handleMouseMove = useCallback(
    (e) => {
      const el = wrapperRef.current;
      if (!el) return;

      const { left, top, width, height } = el.getBoundingClientRect();
      const cx = left + width / 2;
      const cy = top + height / 2;

      const nx = (e.clientX - cx) / (width / 2);
      const ny = (e.clientY - cy) / (height / 2);

      const vx = e.clientX - prevPos.current.x;
      const vy = e.clientY - prevPos.current.y;

      prevPos.current = { x: e.clientX, y: e.clientY };
      velocity.current = { vx, vy };

      const spin = (nx * vy - ny * vx) / (Math.hypot(nx, ny) || 1);

      gsap.to(el, {
        inertia: {
          x: { velocity: vx * (strength / 5), end: 0 },
          y: { velocity: vy * (strength / 5), end: 0 },
          rotation: { velocity: spin * rotation, end: 0 },
          resistance,
        },
        scale,
        ease: "power2.out",
        duration: 0.15,
        overwrite: "auto",
      });
    },
    [strength, rotation, resistance, scale]
  );

  const handleMouseLeave = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;

    gsap.to(el, {
      inertia: {
        x: { velocity: velocity.current.vx * 0.3, end: 0 },
        y: { velocity: velocity.current.vy * 0.3, end: 0 },
        rotation: { velocity: 0, end: 0 },
        resistance: resistance * 0.6,
      },
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
      onComplete: () => {
        startIdleSpin();
      },
    });

    velocity.current = { vx: 0, vy: 0 };
  }, [resistance, startIdleSpin]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    if (infiniteRotate) {
      startIdleSpin();
    }

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      stopIdleSpin();
    };
  }, [
    handleMouseEnter,
    handleMouseMove,
    handleMouseLeave,
    infiniteRotate,
    startIdleSpin,
    stopIdleSpin,
  ]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        display: "inline-block",
        willChange: "transform",
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
}