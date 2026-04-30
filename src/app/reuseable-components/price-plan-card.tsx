import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PlanFeature {
  label: string;
}

export interface PetPlanSection {
  title: string; // e.g. "KITTEN" | "ADULT"
  titleColor: string;
  features: PlanFeature[];
}

export interface PricePlanCardProps {
  planName: string; // e.g. "ESSENTIAL"
  yearlyPrice: number; // e.g. 540
  monthlyPrice: number; // e.g. 45
  enrollmentFee?: number; // e.g. 75
  sections: PetPlanSection[]; // kitten, adult, or any custom sections
  bgColor?: string; // tailwind bg class or inline hex, default slate
  accentColor?: string; // tailwind text class for headings, default teal
  onClick?: () => void;
  tagColor?: string;
  priceColor?: string;
  listColor?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const PricePlanCard: React.FC<PricePlanCardProps> = ({
  planName,
  yearlyPrice,
  monthlyPrice,
  enrollmentFee,
  sections,
  bgColor = "#7a7f74",
  accentColor = "#4ade80",
  priceColor = "#000000",
  tagColor = "#000000",
  listColor = "#000000",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="relative md:w-[438px] w-full h-fit rounded-xl shadow-lg overflow-hidden cursor-pointer select-none"
      style={{ backgroundColor: bgColor }}
    >
      {/* ── Top: Pricing ──────────────────────────────────────────────────── */}
      <div className="px-6 pt-7 pb-5">
        {/* Plan name */}
        <p
          className="manrope text-center text-[14px] lg:text-[32px] font-extrabold uppercase leading-[15px] tracking-[2px] mb-5 "
          style={{ color: accentColor }}
        >
          {planName.toUpperCase()}
        </p>

        {/* Prices */}
        <div className="flex items-start justify-between px-1 ">
          {/* Yearly */}
          {/* <div className="flex flex-col">
            <span
              className="manrope text-center text-[48px] font-extrabold leading-[32px] tracking-[0]"
              style={{ color: priceColor }}
            >
              ${yearlyPrice}
            </span>
            <span
              className="manrope text-center text-[16px] font-bold leading-[35px] tracking-[0]"
              style={{ color: tagColor }}
            >
              /year
            </span>
          </div> */}

          {/* Monthly */}
          {/* <div className="flex flex-col items-end">
            <span
              className="manrope text-center text-[48px] font-extrabold leading-[32px] tracking-[0]"
              style={{ color: priceColor }}
            >
              ${monthlyPrice}
            </span>
            <span
              className="manrope text-center text-[16px] font-bold leading-[35px] tracking-[0]"
              style={{ color: tagColor }}
            >
              /month
            </span>
          </div> */}
        </div>

        {/* Enrollment fee */}
        {/* {enrollmentFee !== undefined && (
          <p
            className="manrope text-center text-[12px] font-medium leading-[16px] tracking-[0]"
            style={{ color: priceColor }}
          >
            + ${enrollmentFee} Enrollment Fee
          </p>
        )} */}
      </div>

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div className="mx-4 border-t border-[#e5e5e5] border-dashed" />

      {/* ── Sections ──────────────────────────────────────────────────────── */}
      <div className="px-6 pt-5 pb-8 flex flex-col gap-6">
        {sections.map((section, idx) => (
          <div key={idx}>
            {/* Section heading */}
            <p
              className="manrope text-center text-[16px]  font-extrabold uppercase leading-[15px] tracking-[5px]"
              style={{ color: section.titleColor || accentColor }}
            >
              {section.title.toUpperCase()}
            </p>

            {/* Features list */}
            <div className="flex flex-col gap-6 my-4">
              {section.features.map((feature, fIdx) => (
                <p
                  key={fIdx}
                  className="manrope text-center text-[16px] font-medium leading-[24px] tracking-[0]"
                  style={{ color: listColor }}
                >
                  {feature.label}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricePlanCard;
