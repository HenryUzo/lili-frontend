import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { isMedicallyReviewed, type PetCareArticle } from "../../../data/pet-care-articles";
import { ArticleMeta } from "./ArticleMeta";

type ArticleCardProps = {
  article: PetCareArticle;
  featuredLabel?: boolean;
  variant?: "standard" | "large" | "compact" | "text";
  className?: string;
  onArticleClick?: (article: PetCareArticle) => void;
};

export function ArticleCard({
  article,
  featuredLabel = false,
  variant = "standard",
  className = "",
  onArticleClick,
}: ArticleCardProps) {
  const isCompact = variant === "compact";
  const isText = variant === "text";
  const isLarge = variant === "large";

  return (
    <article
      className={`group relative h-full rounded-[30px] border border-[#D8E8CE] bg-[#FFFDF6] transition duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#006838] ${className}`}
    >
      <Link
        to={`/pet-care/${article.slug}`}
        onClick={() => onArticleClick?.(article)}
        className={`grid h-full overflow-hidden rounded-[28px] ${
          isCompact ? "sm:grid-cols-[140px_1fr]" : ""
        }`}
      >
        {!isText && (
          <div
            className={`relative overflow-hidden bg-[#D6EBAE] ${
              isCompact ? "min-h-full" : isLarge ? "aspect-[16/9]" : "aspect-[16/10]"
            }`}
          >
            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-[13px] font-bold text-[#006838]">
                {article.category.label}
              </span>
              {featuredLabel && (
                <span className="rounded-full bg-[#FFE066] px-3 py-1 text-[13px] font-black text-[#4D3A00]">
                  Featured
                </span>
              )}
            </div>
          </div>
        )}
        <div
          className={`flex flex-col gap-4 ${
            isCompact ? "p-5" : isLarge ? "p-7 md:p-8" : "p-6"
          } ${isText ? "min-h-[260px] border-l-8 border-[#D6EBAE] bg-[#F2F8EA]" : ""}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            {isText && (
              <span className="rounded-full bg-white px-3 py-1 text-[13px] font-bold text-[#006838]">
                {article.category.label}
              </span>
            )}
            <span className="rounded-full bg-[#E9F7DE] px-3 py-1 text-[13px] font-bold text-[#006838]">
              Veterinarian reviewed
            </span>
          </div>
          <h2
            className={`font-bold leading-tight text-[#073D2A] ${
              isLarge ? "text-3xl md:text-4xl" : isCompact ? "text-xl" : "text-2xl"
            }`}
          >
            <span className="[display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
              {article.title}
            </span>
          </h2>
          {!isCompact && (
            <p className="[display:-webkit-box] overflow-hidden text-base leading-7 text-[#53635A] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
              {article.excerpt}
            </p>
          )}
          <div className="mt-auto space-y-4">
            <ArticleMeta
              publishedAt={article.publishedAt}
              reviewedAt={article.reviewedAt}
              reviewer={
                isMedicallyReviewed(article) && article.reviewer
                  ? `${article.reviewer.name}, ${article.reviewer.credentials}`
                  : undefined
              }
              readingTime={article.readingTime}
              compact
            />
            <span className="inline-flex items-center gap-2 font-bold text-[#006838]">
              Read Article
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
