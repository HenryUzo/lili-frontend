import { Suspense, lazy } from "react";
import AppQueryProvider from "../components/AppQueryProvider";
import PawButton from "../reuseable-components/paw-button";
import RegisterPetForm from "../components/register-pet-form/Registerpetform";
import StepCard from "../reuseable-components/step-card";
import InertiaHover from "../reuseable-components/inertia-hover";
import ServiceCard from "../reuseable-components/service-card";
import UrgentCareSection from "../reuseable-components/urgent-care-section";
import PhoneCallDialog from "../reuseable-components/call-modal";
import Seo from "../components/seo/Seo";
import { ROUTE } from "../../router";
import howItWork from "../assests/images/how-it-work.webp";
import calenderIcon from "../assests/images/calender-Icon.svg";
import redFIleIcon from "../assests/images/red-file-icon.svg";
import redGroupIcon from "../assests/images/red-group-icon.svg";
import redTextIcon from "../assests/images/red-text-icon.svg";
import dontForget from "../assests/images/dont-forget.svg";
import checkList from "../assests/images/checklist.svg";
import wellnessIcon from "../assests/images/wellness-icon.svg";
import vaccineIcon from "../assests/images/vaccine-icon.svg";
import diagnosticsIcon from "../assests/images/diagnostics-icon.svg";
import urgentCareIcon from "../assests/images/urgent-care-icon.svg";
import dentalCareIcon from "../assests/images/dental-care-icon.svg";
import surgeryIcon from "../assests/images/surgery-Icon.svg";
import healthPlusIcon from "../assests/images/health-plus-icon.svg";
import twoDocandDog from "../assests/images/2docanddog.png";

const FaqSection = lazy(() => import("../../imports/Home/faq-section/FaqSection"));

