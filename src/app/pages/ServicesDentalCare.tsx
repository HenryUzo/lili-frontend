import { MdOutlineStars, MdOutlineThumbUp } from "react-icons/md";
import ServicesBanner from "../reuseable-components/services-banner";
import images from "../assests/images";
import { GoPulse } from "react-icons/go";
import {
  CheckCircle2,
  LocateIcon,
  MapPinCheck,
  MapPinIcon,
  PawPrint,
  WindIcon,
} from "lucide-react";
import { HighlightFeature } from "./ServicesDiagnosticCare";
import { ProactiveCare } from "../reuseable-components/proactive-care";
import { Chat, Check, Cutlerys, SadIcon } from "../assests/svg";

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

const WarningIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-5 h-5 flex-shrink-0"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
  </svg>
);

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

function BentoCard({ className = "", children }: CardProps) {
  return (
    <div
      className={[
        "rounded-[32px] md:rounded-[40px]",
        "border border-black/5",
        "shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

const signs = [
  {
    title: "Eating Difficulty",
    description: "Dropping kibble or preferring soft food over hard.",
    accent: "#6BA173",
    icon: <Cutlerys />,
    rotate: -1.98,
  },
  {
    title: "Face Pawing",
    description: "Frequent pawing at the mouth or rubbing face on carpet.",
    accent: "#D9242A",
    icon: <HandIcon />,
    rotate: 2.96,
  },
  {
    title: "Hypersalivation",
    description: "Excessive drooling that is unusual for your pet’s breed.",
    accent: "#8B5A2B",
    icon: <DropletIcon />,
    rotate: 1.36,
  },
  {
    title: "Irritability",
    description: "Sudden withdrawal or aggression when face is touched.",
    accent: "#E5C300",
    icon: <SadFaceIcon />,
    rotate: -2.52,
  },
];

function SubtleSignsSection() {
  return (
    <section className="w-full bg-[#FBF9F4] px-6 py-16 md:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Left */}
        <div className="w-full">
          <div className="max-w-[620px]">
            <h2 className="font-founders text-[32px] font-medium leading-[36px] tracking-[-1.2px] md:text-[40px] md:leading-[42px] lg:text-[48px] lg:leading-[48px] text-[#416352]">
              Subtle Signs to Watch Closely
            </h2>

            <p className="mt-6 max-w-[560px] text-[18px] font-light leading-[1.55] text-[#414844] md:text-[20px] manrope">
              Watch for these behavioral changes that might indicate your pet is
              struggling with oral discomfort.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-12">
            {signs.map((item) => (
              <NotebookCard
                key={item.title}
                title={item.title}
                description={item.description}
                accent={item.accent}
                icon={item.icon}
                rotate={item?.rotate}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[720px] gap-12">
          <div className="absolute left-1/2 top-0 z-20 w-full max-w-[340px] -translate-x-1/2 text-center lg:left-auto lg:right-[40px] lg:top-[8px] lg:translate-x-0">
            <div className="text-[#1F5A2A] mt-[-2rem] lg:rotate-[9.58deg]">
              <div className="font-queen text-[56px] font-normal leading-[36px] tracking-[0] md:text-[72px] md:leading-[42px] lg:text-[96px] lg:leading-[48px]">
                80%
              </div>
              <p className="font-queen text-center text-[28px] font-normal leading-[34px] tracking-[0] md:text-[34px] md:leading-[40px] lg:text-[40px] lg:leading-[48px] mx-auto  max-w-700px]">
                Of pets show signs of dental disease by age three.
              </p>
            </div>
          </div>

          <div className="relative mt-4 lg:mr-[-8rem]  w-full max-w-[640px] lg:mt-10">
            <img
              src={images.cartoonDog}
              alt="Illustration of a dog"
              className="mx-auto w-full max-w-[620px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type NotebookCardProps = {
  title: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
  rotate: number;
};

function NotebookCard({
  title,
  description,
  accent,
  icon,
  rotate,
}: NotebookCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-[26px] border border-black/[0.04] px-6 pb-6 pt-8 shadow-[0_16px_35px_rgba(0,0,0,0.05)]"
      style={{
        backgroundColor: "#F8F8F6",
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent 0px, transparent 22px, rgba(90,96,91,0.12) 23px)",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        className="absolute left-0 top-0 h-[8px] w-full"
        style={{ backgroundColor: accent }}
      />

      <div className="mb-5 text-[#A44E2F]">{icon}</div>

      <h3 className="text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-[#416352]">
        {title}
      </h3>

      <p className="mt-5 max-w-[260px] text-[17px] font-light leading-[1.5] text-[#5A605B]">
        {description}
      </p>
    </div>
  );
}

function ForkKnifeIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 3V11M8 3V11M7 11V21M13 3V7C13 8.657 14.343 10 16 10V21"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HandIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 11V5.5C8 4.67 8.67 4 9.5 4C10.33 4 11 4.67 11 5.5V10M11 10V4.5C11 3.67 11.67 3 12.5 3C13.33 3 14 3.67 14 4.5V10M14 10V5.5C14 4.67 14.67 4 15.5 4C16.33 4 17 4.67 17 5.5V11M17 9.5C17 8.67 17.67 8 18.5 8C19.33 8 20 8.67 20 9.5V13.5C20 17.09 17.09 20 13.5 20H11.8C10.28 20 8.82 19.4 7.76 18.34L5.2 15.78C4.61 15.19 4.61 14.24 5.2 13.66C5.78 13.07 6.73 13.07 7.32 13.66L8 14.34V11Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3C12 3 6 9 6 13.5C6 17.09 8.91 20 12.5 20C16.09 20 19 17.09 19 13.5C19 9 12 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SadFaceIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path
        d="M8.5 16C9.4 14.7 10.6 14 12 14C13.4 14 14.6 14.7 15.5 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const services = [
  {
    title: "Oral Examinations",
    description:
      "Detailed probe assessments of every tooth and the surrounding soft tissue structures.",
    icon: <SearchToothIcon />,
  },
  {
    title: "Ultrasonic Scaling",
    description:
      "Professional removal of plaque and tartar above and below the gumline followed by high-speed polishing.",
    icon: <ScalerIcon />,
  },
  {
    title: "Digital Radiography",
    description:
      "State-of-the-art imaging to see what’s happening beneath the surface, where 60% of disease is hidden.",
    icon: <XrayIcon />,
  },
  {
    title: "Advanced Surgery",
    description:
      "Safe extractions and mass removals performed with meticulous pain management protocols.",
    icon: <SurgeryIcon />,
  },
];
const steps = [
  {
    id: "1",
    title: "Comprehensive Exam",
    description:
      "A thorough assessment under safe, expert-monitored sedation to ensure every tooth is meticulously evaluated.",
    circleColor: "bg-[#5A7C6A]",
  },
  {
    id: "2",
    title: "Personalized Care Plan",
    description:
      "Detailed findings shared with transparency, offering tiered treatment options that respect your pet's needs and your budget.",
    circleColor: "bg-[#5A7C6A]",
  },
  {
    id: "3",
    title: "Expert Recovery",
    description:
      "Recovery in a quiet, warm space with constant supervision, followed by same-day discharge and clear home-care support.",
    circleColor: "bg-[#5A7C6A]",
  },
];
function DentalServicesGrid() {
  return (
    <section className="w-full bg-[#f2fced] px-6 py-16 md:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-queen text-[56px] font-normal leading-[36px] tracking-[-1.2px] text-[#416352] md:text-[72px] md:leading-[42px] lg:text-[96px] lg:leading-[48px]">
              Full-Spectrum Modern Dentistry
            </h2>

            <p className="font-manrope text-[16px] font-light leading-[24px] tracking-[0] md:text-[18px] md:leading-[26px] lg:text-[20px] lg:leading-[28px] text-[#414844] mt-10 max-w-[600px]">
              From routine cleanings to complex oral surgery, we utilize the
              latest medical advancements.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <article className="group rounded-[28px] bg-[#F5F4F1] p-8 shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 md:rounded-[32px] md:p-10">
      <div className="flex  flex-col">
        <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[18px] bg-[#DDE5D7] text-[#4D6D5E]">
          {icon}
        </div>

        <h3 className="text-[#416352] max-w-[240px] manrope text-[16px] font-bold leading-[24px] tracking-[0] md:text-[18px] md:leading-[26px] lg:text-[24px] my-6 lg:leading-[28px]">
          {title}
        </h3>

        <p className="manrope  text-[#414844] text-[14px] font-light leading-[22px] tracking-[0] md:text-[15px] md:leading-[24px] lg:text-[16px] lg:leading-[26px]">
          {description}
        </p>
      </div>
    </article>
  );
}

function SearchToothIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10"
        cy="10"
        r="5.75"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M14.5 14.5L20 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ScalerIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="7"
        y="12"
        width="10"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M10 12V4.8C10 4.1 10.5 3.5 11.2 3.5H12.8C13.5 3.5 14 4.1 14 4.8V12"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M5 19.5H19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function XrayIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 8.5L15 15.5M15 8.5L9 15.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 4V8M12 16V20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SurgeryIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7.5 7.5L16.5 16.5M16.5 7.5L7.5 16.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 3.8C9.5 5.3 9.5 7.7 8 9.2L6.8 10.4C5.3 11.9 2.9 11.9 1.4 10.4M16 14.8L17.2 13.6C18.7 12.1 21.1 12.1 22.6 13.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13.6 6.8L17.2 3.2C18.7 1.7 21.1 1.7 22.6 3.2M1.4 20.8C2.9 22.3 5.3 22.3 6.8 20.8L10.4 17.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
import React from "react";
import { ShieldCheck, Pill, PhoneCall } from "lucide-react";
import FaqSection from "../../imports/Home/faq-section/FaqSection";
import Seo from "../components/seo/Seo";
import { ROUTE } from "../../router";

const supportItems = [
  {
    title: "Anesthetic Excellence",
    description:
      "Dedicated monitoring by licensed technicians for the entire duration.",
    color: "#3F6B57",
    icon: ShieldCheck,
  },
  {
    title: "Multi-Modal Pain Management",
    description:
      "Personalized protocols that combine multiple paths for maximum comfort.",
    color: "#A44E2F",
    icon: Pill,
  },
  {
    title: "Same-Day Recovery Support",
    description:
      "Detailed home-care instructions and a follow-up call within 24 hours.",
    color: "#8A6334",
    icon: PhoneCall,
  },
];

function PeaceOfMindSection() {
  return (
    <section className="w-full bg-[#F3F1EC] px-6 py-16 md:px-10 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <CollageBlock />
        <ContentBlock />
      </div>
    </section>
  );
}

function CollageBlock() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid w-full max-w-[640px] grid-cols-1 gap-8 sm:grid-cols-2 sm:items-start">
        <CollageCard
          image={images.cozyPet}
          label="POST-CARE COMFORT"
          accent="#E71E25"
          rotate="-rotate-[1.6deg]"
          imageClassName="object-cover"
        />

        <div className="sm:pt-14">
          <CollageCard
            image={images.happyDogs}
            label="LONG-TERM VITALITY"
            accent="#00A34A"
            rotate="rotate-[1.2deg]"
            imageClassName="object-contain bg-[#F8F8F6]"
          />
        </div>
      </div>
    </div>
  );
}

type CollageCardProps = {
  image: string;
  label: string;
  accent: string;
  rotate?: string;
  imageClassName?: string;
};

function CollageCard({
  image,
  label,
  accent,
  rotate = "",
  imageClassName = "",
}: CollageCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={[
          "relative w-full max-w-[280px] overflow-hidden rounded-[12px]",
          "shadow-[0_18px_40px_rgba(0,0,0,0.10)]",
          rotate,
        ].join(" ")}
      >
        <div
          className="absolute inset-x-0 top-0 z-10 h-[8px]"
          style={{ backgroundColor: accent }}
        />
        <img
          src={image}
          alt={label}
          className={`block h-[340px] w-full scale-105 ${imageClassName}`}
        />
      </div>

      <p className="mt-7 text-center text-[10px] font-extrabold tracking-[0.28em] text-[#727973] manrope">
        {label}
      </p>
    </div>
  );
}

function ContentBlock() {
  return (
    <div className="w-full">
      <div className="max-w-[700px]">
        <h2 className="font-queen text-[40px] font-normal leading-[34px] tracking-[-1.2px] md:text-[52px] md:leading-[40px] lg:text-[64px] lg:leading-[48px] text-[#416352]">
          Peace of Mind, Proven Results
        </h2>

        <p className="manrope text-[16px] font-light leading-[26px] tracking-[0] md:text-[18px] md:leading-[29px] lg:text-[20px] mt-6 max-w-[600px]lg:leading-[32.5px] text-[#414844]">
          We understand the anxiety of procedures. Our sanctuary is built on a
          foundation of rigorous safety standards and compassionate follow-up.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {supportItems.map((item) => (
          <SupportCard
            key={item.title}
            title={item.title}
            description={item.description}
            color={item.color}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}

type SupportCardProps = {
  title: string;
  description: string;
  color: string;
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
};

function SupportCard({
  title,
  description,
  color,
  icon: Icon,
}: SupportCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[24px] bg-[#FFFFFF] px-6 py-4 shadow-[0_14px_34px_rgba(0,0,0,0.06)] md:px-7 md:py-6">
      <span
        className="absolute left-0 top-0 h-full w-[5px] rounded-l-[26px]"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-start gap-4 pl-2">
        <div
          className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{ color }}
        >
          <Icon className="h-6 w-6" strokeWidth={2.1} />
        </div>

        <div className="min-w-0">
          <h3 className="text-[#416352] manrope text-[14px] font-bold leading-[20px] tracking-[0] md:text-[15px] md:leading-[22px] lg:text-[16px] lg:leading-[24px]">
            {title}
          </h3>

          <p className="mt-1 text-[12px] font-light leading-[1.55] text-[#414844] manrope md:text-[14px]">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
function HowItWorksSection() {
  return (
    <section className="w-full bg-[#214A1E] px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="font-founders text-center text-[36px] font-medium leading-[40px] tracking-[0] text-[#FFFFFF]">
          A Gentle Journey of Care
        </h2>
        <p className=" my-6 text-[#C6EBD5B2] manrope text-center text-[16px] font-light leading-[24px] tracking-[0] md:text-[18px] md:leading-[26px] lg:text-[20px] lg:leading-[28px]">
          We prioritize clinical safety and emotional comfort at every
          touchpoint.
        </p>
        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-14">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center"
            >
              <div
                className={`flex h-[78px] w-[78px] items-center justify-center rounded-full text-[24px] font-space text-center  font-bold leading-[36px] tracking-[0] font-queen  text-white md:h-[80px] md:w-[80px] md:text-[36px] ${step.circleColor}`}
              >
                {step.id}
              </div>

              <h3 className="mt-7 manrope text-[20px] font-bold leading-snug text-[#FFFFFF] md:text-[24px]">
                {step.title}
              </h3>

              <p className="mt-3 manrope max-w-[320px] font-light text- text-[18px] leading-[1.45] text-[#FFFFFF99]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function DentalCareBentoSection() {
  return (
    <section className="w-full  px-4 py-10 md:px-8 md:py-14 lg:px-10">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:auto-rows-[minmax(240px,auto)]">
          {/* Top left */}
          <BentoCard className="bg-[#F3F3F1] px-7 py-8 md:col-span-8 md:min-h-[390px] md:px-12 md:py-10 md:rotate-[0.56deg]">
            <div className="flex h-full flex-col justify-center gap-5 md:max-w-[760px] md:justify-end">
              <span className="text-[#9C4A2F]">
                <SadIcon />
              </span>

              <h3 className="font-founders text-[28px] leading-[1.12] text-[#416352] md:text-[42px]">
                Hidden Pain &amp; Quality of Life
              </h3>

              <p className="max-w-[860px] manrope text-[18px] font-light leading-[1.65] text-[#4A4F4B] md:text-[20px]">
                Pets are masters of stoicism. Dental disease often progresses
                silently, causing persistent discomfort that affects their
                appetite and joy long before physical symptoms become obvious.
              </p>
            </div>
          </BentoCard>

          {/* Top right */}
          <BentoCard className="bg-[#9A4A2D] px-7 py-8 md:col-span-4 md:min-h-[368px] md:px-12 md:py-10 md:rotate-[-2.8deg]">
            <div className="flex h-full flex-col justify-between gap-10">
              <span className="text-[#D4F2DE]">
                <GoPulse size={42} />
              </span>

              <div className="space-y-4">
                <h3 className="font-founders text-[28px] leading-[1.12] text-white md:text-[34px]">
                  Systemic Impact
                </h3>

                <p className="max-w-[290px] manrope text-[17px] font-light leading-[1.7] text-white/85 md:text-[18px]">
                  Bacteria from chronic gum disease can enter the bloodstream,
                  potentially damaging vital organs over time.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Bottom left */}
          <BentoCard className="bg-[#F3F3F1] px-7 py-8 md:col-span-4 md:min-h-[420px] md:px-12 md:py-10 md:rotate-[-2.31deg] md:shadow-[0_28px_60px_rgba(0,0,0,0.18)]">
            <div className="flex h-full flex-col gap-6">
              <span className="text-[#9C6A2E]">
                <WindIcon />
              </span>

              <h3 className="max-w-[400px] font-founders text-[28px] leading-[1.12] text-[#416352] md:text-[34px]">
                Persistent Halitosis
              </h3>

              <p className="max-w-[280px] manrope text-[17px] font-light leading-[1.7] text-[#4A4F4B] md:text-[18px]">
                Foul odor is rarely just &quot;dog breath&quot;—it&apos;s often
                the first visible sign of bacterial overgrowth and underlying
                infection.
              </p>
            </div>
          </BentoCard>

          {/* Bottom right */}
          <BentoCard className="overflow-hidden bg-[#EEECE6] md:col-span-8 md:min-h-[430px] md:rotate-[2.25deg]">
            <div className="flex h-full flex-col md:flex-row">
              <div className="flex flex-1 items-center px-7 py-8 md:px-12 md:py-10">
                <div className="w-full max-w-[470px]">
                  <h3 className="mb-6 font-founders text-[28px] leading-[1.12] text-[#416352] md:text-[34px]">
                    Visual Indicators
                  </h3>

                  <ul className="space-y-5">
                    <li className="flex items-start gap-4 manrope text-[17px] font-light leading-[1.6] text-[#4A4F4B] md:text-[18px]">
                      <span className="mt-1 shrink-0 text-[#B35B3D]">
                        <WarningIcon />
                      </span>
                      <span>Yellow-brown tartar buildup along the gumline</span>
                    </li>

                    <li className="flex items-start gap-4 manrope text-[17px] font-light leading-[1.6] text-[#4A4F4B] md:text-[18px]">
                      <span className="mt-1 shrink-0 text-[#B35B3D]">
                        <WarningIcon />
                      </span>
                      <span>
                        Red, swollen, or bleeding gums
                        <span className="block">(Gingivitis)</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-5 pt-0 md:flex md:w-[42%] md:items-center md:justify-center md:p-8">
                <div className="h-[280px] w-full overflow-hidden rounded-[26px] bg-white/40 md:h-[330px] md:max-w-[330px]">
                  <img
                    src={images.petExam}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
const ServicesDentalCare = () => {
  return (
    <>
    <Seo
      title="Dental Care Services in San Antonio | Comprehensive Pet Dentistry"
      description="Discover expert dental care for your pet in San Antonio. Our comprehensive services include cleanings, exams, and advanced treatments to ensure your pet's oral health and overall wellbeing."
      path={ROUTE.dentalCare}
    />
     <main className="w-full">
      <ServicesBanner
        title={
          <>
            Dental Care That Supports <br className="hidden lg:block" />
            <span className="text-[#204E1C]">Long-Term Vitality</span>
          </>
        }
        description="Beyond a bright smile, oral health is a vital window into your
pet's overall wellbeing. We provide gentle, expert care in our
San Antonio sanctuary."
        primaryButtonLabel="Book Appointment"
        secondaryActionLabel="Call Now"
        visual={
          <div className="relative mr-[0rem] mt-[3rem]">
            <img
              src={images.dentalCareBg}
              alt="Dental Care banner"
              className="lg:scale-[112%]"
            />

            <div className="absolute right-[4rem] top-[-4rem] hidden flex-col items-start lg:flex">
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
        title="Oral Health Is a Cornerstone of Whole-Pet Wellness"
        desc="Left untreated, dental disease does more than cause bad breath. It can lead
to chronic pain, difficulty eating, and systemic issues affecting the heart,
liver, and kidneys. We treat dental health as a fundamental pillar of vitality."
      >
        <DentalCareBentoSection />
      </ProactiveCare>
      <SubtleSignsSection />
      <DentalServicesGrid />
      <HowItWorksSection />
      <PeaceOfMindSection />
      <FaqSection />
    </main>
    </>
   
  );
};

export default ServicesDentalCare;
