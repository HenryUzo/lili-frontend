import React, { useState } from "react";
import images from "../assests/images";

export interface NoteCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
  rotation?: number;
  className?: string;
  onClick?: () => void;
}

const Pin: React.FC<{ visible: boolean }> = ({ visible }) => (
  <div
    className="absolute -top-1 -right-10 z-20 -translate-x-1/2 transition-all duration-300 ease-out"
    style={{
      opacity: visible ? 1 : 0,
      transform: `translateX(-50%) translateY(${visible ? "0px" : "-6px"})`,
    }}
  >
   <img src={images.pin} alt="" />
  </div>
);

const NoteCard: React.FC<NoteCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  rotation = 0,
  className = "",
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={["relative pt-6", className].join(" ")}
      style={{ display: "inline-block" }}
    >
      <Pin visible={hovered} />

      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        className={[
          "relative flex lg:max-w-[290px] h-[397px] flex-col gap-4 overflow-hidden rounded-[32px] bg-white ",
          onClick ? "cursor-pointer" : "cursor-default",
        ].join(" ")}
      >
        <div className="h-[10px] w-full !bg-[#E1EBDC] rounded-t-[20px]" />

        <div className="relative z-10 p-5">
          <div className="mt-2 mb-4 h-[92px] w-[92px] shrink-0 overflow-hidden rounded-full border-2 border-gray-200">
            <img
              src={imageSrc}
              alt={imageAlt ?? title}
              className="h-full w-full object-cover grayscale"
              draggable={false}
            />
          </div>

          <h3 className="mb-3 text-[24px] font-space font-bold leading-tight text-[#012D1D]">
            {title}
          </h3>

          <p className="text-base font-medium leading-relaxed text-[#414844] manrope">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
