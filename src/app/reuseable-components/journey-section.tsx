export type JourneyStep = {
  number: string | number;
  title: string;
  description: string;
};

type DiagnosticJourneySectionProps = {
  eyebrow?: string;
  title: string;
  steps: JourneyStep[];
  showConnectorLine?: boolean;
  sectionClassName?: string;
  containerClassName?: string;
  gridClassName?: string;
  cardClassName?: string;
  circleClassName?: string;
  titleClassName?: string;
  eyebrowClassName?: string;
  stepTitleClassName?: string;
  stepDescriptionClassName?: string;
};

export default function DiagnosticJourneySection({
  eyebrow = "Our Approach",
  title,
  steps,
  showConnectorLine = true,
  sectionClassName = "",
  containerClassName = "",
  gridClassName = "",
  cardClassName = "",
  circleClassName = "",
  titleClassName = "",
  eyebrowClassName = "",
  stepTitleClassName = "",
  stepDescriptionClassName = "",
}: DiagnosticJourneySectionProps) {
  return (
    <section
      className={`bg-[#272727] px-6 pb-20 pt-16 text-white md:px-12 lg:px-16 ${sectionClassName}`}
    >
      <div className={`mx-auto max-w-7xl ${containerClassName}`}>
        <div className="mb-16 flex flex-col items-center gap-2 text-center">
          <p
            className={`font-manrope text-[10px] font-bold uppercase tracking-[2.4px] text-[#F0BD8B] md:text-[11px] lg:text-[12px] ${eyebrowClassName}`}
          >
            {eyebrow}
          </p>

          <h2
            className={`my-8 text-center font-queen text-[48px] leading-[44px] md:text-[72px] md:leading-[60px] lg:text-[96px] lg:leading-[72px] ${titleClassName}`}
          >
            {title}
          </h2>
        </div>

        <div className="relative">
          {showConnectorLine && (
            <div
              className="absolute left-[2.5rem] right-[2.5rem] top-[2.5rem] hidden h-px bg-[#3A3A3A] md:block"
              aria-hidden="true"
            />
          )}

          <div
            className={`grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-x-10 md:gap-y-12 ${gridClassName}`}
          >
            {steps.map((step) => (
              <div
                key={`${step.number}-${step.title}`}
                className={`flex flex-col gap-5 ${cardClassName}`}
              >
                <div
                  className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-[#FBF9F4] shadow-lg ${circleClassName}`}
                >
                  <span className="font-manrope text-[24px] font-bold leading-[30px] text-[#012D1D] md:text-[27px] md:leading-[33px] lg:text-[30px] lg:leading-[36px]">
                    {step.number}
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <h3
                    className={`font-founders text-[20px] font-medium leading-[28px] text-white md:text-[22px] md:leading-[30px] lg:leading-[32px] ${stepTitleClassName}`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`font-manrope text-[16px] font-medium leading-[24px] text-[#C6EBD5B2] md:text-[17px] md:leading-[26px] lg:text-[18px] lg:leading-[29px] ${stepDescriptionClassName}`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}