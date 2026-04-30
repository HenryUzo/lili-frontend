import React from "react";
import PawButton from "../reuseable-components/paw-button";
import { CheckCircle2, PawPrint, FileText, MapPin } from "lucide-react";
import images from "../assests/images";
import { PlanCard } from "../reuseable-components/plan-card";
import ReusableCarousel from "../reuseable-components/reusable-carousel";
import PropsCard from "../reuseable-components/props-card";
import InertiaHover from "../reuseable-components/inertia-hover";
import {
  Diagnostics,
  Guide,
  MedBox,
  MindWork,
  Parasite,
  Stage,
  Syringe,
  Tooth,
} from "../assests/svg";
import ProTipCard from "../reuseable-components/pro-tip-card";
import PricePlanCard from "../reuseable-components/price-plan-card";
import FaqSection from "../../imports/Home/faq-section/FaqSection";
import { Link } from "react-router";
import { ROUTE } from "../../router";
import Seo from "../components/seo/Seo";
const features = [
  {
    icon: CheckCircle2,
    label: "Preventive care support",
  },
  {
    icon: PawPrint,
    label: "Dogs and cats welcome",
  },
  {
    icon: FileText,
    label: "Clear treatment options",
  },
  {
    icon: MapPin,
    label: "San Antonio & Beyond",
  },
];
const steps = [
  {
    id: "1",
    title: "Choose a Plan",
    description:
      "Select the life-stage plan that best fits your pet’s current age and health needs.",
    circleColor: "bg-[#012D1D]",
  },
  {
    id: "2",
    title: "Schedule Your Visit",
    description:
      "Book your initial wellness exam and we’ll get your pet’s preventive schedule started.",
    circleColor: "bg-[#AD321C]",
  },
  {
    id: "3",
    title: "Enjoy Benefits",
    description:
      "Rest easy knowing vaccines, screenings, and routine exams are covered and handled by experts.",
    circleColor: "bg-[#012D1D]",
  },
];
const kittenSectionE = {
  title: "Kitten",
  titleColor: "#009444",
  features: [
    { label: "2 Comprehensive Wellness Exam" },
    { label: "4 Wellness Kitten Exam" },
    { label: "Core Vaccine Series\n(Fvrcp and Rabies)" },
    { label: "2 Fecal Parasite exams and Deworming" },
    { label: "1 FeLV/FIV Testing" },
  ],
};

const adultSectionE = {
  title: "Adult",
  titleColor: "#224232",
  features: [
    { label: "2 Comprehensive Wellness Exam" },
    { label: "Core Vaccine Series\n(Fvrcp and Rabies)" },
    { label: "1 Fecal Parasite Exams" },
    { label: "10% Additional (out of plan) Discounts" },
  ],
};
const kittenSectionC = {
  title: "Kitten",
  titleColor: "#67ED00",
  features: [
    { label: "2 Comprehensive Wellness Exam" },
    { label: "4 Wellness Kitten Exam" },
    { label: "Core Vaccine Series\n(Fvrcp and Rabies)" },
    { label: "2 Fecal Parasite exams and Deworming" },
    { label: "2 FeLV/FIV Testing" },
    { label: "1 Early Diagnostic Bloodwork" },
    { label: "150 Spay/Neuter Surgical Credit" },
  ],
};

