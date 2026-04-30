import { ReactNode } from "react";

export function ProactiveCare({
  children,
  title,
  desc,
}: {
  children: ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <section className="w-full bg-[#214A1E]">
      <div className="flex flex-col items-center justify-center bg-[#214A1E] px-6  py-32 md:px-16 lg:py-16">
        <h1 className="heading text-5xl text-center text-white lg:max-w-[670px] lg:text-[72px]">
          {title}
        </h1>

        <p className="my-3 text-center text-[18px] font-normal leading-[29.25px] tracking-[0] text-[#DADADA] lg:max-w-[670px] manrope">
          {desc}
        </p>
        {children}
      </div>
    </section>
  );
}
