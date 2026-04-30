import React, { use } from "react";
import { ROUTE } from "../../router";
import { useNavigate } from "react-router-dom";

// ── Types ──────────────────────────────────────────────────────────────────

export interface UrgentCareItem {
  label: string;
}

export interface UrgentCareSectionProps {
  /** Pill badge text */
  badge?: string;
  /** Main headline */
  headline?: string;
  /** Body paragraph */
  body?: string;
  /** List of warning symptoms */
  items?: UrgentCareItem[];
  /** CTA button label */
  ctaLabel?: string;
  /** CTA click handler */
  onCtaClick?: () => void;
  /** Right-side image URL (vet + dog photo) */
  imageSrc?: string;
  /** Alt text for the image */
  imageAlt?: string;
}

// ── Warning icon ───────────────────────────────────────────────────────────

const WarningIcon: React.FC = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 text-[#C0392B]"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────
const UrgentCareSection: React.FC<UrgentCareSectionProps> = ({
  badge = "URGENT CARE GUIDANCE",
  headline = "Is it an Emergency?",
  body = "Sometimes it's hard to tell if your pet needs immediate attention. We're here to help guide you through stressful moments with calm expertise.",
  items = [
    { label: "Difficulty breathing or choking" },
    { label: "Severe vomiting or persistent diarrhea" },
    { label: "Sudden inability to walk or staggering" },
  ],
  ctaLabel = "Book an Appointment",

  onCtaClick,
  imageSrc,
  imageAlt = "Veterinary team with dog",
}) => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden rounded-[28px] bg-[#0D2E1C] min-h-[440px]">
      {/* Right-side image */}
      {imageSrc && (
        <div className="absolute lg:block hidden inset-y-0 bottom-[-14rem] right-[-5rem] w-1/2 lg:w-[80%]">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover object-center"
          />
        </div>
      )}

      {/* Content column */}
      <div className="relative z-10 flex flex-col justify-center gap-6 px-8 py-12 md:px-12  max-w-[606px]">
        {/* Badge */}
        <span className="inline-flex w-fit items-center rounded-full bg-[#C0392B] px-4 py-1 text-[11px] font-semibold tracking-widest text-white uppercase manrope ">
          {badge}
        </span>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-space font-bold text-white leading-tight">
          {headline}
        </h2>

        {/* Body */}
        <p className="text-[18px] text-[#C1ECD4] manrope leading-relaxed max-w-[450px]">
          {body}
        </p>

        {/* Symptom list */}
        <ul className="flex flex-col gap-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-xl bg-white/10  border border-white/10 px-4 py-3"
            >
              <WarningIcon />
              <span className="text-base maprope text-white">{item.label}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={onCtaClick || (() => navigate(ROUTE.bookAppointment))}
          className="mt-2 inline-flex w-fit items-center rounded-full bg-[#C0392B] px-8 py-4 text-[15px] font-bold text-white transition-all duration-200 hover:bg-[#a93226] hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#C0392B]/30"
        >
          {ctaLabel}
        </button>
      </div>
    </section>
  );
};

export default UrgentCareSection;