function NewToLiliVetHero() {
  return (
    <section className=" bg-[#F2F7EE] flex items-center py-6 justify-between px-[24px] md:px-[64px]">
      <div className="w-full  text-white lg:h-[73vh] h-full">
        <div className="mx-auto flex lg:flex-nowrap flex-wrap gap-8 min-h-screen  justify-between ">
          <div>
            <h1 className="lg:text-left text-center  font-medium font-founders leading-[0.95] tracking-[-0.04em] text-[#007A3D] text-[36px] md:text-[30px] lg:text-[64px]">

              <span className=" text-[#006838] lg:font-medium font-bold  ">New to LiliVet?</span>
              <br /> We’re Here to Help You Get

            </h1>

            <p className="mt-10 max-w-[470px] lg:text-left text-center font-founders text-[20px] leading-[1.2] tracking-[-0.03em] text-[#1E1E1E] sm:text-[22px] md:text-[24px]">
              Personalized routine and urgent care in San Antonio/Stone Oak. We
              treat your pets like our own scrapbook memories—with love and
              meticulous detail.
            </p>

            <div className="mt-14 flex lg:flex-wrap items-start lg:justify-start justify-between lg:gap-8 gap-2">
              <PawButton variant="primary" buttonClassName="text-lg!" className="!w-fit" />
              <div className="lg:mt-4 mt-1 ">

                <PhoneCallDialog
                  trigger={
                    <button
                      type="button"
                      className="text-[18px] font-medium font-founders  text-[#008E49] underline underline-offset-4 transition hover:opacity-80"
                    >
                      Call now
                    </button>
                  }
                  location="new_patients_page"
                />
              </div>
            </div>
          </div>
          <div>
            <RegisterPetForm />
          </div>
        </div>
      </div>
    </section>
  );
}
function HowItWorks() {
  return (
    <section
      className="relative w-full overflow-hidden lg:h-[532px] h-full py-3 px-[24px] md:px-[64px] flex items-center justify-center"
    >
      <img
        src={howItWork}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="relative z-50 flex flex-col gap-8 ">
        <h1 className="font-queen lg:text-left text-center lg:text-[72px] text-[38px] text-white">
          How it works
        </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          <InertiaHover strength={2} rotation={0} resistance={100}>
            <StepCard
              icon={calenderIcon}
              title="Schedule your visit"
              description="Book online or give us a call to find a time that fits your busy schedule."
            />
          </InertiaHover>
          <InertiaHover strength={2} rotation={0} resistance={100}>
            <StepCard
              icon={redFIleIcon}
              title="Share information"
              description="Complete our digital registration to help us understand your pet's unique needs."
              rotation={1.2}
            />
          </InertiaHover>
          <InertiaHover strength={2} rotation={0} resistance={100}>
            <StepCard
              icon={redGroupIcon}
              title="Meet with our team"
              description="Sit down with our
compassionate experts for a thorough exam and
conversation."
            />
          </InertiaHover>
          <InertiaHover strength={2} rotation={0} resistance={100}>
            <StepCard
              icon={redTextIcon}
              title="Leave with a plan"
              description="We'll provide a clear summary and next steps for your pet's"
              rotation={-1.5}
            />
          </InertiaHover>
        </div>
      </div>

      <div className="absolute inset-0 bg-[#0000005C]" />
    </section>
  );
}
function WhatToBring() {
  return (
    <section className="relative w-full px-[24px] py-10 md:px-[64px] bg-[#f2fced] min-h-[582px] flex items-center justify-center">
      <div className="flex lg:flex-nowrap flex-wrap justify-start items-center gap-20">

        <div className="relative flex items-center flex-col justify-center w-full">
          <InertiaHover
            strength={2}
            rotation={0}
            resistance={100}
            infiniteRotate={true}
            className="z-30 lg:absolute lg:right-[-2rem] lg:w-fit w-[100px] lg:top-0 lg:mt-[-4rem] mb-[-2rem]"
          >
            <img
              src={dontForget}
              alt=""
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </InertiaHover>
          <InertiaHover
            strength={2}
            rotation={0}
            resistance={100}

          >
            <img src={checkList} alt="" loading="lazy" decoding="async" />

          </InertiaHover>
        </div>

        <div className="lg:max-w-[576px]    ">
          <h2 className="lg:text-[48px] text-[31px] lg:text-left text-center  font-medium font-founders  lg:leading-[60px]">
            Prepared for the best visit possible.
          </h2>
          <p className="text-lg manrope  mt-2 lg:text-left text-center">
            Having these details ready allows our doctors to focus entirely on
            your pet's physical exam and long-term health plan, ensuring we
            don't miss any critical context from their history.
          </p>
        </div>
      </div>
    </section>
  );
}
function ComprehensiveCare() {
  const services = [
    {
      icon: wellnessIcon,
      title: "Wellness Exams",
      description:
        "Full head-to-tail physical examinations to establish health baselines.",
    },
    {
      icon: vaccineIcon,
      title: "Vaccinations",
      description:
        "Customized immunization plans based on your pet's lifestyle.",
      borderBottomColor: "#AD321C",
    },
    {
      icon: diagnosticsIcon,
      title: "Diagnostics",
      description:
        "In-house labs and digital radiology for quick, accurate results.",
    },
    {
      icon: urgentCareIcon,
      title: "Urgent Care",
      description: "Same-day support for non-life-threatening emergencies.",
      borderBottomColor: "#AD321C",
    },
    {
      icon: dentalCareIcon,
      title: "Dental Care",
      description: "Professional cleaning and oral health assessments.",
    },
    {
      icon: surgeryIcon,
      title: "Surgery",
      description: "Routine spays/neuters and soft tissue surgical procedures.",
      borderBottomColor: "#AD321C",
    },
    {
      icon: healthPlusIcon,
      title: "Preventive Planning",
      description:
        "Nutrition, behavior, and parasite prevention tailored to the San Antonio climate.",
      className: "lg:col-span-2",
    },
  ];

  return (
    <section className="w-full bg-[#DBE5D64D] px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1164px] flex-col items-center gap-10 lg:gap-14">
        <div className="flex max-w-[597px] flex-col items-center gap-4 text-center">
          <h2 className="font-queen text-[40px] leading-[0.95] tracking-[-0.03em] text-[#1D1D1B] sm:text-[52px] md:text-[64px] lg:text-[72px]">
            Comprehensive Care from Day One
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
          {services.map((service) => (
            <InertiaHover
              key={service.title}
              strength={2}
              rotation={0}
              resistance={100}
            >
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                borderBottomColor={service.borderBottomColor}
                className={service.className}
              />
            </InertiaHover>
          ))}
        </div>
      </div>
    </section>
  );
}
function UrgentCare() {
  return (
    <section className="relative w-full px-[24px] py-10 md:px-[64px] bg-[#f2fced] min-h-[582px] flex items-center justify-center">
      <UrgentCareSection imageSrc={twoDocandDog} />
    </section>
  );
}

export function NewPatients() {
  return (
    <>
      <Seo
        title="New Patients at Lili Veterinary Hospital | Personalized Pet Care in San Antonio"
        description="Welcome to Lili Veterinary Hospital! Our new patient services in San Antonio include personalized wellness exams, preventive care, and urgent support. We treat your pets like family, ensuring a smooth transition to our compassionate care."
        path={ROUTE.newPatients}
      />
      <AppQueryProvider>
        <main className="w-full">
          <NewToLiliVetHero />
          <HowItWorks />
          <WhatToBring />
          <ComprehensiveCare />
          <UrgentCare />
          <Suspense fallback={<div className="min-h-[720px] w-full bg-[#0D2E1C]" />}>
            <FaqSection />
          </Suspense>
        </main>
      </AppQueryProvider>
    </>

  );
}
