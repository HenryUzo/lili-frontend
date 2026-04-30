import { useLayoutEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import Seo from "../components/seo/Seo";
import images from "../assests/images";

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const floatRef = useRef<HTMLDivElement | null>(null);

  const zeroRef = useRef<HTMLDivElement | null>(null);
  const zeroGlowRef = useRef<HTMLDivElement | null>(null);
  const sparkRef = useRef<HTMLDivElement | null>(null);
  const petRef = useRef<HTMLImageElement | null>(null);

  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (
      !rootRef.current ||
      !parallaxRef.current ||
      !floatRef.current ||
      !zeroRef.current ||
      !zeroGlowRef.current ||
      !sparkRef.current ||
      !petRef.current ||
      !eyebrowRef.current ||
      !titleRef.current ||
      !subtitleRef.current ||
      !ctaRef.current
    ) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            ".nf-digit",
            zeroRef.current,
            zeroGlowRef.current,
            sparkRef.current,
            petRef.current,
            eyebrowRef.current,
            titleRef.current,
            subtitleRef.current,
            ctaRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            scale: 1,
          }
        );

        return;
      }

      gsap.set([eyebrowRef.current, titleRef.current, subtitleRef.current, ctaRef.current], {
        opacity: 0,
        y: 22,
      });

      gsap.set(petRef.current, {
        opacity: 0,
        y: 28,
        scale: 0.94,
        rotate: -2,
      });

      gsap.set(sparkRef.current, {
        opacity: 0,
        scale: 0.35,
        rotate: -12,
      });

      gsap.set(zeroGlowRef.current, {
        opacity: 0.85,
        scale: 1,
      });

      gsap.set(zeroRef.current, {
        opacity: 1,
        scale: 1,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(".nf-digit", {
        y: 64,
        opacity: 0,
        scale: 0.82,
        stagger: 0.08,
        duration: 0.75,
      })
        .to(
          sparkRef.current,
          {
            opacity: 1,
            scale: 1,
            rotate: 8,
            duration: 0.12,
            ease: "power4.out",
          },
          "-=0.1"
        )
        .to(sparkRef.current, {
          opacity: 0,
          scale: 1.9,
          rotate: 22,
          duration: 0.28,
        })
        .to(
          zeroRef.current,
          {
            opacity: 0.2,
            duration: 0.08,
          },
          "<"
        )
        .to(zeroRef.current, {
          opacity: 1,
          duration: 0.08,
        })
        .to(zeroRef.current, {
          opacity: 0.16,
          duration: 0.08,
        })
        .to(
          zeroGlowRef.current,
          {
            opacity: 0.08,
            scale: 0.92,
            duration: 0.12,
          },
          "<"
        )
        .to(zeroRef.current, {
          opacity: 0.08,
          duration: 0.1,
        })
        .to(
          zeroGlowRef.current,
          {
            opacity: 0,
            duration: 0.1,
          },
          "<"
        )
        .to(
          petRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 0.75,
            ease: "back.out(1.5)",
          },
          "-=0.05"
        )
        .to(
          eyebrowRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
          },
          "-=0.25"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.3"
        );

      gsap.to(floatRef.current, {
        y: "-=8",
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(petRef.current, {
        rotate: 1.4,
        duration: 2.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!parallaxRef.current) return;
    if (window.innerWidth < 768) return;

    const bounds = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - bounds.left) / bounds.width - 0.5;
    const y = (e.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(parallaxRef.current, {
      x: x * 18,
      y: y * 14,
      duration: 0.55,
      ease: "power2.out",
    });
  };

  const handlePointerLeave = () => {
    if (!parallaxRef.current) return;

    gsap.to(parallaxRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  return (
    <>
      <Seo
        title="Page Not Found | Lili Veterinary Hospital"
        description="The page you are looking for does not exist. Return to Lili Veterinary Hospital homepage or book a veterinary appointment."
        path={location.pathname}
        noIndex
      />

      <section
        ref={rootRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        className="relative min-h-screen overflow-hidden bg-[#F2F7EE] px-5 py-8 md:px-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,104,56,0.15),transparent_38%)]" />
        <div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-[#D8F5C8]/70 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-12 h-80 w-80 rounded-full bg-[#9BE277]/30 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-[1280px] items-center justify-center">
          <div
            ref={parallaxRef}
            className="relative w-full rounded-[36px] border border-white/70 bg-white/35 px-5 py-10 shadow-[0_24px_80px_rgba(23,50,33,0.08)] backdrop-blur-md md:px-10 md:py-14"
          >
            <div
              ref={floatRef}
              className="relative mx-auto flex max-w-[980px] flex-col items-center text-center"
            >
              <p
                ref={eyebrowRef}
                className="mb-3 rounded-full border border-[#006838]/15 bg-white/70 px-4 py-2 font-['Manrope',sans-serif] text-[12px] font-bold uppercase tracking-[0.22em] text-[#006838]"
              >
                Error 404
              </p>

              <div className="relative flex items-end justify-center gap-2 md:gap-4">
                <div className="nf-digit font-['Test_Founders_Grotesk',sans-serif] text-[120px] font-medium leading-none text-[#173221] sm:text-[160px] md:text-[220px] lg:text-[250px]">
                  4
                </div>

                <div className="relative flex items-center justify-center">
                  <div
                    ref={zeroGlowRef}
                    className="absolute h-[108px] w-[108px] rounded-full bg-[#9BE277] blur-[30px] sm:h-[145px] sm:w-[145px] md:h-[195px] md:w-[195px] lg:h-[225px] lg:w-[225px]"
                  />

                  <div
                    ref={zeroRef}
                    className="nf-digit relative flex h-[108px] w-[108px] items-center justify-center rounded-full border-[14px] border-[#173221] bg-[#F2F7EE]/30 sm:h-[145px] sm:w-[145px] sm:border-[16px] md:h-[195px] md:w-[195px] md:border-[22px] lg:h-[225px] lg:w-[225px] lg:border-[26px]"
                  />

                  <div
                    ref={sparkRef}
                    className="pointer-events-none absolute right-0 top-7 h-12 w-12 md:right-2 md:top-12"
                    aria-hidden="true"
                  >
                    <span className="absolute left-1/2 top-1/2 h-1.5 w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#ED1C24]" />
                    <span className="absolute left-1/2 top-1/2 h-1.5 w-10 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#ED1C24]" />
                    <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F7C948]" />
                  </div>
                </div>

                <div className="nf-digit font-['Test_Founders_Grotesk',sans-serif] text-[120px] font-medium leading-none text-[#173221] sm:text-[160px] md:text-[220px] lg:text-[250px]">
                  4
                </div>
              </div>

              <div className="relative -mt-2 md:-mt-6">
                <div className="absolute left-1/2 top-[18%] h-24 w-24 -translate-x-1/2 rounded-full bg-[#006838]/10 blur-2xl" />

                <img
                  ref={petRef}
                  src={images.pet404}
                  alt="Pet helper unplugging a wire on the 404 page"
                  className="relative mx-auto w-[min(520px,86vw)] select-none object-contain drop-shadow-[0_22px_35px_rgba(23,50,33,0.16)]"
                  draggable={false}
                />
              </div>

              <h1
                ref={titleRef}
                className="mt-3 max-w-[820px] font-['Test_Founders_Grotesk',sans-serif] text-[42px] font-medium leading-[0.95] tracking-[-0.04em] text-[#173221] md:text-[64px]"
              >
                This page lost its leash.
              </h1>

              <p
                ref={subtitleRef}
                className="mt-5 max-w-[720px] font-['Manrope',sans-serif] text-[16px] font-medium leading-8 text-[#3F5446] md:text-[19px]"
              >
                The link may be broken, moved, or no longer available. Head back
                home, book a visit, or explore our veterinary services.
              </p>

              <div
                ref={ctaRef}
                className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <Link
                  to="/"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#006838] px-7 py-4 font-['Manrope',sans-serif] text-[15px] font-bold text-white shadow-[0_14px_34px_rgba(0,104,56,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#00582f] sm:w-auto"
                >
                  Go Home
                </Link>

                <Link
                  to="/appointment"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#006838]/20 bg-white px-7 py-4 font-['Manrope',sans-serif] text-[15px] font-bold text-[#006838] shadow-[0_10px_26px_rgba(23,50,33,0.06)] transition duration-300 hover:-translate-y-0.5 hover:border-[#006838]/40 sm:w-auto"
                >
                  Book Appointment
                </Link>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#173221]/10 bg-[#173221]/5 px-7 py-4 font-['Manrope',sans-serif] text-[15px] font-bold text-[#173221] transition duration-300 hover:-translate-y-0.5 hover:bg-[#173221]/10 sm:w-auto"
                >
                  Go Back
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 font-['Manrope',sans-serif] text-[13px] font-bold text-[#6E8174]">
                <Link to="/services" className="transition hover:text-[#006838]">
                  View Services
                </Link>
                <span className="h-1 w-1 rounded-full bg-[#A8B8AC]" />
                <Link
                  to="/wellness-plans"
                  className="transition hover:text-[#006838]"
                >
                  Wellness Plans
                </Link>
                <span className="h-1 w-1 rounded-full bg-[#A8B8AC]" />
                <Link to="/contact" className="transition hover:text-[#006838]">
                  Contact Clinic
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}