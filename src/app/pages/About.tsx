import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import images from "../assests/images";
import { InfoTiltCard } from "../reuseable-components/info-tilt-card";
import InertiaHover from "../reuseable-components/inertia-hover";
import Seo from "../components/seo/Seo";
import { ROUTE } from "../../router";

gsap.registerPlugin(ScrollTrigger);

type SpecialistItem = {
  id: string;
  bg: string;
  image: string;
  desc: string;
  imageFirst: boolean;
  justify: "justify-center" | "justify-start" | "justify-end";
  rotate: number;
};

const specialists: SpecialistItem[] = [
  {
    id: "dr-okafor",
    bg: "#FBF9F4",
    image: images.drOkafor,
    desc: images.drOkaforDesc,
    imageFirst: true,
    justify: "justify-center",
    rotate: -3,
  },
  {
    id: "damien-ivory",
    bg: "#FFFEEB",
    image: images.damienIvory,
    desc: images.damienIvoryDesc,
    imageFirst: false,
    justify: "justify-end",
    rotate: 10,
  },
  {
    id: "nick-flores",
    bg: "#FFFEEB",
    image: images.nickFlores,
    desc: images.nickFloresDesc,
    imageFirst: false,
    justify: "justify-center",
    rotate: 10,
  },
  {
    id: "rogina",
    bg: "#FBF9F4",
    image: images.rogina,
    desc: images.roginaDesc,
    imageFirst: true,
    justify: "justify-start",
    rotate: -4,
  },

  {
    id: "jen-coutter",
    bg: "#FBF9F4",
    image: images.jenCoutter,
    desc: images.jenCoutterDesc,
    imageFirst: true,
    justify: "justify-start",
    rotate: -3,
  },
  {
    id: "kyla-totanes",
    bg: "#F1FFEB",
    image: images.kylaTotanes,
    desc: images.kylaTotanesDesc,
    imageFirst: false,
    justify: "justify-end",
    rotate: 10,
  },
];

