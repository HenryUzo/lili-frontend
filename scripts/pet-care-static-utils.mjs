import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  articleAuthor,
  petCareCategories,
  veterinaryReviewers,
} from "../src/content/pet-care/pet-care-content.mjs";

export { articleAuthor };
export let petCareArticles = [];

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const rootDir = path.resolve(__dirname, "..");
export const distDir = path.join(rootDir, "dist");
export const SITE_URL = "https://liliveterinaryhospital.com";
export const SITE_NAME = "Lili Veterinary Hospital";

export const baseRoutes = [
  { path: "/", lastmod: "2026-05-11" },
  { path: "/about-us", lastmod: "2026-05-11" },
  { path: "/book-appointment", lastmod: "2026-05-11" },
  { path: "/contact-us", lastmod: "2026-05-11" },
  { path: "/new-patients", lastmod: "2026-05-11" },
  { path: "/urgent-care", lastmod: "2026-05-11" },
  { path: "/services/wellness-plans", lastmod: "2026-05-11" },
  { path: "/services/vaccination", lastmod: "2026-05-11" },
  { path: "/services/diagnostic-care", lastmod: "2026-05-11" },
  { path: "/services/dental-care", lastmod: "2026-05-11" },
  { path: "/services/surgery", lastmod: "2026-05-11" },
  { path: "/privacy-policy", lastmod: "2026-07-28" },
];

export let publishedArticles = [];
export let publishedCategorySlugs = new Set();
export let publishedCategories = [];

export function setPetCareArticles(articles) {
  petCareArticles = articles;
  publishedArticles = petCareArticles.filter((article) => article.status === "published");
  publishedCategorySlugs = new Set(publishedArticles.map((article) => article.categorySlug));
  publishedCategories = petCareCategories.filter((category) => publishedCategorySlugs.has(category.slug));
}

export function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function routeToFile(routePath) {
  if (routePath === "/") return path.join(distDir, "index.html");
  return path.join(distDir, routePath.replace(/^\//, ""), "index.html");
}

export function canonical(routePath) {
  return routePath === "/" ? SITE_URL : `${SITE_URL}${routePath}`;
}

export function getCategory(slug) {
  return petCareCategories.find((category) => category.slug === slug);
}

export function getReviewer(id) {
  return veterinaryReviewers.find((reviewer) => reviewer.id === id);
}

export function getRouteLastmod() {
  const latest = publishedArticles
    .map((article) => article.updatedAt)
    .sort()
    .at(-1);

  return latest ?? "2026-06-18";
}

export function getArticleImageUrl(article) {
  if (article.heroImageUrl) return article.heroImageUrl;

  const assetsDir = path.join(distDir, "assets");
  const parsed = path.parse(article.heroImageFile);

  if (fs.existsSync(assetsDir)) {
    const match = fs
      .readdirSync(assetsDir)
      .find((file) => file.startsWith(`${parsed.name}-`) && file.endsWith(parsed.ext));

    if (match) return `${SITE_URL}/assets/${match}`;
  }

  return `${SITE_URL}/og/lilivet-og.png`;
}

export function jsonLd(value) {
  return `<script type="application/ld+json">${JSON.stringify(value).replace(/</g, "\\u003c")}</script>`;
}

export function renderHead({
  title,
  description,
  routePath,
  imageUrl = `${SITE_URL}/og/lilivet-og.png`,
  type = "website",
  jsonLdItems = [],
  publishedAt,
  updatedAt,
  author,
}) {
  const url = canonical(routePath);
  const articleMeta =
    type === "article"
      ? [
          publishedAt
            ? `<meta property="article:published_time" content="${escapeHtml(publishedAt)}" />`
            : "",
          updatedAt
            ? `<meta property="article:modified_time" content="${escapeHtml(updatedAt)}" />`
            : "",
          author ? `<meta property="article:author" content="${escapeHtml(author)}" />` : "",
        ].join("\n")
      : "";

  return `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${imageUrl}" />
    ${articleMeta}
    ${jsonLdItems.map(jsonLd).join("\n")}
  `;
}

export function buildBreadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: canonical(item.path) } : {}),
    })),
  };
}

export function buildArticleJsonLd(article) {
  const category = getCategory(article.categorySlug);
  const reviewer = article.reviewer ?? getReviewer(article.reviewerId);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: canonical(`/pet-care/${article.slug}`),
    headline: article.title,
    description: article.seoDescription,
    image: getArticleImageUrl(article),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: article.authorName ?? articleAuthor.name },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    ...(reviewer
      ? { reviewedBy: { "@type": "Person", name: `${reviewer.name}, ${reviewer.credentials}` } }
      : {}),
    about: category?.label,
    keywords: article.tags.join(", "),
  };
}

export function buildFaqJsonLd(article) {
  if (!article.faqs?.length) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
