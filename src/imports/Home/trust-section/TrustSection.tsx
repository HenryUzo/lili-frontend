import React from "react";
import svgPaths from "../../../app/components/svgpath";
import TestimonialImageStack from "../../../app/reuseable-components/testimonial-videos";
import PawButton from "../../../app/reuseable-components/paw-button";

function PrimaryAppointmentButton() {
  return (
    <div className="bg-[#006838] content-stretch flex items-center justify-center overflow-clip p-[24px] relative rounded-[36px] shrink-0">
      <div className="flex flex-col font-['Test_Founders_Grotesk:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-none">Book Appointment</p>
      </div>
    </div>
  );
}

function PawIcon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="ion:paw">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="ion:paw">
          <path
            d={svgPaths.p15f8a400}
            fill="var(--fill-0, white)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function PawIconButton() {
  return (
    <div className="bg-[#006838] content-stretch flex items-center justify-center overflow-clip p-[16px] relative rounded-[36px] shrink-0">
      <PawIcon />
    </div>
  );
}

function AppointmentCtaGroup() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0">
      <PrimaryAppointmentButton />
      <PawIconButton />
    </div>
  );
}

function GoogleRatingIcons() {
  return (
    <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
      <div
        className="overflow-clip relative shrink-0 size-[36px]"
        data-name="star"
      >
        <div
          className="absolute inset-[8.33%_8.33%_12.42%_8.33%]"
          data-name="Icon"
        >
          <div className="absolute inset-[5.32%_-4.02%_-17%_-4.02%]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 32.4129 31.8615"
            >
              <g filter="url(#filter0_d_1_1524)" id="Icon">
                <path d={svgPaths.pe7fec00} fill="url(#paint0_linear_1_1524)" />
                <path
                  d={svgPaths.p3792100}
                  stroke="var(--stroke-0, #DBC477)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="31.8615"
                  id="filter0_d_1_1524"
                  width="32.4129"
                  x="0"
                  y="0"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  />
                  <feOffset dy="3" />
                  <feGaussianBlur stdDeviation="1.25" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                  />
                  <feBlend
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="effect1_dropShadow_1_1524"
                  />
                  <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1_1524"
                    mode="normal"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_1_1524"
                  x1="1.20644"
                  x2="31.2064"
                  y1="8.94478"
                  y2="21.0937"
                >
                  <stop stopColor="#BF953F" />
                  <stop offset="0.230769" stopColor="#FCF6BA" />
                  <stop offset="0.389423" stopColor="#DBC477" />
                  <stop offset="0.624586" stopColor="#E4982E" />
                  <stop offset="1" stopColor="#FBF5B7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="relative shrink-0 size-[25px]" data-name="devicon:google">
        <div
          className="absolute inset-[0.58%_1.57%_0.58%_1.6%]"
          data-name="Vector"
        >
          <svg
            className="absolute block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 24.2079 24.7084"
          >
            <path
              d={svgPaths.p262cdb80}
              fill="var(--fill-0, white)"
              id="Vector"
            />
          </svg>
        </div>

        <div
          className="absolute inset-[0.58%_15.98%_59.65%_6.84%]"
          data-name="Vector"
        >
          <svg
            className="absolute block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 19.2949 9.94292"
          >
            <path
              d={svgPaths.p9018a00}
              fill="var(--fill-0, #E33629)"
              id="Vector"
            />
          </svg>
        </div>

        <div
          className="absolute inset-[27.81%_76.96%_27.81%_1.58%]"
          data-name="Vector"
        >
          <svg
            className="absolute block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 5.36523 11.0938"
          >
            <path
              d={svgPaths.p1d348000}
              fill="var(--fill-0, #F8BD00)"
              id="Vector"
            />
          </svg>
        </div>

        <div
          className="absolute inset-[40.74%_1.57%_12.51%_50.99%]"
          data-name="Vector"
        >
          <svg
            className="absolute block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 11.8611 11.6875"
          >
            <path
              d={svgPaths.p3fbf9400}
              fill="var(--fill-0, #587DBD)"
              id="Vector"
            />
          </svg>
        </div>

        <div
          className="absolute inset-[59.62%_16.24%_0.62%_6.84%]"
          data-name="Vector"
        >
          <svg
            className="absolute block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 19.2305 9.93827"
          >
            <path
              d={svgPaths.p31001d80}
              fill="var(--fill-0, #319F43)"
              id="Vector"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function RatingsSummary() {
  return (
    <div className="content-stretch flex gap-[11px] items-center relative shrink-0">
      <GoogleRatingIcons />
      <p className="font-fonuders leading-[1.077] not-italic relative shrink-0 text-[#009444] font-medium text-[20px] whitespace-nowrap">
        4.3 ratings
      </p>
    </div>
  );
}

function TrustMetrics() {
  return (
    <div className="content-stretch flex lg:flex-nowrap flex-wrap justify-center lg:justify-start gap-[19px] items-center relative shrink-0">
      <RatingsSummary />
      <div className="relative shrink-0 size-[5.83px]">
        <svg
          className="absolute lg:block hidden size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 5.82996 5.82996"
        >
          <circle
            cx="2.91498"
            cy="2.91498"
            fill="var(--fill-0, #006838)"
            id="Ellipse 1435"
            r="2.91498"
          />
        </svg>
      </div>
      <p
        className="font-['Test_Founders_Grotesk:Medium','Noto_Sans:Medium',sans-serif] leading-[1.077] relative shrink-0 text-[#009444] text-[20px] whitespace-nowrap"
        style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 500" }}
      >
        🐾💚 1000+ pets treated
      </p>
    </div>
  );
}

function TrustContentColumn() {
  return (
    <div className="flex w-full max-w-[561.671px] flex-col items-start gap-5 px-4 sm:px-6 md:gap-6 md:px-0">
      <h2 className="w-full lg:text-left text-center leading-[1.08] tracking-[-0.03em]">
        <span className="font-fonuders text-[24px] text-[#009444] sm:text-[28px] lg:text-[32px]">
          We provide trusted veterinary{" "}
        </span>
        <span className="font-fonuders text-[24px] text-[#006838] sm:text-[28px] lg:text-[32px]">
          expertise, compassionate service, and long-term health support{" "}
        </span>
        <span className="font-fonuders text-[24px] text-[#009444] sm:text-[28px] lg:text-[32px]">
          for your pet
        </span>
      </h2>

      <p
        className="w-full lg:text-left text-center font-founders text-[16px] leading-[1.5] tracking-[-0.02em] text-[#333335] sm:text-[18px] lg:text-[20px]"
        style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}
      >
        When your pet isn't feeling well, you want help quickly. Our veterinary
        team provides same-day care for sick or injured pets and preventive
        wellness programs designed to keep pets healthy for years to come.
      </p>

      <div className="flex w-full flex-col items-start gap-4 sm:gap-[17px]">
        <div className="w-full sm:w-auto">
          <PawButton variant="primary" />
        </div>

        <div className="w-full">
          <TrustMetrics />
        </div>
      </div>
    </div>
  );
}

function TrustIntroRow() {
  return (
    <div className="content-stretch flex lg:flex-nowrap flex-wrap gap-[32px] items-center justify-center relative shrink-0 w-full px-6 py-10 md:px-10 lg:px-16 lg:py-16">
      <TestimonialImageStack />
      <TrustContentColumn />
    </div>
  );
}

function WhyParentsTrustUsHeading() {
  return (
    <div
      className="h-[161.735px] relative w-[235.131px]"
      data-name="why parents trust us"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 235.131 161.735"
      >
        <g id="why parents trust us">
          <path d={svgPaths.pc45d9f2} fill="var(--fill-0, #204E1C)" id="Vector" />
          <path d={svgPaths.p3818600} fill="var(--fill-0, #204E1C)" id="Vector_2" />
          <path d={svgPaths.p355dff80} fill="var(--fill-0, #204E1C)" id="Vector_3" />
          <path d={svgPaths.p16b3ee00} fill="var(--fill-0, #204E1C)" id="Vector_4" />
          <path d={svgPaths.p2becfd80} fill="var(--fill-0, #204E1C)" id="Vector_5" />
          <path d={svgPaths.p25afca00} fill="var(--fill-0, #204E1C)" id="Vector_6" />
          <path d={svgPaths.p2a8d6200} fill="var(--fill-0, #204E1C)" id="Vector_7" />
          <path d={svgPaths.pd802a00} fill="var(--fill-0, #204E1C)" id="Vector_8" />
          <path d={svgPaths.p319ede00} fill="var(--fill-0, #204E1C)" id="Vector_9" />
          <path d={svgPaths.p2f06e000} fill="var(--fill-0, #204E1C)" id="Vector_10" />
          <path d={svgPaths.p2f4cb680} fill="var(--fill-0, #204E1C)" id="Vector_11" />
          <path d={svgPaths.p3f290880} fill="var(--fill-0, #204E1C)" id="Vector_12" />
          <path d={svgPaths.pd9b3000} fill="var(--fill-0, #204E1C)" id="Vector_13" />
          <path d={svgPaths.p19c42500} fill="var(--fill-0, #204E1C)" id="Vector_14" />
          <path d={svgPaths.p2dffc00} fill="var(--fill-0, #204E1C)" id="Vector_15" />
          <path d={svgPaths.p2beccb00} fill="var(--fill-0, #204E1C)" id="Vector_16" />
          <path d={svgPaths.p14368740} fill="var(--fill-0, #204E1C)" id="Vector_17" />
        </g>
      </svg>
    </div>
  );
}

function CurvedArrowBody() {
  return (
    <div
      className="col-1 h-[36.817px] ml-0 mt-0 relative row-1 w-[90.552px]"
      data-name="Group"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 90.5524 36.8169"
      >
        <g id="Group">
          <path d={svgPaths.p3f5354c0} fill="var(--fill-0, #204E1C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CurvedArrowTip() {
  return (
    <div
      className="col-1 h-[10.804px] ml-[89.09px] mt-[8.87px] relative row-1 w-[3.279px]"
      data-name="Group"
    >
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 3.27927 10.8041"
      >
        <g id="Group">
          <path d={svgPaths.p53e00} fill="var(--fill-0, #204E1C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function CurvedArrowIcon() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative">
      <CurvedArrowBody />
      <CurvedArrowTip />
    </div>
  );
}

function TrustSectionFooterBadge() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 lg:w-[244.874px] w-full">
      <div
        className="flex h-[176.258px] items-center justify-center relative shrink-0 w-[244.874px]"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "22",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[-3.62deg]">
          <WhyParentsTrustUsHeading />
        </div>
      </div>

      <div
        className="flex h-[96.373px] items-center justify-center leading-[0] relative shrink-0 w-[48.512px]"
        style={
          {
            "--transform-inner-width": "1185",
            "--transform-inner-height": "43",
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[82.53deg]">
          <CurvedArrowIcon />
        </div>
      </div>
    </div>
  );
}

export default function TrustSection() {
  return (
    <section className="bg-[#f1ffeb] flex flex-col items-center relative w-full overflow-hidden">
      <div className="flex flex-col items-center relative w-full">
        <TrustIntroRow />
        <TrustSectionFooterBadge />
      </div>
    </section>
  );
}