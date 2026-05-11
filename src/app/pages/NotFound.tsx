import { Link, useLocation } from "react-router-dom";
import Seo from "../components/seo/Seo";
import images from "../assests/images";
import { ROUTE } from "../../router";

export default function NotFound() {
  const location = useLocation();

  return (
    <>
      <Seo
        title="Page Not Found | Lili Veterinary Hospital"
        description="The page you requested could not be found. Return to Lili Veterinary Hospital to book an appointment, contact the clinic, or visit urgent care."
        path={location.pathname}
        noIndex
        robots="noindex,follow"
      />

      <main className="min-h-[70vh] bg-[#F2F7EE] px-6 py-16 md:px-10">
        <section className="mx-auto flex max-w-[1100px] flex-col items-center gap-10 rounded-[32px] bg-white px-6 py-12 text-center shadow-[0_24px_60px_rgba(23,50,33,0.08)] md:flex-row md:px-10 md:text-left">
          <div className="flex-1">
            <p className="font-manrope text-[12px] font-bold uppercase tracking-[0.22em] text-[#006838]">
              Error 404
            </p>
            <h1 className="mt-4 font-founders text-[42px] font-medium leading-[0.95] tracking-[-0.04em] text-[#173221] md:text-[64px]">
              Page not found.
            </h1>
            <p className="mt-5 max-w-[560px] font-manrope text-[16px] leading-8 text-[#3F5446] md:text-[18px]">
              The page may have moved or no longer exist. Use the links below to
              get back to an active part of the site.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={ROUTE.home}
                className="inline-flex items-center justify-center rounded-full bg-[#006838] px-7 py-4 font-manrope text-[15px] font-bold text-white transition hover:bg-[#00582f]"
              >
                Home
              </Link>
              <Link
                to={ROUTE.bookAppointment}
                className="inline-flex items-center justify-center rounded-full border border-[#006838]/20 bg-white px-7 py-4 font-manrope text-[15px] font-bold text-[#006838] transition hover:border-[#006838]/40"
              >
                Book Appointment
              </Link>
              <Link
                to={ROUTE.contact}
                className="inline-flex items-center justify-center rounded-full border border-[#173221]/10 bg-[#173221]/5 px-7 py-4 font-manrope text-[15px] font-bold text-[#173221] transition hover:bg-[#173221]/10"
              >
                Contact
              </Link>
              <Link
                to={ROUTE.urgentCare}
                className="inline-flex items-center justify-center rounded-full border border-[#ED1C24]/20 bg-[#FFF4F4] px-7 py-4 font-manrope text-[15px] font-bold text-[#ED1C24] transition hover:border-[#ED1C24]/40"
              >
                Urgent Care
              </Link>
            </div>
          </div>

          <div className="flex w-full max-w-[360px] flex-1 justify-center">
            <img
              src={images.pet404}
              alt="Dog and cat illustration for the not found page"
              className="w-full max-w-[320px] object-contain"
            />
          </div>
        </section>
      </main>
    </>
  );
}
