import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CircleHelp,
  ClipboardCheck,
  MapPin,
  PawPrint,
  ScanLine,
  ShieldCheck,
  Tag,
} from "lucide-react";

import images from "../assests/images";
import { ROUTE } from "../../router";
import Seo from "../components/seo/Seo";

const benefits = [
  {
    icon: ShieldCheck,
    title: "A lasting identification number",
    body: "A microchip carries a unique ID that can be read with a compatible scanner. It gives your pet another way to be identified if a collar or tag is lost.",
  },
  {
    icon: ClipboardCheck,
    title: "A registry connects the ID to you",
    body: "The chip does not store your address or phone number. Your current information needs to be registered with the chip’s registry so you can be contacted.",
  },
  {
    icon: Tag,
    title: "Part of a complete ID plan",
    body: "A microchip works alongside a collar and visible ID tag. A person who finds your pet can read a tag right away, while a clinic or shelter can scan for a chip.",
  },
];

const steps = [
  {
    number: "01",
    title: "Talk with the care team",
    body: "Tell us your pet’s age, health history, and whether they may already have a chip. We can discuss the service and answer questions before an appointment.",
    icon: CircleHelp,
  },
  {
    number: "02",
    title: "Microchip placement",
    body: "Lili Veterinary Hospital uses ISO-compliant microchips. When microchipping is appropriate, a veterinary professional places the small chip beneath the skin using a needle applicator. Ask our team what to expect for your pet’s visit.",
    icon: ScanLine,
  },
  {
    number: "03",
    title: "Register and keep it current",
    body: "After placement, follow the registration instructions for the chip. Confirm your name, phone, email, and address are correct, and update them whenever they change.",
    icon: ClipboardCheck,
  },
];

