import { useState } from "react";

export function PlanCard({
  image,
  title,
  description,
  link = "#",
  rotation = 0,
  borderColor,
}: {
  image: string;
  title: string;
  description: string;
  link?: string;
  rotation?: number;
  borderColor?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered
          ? `rotate(0deg) translateY(-6px)`
          : `rotate(${rotation}deg)`,
        transition:
          "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.18)"
          : "0 8px 30px rgba(0,0,0,0.10)",
        borderColor: borderColor,
      }}
      className="md:max-w-[389px] max-w-[290px] md:h-[440px] h-[460px] w-full lg:p-[32px] p-3 rounded-[48px] overflow-hidden cursor-pointer  bg-white  border-b-4 "
    >
      {/* Image */}
      <div className="rounded-[32px] w-full h-[192px] overflow-hidden">
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.08)" : "scale(1.06)",
            transition: "transform 0.5s ease",
          }}
        />
      </div>

      {/* Body */}
      <div className="py-6">
        <h3 className="font-space  text-[24px] font-bold leading-[32px] tracking-[0]">
          {title}
        </h3>
        <p className="my-3 manrope text-[16px] font-normal leading-[24px] tracking-[0]">
          {description}
        </p>
        <a
          href={link}
          onClick={(e) => e.preventDefault()}
          className="manrope text-center text-[16px] mt-3 font-bold leading-[24px] tracking-[0]"
        >
          Learn More
          <span
            style={{
              display: "inline-block",
              transform: hovered ? "translateX(4px)" : "translateX(0)",
              transition: "transform 0.3s ease",
            }}
          >
            →
          </span>
        </a>
      </div>
    </div>
  );
}
