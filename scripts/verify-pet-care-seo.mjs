import fs from "node:fs";
import {
  distDir,
  publishedArticles,
  publishedCategories,
  routeToFile,
  SITE_URL,
} from "./pet-care-static-utils.mjs";

const checks = [
  { path: "/privacy-policy", title: "Privacy Policy", privacyPolicy: true },
  { path: "/pet-care", title: "Pet Care Library" },
  { path: `/pet-care/category/${publishedCategories[0]?.slug}`, title: publishedCategories[0]?.label },
  { path: `/pet-care/${publishedArticles[0]?.slug}`, title: publishedArticles[0]?.title, article: true },
  { path: `/pet-care/${publishedArticles[1]?.slug}`, title: publishedArticles[1]?.title, article: true },
].filter((check) => check.path && !check.path.includes("undefined"));

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

for (const check of checks) {
  const file = routeToFile(check.path);
  const html = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";

  assert(html, `${check.path}: generated HTML missing`);
  assert(html.includes("<h1"), `${check.path}: h1 missing`);
  assert(html.includes("<title>"), `${check.path}: title missing`);
  assert(html.includes('name="description"'), `${check.path}: meta description missing`);
  assert(
    html.includes(`rel="canonical" href="${SITE_URL}${check.path}"`) ||
      (check.path === "/pet-care" &&
        html.includes(`rel="canonical" href="${SITE_URL}/pet-care"`)),
    `${check.path}: canonical missing or incorrect`,
  );
  assert(html.includes('type="application/ld+json"'), `${check.path}: JSON-LD missing`);
  assert(html.includes(check.title), `${check.path}: expected page title text missing`);
  assert(html.includes('name="robots" content="index,follow"'), `${check.path}: index,follow missing`);

  if (check.privacyPolicy) {
    assert(html.includes("respects the privacy of our clients"), `${check.path}: opening policy content missing`);
    assert(html.includes('"@type":"BreadcrumbList"'), `${check.path}: Breadcrumb JSON-LD missing`);
    assert(!html.includes("vercel.app"), `${check.path}: Vercel preview domain found`);
  }

  if (check.article) {
    assert(html.includes('property="article:published_time"'), `${check.path}: published meta missing`);
    assert(html.includes('"@type":"Article"'), `${check.path}: Article JSON-LD missing`);
    assert(html.includes('"@type":"FAQPage"'), `${check.path}: FAQ JSON-LD missing`);
  }
}

const sitemap = fs.existsSync(`${distDir}/sitemap.xml`)
  ? fs.readFileSync(`${distDir}/sitemap.xml`, "utf8")
  : "";

assert(sitemap.includes(`${SITE_URL}/pet-care`), "sitemap.xml missing /pet-care");
assert(sitemap.includes(`${SITE_URL}/privacy-policy`), "sitemap.xml missing /privacy-policy");
if (publishedArticles.length) {
  assert(
    sitemap.includes(`${SITE_URL}/pet-care/${publishedArticles[0].slug}`),
    "sitemap.xml missing article route",
  );
}

failures.forEach((failure) => console.error(`[seo:verify] ${failure}`));

if (failures.length) {
  process.exitCode = 1;
} else {
  console.log(`[seo:verify] ${checks.length} generated Pet Care routes passed SEO checks.`);
}