function SpecialistPanel({ item }: { item: SpecialistItem }) {
  return (
    <div
      className="doctor-panel relative min-h-screen w-full md:absolute md:inset-0 md:h-full"
      data-layout={item.imageFirst ? "image-left" : "image-right"}
      style={{ backgroundColor: item.bg }}
    >
      {/* Desktop layout */}
      <div
        className={`hidden md:flex h-full w-full items-center ${item.justify}`}
      >
        {item.imageFirst ? (
          <>
            <div className="doctor-figure z-[100000] shrink-0 will-change-transform">
              <img src={item.image} alt="" />
            </div>
            <div className="doctor-copy-group flex items-center justify-center flex-col ml-[-8rem] shrink-0 will-change-transform">
              <InertiaHover className="z-[10000] strength={2} rotation={2} resistance={100}">
                <img
                  src={images.happySticker}
                  alt=""
                  className="doctor-sticker  mb-[-6.4rem] w-[180px] z-[10000] will-change-transform"
                />
              </InertiaHover>
              <div className="doctor-copy">
                <img src={item.desc} alt="" className="w-[626px] " />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="doctor-copy-group flex items-center justify-center flex-col mr-[-8rem] shrink-0 will-change-transform">
              <img
                src={images.happySticker}
                alt=""
                className="doctor-sticker mb-[-6.4rem] w-[180px] z-[10000] will-change-transform"
              />
              <div className="doctor-copy">
                <img src={item.desc} alt="" className="w-[626px]" />
              </div>
            </div>
            <div className="doctor-figure z-[100000] shrink-0 will-change-transform">
              <img src={item.image} alt="" />
            </div>
          </>
        )}
      </div>

      {/* Mobile layout — always stack vertically */}
      <div className="flex md:hidden h-full w-full flex-col items-center justify-center gap-4 px-4 py-8 overflow-hidden">
        <div className="doctor-figure z-[100000] will-change-transform w-full">
          <img
            src={item.image}
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="doctor-copy-group flex flex-col items-center will-change-transform w-full">
          <img
            src={images.happySticker}
            alt=""
            className="doctor-sticker mb-[-3rem] w-[100px] z-[10000] will-change-transform"
          />
          <div className="doctor-copy w-full max-w-[340px] ">
            <img
              src={item.desc}
              alt=""
              className="w-full h-auto"
              style={{
                rotate: item?.rotate + "deg",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function About() {
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const specialistsWrapRef = useRef<HTMLDivElement | null>(null);
  const specialistsPinRef = useRef<HTMLDivElement | null>(null);
  const isMobileRef = useRef(false);

  useLayoutEffect(() => {
    const section = cardsRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".info-card", section);

      if (!cards.length) return;

      gsap.set(cards, {
        y: 120,
        opacity: 0,
        scale: 0.85,
      });

      const tl = gsap.timeline({ paused: true });

      tl.to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        ease: "bounce.out",
        duration: 1.2,
        stagger: 0.15,
        clearProps: "transform,opacity",
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
        onLeaveBack: () => {
          gsap.set(cards, {
            y: 120,
            opacity: 0,
            scale: 0.85,
          });
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      window.addEventListener("load", ScrollTrigger.refresh);
    }, section);

    return () => {
      window.removeEventListener("load", ScrollTrigger.refresh);
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const wrap = specialistsWrapRef.current;
    const pin = specialistsPinRef.current;

    if (!wrap || !pin) return;

    const isMobile = window.innerWidth < 768;

    // No animation on mobile
    if (isMobile) {
      const panels = gsap.utils.toArray<HTMLElement>(".doctor-panel", pin);

      gsap.set(panels, {
        clearProps: "all",
        autoAlpha: 1,
        position: "relative",
      });

      panels.forEach((panel) => {
        const figures = panel.querySelectorAll(".doctor-figure");
        const copyGroups = panel.querySelectorAll(".doctor-copy-group");
        const stickers = panel.querySelectorAll(".doctor-sticker");

        gsap.set([figures, copyGroups, stickers], {
          clearProps: "all",
          autoAlpha: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
        });
      });

      ScrollTrigger.refresh();
      return;
    }

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".doctor-panel", pin);

      if (!panels.length) return;

      gsap.set(panels, { autoAlpha: 0 });

      panels.forEach((panel, index) => {
        const figure = panel.querySelector(".doctor-figure");
        const copyGroup = panel.querySelector(".doctor-copy-group");
        const sticker = panel.querySelector(".doctor-sticker");
        const isImageLeft = panel.dataset.layout === "image-left";

        gsap.set(panel, {
          zIndex: panels.length - index,
        });

        gsap.set(figure, {
          x: isImageLeft ? -180 : 180,
          y: 100,
          scale: 0.82,
          rotation: isImageLeft ? -8 : 8,
          autoAlpha: 0,
          transformOrigin: "center center",
          force3D: true,
        });

        gsap.set(copyGroup, {
          x: isImageLeft ? 180 : -180,
          y: 120,
          scale: 0.88,
          rotation: isImageLeft ? 8 : -8,
          autoAlpha: 0,
          transformOrigin: "center center",
          force3D: true,
        });

        gsap.set(sticker, {
          y: -90,
          scale: 0.45,
          rotation: -14,
          autoAlpha: 0,
          transformOrigin: "center center",
          force3D: true,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${window.innerHeight * panels.length * 1.15}`,
          scrub: 1,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, index) => {
        const figure = panel.querySelector(".doctor-figure");
        const copyGroup = panel.querySelector(".doctor-copy-group");
        const sticker = panel.querySelector(".doctor-sticker");
        const isLast = index === panels.length - 1;
        const step = index * 1.25;

        tl.set(panel, { autoAlpha: 1 }, step)
          .to(
            figure,
            {
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: "bounce.out",
            },
            step,
          )
          .to(
            copyGroup,
            {
              x: 0,
              y: 0,
              scale: 1,
              rotation: 0,
              autoAlpha: 1,
              duration: 0.55,
              ease: "bounce.out",
            },
            step + 0.08,
          )
          .to(
            sticker,
            {
              y: 0,
              scale: 1,
              rotation: 0,
              autoAlpha: 1,
              duration: 0.35,
              ease: "back.out(3)",
            },
            step + 0.18,
          );

        if (!isLast) {
          tl.to(
            panel,
            {
              autoAlpha: 0,
              duration: 0.2,
              ease: "none",
            },
            step + 0.95,
          );
        }
      });

      ScrollTrigger.refresh();
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
   <>
  <Seo
  title="About Lili Veterinary Hospital | Trusted Pet Care in Lagos"
  description="Learn about Lili Veterinary Hospital, our veterinary team, our approach to compassionate pet care, and our commitment to supporting healthier lives for dogs and cats in Lagos."
  path={ROUTE.aboutUs}
/>
    <main className="w-full">
      {/* Hero */}
      <section className="flex justify-center items-center flex-col bg-[#f2f7ee] px-4 py-8 md:py-0">
        <h2 className="text-[36px] md:text-[64px] font-medium text-[#006838] font-founders text-center">
          Meet the Hearts of
        </h2>
        <img
          src={images?.LiliVetsText}
          alt=""
          className="w-[240px] md:w-[400px] mb-[-3rem] md:mb-[-5rem]"
        />
        <img src={images?.team} alt="" className="w-full  h-auto" />
      </section>

      {/* Approach */}
      <section className="w-full bg-[#F5F3EE]">
        <div className="max-w-[999px] mx-auto flex justify-center items-center flex-col py-10 gap-6 md:gap-10 px-4 md:px-6">
          <h2 className="text-[10px] manrope">OUR APPROACH</h2>
          <img
            src={images.ccce}
            alt=""
            className="w-full max-w-[600px] h-auto"
          />
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10">
            <p className="font-light text-base md:text-lg manrope text-[#414844]">
              We believe medical excellence is only half the cure. The other
              half is communication. We bridge the gap between technical
              diagnoses and your daily life with your pet, ensuring you feel
              empowered in every decision.
            </p>
            <p className="font-light text-base md:text-lg manrope text-[#414844]">
              Whether it&apos;s a routine wellness visit or a midnight urgent
              care crisis, our team is unified by a singular focus: unhurried,
              heartfelt support backed by high-precision veterinary science.
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="bg-[#214A1E] w-full">
        <div
          ref={cardsRef}
          className="max-w-[1300px] mx-auto min-h-[auto] md:min-h-[629px] grid grid-cols-1 md:flex gap-4 md:gap-10 justify-center py-8 md:py-10 items-center px-4 md:px-6"
        >
          <InertiaHover strength={2} rotation={0} resistance={100}>
            <div className="info-card">
              <InfoTiltCard
                icon={images.protect}
                title="Steady Hands"
                description="Calm, decisive expertise when seconds matter most during urgent care."
                rotation={-2.98}
              />
            </div>
          </InertiaHover>

          <InertiaHover strength={2} rotation={0} resistance={100}>
            <div className="info-card">
              <InfoTiltCard
                icon={images.health}
                title="Whole Health"
                description="Focusing on nutrition, environment, and long-term vitality."
                rotation={3.22}
              />
            </div>
          </InertiaHover>

          <InertiaHover strength={2} rotation={0} resistance={100}>
            <div className="info-card">
              <InfoTiltCard
                icon={images.love}
                title="Gentle Touch"
                description="Every touch is intentional, designed to minimize stress and maximize comfort."
                rotation={-1.86}
              />
            </div>
          </InertiaHover>

          <InertiaHover strength={2} rotation={0} resistance={100}>
            <div className="info-card">
              <InfoTiltCard
                icon={images.group}
                title="Shared Wisdom"
                description="Collaborative decision making that respects your unique bond with your pet."
                rotation={5.67}
              />
            </div>
          </InertiaHover>
        </div>
      </section>

      {/* Specialists */}
      <section className="bg-[#FBF9F4]">
        <div className="pt-10 md:pt-30">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between max-w-[1300px] mx-auto gap-4 md:gap-0 px-4 md:px-6">
            <div>
              <h2 className="text-[10px] font-bold manrope uppercase text-[#95442D]">
                THE SPECIALISTS
              </h2>
              <p className="text-[36px] md:text-[64px] font-medium text-[#416352] leading-[40px] md:leading-[58px] tracking-[-1.2px] font-founders">
                Our Dedicated Experts
              </p>
            </div>

            <div className="max-w-full md:max-w-[384px]">
              <p className="text-base font-light manrope text-[#414844]">
                The specialized team you can count on for every stage of your
                pet&apos;s life journey.
              </p>
            </div>
          </div>

          <div ref={specialistsWrapRef} className="relative">
            <div
              ref={specialistsPinRef}
              className="relative md:h-screen md:overflow-hidden"
            >
              {specialists.map((item) => (
                <SpecialistPanel key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main></>
  );
}
