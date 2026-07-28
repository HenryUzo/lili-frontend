import { Link } from "react-router-dom";
import { ArrowRight, NotebookPen, PawPrint } from "lucide-react";
import { isMedicallyReviewed, type PetCareArticle } from "../../../data/pet-care-articles";
import { ArticleMeta } from "./ArticleMeta";
import { ReviewerBadge } from "./ReviewerBadge";

export function FeaturedArticleCard({
  article,
  onArticleClick,
}: {
  article: PetCareArticle;
  onArticleClick?: (article: PetCareArticle) => void;
}) {
  return (
    <article className="relative overflow-hidden rounded-[44px] bg-[#FDF8EA] p-4 md:p-8">
      <div className="absolute right-8 top-8 hidden rotate-12 rounded-full border-2 border-[#006838] bg-[#FFE066] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[#073D2A] lg:block">
        Featured Article
      </div>
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-[620px]">
          <div className="absolute -left-4 top-6 h-full w-full rotate-[-4deg] rounded-[34px] bg-[#D6EBAE]" aria-hidden="true" />
          <div className="relative rotate-[2deg] rounded-[34px] border-[10px] border-white bg-white p-3 transition duration-300 hover:rotate-0">
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              className="aspect-[4/3] w-full rounded-[24px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-8 max-w-[260px] rotate-[-3deg] rounded-[18px] border border-[#E5D8A5] bg-[#FFF8D7] p-4">
            <p className="font-queen text-2xl text-[#ED1C24]">Key takeaway</p>
            <p className="mt-1 text-sm font-bold leading-5 text-[#073D2A]">
              Call early when symptoms are sudden, severe, or getting worse.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 p-2 md:p-4">
          <div className="space-y-4">
            <span className="inline-flex w-fit rotate-[-2deg] items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-[#006838]">
              <PawPrint className="h-4 w-4" aria-hidden="true" />
              {article.category.label}
            </span>
            <p className="font-queen text-4xl leading-none text-[#204E1C]">
              Doctor-reviewed guidance
            </p>
            <h2 className="max-w-2xl text-4xl font-bold leading-[1.02] text-[#073D2A] md:text-6xl">
              {article.title}
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-[#53635A]">
              {article.excerpt}
            </p>
          </div>
          <ArticleMeta
            publishedAt={article.publishedAt}
            reviewedAt={article.reviewedAt}
            readingTime={article.readingTime}
          />
          {isMedicallyReviewed(article) && article.reviewer && (
            <ReviewerBadge reviewer={article.reviewer} reviewedAt={article.reviewedAt} />
          )}
          <Link
            to={`/pet-care/${article.slug}`}
            onClick={() => onArticleClick?.(article)}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#006838] px-6 py-3 font-bold text-white transition hover:bg-[#004F2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
          >
            <NotebookPen className="h-4 w-4" aria-hidden="true" />
            Read Article
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
