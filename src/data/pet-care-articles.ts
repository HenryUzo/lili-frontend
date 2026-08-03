import images from "../app/assests/images";
import { useEffect, useState } from "react";
import { getPublishedPetCareArticles } from "../lib/api/clients";
import {
  articleAuthor as rawArticleAuthor,
  petCareArticles as rawArticles,
  petCareCategories as rawCategories,
} from "../content/pet-care/pet-care-content.mjs";
import {
  getReviewerById,
  type VeterinaryReviewer,
} from "./veterinary-reviewers";

export type PetCareCategorySlug =
  | "urgent-care"
  | "dogs"
  | "cats"
  | "puppy-kitten-care"
  | "preventive-care"
  | "vaccinations"
  | "dental-health"
  | "surgery-recovery"
  | "wellness-plans"
  | "seasonal-pet-safety";

export type PublishingStatus = "draft" | "review" | "published" | "archived";
export type ReviewStatus = "not-reviewed" | "in-review" | "medically-reviewed";

export type PetCareReviewer = VeterinaryReviewer;

export type ArticleAuthor = {
  id: string;
  name: string;
  role: string;
};

export type PetCareCategory = {
  slug: PetCareCategorySlug;
  label: string;
  description: string;
};

export type PetCareArticleSection = {
  id: string;
  title: string;
  content: string[];
  bullets?: string[];
};

export type PetCareArticleFaq = {
  question: string;
  answer: string;
};

export type PetCareArticleReference = {
  label: string;
  url?: string;
};

export type RelatedService = {
  title: string;
  path: string;
};

export type PetCareArticle = {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  summary: string;
  category: PetCareCategory;
  categorySlug: PetCareCategorySlug;
  tags: string[];
  heroImage: string;
  heroImageFile: string;
  heroImageAlt: string;
  image: string;
  imageAlt: string;
  author: ArticleAuthor;
  authorName: string;
  reviewer?: VeterinaryReviewer;
  reviewerId?: string;
  publishedAt: string;
  updatedAt: string;
  reviewedAt?: string;
  readingTimeMinutes: number;
  readingTime: string;
  relatedService: RelatedService;
  relatedServicePath: string;
  relatedServiceLabel: string;
  relatedArticleSlugs: string[];
  featured: boolean;
  seasonal: boolean;
  popular: boolean;
  keyTakeaways: string[];
  monitorAtHome: string[];
  warningCallout?: string;
  vetQuote?: string;
  faqs: PetCareArticleFaq[];
  references: PetCareArticleReference[];
  sections: PetCareArticleSection[];
  status: PublishingStatus;
  reviewStatus: ReviewStatus;
};

const imageMap = images as Record<string, string>;

export const petCareCategories = rawCategories as PetCareCategory[];
export const articleAuthor = rawArticleAuthor as ArticleAuthor;

function getCategoryOrThrow(slug: string) {
  const category = petCareCategories.find((item) => item.slug === slug);
  if (!category) {
    throw new Error(`Unknown pet care category: ${slug}`);
  }
  return category;
}

function normalizeArticle(rawArticle: (typeof rawArticles)[number]): PetCareArticle {
  const category = getCategoryOrThrow(rawArticle.categorySlug);
  const reviewer = rawArticle.reviewerId ? getReviewerById(rawArticle.reviewerId) : undefined;
  const heroImage = imageMap[rawArticle.heroImageKey];

  if (!heroImage) {
    throw new Error(`Unknown pet care image key: ${rawArticle.heroImageKey}`);
  }

  return {
    ...rawArticle,
    category,
    heroImage,
    image: heroImage,
    imageAlt: rawArticle.heroImageAlt,
    author: articleAuthor,
    authorName: articleAuthor.name,
    reviewer,
    readingTime: formatReadingTime(rawArticle.readingTimeMinutes),
    relatedServicePath: rawArticle.relatedService.path,
    relatedServiceLabel: rawArticle.relatedService.title,
  };
}

export function formatReadingTime(minutes: number) {
  return `${minutes} min read`;
}

export let petCareArticles: PetCareArticle[] = rawArticles.map(normalizeArticle);
let petCareContentRequest: Promise<void> | null = null;

type ApiPetCareArticle = Omit<PetCareArticle, "category" | "heroImage" | "image" | "imageAlt" | "author" | "authorName" | "reviewer" | "readingTime" | "relatedServicePath" | "relatedServiceLabel" | "status" | "reviewStatus"> & {
  categorySlug: PetCareCategorySlug;
  heroImageUrl?: string | null;
  heroImageKey?: string | null;
  reviewer?: { slug: string; name: string; credentials: string; role: string; photoUrl?: string | null; shortBio: string; isActive: boolean } | null;
  authorName: string;
  authorRole: string;
  status: "PUBLISHED";
  reviewStatus: "MEDICALLY_REVIEWED";
  relatedService: RelatedService;
};

