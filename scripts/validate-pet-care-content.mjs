import fs from "node:fs";
import path from "node:path";
import {
  petCareArticles,
  petCareCategories,
  veterinaryReviewers,
} from "../src/content/pet-care/pet-care-content.mjs";
import { rootDir } from "./pet-care-static-utils.mjs";

const errors = [];
const warnings = [];
const validStatuses = new Set(["draft", "review", "published", "archived"]);
const validReviewStatuses = new Set(["not-reviewed", "in-review", "medically-reviewed"]);
const validServicePaths = new Set([
  "/urgent-care",
  "/book-appointment",
  "/services/wellness-plans",
  "/services/vaccination",
  "/services/diagnostic-care",
  "/services/dental-care",
  "/services/surgery",
]);

function error(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
}

function imageExists(file) {
  return fs.existsSync(path.join(rootDir, "src", "app", "assests", "images", file));
}

const categorySlugs = new Set(petCareCategories.map((category) => category.slug));
const reviewerIds = new Set(veterinaryReviewers.map((reviewer) => reviewer.id));
const seenSlugs = new Set();
const articleSlugs = new Set(petCareArticles.map((article) => article.slug));

for (const article of petCareArticles) {
  const label = `${article.slug || article.id || "unknown article"}`;

  if (!article.id) error(`${label}: missing id`);
  if (!article.slug) error(`${label}: missing slug`);
  if (seenSlugs.has(article.slug)) error(`${label}: duplicate slug`);
  seenSlugs.add(article.slug);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) {
    error(`${label}: slug must be lowercase kebab-case`);
  }

  if (!categorySlugs.has(article.categorySlug)) {
    error(`${label}: unknown category ${article.categorySlug}`);
  }

  if (!validStatuses.has(article.status)) {
    error(`${label}: invalid publishing status ${article.status}`);
  }

  if (!validReviewStatuses.has(article.reviewStatus)) {
    error(`${label}: invalid review status ${article.reviewStatus}`);
  }

  if (!validDate(article.publishedAt)) error(`${label}: invalid publishedAt`);
  if (!validDate(article.updatedAt)) error(`${label}: invalid updatedAt`);
  if (article.reviewedAt && !validDate(article.reviewedAt)) error(`${label}: invalid reviewedAt`);

  if (!article.title || !article.seoTitle || !article.seoDescription || !article.excerpt) {
    error(`${label}: missing required title/SEO/excerpt fields`);
  }

  if (article.seoTitle && (article.seoTitle.length < 45 || article.seoTitle.length > 70)) {
    warn(`${label}: SEO title is ${article.seoTitle.length} chars; target roughly 50-65`);
  }

  if (
    article.seoDescription &&
    (article.seoDescription.length < 120 || article.seoDescription.length > 170)
  ) {
    warn(
      `${label}: SEO description is ${article.seoDescription.length} chars; target roughly 140-165`,
    );
  }

  if (!article.heroImageFile || !imageExists(article.heroImageFile)) {
    error(`${label}: hero image file is missing (${article.heroImageFile})`);
  }

  if (!article.heroImageAlt) error(`${label}: hero image alt text is required`);

  if (article.relatedService && !validServicePaths.has(article.relatedService.path)) {
    error(`${label}: related service path is not an existing route (${article.relatedService.path})`);
  }

  for (const relatedSlug of article.relatedArticleSlugs ?? []) {
    if (!articleSlugs.has(relatedSlug)) {
      error(`${label}: related article slug does not exist (${relatedSlug})`);
    }
  }

  if (article.status === "published") {
    if (article.reviewStatus !== "medically-reviewed") {
      error(`${label}: published articles must be medically reviewed`);
    }
    if (!reviewerIds.has(article.reviewerId)) {
      error(`${label}: published article reviewer does not exist`);
    }
    if (!article.sections?.length) error(`${label}: published article needs sections`);
    if (!article.faqs?.length) error(`${label}: published article needs FAQ content`);
    if (!article.references?.length) error(`${label}: published article needs references`);
  }
}

warnings.forEach((message) => console.warn(`[content:warn] ${message}`));
errors.forEach((message) => console.error(`[content:error] ${message}`));

if (errors.length) {
  process.exitCode = 1;
} else {
  console.log(
    `[content:validate] ${petCareArticles.length} articles validated with ${warnings.length} warning(s).`,
  );
}