const faqs = [
  {
    question: "Is a microchip a GPS tracker?",
    answer:
      "No. A pet microchip is an identification device, not a GPS tracker. It does not show your pet’s location or transmit a live signal.",
  },
  {
    question: "What information is stored on the microchip?",
    answer:
      "The chip contains a unique identification number. Your contact information is kept with the associated registry, so registration and current details are essential.",
  },
  {
    question: "Does a microchip replace a collar and ID tag?",
    answer:
      "No. Keep a collar and visible ID tag on your pet when appropriate. Tags are easy to read without a scanner, and the microchip provides another identification option.",
  },
  {
    question: "My pet may already have a microchip. What should I do?",
    answer:
      "Let the clinic team know before the visit. Ask whether the existing chip can be scanned and how to identify the registry so you can check or update its contact record.",
  },
  {
    question: "What should I do if I move or change my phone number?",
    answer:
      "Update the contact information with the microchip registry. A chip can only help reunite you with your pet if the registry can reach you.",
  },
  {
    question: "How much does microchipping cost, and what is included?",
    answer:
      "Pricing and registration details can vary. Contact Lili Veterinary Hospital for current availability, cost, and what is included in the service.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  inverse?: boolean;
}) {
  return (
    <div className="mx-auto max-w-[760px] text-center">
      <p className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#55745D] sm:text-sm">
        {eyebrow}
      </p>
      <h2 className={`mt-3 font-founders text-[34px] font-medium leading-[1.08] tracking-[-0.035em] sm:text-4xl md:text-5xl ${inverse ? "text-white" : "text-[#416352]"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mx-auto mt-5 max-w-[680px] font-manrope text-base font-light leading-7 sm:text-lg sm:leading-8 ${inverse ? "text-white/80" : "text-[#414844]"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

export default function Microchipping() {
  return (
    <>
      <Seo
        title="Pet Microchipping in San Antonio | Lili Veterinary Hospital"
        description="Learn how pet microchips work, why registration matters, and what to expect when you ask Lili Veterinary Hospital in San Antonio about microchipping."
        path={ROUTE.microchipping}
      />

      <main className="w-full overflow-hidden bg-[#FBF9F4] text-[#173F35]">
        <section className="relative isolate bg-[#F2F7EE] px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:px-16 lg:py-24">
          <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-14">
            <div className="min-w-0">
              <p className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#D6E3D2] bg-white/80 px-4 py-2 font-manrope text-xs font-semibold text-[#416352] sm:text-sm">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                Lili Veterinary Hospital <span aria-hidden="true">·</span> San Antonio
              </p>
              <h1 className="max-w-[700px] font-founders text-[42px] font-medium leading-[1.02] tracking-[-0.04em] text-[#006838] sm:text-5xl md:text-6xl lg:text-[68px]">
                A little chip can help your pet find their way home.
              </h1>
              <p className="mt-6 max-w-[650px] font-manrope text-base font-light leading-7 text-[#414844] sm:text-lg sm:leading-8 md:text-xl">
                Lili Veterinary Hospital uses ISO-compliant microchips. A microchip gives your dog or cat a permanent identification number. If your pet is found, a compatible scanner can read that number; a current registry record helps connect it with your contact information.
              </p>
              <p className="mt-4 max-w-[620px] font-manrope text-sm leading-6 text-[#55745D] sm:text-base sm:leading-7">
                A chip is not GPS, and it works best when its registry details stay current and your pet also wears a visible ID tag.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to={ROUTE.bookAppointment}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#214A1E] px-6 py-3 text-center font-manrope text-sm font-bold text-white transition hover:bg-[#173F35] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#214A1E] focus-visible:ring-offset-2 sm:w-auto sm:text-base"
                >
                  Request an appointment <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#A9C6A9] bg-white px-6 py-3 text-center font-manrope text-sm font-bold text-[#214A1E] transition hover:bg-[#F4F8F1] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#214A1E] focus-visible:ring-offset-2 sm:w-auto sm:text-base"
                >
                  See how it works
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-2.5 font-manrope text-xs font-semibold text-[#416352] sm:gap-3 sm:text-sm">
                {["Dogs and cats", "Permanent ID", "Registry matters"].map((item) => (
                  <span key={item} className="rounded-full border border-[#D6E3D2] bg-white/75 px-3 py-2">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[620px]">
              <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-[#D5F7D3] sm:-right-5 sm:-top-5 sm:h-32 sm:w-32" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[28px] bg-[#E1EBDC] p-2 shadow-[0_22px_55px_rgba(23,63,53,0.13)] sm:rounded-[36px] sm:p-3">
                <img
                  src={images.petExam}
                  alt="A veterinarian gently examining a cat at the clinic"
                  className="block aspect-[4/3] w-full rounded-[22px] object-cover sm:rounded-[28px]"
                />
              </div>
              <div className="relative mx-3 -mt-7 rounded-[22px] border border-[#E1EBDC] bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.08)] sm:mx-8 sm:-mt-9 sm:p-6">
                <p className="font-queen text-3xl leading-none text-[#416352] sm:text-4xl">A simple step</p>
                <p className="mt-2 font-manrope text-sm leading-6 text-[#414844] sm:text-base">
                  Keep the chip number linked to contact details that are easy to reach.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading
              eyebrow="Why microchipping helps"
              title="A reliable ID is only useful when it leads back to you."
              description="The chip is one part of the reunion process. A scanner reads its number, and the registry record associated with that number helps a clinic or shelter contact the pet’s family."
            />
            <div className="mt-9 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {benefits.map(({ icon: Icon, title, body }, index) => (
                <article
                  key={title}
                  className="rounded-[24px] border border-[#E1EBDC] bg-white p-6 shadow-[0_12px_32px_rgba(23,63,53,0.05)] sm:rounded-[28px] sm:p-8"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF4E9] text-[#214A1E]">
                    <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <p className="mt-5 font-manrope text-xs font-bold uppercase tracking-[0.16em] text-[#8A6334]">
                    Benefit 0{index + 1}
                  </p>
                  <h3 className="mt-2 font-founders text-2xl font-medium leading-tight text-[#416352] sm:text-[26px]">
                    {title}
                  </h3>
                  <p className="mt-3 font-manrope text-sm font-light leading-7 text-[#414844] sm:text-base">
                    {body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="bg-[#214A1E] px-5 py-14 text-white sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-[1200px]">
            <SectionHeading
              eyebrow="What to expect"
              title="A straightforward identification process"
              inverse
              description="Your veterinary team can explain the process for your pet and answer questions about existing chips, registration, and the next steps."
            />
            <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 md:grid-cols-3 md:gap-6 lg:gap-12">
              {steps.map(({ number, title, body, icon: Icon }) => (
                <article key={number} className="relative rounded-[24px] border border-white/15 bg-white/[0.07] p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-queen text-4xl text-[#C6EBD5]">{number}</span>
                    <Icon className="h-7 w-7 text-[#C6EBD5]" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-founders text-2xl font-medium leading-tight text-white sm:text-[28px]">{title}</h3>
                  <p className="mt-3 font-manrope text-sm font-light leading-7 text-white/80 sm:text-base">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-14 sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div className="overflow-hidden rounded-[28px] bg-[#E1EBDC] shadow-[0_20px_45px_rgba(0,0,0,0.09)] sm:rounded-[36px]">
              <img
                src={images.calmDogWithVet}
                alt="A dog receiving calm attention from a veterinary professional"
                className="block aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="min-w-0">
              <p className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#55745D] sm:text-sm">Already chipped?</p>
              <h2 className="mt-3 font-founders text-[34px] font-medium leading-[1.08] tracking-[-0.03em] text-[#416352] sm:text-4xl md:text-5xl">
                Check the details that make the chip useful.
              </h2>
              <p className="mt-5 font-manrope text-base font-light leading-7 text-[#414844] sm:text-lg sm:leading-8">
                If you adopted your pet, moved recently, or are unsure which registry to use, ask your veterinary team for help with the next step.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Ask whether the chip can be scanned and the ID number confirmed.",
                  "Find out which registry holds the record and how to access it.",
                  "Check your phone, email, and address with the registry.",
                  "Update the registry whenever your contact information changes.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-manrope text-sm leading-6 text-[#414844] sm:text-base sm:leading-7">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF4E9] text-[#214A1E]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl border-l-4 border-[#8A6334] bg-white px-5 py-4 font-manrope text-sm leading-6 text-[#55745D]">
                Keep a collar and visible ID tag as well. A microchip is not a live location tracker.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#F2F7EE] px-5 py-14 sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-20">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 rounded-[28px] bg-white p-6 shadow-[0_18px_45px_rgba(23,63,53,0.07)] sm:rounded-[36px] sm:p-9 md:p-12 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div>
              <p className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#55745D] sm:text-sm">Questions welcome</p>
              <h2 className="mt-3 font-founders text-[34px] font-medium leading-[1.08] text-[#416352] sm:text-4xl md:text-5xl">
                Let’s talk about your pet’s identification plan.
              </h2>
              <p className="mt-4 max-w-[720px] font-manrope text-base font-light leading-7 text-[#414844] sm:text-lg sm:leading-8">
                Request an appointment and mention microchipping. Our team can confirm current service details, answer questions about registration, and help you plan the next step.
              </p>
            </div>
            <Link
              to={ROUTE.bookAppointment}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#214A1E] px-6 py-3 text-center font-manrope text-sm font-bold text-white transition hover:bg-[#173F35] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#214A1E] focus-visible:ring-offset-2 sm:w-auto sm:text-base"
            >
              Request an appointment <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="bg-[#FBF9F4] px-5 py-14 sm:px-8 sm:py-16 md:px-12 lg:px-16 lg:py-24">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="font-manrope text-xs font-bold uppercase tracking-[0.2em] text-[#55745D] sm:text-sm">Good to know</p>
              <h2 className="mt-3 font-founders text-[34px] font-medium leading-[1.08] text-[#416352] sm:text-4xl md:text-5xl">
                Microchipping questions, answered.
              </h2>
              <p className="mt-5 font-manrope text-base font-light leading-7 text-[#414844]">
                These general answers can help you prepare. For your pet’s individual care and the clinic’s current service details, please contact our team.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-[20px] border border-[#E1EBDC] bg-white p-5 sm:rounded-[24px] sm:p-6">
                  <summary className="cursor-pointer list-none pr-7 font-founders text-lg font-medium leading-snug text-[#416352] marker:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#214A1E] sm:text-xl">
                    {faq.question}
                  </summary>
                  <p className="mt-3 font-manrope text-sm font-light leading-7 text-[#414844] sm:text-base">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
