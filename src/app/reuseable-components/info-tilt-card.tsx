// import React from "react";

// type InfoTiltCardProps = {
//   icon: string;
//   title: string;
//   description: string;
//   rotation?: number;
//   className?: string;
// };

// export function InfoTiltCard({
//   icon,
//   title,
//   description,
//   rotation = -5,
//   className = "",
// }: InfoTiltCardProps) {
//   return (
//     <div
//       className={`relative w-[298px] min-h-[318px] rounded-[42px] bg-[#f3f3f1] px-7 py-8 shadow-[0_22px_50px_rgba(0,0,0,0.18)] ${className}`}
//       style={{
//         transform: `rotate(${rotation}deg)`,
//         transformOrigin: "center",
//       }}
//     >
//       <div className="mb-8 flex h-12 w-12 items-center justify-center">
//         <img src={icon} alt="" />
//       </div>

//       <h3 className="mb-4 text-[22px] font-semibold leading-none tracking-[-0.02em] text-[#1f1f1f]">
//         {title}
//       </h3>

//       <p className="max-w-[260px] text-[16px] leading-[1.7] text-[#555555]">
//         {description}
//       </p>
//     </div>
//   );
// }
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type InfoTiltCardProps = {
  icon: string;
  title: string;
  description: string;
  rotation?: number;
  className?: string;
};




export function InfoTiltCard({
  icon,
  title,
  description,
  rotation = -5,
  className = "",
}: InfoTiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!cardRef.current || !iconRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(iconRef.current, {
        y: 0,
        transformOrigin: "center center",
        willChange: "transform",
      });

      gsap.to(iconRef.current, {
        y: -10,
        duration: 0.9,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(iconRef.current, {
        rotate: 4,
        duration: 1.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative lg:w-[298px] w-full min-h-[318px] rounded-[42px] bg-[#f3f3f1] px-7 py-8 shadow-[0_22px_50px_rgba(0,0,0,0.18)] lg:[transform:rotate(var(--card-rotation))] ${className}`}
      style={
        {
          "--card-rotation": `${rotation}deg`,
          transformOrigin: "center",
        } as React.CSSProperties
      }
    >
      <div
        ref={iconRef}
        className="mb-8 flex h-12 w-12 items-center justify-center"
      >
        <img
          src={icon}
          alt={title}
          className="pointer-events-none h-full w-full select-none object-contain"
        />
      </div>

      <h3 className="mb-4 font-founders text-[24px] font-bold leading-none tracking-[-0.02em] text-[#1f1f1f]">
        {title}
      </h3>

      <p className="manrope max-w-[260px] text-[18px] leading-[1.7] text-[#414844]">
        {description}
      </p>
    </div>
  );
}