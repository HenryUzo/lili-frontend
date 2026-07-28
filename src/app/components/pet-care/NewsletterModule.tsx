import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, PawPrint } from "lucide-react";
import { Link } from "react-router-dom";
import {
  subscribeToPetCareNewsletter,
  type PetCareNewsletterPetPreference,
} from "../../../lib/api/clients";
import { trackPetCareNewsletterSignup } from "../../../lib/pet-care-analytics";
import images from "../../assests/images";

type NewsletterState =
  | "idle"
  | "submitting"
  | "confirmation_required"
  | "validation_error"
  | "network_error"
  | "rate_limited"
  | "feature_unavailable";

export function NewsletterModule() {
  const [email, setEmail] = useState("");
  const [petPreference, setPetPreference] =
    useState<PetCareNewsletterPetPreference>("DOG");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<NewsletterState>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    if (!email.trim() || !consent) {
      setStatus("validation_error");
      return;
    }

    setStatus("submitting");

    try {
      await subscribeToPetCareNewsletter({
        email,
        petPreference,
        consent: true,
        website,
      });

      setEmail("");
      setConsent(false);
      setWebsite("");
      setStatus("confirmation_required");
      trackPetCareNewsletterSignup({ pet_preference: petPreference });
    } catch (error) {
      const statusCode = (error as { response?: { status?: number } })?.response?.status;

      if (statusCode === 429) {
        setStatus("rate_limited");
      } else if (statusCode === 503) {
        setStatus("feature_unavailable");
      } else if (statusCode === 400) {
        setStatus("validation_error");
      } else {
        setStatus("network_error");
      }
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[46px] bg-[#012D1D] p-6 text-white md:p-10">
      <div className="absolute -right-20 bottom-0 hidden w-[390px] opacity-90 lg:block" aria-hidden="true">
        <img src={images.cutedogcat} alt="" className="w-full object-contain" />
      </div>
      <div className="absolute left-8 top-8 h-24 w-24 rounded-full border-[18px] border-[#D6EBAE]/20" aria-hidden="true" />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_0.88fr] lg:items-center">
        <div className="space-y-4 lg:pr-24">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#D6EBAE] text-[#006838]">
            <PawPrint className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="font-queen text-4xl text-[#D6EBAE]">Delivered with love</p>
          <h2 className="text-3xl font-bold leading-tight md:text-5xl">
            Helpful pet care guidance, delivered with love
          </h2>
          <p className="max-w-xl text-base leading-7 text-[#D4E8D8]">
            Seasonal reminders, practical care tips, and helpful updates from
            Lili Vet. Confirmation is required before emails begin.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rotate-[1deg] rounded-[28px] border-2 border-white bg-[#FFFDF6] p-5 text-[#073D2A]"
        >
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-bold" htmlFor="pet-care-email">
                Email address
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#006838]"
                  aria-hidden="true"
                />
                <input
                  id="pet-care-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="you@example.com"
                  className="min-h-12 w-full rounded-full border border-[#CFE8BC] bg-[#F8FCF4] py-3 pl-12 pr-4 font-medium outline-none focus:border-[#006838] focus:ring-4 focus:ring-[#BEEB9F]/50"
                />
              </div>
            </div>
            <div className="hidden" aria-hidden="true">
              <label htmlFor="pet-care-website">Website</label>
              <input
                id="pet-care-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>
            <fieldset>
              <legend className="mb-2 block text-sm font-bold">Pet preference</legend>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Dog", value: "DOG" },
                  { label: "Cat", value: "CAT" },
                  { label: "Both", value: "BOTH" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex min-h-12 cursor-pointer items-center justify-center rounded-full border px-4 text-sm font-bold transition ${
                      petPreference === option.value
                        ? "border-[#006838] bg-[#006838] text-white"
                        : "border-[#CFE8BC] bg-white text-[#006838]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="petPreference"
                      value={option.value}
                      checked={petPreference === option.value}
                      onChange={() => setPetPreference(option.value as PetCareNewsletterPetPreference)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="flex items-start gap-3 rounded-2xl border border-[#D8E8CE] bg-white px-4 py-3 text-sm leading-6 text-[#53635A]">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => {
                  setConsent(event.target.checked);
                  if (status !== "idle") setStatus("idle");
                }}
                className="mt-1 h-4 w-4 accent-[#006838]"
              />
              <span>
                I agree to receive pet care guidance, clinic news, and occasional
                marketing emails from Lili Veterinary Hospital. I can unsubscribe
                at any time.{" "}
                <Link
                  to="/privacy-policy"
                  className="font-bold text-[#006838] underline underline-offset-4"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="min-h-12 rounded-full bg-[#006838] px-5 py-3 font-bold text-white transition hover:bg-[#004F2C] disabled:cursor-wait disabled:bg-[#7EA88B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
            >
              {status === "submitting" ? "Sending confirmation..." : "Subscribe"}
            </button>
            {status === "confirmation_required" && (
              <p className="rounded-2xl bg-[#E9F7DE] px-4 py-3 text-sm font-bold text-[#006838]">
                Check your inbox to confirm your subscription.
              </p>
            )}
            {status === "validation_error" && (
              <p className="rounded-2xl bg-[#FFF1F1] px-4 py-3 text-sm font-bold text-[#C9151B]">
                Enter a valid email and check the consent box before submitting.
              </p>
            )}
            {status === "rate_limited" && (
              <p className="rounded-2xl bg-[#FFF1F1] px-4 py-3 text-sm font-bold text-[#C9151B]">
                Too many signup attempts. Please try again later.
              </p>
            )}
            {status === "feature_unavailable" && (
              <p className="rounded-2xl bg-[#FFF1F1] px-4 py-3 text-sm font-bold text-[#C9151B]">
                Newsletter signup is temporarily unavailable. Please try again later.
              </p>
            )}
            {status === "network_error" && (
              <p className="rounded-2xl bg-[#FFF1F1] px-4 py-3 text-sm font-bold text-[#C9151B]">
                We could not send the confirmation request. Please check your connection and try again.
              </p>
            )}
            <p className="text-xs leading-5 text-[#637466]">
              We use double opt-in, so you will need to confirm before emails begin.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
