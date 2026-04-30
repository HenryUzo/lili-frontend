import type { CSSProperties, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { BoltIcon, CheckCircle2, PawPrint } from "lucide-react";
import { MdOutlineSearch, MdOutlineStars } from "react-icons/md";
import { BiTachometer } from "react-icons/bi";

import images from "../assests/images";
import { Flask, Information } from "../assests/svg";
import { ProactiveCare } from "../reuseable-components/proactive-care";
import ServicesBanner from "../reuseable-components/services-banner";
import FaqSection, {
  type FAQItem,
} from "../../imports/Home/faq-section/FaqSection";
import DiagnosticJourneySection from "../reuseable-components/journey-section";
import { ROUTE } from "../../router";
import { useNavigate } from "react-router-dom";
import InertiaHover from "../reuseable-components/inertia-hover";
import Seo from "../components/seo/Seo";

export type HighlightFeature = {
  icon: LucideIcon;
  label: string;
};

type SmallCardItem = {
  title: string;
  description: string;
  bgClassName: string;
  titleClassName: string;
  textClassName: string;
  rotation: number;
};

type JourneyStep = {
  number: number;
  title: string;
  description: string;
};

type DiagnosticFeatureCard = {
  icon: ReactNode;
  title: string;
  description: string;
  rotation: number;
};

type CommunicationFeature = {
  icon: ReactNode;
  title: string;
  description: string;
};

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const CARE_HIGHLIGHTS: HighlightFeature[] = [
  {
    icon: CheckCircle2,
    label: "Rapid In-House Results",
  },
  {
    icon: PawPrint,
    label: "Specialized Small Animal Care",
  },
];
const JOURNEY_STEPS:JourneyStep[] = [
  {
    number: 1,
    title: "Initial Consultation",
    description:
      "We begin with a detailed discussion about your pet’s symptoms and history.",
  },
  {
    number: 2,
    title: "Targeted Testing",
    description:
      "We run focused diagnostics to quickly identify the root cause.",
  },
  {
    number: 3,
    title: "Expert Review",
    description:
      "Our team carefully interprets the results and determines the next steps.",
  },
  {
    number: 4,
    title: "Care Plan",
    description:
      "You get a clear diagnosis, treatment direction, and follow-up recommendations.",
  },
];
const DIAGNOSTICS_FAQ_ITEMS: FAQItem[] = [
  {
    question: "Are all recommended diagnostics necessary?",
    answer: [
      "Not always every test, but every recommendation has a clinical reason. We explain what each test is looking for, what it rules out, and which next step matters most.",
    ],
  },
  {
    question: "How quickly will I receive results?",
    answer: [
      "Many in-house tests are reviewed the same day. More specialized external lab work may take longer depending on the test and the processing lab.",
    ],
  },
  {
    question: "Can diagnostics be used for preventive care?",
    answer: [
      "Yes. Diagnostics are not only for sick pets. They also help establish healthy baselines and catch changes early before symptoms become obvious.",
    ],
  },
  {
    question: "What if my pet is anxious or uncooperative during testing?",
    answer: [
      "We use low-stress handling first. When medically appropriate, sedation or added support may be recommended to keep your pet safe and to ensure accurate results.",
    ],
  },
];



const ADVANCED_SUITE_CARDS: SmallCardItem[] = [
  {
    title: "Comprehensive Exams",
    description:
      "A thorough physical evaluation that provides the clinical context for every diagnostic test.",
    bgClassName: "bg-[#FFFFFFE0]",
    titleClassName: "text-[#2D4A38]",
    textClassName: "text-[#4A5A50]",
    rotation: -2.01,
  },
  {
    title: "Wellness Screening",
    description:
      "Preventive panels designed to ensure your pet's internal health matches their outward appearance.",
    bgClassName: "bg-[#FFFFFFE0]",
    titleClassName: "text-[#2D5C42]",
    textClassName: "text-[#4A5A50]",
    rotation: -0.3,
  },
  {
    title: "Referral Network",
    description:
      "Direct access to specialty ultrasound, MRI, and biopsy support for cases requiring advanced expertise.",
    bgClassName: "bg-[#ED1C24]",
    titleClassName: "text-white",
    textClassName: "text-[#FFE1E1]",
    rotation: -0.46,
  },
];

const FOUNDATION_CARDS: DiagnosticFeatureCard[] = [
  {
    icon: <MdOutlineSearch size={24} />,
    title: "Identifying Root Causes",
    description:
      "Uncovering the source of hidden ailments that may not be visible during a standard exam.",
    rotation: -2.49,
  },
  {
    icon: <Information />,
    title: "Informed Decisions",
    description:
      "Evidence-based protocols that reduce trial-and-error medicine and support faster, safer care decisions.",
    rotation: 1.73,
  },
  {
    icon: <BiTachometer size={24} />,
    title: "Early Detection",
    description:
      "Finding underlying health issues before they become urgent or life-threatening crises.",
    rotation: -1.73,
  },
  {
    icon: <TrackingIcon />,
    title: "Tracking Progress",
    description:
      "Measuring improvement during recovery to confirm whether treatment is working as expected.",
    rotation: 1.84,
  },
];

const COMMUNICATION_FEATURES: CommunicationFeature[] = [
  {
    icon: <QuestionIcon />,
    title: 'The "Why" Behind Testing',
    description:
      "We connect symptoms to specific tests so you understand the purpose behind every recommendation.",
  },
  {
    icon: <ClockIcon />,
    title: "Real-Time Updates",
    description:
      "Waiting is the hardest part. We communicate quickly as results are processed and reviewed.",
  },
];

function DesktopTilt({
  rotation = 0,
  className,
  children,
}: {
  rotation?: number;
  className?: string;
  children: ReactNode;
}) {
  const style = {
    "--desktop-rotate": `${rotation}deg`,
  } as CSSProperties;

  return (
    <div
      style={style}
      className={cx(
        "rotate-0 md:[transform:rotate(var(--desktop-rotate))]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CareHighlights() {
  return (
    <section className="w-full max-w-[760px] rounded-[22px] border-2 border-[#FFFFFF94] bg-[#EDF9EC66] p-4 backdrop-blur-xl supports-[backdrop-filter]:bg-[#EDF9EC66]">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CARE_HIGHLIGHTS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex  py-1 items-center gap-3 rounded-full border border-white/35 bg-[#FFFFFF73] px-5 text-[#173F35] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md whitespace-nowrap"
          >
            <Icon
              className="h-[17px] w-[17px] shrink-0 text-[#173F35]"
              strokeWidth={2.1}
            />
            <p className="text-base  manrope font-medium tracking-[-0.02em] md:text-[14px]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function XRayImage() {
  return (
    <div className="h-full min-h-[228px] w-full overflow-hidden rounded-xl md:w-[287px] md:flex-shrink-0">
      <img
        src={images.xRayMachine}
        alt="Digital X-ray machine"
        className="h-full w-full object-cover"
        onError={(event) => {
          (event.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

function SmallCard({
  title,
  description,
  bgClassName,
  titleClassName,
  textClassName,
}: Omit<SmallCardItem, "rotation">) {
  return (
    <div
      className={cx(
        "flex min-w-0 flex-1 cursor-default flex-col gap-3 rounded-[24px] p-8 transition-transform duration-200 hover:-translate-y-1 min-h-[202px] md:p-10 lg:p-12",
        bgClassName,
      )}
    >
      <h3
        className={cx(
          "font-founders text-[20px] font-medium leading-[28px] md:text-[22px] md:leading-[30px] lg:text-[24px] lg:leading-[32px]",
          titleClassName,
        )}
      >
        {title}
      </h3>
      <p
        className={cx(
          "font-manrope text-[14px] font-normal leading-[20px] md:text-[15px] md:leading-[22px] lg:text-[16px] lg:leading-[24px]",
          textClassName,
        )}
      >
        {description}
      </p>
    </div>
  );
}

function CTABannerSection() {
  return (
    <section className="bg-[#F2FCED] px-4 py-6 md:px-8 md:py-10">
      <div className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-[1.5rem] min-h-[420px]">
        <img
          src={images.calmDogWithVet}
          alt="Vet examining a calm dog"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(60,20,10,0.78) 0%, rgba(80,30,15,0.55) 55%, rgba(40,15,8,0.35) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col justify-between gap-8 px-6 py-12 md:flex-row md:items-center md:px-16 md:py-14">
          <div className="flex flex-1 flex-col gap-5">
            <h2 className="font-queen text-[40px] leading-[40px] text-white md:text-[64px] md:leading-[60px] lg:text-[84px] lg:leading-[81px]">
              Need Help
              <br />
              Understanding What
              <br />
              Your Pet Needs?
            </h2>

            <p className="max-w-[400px] font-manrope text-[16px] leading-[26px] text-white md:text-[18px] md:leading-[29px] lg:text-[20px] lg:leading-[32.5px]">
              Schedule a consultation today. Let&apos;s get the precise answers
              your pet deserves, together.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 md:w-auto md:min-w-[220px]">
            <button
              type="button"
              className="w-full rounded-full bg-white px-8 py-4 font-founders text-[0.95rem] font-bold text-[#95442D] shadow-lg transition-colors duration-200 hover:bg-[#F0EDE6] md:w-[220px]"
            >
              Book a Consult
            </button>

            <button
              type="button"
              className="w-full rounded-full border-2 border-white/60 bg-transparent px-8 py-4 font-founders text-[0.95rem] font-bold text-white transition-colors duration-200 hover:bg-white/10 md:w-[220px]"
            >
              Call Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdvancedSuiteSection() {
  return (
    <section className="bg-[#272727] px-6 py-14 md:px-12 lg:px-16">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-1 flex-col gap-2">
            <p className="font-manrope text-[10px] font-bold uppercase tracking-[2.4px] text-[#FAABB0] md:text-[11px] lg:text-[12px]">
              Medical Expertise
            </p>
            <h2 className="font-founders text-[40px] leading-[46px] text-white md:text-[52px] md:leading-[58px] lg:text-[64px] lg:leading-[70px]">
              Advanced In-House
              <br />
              Suite
            </h2>
          </div>

          <p className="max-w-[360px] font-manrope text-[16px] font-medium leading-[24px] text-[#C8D9CF] md:text-[17px] md:leading-[26px] lg:text-[18px] lg:leading-[28px]">
            Modern technology in the hands of experienced clinicians.
          </p>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <DesktopTilt rotation={-0.82} className="flex-[1.8]">
            <div className="flex h-full cursor-default flex-col gap-8 rounded-[24px] bg-white p-8 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:flex-row md:gap-10 md:p-12 lg:h-[443px] lg:p-16">
              <div className="flex flex-1 flex-col justify-between gap-5">
                <div className="flex flex-col gap-4">
                  <p className="font-manrope text-[10px] font-bold uppercase tracking-[2px] text-[#95442D]">
                    Immediate Imaging
                  </p>

                  <h3 className="font-founders text-[28px] font-medium leading-[32px] text-[#214A1E] md:text-[32px] md:leading-[36px] lg:text-[36px] lg:leading-[40px]">
                    Digital Radiology (X-ray)
                  </h3>

                  <p className="font-manrope text-[16px] leading-[24px] text-[#414844] md:text-[17px] md:leading-[26px] lg:text-[18px] lg:leading-[29px]">
                    Our high-definition imaging suite allows us to capture
                    detailed views of bones, organs, and foreign objects within
                    seconds, providing immediate insight for both routine and
                    emergency care.
                  </p>
                </div>

                <div className="flex items-center gap-2 font-manrope text-[14px] font-bold leading-[20px] text-[#1E4D35] md:text-[15px] md:leading-[22px] lg:text-[16px] lg:leading-[24px]">
                  <BoltIcon className="h-5 w-5" />
                  <span>Results reviewed in real time</span>
                </div>
              </div>

              <XRayImage />
            </div>
          </DesktopTilt>

          <DesktopTilt rotation={1.27} className="flex-1 lg:max-w-[411px]">
            <div className="flex h-full cursor-default flex-col justify-between gap-8 rounded-[24px] bg-[#214A1E] p-8 shadow-lg transition-transform duration-200 hover:-translate-y-1 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#3D6050] text-[#B8D4C0]">
                <Flask />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-founders text-[24px] leading-[30px] text-white md:text-[27px] md:leading-[33px] lg:text-[30px] lg:leading-[36px]">
                  Laboratory Services
                </h3>
                <p className="font-manrope text-[14px] leading-[22px] text-white/80 md:text-[15px] md:leading-[24px] lg:text-[16px] lg:leading-[26px]">
                  Comprehensive blood panels, urinalysis, and screenings
                  processed internally for rapid diagnostic turnaround.
                </p>
              </div>
            </div>
          </DesktopTilt>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row">
          {ADVANCED_SUITE_CARDS.map((card) => (
            <DesktopTilt
              key={card.title}
              rotation={card.rotation}
              className="flex-1"
            >
              <SmallCard
                title={card.title}
                description={card.description}
                bgClassName={card.bgClassName}
                titleClassName={card.titleClassName}
                textClassName={card.textClassName}
              />
            </DesktopTilt>
          ))}
        </div>
      </div>
    </section>
  );
}



function DiagnosticCard({
  icon,
  title,
  description,
}: Omit<DiagnosticFeatureCard, "rotation">) {
  return (
    <div className="group flex h-full min-h-[320px] cursor-default flex-col gap-6 rounded-[16px] border border-[#C1C8C233] bg-[#FBF9F4] p-8 transition-all duration-300 hover:-translate-y-1">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C6EBD5] text-[#214A1E] transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-founders text-[22px] font-medium leading-snug text-[#1E4D35]">
          {title}
        </h3>
        <p className="font-manrope text-[15px] leading-relaxed text-[#556B5E]">
          {description}
        </p>
      </div>
    </div>
  );
}

function FoundationSection() {
  return (
    <section className="bg-[#F5F3EE] px-8 py-20 md:px-16 lg:px-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="font-founders text-[40px] font-medium leading-[44px] text-[#214A1E] md:text-[52px] md:leading-[52px] lg:text-[64px] lg:leading-[60px]">
            The Foundation of Better Care
          </h2>
          <p className="max-w-[420px] font-manrope text-[16px] leading-relaxed text-[#414844] md:text-[17px] md:leading-[26px] lg:text-[18px]">
            Modern technology in the hands of experienced clinicians.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {FOUNDATION_CARDS.map((card) => (
            <InertiaHover key={card.title} rotation={0} resistance={1} strength={4}>
               <DesktopTilt  rotation={card.rotation}>
              <DiagnosticCard
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </DesktopTilt>
            </InertiaHover>
           
          ))}
        </div>
      </div>
    </section>
  );
}

function CommunicationSection() {
  return (
    <section className="overflow-hidden bg-[#FBF9F4] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-14 lg:flex-row lg:gap-20">
        <div className="flex flex-1 flex-col gap-8 lg:max-w-[600px]">
          <div>
            <h2 className="font-founders text-[38px] leading-[42px] text-[#214A1E] md:text-[48px] md:leading-[50px] lg:text-[60px] lg:leading-[60px]">
              Partnership Through{" "}
              <span className="block font-bold lg:whitespace-nowrap">
                Clear Communication
              </span>
            </h2>
          </div>

          <p className="font-manrope text-[16px] font-medium leading-[26px] text-[#414844] md:text-[18px] md:leading-[29px] lg:text-[20px] lg:leading-[32.5px]">
            We believe you are the most important part of your pet&apos;s
            healthcare team. We do not just run tests. We explain the medical
            logic behind every recommendation.
          </p>

          <div className="flex flex-col gap-9">
            {COMMUNICATION_FEATURES.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#DDE8DF] text-[#3A7A50]">
                  {feature.icon}
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-manrope text-[16px] font-bold leading-[24px] text-[#4A564D] md:text-[18px] md:leading-[26px] lg:text-[20px] lg:leading-[28px]">
                    {feature.title}
                  </h3>
                  <p className="font-manrope text-[14px] leading-[22px] text-[#28332AB2] md:text-[15px] md:leading-[24px] lg:text-[16px] lg:leading-[26px]">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <DesktopTilt rotation={6}>
            <div
              className="relative h-auto min-h-[560px] w-full max-w-[594px] overflow-hidden rounded-[1.5rem] bg-white shadow-2xl md:min-h-[678px]"
              style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.18)" }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(transparent, transparent 27px, #c8d4c0 28px)",
                  backgroundSize: "100% 28px",
                }}
              />

              <div className="absolute bottom-0 left-[52px] top-0 w-px bg-[#E8B4A0] opacity-60" />

              <div className="relative z-10 flex flex-col gap-5 px-6 pb-8 pt-8 md:px-10 md:pt-10">
                <h3
                  className="mb-2 font-queen text-[44px] leading-[44px] text-[#214A1E] md:text-[72px] md:leading-[68px] lg:text-[96px] lg:leading-[86px]"
                  style={{ fontWeight: 500 }}
                >
                  When the Path
                  <br />
                  is Unclear
                </h3>

                <p className="font-manrope text-[16px] leading-[24px] text-[#414844] md:text-[17px] md:leading-[26px] lg:text-[18px] lg:leading-[29.25px]">
                  Diagnostics are a process of elimination. Sometimes initial
                  results rule things out rather than identifying a{" "}
                  <span className="text-[#7A9A88] line-through">
                    single cause
                  </span>
                  . In{" "}
                  <span className="text-[#7A9A88] line-through">
                    medicine, this is not
                  </span>{" "}
                  failure — it is essential progress.
                </p>

                <p className="font-manrope text-[16px] leading-[24px] text-[#414844] md:text-[17px] md:leading-[26px] lg:text-[18px] lg:leading-[29.25px]">
                  If initial steps do not yield a complete answer, we remain
                  your steadfast advocate, providing{" "}
                  <span className="font-semibold underline underline-offset-2">
                    honest guidance
                  </span>{" "}
                  on specialist referrals or alternative monitoring strategies.
                </p>

                <div className="mt-12 flex items-center gap-2 border-t border-[#C8D4C0] pt-4 md:mt-20">
                  <span className="text-[#3A7A50]">
                    <HeartIcon />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#3A5A48]">
                    Committed to Answers
                  </span>
                </div>
              </div>
            </div>
          </DesktopTilt>
        </div>
      </div>
    </section>
  );
}

function TrackingIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 17l4-5 4 3 4-6 4 4" />
      <path d="M3 21h18" />
      <circle cx="17" cy="6" r="3" />
      <path
        d="M17 4v1.5M17 8.5V10M15.2 5l1.3.75M18.8 7.25L20.1 8M15.2 7.25L13.9 8M19 5l-1.3.75"
        strokeWidth={1.2}
      />
    </svg>
  );
}

function QuestionIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 014.8.8c0 1.5-2.3 2.2-2.3 3.7" />
      <circle cx="12" cy="17" r="0.4" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
      <path d="M20 4l-1.5 1.5M4 20l1.5-1.5" strokeWidth={1.3} />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21C12 21 3 14.5 3 8.5a4.5 4.5 0 018.5-2 4.5 4.5 0 018.5 2C20 14.5 12 21 12 21z" />
    </svg>
  );
}


const ServiceDiagnosticCare = () => {
  const navigate = useNavigate();
  return (
    <>
      <Seo
        title="Pet Diagnostic Care Services in Lagos | Lili Veterinary Hospital"
        description="Get comprehensive diagnostic care for your pet at Lili Veterinary Hospital in Lagos. We offer advanced in-house technology and medical expertise to provide precise answers and effective treatment plans."
        path={ROUTE.diagnosticCare}
      />
      <main className="w-full">
      <ServicesBanner
        otherContent={
          <div>
            <span className="flex w-fit items-center gap-3 rounded-full bg-[#FFDBD1] px-3 py-1 font-manrope text-xs font-bold text-[#3B0900]">
              <MdOutlineStars />
              Surgical Excellence
            </span>
          </div>
        }
        title={
          <>
            Diagnostic Care That Brings <br className="hidden lg:block" />
            <span className="text-[#204E1C]">Clarity to the Surface</span>
          </>
        }
        description="Reducing the guesswork in your pet's health. We combine medical expertise with advanced in-house technology to find precise answers and direct paths to recovery."
        primaryButtonLabel="Book Appointment"
        onSecondaryClick={ROUTE.contact}
        onPrimaryClick={()=>navigate(ROUTE.bookAppointment)}
        secondaryActionLabel="Speak with a Vet"
        visual={
          <div className="relative mr-[-4rem] mt-[0rem]">
            <img
              src={images.diagnosticCareBg}
              alt="Diagnostic Care banner"
              className="lg:scale-[114%]"
            />

            <div className="absolute left-[10rem] top-[-3rem] hidden flex-col items-center lg:flex">
              <h1 className="font-queen  max-w-[388px] text-[40px] text-center leading-[108%] tracking-[-0.03em] text-[#204E1C]">
                "The right answer begins with the right question, and the right
                tools."
              </h1>
              <img
                src={images.urgentBentArrow}
                alt=""
                className="-scale-x-100 mr-[-6rem]"
              />
            </div>
          </div>
        }
        highlights={<CareHighlights />}
        contentClassName="lg:max-w-[562px]"
        descriptionClass="lg:max-w-[525px]"
      />

      <ProactiveCare
        title="When Symptoms Need a Closer Look"
        desc="Sometimes, what we see on the surface only tells part of the story. Our diagnostic suite is designed to look deeper — moving beyond guesswork to provide the medical certainty needed for effective, timely treatment plans."
      >
        <div />
      </ProactiveCare>

      <FoundationSection />
      <AdvancedSuiteSection />
      <DiagnosticJourneySection
        eyebrow="Our Approach"
        title="The Diagnostic Journey"
        steps={JOURNEY_STEPS}
      />
      <CommunicationSection />
      <FaqSection items={DIAGNOSTICS_FAQ_ITEMS} />
      <CTABannerSection />
    </main>
    </>
    
  );
};

export default ServiceDiagnosticCare;
