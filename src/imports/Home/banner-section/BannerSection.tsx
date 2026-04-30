import { useEffect, useRef, useState, type CSSProperties } from "react";
import svgPaths from "../../../app/components/svgpath";
import images from "../../../app/assests/images";
import PawButton from "../../../app/reuseable-components/paw-button";
import InertiaHover from "../../../app/reuseable-components/inertia-hover";
import ScrollableMarquee from "../../../app/reuseable-components/scrollable-marquee";
import AlertMarquee from "../../../app/reuseable-components/alert-marquee";
import { useNavigate } from "react-router";
import { ROUTE } from "../../../router";
import BadgeWordmark from "../../../app/components/badge-word-mark/BadgeWordmark";
function ServiceBadge() {
  return (
    <div>
      <img src={images.serviceSticker} alt="Service Badge" className="w-34" />
    </div>
  );
}

function CareBadge() {
  return (
    <div>
      <img src={images.careSticker} alt="Care Badge" className="w-34" />
    </div>
  );
}

function StickerArtwork() {
  return (
    <div className="" data-name="Group">
      <img src={images.happySticker} alt="" className="w-58" />
    </div>
  );
}

// function HeroPetIllustration() {
//   return (
//     <div className="  relative w-ful ">
//       {/* <div className="absolute top-50 -left-60">
//         <HeroVisualCluster />
//       </div> */}

//       <div className="relative w-full ">
//         <img alt="Cat and dog illustration" src={images.cuteCatAndDog} />
//       </div>
//     </div>
//   );
// }
function HeroPetIllustration() {
  return (
    <div className="relative ml-[-23rem] mt-[-3rem] lg:block hidden  ">
      <div className="absolute z-[10000] " style={{ top: "50%", left: "4.8%" }}>
        <InertiaHover
          strength={2}
          rotation={2}
          resistance={100}
          infiniteRotate
          rotateSpeed={8}
          rotateDirection="clockwise"
        >
          <StickerArtwork />
        </InertiaHover>
      </div>

      <div className="absolute z-[10000]" style={{ top: "40%", left: "20%" }}>
        <InertiaHover
          strength={2}
          rotation={1}
          resistance={100}
          infiniteRotate
          rotateSpeed={8}
          rotateDirection="clockwise"
        >
          <CareBadge />
        </InertiaHover>
      </div>

      {/* <div className="absolute z-[10000]" style={{ top: "47%", left: "15%" }}>
        <InertiaHover
          strength={2}
          rotation={1}
          resistance={100}
          infiniteRotate
          rotateSpeed={8}
          rotateDirection="counterclockwise"
        >
          <ServiceBadge />
        </InertiaHover>
      </div> */}

      <img
        alt="Cat and dog illustration"
        className=" !max-w-[1091px] scale-105"
        src={images.cuteCatAndDog}
      />
    </div>
  );
}
function ExceptionalWordmark() {
  return (
    <div
      className="[width:clamp(280px,70vw,830.961px)] [height:clamp(72px,18vw,213.949px)] mb-[-63px] relative shrink-0"
      data-name="exceptional"
    >
      <BadgeWordmark />
    </div>
  );
}

function HeroHeadlineBlock() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[40px] relative shrink-0 w-full">
      <ExceptionalWordmark />
      <div className="mt-6 lg:mt-[-3rem] mb-[-36px] w-full lg:ml-[-10rem] text-center font-founders text-[clamp(2rem,8vw,96px)] font-bold tracking-[-0.03em] text-[#009444]">
        <p>
          <span>care with </span>
          <span className="text-[#ed1c24]">love</span>
        </p>
      </div>
    </div>
  );
}

function WellnessArrowBadge() {
  return (
    <div className="[height:clamp(40px,6vw,70.949px)] [width:clamp(40px,6vw,71.328px)] relative">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 71.3277 70.9489"
      >
        <g id="Group 47206">
          <path
            d={svgPaths.p1aa1e520}
            fill="var(--fill-0, #DF1C23)"
            id="Vector 141"
            stroke="var(--stroke-0, #D31A21)"
            strokeDasharray="2 2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g id="to">
            <path
              d={svgPaths.p24eaa9f0}
              fill="var(--fill-0, white)"
              id="Vector"
            />
            <path
              d={svgPaths.p24af4e40}
              fill="var(--fill-0, white)"
              id="Vector_2"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
function HeroSubheadlineBlock() {
  return (
    <div className="relative inline-flex items-start uppercase lg:ml-10 w-full justify-center lg:justify-start">
      <div className="font-founders text-[#012d1d] [font-size:clamp(18px,3.4vw,40px)] tracking-[-0.02em] font-medium leading-[1.077] text-center lg:text-left">
        <p>Lifelong Wellness</p>
        <div className="flex items-center justify-center lg:justify-start">
          <div className="-mt-[0.2em] rotate-[7deg] mr-[-1rem] [width:clamp(40px,6.7vw,80px)] [height:clamp(40px,6.7vw,80px)]">
            <WellnessArrowBadge />
          </div>
          <p>urgent care</p>
        </div>
      </div>
    </div>
  );
}

function HeroContentBlock() {
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col gap-[10px] items-start  lg:px-[48px] px-4 lg:w-[880.961px] w-full">
      <HeroHeadlineBlock />
      <HeroSubheadlineBlock />
      <div className="lg:ml-10 lg:block flex justify-center lg:w-fit w-full items-center">
        <PawButton
          pawTiltAngle={40}
          className="!w-fit"
          onClick={() => navigate(ROUTE.bookAppointment)}
        />
        <div className="lg:block hidden">
          <img src={images.wearehere} alt="" className="w-[230px]" />
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className=" h-full relative   w-full flex flex-col lg:flex-row">
      <HeroContentBlock />
      <HeroPetIllustration />
      <div className="lg:hidden block">
        <img src={images.cuteCatandDogMobile} alt="" className="w-full" />
      </div>
    </div>
  );
}

export function HeroBannerSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#d6ebae] ">
      <HeroSection />

      <div className="pointer-events-none md:-mt-50 mt-0 lg:block hidden">
        <div className="relative mx-auto h-[clamp(220px,30vw,460px)] w-full  px-0">
          <ScrollableMarquee />
        </div>
      </div>
      <div className="lg:hidden block">
        <AlertMarquee bgColor="#214A1E" />
      </div>
    </section>
  );
}

export default HeroBannerSection;
