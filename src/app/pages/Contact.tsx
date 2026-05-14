import { useLayoutEffect, useRef } from "react";
import { FaTiktok, FaFacebookF } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbMapPinFilled } from "react-icons/tb";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import images from "../assests/images";
import {
  DIRECTIONS_URL,
  REVIEW_URL,
  trackDirectionsClick,
} from "../../lib/analytics";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
} from "../../lib/external-links";
import PawButton from "../reuseable-components/paw-button";
import PhonePanel from "../reuseable-components/phone-panel";

gsap.registerPlugin(ScrollTrigger);

const darkOverlayGradient =
  "radial-gradient(29.86% 47.74% at 37.02% 58.16%, rgba(88, 105, 90, 0) 0%, rgba(66, 85, 72, 0.541913) 23.52%, rgba(37, 54, 41, 0.846) 45.03%, rgba(2, 33, 12, 0.9) 100%)";

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const lightOverlayRef = useRef<HTMLDivElement | null>(null);
  const darkOverlayRef = useRef<HTMLDivElement | null>(null);

  const introRef = useRef<HTMLDivElement | null>(null);

  const finalTitleRef = useRef<HTMLHeadingElement | null>(null);
  const finalLineRef = useRef<HTMLDivElement | null>(null);

  const leftStackRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile =
      typeof window !== "undefined" &&
      window.innerWidth < 1024;

    const setFinal = () => {
      gsap.set(lightOverlayRef.current, { autoAlpha: 0 });
      gsap.set(darkOverlayRef.current, { autoAlpha: 1 });

      gsap.set(introRef.current, { autoAlpha: 0 });

      gsap.set(
        [
          finalTitleRef.current,
          finalLineRef.current,
          leftStackRef.current,
          centerRef.current,
          rightRef.current,
        ],
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          scaleX: 1,
          rotate: 0,
          clearProps: "transform",
        },
      );
    };

    // MOBILE → no GSAP scroll interaction
    if (isMobile || reduceMotion) {
      setFinal();
      return;
    }

    // DESKTOP ONLY
    const setInitial = () => {
      gsap.set(lightOverlayRef.current, { autoAlpha: 1 });
      gsap.set(darkOverlayRef.current, { autoAlpha: 0 });

      gsap.set(introRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      });

      gsap.set(finalTitleRef.current, {
        autoAlpha: 0,
        y: 36,
        scale: 0.96,
      });

      gsap.set(finalLineRef.current, {
        autoAlpha: 0,
        scaleX: 0.35,
        transformOrigin: "center center",
      });

      gsap.set(leftStackRef.current, {
        autoAlpha: 0,
        x: -90,
        y: 30,
        rotate: -4,
      });

      gsap.set(centerRef.current, {
        autoAlpha: 0,
        y: 36,
        scale: 0.9,
      });

      gsap.set(rightRef.current, {
        autoAlpha: 0,
        x: 90,
        y: 30,
        rotate: 4,
      });
    };

    setInitial();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    tl.to(
      lightOverlayRef.current,
      {
        autoAlpha: 0,
        ease: "power2.out",
        duration: 0.5,
      },
      0.05,
    )
      .to(
        darkOverlayRef.current,
        {
          autoAlpha: 1,
          ease: "power2.out",
          duration: 0.7,
        },
        0.05,
      )
      .to(
        introRef.current,
        {
          autoAlpha: 0,
          y: -30,
          scale: 0.96,
          ease: "power3.out",
          duration: 0.45,
        },
        0.15,
      )
      .to(
        finalTitleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: "power3.out",
          duration: 0.5,
        },
        0.35,
      )
      .to(
        finalLineRef.current,
        {
          autoAlpha: 1,
          scaleX: 1,
          ease: "power2.out",
          duration: 0.35,
        },
        0.4,
      )
      .to(
        leftStackRef.current,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotate: 0,
          ease: "back.out(1.15)",
          duration: 0.5,
        },
        0.52,
      )
      .to(
        rightRef.current,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotate: 0,
          ease: "back.out(1.15)",
          duration: 0.5,
        },
        0.58,
      )
      .to(
        centerRef.current,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          ease: "back.out(1.2)",
          duration: 0.4,
        },
        0.62,
      );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <>
      <Seo
        title="Contact Lili Veterinary Hospital | San Antonio, TX"
        description="Contact Lili Veterinary Hospital in San Antonio to request care, ask questions, or get directions to our clinic."
        path={ROUTE.contact}
      />

      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden bg-[#F2F7EE] text-[#0A3B2E] lg:h-screen"
      >
        <img
          src={images.map}
          alt="Map background"
          className="absolute inset-0 h-full w-full object-cover md:block hidden"
        />

        <div
          ref={lightOverlayRef}
          className="pointer-events-none absolute inset-0 z-10 md:block hidden"
          style={{
            background:
              "linear-gradient(180deg, #F2F7EE 41.61%, rgba(242,247,238,0.24) 100%)",
          }}
        />

        <div
          ref={darkOverlayRef}
          className="pointer-events-none absolute inset-0 md:block hidden z-10"
          style={{
            background: darkOverlayGradient,
          }}
        />

        <div className="relative z-50 mx-auto flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <div
            ref={introRef}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <div className="mx-auto mt-[-6rem] flex max-w-4xl flex-col items-center justify-center gap-3 px-4 text-center select-text">
              <h2 className="font-founders text-center text-[40px] font-medium tracking-[-0.03em] text-[#006838] md:text-[54px] lg:text-[64px]">
                Reach out to us and find
              </h2>

              <div className="font-queen text-center text-[72px] font-normal leading-[0.92] text-[#012D1D] md:text-[110px] lg:text-[154px]">
                Peace of Mind
              </div>

              <p className="manrope mt-4 max-w-3xl text-center text-[16px] font-medium tracking-[0] text-[#414844] md:text-[18px] md:leading-[29px] lg:text-[20px] lg:leading-[32.5px]">
                Whether it’s a routine wellness visit or a sudden health
                concern, our compassionate team provides the guidance you and
                your pet deserve.
              </p>

              <div className="mt-8 flex flex-col items-start justify-center gap-4 pointer-events-auto sm:flex-row">
                <div className="pointer-events-auto">
                  <PawButton variant="primary" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex h-full min-h-[110vh] flex-col">
            <div className="mx-auto mt-2 max-w-3xl text-center md:mt-4">
              <div className="md:hidden block space-y-2">
                  <h2 className="font-medium text-3xl  text-center font-founders">Reach out to us and find</h2>
              <p className="font-normal text-6xl  text-center font-queen">Peace of Mind</p>
              <p className="font-normal text-xl text-center font-founders">Whether it's a routine wellness visit or a sudden health concern, our compassionate team provides the guidance you and your pet deserve.</p>
              </div>
            
              <h3
                ref={finalTitleRef}
                className="font-queen text-center text-[56px] md:block hidden font-normal leading-[52px] tracking-[0] text-white md:text-[72px] md:leading-[68px] lg:text-[76px] lg:leading-[88px]"
              >
                We’re easy to locate
              </h3>

              <div
                ref={finalLineRef}
                className="mt-5 h-px w-full bg-white/25"
              />
            </div>

            <div className="my-auto grid gap-8  lg:grid-cols-[1.05fr_0.8fr_1fr] lg:items-end lg:pb-6">
              <div
                ref={leftStackRef}
                className="flex flex-col gap-4 h-full self-end"
              >
                <LocationCard />
                <SocialPlatforms />
              </div>

              <div
                ref={centerRef}
                className="self-center lg:self-center lg:pb-16"
              >
                <CenterMapAction />
              </div>

              <div ref={rightRef} className="mt-2 min-h-[580px] self-end">
                <PhonePanel location="contact_page" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LocationCard() {
  return (
    <div className="max-w-[360px] overflow-hidden  rounded-[16px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
      <div className="overflow-hidden">
        <img
          src={images.liliVeterinaryHospital}
          alt="Lili Veterinary Hospital exterior"
          className="h-[380px] w-full object-cover"
        />
      </div>

      <div className="mt-3 rounded-[16px] px-3 py-3 h-fit ">
        <div className="flex items-start gap-2 h-fit">
          <HiOutlineLocationMarker className="mt-0.5 shrink-0 text-base text-[#0C6B43]" />
          <p className="text-[15px] font-medium leading-5 text-[#16231C]">
            20210 Stone Oak Pkwy #301,
            <br />
            San Antonio, TX 78258
          </p>
        </div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import Seo from "../components/seo/Seo";
import { ROUTE } from "../../router";

const hoverLift = {
  y: -6,
  scale: 1.06,
  transition: {
    type: "spring",
    stiffness: 420,
    damping: 14,
    mass: 0.6,
  },
};

const contactPlatformLinks = [
  {
    label: "Visit Lili Veterinary Hospital on Instagram",
    href: INSTAGRAM_URL,
    icon: (
      <img
        src={images.igIcon}
        alt="Instagram"
        className="h-7 w-7 object-contain"
      />
    ),
  },
  {
    label: "TikTok profile coming soon",
    icon: <FaTiktok className="text-[26px] text-black" />,
  },
  {
    label: "Visit Lili Veterinary Hospital on Facebook",
    href: FACEBOOK_URL,
    icon: (
      <FaFacebookF className="rounded-full bg-[#1877F2] p-1 text-[28px] text-white" />
    ),
  },
  {
    label: "Find Lili Veterinary Hospital directions",
    href: DIRECTIONS_URL,
    icon: (
      <img
        src={images.bingIcon}
        alt="Bing"
        className="h-7 w-7 object-contain"
      />
    ),
  },
  {
    label: "Leave a Google review for Lili Veterinary Hospital",
    href: REVIEW_URL,
    icon: (
      <img
        src={images.logosGoogleMmaps}
        alt="Google"
        className="h-7 w-7 object-contain"
      />
    ),
  },
  {
    label: "Open Lili Veterinary Hospital location",
    href: DIRECTIONS_URL,
    icon: (
      <img
        src={images.blog}
        alt="Apple Maps"
        className="h-7 w-7 object-contain"
      />
    ),
  },
] as const;

function ContactPlatformIcon({
  href,
  label,
  icon,
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
}) {
  const sharedClassName =
    "flex items-center justify-center rounded-full transition";

  if (!href) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`${sharedClassName} cursor-default opacity-60`}
        aria-label={label}
        title={label}
      >
        {icon}
      </motion.div>
    );
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={hoverLift}
      whileTap={{ scale: 0.96 }}
      className={`${sharedClassName} cursor-pointer`}
      aria-label={label}
      title={label}
    >
      {icon}
    </motion.a>
  );
}

