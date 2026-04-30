import React from "react";

interface PropsCardProps {
  title?: string;
  backgroundImage?: string;
  onClick?: () => void;
}

const PropsCard: React.FC<PropsCardProps> = ({
  title = "Routine Wellness Exams",
  onClick,
  icon,
}) => {
  return (
    <div
      onClick={onClick}
      className="relative bg-[#EDF9EC66] backdrop-blur-[2px] lg:max-w-[281px] h-[152px] rounded-[18px] overflow-hidden cursor-pointer select-none
                 shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#FFFFFF94]"
    >
      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full gap-2.5 px-4">
        {/* Icon circle */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(245, 248, 242, 0.92)" }}
        >
          {icon}
        </div>

        {/* Label */}
        <p
          className="m-0 text-sm font-semibold text-center leading-tight tracking-wide"
          style={{ color: "#ffffff" }}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default PropsCard;
