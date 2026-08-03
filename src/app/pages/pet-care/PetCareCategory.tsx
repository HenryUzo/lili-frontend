import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, CalendarCheck, Phone, ShieldCheck } from "lucide-react";
import Seo from "../../components/seo/Seo";
import {
  ArticleBreadcrumbs,
  ArticleMeta,
  CategoryFilters,
  PetCareEmptyState,
  PetCareSearch,
  ReviewerBadge,
} from "../../components/pet-care";
import {
  getCategoryBySlug,
  getPublishedArticles,
  isMedicallyReviewed,
  searchArticles,
  usePublishedPetCareContent,
  type PetCareArticle,
  type PetCareCategorySlug,
} from "../../../data/pet-care-articles";
import { ROUTE } from "../../../router";
import {
  CLINIC_PHONE_DISPLAY,
  CLINIC_PHONE_NUMBER,
  trackCallClick,
} from "../../../lib/analytics";
import {
  trackPetCareAppointmentClick,
  trackPetCareCallClick,
  trackPetCareCategoryClick,
  trackPetCareRelatedArticleClick,
  trackPetCareSearch,
  trackPetCareUrgentCareClick,
} from "../../../lib/pet-care-analytics";
import images from "../../assests/images";

const categoryIntros: Partial<Record<PetCareCategorySlug, string>> = {
  "urgent-care":
    "Learn which symptoms may need prompt veterinary attention, what you can safely monitor, and when to contact Lili Veterinary Hospital.",
  dogs: "Practical dog care guidance for symptoms, prevention, behavior changes, and everyday health decisions.",
  cats: "Calm, useful guidance for cat parents, from appetite changes to preventive care.",
  "puppy-kitten-care":
    "Early-life care topics for vaccines, wellness exams, safety, and confident first visits.",
  "preventive-care":
    "Resources that help pet parents stay ahead of health changes through routine veterinary care.",
  vaccinations:
    "Vaccine guidance for puppies, kittens, adult pets, boosters, and protection in San Antonio.",
  "dental-health":
    "Learn how oral health affects comfort, appetite, breath, and long-term wellbeing.",
  "surgery-recovery":
    "Preparation and recovery resources for pet parents before and after veterinary procedures.",
  "wellness-plans":
    "Understand how wellness plans support predictable preventive care through each life stage.",
  "seasonal-pet-safety":
    "Local South Texas safety guidance for heat, holidays, parasites, and outdoor risks.",
};

const categoryHeroImages: Partial<Record<PetCareCategorySlug, string>> = {
  "urgent-care": images.cozyPet,
  dogs: images.dogHead,
  cats: images.catResting,
  "puppy-kitten-care": images.puppyPlan,
  "preventive-care": images.petExam,
  vaccinations: images.injectionBottle,
  "dental-health": images.dentalCareBg,
  "surgery-recovery": images.modernRecoveryArea,
  "wellness-plans": images.servicesBg,
  "seasonal-pet-safety": images.happyDogs,
};

const categoryFeaturedImages: Partial<Record<PetCareCategorySlug, string>> = {
  "urgent-care": images.doctreatdog,
  dogs: images.dogPlan,
  cats: images.catResting,
  "puppy-kitten-care": images.puppyPlan,
  "preventive-care": images.calmDogWithVet,
  vaccinations: images.injection,
  "dental-health": images.oneTooth,
  "surgery-recovery": images.modernRecoveryArea,
  "wellness-plans": images.wellnessPlanXray,
  "seasonal-pet-safety": images.happyDogs,
};

const categoryFeaturedImageAlt: Partial<Record<PetCareCategorySlug, string>> = {
  "urgent-care": "Veterinarian examining and comforting a dog during an urgent-care visit",
  dogs: "Dog wellness plan image",
  cats: "Resting cat being monitored at home",
  "puppy-kitten-care": "Young puppy receiving preventive veterinary care",
  "preventive-care": "Veterinarian examining a pet",
  vaccinations: "Vaccine care supplies",
  "dental-health": "Pet dental care image",
  "surgery-recovery": "Modern veterinary recovery area",
  "wellness-plans": "Veterinary wellness planning with diagnostic imaging",
  "seasonal-pet-safety": "Dogs outdoors during warm South Texas weather",
};

