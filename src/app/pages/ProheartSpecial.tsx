import { ArrowRight, CalendarDays, ChevronDown, ExternalLink, HeartPulse, Phone, ShieldCheck, Stethoscope, Syringe } from "lucide-react";
import { Link } from "react-router-dom";
import { proheartPromotion, isProheartPromotionActive } from "../campaigns/proheart-promotion.mjs";
import images from "../assests/images";
import Seo from "../components/seo/Seo";
import { ROUTE } from "../../router";

const bookingUrl = `${ROUTE.bookAppointment}?utm_source=lilivet&utm_medium=website&utm_campaign=proheart6_special&promo=${proheartPromotion.slug}`;
const heartwormSource = "https://www.heartwormsociety.org/pet-owner-resources/heartworm-basics";
const productLabel = "https://animaldrugsatfda.fda.gov/adafda/app/search/public/document/downloadLabeling/892";

const careSteps = [
  { number: "01", title: "Get to know your dog", description: "We review your dog's health history, current prevention, weight, and any concerns before recommending a next step." },
  { number: "02", title: "Test for heartworm", description: "A heartworm test helps us check for an existing infection before considering preventive medication." },
  { number: "03", title: "Review eligibility", description: "A veterinarian examines your dog, reviews the test result, and discusses whether ProHeart 6 is an appropriate choice." },
  { number: "04", title: "Plan ongoing protection", description: "If appropriate, we administer the injection and help you plan when your dog will need prevention again." },
];

const faqs = [
  { question: "How does a dog get heartworm disease?", answer: "Heartworm is spread through the bite of an infected mosquito. It cannot spread directly from one dog to another." },
  { question: "Can my dog have heartworms without looking sick?", answer: "Yes. Dogs may show few or no signs early in an infection. Testing matters even when a dog seems healthy." },
  { question: "Does ProHeart 6 treat an existing heartworm infection?", answer: "No. ProHeart 6 is preventive medication, not a treatment for adult heartworms. Your veterinarian will discuss a different care plan if a test is positive." },
  { question: "Will one injection protect my dog indefinitely?", answer: "No. One injection provides six months of heartworm prevention. Your veterinary team can help plan continued protection after that period." },
];

