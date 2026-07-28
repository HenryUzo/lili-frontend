import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { PetCareArticle } from "../../../data/pet-care-articles";

export function RelatedArticleCard({
  article,
  onArticleClick,
}: {
  article: PetCareArticle;
  onArticleClick?: (article: PetCareArticle) => void;
}) {
  return (
    <article className="rounded-[26px] border-2 border-white bg-[#FFFDF6] p-4 transition hover:-translate-y-0.5">
      <Link
        to={`/pet-care/${article.slug}`}
        onClick={() => onArticleClick?.(article)}
        className="grid gap-4 sm:grid-cols-[112px_1fr]"
      >
        <img
          src={article.heroImage}
          alt={article.heroImageAlt}
          className="aspect-[4/3] w-full rounded-[18px] object-cover"
          loading="lazy"
        />
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#008F49]">
            {article.category.label}
          </span>
          <h3 className="text-lg font-bold leading-tight text-[#073D2A]">
            {article.title}
          </h3>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-[#006838]">
            Read next
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}
