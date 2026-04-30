import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, PawPrint, Home, type LucideIcon } from "lucide-react";
import { MdOutlineThumbUp } from "react-icons/md";

import images from "../assests/images";
import { Chat, Check, Paw } from "../assests/svg";

import InertiaHover from "../reuseable-components/inertia-hover";
import { InfoTiltCard } from "../reuseable-components/info-tilt-card";
import { ProactiveCare } from "../reuseable-components/proactive-care";
import ServicesBanner from "../reuseable-components/services-banner";
import { ProtectionCard } from "../reuseable-components/protection-cards";
import { HowItWorksSection } from "../reuseable-components/how-it-works-section";
import PawButton from "../reuseable-components/paw-button";
import FaqSection from "../../imports/Home/faq-section/FaqSection";
import NewStartProgramCard from "../reuseable-components/new-start-program";
import { ROUTE } from "../../router";
import Seo from "../components/seo/Seo";

gsap.registerPlugin(ScrollTrigger);

const BENEFIT_CARD_SELECTOR = ".js-benefit-card";

type HighlightFeature = {
  icon: LucideIcon;
  label: string;
};

type BenefitCard = {
  icon: string;
  title: string;
  description: string;
  rotation: number;
};

type ProcessStep = {
  id: number;
  title: string;
  description: string;
  circleColor: string;
  icon?: ReactNode;
};

const CARE_HIGHLIGHTS: HighlightFeature[] = [
  {
    icon: CheckCircle2,
    label: "Preventive care support",
  },
  {
    icon: PawPrint,
    label: "Dogs and cats welcome",
  },
];
const faq = [
  {
    accent: "#012d1d",
    question: "How often does my pet need vaccinations?",
    answer: [
      "Each plan varies by life stage but typically includes two comprehensive exams per year, core vaccines,",
      "parasite testing, and essential bloodwork. Detailed brochures are available upon request.",
    ],
  },
  {
    accent: "#ad321c",
    question: "Are there side effects I should watch for?",
    answer: [
      "Wellness plans cover predictable, routine costs that insurance typically excludes. Think of it as your",
      "maintenance plan, while insurance is for unpredictable accidents or illnesses.",
    ],
  },
  {
    accent: "#012d1d",
    question: "Does my indoor cat really need shots?",
    answer: [
      "Urgent care visits are generally not included in base wellness plans, though some plans may offer discounted",
      "exam fees for members during emergency hours.",
    ],
  },
];
const WELLNESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: "Wellness Review",
    description:
      "We begin by discussing your pet's lifestyle, history, and any recent travel to build a personalized profile for their unique needs.",
    circleColor: "bg-[#006838]",
  },
  {
    id: 2,
    title: "Exam & Protocol",
    description:
      "Our vets perform a thorough physical checkup to ensure your pet is healthy enough for their scheduled vaccinations at that time.",
    circleColor: "bg-[#204E1C]",
  },
  {
    id: 3,
    title: "Clear Next Steps",
    description:
      "You'll leave with a clear timeline of when boosters are needed and specific guidance on what to watch for in the following 24 hours.",
    circleColor: "bg-[#ED1C24]",
  },
];

const COMMITMENT_STEPS: ProcessStep[] = [
  {
    id: 1,
    icon: <Chat />,
    title: "Clear Guidance",
    description:
      "We explain exactly what we’re giving and why, never leaving you in the dark about your pet's care plan.",
    circleColor: "bg-[#FFDBD14D]",
  },
  {
    id: 2,
    icon: <MdOutlineThumbUp color="#95442D" />,
    title: "Thoughtful Advice",
    description:
      "We only recommend what your pet truly needs based on their actual lifestyle risks and environment.",
    circleColor: "bg-[#FFDBD14D]",
  },
  {
    id: 3,
    icon: <Check color="#95442D" />,
    title: "Proven Safety",
    description:
      "We use only premium-quality vaccines and follow the most rigorous safety protocols in the veterinary industry.",
    circleColor: "bg-[#FFDBD14D]",
  },
];

