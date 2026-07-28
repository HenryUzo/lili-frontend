import { Link } from "react-router-dom";
import { petCareCategories, type PetCareCategorySlug } from "../../../data/pet-care-articles";

type CategoryFiltersProps = {
  activeSlug?: PetCareCategorySlug | "all";
  onSelect?: (slug: PetCareCategorySlug | "all") => void;
  asLinks?: boolean;
  compact?: boolean;
  ctaLocation?: string;
  onCategoryClick?: (slug: PetCareCategorySlug | "all", ctaLocation: string) => void;
};

export function CategoryFilters({
  activeSlug = "all",
  onSelect,
  asLinks = false,
  compact = false,
  ctaLocation = "pet_care_category_filters",
  onCategoryClick,
}: CategoryFiltersProps) {
  const allClass =
    activeSlug === "all"
      ? "border-[#006838] bg-[#006838] text-white"
      : "border-[#CFE8BC] bg-white text-[#006838] hover:bg-[#E9F7DE]";

  return (
    <div
      className={`flex gap-2 ${
        compact ? "overflow-x-auto pb-2 md:flex-wrap md:overflow-visible md:pb-0" : "flex-wrap gap-3"
      }`}
      aria-label="Pet care categories"
    >
      {asLinks ? (
        <Link
          to="/pet-care"
          onClick={() => onCategoryClick?.("all", ctaLocation)}
          className={`shrink-0 rounded-full border font-black uppercase tracking-[0.06em] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838] ${
            compact ? "min-h-10 px-3 py-2 text-xs" : "px-4 py-2 text-sm"
          } ${allClass}`}
        >
          All
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => {
            onCategoryClick?.("all", ctaLocation);
            onSelect?.("all");
          }}
          className={`shrink-0 rounded-full border font-black uppercase tracking-[0.06em] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838] ${
            compact ? "min-h-10 px-3 py-2 text-xs" : "px-4 py-2 text-sm"
          } ${allClass}`}
        >
          All
        </button>
      )}
      {petCareCategories.map((category) => {
        const active = activeSlug === category.slug;
        const className = active
          ? "border-[#006838] bg-[#006838] text-white"
          : "border-[#CFE8BC] bg-white text-[#006838] hover:bg-[#E9F7DE]";

        return asLinks ? (
          <Link
            key={category.slug}
            to={`/pet-care/category/${category.slug}`}
            onClick={() => onCategoryClick?.(category.slug, ctaLocation)}
            className={`shrink-0 rounded-full border font-black uppercase tracking-[0.06em] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838] ${
              compact ? "min-h-10 px-3 py-2 text-xs" : "px-4 py-2 text-sm"
            } ${className}`}
          >
            {category.label}
          </Link>
        ) : (
          <button
            key={category.slug}
            type="button"
            onClick={() => {
              onCategoryClick?.(category.slug, ctaLocation);
              onSelect?.(category.slug);
            }}
            className={`shrink-0 rounded-full border font-black uppercase tracking-[0.06em] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838] ${
              compact ? "min-h-10 px-3 py-2 text-xs" : "px-4 py-2 text-sm"
            } ${className}`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