function normalizeApiArticle(article: ApiPetCareArticle): PetCareArticle {
  const category = getCategoryOrThrow(article.categorySlug);
  const localReviewer = article.reviewer ? getReviewerById(article.reviewer.slug) : undefined;
  const reviewer = article.reviewer ? localReviewer ?? {
    id: article.reviewer.slug,
    name: article.reviewer.name,
    credentials: article.reviewer.credentials,
    role: article.reviewer.role,
    title: "Veterinarian reviewed",
    photo: article.reviewer.photoUrl ?? "",
    photoFile: article.reviewer.photoUrl ?? "",
    shortBio: article.reviewer.shortBio,
    bio: article.reviewer.shortBio,
    active: article.reviewer.isActive,
  } : undefined;
  const heroImage = article.heroImageUrl || (article.heroImageKey ? imageMap[article.heroImageKey] : undefined);

  return {
    ...article,
    status: "published",
    reviewStatus: "medically-reviewed",
    category,
    heroImage: heroImage ?? "",
    image: heroImage ?? "",
    imageAlt: article.heroImageAlt,
    author: { id: "lili-vet-care-team", name: article.authorName, role: article.authorRole },
    authorName: article.authorName,
    reviewer,
    reviewerId: reviewer?.id,
    readingTime: formatReadingTime(article.readingTimeMinutes),
    relatedServicePath: article.relatedService.path,
    relatedServiceLabel: article.relatedService.title,
  };
}

export function usePublishedPetCareContent() {
  const [, setVersion] = useState(0);
  useEffect(() => {
    if (!petCareContentRequest) {
      petCareContentRequest = getPublishedPetCareArticles()
        .then((items) => {
          const normalized = (items as ApiPetCareArticle[]).map(normalizeApiArticle);
          if (normalized.length) petCareArticles = normalized;
        })
        .catch(() => undefined);
    }
    petCareContentRequest.then(() => setVersion((version) => version + 1));
  }, []);
}

export function isPublishedArticle(article: PetCareArticle) {
  return article.status === "published";
}

export function isMedicallyReviewed(article: PetCareArticle) {
  return article.reviewStatus === "medically-reviewed" && Boolean(article.reviewer);
}

export function getPublishedArticles() {
  return petCareArticles.filter(isPublishedArticle);
}

export function getPublishedCategories() {
  const publishedCategorySlugs = new Set(
    getPublishedArticles().map((article) => article.categorySlug),
  );

  return petCareCategories.filter((category) => publishedCategorySlugs.has(category.slug));
}

export function getArticleBySlug(slug?: string, options: { includeUnpublished?: boolean } = {}) {
  if (!slug) return undefined;
  const articles = options.includeUnpublished ? petCareArticles : getPublishedArticles();
  return articles.find((article) => article.slug === slug);
}

export function getCategoryBySlug(slug?: string) {
  return petCareCategories.find((category) => category.slug === slug);
}

export function getArticlesByCategory(categorySlug: PetCareCategorySlug) {
  return getPublishedArticles().filter((article) => article.categorySlug === categorySlug);
}

export function searchArticles(articles: PetCareArticle[], searchTerm: string) {
  const normalizedTerm = searchTerm.trim().toLowerCase();
  if (!normalizedTerm) return articles;

  return articles.filter((article) => {
    const searchableText = [
      article.title,
      article.excerpt,
      article.category.label,
      ...article.tags,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedTerm);
  });
}

export function getFeaturedArticle() {
  const articles = getPublishedArticles();
  return articles.find((article) => article.featured) ?? articles[0];
}

export function getPopularArticles(limit = 3) {
  const featured = getFeaturedArticle();
  return getPublishedArticles()
    .filter((article) => article.popular && article.id !== featured?.id)
    .slice(0, limit);
}

export function getSeasonalArticles(limit = 3) {
  return getPublishedArticles().filter((article) => article.seasonal).slice(0, limit);
}

export function getLatestArticles(limit = 6) {
  return [...getPublishedArticles()]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}

export function getRelatedArticles(article: PetCareArticle, limit = 3) {
  const explicit = article.relatedArticleSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((item): item is PetCareArticle => Boolean(item));
  const sameCategory = getPublishedArticles().filter(
    (candidate) => candidate.id !== article.id && candidate.categorySlug === article.categorySlug,
  );
  const fallback = getPublishedArticles().filter((candidate) => candidate.id !== article.id);

  return [...explicit, ...sameCategory, ...fallback]
    .filter((candidate, index, articles) => articles.findIndex((item) => item.id === candidate.id) === index)
    .slice(0, limit);
}

export function getPreviousArticle(article: PetCareArticle) {
  const articles = getPublishedArticles();
  const index = articles.findIndex((candidate) => candidate.id === article.id);
  return index > 0 ? articles[index - 1] : undefined;
}

export function getNextArticle(article: PetCareArticle) {
  const articles = getPublishedArticles();
  const index = articles.findIndex((candidate) => candidate.id === article.id);
  return index >= 0 && index < articles.length - 1 ? articles[index + 1] : undefined;
}

export function getArticleReviewLabel(article: PetCareArticle) {
  if (!isMedicallyReviewed(article)) return "Pending medical review";
  return `Reviewed by ${article.reviewer?.name}, ${article.reviewer?.credentials}`;
}
