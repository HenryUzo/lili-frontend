
import images from "../../../app/assests/images";
import svgPaths from "../../../app/components/svgpath";
import PawButton from "../../../app/reuseable-components/paw-button";

const benefits = [
  "Preventive care stays on schedule",
  "Earlier detection of health issues",
  "More predictable pet-care costs",
  "Better long-term health for the pet",
  "Less decision stress for pet owners",
  "Stronger relationship",
  "Easier life-stage care",
];

function CheckIcon() {
  return (
    <div className="relative size-5 shrink-0 sm:size-6" data-name="check-icon">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g>
          <path d={svgPaths.pdf03080} fill="var(--fill-0, #214A1E)" />
        </g>
      </svg>
    </div>
  );
}

function BenefitRow({
  text,
  bordered = true,
}: {
  text: string;
  bordered?: boolean;
}) {
  return (
    <div className="relative flex w-full items-center gap-3 py-4 sm:gap-5 sm:py-5 lg:gap-8">
      {bordered && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border-b border-solid border-[#ececec]"
        />
      )}

      <p className="relative min-h-px min-w-px flex-1 font-founders text-[16px] leading-[1.2] tracking-[-0.02em] text-[#214b1e]  font-medium not-italic sm:text-[20px] lg:text-[24px] lg:leading-[1.077] lg:tracking-[-0.72px]">
        {text}
      </p>

      <div className="relative shrink-0 overflow-clip rounded-[8px] bg-[#f1ffeb] px-3 py-2 sm:px-5 sm:py-[7px] lg:px-[26px]">
        <CheckIcon />
      </div>
    </div>
  );
}

function BenefitsHeader() {
  return (
    <div className="relative flex w-full items-center gap-3 py-4 sm:gap-4 sm:py-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border-b border-solid border-[#006838]"
      />
      <p className="relative min-h-px min-w-px flex-1 font-founders text-[16px] leading-[1.1] tracking-[-0.03em] text-[#009444] not-italic sm:text-[18px] lg:text-[20px] lg:tracking-[-0.6px] font-medium font-founders">
        Benefits
      </p>

      <div className=" px-3 py-1 sm:px-4">
        <img src={images.logoTwo} alt="" />
      </div>
    </div>
  );
}

function BenefitsList() {
  return (
    <div className="relative w-full">
      <div className="relative flex w-full flex-col items-start">
        <BenefitsHeader />
        {benefits.map((item, index) => (
          <BenefitRow
            key={item}
            text={item}
            bordered={index !== benefits.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function WellnessPlanContent() {
  return (
    <div className="relative flex min-h-px min-w-px flex-1 flex-col items-start justify-center gap-6 px-1 py-2 sm:gap-8 lg:gap-[45px] lg:px-0 lg:py-0">
      <div className="relative w-full max-w-[561.671px] font-founders text-[30px] leading-[1.05] tracking-[-0.04em] text-[#009444] not-italic sm:text-[38px] md:text-[44px] lg:text-[48px] lg:leading-[0] lg:tracking-[-1.44px]">
        <span className="leading-[1.077] font-founders font-medium">
          Our Wellness Plan,
          <br aria-hidden="true" />
        </span>
        <span className="font-founders font-medium leading-[1.077] text-[#214a1e]">
          {" "}
          Your Pets lives happy
        </span>
      </div>

      <BenefitsList />
      <div className="flex items-center justify-end w-full">
           <PawButton  label="Go To Wellness"   variant="primary"  showIcon={false} />
      </div>
    

    </div>
  );
}

function WellnessPlanImagePanel() {
  return (
    <div
      className="relative w-full shrink-0 overflow-hidden rounded-[16px] aspect-[4/4.8] sm:aspect-[4/4.4] lg:aspect-auto lg:h-[906.274px] lg:w-[674.37px]"
      data-name="Wellness plan image"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[16px] pointer-events-none">
        <img
          alt=""
          className="absolute inset-0 size-full object-cover"
          src={images.doctreatdog}
        />
      </div>
    </div>
  );
}

function WellnessPlanCard() {
  return (
    <div className="relative w-full shrink-0 overflow-hidden rounded-[16px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[16px] bg-white"
      />

      <div className="flex size-full flex-col overflow-clip rounded-[inherit] lg:flex-row lg:items-center">
        <div className="relative flex w-full flex-col gap-5 p-4 sm:gap-6 sm:p-5 md:p-6 lg:flex-row lg:items-center lg:gap-8 lg:p-4">
          
          <WellnessPlanImagePanel />
          <WellnessPlanContent />

        </div>

      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_7.4px_0px_rgba(0,0,0,0.11)]" />
    </div>
  );
}

export default function WellnessPlanSection() {
  return (
    <section className="relative w-full shrink-0">
      <div className="relative flex w-full flex-col items-start px-4 pb-5 pt-3 sm:px-5 md:px-6 lg:px-[29px] lg:pb-[24px] lg:pt-[12px]">
        <WellnessPlanCard />
      </div>

    </section>
  );
}
