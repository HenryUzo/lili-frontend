import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import images from "../assests/images";
import videos from "../assests/videos";
import AlertMarquee from "../reuseable-components/alert-marquee";
import PawButton from "../reuseable-components/paw-button";
import UrgentCareCard from "../reuseable-components/urgent-care-card";
import NoteCard from "../reuseable-components/note-card";
import WellnessPlanSection from "../../imports/Home/wellness-plan-section/WellnessPlanSection";
import FaqSection from "../../imports/Home/faq-section/FaqSection";
import { CatAndButterflyAlone } from "../../imports/Home/care-feature-section/CareFeatureSections";
import { ROUTE } from "../../router";
import { Link, useNavigate } from "react-router";
import InertiaHover from "../reuseable-components/inertia-hover";
import MindMarketThreadSection from "../../imports/Home/mind-market-section/MindMarketSection";
import DogCatVideo from "../reuseable-components/dog-cat-video";
import Seo from "../components/seo/Seo";

gsap.registerPlugin(ScrollTrigger);

function Banner() {
  const glassText = [
    "⏰ Same-day appointments may be available",
    "📍  Stone Oak / San Antonio location",
    "🐾💚  Compassionate, experienced team",
    "🐶🐱 Dogs and cats welcome",
  ];

  return (
    <section
      className="relative w-full min-h-screen lg:h-[120vh] bg-[#F2F7EE] bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${images.urgentCareBg})` }}
    >
      <div className="px-6 md:px-16 pt-10 pb-32 lg:pb-40 relative z-50">
        {/* Top row — headline + handwritten note */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          {/* ── Left column ── */}
          <div className="flex flex-col">
            {/* Headline */}
            <h1 className="font-bold text-[48px] sm:text-[60px] relative z-50 lg:text-[76px] tracking-[-2px] lg:tracking-[-3px] font-founders text-[#006838] leading-none">
              <span className="text-[#ED1C24]">Urgent</span> Vet Care
            </h1>
            <h3 className="font-medium  text-[36px] sm:text-[48px] lg:text-[60px] text-[#204E1C] font-founders leading-[108%]">
              in San Antonio
            </h3>

            {/* Body */}
            <p className="text-lg sm:text-xl lg:text-2xl font-normal font-founders tracking-[-0.03em] lg:text-[#333335] text-white max-w-[388px] my-6 lg:my-8">
              If your pet is sick or injured, our team may be able to provide
              same-day care. Call ahead and we'll guide you on the next best
              step.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-start gap-4">
              <PawButton
                variant="primary"
                className="!w-fit"
                label="Give us a call"
                showIcon={false}
              />
              <Link
                to={ROUTE.bookAppointment}
                className="mt-0 lg:mt-5 font-founders underline text-lg font-medium text-[#006838] cursor-pointer"
              >
                Book appointment
              </Link>
            </div>

            {/* Glass card */}
            <div className="border-[#FFFFFF94] border-2 w-full max-w-[501px] mt-5 rounded-[16px] bg-[#EDF9EC66] backdrop-blur-[2px] py-[19px] px-[25px]">
              <div className="w-full bg-[#FFFFFF2E] p-4 rounded-[6px]">
                <ul className="font-founders flex flex-col gap-3">
                  {glassText.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center text-base sm:text-lg font-medium text-[#204E1C]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Right column — handwritten note (hidden on small screens) ── */}
          <div className="hidden lg:flex flex-col items-start mr-26">
            <h1 className="font-queen text-[48px] text-[#204E1C] max-w-[247px] rotate-[9.27deg]">
              He is doing great now BTW
            </h1>
            <img src={images.urgentBentArrow} alt="" />
          </div>
        </div>
      </div>

      {/* Marquee pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-40">
        <AlertMarquee />
      </div>
      <div className="absolute inset-0 block lg:hidden bg-[#0000005C]" />
    </section>
  );
}

function WhenToSeekUrgentCare() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const desktopGridRef = useRef<HTMLDivElement | null>(null);
  const mobileSliderRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const urgentCards = [
    {
      media: { type: "video" as const, src: videos.sadDog },
      title: "Vomiting or Diarrhea",
      rotation: 5.81,
      className: "",
    },
    {
      media: {
        type: "image" as const,
        src: images.difficultyBreathing,
        alt: "Cat resting",
      },
      title: "Difficulty Breathing",
      rotation: -12.75,
      className: "mt-[-14rem]",
    },
    {
      media: {
        type: "image" as const,
        src: images.serzure,
        alt: "Seizures or tremors",
      },
      title: "Seizures or Tremors",
      rotation: -7.75,
      className: "mt-[-9rem]",
    },
    {
      media: {
        type: "image" as const,
        src: images.limpingDog,
        alt: "Limping dog",
      },
      title: `Limping, Injuries\n& Pain`,
      rotation: 5.81,
      className: "mt-[-2rem]",
    },
    {
      media: {
        type: "image" as const,
        src: images.lossOfAppetite,
        alt: "Loss of appetite",
      },
      title: "Loss of Appetite",
      rotation: -12.75,
      className: "mt-[-3rem]",
    },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const grid = desktopGridRef.current;

    if (!section || !grid) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-urgent-card]", grid);

      if (!cards.length) return;

      gsap.set(cards, {
        y: -180,
        autoAlpha: 0,
        scale: 0.94,
      });

      const tween = gsap.to(cards, {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 1.05,
        ease: "back.out(1.2)",
        stagger: 0.12,
        scrollTrigger: {
          trigger: grid,
          start: "top 78%",
          once: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  const scrollMobileCards = (direction: "prev" | "next") => {
    const slider = mobileSliderRef.current;
    if (!slider) return;

    const amount = slider.clientWidth * 0.82;

    slider.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-50 bg-[#214A1E] px-6 pt-10 pb-20 md:px-16 lg:pb-40"
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-10 text-center font-founders text-[28px] font-medium uppercase text-white sm:text-[36px]  lg:text-[48px]">
          When to seek urgent care
        </h1>

        {/* mobile carousel */}
        <div className="w-full lg:hidden">
          <div className="mx-auto mb-4 flex w-full max-w-sm items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => scrollMobileCards("prev")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => scrollMobileCards("next")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm"
            >
              →
            </button>
          </div>

          <div
            ref={mobileSliderRef}
            className="mx-auto flex w-full max-w-sm snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {urgentCards.map((card, i) => (
              <div key={i} className="snap-center shrink-0">
                <UrgentCareCard
                  media={card.media}
                  title={card.title}
                  titlePosition="overlay"
                  rotation={0}
                  className="!w-[290px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* desktop grid */}
        <div
          ref={desktopGridRef}
          className="hidden gap-10 lg:grid lg:grid-cols-2"
        >
          <div data-urgent-card>
            <UrgentCareCard
              media={urgentCards[0].media}
              title={urgentCards[0].title}
              titlePosition="overlay"
              rotation={urgentCards[0].rotation}
            />
          </div>

          <div />

          <div />

          <div data-urgent-card>
            <UrgentCareCard
              media={urgentCards[1].media}
              title={urgentCards[1].title}
              titlePosition="overlay"
              rotation={urgentCards[1].rotation}
              className={urgentCards[1].className}
            />
          </div>

          <div data-urgent-card>
            <UrgentCareCard
              media={urgentCards[2].media}
              title={urgentCards[2].title}
              titlePosition="overlay"
              rotation={urgentCards[2].rotation}
              className={urgentCards[2].className}
            />
          </div>

          <div data-urgent-card>
            <UrgentCareCard
              media={urgentCards[3].media}
              title={urgentCards[3].title}
              titlePosition="overlay"
              rotation={urgentCards[3].rotation}
              className={urgentCards[3].className}
            />
          </div>

          <div data-urgent-card>
            <UrgentCareCard
              media={urgentCards[4].media}
              title={urgentCards[4].title}
              titlePosition="overlay"
              rotation={urgentCards[4].rotation}
              className={urgentCards[4].className}
            />
          </div>
        </div>

        <div className="mt-16">
          <PawButton
            icon={images.phoneIcon}
            onClick={() => navigate(ROUTE.contact)}
            label="Get In Touch Fast"
          />
        </div>
      </div>
    </section>
  );
}

function RoadMap() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const anchor = anchorRef.current;
    const card = cardRef.current;

    if (!section || !anchor || !card) return;

    gsap.set(card, {
      autoAlpha: 0,
      y: 18,
      scale: 0.98,
      transformOrigin: "50% 100%",
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: anchor,
          start: "top 72%",
          once: true,
        },
      });

      tl.to(card, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.75,
        ease: "power2.out",
        onComplete: () => {
          floatTweenRef.current = gsap.to(card, {
            y: -10,
            duration: 1.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        },
      });
    }, section);

    return () => {
      floatTweenRef.current?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#214A1E]">
      <div className="relative w-full overflow-hidden">
        <img src={images.roadMap} alt="Map" className="block w-full h-auto" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] lg:h-[1700px] h-[400px] bg-gradient-to-b from-transparent to-[#214A1E]" />

        <div
          ref={anchorRef}
          className="absolute z-[2]"
          style={{
            left: "59.2%",
            bottom: "29.7%",
          }}
        >
          <div className="relative">
            <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
              <span className="block h-3 w-3 rounded-full border-2 border-white bg-[#214A1E] opacity-0 shadow-md" />
            </div>
          </div>
        </div>

        <div
          ref={cardRef}
          className="absolute z-[3] will-change-transform"
          style={{
            left: "59.2%",
            bottom: "29.7%",
          }}
        >
          <div className="absolute left-0 bottom-0 -translate-x-1/2 -translate-y-4">
            <div className="relative">
              <div className="flex w-[200px] flex-col overflow-hidden rounded-[16px] bg-white shadow-xl md:w-[400px] lg:h-[290px] h-[160px]">
                <img
                  src={images.liliVeterinaryHospital}
                  alt=""
                  className="w-full object-cover h-[70%]"
                />

                <div className="bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.google.com/maps/place/Lili+Veterinary+Hospital+%2B+Urgent+Care/@29.6423004,-98.4789347,15z/data=!4m6!3m5!1s0x865c89d98657135d:0x4d615151bf45d1d7!8m2!3d29.6423004!4d-98.4789347!16s%2Fg%2F11bx8rygyq?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
                        className="block font-founders text-xs font-semibold md:text-base lg:text-[20px]"
                      >
                        20210 Stone Oak Pkwy #301, San Antonio, TX 78258
                      </a>
                    </div>

                    <img
                      src={images.mapIcon}
                      alt=""
                      className="hidden w-12 lg:block"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[30%] left-1/2 z-[10000] flex flex-col -translate-x-1/2">
        <div className="flex flex-col items-center justify-center py-5">
          <h1 className="text-center font-queen text-[20px] leading-[108%] text-white md:text-[56px] lg:text-[72px]">
            We are always here for you!!
          </h1>
          <img src={images.thuderArrrow} alt="" className="lg:w-fit w-1" />
        </div>
      </div>
      <img
        src={images.theTeam}
        alt="the team"
        className="mt-[-22%] w-full z-50 relative"
      />
    </section>
  );
}

