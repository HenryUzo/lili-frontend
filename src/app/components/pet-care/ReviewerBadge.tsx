import type { PetCareReviewer } from "../../../data/pet-care-articles";

type ReviewerBadgeProps = {
  reviewer: PetCareReviewer;
  reviewedAt?: string;
  compact?: boolean;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function ReviewerBadge({
  reviewer,
  reviewedAt,
  compact = false,
}: ReviewerBadgeProps) {
  return (
    <div
      className={`inline-flex rotate-[-1.5deg] items-center gap-3 rounded-full border-2 border-white bg-[#FFFDF6] pr-4 ${
        compact ? "py-1 pl-1" : "py-2 pl-2"
      }`}
    >
      <img
        src={reviewer.photo}
        alt={`${reviewer.name}, ${reviewer.credentials}`}
        className={`${compact ? "h-9 w-9" : "h-12 w-12"} rounded-full object-cover`}
      />
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#008F49]">
          Veterinarian reviewed
        </p>
        <p className="truncate text-sm font-bold text-[#073D2A]">
          {reviewer.name}, {reviewer.credentials}
        </p>
        {reviewedAt && (
          <p className="text-xs text-[#637466]">Last reviewed {formatDate(reviewedAt)}</p>
        )}
      </div>
    </div>
  );
}
