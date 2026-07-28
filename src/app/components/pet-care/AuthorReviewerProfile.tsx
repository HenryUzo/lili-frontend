import type {
  ArticleAuthor,
  PetCareReviewer,
} from "../../../data/pet-care-articles";

type AuthorReviewerProfileProps = {
  author: ArticleAuthor;
  reviewer?: PetCareReviewer;
};

export function AuthorReviewerProfile({
  author,
  reviewer,
}: AuthorReviewerProfileProps) {
  return (
    <section className="grid gap-4 rounded-[32px] border-2 border-white bg-[#FFFDF6] p-6 sm:grid-cols-[1fr_1.3fr]">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008F49]">
          Written by
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#073D2A]">{author.name}</h2>
        <p className="mt-2 text-sm leading-6 text-[#53635A]">
          Educational content prepared for pet parents by the Lili Vet care team.
        </p>
      </div>
      {reviewer && (
        <div className="flex gap-4 rounded-[24px] bg-[#F2F8EA] p-4">
          <img
            src={reviewer.photo}
            alt={`${reviewer.name}, ${reviewer.credentials}`}
            className="h-20 w-20 shrink-0 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008F49]">
              Veterinarian reviewer
            </p>
            <h3 className="mt-1 text-xl font-bold text-[#073D2A]">
              {reviewer.name}, {reviewer.credentials}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#53635A]">{reviewer.bio}</p>
          </div>
        </div>
      )}
    </section>
  );
}
