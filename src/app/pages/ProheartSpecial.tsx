import { ArrowRight, CalendarDays, Check, ExternalLink, Phone, ShieldCheck, Syringe } from "lucide-react";
import { Link } from "react-router-dom";
import { proheartPromotion, isProheartPromotionActive } from "../campaigns/proheart-promotion.mjs";
import images from "../assests/images";
import Seo from "../components/seo/Seo";
import { ROUTE } from "../../router";

const bookingUrl = `${ROUTE.bookAppointment}?utm_source=lilivet&utm_medium=website&utm_campaign=proheart6_special&promo=${proheartPromotion.slug}`;

export default function ProheartSpecial() {
  const active = isProheartPromotionActive();

  return (
    <main className="bg-white text-[#123B2A]">
      <Seo
        title="ProHeart 6 Special | Lili Veterinary Hospital"
        description="See Lili Veterinary Hospital's ProHeart 6 offer for dogs, including weight-based prices, heartworm testing, and appointment information."
        path={ROUTE.proheartSpecial}
        image="https://liliveterinaryhospital.com/proheart-6-promo.png"
      />

      <section className="relative isolate min-h-[clamp(430px,68vh,580px)] overflow-hidden bg-[#06462C] text-white">
        <img
          src={images.doctreatdog}
          alt="Veterinarian caring for a dog at Lili Veterinary Hospital"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#042C1E]/75" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[clamp(430px,68vh,580px)] max-w-7xl flex-col justify-center px-5 py-12 sm:px-8 lg:px-12">
          <p className="font-manrope text-sm font-bold uppercase text-[#D6F7B2]">Lili Veterinary Hospital</p>
          <h1 className="mt-5 max-w-3xl font-founders text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            {active ? "ProHeart 6 special" : "ProHeart 6 special has ended"}
          </h1>
          {active ? (
            <>
              <p className="mt-5 max-w-2xl font-founders text-3xl font-semibold text-[#C6F77F] sm:text-4xl">50% off ProHeart 6</p>
              <p className="mt-4 max-w-xl font-manrope text-base leading-7 text-white/90 sm:text-lg">Six months of heartworm protection for your dog with one veterinary-administered injection.</p>
              <p className="mt-3 font-manrope text-sm font-medium text-white/80">October 8, 2026 - April 8, 2027</p>
            </>
          ) : (
            <p className="mt-5 max-w-xl font-manrope text-lg leading-7 text-white/90">This offer ended April 8, 2027. Our team can help you find the right heartworm prevention plan for your dog.</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={active ? bookingUrl : ROUTE.bookAppointment} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#C6F77F] px-6 font-manrope text-sm font-bold text-[#06462C] transition hover:bg-white">
              {active ? "Request appointment" : "Book an appointment"}<ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a href="tel:+12102578496" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/70 px-6 font-manrope text-sm font-bold text-white transition hover:bg-white/15">
              <Phone className="size-4" aria-hidden="true" />Call (210) 257-8496
            </a>
          </div>
        </div>
      </section>

      {active ? (
        <>
          <section className="bg-[#F4F9F0] px-5 py-12 sm:px-8 lg:py-16">
            <div className="mx-auto max-w-7xl">
              <p className="font-manrope text-xs font-bold uppercase text-[#087C48]">Offer pricing</p>
              <h2 className="mt-2 font-founders text-3xl font-semibold text-[#073E2D] sm:text-4xl">One visit. Six months of protection.</h2>
              <p className="mt-3 max-w-2xl font-manrope text-base leading-7 text-[#3C5B4A]">The $15 heartworm test is listed separately so you can see the full promotional total for your dog&apos;s weight.</p>

              <div className="mt-8 space-y-3 md:hidden">
                {proheartPromotion.tiers.map((tier) => (
                  <div key={tier.weight} className="rounded-md border border-[#BBD5BD] bg-white p-5">
                    <h3 className="font-founders text-2xl font-semibold">{tier.weight}</h3>
                    <dl className="mt-4 space-y-2 font-manrope text-sm">
                      <div className="flex justify-between gap-3"><dt>ProHeart 6 (50% off)</dt><dd className="font-bold">{tier.injection}</dd></div>
                      <div className="flex justify-between gap-3"><dt>Heartworm test</dt><dd className="font-bold">{tier.test}</dd></div>
                      <div className="flex justify-between gap-3 border-t border-[#D6E6D5] pt-3 text-base"><dt className="font-bold">Total per visit</dt><dd className="font-extrabold text-[#076D39]">{tier.total}</dd></div>
                    </dl>
                  </div>
                ))}
              </div>

              <div className="mt-8 hidden overflow-hidden rounded-md border border-[#BBD5BD] bg-white md:block">
                <table className="w-full border-collapse text-left font-manrope">
                  <thead className="bg-[#085F37] text-sm text-white"><tr><th scope="col" className="p-5">Dog weight</th><th scope="col" className="p-5">ProHeart 6 (50% off)</th><th scope="col" className="p-5">Heartworm test</th><th scope="col" className="p-5">Total per visit</th></tr></thead>
                  <tbody>{proheartPromotion.tiers.map((tier) => <tr key={tier.weight} className="border-t border-[#D6E6D5] text-lg"><th scope="row" className="p-5 font-bold">{tier.weight}</th><td className="p-5">{tier.injection}</td><td className="p-5">{tier.test}</td><td className="p-5 font-extrabold text-[#076D39]">{tier.total}</td></tr>)}</tbody>
                </table>
              </div>
              <p className="mt-4 font-manrope text-sm leading-6 text-[#4F6658]">Eligibility, testing, safety requirements, and promotion terms apply. Ask our veterinary team for details. Final eligibility and price are confirmed by the clinic.</p>
            </div>
          </section>

          <section className="px-5 py-14 sm:px-8 lg:py-20">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="font-manrope text-xs font-bold uppercase text-[#087C48]">What to know</p>
                <h2 className="mt-2 font-founders text-3xl font-semibold text-[#073E2D] sm:text-4xl">A simple conversation with your veterinarian</h2>
                <ul className="mt-7 space-y-5 font-manrope text-base leading-7 text-[#345543]">
                  <li className="flex gap-4"><ShieldCheck className="mt-1 size-6 shrink-0 text-[#087C48]" aria-hidden="true" /><span>ProHeart 6 provides six months of heartworm prevention for dogs.</span></li>
                  <li className="flex gap-4"><Syringe className="mt-1 size-6 shrink-0 text-[#087C48]" aria-hidden="true" /><span>One injection is given by a veterinarian. There is no monthly pill or chewable to remember during that period.</span></li>
                  <li className="flex gap-4"><Check className="mt-1 size-6 shrink-0 text-[#087C48]" aria-hidden="true" /><span>For dogs six months of age or older. Heartworm testing and a veterinary evaluation are required before treatment.</span></li>
                </ul>
                <a href="https://animaldrugsatfda.fda.gov/adafda/app/search/public/document/downloadLabeling/892" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-manrope text-sm font-bold text-[#076D39] underline underline-offset-4">Read ProHeart 6 prescribing information<ExternalLink className="size-4" aria-hidden="true" /></a>
              </div>
              <figure className="mx-auto w-full max-w-[430px]">
                <a href="/proheart-6-promo.png" target="_blank" rel="noreferrer" aria-label="Open the full ProHeart 6 promotion flyer">
                  <img src="/proheart-6-promo.png" alt="Lili Veterinary Hospital ProHeart 6 promotion flyer" loading="lazy" className="h-auto w-full rounded-md border border-[#D9E7D7]" />
                </a>
                <figcaption className="mt-3 text-center font-manrope text-sm text-[#567261]">View the original promotion flyer</figcaption>
              </figure>
            </div>
          </section>

          <section className="bg-[#074A30] px-5 py-14 text-white sm:px-8">
            <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
              <div><CalendarDays className="size-8 text-[#C6F77F]" aria-hidden="true" /><h2 className="mt-3 font-founders text-3xl font-semibold">Ask if ProHeart 6 is right for your dog</h2><p className="mt-2 font-manrope text-sm text-white/80">Our team will review your request and confirm an appointment time.</p></div>
              <Link to={bookingUrl} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-md bg-[#C6F77F] px-6 font-manrope text-sm font-bold text-[#06462C] transition hover:bg-white">Request appointment<ArrowRight className="size-4" aria-hidden="true" /></Link>
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
