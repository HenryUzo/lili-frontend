import { Search, X } from "lucide-react";

type PetCareSearchProps = {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
  label?: string;
  placeholder?: string;
  variant?: "paper" | "plain";
};

export function PetCareSearch({
  value,
  onChange,
  resultCount,
  label = "Search pet care articles",
  placeholder = "Search pet symptoms, wellness, vaccines, dental care...",
  variant = "paper",
}: PetCareSearchProps) {
  const isPlain = variant === "plain";

  return (
    <div
      className={`w-full ${
        isPlain
          ? ""
          : "rotate-[-0.5deg] rounded-[28px] border-2 border-white bg-[#FFFDF6] p-3"
      }`}
    >
      <label className="sr-only" htmlFor="pet-care-search">
        {label}
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#006838]"
          aria-hidden="true"
        />
        <input
          id="pet-care-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`min-h-14 w-full border border-[#CFE8BC] bg-[#F2F8EA] py-4 pl-14 pr-[132px] text-base font-bold text-[#073D2A] outline-none transition placeholder:text-[#79887D] focus:border-[#006838] focus:ring-4 focus:ring-[#BEEB9F]/50 ${
            isPlain ? "rounded-full" : "rounded-[22px]"
          }`}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 hidden min-h-11 -translate-y-1/2 items-center justify-center rounded-[18px] bg-[#006838] px-5 text-sm font-bold text-white transition hover:bg-[#004F2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006838] sm:inline-flex"
        >
          Search
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-[104px] top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#006838] transition hover:bg-[#DDF1CD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006838] sm:flex"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
      {typeof resultCount === "number" && value && (
        <p className="mt-3 px-2 text-sm font-bold text-[#53635A]">
          {resultCount === 1 ? "1 article found" : `${resultCount} articles found`}
        </p>
      )}
    </div>
  );
}
