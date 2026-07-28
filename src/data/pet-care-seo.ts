import { buildCanonicalUrl, SITE_NAME, SITE_URL } from "../lib/seo-config";
import {
  isMedicallyReviewed,
  type PetCareArticle,
  type PetCareCategory,
} from "./pet-care-articles";

export function getArticleCanonicalPath(article: PetCareArticle) {
  return `/pet-care/${article.slug}`;
}

export function buildPetCareBreadcrumbStructuredData(
  items: Array<{ name: string; path?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: buildCanonicalUrl(item.path) } : {}),
    })),
  };
}

export function buildArticleStructuredData(article: PetCareArticle, imageUrl?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: buildCanonicalUrl(getArticleCanonicalPath(article)),
    headline: article.title,
    description: article.seoDescription,
    image: imageUrl ?? `${SITE_URL}${article.heroImage}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: article.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
      },
    },
    ...(isMedicallyReviewed(article) && article.reviewer
      ? {
          reviewedBy: {
            "@type": "Person",
            name: `${article.reviewer.name}, ${article.reviewer.credentials}`,
          },
        }
      : {}),
    about: article.category.label,
    keywords: article.tags.join(", "),
  };
}

export function buildArticleFaqStructuredData(article: PetCareArticle) {
  if (!article.faqs.length) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildCategoryBreadcrumbStructuredData(category: PetCareCategory) {
  return buildPetCareBreadcrumbStructuredData([
    { name: "Home", path: "/" },
    { name: "Pet Care Library", path: "/pet-care" },
    { name: category.label, path: `/pet-care/category/${category.slug}` },
  ]);
}