function CategoryArticleCard({
  article,
  onArticleClick,
}: {
  article: PetCareArticle;
  onArticleClick?: (article: PetCareArticle) => void;
}) {
  return (
    <article className="group h-full rounded-[28px] border border-[#D8E8CE] bg-[#FFFDF6] transition duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#006838]">
      <Link
        to={`/pet-care/${article.slug}`}
        onClick={() => onArticleClick?.(article)}
        className="flex h-full flex-col overflow-hidden rounded-[27px]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#D6EBAE]">
          <img
            src={article.heroImage}
            alt={article.heroImageAlt}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-bold text-[#006838]">
            {article.category.label}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <h3 className="text-[26px] font-bold leading-tight text-[#073D2A]">
            <span className="[display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
              {article.title}
            </span>
          </h3>
          <p className="[display:-webkit-box] overflow-hidden text-base leading-7 text-[#53635A] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
            {article.excerpt}
          </p>
          <div className="mt-auto space-y-4">
            <ArticleMeta
              publishedAt={article.publishedAt}
              reviewedAt={article.reviewedAt}
              reviewer="Veterinarian reviewed"
              readingTime={article.readingTime}
              compact
            />
            <span className="inline-flex items-center gap-2 text-base font-bold text-[#006838]">
              Read Article
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function FeaturedCategoryArticle({
  article,
  image,
  imageAlt,
  onArticleClick,
}: {
  article: PetCareArticle;
  image: string;
  imageAlt: string;
  onArticleClick?: (article: PetCareArticle) => void;
}) {
  return (
    <article className="grid overflow-hidden rounded-[34px] border border-[#D8E8CE] bg-[#FFFDF6] lg:grid-cols-[0.95fr_1.05fr]">
      <Link
        to={`/pet-care/${article.slug}`}
        onClick={() => onArticleClick?.(article)}
        className="relative block min-h-[280px] overflow-hidden bg-[#D6EBAE] lg:min-h-[420px]"
      >
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
        />
        <span className="absolute left-5 top-5 rounded-full bg-[#FFE066] px-4 py-2 text-sm font-black uppercase tracking-[0.1em] text-[#073D2A]">
          Featured Article
        </span>
      </Link>
      <div className="flex flex-col justify-center gap-5 p-7 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#E9F7DE] px-3 py-1 text-sm font-bold text-[#006838]">
            {article.category.label}
          </span>
          <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-[#006838]">
            {article.readingTime}
          </span>
        </div>
        <h2 className="text-4xl font-bold leading-tight text-[#073D2A] md:text-[44px]">
          {article.title}
        </h2>
        <p className="max-w-2xl text-lg leading-8 text-[#53635A]">
          {article.excerpt}
        </p>
        <ArticleMeta
          publishedAt={article.publishedAt}
          reviewedAt={article.reviewedAt}
          readingTime={article.readingTime}
        />
        {isMedicallyReviewed(article) && article.reviewer && (
          <ReviewerBadge reviewer={article.reviewer} reviewedAt={article.reviewedAt} compact />
        )}
        <Link
          to={`/pet-care/${article.slug}`}
          onClick={() => onArticleClick?.(article)}
          className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full bg-[#006838] px-6 py-3 font-bold text-white transition hover:bg-[#004F2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
        >
          Read Article
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function PetCareCategory() {
  usePublishedPetCareContent();
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);
  const [searchTerm, setSearchTerm] = useState("");

  const categoryArticles = useMemo(() => {
    if (!category) return [];
    return getPublishedArticles().filter((article) => article.categorySlug === category.slug);
  }, [category]);

  const filteredArticles = useMemo(
    () => searchArticles(categoryArticles, searchTerm),
    [categoryArticles, searchTerm],
  );

  useEffect(() => {
    if (!category || !searchTerm.trim()) return undefined;

    const timeout = window.setTimeout(() => {
      trackPetCareSearch({
        result_count: filteredArticles.length,
        article_category: category.slug,
      });
    }, 600);

    return () => window.clearTimeout(timeout);
  }, [category, filteredArticles.length, searchTerm]);

  if (!category) {
    return (
      <main className="bg-[#F7FAF2] px-4 py-20 md:px-8 xl:px-12">
        <Seo
          title="Pet Care Category Not Found | Lili Veterinary Hospital"
          description="The requested pet care category could not be found."
          path={`/pet-care/category/${categorySlug ?? ""}`}
          noIndex
        />
        <div className="mx-auto max-w-[960px]">
          <PetCareEmptyState
            title="We couldn't find that pet care category."
            text="Browse all articles or choose another category from the Pet Care Library."
          />
        </div>
      </main>
    );
  }

  const featured = filteredArticles[0] ?? categoryArticles[0];
  const directGridArticles = filteredArticles.filter((article) => article.id !== featured?.id);
  const fallbackGridArticles = getPublishedArticles()
    .filter((article) => article.id !== featured?.id && article.categorySlug !== category.slug)
    .slice(0, 3);
  const gridArticles =
    directGridArticles.length > 0 || searchTerm ? directGridArticles : fallbackGridArticles;
  const archiveGridClass = gridArticles.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";
  const heroImage = categoryHeroImages[category.slug] ?? images.cutedogcat;
  const featuredImage = categoryFeaturedImages[category.slug] ?? featured?.heroImage;
  const featuredImageAlt = categoryFeaturedImageAlt[category.slug] ?? featured?.heroImageAlt ?? "";

  return (
    <main className="bg-[#F7FAF2] text-[#073D2A]">
      <Seo
        title={`${category.label} Articles | Lili Vet Pet Care Library`}
        description={categoryIntros[category.slug] ?? category.description}
        path={`/pet-care/category/${category.slug}`}
      />

      <section className="relative overflow-hidden bg-[#F2F7EE] px-4 py-10 md:px-8 lg:py-14 xl:px-12">
        <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-[#D6EBAE]" aria-hidden="true" />
        <div className="mx-auto grid max-w-[1320px] gap-8 lg:min-h-[460px] lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative z-10 space-y-5">
            <ArticleBreadcrumbs
              items={[
                { label: "Pet Care Library", to: "/pet-care" },
                { label: category.label },
              ]}
            />
            <span className="inline-flex rounded-full bg-[#E9F7DE] px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-[#006838]">
              {category.label}
            </span>
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-none text-[#073D2A] md:text-7xl">
                {category.label}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#53635A]">
                {categoryIntros[category.slug] ?? category.description}
              </p>
            </div>
            <PetCareSearch
              value={searchTerm}
              onChange={setSearchTerm}
              resultCount={filteredArticles.length}
              placeholder={`Search ${category.label.toLowerCase()} articles...`}
              variant="plain"
            />
          </div>
          <div className="relative min-h-[320px] lg:min-h-[420px]">
            <div className="absolute left-8 top-6 h-72 w-72 rounded-full bg-[#D6EBAE]" aria-hidden="true" />
            <div className="absolute right-8 bottom-6 h-40 w-40 rounded-full bg-[#FFE8A8]" aria-hidden="true" />
            <img
              src={heroImage}
              alt={`${category.label} pet care guidance`}
              className="absolute left-1/2 top-1/2 z-10 h-[min(72vw,380px)] w-[min(88vw,580px)] -translate-x-1/2 -translate-y-1/2 rounded-[36px] object-cover"
            />
            <div className="absolute right-2 top-2 z-20 rounded-full border-4 border-white bg-[#FFFDF6] p-4 text-center">
              <ShieldCheck className="mx-auto h-6 w-6 text-[#006838]" aria-hidden="true" />
              <p className="mt-2 max-w-[118px] text-xs font-black uppercase leading-4 text-[#073D2A]">
                Veterinarian reviewed
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#D8E8CE] bg-white/70 px-4 py-4 md:px-8 xl:px-12">
        <div className="mx-auto max-w-[1320px]">
          <CategoryFilters
            activeSlug={category.slug}
            asLinks
            compact
            ctaLocation="pet_care_category_nav"
            onCategoryClick={(slug, ctaLocation) =>
              trackPetCareCategoryClick({
                article_category: slug,
                cta_location: ctaLocation,
              })
            }
          />
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 lg:py-16 xl:px-12">
        <div className="mx-auto max-w-[1320px]">
          {featured && featuredImage ? (
            <FeaturedCategoryArticle
              article={featured}
              image={featuredImage}
              imageAlt={featuredImageAlt}
              onArticleClick={(article) =>
                trackPetCareRelatedArticleClick({
                  article_slug: `category:${category.slug}`,
                  related_article_slug: article.slug,
                  cta_location: "pet_care_category_featured",
                })
              }
            />
          ) : (
            <PetCareEmptyState onClear={() => setSearchTerm("")} />
          )}
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 xl:px-12">
        <div className="mx-auto max-w-[1320px] space-y-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008F49]">
              Archive
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#073D2A] md:text-4xl">
              More {category.label.toLowerCase()} articles
            </h2>
          </div>

          {gridArticles.length > 0 ? (
            <div className={`grid gap-6 md:grid-cols-2 ${archiveGridClass}`}>
              {gridArticles.map((article) => (
                <CategoryArticleCard
                  key={article.id}
                  article={article}
                  onArticleClick={(clickedArticle) =>
                    trackPetCareRelatedArticleClick({
                      article_slug: `category:${category.slug}`,
                      related_article_slug: clickedArticle.slug,
                      cta_location: "pet_care_category_archive",
                    })
                  }
                />
              ))}
            </div>
          ) : searchTerm ? (
            <PetCareEmptyState onClear={() => setSearchTerm("")} />
          ) : (
            <PetCareEmptyState
              title="No articles are available in this category yet."
              text="Browse all articles, try another category, or book an appointment if you are concerned about your pet."
            />
          )}
        </div>
      </section>

      <section className="px-4 py-8 md:px-8 xl:px-12">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-5 rounded-[28px] border border-[#E6DCA6] bg-[#FFF8D7] p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <img
              src={images.drOkafor}
              alt="Dr. Olatade Okafor, DVM"
              className="h-16 w-16 rounded-full border-4 border-white object-cover"
            />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-[#008F49]">
                Vet Guidance
              </p>
              <h2 className="mt-1 text-2xl font-bold leading-tight text-[#073D2A] md:text-3xl">
                If symptoms feel urgent, call before waiting.
              </h2>
              <p className="mt-2 max-w-3xl text-base leading-7 text-[#53635A]">
                A short phone conversation can help decide whether your pet should be seen today,
                monitored at home, or directed to emergency care.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${CLINIC_PHONE_NUMBER}`}
              onClick={() => {
                trackCallClick("pet_care_category_guidance");
                trackPetCareCallClick({
                  article_slug: null,
                  article_category: category.slug,
                  cta_location: "pet_care_category_guidance",
                });
              }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#006838] px-5 py-3 font-bold text-white transition hover:bg-[#004F2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Lili Vet
            </a>
            <Link
              to={ROUTE.urgentCare}
              onClick={() =>
                trackPetCareUrgentCareClick({
                  article_slug: null,
                  article_category: category.slug,
                  cta_location: "pet_care_category_guidance",
                })
              }
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8BC] bg-white px-5 py-3 font-bold text-[#006838] transition hover:bg-[#E9F7DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
            >
              View Urgent Care
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 pb-20 md:px-8 xl:px-12">
        <div className="mx-auto grid max-w-[1320px] overflow-hidden rounded-[38px] bg-[#073D2A] lg:min-h-[380px] lg:grid-cols-[0.95fr_1.05fr]">
          <img
            src={images.calmDogWithVet}
            alt="Veterinarian comforting a dog during a clinic visit"
            className="h-full min-h-[280px] w-full object-cover"
            loading="lazy"
          />
          <div className="flex flex-col justify-center p-7 text-white md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#BEEB9F]">
              Lili Vet Care Team
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
              Need urgent care guidance for your pet?
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-white/80">
              Our team can help you choose the right next step, from booking a visit to deciding
              whether symptoms need prompt attention.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={ROUTE.bookAppointment}
                onClick={() =>
                  trackPetCareAppointmentClick({
                    article_slug: null,
                    article_category: category.slug,
                    cta_location: "pet_care_category_final_cta",
                  })
                }
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-[#006838] transition hover:bg-[#E9F7DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Book an Appointment
              </Link>
              <Link
                to={ROUTE.urgentCare}
                onClick={() =>
                  trackPetCareUrgentCareClick({
                    article_slug: null,
                    article_category: category.slug,
                    cta_location: "pet_care_category_final_cta",
                  })
                }
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Visit Urgent Care
              </Link>
              <a
                href={`tel:${CLINIC_PHONE_NUMBER}`}
                onClick={() => {
                  trackCallClick("pet_care_category_final_cta");
                  trackPetCareCallClick({
                    article_slug: null,
                    article_category: category.slug,
                    cta_location: "pet_care_category_final_cta",
                  });
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-2 py-3 font-bold text-[#BEEB9F] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-4"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {CLINIC_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
