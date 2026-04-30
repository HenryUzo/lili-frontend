import React from "react";

export interface ServiceCardProps {
  /** Icon rendered inside the card (any React node — SVG, emoji, img …) */
  icon: React.ReactNode;
  /** Main heading */
  title: string;
  /** Supporting body text */
  description: string;
  /** Bottom border accent color, e.g. "#1D9E75" or "rgba(29,158,117,0.8)" */
  borderBottomColor?: string;
  /** Optional extra class names forwarded to the outer wrapper */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  borderBottomColor = "#012D1D",
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        borderBottom: `4px solid ${borderBottomColor}`,
      }}
      className={[
        // Layout
        "relative flex flex-col gap-3 p-5 lg:h-[184px] h-full min-w-[273px] w-full",
        // Shape
        "rounded-2xl",
        // Background & border
        "bg-white border border-gray-200",
        // Shadow
        "shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
        // Hover
        "transition-all duration-300 ease-out",
        "hover:shadow-[0_8px_24px_rgba(0,0,0,0.13)] hover:-translate-y-1",
        // Cursor
        onClick ? "cursor-pointer" : "cursor-default",
        className,
      ].join(" ")}
    >
      {/* Icon */}
      <div className="w-8 h-8 flex items-center justify-center text-[#1D9E75]">
       <img src={icon} alt="" />
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-semibold text-gray-900 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[13.5px] text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;