import React, { ReactNode } from "react";

type HowItWorksStep = {
  id: string | number;
  title: string;
  description: string;
  circleColor?: string;
  icon?: ReactNode;
};

type HowItWorksSectionProps = {
  title: string;
  steps: HowItWorksStep[];
  sectionClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
  stepClassName?: string;
  circleClassName?: string;
  stepTitleClassName?: string;
  stepDescriptionClassName?: string;
  header?: string;
};

export function HowItWorksSection({
  title,
  steps,
  sectionClassName = "",
  containerClassName = "",
  titleClassName = "",
  stepClassName = "",
  circleClassName = "",
  stepTitleClassName = "",
  stepDescriptionClassName = "",
  header,
}: HowItWorksSectionProps) {
  return (
    <section
      className={`w-full bg-[#D8DED3] px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24 ${sectionClassName}`}
    >
      <div className={`mx-auto max-w-[1200px] ${containerClassName}`}>
        {header && (
          <h1 className=" text-[#95442D]  mb-12 font-manrope text-center text-[12px] font-bold uppercase leading-[18px] tracking-[1.4px] md:text-[13px] md:leading-[19px] lg:text-[14px] lg:leading-[20px]">
            {header}
          </h1>
        )}

        <h2
          className={`font-founders text-center lg:text-[96px] text-2xl font-queen font-medium leading-[40px] text-[#1B1C19] ${titleClassName}`}
        >
          {title}
        </h2>

        <div className="mt-18 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-14">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center text-center ${stepClassName}`}
            >
              <div
                className={`flex h-[78px] w-[78px] items-center justify-center rounded-full font-space text-[24px] font-bold leading-[36px] text-white md:h-[80px] md:w-[80px] md:text-[26px] ${
                  step.circleColor || "bg-[#006838]"
                } ${circleClassName}`}
              >
                {step.icon ? step?.icon : step.id}
              </div>

              <h3
                className={`mt-7 font-manrope text-[20px] font-bold leading-snug text-[#1F1F1F] md:text-[24px] ${stepTitleClassName}`}
              >
                {step.title}
              </h3>

              <p
                className={`mt-3 max-w-[320px] font-manrope text-[18px] leading-[1.45] text-[#5E645F] ${stepDescriptionClassName}`}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
