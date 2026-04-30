import { useLayoutEffect, useRef, type ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import images from "../../../app/assests/images";
import InertiaHover from "../../../app/reuseable-components/inertia-hover";
import MindMarketThreadSection from "../mind-market-section/MindMarketSection";
import videos from "../../../app/assests/videos";
import DogCatVideo from "../../../app/reuseable-components/dog-cat-video";

gsap.registerPlugin(ScrollTrigger);

function FastAccessToCare() {
  return (
    <div className="flex w-full flex-col-reverse items-center justify-center lg:flex-row">
      <img
        data-story-main
        alt=""
        className="z-[1000] mt-[-6rem] w-[400px] lg:mt-0 lg:mr-[-10rem] lg:w-[662.16px]"
        src={images.docandCuteCat}
      />

      <div
        data-story-card
        className="flex flex-col items-center justify-center will-change-transform"
      >
        <InertiaHover
          strength={6}
          rotation={3}
          resistance={100}
          className="z-[10000]"
        >
          <img
            data-story-sticker
            src={images.happySticker}
            alt=""
            className="w-[150px] lg:mb-[-8rem] lg:w-[200px]"
          />
        </InertiaHover>

        <div>
          <InertiaHover strength={6} rotation={0} resistance={800}>
            <img
              src={images.fastAccess}
              alt=""
              className="lg:rotate-0 rotate-[-3deg]"
            />
          </InertiaHover>
        </div>
      </div>
    </div>
  );
}

function CompassionateandCare() {
  return (
    <div className="flex w-full flex-col overflow-hidden md:flex-row md:justify-end">
      <div
        data-story-card
        className="relative flex flex-col items-center justify-start will-change-transform"
      >
        <InertiaHover
          strength={6}
          rotation={3}
          resistance={100}
          className="z-[10000] lg:mb-[-9rem] lg:mr-[-36rem]"
        >
          <img
            data-story-sticker
            src={images.happySticker}
            alt=""
            className="w-[150px] lg:w-[200px]"
          />
        </InertiaHover>

        <div>
          <InertiaHover
            strength={6}
            rotation={0}
            resistance={800}
            className="rotate-[11deg] md:w-[400px] lg:mr-[-22rem] lg:w-[626px] "
          >
            <img src={images.highQualitytext} alt="" />
          </InertiaHover>
        </div>
      </div>

      <img
        data-story-main
        alt=""
        className="z-[1000] mt-[-12rem] w-full md:w-[800px] lg:mt-0 lg:w-[1110px]"
        src={images.twoDoconedog}
      />
    </div>
  );
}

function DiagnosticClarity() {
  return (
    <div className="flex w-full flex-col-reverse items-center justify-center lg:flex-row lg:justify-start">
      <img
        data-story-main
        alt=""
        className="z-[1000] lg:rotate-0 rotate-[-3deg] mt-[-7rem] w-full md:w-[800px] lg:mt-0 lg:w-[1210px]"
        src={images.doccatwoman}
      />

      <div
        data-story-card
        className="flex flex-col items-center justify-center will-change-transform lg:ml-[-13rem]"
      >
        <InertiaHover
          strength={6}
          rotation={3}
          resistance={100}
          className="z-[10000] lg:mb-[-8rem]"
        >
          <img
            data-story-sticker
            src={images.happySticker}
            alt=""
            className="w-[150px] lg:w-[200px]"
          />
        </InertiaHover>

        <div>
          <InertiaHover
            strength={6}
            rotation={0}
            resistance={800}
            className=" md:w-[220px] lg:w-[626px] lg:rotate-0"
          >
            <img src={images.diagnosticClarity} alt="" />
          </InertiaHover>
        </div>
      </div>
    </div>
  );
}

function CatAndButterflyWithText() {
  return (
    <div className="flex w-full flex-col items-center justify-center lg:flex-row lg:justify-end">
      <div
        data-story-card
        className="flex flex-col items-center justify-center will-change-transform lg:mr-[-23rem]"
      >
        <InertiaHover
          strength={6}
          rotation={3}
          resistance={100}
          className="z-[10000]"
        >
          <img
            data-story-sticker
            src={images.happySticker}
            alt=""
            className="w-[150px] lg:mb-[-8rem] lg:w-[200px]"
          />
        </InertiaHover>

        <div>
          <InertiaHover
            strength={6}
            rotation={0}
            resistance={800}
            className="z-[10000] w-[400px] rotate-[-1deg] lg:w-[626px] lg:rotate-0"
          >
            <img src={images.longtermtext} alt="" />
          </InertiaHover>
        </div>
      </div>

      <img data-story-main alt="" src={images.catandButterfly} />
    </div>
  );
}

export function CatAndButterflyAlone() {
  return (
    <div className="my-9 flex w-full flex-col items-center justify-center">
      <h2 className="mx-auto max-w-[562px] text-center font-founders text-lg font-medium leading-[108%] tracking-[-3%] text-[#90B96D] lg:text-[32px]">
        We provides trusted veterinary{" "}
        <span className="text-[#006838]">
          expertise, compassionate service, and long-term health support
        </span>{" "}
        for your pet
      </h2>

      <div>
        <img src={images.catandButterfly} className="w-[930px]" alt="" />
      </div>
    </div>
  );
}

type StorySlide = {
  id: string;
  Component: ComponentType;
  reverse?: boolean;
};

const storySlides: StorySlide[] = [
  { id: "fast-access", Component: FastAccessToCare, reverse: false },
  { id: "compassionate-care", Component: CompassionateandCare, reverse: true },
  { id: "diagnostic-clarity", Component: DiagnosticClarity, reverse: false },
  {
    id: "long-term-support",
    Component: CatAndButterflyWithText,
    reverse: true,
  },
];

function MobileStorySlides() {
  return (
    <section className="bg-[#f1ffeb] px-4 py-10 lg:hidden">
      <div className="mx-auto flex max-w-[1512px] flex-col gap-14">
        {storySlides.map((slide) => {
          const SlideComponent = slide.Component;
          return (
            <div key={slide.id} className="flex items-center justify-center">
              <SlideComponent />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DesktopStorySlides() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;

    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;

        gsap.set(slide, {
          autoAlpha: index === 0 ? 1 : 0,
          zIndex: storySlides.length - index,
        });

        const main = slide.querySelector<HTMLElement>("[data-story-main]");
        const card = slide.querySelector<HTMLElement>("[data-story-card]");
        const sticker = slide.querySelector<HTMLElement>(
          "[data-story-sticker]",
        );

        if (main) {
          gsap.set(main, {
            autoAlpha: index === 0 ? 1 : 0,
            x: 0,
            y: 0,
            scale: 1,
            force3D: true,
          });
        }

        if (card) {
          gsap.set(card, {
            autoAlpha: index === 0 ? 1 : 0,
            x: 0,
            y: 0,
            scale: 1,
            force3D: true,
          });
        }

        if (sticker) {
          gsap.set(sticker, {
            autoAlpha: index === 0 ? 1 : 0,
            y: 0,
            scale: 1,
            rotation: 0,
            force3D: true,
          });
        }
      });

      const travelX = 70;
      const travelY = 10;
      const stickerY = 12;
      const holdDuration = 0.08;

      const tl = gsap.timeline({
        defaults: {
          ease: "power2.out",
        },
        scrollTrigger: {
          trigger: section,
          pin: pin,
          start: "top top",
          end: () => `+=${window.innerHeight * storySlides.length * 0.72}`,
          scrub: 0.35,
          pinSpacing: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      storySlides.forEach((slideDef, index) => {
        const slideEl = slideRefs.current[index];
        if (!slideEl) return;

        const main = slideEl.querySelector<HTMLElement>("[data-story-main]");
        const card = slideEl.querySelector<HTMLElement>("[data-story-card]");
        const sticker = slideEl.querySelector<HTMLElement>(
          "[data-story-sticker]",
        );

        if (!main || !card) return;

        const mainFromX = slideDef.reverse ? travelX : -travelX;
        const cardFromX = slideDef.reverse ? -travelX : travelX;

        tl.set(slideEl, { autoAlpha: 1 });

        if (index !== 0) {
          tl.fromTo(
            main,
            {
              x: mainFromX,
              y: travelY,
              scale: 0.985,
              autoAlpha: 0,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.42,
            },
          );

          tl.fromTo(
            card,
            {
              x: cardFromX,
              y: travelY,
              scale: 0.985,
              autoAlpha: 0,
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.42,
            },
            "<0.02",
          );

          if (sticker) {
            tl.fromTo(
              sticker,
              {
                y: stickerY,
                scale: 0.96,
                rotation: slideDef.reverse ? -3 : 3,
                autoAlpha: 0,
              },
              {
                y: 0,
                scale: 1,
                rotation: 0,
                autoAlpha: 1,
                duration: 0.28,
              },
              "<0.04",
            );
          }
        }

        tl.to({}, { duration: holdDuration });

        if (index < storySlides.length - 1) {
          tl.to(main, {
            x: -mainFromX * 0.16,
            y: -travelY,
            scale: 0.99,
            autoAlpha: 0,
            duration: 0.26,
            ease: "power2.inOut",
          });

          tl.to(
            card,
            {
              x: -cardFromX * 0.16,
              y: -travelY,
              scale: 0.99,
              autoAlpha: 0,
              duration: 0.26,
              ease: "power2.inOut",
            },
            "<",
          );

          if (sticker) {
            tl.to(
              sticker,
              {
                y: -stickerY,
                scale: 0.98,
                autoAlpha: 0,
                duration: 0.2,
                ease: "power2.inOut",
              },
              "<",
            );
          }

          tl.set(slideEl, { autoAlpha: 0 });
        }
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-0 hidden w-full bg-[#f1ffeb] lg:block"
    >
      <div
        ref={pinRef}
        className="relative isolate h-screen w-full overflow-hidden bg-[#f1ffeb]"
      >
        <div className="mx-auto flex h-full w-full max-w-[1512px] items-center justify-center">
          <div className="relative h-full w-full py-5">
            {storySlides.map((slide, index) => {
              const SlideComponent = slide.Component;

              return (
                <div
                  key={slide.id}
                  ref={(el) => {
                    slideRefs.current[index] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-full">
                    <SlideComponent />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CareFeatureSections() {
  return (
    <>
      <DesktopStorySlides />
      <MobileStorySlides />
      <DogCatVideo />
    </>
  );
}
