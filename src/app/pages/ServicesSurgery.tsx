import { CheckCircle2, MapPinIcon, PawPrint } from "lucide-react";
import images from "../assests/images";
import ServicesBanner from "../reuseable-components/services-banner";
import { HighlightFeature } from "./ServicesDiagnosticCare";
import { ProactiveCare } from "../reuseable-components/proactive-care";
import { MessageSquareText, Activity, Pill } from "lucide-react";

import React from "react";
import {
  BriefcaseMedical,
  Bone,
  Scissors,
  Bandage,
  Asterisk,
} from "lucide-react";
import { Tooth } from "../assests/svg";
import DiagnosticJourneySection, {
  JourneyStep,
} from "../reuseable-components/journey-section";
import FaqSection, { FAQItem } from "../../imports/Home/faq-section/FaqSection";
import { useNavigate } from "react-router";
import { ROUTE } from "../../router";
import Seo from "../components/seo/Seo";
function CareHighlights() {
  const CARE_HIGHLIGHTS: HighlightFeature[] = [
    {
      icon: CheckCircle2,
      label: "Preventive Care",
    },
    {
      icon: PawPrint,
      label: "Dogs & Cats",
    },
    {
      icon: MapPinIcon,
      label: "San Antonio",
    },
  ];

  return (
    <section className="w-full max-w-[760px] rounded-[22px] border-2 border-[#FFFFFF94] bg-[#EDF9EC66] p-4 backdrop-blur-xl supports-[backdrop-filter]:bg-[#EDF9EC66]">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {CARE_HIGHLIGHTS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex  py-1 items-center gap-3 rounded-full border border-white/35 bg-[#FFFFFF73] px-5 text-[#173F35] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md whitespace-nowrap"
          >
            <Icon
              className="h-[17px] w-[17px] shrink-0 text-[#173F35]"
              strokeWidth={2.1}
            />
            <p className="text-base font-semibold manrope font-medium tracking-[-0.02em] md:text-[16px]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
const JOURNEY_STEPS: JourneyStep[] = [
  {
    number: 1,
    title: "Evaluation",
    description:
      "Comprehensive exam and pre-anesthetic bloodwork to ensure your pet is healthy for surgery.",
  },
  {
    number: 2,
    title: "Discussion",
    description:
      "We sit down to review findings,explain the procedure, and answer every question you have.",
  },
  {
    number: 3,
    title: "Clear Estimate",
    description:
      "Transparent pricing with a detailed breakdown of all expected costs and potential variables.",
  },
  {
    number: 4,
    title: "Safe Recovery",
    description:
      "State-of-the-art surgery followed by supervised recovery and a detailed discharge plan.",
  },
];
const surgeryItems = [
  {
    title: "Spay & Neuter",
    description:
      "Routine procedures to support long-term health and behavior, performed with precise anesthesia protocols.",
    icon: BriefcaseMedical,
    tone: "light",
    rotate: "rotate-[-1.28deg]",
  },
  {
    title: "Soft Tissue Surgery",
    description:
      "Procedures involving internal organs or skin, including abdominal explorations and foreign body removal.",
    icon: Bone,
    tone: "light",
    rotate: "rotate-[1.5deg]",
  },
  {
    title: "Mass Removal",
    description:
      "Expert removal of tumors or cysts with thorough pathology options to ensure complete care.",
    icon: Scissors,
    tone: "light",
    rotate: "rotate-[-1.2 deg]",
  },
  {
    title: "Dental Extractions",
    description:
      "Surgical oral care to treat advanced periodontal disease and relieve chronic pain.",
    icon: Tooth,
    tone: "light",
    rotate: "rotate-[1.37deg]",
  },
  {
    title: "Wound Care",
    description:
      "Advanced reconstruction and closure for complex lacerations or traumatic injuries.",
    icon: Bandage,
    tone: "light",
    rotate: "rotate-[-1.79deg]",
  },
  {
    title: "Emergency Surgery",
    description:
      "Rapid-response surgical intervention for life-threatening conditions and acute trauma.",
    icon: Asterisk,
    tone: "alert",
    rotate: "rotate-[0.7deg]",
  },
];
const SURGERY_FAQ_ITEMS: FAQItem[] = [
  {
    question: "Does my pet really need anesthesia?",
    answer: [
      "Yes. For a thorough and safe cleaning, especially below the gumline where 60% of disease hides, anesthesia is medically necessary. It prevents stress, ensures patient safety, and allows our specialists to perform high-precision work that isn’t possible while a pet is awake.",
    ],
  },
  {
    question: "How often is a professional cleaning required?",
    answer: [
      "Wellness plans cover predictable, routine costs that insurance typically excludes. Think of it as your maintenance plan, while insurance is for unpredictable accidents or illnesses.",
    ],
  },
  {
    question: "What about at-home dental maintenance?",
    answer: [
      "Urgent care visits are generally not included in base wellness plans, though some plans may offer discounted exam fees for members during emergency hours.",
    ],
  },
];
function SurgeryRecommendationSection() {
  return (
    <section className="w-full bg-[#272727] px-5 py-14 md:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="max-w-[760px]">
            <p className="font-manrope text-[10px] mb-5 font-bold uppercase tracking-[2.4px] text-[#FAABB0] md:text-[11px] lg:text-[12px]">
              Medical Expertise
            </p>
            <h2 className="font-founders max-w-[720px] text-[40px] font-normal leading-[46px] tracking-[0] md:text-[52px] md:leading-[58px] lg:text-[64px] lg:leading-[70.4px] text-white">
              When Surgery May
              <br />
              Be Recommended
            </h2>
          </div>

          <div className="max-w-[430px] pt-2 lg:justify-self-end lg:pt-16">
            <p className="manrope text-[16px] pt-2 font-medium leading-[24px] tracking-[0] md:text-[17px] text-[#C8D9CF] md:leading-[26px] lg:text-[18px] lg:leading-[28px]">
              From routine prevention to emergency interventions, our surgical
              suite is equipped for every need.
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {surgeryItems.map((item) => (
            <SurgeryCard
              key={item.title}
              title={item.title}
              description={item.description}
              icon={item.icon}
              tone={item.tone}
              rotate={item.rotate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type SurgeryCardProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  tone: "light" | "alert";
  rotate?: string;
};

function SurgeryCard({
  title,
  description,
  icon: Icon,
  tone,
  rotate = "",
}: SurgeryCardProps) {
  const isAlert = tone === "alert";

  return (
    <article
      className={[
        "rounded-[28px] p-8 md:p-10",
        "min-h-[300px] md:min-h-[314px]",
        "transition-transform duration-300",
        "hover:-translate-y-1",

        rotate,
        isAlert
          ? "bg-[#B50009] text-white shadow-[0_24px_50px_rgba(181,0,9,0.22)]"
          : "bg-[#F5F4F1] text-[#416352] shadow-[0_22px_44px_rgba(0,0,0,0.08)]",
      ].join(" ")}
    >
      <div className="flex h-full flex-col">
        <div
          className={[
            "flex h-[62px] w-[62px] items-center justify-center rounded-[18px]",
            isAlert
              ? "bg-white/90 text-[#B50009]"
              : "bg-[#DDEBDE] text-[#0D4734]",
          ].join(" ")}
        >
          <Icon className="h-7 w-7" strokeWidth={2.2} />
        </div>

        <h3
          className={[
            "mt-10 ",
            "font-founders text-[20px] font-medium leading-[28px] tracking-[0] md:text-[22px] md:leading-[30px] lg:text-[24px] lg:leading-[32px]",
            isAlert ? "text-white" : "text-[#416352]",
          ].join(" ")}
        >
          {title}
        </h3>

        <p
          className={[
            "mt-5 max-w-[320px]",
            "manrope text-[14px] font-medium leading-[22px] tracking-[0] md:text-[15px] md:leading-[24px] lg:text-[16px] lg:leading-[26px]",
            isAlert ? "text-white/90" : "text-[#414844]",
          ].join(" ")}
        >
          {description}
        </p>
      </div>
    </article>
  );
}

const careItems = [
  {
    title: "Constant Updates",
    description:
      "We text or call as soon as your pet is out of surgery and waking up.",
    icon: MessageSquareText,
  },
  {
    title: "Advanced Monitoring",
    description:
      "Full vitals tracking by a dedicated nurse from induction through recovery.",
    icon: Activity,
  },
  {
    title: "Multimodal Comfort",
    description:
      "Layered pain relief strategies to ensure a smoother, less painful recovery.",
    icon: Pill,
  },
];

function CarefulClearApproachSection() {
  return (
    <section className="w-full bg-[#f2fced] px-6 py-16 md:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-14 lg:grid-cols-[0.99fr_1.1fr] lg:items-center">
        <LeftContent />
        <RightCollage />
      </div>
    </section>
  );
}

function LeftContent() {
  return (
    <div className="max-w-[960px]">
      <h2 className="font-founders text-[38px] font-normal text-[#416352] leading-[100%] tracking-[0] md:text-[48px] lg:text-[60px] max-w-[520px]">
        <span className="font-founders text-[38px] font-bold leading-[42px] tracking-[0] md:text-[48px] md:leading-[50px] lg:text-[60px] lg:leading-[60px]">
          A Careful,
        </span>{" "}
        Clear
        <br />
        Approach
      </h2>

      <p
        
        className="mt-8 max-w-[520px] text-[#414844] manrope text-[16px] font-medium leading-[26px] tracking-[0] md:text-[18px] md:leading-[29px] lg:text-[20px] lg:leading-[32.5px]"
      >
        Beyond clinical expertise, we believe the best surgical outcomes start
        with a pet owner who feels informed and supported.
      </p>

      <div className="mt-12 space-y-8">
        {careItems.map((item) => (
          <CarePoint
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}

type CarePointProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

function CarePoint({ title, description, icon: Icon }: CarePointProps) {
  return (
    <div className="flex items-start gap-5">
      <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-[#DEF0D3] text-[#173D2E]">
        <Icon className="h-5 w-5" strokeWidth={2.2} />
      </div>

      <div>
        <h3
        
        className="font-founders text-[16px] font-bold leading-[24px] tracking-[0] md:text-[18px] md:leading-[26px] lg:text-[20px] lg:leading-[28px] text-[#416352]"
        >
          {title}
        </h3>

        <p  
        className="manrope text-[14px] font-medium mt-2 text-[#414844] leading-[22px] tracking-[0] md:text-[15px] md:leading-[24px] lg:text-[16px] lg:leading-[26px]"
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function RightCollage() {
  return (
    <div className="relative mx-auto w-full max-w-[760px]">
      <div className="relative min-h-[520px] sm:min-h-[620px] lg:min-h-[650px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[0.92fr_1.08fr] sm:items-start">
          <div className="sm:pt-14">
            <PhotoCard
              src={images.vetExaminHeart}
              alt="Veterinarian examining a cat"
              className="mx-auto max-w-[290px] h-[272px] sm:mx-0 sm:max-w-none"
            />
          </div>

          <PhotoCard
            src={images.modernRecoveryArea}
            alt="Surgical recovery room"
            className="mx-auto max-w-[285px] h-[363px] sm:max-w-none"
          />
        </div>

        <QuoteCard />
      </div>
    </div>
  );
}

type PhotoCardProps = {
  src: string;
  alt: string;
  className?: string;
};

function PhotoCard({ src, alt, className = "" }: PhotoCardProps) {
  return (
    <div
      className={[
        "overflow-hidden rounded-[30px]",
        "shadow-[0_30px_65px_rgba(0,0,0,0.22)]",
        className,
      ].join(" ")}
    >
      <img
        src={src}
        alt={alt}
        className="block w-full object-cover h-full"
      />
    </div>
  );
}

const beforeItems = [
  {
    title: "Fasting Instructions",
    description:
      "Typically no food after 10 PM the night before, but water is okay until arrival.",
  },
  {
    title: "Arrival Time",
    description:
      "Check-in is usually between 7:30 AM and 8:30 AM for morning procedures.",
  },
  {
    title: "Medication Review",
    description:
      "Please confirm with our team which daily medications should be given or withheld.",
  },
];

const afterItems = [
  {
    title: "Quiet Recovery",
    description:
      "Prepare a small, safe area for your pet to rest without stairs or energetic playmates.",
  },
  {
    title: "Incision Care",
    description:
      "Monitor the site daily for redness or swelling. No bathing for 10–14 days.",
  },
  {
    title: "Direct Access",
    description:
      "You’ll receive a direct line for any post-op questions during the recovery period.",
  },
];

 function SurgeryPrepRecoverySection() {
  return (
    <section className="w-full bg-[#F5F3EE80] px-6 py-16 md:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        <RuledNoteCard
          title="Before Surgery"
          items={beforeItems}
          rotate="-rotate-[1.4deg]"
        />

        <RuledNoteCard
          title="After Surgery"
          items={afterItems}
          rotate="rotate-[3deg]"
        />
      </div>
    </section>
  );
}

type NoteItem = {
  title: string;
  description: string;
};

type RuledNoteCardProps = {
  title: string;
  items: NoteItem[];
  rotate?: string;
};

function RuledNoteCard({
  title,
  items,
  rotate = "",
}: RuledNoteCardProps) {
  return (
    <article
      className={[
        "relative overflow-hidden rounded-[28px] border-8 border-white/80 bg-[#F7F7F5]",
        "px-6 py-8 shadow-[0_18px_40px_rgba(0,0,0,0.06)]",
        "md:px-10 md:py-10",
        rotate,
      ].join(" ")}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 42px, rgba(69,79,73,0.42) 43px, rgba(0,0,0,0) 44px)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-black/[0.03]"  />

      <div className="relative z-10"  
      >
        <h3
         
          className="font-queen text-[56px] font-normal leading-[28px] tracking-[0] md:text-[72px] md:leading-[32px] lg:text-[96px] lg:leading-[36px] text-[#416352]"
        >
          {title}
        </h3>

        <div className="mt-10 space-y-12 md:mt-12 md:space-y-14">
          {items.map((item, index) => (
            <div key={item.title} className="px-2">
              <div className="max-w-[460px]">
                <h4  
                className="font-founders text-[16px] text-[#416352] font-medium leading-[24px] tracking-[0] md:text-[17px] md:leading-[26px] lg:text-[18px] lg:leading-[28px]"
                
                >
                  {item.title}
                </h4>

                <p   
        
                className="mt-2 manrope text-[14px] font-medium leading-[20px] tracking-[0] md:text-[15px] md:leading-[22px] lg:text-[16px] lg:leading-[24px]"
                >
                  {item.description}
                </p>
              </div>

              {index !== items.length - 1 && (
                <div className="mt-8 h-px w-full bg-black/[0.03]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
function QuoteCard() {
  return (
    <div className="relative mt-6 sm:absolute sm:left-[4%] sm:top-[58%] sm:mt-0 sm:w-[46%] lg:left-[7%] lg:top-[56%] lg:w-[44%]">
      <div
        className="rounded-[20px] border border-black/5 bg-[#F8F8F5] px-8 py-8 shadow-[0_24px_55px_rgba(0,0,0,0.14)] sm:rotate-[-3deg]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 21px, rgba(84,92,85,0.12) 22px)",
        }}
      >
        <p
          
          className="font-queen text-[#416352] text-center text-[28px] font-normal leading-[22px] tracking-[0] md:text-[34px] md:leading-[26px] lg:text-[40px] lg:leading-[31px]"
        >
          “Your peace of
          <br />
          mind is
          <br />
          as important as
          <br />
          their
          <br />
          recovery”
        </p>
      </div>
    </div>
  );
}
const ServicesSurgery = () => {
  const navigate = useNavigate();
  return (
    <>
    <Seo
      title="Expert Surgical Care for Pets in San Antonio | Lili Veterinary Hospital"
      description="Trust Lili Veterinary Hospital in San Antonio for expert surgical care. Our experienced team provides compassionate, clear guidance and advanced pain management to ensure the best outcomes for your pet's health and recovery."
      path={ROUTE.surgery}
    />
      <main className="w-full">
      <ServicesBanner
        title={
          <>
            Clear Guidance, <br className="hidden lg:block" />
            <span className="text-[#204E1C]">Compassionate Care.</span>
          </>
        }
        description="We prioritize safety and advanced pain management so you can feel confident in your pet's path to recovery."
        primaryButtonLabel="Book Appointment"
        secondaryActionLabel="Speak with a Vet"
         onSecondaryClick={ROUTE.contact}
                onPrimaryClick={()=>navigate(ROUTE.bookAppointment)}
        visual={
          <div className="relative mr-[0rem] mt-[-1rem]">
            <img
              src={images.serviceSurgery}
              alt="Dental Care banner"
              className="lg:scale-[112%]"
            />

            <div className="absolute right-[5rem] top-[-3rem] hidden flex-col items-start lg:flex">
              <h1 className="font-queen rotate-[9.27deg] max-w-[278px] text-[50px] leading-[108%] tracking-[-0.03em] text-[#204E1C]">
                100% Dedicated care
              </h1>
              <img src={images.urgentBentArrow} alt="" />
            </div>
          </div>
        }
        highlights={<CareHighlights />}
        contentClassName="lg:max-w-[562px]"
        descriptionClass="lg:max-w-[525px]"
      />
      <ProactiveCare
        title="Thoughtful Surgical Care for
Dogs and Cats"
        desc='Hearing that your pet needs surgery is stressful. Our team is dedicated to guiding you through every step, ensuring you understand the "why" behind our recommendations and the "how" of their recovery. We treat every patient with the same meticulous care we would our own family.'
      >
        <div />
      </ProactiveCare>
      <SurgeryRecommendationSection />
      <DiagnosticJourneySection
        eyebrow="The Journey"
        title="What to Expect"
        steps={JOURNEY_STEPS}
      />
      <CarefulClearApproachSection />
      <SurgeryPrepRecoverySection />
      <FaqSection items={SURGERY_FAQ_ITEMS} />
    </main></>
  
  );
};

export default ServicesSurgery;
