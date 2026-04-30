import React from "react";
import { Check } from "../assests/svg";

type FeatureItem = {
  label: string;
  icon?: React.ReactNode;
};

type ProtectionCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon?: React.ReactNode;
  features?: FeatureItem[];
  className?: string;
  contentClassName?: string;
  imageClassName?: string;
  iconColor?: string;
  tagIconColor?:string
};

function DefaultTopIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-8 w-8 text-[#4B6657]"
      aria-hidden="true"
    >
      <path
        d="M3 10.5 12 3l9 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 9.5V20h12V9.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 20v-6h4v6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProtectionCard({
  title,
  description,
  imageSrc,
  imageAlt,
  icon,
  features = [],
  className = "",
  contentClassName = "",
  imageClassName = "",
  iconColor = "#416352",
  tagIconColor="#B9DFC6"

}: ProtectionCardProps) {
  return (
    <article
      className={`w-full max-w-[600px] overflow-hidden rounded-[40px] bg-white  ${className}`}
    >
      <div
        className={`bg-white px-8 pb-10 pt-10 md:px-16 md:pb-12 md:pt-16 ${contentClassName}`}
      >
        <div className="flex items-center gap-6">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] md:h-[64px] md:w-[64px]"
          style={{
            backgroundColor:tagIconColor
          }}
          >
            {icon ?? <DefaultTopIcon />}
          </div>

          <h3 className="font-founders text-[28px] font-medium leading-[32px] tracking-[-0.9px] md:text-[32px] md:leading-[36px] lg:text-[36px] lg:leading-[40px]">
            {title}
          </h3>
        </div>

        <p className="mt-10 max-w-[520px] font-manrope text-[18px] leading-[1.65] text-[#4F4F4F] md:text-[20px]">
          {description}
        </p>

        {features.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
            {features.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                {<Check color={iconColor} />}
                <span
                  className={`font-manrope text-[16px] font-semibold leading-none `}
                  style={{
                    color: iconColor,
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        className={`relative h-[280px] w-full md:h-[320px] ${imageClassName}`}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover"
        />
      </div>
    </article>
  );
}
