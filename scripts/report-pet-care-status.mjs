import fs from "node:fs";
import {
  distDir,
  petCareArticles,
  publishedArticles,
  routeToFile,
} from "./pet-care-static-utils.mjs";

const reviewMaxAgeDays = Number(process.env.PET_CARE_REVIEW_MAX_AGE_DAYS || 365);
const sitemapPath = fs.existsSync(`${distDir}/sitemap.xml`)
  ? `${distDir}/sitemap.xml`
  : "public/sitemap.xml";
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
const now = new Date();

const counts = {
  total: petCareArticles.length,
  draft: 0,
  review: 0,
  published: 0,
  archived: 0,
};

const findings = {
  pendingMedicalReview: [],
  missingReviewer: [],
  staleReview: [],
  missingReferences: [],
  missingRelatedService: [],
  missingRelatedArticles: [],
  notInSitemap: [],
  notGeneratedInDist: [],
};

function daysSince(dateValue) {
  if (!dateValue) return Number.POSITIVE_INFINITY;
  return Math.floor((now.getTime() - new Date(`${dateValue}T00:00:00.000Z`).getTime()) / 86400000);
}

for (const article of petCareArticles) {
  counts[article.status] += 1;

  if (article.status === "published" && article.reviewStatus !== "medically-reviewed") {
    findings.pendingMedicalReview.push(article.slug);
  }

  if (article.status === "published" && !article.reviewerId) {
    findings.missingReviewer.push(article.slug);
  }

  if (article.status === "published" && daysSince(article.reviewedAt) > reviewMaxAgeDays) {
    findings.staleReview.push(article.slug);
  }

  if (article.status === "published" && !article.references?.length) {
    findings.missingReferences.push(article.slug);
  }

  if (article.status === "published" && !article.relatedService?.path) {
    findings.missingRelatedService.push(article.slug);
  }

  if (article.status === "published" && !article.relatedArticleSlugs?.length) {
    findings.missingRelatedArticles.push(article.slug);
  }
}

for (const article of publishedArticles) {
  const route = `/pet-care/${article.slug}`;

  if (sitemap && !sitemap.includes(route)) {
    findings.notInSitemap.push(article.slug);
  }

  if (fs.existsSync(distDir) && !fs.existsSync(routeToFile(route))) {
    findings.notGeneratedInDist.push(article.slug);
  }
}

console.log("[content:status] Pet Care Library");
console.log(`Total: ${counts.total}`);
console.log(`Draft: ${counts.draft}`);
console.log(`Review: ${counts.review}`);
console.log(`Published: ${counts.published}`);
console.log(`Archived: ${counts.archived}`);
console.log(`Review age threshold: ${reviewMaxAgeDays} days`);
console.log(`Sitemap checked: ${sitemapPath}`);

for (const [label, slugs] of Object.entries(findings)) {
  const prettyLabel = label.replace(/[A-Z]/g, (match) => ` ${match.toLowerCase()}`);
  console.log(`${prettyLabel}: ${slugs.length ? slugs.join(", ") : "none"}`);
}
