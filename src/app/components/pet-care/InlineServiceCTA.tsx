import { Link } from "react-router-dom";
import { CalendarCheck, HeartPulse, Phone } from "lucide-react";
import images from "../../assests/images";
import { ROUTE } from "../../../router";
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_NUMBER, trackCallClick } from "../../../lib/analytics";
import {
  trackPetCareAppointmentClick,
  trackPetCareCallClick,
  trackPetCareServiceClick,
  trackPetCareUrgentCareClick,
} from "../../../lib/pet-care-analytics";

type InlineServiceCTAProps = {
  title?: string;
  text?: string;
  servicePath?: string;
  serviceLabel?: string;
  articleSlug?: string | null;
  articleCategory?: string | null;
  ctaLocation?: string;
};

export function InlineServiceCTA({
  title = "Concerned about these symptoms?",
  text = "Our team can assess your pet's needs and help determine the appropriate next step.",
  servicePath = ROUTE.urgentCare,
  serviceLabel = "View Urgent Care",
  articleSlug = null,
  articleCategory = null,
  ctaLocation = "pet_care_inline_cta",
}: InlineServiceCTAProps) {
  return (
    <aside className="relative min-h-[280px] overflow-hidden rounded-[38px] border-2 border-white bg-[#D6EBAE] p-6 md:min-h-[340px] md:p-8">
      <img
        src={images.doctorPetEmoji}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#D6EBAE]/80" aria-hidden="true" />
      <div className="relative z-10 flex h-full max-w-[660px] flex-col justify-center gap-7">
        <div className="space-y-3">
          <p className="font-queen text-3xl leading-none text-[#ED1C24]">
            Lili Vet care team
          </p>
          <h2 className="text-2xl font-bold text-[#073D2A]">{title}</h2>
          <p className="max-w-xl text-base leading-7 text-[#53635A]">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            to={ROUTE.bookAppointment}
            onClick={() =>
              trackPetCareAppointmentClick({
                article_slug: articleSlug,
                article_category: articleCategory,
                cta_location: ctaLocation,
              })
            }
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#006838] px-5 py-3 font-bold text-white transition hover:bg-[#004F2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Book an Appointment
          </Link>
          <Link
            to={servicePath}
            onClick={() => {
              trackPetCareServiceClick({
                article_slug: articleSlug,
                article_category: articleCategory,
                related_service: serviceLabel,
                cta_location: ctaLocation,
              });

              if (servicePath === ROUTE.urgentCare) {
                trackPetCareUrgentCareClick({
                  article_slug: articleSlug,
                  article_category: articleCategory,
                  cta_location: ctaLocation,
                });
              }
            }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#91C47A] bg-white px-5 py-3 font-bold text-[#006838] transition hover:bg-[#E9F7DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
          >
            <HeartPulse className="h-4 w-4" aria-hidden="true" />
            {serviceLabel}
          </Link>
          <a
            href={`tel:${CLINIC_PHONE_NUMBER}`}
            onClick={() => {
              trackCallClick(ctaLocation);
              trackPetCareCallClick({
                article_slug: articleSlug,
                article_category: articleCategory,
                cta_location: ctaLocation,
              });
            }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#F2B5B7] bg-white px-5 py-3 font-bold text-[#C9151B] transition hover:bg-[#FFF1F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED1C24]"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {CLINIC_PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </aside>
  );
}