const BENEFIT_CARDS: BenefitCard[] = [
  {
    icon: images.protect,
    title: "Prevent Disease",
    description:
      "Defend against highly contagious and potentially fatal diseases before they strike.",
    rotation: -2.98,
  },
  {
    icon: images.health,
    title: "Reduce Risk",
    description:
      "Lower the severity of illness even if your pet is exposed to environmental pathogens.",
    rotation: 3.22,
  },
  {
    icon: images.love,
    title: "Long-term Vitality",
    description:
      "Prevent secondary complications that could affect mobility and organ health later in life.",
    rotation: -1.86,
  },
  {
    icon: images.group,
    title: "Social Freedom",
    description:
      "Essential for pets who visit parks, boarding facilities, or travel frequently with family.",
    rotation: 5.67,
  },
];

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
            <p className="text-base  manrope font-medium tracking-[-0.02em] md:text-[16px]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function VaccineBenefitsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        BENEFIT_CARD_SELECTOR,
        section,
      );

      if (!cards.length) return;

      gsap.set(cards, {
        y: 120,
        opacity: 0,
        scale: 0.85,
      });

      const timeline = gsap.timeline({ paused: true }).to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "bounce.out",
        stagger: 0.15,
        clearProps: "transform,opacity",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => timeline.restart(),
        onEnterBack: () => timeline.restart(),
        onLeaveBack: () => {
          gsap.set(cards, {
            y: 120,
            opacity: 0,
            scale: 0.85,
          });
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="mt-10 w-full bg-[#214A1E]">
      <div
        ref={sectionRef}
        className="mx-auto grid max-w-[1300px] grid-cols-1 items-center justify-center gap-4 px-4 md:flex md:gap-10 md:px-6"
      >
        {BENEFIT_CARDS.map((card) => (
          <InertiaHover
            key={card.title}
            strength={2}
            rotation={0}
            resistance={100}
          >
            <div className={BENEFIT_CARD_SELECTOR.slice(1)}>
              <InfoTiltCard
                icon={card.icon}
                title={card.title}
                description={card.description}
                rotation={card.rotation}
              />
            </div>
          </InertiaHover>
        ))}
      </div>
    </section>
  );
}

