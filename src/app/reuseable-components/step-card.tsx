export interface StepCardProps {
  /** Icon rendered inside the card (any React node — SVG, emoji, img …) */
  icon: string;
  /** Main heading */
  title: string;
  /** Supporting body text */
  description: string;
  /** Optional extra class names forwarded to the outer wrapper */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  rotation?: number;
}

// ── Component ──────────────────────────────────────────────────────────────
const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  className = "",
  onClick,
  rotation
}) => {
  return (
    <div
      onClick={onClick}
      className={[
        // Layout
        "relative flex flex-col gap-3 p-6 lg:h-[252px] h-full",
        // Glassmorphism
        "rounded-[48px]",
        "bg-[#EDF9EC8F] backdrop-blur-md",
        "border border-white/30",
        // Subtle inner highlight (top edge)
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_8px_32px_rgba(0,0,0,0.12)]",
        // Hover lift
        "transition-all duration-300 ease-out",
        "hover:bg-white/30 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.55),0_16px_40px_rgba(0,0,0,0.16)] hover:-translate-y-1",
        // Cursor
        onClick ? "cursor-pointer" : "cursor-default",
        className,
      ].join(" ")}
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center",
      }}
    >
      {/* Icon container */}
      <div className="w-10 h-10 flex items-center justify-center text-[#b33a2a]">
        <img src={icon} alt="calender" />
      </div>

      {/* Title */}
      <h3 className="text-[20px] font-semibold text-[#012D1D] font-space leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base manrope text-[#414844] leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default StepCard;
