import { Link } from "react-router-dom";
import { PawPrint, SearchX } from "lucide-react";
import { ROUTE } from "../../../router";

type PetCareEmptyStateProps = {
  onClear?: () => void;
  title?: string;
  text?: string;
};

export function PetCareEmptyState({
  onClear,
  title = "We couldn't find an article for that search yet.",
  text = "Try another term, browse a category, or contact our team if you are concerned about your pet.",
}: PetCareEmptyStateProps) {
  return (
    <div className="relative rounded-[36px] border-2 border-white bg-[#FFFDF6] p-8 text-center">
      <PawPrint className="absolute right-8 top-8 h-12 w-12 rotate-12 text-[#D6EBAE]" aria-hidden="true" />
      <div className="mx-auto flex h-16 w-16 rotate-[-6deg] items-center justify-center rounded-full bg-[#E9F7DE] text-[#006838]">
        <SearchX className="h-8 w-8" aria-hidden="true" />
      </div>
      <p className="mt-4 font-queen text-3xl text-[#ED1C24]">Little note</p>
      <h2 className="mt-1 text-2xl font-bold text-[#073D2A]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-[#53635A]">{text}</p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8BC] bg-white px-5 py-3 font-bold text-[#006838] hover:bg-[#E9F7DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
          >
            Clear Search
          </button>
        )}
        <Link
          to="/pet-care"
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8BC] bg-white px-5 py-3 font-bold text-[#006838] hover:bg-[#E9F7DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
        >
          Browse All Articles
        </Link>
        <Link
          to={ROUTE.bookAppointment}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#006838] px-5 py-3 font-bold text-white hover:bg-[#004F2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
        >
          Book an Appointment
        </Link>
      </div>
    </div>
  );
}
