import React from "react";

type ProTipCardProps = {
  quote?: string;
  author?: string;
  role?: string;
  imageSrc: string;
  className?: string;
};

export default function ProTipCard({
  quote = "The best emergency is the one we prevent through early screening.",
  author = "Dr. Okafor",
  role = "Founder",
  imageSrc,
  className = "",
}: ProTipCardProps) {
  return (
    <section
      className={`relative w-full  rounded-[24px] bg-[#1B4332] ${className}`}
    >
      <div className="relative flex lg:flex-row flex-col min-h-[220px] overflow-hidden w-full items-stretch justify-between py-7 md:min-h-[252px]  md:py-8">
        <div className="relative z-10 flex max-w-[62%]   md:px-6 px-3 sm:px-8 flex-col md:max-w-[66%]">
          <p className="manrope text-[18px] text-[#C1ECD4] font-normal leading-[28px] tracking-[0]">
            “{quote}”
          </p>

          <p className="manrope text-[14px] font-bold leading-[20px] tracking-[0] text-[#86AF99]">
            — {author}, {role}
          </p>
        </div>

        <div className="pointer-events-none absolute right-[-3rem] bottom-[-1.5rem]  z-0 h-full w-[46%] sm:w-[42%] md:w-[40%] lg:w-[36%] lg:opacity-100 opacity-[0.2]">
          <img
            src={imageSrc}
            alt={author}
            className="absolute right-0 bottom-0 h-[108%] w-auto max-w-none object-contain object-bottom"
          />
        </div>
      </div>

      <div className="absolute top-[-1rem] lg:right-[-2em] right-0 z-20 ">
        <div className="rounded-full bg-[#AD321C] px-5 py-4 text-[14px] font-bold leading-none text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] sm:text-[15px] rotate-[1.2deg]">
          Pro Tip!
        </div>
      </div>
    </section>
  );
}
