import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Home, ListChecks, ShieldCheck } from "lucide-react";
import Seo from "../../components/seo/Seo";
import {
  ArticleChecklist,
  ArticleBreadcrumbs,
  ArticleMeta,
  AuthorReviewerProfile,
  DecorativeAnnotation,
  InlineServiceCTA,
  MedicalDisclaimer,
  NotebookInfoCard,
  NewsletterModule,
  PetCareEmptyState,
  RelatedArticleCard,
  ReviewerBadge,
  UrgentWarningBox,
  VetTipCard,
} from "../../components/pet-care";
import {
  getArticleBySlug,
  getRelatedArticles,
  isMedicallyReviewed,
  usePublishedPetCareContent,
} from "../../../data/pet-care-articles";
import {
  buildArticleFaqStructuredData,
  buildArticleStructuredData,
  buildPetCareBreadcrumbStructuredData,
} from "../../../data/pet-care-seo";
import {
  trackPetCareArticleView,
  trackPetCareCategoryClick,
  trackPetCareRelatedArticleClick,
  usePetCareArticleScrollDepth,
} from "../../../lib/pet-care-analytics";
import images from "../../assests/images";

export function PetCareArticle() {
  usePublishedPetCareContent();
  const { articleSlug } = useParams();
  const article = getArticleBySlug(articleSlug);
  const articleAnalyticsContext = {
    article_slug: article?.slug ?? articleSlug ?? "unknown",
    article_category: article?.categorySlug ?? "unknown",
  };
  const articleContentRef = usePetCareArticleScrollDepth(articleAnalyticsContext);

  useEffect(() => {
    if (!article) return;

    trackPetCareArticleView({
      article_slug: article.slug,
      article_category: article.categorySlug,
      article_author_id: article.author.id,
      article_reviewer_id: article.reviewerId,
    });
  }, [article]);

  if (!article) {
    return (
      <main className="bg-[#F7FAF2] px-4 py-20 md:px-8 xl:px-12">
        <Seo
          title="Pet Care Article Not Found | Lili Veterinary Hospital"
          description="The requested pet care article could not be found."
          path={`/pet-care/${articleSlug ?? ""}`}
          noIndex
        />
        <div className="mx-auto max-w-[960px]">
          <PetCareEmptyState
            title="We couldn't find that article."
            text="Browse all articles or choose another topic from the Pet Care Library."
          />
        </div>
      </main>
    );
  }

  const relatedArticles = getRelatedArticles(article);
  const medicallyReviewed = isMedicallyReviewed(article);
  const structuredData = [
    buildArticleStructuredData(article),
    buildPetCareBreadcrumbStructuredData([
      { name: "Home", path: "/" },
      { name: "Pet Care Library", path: "/pet-care" },
      {
        name: article.category.label,
        path: `/pet-care/category/${article.categorySlug}`,
      },
      { name: article.title, path: `/pet-care/${article.slug}` },
    ]),
    buildArticleFaqStructuredData(article),
  ].filter((item): item is Record<string, unknown> => Boolean(item));

  return (
    <main className="bg-[#F7FAF2] text-[#073D2A]">
      <Seo
        title={article.seoTitle}
        description={article.seoDescription}
        path={`/pet-care/${article.slug}`}
        image={article.heroImage}
        type="article"
        publishedTime={article.publishedAt}
        modifiedTime={article.updatedAt}
        author={article.author.name}
        structuredData={structuredData}
      />

      <article>
        <header className="relative overflow-hidden bg-[#F2F7EE] px-4 py-14 md:px-8 lg:py-20 xl:px-12">
          <div className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-[#D6EBAE]" aria-hidden="true" />
          <div className="mx-auto max-w-[1180px] space-y-8">
            <ArticleBreadcrumbs
              items={[
                { label: "Pet Care Library", to: "/pet-care" },
                {
                  label: article.category.label,
                  to: `/pet-care/category/${article.categorySlug}`,
                },
                { label: article.title },
              ]}
            />
            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="space-y-6">
              <Link
                to={`/pet-care/category/${article.categorySlug}`}
                onClick={() =>
                  trackPetCareCategoryClick({
                    article_category: article.categorySlug,
                    cta_location: "pet_care_article_header",
                  })
                }
                className="inline-flex rounded-full bg-[#E9F7DE] px-4 py-2 text-sm font-bold text-[#006838] transition hover:bg-[#DDF1CD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
              >
                {article.category.label}
              </Link>
              <h1 className="max-w-5xl text-5xl font-bold leading-[1.02] text-[#073D2A] md:text-7xl">
                {article.title}
              </h1>
              <p className="font-queen text-4xl leading-none text-[#ED1C24]">
                Calm answers for pet parents
              </p>
              <p className="max-w-4xl text-xl leading-9 text-[#53635A]">
                {article.summary}
              </p>
              <ArticleMeta
                author={article.author.name}
                reviewer={
                  medicallyReviewed && article.reviewer
                    ? `${article.reviewer.name}, ${article.reviewer.credentials}`
                    : undefined
                }
                publishedAt={article.publishedAt}
                reviewedAt={article.reviewedAt}
                readingTime={article.readingTime}
              />
              {medicallyReviewed && article.reviewer && (
                <ReviewerBadge reviewer={article.reviewer} reviewedAt={article.reviewedAt} />
              )}
              </div>
              <div className="relative min-h-[420px]">
                <div className="absolute left-6 top-8 h-80 w-80 rounded-full bg-[#D6EBAE]" aria-hidden="true" />
                <div className="absolute right-8 top-20 h-52 w-52 rounded-full bg-[#FFE066]" aria-hidden="true" />
                <div className="absolute left-1/2 top-1/2 z-10 w-[min(88vw,610px)] -translate-x-1/2 -translate-y-1/2 rotate-[2deg] rounded-[42px] border-[12px] border-white bg-white p-3">
                  <img
                    src={article.heroImage}
                    alt={article.heroImageAlt}
                    className="aspect-[4/3] w-full rounded-[30px] object-cover"
                  />
                </div>
                <DecorativeAnnotation className="absolute left-0 top-8 z-20">
                  Vet reviewed
                </DecorativeAnnotation>
                <div className="absolute right-0 top-0 z-20 rotate-6 rounded-full border-4 border-white bg-[#FFFDF6] p-5 text-center">
                  <ShieldCheck className="mx-auto h-7 w-7 text-[#006838]" aria-hidden="true" />
                  <p className="mt-2 max-w-[120px] text-sm font-black uppercase leading-4 text-[#073D2A]">
                    Reviewed guide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 pb-20 md:px-8 xl:px-12">
          <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[230px_minmax(0,1fr)_260px]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rotate-[-1deg] rounded-[28px] border-2 border-white bg-[#FFFDF6] p-5">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-[#008F49]">
                  <ListChecks className="h-4 w-4" aria-hidden="true" />
                  On this page
                </div>
                <nav className="mt-4 space-y-2" aria-label="Article table of contents">
                  {article.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-[#53635A] transition hover:bg-[#F2F8EA] hover:text-[#006838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006838]"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
            <aside className="order-last hidden lg:block">
              <div className="sticky top-28 space-y-5">
                {medicallyReviewed && article.reviewer && (
                  <VetTipCard
                    reviewer={article.reviewer}
                    quote="When you are unsure, calling early is often the safest next step."
                  />
                )}
                <InlineServiceCTA
                  title="Need help deciding?"
                  text="Our team can help route you to the right care option."
                  servicePath={article.relatedService.path}
                  serviceLabel={article.relatedService.title}
                  articleSlug={article.slug}
                  articleCategory={article.categorySlug}
                  ctaLocation="pet_care_article_sidebar"
                />
              </div>
            </aside>

            <div ref={articleContentRef} className="min-w-0 space-y-10">
              <details className="rounded-[24px] border border-[#D8E8CE] bg-white p-4 lg:hidden">
                <summary className="cursor-pointer font-bold text-[#073D2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]">
                  On this page
                </summary>
                <nav
                  className="mt-3 flex snap-x gap-2 overflow-x-auto pb-2"
                  aria-label="Article table of contents"
                >
                  {article.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="snap-start whitespace-nowrap rounded-full border border-[#CFE8BC] px-4 py-2 text-sm font-bold text-[#006838]"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </details>

              <NotebookInfoCard title="Key takeaways">
                <ArticleChecklist items={article.keyTakeaways} />
              </NotebookInfoCard>

              <UrgentWarningBox>
                If your pet is struggling to breathe, unconscious, having uncontrolled
                seizures, experiencing severe trauma, or showing another critical
                emergency, call immediately or go to the nearest emergency animal hospital.
              </UrgentWarningBox>

              {article.sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 space-y-5"
                >
                  <h2 className="text-3xl font-bold leading-tight text-[#073D2A] md:text-4xl">
                    {section.title}
                  </h2>
                  {section.type === "IMAGE" && section.imageUrl ? (
                    <figure>
                      <img
                        src={section.imageUrl}
                        alt={section.imageAlt ?? ""}
                        className="max-h-[680px] w-full rounded-lg object-cover"
                        loading="lazy"
                      />
                      {section.caption ? (
                        <figcaption className="mt-3 text-sm leading-6 text-[#66786F]">
                          {section.caption}
                        </figcaption>
                      ) : null}
                    </figure>
                  ) : (
                    section.content.map((paragraph) => (
                      <p key={paragraph} className="text-lg leading-9 text-[#384A40]">
                        {paragraph}
                      </p>
                    ))
                  )}
                  {section.bullets && (
                    <NotebookInfoCard title="Signs to watch" tone="gold">
                      <ArticleChecklist items={section.bullets} />
                    </NotebookInfoCard>
                  )}
                  {index === 1 && (
                    <InlineServiceCTA
                      servicePath={article.relatedService.path}
                      serviceLabel={article.relatedService.title}
                      articleSlug={article.slug}
                      articleCategory={article.categorySlug}
                      ctaLocation="pet_care_article_inline"
                    />
                  )}
                  {index === 2 && medicallyReviewed && article.reviewer && (
                    <VetTipCard
                      reviewer={article.reviewer}
                      quote="A symptom video, timeline, and medication list can make the visit more useful."
                    />
                  )}
                </section>
              ))}

              <NotebookInfoCard title="What you can monitor at home">
                <ArticleChecklist items={article.monitorAtHome} />
              </NotebookInfoCard>

              <section className="relative overflow-hidden rounded-[40px] bg-[#E9F7DE] p-5 md:p-8">
                <img src={images.cozyPet} alt="" aria-hidden="true" className="absolute -right-16 -bottom-16 hidden w-80 opacity-25 lg:block" />
                <p className="font-queen text-4xl text-[#ED1C24]">
                  Frequently Asked Questions
                </p>
                <h2 className="mt-2 text-3xl font-bold text-[#073D2A]">
                  Frequently asked questions
                </h2>
                <div className="grid gap-4">
                  {article.faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="rounded-[22px] border-2 border-white bg-white/90 p-5 backdrop-blur"
                    >
                      <summary className="cursor-pointer text-lg font-bold text-[#073D2A]">
                        {faq.question}
                      </summary>
                      <p className="mt-3 leading-7 text-[#53635A]">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              <InlineServiceCTA
                title={`Related service: ${article.relatedService.title}`}
                text="If this topic matches what you are seeing at home, the related service page can help you understand how Lili Vet supports that care need."
                servicePath={article.relatedService.path}
                serviceLabel={`Visit ${article.relatedService.title}`}
                articleSlug={article.slug}
                articleCategory={article.categorySlug}
                ctaLocation="pet_care_article_related_service"
              />

              <section className="space-y-5">
                <h2 className="text-3xl font-bold text-[#073D2A]">Related articles</h2>
                <div className="grid gap-4">
                  {relatedArticles.map((relatedArticle) => (
                    <RelatedArticleCard
                      key={relatedArticle.id}
                      article={relatedArticle}
                      onArticleClick={(clickedArticle) =>
                        trackPetCareRelatedArticleClick({
                          article_slug: article.slug,
                          related_article_slug: clickedArticle.slug,
                          cta_location: "pet_care_article_related_articles",
                        })
                      }
                    />
                  ))}
                </div>
              </section>

              <AuthorReviewerProfile author={article.author} reviewer={article.reviewer} />
              <MedicalDisclaimer />

              <section className="rounded-[24px] border border-[#D8E8CE] bg-white p-6">
                <h2 className="text-2xl font-bold text-[#073D2A]">References</h2>
                <ul className="mt-4 grid gap-2 text-sm leading-6 text-[#53635A]">
                  {article.references.map((reference) => (
                    <li key={reference.label}>
                      {reference.url ? (
                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-[#006838] underline-offset-4 hover:underline"
                        >
                          {reference.label}
                        </a>
                      ) : (
                        reference.label
                      )}
                    </li>
                  ))}
                </ul>
              </section>

              <NewsletterModule />

              <Link
                to="/pet-care"
                className="inline-flex items-center gap-2 rounded-full font-bold text-[#006838] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                Back to Pet Care Library
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
