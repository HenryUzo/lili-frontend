import InertiaHover from "./inertia-hover";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Info Collection",
    description:
      "Basic details about your pet and contact information for confirmation.",
    rotate: "md:-rotate-[2.5deg]",
  },
  {
    number: "02",
    title: "Timing Preferences",
    description:
      "Choose preferred time blocks that fit your schedule this week.",
    rotate: "md:rotate-[2deg]",
  },
  {
    number: "03",
    title: "Medical Context",
    description:
      "Share symptoms or records so our medical team can prepare ahead.",
    rotate: "md:-rotate-[1.5deg]",
  },
  {
    number: "04",
    title: "Staff Review",
    description:
      "Our team reviews and calls you within 2 business hours to finalize.",
    rotate: "md:rotate-[1.5deg]",
  },
];

function WhatToExpectNextSection() {
  return (
    <section className="bg-[#F4F2EC] px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="manrope text-[12px] font-bold uppercase tracking-[0.22em] text-[#416352]">
            The Process
          </p>

          <h2 className="mt-4 font-queen text-[64px] leading-[0.95] text-[#1B1C19] md:text-[72px] lg:text-[84px]">
            What to Expect Next
          </h2>

          <p className="mx-auto mt-5 max-w-[700px] manrope text-[18px] leading-[30px] text-[#414844] md:text-[20px] md:leading-[34px]">
            We’ve refined our appointment requests to ensure we’re fully
            prepared for your visit.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8">
          {PROCESS_STEPS.map((step) => (
            <InertiaHover key={step.number} strength={2} rotation={0} resistance={100}>
              <ProcessCard  {...step} />
            </InertiaHover>
          ))}
        </div>
      </div>
    </section>
  );
}

type ProcessCardProps = {
  number: string;
  title: string;
  description: string;
  rotate?: string;
};

function ProcessCard({
  number,
  title,
  description,
  rotate = "",
}: ProcessCardProps) {
  return (
    <article
      className={[
        "rounded-[28px] border border-[#ECE8E0] bg-[#FCFCFA]",
        "p-8 shadow-[0_8px_24px_rgba(0,0,0,0.03)]",
        "min-h-[260px] transition-transform duration-300",
        "hover:-translate-y-1",
        rotate,
      ].join(" ")}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#C9E7D2]">
          <span className="manrope text-[16px] font-bold leading-none text-[#416352]">
            {number}
          </span>
        </div>

        <h3 className="mt-10 manrope text-[18px] font-semibold leading-[28px] text-[#222222] md:text-[22px]">
          {title}
        </h3>

        <p className="mt-6 max-w-[240px] font-manrope text-[14px] leading-[23px] text-[#414844]">
          {description}
        </p>
      </div>
    </article>
  );
}

export default WhatToExpectNextSection;