function WhatToExpect() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const cards = [
    {
      imageSrc: images.checkIn,
      imageAlt: "Pet care",
      title: "Exam",
      description:
        "Your pet will receive an exam so we can understand what’s happening and discuss any immediate concerns with you.",
      rotation: -3,
    },
    {
      imageSrc: images.exam,
      imageAlt: "Pet care",
      title: "Treatment Plan",
      description:
        "We’ll explain the recommended treatment options, next steps, and what to expect before moving forward.",
      rotation: 2,
    },
    {
      imageSrc: images.diagnostic,
      imageAlt: "Pet care",
      title: "Care",
      description:
        "Your pet will receive the care they need as quickly and safely as possible from our medical team.",
      rotation: -3,
    },
    {
      imageSrc: images.treatment,
      imageAlt: "Pet care",
      title: "Follow-up",
      description:
        "We’ll walk you through aftercare instructions and schedule any necessary follow-up visits to support recovery.",
      rotation: 2,
    },
  ];

  const scrollByCard = (direction: "prev" | "next") => {
    if (!sliderRef.current) return;

    const cardWidth = 240;
    sliderRef.current.scrollBy({
      left: direction === "next" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative z-50 bg-[#F2FCED] px-6 pt-10 pb-20 md:px-16 lg:pb-40">
      <div className="flex flex-col items-center justify-center">
        <h1 className="heading max-w-[566px] text-center text-[32px] leading-[108%] text-[#214A1E] md:text-[48px] lg:text-[72px]">
          What to expect when you come in...
        </h1>

        {/* mobile carousel */}
        <div className="mt-8 w-full md:hidden">
          <div className="mb-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => scrollByCard("prev")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#214A1E]/15 bg-white text-[#214A1E] shadow-sm"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("next")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#214A1E]/15 bg-white text-[#214A1E] shadow-sm"
            >
              →
            </button>
          </div>

          <div
            ref={sliderRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {cards.map((card, index) => (
              <div key={index} className="snap-center shrink-0">
                <NoteCard
                  {...card}
                  className="lg:!w-[220px] w-[300px]"
                  rotation={0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* tablet and desktop grid */}
        <div className="mt-10 hidden grid-cols-2 gap-6 md:grid lg:grid-cols-4">
          {cards.map((card, index) => (
            <InertiaHover
              strength={2}
              rotation={0}
              resistance={100}
              className="z-[10000] relative"
            >
              <NoteCard key={index} {...card} />
            </InertiaHover>
          ))}
        </div>
        <div className="flex flex-wrap items-start  my-16 gap-4">
          <PawButton variant="primary" className="!w-fit" />
          <p className="mt-0 lg:mt-5 font-founders underline text-lg font-medium text-[#006838] cursor-pointer">
            Give us a call
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhatToExpect;
export function UrgentCare() {
  return (
    <>
      <Seo
        title="Urgent Pet Care in Lagos | Lili Veterinary Hospital"
        description="Get prompt veterinary attention for breathing issues, vomiting, injuries, weakness, bleeding, and other urgent pet health concerns in Lagos."
        path={ROUTE.urgentCare}
      />

      <main className="w-full">
        <Banner />

        <WhenToSeekUrgentCare />

        <RoadMap />
        <WhatToExpect />
        <DogCatVideo />
        <WellnessPlanSection />
        <FaqSection />
      </main>
    </>
  );
}
