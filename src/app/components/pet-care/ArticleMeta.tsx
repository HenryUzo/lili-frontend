import { CalendarDays, Clock3, UserRound } from "lucide-react";

type ArticleMetaProps = {
  author?: string;
  reviewer?: string;
  publishedAt: string;
  reviewedAt?: string;
  readingTime: string;
  compact?: boolean;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function ArticleMeta({
  author,
  reviewer,
  publishedAt,
  reviewedAt,
  readingTime,
  compact = false,
}: ArticleMetaProps) {
  const itemClass = "inline-flex items-center gap-2";

  return (
    <dl
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#53635A] ${
        compact ? "text-xs" : ""
      }`}
    >
      {author && (
        <div className={itemClass}>
          <UserRound className="h-4 w-4 text-[#008F49]" aria-hidden="true" />
          <dt className="sr-only">Author</dt>
          <dd>{author}</dd>
        </div>
      )}
      <div className={itemClass}>
        <CalendarDays className="h-4 w-4 text-[#008F49]" aria-hidden="true" />
        <dt className="sr-only">Published</dt>
        <dd>Published {formatDate(publishedAt)}</dd>
      </div>
      {reviewedAt && (
        <div className={itemClass}>
          <dt className="sr-only">Reviewed</dt>
          <dd>Reviewed {formatDate(reviewedAt)}</dd>
        </div>
      )}
      {reviewer && (
        <div className={itemClass}>
          <dt className="sr-only">Reviewer</dt>
          <dd>{reviewer}</dd>
        </div>
      )}
      <div className={itemClass}>
        <Clock3 className="h-4 w-4 text-[#008F49]" aria-hidden="true" />
        <dt className="sr-only">Reading time</dt>
        <dd>{readingTime}</dd>
      </div>
    </dl>
  );
}
