import { Link } from "react-router-dom";
import { Check, MapPin, PawPrint, ShieldCheck } from "lucide-react";
import { ROUTE } from "../../router";
import Seo from "../components/seo/Seo";

const facts = [
  {
    title: "A permanent ID",
    body: "A microchip carries a unique identification number that can be read by a compatible scanner.",
    icon: ShieldCheck,
  },
  {
    title: "Keep details current",
    body: "The chip itself does not contain your contact details. A current registry record helps someone use the ID to reach you.",
    icon: Check,
  },
  {
    title: "Keep the collar tag",
    body: "A microchip is one layer of identification. It does not replace a collar and visible ID tag.",
    icon: PawPrint,
  },
];

const faqs = [
  {
    question: "Is a microchip a GPS tracker?",
    answer: "No. A pet microchip is an identification device, not a GPS tracker. It does not show your pet’s location.",
  },
  {
    question: "Does a microchip replace a collar or ID tag?",
    answer: "No. Visible identification can help someone contact you quickly. A microchip provides another way to identify your pet if the collar is lost.",
  },
  {
    question: "What should I do after my pet is microchipped?",
    answer: "Ask which registry applies and how to register or update your contact details. If you move or change phone numbers, update the registry record.",
  },
  {
    question: "My pet may already have a microchip. What now?",
    answer: "Mention this when requesting an appointment. Ask the clinic team whether they can scan the existing chip and help you find the registry information.",
  },
  {
    question: "How much does microchipping cost?",
    answer: "Pricing and what is included can change. Contact Lili Veterinary Hospital to confirm current availability, pricing, and registration details.",
  },
];

export default function Microchipping() {
  return (
    <>
      <Seo
        title="Pet Microchipping in San Antonio | Lili Veterinary Hospital"
        description="Learn how pet microchips provide permanent identification, why registry details matter, and how to ask Lili Veterinary Hospital about microchipping."
        path={ROUTE.microchipping}
      />
      <main className="w-full bg-[#F7FAF5] text-[#173F35]">
        <section className="relative overflow-hidden bg-[#EAF4E9] px-6 py-16 md:px-10 md:py-24 lg:px-16">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9DDC9] bg-white/70 px-4 py-2 text-sm font-semibold">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Lili Veterinary Hospital · San Antonio
              </p>
              <h1 className="max-w-[760px] font-founders text-5xl font-medium leading-[1.02] tracking-[-0.04em] text-[#214A1E] md:text-6xl lg:text-7xl">
                A little chip can help your pet find their way home.
              </h1>
              <p className="mt-6 max-w-[650px] text-lg leading-8 text-[#414844] md:text-xl">
                A pet microchip is a permanent form of identification. A compatible scanner reads its unique ID, and a current registry record helps connect that ID with your contact information.
              </p>
              <p className="mt-4 max-w-[650px] text-base leading-7 text-[#414844]">
                Ask our team about current microchipping availability, pricing, and what to expect at a visit.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={ROUTE.bookAppointment}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#214A1E] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#173F35] focus:outline-none focus:ring-2 focus:ring-[#214A1E] focus:ring-offset-2"
                >
                  Request an appointment
                </Link>
                <a
                  href="#microchip-basics"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#A9C6A9] bg-white px-6 py-3 text-base font-semibold text-[#214A1E] transition hover:bg-[#F4F8F1] focus:outline-none focus:ring-2 focus:ring-[#214A1E] focus:ring-offset-2"
                >
                  Learn the basics
                </a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white bg-white p-7 shadow-[0_24px_70px_rgba(23,63,53,0.10)] md:p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF4E9] text-[#214A1E]">
                <PawPrint className="h-8 w-8" aria-hidden="true" />
              </div>
              <h2 className="mt-6 font-founders text-3xl font-medium leading-tight text-[#214A1E] md:text-4xl">
                Identification works best when the details stay up to date.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#414844]">
                The microchip stores an ID number—not your address or phone number. Make sure the associated registry can reach you if your pet is found.
              </p>
              <div className="mt-6 rounded-2xl bg-[#F4F8F1] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#55745D]">Remember</p>
                <p className="mt-2 text-base leading-7 text-[#414844]">
                  A microchip is not GPS and should be used alongside a collar and visible ID tag.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="microchip-basics" className="px-6 py-16 md:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="max-w-[740px]">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#55745D]">Microchip basics</p>
              <h2 className="mt-3 font-founders text-4xl font-medium leading-tight tracking-[-0.03em] text-[#214A1E] md:text-5xl">
                Three things every pet owner should know
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {facts.map(({ title, body, icon: Icon }) => (
                <article key={title} className="rounded-3xl border border-[#DCE8D9] bg-white p-7 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF4E9] text-[#214A1E]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[#214A1E]">{title}</h3>
                  <p className="mt-3 text-base leading-7 text-[#4A514B]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#214A1E] px-6 py-16 text-white md:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#C6EBD5]">A simple next step</p>
              <h2 className="mt-3 font-founders text-4xl font-medium leading-tight md:text-5xl">
                Have questions about microchipping?
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/85">
                Request an appointment and mention microchipping. The clinic team can confirm service availability and current details.
              </p>
              <Link
                to={ROUTE.bookAppointment}
                className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-[#214A1E] transition hover:bg-[#EAF4E9] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#214A1E]"
              >
                Ask about an appointment
              </Link>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-white/20 bg-white/10 p-5">
                  <summary className="cursor-pointer list-none pr-6 text-lg font-semibold marker:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-base leading-7 text-white/85">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