function WellnessPlansCallout() {
  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-12 md:px-16 lg:min-h-screen"
      style={{ backgroundImage: `url(${images.howItWork})` }}
    >
      <div className="flex justify-end lg:px-6 lg:py-12">
        <div className="h-full w-full max-w-[608px] rounded-[48px] bg-[#214A1E] p-8 lg:h-[662px] lg:rotate-[1.53deg] lg:p-10">
          <div className="flex h-full max-w-[80%] flex-col justify-center">
            <h1 className="font-founders text-2xl font-medium leading-tight text-white lg:text-[48px] lg:leading-[48px]">
              Vaccinations are just the beginning of the journey.
            </h1>

            <p className="my-10 font-manrope text-base font-normal leading-[1.6] text-[#AACFBA] sm:text-lg lg:text-[20px]">
              Our comprehensive Wellness Plans bundle vaccinations with
              diagnostic screenings and annual exams to provide 360-degree
              health coverage.
            </p>

            <PawButton label="Explore Wellness Plans" showIcon={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

function NewStartSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    if (!section || !imageWrap) return;

    const ctx = gsap.context(() => {
      const resetImage = () => {
        gsap.set(imageWrap, {
          x: 140,
          y: 30,
          scale: 0.9,
          rotate: -4,
          autoAlpha: 0,
          transformOrigin: "bottom center",
          willChange: "transform, opacity",
        });
      };

      resetImage();

      const enterImage = () => {
        const tl = gsap.timeline();

        tl.to(imageWrap, {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          autoAlpha: 1,
          duration: 1.6,
          ease: "power3.out",
          clearProps: "willChange",
        }).to(
          imageWrap,
          {
            y: "-=10",
            duration: 2.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
          "-=0.1",
        );
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        onEnter: enterImage,
        onEnterBack: enterImage,
        onLeaveBack: () => resetImage(),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#E1EBDC] px-6 py-12 md:px-16 lg:min-h-[120vh]"
    >
      <div className="flex items-center">
        <div className="lg:ml-16 lg:mt-24">
          <NewStartProgramCard />
        </div>

        <div
          ref={imageWrapRef}
          className="absolute bottom-[-2rem] right-0 lg:bottom-0"
        >
          <img
            src={images.dogandcat}
            alt="Dog and cat together"
            className="w-60 lg:w-[950px]"
          />
        </div>
      </div>
    </section>
  );
}

const ServiceVaccination = () => {
  return (
    <>
      <Seo
        title="Pet Vaccination Services in Lagos | Lili Veterinary Hospital"
        description="Protect your pet with trusted vaccination services at Lili Veterinary Hospital in Lagos. We provide routine vaccines, booster shots, preventive care guidance, and vaccination records for dogs and cats."
        path={ROUTE.vaccination}
      />
      <main className="w-full">
        <ServicesBanner
          title={
            <>
              Vitality Through <br className="hidden lg:block" />
              <span className="text-[#204E1C]">Protection.</span>
            </>
          }
          description="Vaccinations are the foundational safety net for your pet’s lifelong wellness ecosystem, shielding them from environmental threats."
          primaryButtonLabel="View Plans"
          secondaryActionLabel="Book Wellness Visit"
          onSecondaryClick={ROUTE.bookAppointment}
          highlights={<CareHighlights />}
          contentClassName="lg:max-w-[562px]"
          descriptionClass="lg:max-w-[525px]"
          visual={
            <div className="relative">
              <img
                src={images.twoCat}
                alt="Pet wellness banner"
                className="block w-full origin-bottom object-contain lg:scale-[116%]"
              />

              <div className="absolute right-[2rem] top-[-6rem] hidden flex-col items-start lg:flex">
                <h1 className="font-queen max-w-[278px] rotate-[9.27deg] text-[48px] leading-[108%] tracking-[-0.03em] text-[#204E1C]">
                  100% Dedicated care
                </h1>

                <img src={images.urgentBentArrow} alt="" className="w-30" />
              </div>
            </div>
          }
        />
        <ProactiveCare
          title="Proactive Care That Supports Longevity."
          desc="We view vaccinations as a core pillar of your pet's wellness ecosystem. By staying ahead of preventable illnesses, we create a sanctuary of safety that ensures they stay active, happy, and by your side for years to come."
        >
          <VaccineBenefitsSection />
        </ProactiveCare>

        <section className="flex justify-center bg-[#F5F3EE]">
          <div className="mx-auto flex w-full max-w-[1512px] flex-wrap items-center justify-center gap-8 px-6 py-32 md:px-16 lg:flex-nowrap">
            <ProtectionCard
              title="Canine Protection"
              description="Dogs are social explorers. Whether they're at a San Antonio dog park or staying at a boarding facility, their risks are specific. We tailor core and lifestyle vaccines to match their adventure level."
              imageSrc={images.canineDogs}
              imageAlt="Two happy dogs running in a field"
              features={[
                { label: "Boarding Ready" },
                { label: "Travel Protected" },
              ]}
              icon={<Home />}
            />

            <ProtectionCard
              title="Feline Wellness"
              description="Even indoor cats are exposed to diseases carried on shoes or through open screens. We tailor recommendations based on whether they are strictly indoors or enjoy supervised time outside."
              imageSrc={images.catResting}
              imageAlt="Cat resting"
              features={[
                { label: "Indoor Lifestyle" },
                { label: "FeLV Screening" },
              ]}
              icon={<Paw />}
              iconColor="#7D562D"
              tagIconColor="#FFDCBD"
            />
          </div>
        </section>

        <HowItWorksSection
          steps={WELLNESS_STEPS}
          title="Your Visit Experience"
          header="The Process"
          sectionClassName="!bg-white"
        />

        <WellnessPlansCallout />

        <NewStartSection />

        <HowItWorksSection
          steps={COMMITMENT_STEPS}
          title="Our Commitment to You."
          sectionClassName="!bg-white !py-30"
        />

        <FaqSection items={faq} />
      </main>
    </>
  );
};

export default ServiceVaccination;