function BookingLink({ active }: { active: boolean }) {
  return (
    <Link to={active ? bookingUrl : ROUTE.bookAppointment} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#006838] px-6 py-3 font-manrope text-sm font-bold text-white transition hover:bg-[#204E1C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006838]">
      {active ? "Request appointment" : "Book an appointment"}<ArrowRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

export default function ProheartSpecial() {
  const active = isProheartPromotionActive();

  return (
    <main className="bg-white text-[#173F35]">
      <Seo title="ProHeart 6 Special | Lili Veterinary Hospital" description="Learn about heartworm prevention for dogs and Lili Veterinary Hospital's limited-time ProHeart 6 offer, testing, eligibility, and pricing." path={ROUTE.proheartSpecial} image="https://liliveterinaryhospital.com/proheart-6-promo.png" />

      <section className="relative isolate min-h-[min(690px,85svh)] overflow-hidden bg-[#F2F7EE]">
        <img src={images.doctreatdog} alt="Veterinarian caring for a dog during an exam" className="absolute inset-0 size-full object-cover object-[67%_center] opacity-85 sm:object-center sm:opacity-95" />
        <div className="absolute inset-0 bg-[#F2F7EE]/65 sm:bg-[#F2F7EE]/45" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[min(690px,85svh)] max-w-[1280px] flex-col justify-center px-6 py-14 sm:px-10 lg:px-16">
          <div className="max-w-[680px]">
            <p className="font-manrope text-xs font-extrabold uppercase text-[#006838]">Lili Veterinary Hospital · Heartworm prevention</p>
            <h1 className="mt-5 font-founders text-5xl font-semibold leading-[1.06] text-[#00462E] sm:text-6xl lg:text-7xl">{active ? <>ProHeart 6 <span className="text-[#D72830]">special</span></> : "The ProHeart 6 special has ended"}</h1>
            <p className="mt-5 font-founders text-2xl font-semibold leading-tight text-[#204E1C] sm:text-3xl">{active ? "50% off six months of heartworm prevention" : "Let's keep your dog's protection on track."}</p>
            <p className="mt-5 max-w-[575px] font-manrope text-base leading-7 text-[#25483B] sm:text-lg">{active ? "One veterinary-administered injection can protect your dog from heartworm disease for six months. We start with the right test and a conversation about your dog's health." : "Our team can help you choose an appropriate heartworm prevention plan for your dog."}</p>
            {active && <p className="mt-4 font-manrope text-sm font-bold text-[#345A43]">Offer valid October 8, 2026 through April 8, 2027</p>}
            <div className="mt-8 flex flex-wrap items-center gap-5"><BookingLink active={active} /><a href="tel:+12102578496" className="inline-flex min-h-12 items-center gap-2 font-manrope text-sm font-bold text-[#006838] underline underline-offset-4"><Phone className="size-4" aria-hidden="true" />Call (210) 257-8496</a></div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">
          <div><p className="font-manrope text-xs font-extrabold uppercase text-[#C43C31]">Why prevention matters</p><h2 className="mt-3 font-founders text-4xl font-semibold leading-tight text-[#00462E] sm:text-5xl">A mosquito bite can become a serious heart and lung problem.</h2></div>
          <div className="space-y-5 font-manrope text-base leading-8 text-[#395748]"><p>Heartworm disease spreads when an infected mosquito bites a dog. The worms can grow in the heart, lungs, and nearby blood vessels, where they may cause lasting damage.</p><p>Early infection may be hard to notice. As disease progresses, dogs may develop a cough, tire more easily, or have trouble with activity. Waiting for symptoms is not a reliable way to protect them.</p><a href={heartwormSource} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-[#006838] underline underline-offset-4">Learn about heartworm disease<ExternalLink className="size-4" aria-hidden="true" /></a></div>
        </div>
      </section>

      <section className="bg-[#EAF5E8] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <p className="font-manrope text-xs font-extrabold uppercase text-[#006838]">The benefit of staying protected</p><h2 className="mt-3 max-w-[780px] font-founders text-4xl font-semibold leading-tight text-[#00462E] sm:text-5xl">Six months of protection, thoughtfully planned.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            <div className="border-t-2 border-[#006838] pt-6"><Syringe className="size-8 text-[#006838]" aria-hidden="true" /><h3 className="mt-5 font-founders text-2xl font-semibold">One injection</h3><p className="mt-3 font-manrope leading-7 text-[#456151]">ProHeart 6 is administered by a veterinarian, with no monthly heartworm pill or chewable to remember during its six-month protection period.</p></div>
            <div className="border-t-2 border-[#D72830] pt-6"><HeartPulse className="size-8 text-[#D72830]" aria-hidden="true" /><h3 className="mt-5 font-founders text-2xl font-semibold">Prevention before symptoms</h3><p className="mt-3 font-manrope leading-7 text-[#456151]">Routine prevention matters because heartworm infection may be present before a dog appears unwell.</p></div>
            <div className="border-t-2 border-[#006838] pt-6"><Stethoscope className="size-8 text-[#006838]" aria-hidden="true" /><h3 className="mt-5 font-founders text-2xl font-semibold">Care led by your vet</h3><p className="mt-3 font-manrope leading-7 text-[#456151]">Lili's team tests, evaluates eligibility, and helps you plan continued protection after six months.</p></div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1280px]"><p className="font-manrope text-xs font-extrabold uppercase text-[#C43C31]">How Lili helps</p><h2 className="mt-3 font-founders text-4xl font-semibold text-[#00462E] sm:text-5xl">A prevention visit built around your dog.</h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-[#C9DEC8] pt-8 sm:grid-cols-2 lg:grid-cols-4">{careSteps.map((step) => <div key={step.number}><span className="font-founders text-4xl font-semibold text-[#D72830]">{step.number}</span><h3 className="mt-4 font-founders text-2xl font-semibold text-[#00462E]">{step.title}</h3><p className="mt-3 font-manrope text-sm leading-7 text-[#456151]">{step.description}</p></div>)}</div>
        </div>
      </section>

      {active && <section className="bg-[#F4F8F1] px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1280px]"><p className="font-manrope text-xs font-extrabold uppercase text-[#006838]">Limited-time offer</p><h2 className="mt-3 font-founders text-4xl font-semibold text-[#00462E] sm:text-5xl">Clear pricing for your dog's weight.</h2><p className="mt-4 max-w-[650px] font-manrope text-base leading-7 text-[#456151]">Each total includes the promotional ProHeart 6 price and the separate $15 heartworm test fee.</p>
          <div className="mt-9 grid gap-5 lg:grid-cols-3">{proheartPromotion.tiers.map((tier) => <div key={tier.weight} className="flex h-full flex-col rounded-md border border-[#C9DEC8] bg-white p-6 shadow-[0_16px_35px_rgba(0,50,25,0.06)] sm:p-7"><p className="font-manrope text-xs font-extrabold uppercase text-[#006838]">Dog weight</p><h3 className="mt-2 font-founders text-3xl font-semibold text-[#00462E]">{tier.weight}</h3><dl className="mt-7 space-y-3 font-manrope text-sm text-[#395748]"><div className="flex justify-between gap-4"><dt>ProHeart 6 <span className="text-[#C43C31]">(50% off)</span></dt><dd className="font-bold">{tier.injection}</dd></div><div className="flex justify-between gap-4"><dt>Heartworm test</dt><dd className="font-bold">{tier.test}</dd></div></dl><div className="mt-7 flex items-end justify-between gap-4 border-t border-[#C9DEC8] pt-5"><span className="font-manrope text-sm font-bold">Total per visit</span><strong className="font-founders text-4xl font-semibold text-[#006838]">{tier.total}</strong></div></div>)}</div>
          <p className="mt-6 font-manrope text-sm leading-6 text-[#456151]">Eligibility, testing, safety requirements, and promotion terms apply. Ask our veterinary team for details. Final eligibility and price are confirmed by the clinic.</p>
        </div>
      </section>}

      <section className="bg-[#214A1E] px-6 py-16 text-white sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20"><div><ShieldCheck className="size-9 text-[#C9F483]" aria-hidden="true" /><p className="mt-5 font-manrope text-xs font-extrabold uppercase text-[#C9F483]">Safety and eligibility</p><h2 className="mt-3 font-founders text-4xl font-semibold leading-tight sm:text-5xl">The right prevention starts with the right assessment.</h2></div><div className="space-y-5 font-manrope text-base leading-7 text-white/90"><p>ProHeart 6 is for dogs at least six months old. Before administration, your veterinarian should assess your dog's health and test for an existing heartworm infection.</p><p>It prevents heartworm disease; it does not treat adult heartworms or prevent unrelated heart conditions. If your dog tests positive, our team will discuss an appropriate care plan.</p><p>Like any medication, ProHeart 6 has precautions and possible adverse reactions. Discuss your dog's history with your veterinarian and read the full product information before treatment.</p><a href={productLabel} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-bold text-[#C9F483] underline underline-offset-4">Read FDA product information<ExternalLink className="size-4" aria-hidden="true" /></a></div></div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24"><div className="mx-auto max-w-[1280px]"><p className="font-manrope text-xs font-extrabold uppercase text-[#C43C31]">Common questions</p><h2 className="mt-3 font-founders text-4xl font-semibold text-[#00462E] sm:text-5xl">Heartworm prevention, explained.</h2><div className="mt-8 grid gap-x-12 lg:grid-cols-2">{faqs.map((faq) => <details key={faq.question} className="group border-b border-[#C9DEC8] py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-founders text-xl font-semibold text-[#00462E] marker:hidden">{faq.question}<ChevronDown className="size-5 shrink-0 transition group-open:rotate-180" aria-hidden="true" /></summary><p className="mt-4 max-w-[550px] font-manrope text-sm leading-7 text-[#456151]">{faq.answer}</p></details>)}</div></div></section>

      <section className="bg-[#EAF5E8] px-6 py-14 sm:px-10 lg:px-16 lg:py-20"><div className="mx-auto flex max-w-[1280px] flex-col gap-7 md:flex-row md:items-center md:justify-between"><div><CalendarDays className="size-8 text-[#006838]" aria-hidden="true" /><h2 className="mt-4 font-founders text-3xl font-semibold text-[#00462E] sm:text-4xl">Let's make a plan for your dog.</h2><p className="mt-2 font-manrope text-sm leading-6 text-[#456151]">Request a visit and our team will contact you to confirm a time.</p></div><BookingLink active={active} /></div></section>
    </main>
  );
}
