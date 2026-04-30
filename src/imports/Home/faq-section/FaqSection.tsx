import images from "../../../app/assests/images";
import svgPaths from "../../../app/components/svgpath";

export type FAQItem = {
  question: string;
  answer: string[];
  accent?: string;
};

export const DEFAULT_FAQ_ITEMS: FAQItem[] = [
  {
    accent: "#012d1d",
    question: "What items are included in each plan?",
    answer: [
      "Each plan varies by life stage but typically includes two comprehensive exams per year, core vaccines,",
      "parasite testing, and essential bloodwork. Detailed brochures are available upon request.",
    ],
  },
  {
    accent: "#ad321c",
    question: "How does this differ from pet insurance?",
    answer: [
      "Wellness plans cover predictable, routine costs that insurance typically excludes. Think of it as your",
      "maintenance plan, while insurance is for unpredictable accidents or illnesses.",
    ],
  },
  {
    accent: "#012d1d",
    question: "Are urgent care visits covered under wellness plans?",
    answer: [
      "Urgent care visits are generally not included in base wellness plans, though some plans may offer discounted",
      "exam fees for members during emergency hours.",
    ],
  },
];

const DEFAULT_FAQ_ACCENT = "#012d1d";

function FaqTitleArtwork() {
  return (
    <div
      className="absolute left-1/2 top-3 h-auto w-[260px] -translate-x-1/2 sm:top-14 sm:w-[340px] lg:top-[86.37px] lg:w-[484.031px]"
      data-name="Frequently Asked Questions"
    >
      <svg
        className="block h-auto w-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 484.031 197.031"
      >
        <g id="Frequently Asked Questions">
          <path d={svgPaths.p1df62f00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3a64b500} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p3526e00} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p2ad80b00} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p33a08700} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.pbbbcc80} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p7b22a00} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p361681f0} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p1a0192f0} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.peac380} fill="var(--fill-0, white)" id="Vector_10" />
          <path d={svgPaths.p2f6b1a80} fill="var(--fill-0, white)" id="Vector_11" />
          <path d={svgPaths.p26536f80} fill="var(--fill-0, white)" id="Vector_12" />
          <path d={svgPaths.p28a47900} fill="var(--fill-0, white)" id="Vector_13" />
          <path d={svgPaths.p1e88fa00} fill="var(--fill-0, white)" id="Vector_14" />
          <path d={svgPaths.p1517d00} fill="var(--fill-0, white)" id="Vector_15" />
          <path d={svgPaths.p30316280} fill="var(--fill-0, white)" id="Vector_16" />
          <path d={svgPaths.pa9d1d00} fill="var(--fill-0, white)" id="Vector_17" />
          <path d={svgPaths.p27092b00} fill="var(--fill-0, white)" id="Vector_18" />
          <path d={svgPaths.p2b9dd500} fill="var(--fill-0, white)" id="Vector_19" />
          <path d={svgPaths.p9376700} fill="var(--fill-0, white)" id="Vector_20" />
          <path d={svgPaths.p3843c80} fill="var(--fill-0, white)" id="Vector_21" />
          <path d={svgPaths.pd7b300} fill="var(--fill-0, white)" id="Vector_22" />
          <path d={svgPaths.p18ad6900} fill="var(--fill-0, white)" id="Vector_23" />
          <path d={svgPaths.p287b1080} fill="var(--fill-0, white)" id="Vector_24" />
        </g>
      </svg>
    </div>
  );
}

function FaqItem({ item }: { item: FAQItem }) {
  const { question, answer, accent = DEFAULT_FAQ_ACCENT } = item;

  return (
    <div className="relative w-full rounded-[16px] bg-[rgba(255,255,255,0.81)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[16px] border-l-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
        style={{ borderLeftColor: accent }}
      />
      <div className="relative flex w-full flex-col items-start gap-2 px-5 py-5 sm:px-6 sm:py-6 lg:pl-[28px] lg:pr-[24px] lg:py-[24px]">
        <h3 className="w-full font-['Manrope:Bold',sans-serif] text-[16px] font-bold leading-[24px] text-[#012d1d] sm:text-[17px] lg:text-[18px] lg:leading-[28px]">
          {question}
        </h3>

        <div className="w-full font-['Manrope:Regular',sans-serif] text-[14px] font-normal leading-[22px] text-[#414844] sm:text-[15px] sm:leading-[23px] lg:text-[16px] lg:leading-[24px]">
          {answer.map((line, index) => (
            <p key={`${question}-${index}`}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function FaqCard({ items }: { items: FAQItem[] }) {
  return (
    <div className="relative w-full rounded-[16px] bg-[rgba(237,249,236,0.4)]">
      <div className="relative overflow-clip rounded-[inherit] border-2 border-[rgba(255,255,255,0.58)] p-4 sm:p-5 lg:p-[25px]">
        <div className="flex w-full flex-col items-start gap-4">
          {items.map((item, index) => (
            <FaqItem key={`${item.question}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

type FaqSectionProps = {
  items?: FAQItem[];
};

export default function FaqSection({
  items = DEFAULT_FAQ_ITEMS,
}: FaqSectionProps) {
  return (
    <section className="relative w-full overflow-clip">
      <div className="absolute inset-0 pointer-events-none">
        <img
          alt=""
          className="size-full object-cover"
          src={images.cutedogcat}
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)]" />
      </div>

      <div className="relative mx-auto flex min-h-[760px] w-full max-w-[1512px] flex-col px-4 pb-10 pt-32 sm:min-h-[820px] sm:px-6 sm:pb-14 sm:pt-40 lg:min-h-[937px] lg:px-10 lg:pb-20 lg:pt-[324px]">
        <FaqTitleArtwork />
        <div className="mx-auto w-full max-w-[948px]">
          <FaqCard items={items} />
        </div>
      </div>
    </section>
  );
}