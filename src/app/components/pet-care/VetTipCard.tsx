import type { PetCareReviewer } from "../../../data/pet-care-articles";

export function VetTipCard({
  reviewer,
  quote,
}: {
  reviewer: PetCareReviewer;
  quote: string;
}) {
  return (
    <aside className="grid gap-4 rounded-[30px] border-2 border-white bg-[#FFFDF6] p-5 sm:grid-cols-[96px_1fr]">
      <img
        src={reviewer.photo}
        alt={`${reviewer.name}, ${reviewer.credentials}`}
        className="h-24 w-24 rounded-full object-cover"
      />
      <div>
        <span className="inline-flex rotate-[-3deg] rounded-full bg-[#FFE066] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#073D2A]">
          Vet Tip
        </span>
        <blockquote className="mt-3 text-lg font-bold leading-8 text-[#073D2A]">
          "{quote}"
        </blockquote>
        <p className="mt-2 text-sm font-bold text-[#006838]">
          {reviewer.name}, {reviewer.credentials}
        </p>
      </div>
    </aside>
  );
}