function SocialPlatforms() {
  return (
    <div className="mt-1 flex max-w-[360px] flex-wrap items-center justify-between gap-4 rounded-[16px] bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
      {contactPlatformLinks.map((platform) => (
        <ContactPlatformIcon
          key={platform.label}
          href={platform.href}
          label={platform.label}
          icon={platform.icon}
        />
      ))}
    </div>
  );
}

function CenterMapAction() {
  return (
    <div className="md:flex flex-col items-center justify-center gap-4 py-6 hidden">
      <a
        href="https://www.google.com/maps/place/Lili+Veterinary+Hospital+%2B+Urgent+Care/@29.642305,-98.4815096,739m/data=!3m2!1e3!4b1!4m6!3m5!1s0x865c89d98657135d:0x4d615151bf45d1d7!8m2!3d29.6423004!4d-98.4789347!16s%2Fg%2F11bx8rygyq?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
        target="_blank"
        rel="noreferrer"
        onClick={() => trackDirectionsClick("contact_page")}
        className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white px-7 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-[#0A3B2E]"
      >
        View Location on Map
      </a>

      <a
        href={DIRECTIONS_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackDirectionsClick("contact_page")}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 text-white transition hover:bg-white/10"
      >
        <TbMapPinFilled className="text-xl" />
      </a>
    </div>
  );
}
