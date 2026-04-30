import type { CSSProperties, ReactNode } from "react";
import svgPaths from "../../../app/components/svgpath";
import images from "../../../app/assests/images";
import InertiaHover from "../../../app/reuseable-components/inertia-hover";
import { Link } from "react-router-dom";
type IconName = "wellness" | "diagnostics" | "dental" | "surgery";

function ServiceIcon({
  name,
  className = "",
  opacity,
}: {
  name: IconName;
  className?: string;
  opacity?: number;
}) {
  if (name === "wellness") {
    return (
      <div className={`relative size-7 shrink-0 sm:size-[30px] ${className}`}>
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 30 30"
        >
          <g id="Container">
            <path
              d={svgPaths.pa9cae80}
              fill="var(--fill-0, #012D1D)"
              id="Icon"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (name === "diagnostics") {
    return (
      <div
        className={`relative h-[22px] w-[16px] shrink-0 sm:h-[23.75px] sm:w-[17.5px] ${className}`}
      >
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 17.5 23.75"
        >
          <g id="Container">
            <path
              d={svgPaths.p4f7b600}
              fill="var(--fill-0, #012D1D)"
              id="Icon"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (name === "dental") {
    return (
      <div
        className={`relative h-[21px] w-[21px] shrink-0 sm:h-[22.531px] sm:w-[22.5px] ${className}`}
      >
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 22.5 22.5312"
        >
          <g id="Container">
            <path
              d={svgPaths.p24248198}
              fill="var(--fill-0, #AD321C)"
              id="Icon"
            />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative size-4 shrink-0 sm:size-5 ${className}`}>
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="Container" opacity={opacity ?? 0.1}>
          <path
            d={svgPaths.p2cccbbb0}
            fill="var(--fill-0, #012D1D)"
            id="Icon"
          />
        </g>
      </svg>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="flex w-full flex-col items-center gap-2 sm:gap-[6.705px]">
      <div className="flex w-full flex-col items-center">
        <p className="text-[36px] handwritten text-[#AD321C] rotate-[-3deg]">
          The Lili Menu
        </p>

        <div className="max-w-[720px] text-center font-founders font-medium text-[30px] leading-tight text-[#012d1d] sm:text-[40px] md:text-[48px]">
          <p>Everything your pets need to thrive</p>
        </div>
      </div>
    </div>
  );
}

function UrgentCareCard() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#ad321c] shadow-[0px_20px_40px_-10px_rgba(21,30,21,0.08)] sm:rounded-[36px] xl:col-[1/span_2] xl:row-1 xl:min-h-[400px]">
      <div className="absolute inset-0 mix-blend-multiply opacity-40">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            alt=""
            className="absolute left-0 top-0 h-full w-full object-cover"
            src={images.computerBg}
          />
        </div>
      </div>

      <div className="relative flex min-h-[300px] flex-col justify-end px-5 pb-6 pt-24 sm:min-h-[360px] sm:px-7 sm:pb-8 sm:pt-32 lg:px-10 lg:pb-10 lg:pt-40">
        <div className="mb-4 inline-flex w-fit rounded-full bg-[rgba(255,255,255,0.2)] px-3 py-1">
          <div className="font-['Manrope:Bold',sans-serif] text-[11px] font-bold uppercase tracking-[1.2px] text-white sm:text-[12px]">
            <p className="leading-[16px]">High Alert</p>
          </div>
        </div>

        <div className="mb-3 flex w-full flex-col">
          <div className="font-['Space_Grotesk:Bold',sans-serif] text-[28px] font-bold leading-none text-white sm:text-[34px] lg:text-[36px]">
            <p className="leading-[1.1] sm:leading-[40px]">Urgent Care</p>
          </div>
        </div>

        <div className="max-w-[448px]">
          <div className="font-['Manrope:Medium',sans-serif] text-[14px] font-medium text-[rgba(255,255,255,0.82)] sm:text-[15px] lg:text-[16px]">
            <p className="leading-[22px] sm:leading-[24px]">
              Critical care when every second counts. No appointment
            </p>
            <p className="leading-[22px] sm:leading-[24px]">
              needed for true emergencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatingIconCard({
  title,
  descriptionLines,
  icon,
}: {
  title: string;
  descriptionLines: string;
  icon: IconName;
}) {
  return (
    <div className="relative w-full rounded-[28px] bg-white px-5 text-center shadow-[0px_20px_40px_-10px_rgba(21,30,21,0.08)] sm:rounded-[36px] sm:px-7 lg:min-h-[400px] lg:rounded-[48px] lg:px-8  lg:py-0 py-3 justify-center flex flex-col items-center">
      <div className="  flex justify-center rounded-full bg-[#e7f1e2] sm:size-[72px] lg:size-[80px] items-center">
        <ServiceIcon name={icon} />
      </div>

      <div className="mx-auto mb-4 max-w-[220px] font-['Space_Grotesk:Bold',sans-serif] text-[22px] font-bold text-[#012d1d] sm:text-[24px]">
        <p className="leading-[1.2]">{title}</p>
      </div>

      <div className="mx-auto max-w-[330px] font-['Manrope:Medium',sans-serif] text-[14px] font-medium text-[#414844] sm:text-[15px]">
        <p className="leading-[20px] sm:leading-[22px]">{descriptionLines}</p>
      </div>
    </div>
  );
}

function TextAccentCard({
  title,
  descriptionLines,
  bgClass,
  textClass,
  bodyClass,
  accent,
}: {
  title: string;
  descriptionLines: string[];
  bgClass: string;
  textClass: string;
  bodyClass: string;
  accent?: ReactNode;
}) {
  return (
    <div
      className={`flex h-full min-h-[220px] w-full flex-col justify-between rounded-[28px] p-5 shadow-[0px_20px_40px_-10px_rgba(21,30,21,0.08)] sm:rounded-[36px] sm:p-7 lg:min-h-[224px] lg:rounded-[48px] lg:p-8 ${bgClass}`}
    >
      <div>
        <div
          className={`font-['Space_Grotesk:Bold',sans-serif] text-[22px] font-bold ${textClass} sm:text-[24px]`}
        >
          <p className="leading-[1.2] sm:leading-[32px]">{title}</p>
        </div>

        <div
          className={`mt-3 flex flex-col gap-0.5 py-2 font-['Manrope:Regular',sans-serif] text-[14px] font-normal ${bodyClass}`}
        >
          {descriptionLines.map((line) => (
            <p key={line} className="leading-[20px]">
              {line}
            </p>
          ))}
        </div>
      </div>

      {accent}
    </div>
  );
}

function CompactIconCard({
  title,
  icon,
  bgClass,
}: {
  title: string;
  icon: IconName;
  bgClass: string;
}) {
  return (
    <div
      className={`relative w-full rounded-[24px] p-5 shadow-[0px_20px_40px_-10px_rgba(21,30,21,0.08)] sm:rounded-[30px] sm:p-6 lg:min-h-[100px] lg:rounded-[48px] lg:p-8 ${bgClass}`}
    >
      <div className="flex items-center gap-4">
        <ServiceIcon name={icon} />
        <div className="font-['Space_Grotesk:Bold',sans-serif] text-[18px] font-bold text-[#012d1d] sm:text-[20px]">
          <p className="leading-[1.2] sm:leading-[28px]">{title}</p>
        </div>
      </div>
    </div>
  );
}

function SurgeryCard() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-white shadow-[0px_20px_40px_-10px_rgba(21,30,21,0.08)] sm:rounded-[36px] xl:col-3 xl:row-2 xl:self-start">
      <div className="relative flex h-full min-h-[220px] flex-col justify-center px-5 py-8 sm:px-7 sm:py-10 lg:min-h-[224px] lg:px-8 lg:py-[66px]">
        <div className="w-full pb-3 sm:pb-[8px]">
          <div className="font-['Space_Grotesk:Bold',sans-serif] text-[24px] font-bold text-[#012d1d] sm:text-[28px] lg:text-[30px]">
            <p className="leading-[1.15] sm:leading-[36px]">Surgery</p>
          </div>
        </div>

        <div className="max-w-[320px] font-['Manrope:Medium',sans-serif] text-[14px] font-medium text-[#414844] sm:text-[15px] lg:text-[16px]">
          <p className="leading-[22px] sm:leading-[24px]">
            Advanced surgical suites and expert
          </p>
          <p className="leading-[22px] sm:leading-[24px]">orthopedic care.</p>
        </div>

        <div
          className="absolute bottom-[-34px] right-[-34px] flex size-[70px] items-center justify-center sm:bottom-[-55px] sm:right-[-55px] sm:size-[90px] lg:bottom-[-80px] lg:right-[-80px] lg:size-[100px]"
          style={
            {
              "--transform-inner-width": "1185",
              "--transform-inner-height": "22",
            } as CSSProperties
          }
        >
          <div className="scale-[2.8] sm:scale-[3.8] lg:scale-[5]">
            <ServiceIcon name="surgery" opacity={0.1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PetServicesMatterSection() {
  return (
    <section className="relative flex w-full shrink-0 flex-col items-center bg-[#edf7e7] px-4 pb-16 pt-14 sm:px-5 sm:pb-20 sm:pt-16 lg:px-0 lg:pb-24 lg:pt-[88.711px]">
      <div className="relative w-full max-w-[1280px]">
        <div className="flex w-full flex-col gap-10 sm:gap-12 lg:gap-16 lg:px-6">
          <SectionHeader />

          <div className="grid w-full grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-[400px_224px]">
            <div className="xl:col-span-2">
              <InertiaHover
                strength={6}
                rotation={0}
                resistance={100}
                className="w-full"
              >
                <Link to={"/urgent-care"} className="block">
                  <UrgentCareCard />
                </Link>
              </InertiaHover>
            </div>

            <div
              className="w-full xl:col-3 xl:row-1 xl:flex xl:h-[413.53px] xl:w-full xl:items-center xl:justify-center"
              style={
                {
                  "--transform-inner-width": "1185",
                  "--transform-inner-height": "86",
                } as CSSProperties
              }
            >
              <InertiaHover strength={6} rotation={0} resistance={100}>
                <Link to={"/services/wellness-plans"} className="block">
                  <div className="w-full xl:rotate-2">
                    <FloatingIconCard
                      title="Wellness Exams"
                      icon="wellness"
                      descriptionLines={
                        "Routine checkups to ensure your companion stays ,in peak condition year-round."
                      }
                    />
                  </div>
                </Link>
              </InertiaHover>
            </div>

            <div
              className="w-full md:col-span-1 xl:col-1 xl:row-2 xl:flex xl:h-[224.378px] xl:w-full xl:items-center xl:justify-center xl:self-start"
              style={
                {
                  "--transform-inner-width": "1185",
                  "--transform-inner-height": "86",
                } as CSSProperties
              }
            >
              <div className="w-full xl:-rotate-3">
                <InertiaHover
                  strength={6}
                  rotation={0}
                  resistance={100}
                  className="w-full"
                >
                  <Link to={"/services/vaccination"} className="block">
                    <TextAccentCard
                      title="Vaccinations"
                      descriptionLines={[
                        "State-mandated and optional lifestyle vaccines",
                        "tailored to your pet's unique environment.",
                      ]}
                      bgClass="bg-[#214a1e]"
                      textClass="text-white"
                      bodyClass="text-[rgba(255,255,255,0.7)]"
                      accent={
                        <div className="mt-4 flex w-full justify-end">
                          <div className="font-['Caveat:Regular',sans-serif] handwritten text-[26px] font-normal text-[#ff6d51] sm:text-[30px]">
                            <p className="leading-[32px] sm:leading-[36px]">
                              Essential
                            </p>
                          </div>
                        </div>
                      }
                    />
                  </Link>
                </InertiaHover>
              </div>
            </div>

            <div className="grid w-full grid-cols-1 gap-5 sm:gap-6 xl:col-2 xl:row-2 xl:grid-cols-1 xl:grid-rows-[100px_100px]">
              <InertiaHover
                strength={6}
                rotation={0}
                resistance={100}
                className="w-full"
              >
                <Link to={"/services/diagnostic-care"} className="block">
                  <CompactIconCard
                    title="Diagnostics"
                    icon="diagnostics"
                    bgClass="bg-[#dbe5d6]"
                  />
                </Link>
              </InertiaHover>

              <div
                className="w-full xl:flex xl:h-[113.713px] xl:items-center xl:justify-center"
                style={
                  {
                    "--transform-inner-width": "1185",
                    "--transform-inner-height": "43",
                  } as CSSProperties
                }
              >
                <div className="w-full xl:rotate-2">
                  <InertiaHover
                    strength={6}
                    rotation={0}
                    resistance={100}
                    className="w-full"
                  >
                    <Link to={"/services/dental-care"} className="block">
                     <CompactIconCard
                      title="Dental Care"
                      icon="dental"
                      bgClass="bg-white"
                    /></Link>
                   
                  </InertiaHover>
                </div>
              </div>
            </div>

            <InertiaHover
              strength={6}
              rotation={0}
              resistance={100}
              className="w-full xl:col-3 xl:row-2 xl:flex xl:h-[224.378px] xl:w-full xl:items-center xl:justify-center xl:self-start"
            >
              <SurgeryCard />
            </InertiaHover>
          </div>
        </div>
      </div>
    </section>
  );
}
