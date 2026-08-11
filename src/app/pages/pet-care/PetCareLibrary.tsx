import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, HeartPulse, Phone, ShieldCheck } from "lucide-react";
import Seo from "../../components/seo/Seo";
import {
  ArticleCard,
  CategoryFilters,
  DecorativeAnnotation,
  FeaturedArticleCard,
  NewsletterModule,
  PetCareEmptyState,
  PetCareSearch,
} from "../../components/pet-care";
import {
  petCareArticles,
  petCareCategories,
  getFeaturedArticle,
  getLatestArticles,
  getPopularArticles,
  getPublishedArticles,
  getPublishedCategories,
  getSeasonalArticles,
  searchArticles,
  usePublishedPetCareContent,
  type PetCareCategorySlug,
} from "../../../data/pet-care-articles";
import { ROUTE } from "../../../router";
import {
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

const primaryCategorySlugs: PetCareCategorySlug[] = [
  "urgent-care",
  "dogs",
  "cats",
  "puppy-kitten-care",
  "preventive-care",
  "wellness-plans",
];

const categoryImages: Record<string, string> = {
  "urgent-care": images.sirenLight,
  dogs: images.dogHead,
  cats: images.cartoonCat,
  "puppy-kitten-care": images.puppyPlan,
  "preventive-care": images.stethoscope,
  vaccinations: images.injectionBottle,
  "dental-health": images.oneTooth,
  "surgery-recovery": images.maleSurgeon,
  "wellness-plans": images.bestValue,
  "seasonal-pet-safety": images.happyDogs,
};

export function PetCareLibrary() {
  usePublishedPetCareContent();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<PetCareCategorySlug | "all">("all");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const featuredArticle = getFeaturedArticle();

  const filteredArticles = useMemo(() => {
    const categoryArticles =
      activeCategory === "all"
        ? getPublishedArticles()
        : getPublishedArticles().filter((article) => article.categorySlug === activeCategory);

    return searchArticles(categoryArticles, searchTerm);
  }, [activeCategory, searchTerm]);

  const popularArticles = getPopularArticles(3);
  const seasonalArticles = getSeasonalArticles(3);
  const baseLatestArticles = getLatestArticles(6);
  const latestArticles = searchTerm || activeCategory !== "all"
    ? filteredArticles.filter(
        (article) =>
          article.id !== featuredArticle?.id &&
          !popularArticles.some((popularArticle) => popularArticle.id === article.id),
      )
    : baseLatestArticles;
  const visibleCategories = showAllCategories
    ? getPublishedCategories()
    : petCareCategories
        .filter((category) => primaryCategorySlugs.includes(category.slug))
        .filter((category) =>
          getPublishedArticles().some((article) => article.categorySlug === category.slug),
        );

  useEffect(() => {
    if (!searchTerm.trim()) return undefined;

    const timeout = window.setTimeout(() => {
      trackPetCareSearch({
        result_count: filteredArticles.length,
        article_category: activeCategory,
      });
    }, 600);

    return () => window.clearTimeout(timeout);
  }, [activeCategory, filteredArticles.length, searchTerm]);

  return (
    <main className="bg-[#F7FAF2] text-[#073D2A]">
      <Seo
        title="Pet Care Library | Lili Veterinary Hospital"
        description="Veterinarian-reviewed pet care guidance for San Antonio dog and cat parents from Lili Veterinary Hospital."
        path="/pet-care"
      />

      <section className="relative overflow-hidden bg-[#F2F7EE] px-4 py-10 sm:py-12 md:px-8 lg:min-h-[calc(100svh-120px)] lg:py-20 xl:px-12">
        <div className="absolute -right-28 top-8 hidden h-80 w-80 rounded-full bg-[#D6EBAE] lg:block" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 hidden h-48 w-full rounded-t-[60%] bg-white/55 lg:block" aria-hidden="true" />
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-6 lg:space-y-7">
            <div className="inline-flex rotate-[-2deg] rounded-full border-2 border-white bg-[#D6EBAE] px-4 py-2 font-queen text-xl text-[#204E1C] sm:text-2xl">
              Lili Vet Pet Care Library
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-[42px] font-bold leading-[0.96] tracking-normal text-[#073D2A] sm:text-5xl md:text-7xl lg:text-[86px]">
                Helpful guidance for every stage of your pet's{" "}
                <span className="text-[#ED1C24]">life</span>
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-[#53635A] sm:text-xl sm:leading-9">
                Veterinarian-reviewed guidance to help San Antonio pet parents make
                confident decisions about their pets' health and care.
              </p>
            </div>
            <div className="space-y-3">
              <PetCareSearch
                value={searchTerm}
                onChange={setSearchTerm}
                resultCount={filteredArticles.length}
              />
              <div className="flex flex-wrap gap-2 text-sm">
                {[
                  "Dog vomiting",
                  "Cat not eating",
                  "Vaccination schedule",
                  "Dental cleaning",
                  "Heatstroke",
                ].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchTerm(term)}
                    className="min-h-10 rounded-full border border-[#CFE8BC] bg-white px-4 font-bold text-[#006838] transition hover:bg-[#E9F7DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006838]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to={ROUTE.bookAppointment}
                onClick={() =>
                  trackPetCareAppointmentClick({
                    article_slug: null,
                    article_category: null,
                    cta_location: "pet_care_library_hero",
                  })
                }
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#006838] px-6 py-3 font-bold text-white transition hover:bg-[#004F2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Book an Appointment
              </Link>
              <Link
                to={ROUTE.urgentCare}
                onClick={() =>
                  trackPetCareUrgentCareClick({
                    article_slug: null,
                    article_category: null,
                    cta_location: "pet_care_library_hero",
                  })
                }
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#CFE8BC] bg-white px-6 py-3 font-bold text-[#006838] transition hover:bg-[#E9F7DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
              >
                <HeartPulse className="h-4 w-4" aria-hidden="true" />
                View Urgent Care
              </Link>
            </div>
          </div>
          <div className="relative hidden min-h-[520px] lg:block">
            <div className="absolute left-1/2 top-6 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-[#D6EBAE] sm:h-[360px] sm:w-[360px] lg:left-8 lg:top-10 lg:h-[420px] lg:w-[420px] lg:translate-x-0" aria-hidden="true" />
            <div className="absolute right-5 top-10 h-[160px] w-[160px] rounded-full bg-[#FFE066] sm:right-8 sm:top-16 sm:h-[210px] sm:w-[210px] lg:top-20 lg:h-[260px] lg:w-[260px]" aria-hidden="true" />
            <img
              src={images.cutedogcat}
              alt="Happy dog and cat representing pet care guidance"
              className="absolute bottom-0 left-1/2 z-10 w-[min(94vw,440px)] -translate-x-1/2 object-contain lg:w-[min(92vw,720px)]"
            />
            <DecorativeAnnotation className="absolute left-2 top-4 z-20 scale-90 sm:left-4 sm:top-8 sm:scale-100 lg:top-12" >
              Start here
            </DecorativeAnnotation>
            <div className="absolute right-2 top-2 z-20 rotate-6 rounded-full border-4 border-white bg-[#FFFDF6] p-3 text-center sm:right-4 sm:top-4 sm:p-5">
              <ShieldCheck className="mx-auto h-7 w-7 text-[#006838]" aria-hidden="true" />
              <p className="mt-2 max-w-[120px] text-sm font-black uppercase leading-4 text-[#073D2A]">
                Veterinarian reviewed
              </p>
            </div>
            <div className="absolute bottom-2 left-1 z-20 hidden max-w-[260px] rotate-[-3deg] rounded-[22px] border-2 border-white bg-[#FFF8D7] p-4 sm:block lg:bottom-6 lg:left-2">
              <p className="font-queen text-3xl text-[#ED1C24]">San Antonio care notes</p>
              <p className="text-sm font-bold leading-5 text-[#073D2A]">
                Practical guidance for urgent signs, wellness, vaccines, and everyday decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 xl:px-12">
        <div className="mx-auto max-w-[1320px]">
          {featuredArticle ? (
            <FeaturedArticleCard
              article={featuredArticle}
              onArticleClick={(article) =>
                trackPetCareRelatedArticleClick({
                  article_slug: "pet-care-library",
                  related_article_slug: article.slug,
                  cta_location: "pet_care_library_featured",
                })
              }
            />
          ) : (
            <PetCareEmptyState
              title="New pet care guidance is coming soon"
              text="Our team is preparing veterinarian-reviewed resources for pet parents."
            />
          )}
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 xl:px-12">
        <div className="mx-auto max-w-[1320px] space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008F49]">
                Browse by category
              </p>
              <h2 className="mt-2 text-4xl font-bold text-[#073D2A]">
                Find guidance by care need
              </h2>
            </div>
          </div>
          <CategoryFilters
            activeSlug={activeCategory}
            onSelect={setActiveCategory}
            ctaLocation="pet_care_library_filters"
            onCategoryClick={(slug, ctaLocation) =>
              trackPetCareCategoryClick({
                article_category: slug,
                cta_location: ctaLocation,
              })
            }
          />
          <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {visibleCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/pet-care/category/${category.slug}`}
                onClick={() =>
                  trackPetCareCategoryClick({
                    article_category: category.slug,
                    cta_location: "pet_care_library_category_card",
                  })
                }
                className={`group relative overflow-hidden rounded-[28px] border-2 border-white bg-[#FFFDF6] p-5 transition hover:-translate-y-2 hover:rotate-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838] ${
                  category.slug === "urgent-care" || category.slug === "wellness-plans"
                    ? "lg:col-span-2"
                    : ""
                }`}
              >
                <img
                  src={categoryImages[category.slug]}
                  alt=""
                  aria-hidden="true"
                  className="absolute -right-5 -top-5 h-24 w-24 rotate-12 object-contain opacity-80 transition group-hover:scale-110"
                />
                <p className="font-queen text-2xl text-[#ED1C24]">Care topic</p>
                <h3 className="relative mt-3 max-w-[220px] text-2xl font-bold text-[#073D2A]">
                  {category.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#53635A]">{category.description}</p>
              </Link>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowAllCategories((current) => !current)}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#CFE8BC] bg-white px-5 py-3 font-bold text-[#006838] transition hover:bg-[#E9F7DE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
          >
            {showAllCategories ? "Show fewer categories" : "View all categories"}
          </button>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 xl:px-12">
        <div className="mx-auto max-w-[1320px] space-y-6">
          <h2 className="text-4xl font-bold text-[#073D2A]">
            Popular with San Antonio pet parents
          </h2>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.9fr)]">
            {popularArticles[0] && (
              <ArticleCard
                article={popularArticles[0]}
                featuredLabel={popularArticles[0].featured}
                variant="large"
                onArticleClick={(article) =>
                  trackPetCareRelatedArticleClick({
                    article_slug: "pet-care-library",
                    related_article_slug: article.slug,
                    cta_location: "pet_care_library_popular",
                  })
                }
              />
            )}
            <div className="grid gap-6">
              {popularArticles.slice(1, 3).map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="compact"
                  onArticleClick={(clickedArticle) =>
                    trackPetCareRelatedArticleClick({
                      article_slug: "pet-care-library",
                      related_article_slug: clickedArticle.slug,
                      cta_location: "pet_care_library_popular",
                    })
                  }
                />
              ))}
              <div className="rounded-[30px] border border-[#D8E8CE] bg-[#FFF8D7] p-6">
                <p className="font-queen text-3xl text-[#ED1C24]">Vet tip</p>
                <h3 className="mt-2 text-2xl font-bold text-[#073D2A]">
                  Keep a symptom timeline before you call.
                </h3>
                <p className="mt-3 text-base leading-7 text-[#53635A]">
                  Timing, frequency, appetite, and energy level help the care team
                  guide your next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 xl:px-12">
        <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[46px] bg-[#012D1D] p-6 text-white md:p-10">
          <img
            src={images.petCareSeasonalBanner}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
          />
          <div className="absolute inset-0 bg-[#012D1D]/15" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="font-queen text-4xl text-[#D6EBAE]">
                Local weather notes
              </p>
              <h2 className="mt-2 text-4xl font-bold text-white">
                Seasonal guidance for San Antonio pet parents
              </h2>
              <p className="mt-4 text-lg leading-8 text-[#D4E8D8]">
                Practical reminders for heat, fireworks, parasites, fleas, ticks, and heartworm risk in South Texas.
              </p>
              <Link
                to="/pet-care/category/seasonal-pet-safety"
                onClick={() =>
                  trackPetCareCategoryClick({
                    article_category: "seasonal-pet-safety",
                    cta_location: "pet_care_library_seasonal_section",
                  })
                }
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#D6EBAE] px-5 py-3 font-bold text-[#073D2A] transition hover:bg-[#C8E39B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore Seasonal Safety
              </Link>
            </div>
            <div className="grid gap-4">
              {seasonalArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  to={`/pet-care/${article.slug}`}
                  onClick={() =>
                    trackPetCareRelatedArticleClick({
                      article_slug: "pet-care-library",
                      related_article_slug: article.slug,
                      cta_location: "pet_care_library_seasonal_section",
                    })
                  }
                  className="grid gap-4 rounded-[26px] bg-[#F2F8EA]/95 p-4 text-[#073D2A] backdrop-blur-sm transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:grid-cols-[150px_1fr]"
                >
                  <img
                    src={article.heroImage}
                    alt={article.heroImageAlt}
                    className="aspect-[4/3] w-full rounded-[20px] object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#006838]">{article.category.label}</p>
                    <h3 className="mt-1 text-xl font-bold leading-tight">{article.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#53635A]">
                      {article.readingTime} · Vet reviewed
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 xl:px-12">
        <div className="mx-auto max-w-[1320px] space-y-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008F49]">
                Latest articles
              </p>
              <h2 className="mt-2 text-4xl font-bold text-[#073D2A]">
                Read the latest from Lili Vet
              </h2>
            </div>
          </div>
          {latestArticles.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {latestArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant={index % 5 === 2 ? "text" : index % 4 === 1 ? "compact" : "standard"}
                  className={index % 5 === 2 ? "xl:row-span-1" : ""}
                  onArticleClick={(article) =>
                    trackPetCareRelatedArticleClick({
                      article_slug: "pet-care-library",
                      related_article_slug: article.slug,
                      cta_location: "pet_care_library_latest",
                    })
                  }
                />
              ))}
            </div>
          ) : (
            <PetCareEmptyState onClear={() => setSearchTerm("")} />
          )}
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 xl:px-12">
        <div className="mx-auto max-w-[1320px]">
          <NewsletterModule />
        </div>
      </section>

      <section className="px-4 py-10 pb-20 md:px-8 xl:px-12">
        <div className="mx-auto max-w-[1320px]">
          <div className="grid overflow-hidden rounded-[46px] bg-[#FFFDF6] lg:grid-cols-[0.78fr_1.22fr]">
            <img
              src={images.doctreatdog}
              alt="Veterinarian caring for a dog"
              className="hidden h-full min-h-[320px] w-full object-cover lg:block"
            />
            <div className="flex flex-col justify-center p-7 md:p-10">
              <p className="font-queen text-4xl text-[#ED1C24]">We're here to help</p>
              <h2 className="mt-2 text-4xl font-bold text-[#073D2A] md:text-5xl">
                Not sure what your pet needs?
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-8 text-[#53635A]">
                Tell us what you are seeing. We can help you choose between an
                appointment, a call, or urgent-care guidance.
              </p>
              <p className="mt-3 text-sm font-bold text-[#C9151B]">
                If your pet is struggling to breathe or has a life-threatening
                emergency, go to the nearest emergency animal hospital.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to={ROUTE.bookAppointment}
                  onClick={() =>
                    trackPetCareAppointmentClick({
                      article_slug: null,
                      article_category: null,
                      cta_location: "pet_care_library_final_cta",
                    })
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#006838] px-5 py-3 font-bold text-white transition hover:bg-[#004F2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#006838]"
                >
                  Book an Appointment
                </Link>
                <a
                  href={`tel:${CLINIC_PHONE_NUMBER}`}
                  onClick={() => {
                    trackCallClick("pet_care_library_final_cta");
                    trackPetCareCallClick({
                      article_slug: null,
                      article_category: null,
                      cta_location: "pet_care_library_final_cta",
                    });
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#F2B5B7] bg-white px-5 py-3 font-bold text-[#C9151B] transition hover:bg-[#FFF1F1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED1C24]"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call Lili Vet
                </a>
                <Link
                  to={ROUTE.urgentCare}
                  onClick={() =>
                    trackPetCareUrgentCareClick({
                      article_slug: null,
                      article_category: null,
                      cta_location: "pet_care_library_final_cta",
                    })
                  }
                  className="font-bold text-[#006838] underline underline-offset-4"
                >
                  View Urgent Care
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