const adultSectionC = {
  title: "Adult",
  titleColor: "#CBDA21",
  features: [
    { label: "2 Comprehensive Wellness Exam" },
    { label: "Core Vaccine Series\n(Fvrcp and Rabies)" },
    { label: "2 Fecal Parasite Exams" },
    { label: "10% Additional (out of plan) Discounts" },
    { label: "1 Annual Wellness Bloodwork (CBC/Chem)" },
    { label: "1 Urinalysis" },
    { label: "1 Blood Pressure Screening" },
    { label: "50% Dental Cleaning Discount" },
    { label: "Additional Tech Visit" },
    { label: "Additional (out of plan) Discounts" },
  ],
};
function CareHighlights() {
  return (
    <section className="w-full max-w-[760px] rounded-[22px] border-2 border-[#FFFFFF94] bg-[#EDF9EC66]  p-4  backdrop-blur-xl supports-[backdrop-filter]:bg-[#EDF9EC66]">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {features.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex min-h-[56px] items-center gap-3 rounded-full border border-white/35 bg-white/25 px-5 text-[#173F35] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md"
          >
            <Icon
              className="h-[17px] w-[17px] shrink-0 text-[#173F35]"
              strokeWidth={2.1}
            />
            <p className="text-[15px] font-medium tracking-[-0.02em] md:text-[16px]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
export function Banner({ onViewPlans }: { onViewPlans?: () => void }) {
  return (
    <section className="relative w-full min-h-[100svh] lg:h-[94vh] bg-[#F2F7EE] overflow-hidden">
      <div className="relative z-50 px-6 md:px-16 pt-10 flex lg:flex-row flex-col">
        <div className="lg:max-w-[562px] pb-[420px] sm:pb-[500px] lg:pb-40 flex flex-col gap-8">
          <h1 className="font-founders font-medium md:text-[64px] text-[48px] leading-[108%] tracking-[-0.03em] text-[#006838]">
            Stay Ahead <br className="lg:block hidden" />{" "}
            <span className="text-[#204E1C]">of Your Pet’s</span>{" "}
            <span className="text-[#ED1C24]">Health</span>
          </h1>

          <p className="font-founders text-[24px] lg:max-w-[388px] font-normal leading-[108%] tracking-[-0.03em]">
            If your pet is sick or injured, our team may be able to provide
            same-day care. Call ahead and we’ll guide you on the next best step.
          </p>

          <div className="flex flex-wrap items-start gap-4">
            <PawButton
              variant="primary"
              className="!w-fit"
              label="View Plans"
              onClick={onViewPlans}
            />

            <Link
              to={ROUTE.bookAppointment}
              className="mt-0 lg:mt-5 font-founders underline text-lg font-medium text-[#006838] cursor-pointer"
            >
              Book Wellness Visit
            </Link>
          </div>

          <CareHighlights />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 w-[115%] max-w-[760px] -translate-x-1/2 lg:left-auto lg:right-[-2rem] lg:w-[58%] lg:max-w-none lg:translate-x-0">
        <img
          src={images.servicesBg}
          alt=""
          className="w-full origin-bottom object-contain lg:scale-[105%]"
        />

        <div className="hidden lg:flex flex-col items-start absolute right-[4rem] top-6">
          <h1 className="font-queen text-[40px] text-[#204E1C] rotate-[9.27deg]">
            100% Dedicated care
          </h1>

          <img src={images.urgentBentArrow} alt="" />
        </div>
      </div>
    </section>
  );
}

// function ProactiveCare() {
//   return (
//     <section className="bg-[#214A1E] w-full">
//       <div className="bg-[#214A1E] px-6 md:px-16 pt-10 pb-32 lg:pb-40 flex flex-col justify-center items-center">
//         <h1 className="heading lg:text-[72px] text-2xl text-center text-white lg:max-w-[670px]">
//           Proactive Care for a Lifetime of Tail Wags and Purrs
//         </h1>
//         <p className=" lg:max-w-[670px] text-[#DADADA] my-3 manrope text-center text-[18px] font-normal leading-[29.25px] tracking-[0]">
//           Wellness plans are designed to prevent illness before it happens.
//           Unlike emergency care which addresses sudden medical crises, our
//           wellness plans provide a structured, calm approach to routine health
//           maintenance, ensuring your pet receives high-quality preventive
//           screenings and vaccinations year-round.
//         </p>
//         <div className="flex items-center justify-center gap-8 mt-10">
//           <PlanCard
//             image={images.puppyPlan}
//             title="Puppy & Kitten Plans"
//             description="Early health monitoring, core vaccines, and professional growth guidance for your newest family member."
//             rotation={-1.5}
//              borderColor="#BF328C"
//           />
//           <PlanCard
//             image={images.dogPlan}
//             title="Puppy & Kitten Plans"
//             description="Early health monitoring, core vaccines, and professional growth guidance for your newest family member."
//             borderColor="#AD321C"
//           />{" "}
//           <PlanCard
//             image={images.seniorPlan}
//             title="Puppy & Kitten Plans"
//             description="Early health monitoring, core vaccines, and professional growth guidance for your newest family member."
//             rotation={1.2}
//             borderColor="#DD422C"

//           />
//         </div>
//       </div>
//     </section>
//   );
// }
function ProactivePlan() {
  const plans = [
    {
      image: images.puppyPlan,
      title: "Puppy & Kitten Plans",
      description:
        "Early health monitoring, core vaccines, and professional growth guidance for your newest family member.",
      rotation: -1.5,
      borderColor: "#BF328C",
    },
    {
      image: images.dogPlan,
      title: "Adult Dog & Cat Plans",
      description:
        "Routine exams, preventive screenings, and year-round care to keep your pet healthy and thriving.",
      rotation: 0,
      borderColor: "#AD321C",
    },
    // {
    //   image: images.seniorPlan,
    //   title: "Senior Pet Plans",
    //   description:
    //     "More frequent monitoring and age-focused support to help senior pets stay comfortable and well cared for.",
    //   rotation: 1.2,
    //   borderColor: "#DD422C",
    // },
  ];
  return (
    <div>
      {/* mobile carousel */}
      <div className="mt-10 w-full lg:hidden">
        <ReusableCarousel
          cardWidth={320}
          maxWidthClassName="max-w-full"
          buttonClassName="border border-white/20 bg-white/10 text-white backdrop-blur-sm"
          trackClassName="gap-5"
        >
          {plans.map((plan, index) => (
            <PlanCard
              key={index}
              image={plan.image}
              title={plan.title}
              description={plan.description}
              rotation={0}
              borderColor={plan.borderColor}
              // className="!w-[300px]"
            />
          ))}
        </ReusableCarousel>
      </div>

      {/* desktop row */}
      <div className="mt-10 hidden items-center justify-center gap-8 lg:flex">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            image={plan.image}
            title={plan.title}
            description={plan.description}
            rotation={plan.rotation}
            borderColor={plan.borderColor}
          />
        ))}
      </div>
    </div>
  );
}
function ProactiveCare() {
  return (
    <section className="w-full bg-[#214A1E]">
      <div className="flex flex-col items-center justify-center bg-[#214A1E] px-6 pt-10 pb-32 md:px-16 lg:pb-40">
        <h1 className="heading text-5xl text-center text-white lg:max-w-[670px] lg:text-[72px]">
          Proactive Care for a Lifetime of Tail Wags and Purrs
        </h1>

        <p className="my-3 text-center text-[18px] font-normal leading-[29.25px] tracking-[0] text-[#DADADA] lg:max-w-[670px] manrope">
          Wellness plans are designed to prevent illness before it happens.
          Unlike emergency care which addresses sudden medical crises, our
          wellness plans provide a structured, calm approach to routine health
          maintenance, ensuring your pet receives high-quality preventive
          screenings and vaccinations year-round.
        </p>

        <ProactivePlan />
      </div>
    </section>
  );
}

function WhatIncluded() {
  const items = [
    { title: "Routine Wellness Exams", icon: <MedBox /> },
    { title: "Core Vaccinations", icon: <Syringe /> },
    { title: "Preventive Diagnostics", icon: <Diagnostics /> },
    { title: "Parasite Screening", icon: <Parasite /> },
    { title: "Oral Health Checks", icon: <Tooth /> },
    { title: "Life-Stage Monitoring", icon: <Stage /> },
    { title: "Continuous Guidance", icon: <MindWork /> },
    { title: "Peace of Mind", icon: <Guide /> },
  ];

  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat px-[24px] md:px-[64px] py-12 lg:min-h-[532px]"
      style={{ backgroundImage: `url(${images.howItWork})` }}
    >
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col gap-8">
        <h1 className="font-queen text-center text-5xl leading-none text-white lg:text-[72px]">
          What’s Included
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <InertiaHover strength={2} rotation={0} resistance={100}>
              <PropsCard key={item.title} title={item.title} icon={item.icon} />
            </InertiaHover>
          ))}
        </div>
      </div>
    </section>
  );
}
function ScrapbookofHealth() {
  return (
    <section className="relative w-full  px-[24px] md:px-[64px] py-12 bg-white ">
      <div className="flex md:flex-row flex-col items-center justify-center gap-8 ">
        <div className="grid  md:grid-cols-2 grid-cols-1 gap-4">
          <InertiaHover strength={4} rotation={0}>
            <img src={images.precdictableRoutine} alt="precdictable routine" />
          </InertiaHover>
          <InertiaHover strength={4} rotation={0}>
            <img src={images.earlyDetection} alt="early detection" />
          </InertiaHover>
          <InertiaHover strength={4} rotation={0}>
            <img src={images.easierBudget} alt="easier budget" />
          </InertiaHover>
          <InertiaHover strength={4} rotation={0}>
            <img src={images.lessStress} alt="less stress" />
          </InertiaHover>
        </div>
        <div className="max-w-[622px]">
          <h1 className="font-founders text-[36px] font-medium leading-[40px] tracking-[0]">
            A Scrapbook of Health
          </h1>
          <p className="manrope text-[18px] font-normal leading-[28px] tracking-[0] my-6 ">
            We treat your pet’s health record like a cherished story. By
            choosing a wellness plan, you're investing in the long-term chapters
            of their life, ensuring every page is filled with vitality and care.
          </p>
          <ProTipCard imageSrc={images.docQuote} />
        </div>
      </div>
    </section>
  );
}
function PricePlan() {
  return (
    <section
      id="wellness-plans"
      className="relative w-full px-[24px]  md:px-[64px] py-12 bg-white bg-cover bg-center bg-repeat"
      style={{ backgroundImage: `url(${images.wellnessPlanBg})` }}
    >
      <div className="flex items-center flex-col justify-center">
        <h1 className="heading text-[96px] text-[#1B1C19] text-center">
          Wellness Plans
        </h1>
        <p className=" max-w-[924px] my-6 text-base  manrope text-center  text-[#4C534F] leading-[26px]">
          Wellness Plans offer a convenient and affordable way to ensure your
          pet receives the necessary care. These plans consist of a monthly
          collection of discounted healthcare services tailored for your furry
          friend.
        </p>
        <p className=" max-w-[924px] my-6 text-base  manrope text-center  text-[#4C534F] leading-[26px]">
          During an exam with our veterinary doctor, we assess the health of
          pets of all ages, helping to identify any early issues. Annual testing
          checks for parasites, infections, and cancer, while the visit also
          includes vaccinations and preventive measures against fleas, ticks,
          and heartworms to keep your pet safe and healthy.
        </p>
        <div className="flex lg:flex-row flex-col justify-center gap-6 my-6">
          <PricePlanCard
            planName="Essential"
            yearlyPrice={540}
            monthlyPrice={45}
            enrollmentFee={75}
            sections={[kittenSectionE, adultSectionE]}
            bgColor="#FFFFFF"
            accentColor="#416352"
            priceColor="#1B1C19"
            tagColor="#414844"
            listColor="#414844"
          />

          <div className="relative">
            <div className="absolute z-20 -top-12 right-0 md:right-[-4rem] pointer-events-none">
              <InertiaHover
                strength={6}
                rotation={0}
                infiniteRotate
                rotateSpeed={5}
              >
                <img
                  src={images.bestValue}
                  alt="Best value"
                  className="w-[120px] md:w-[140px] h-auto"
                />
              </InertiaHover>
            </div>

            <PricePlanCard
              planName="COMPLETE"
              yearlyPrice={780}
              monthlyPrice={65}
              enrollmentFee={75}
              sections={[kittenSectionC, adultSectionC]}
              bgColor="#009345"
              accentColor="#ffffff"
              priceColor="#FFFFFF"
              tagColor="#FFFFFF"
              listColor="#FFFFFF"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="w-full bg-[#D8DED3] px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-founders text-center text-[36px] font-medium leading-[40px] tracking-[0] text-[#012D1D]">
          Three Simple Steps to Wellness
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-14">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`flex h-[78px] w-[78px] items-center justify-center rounded-full text-[24px] font-space text-center  font-bold leading-[36px] tracking-[0]  text-white md:h-[80px] md:w-[80px] md:text-[26px] ${step.circleColor}`}
              >
                {step.id}
              </div>

              <h3 className="mt-7 manrope text-[20px] font-bold leading-snug text-[#1F1F1F] md:text-[24px]">
                {step.title}
              </h3>

              <p className="mt-3 manrope max-w-[320px] text- text-[18px] leading-[1.45] text-[#5E645F]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const Services = () => {
  const handleScrollToPlans = () => {
    const section = document.getElementById("wellness-plans");
    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <>
      <Seo
        title="Pet Wellness Plans in Lagos | Lili Veterinary Hospital"
        description="Explore Lili Veterinary Hospital’s pet wellness plans in Lagos, designed to support preventive care, routine checkups, vaccinations, health monitoring, and long-term wellbeing for your pet."
        path={ROUTE.wellnessPlans}
      />

      <main className="w-full">
        <Banner onViewPlans={handleScrollToPlans} />
        <ProactiveCare />
        <WhatIncluded />
        <ScrapbookofHealth />
        <PricePlan />
        <HowItWorksSection />
        <FaqSection />
      </main>
    </>
  );
};

export default Services;
