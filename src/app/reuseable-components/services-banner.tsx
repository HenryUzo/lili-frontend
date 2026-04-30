import React from "react";
import PawButton from "./paw-button";
import { Link } from "react-router-dom";
import PhoneCallDialog from "./call-modal";

type BannerProps = {
  title: React.ReactNode;
  description: string;
  primaryButtonLabel?: string;
  onPrimaryClick?: () => void;
  secondaryActionLabel?: string;
  onSecondaryClick?: string;
  highlights?: React.ReactNode;
  sectionClassName?: string;
  contentClassName?: string;
  descriptionClass?: string;
  otherContent?: React.ReactNode;
  visual?: React.ReactNode;
  visualClassName?: string;
};

const ServicesBanner = ({
  title,
  description,
  primaryButtonLabel = "View Plans",
  onPrimaryClick,
  secondaryActionLabel,
  onSecondaryClick,
  highlights,
  sectionClassName = "",
  contentClassName = "",
  descriptionClass = "",
  otherContent,
  visual,
  visualClassName = "",
}: BannerProps) => {
  return (
    <section
      className={`relative w-full min-h-[100svh] overflow-hidden bg-[#F2F7EE] lg:h-[94vh] ${sectionClassName}`}
    >
      <div className="relative z-50 flex flex-col px-6 pt-10 md:px-16 lg:flex-row lg:items-start lg:justify-between">
        <div
          className={`flex flex-col gap-8 pb-[420px] sm:pb-[500px] lg:max-w-[562px] lg:pb-40 ${contentClassName}`}
        >
          {otherContent}

          <h1 className="font-founders whitespace-normal text-5xl font-medium leading-[108%] tracking-[-0.03em] text-[#006838] md:text-[64px] lg:whitespace-nowrap">
            {title}
          </h1>

          <p
            className={`font-founders text-lg font-normal leading-[108%] tracking-[-0.03em] lg:text-[24px] ${descriptionClass}`}
          >
            {description}
          </p>

          <div className="flex flex-wrap items-start gap-4">
            <PawButton
              variant="primary"
              className="!w-fit"
              label={primaryButtonLabel}
              onClick={onPrimaryClick}
            />

            {secondaryActionLabel && (
              secondaryActionLabel=== "Emergency call"  || secondaryActionLabel=== "Call Now" ? <PhoneCallDialog  trigger={ <Link

                to={ "#"}
                className="mt-0 cursor-pointer font-founders text-lg font-medium text-[#006838] underline lg:mt-5"
              >
                {secondaryActionLabel}
              </Link>}/>:
                
              <Link

                to={onSecondaryClick || "#"}
                className="mt-0 cursor-pointer font-founders text-lg font-medium text-[#006838] underline lg:mt-5"
              >
                {secondaryActionLabel}
              </Link>
            )}
          </div>

          {highlights}
        </div>
      </div>

      {visual && (
        <div
          className={`absolute bottom-0 left-1/2 z-20 w-[118%] max-w-[720px] -translate-x-1/2 lg:left-auto lg:right-[-2rem] lg:w-[58%] lg:max-w-none lg:translate-x-0 ${visualClassName}`}
        >
          {visual}
        </div>
      )}
    </section>
  );
};

export default ServicesBanner;