import {
  publishedArticles,
  publishedCategories,
  SITE_URL,
} from "./pet-care-static-utils.mjs";

const baseUrl = (process.env.PET_CARE_VERIFY_BASE_URL || SITE_URL).replace(/\/+$/, "");
const requestTimeoutMs = Number(process.env.PET_CARE_VERIFY_TIMEOUT_MS || 10000);
const concurrency = Number(process.env.PET_CARE_VERIFY_CONCURRENCY || 4);
const failures = [];
const passes = [];

const routes = [
  { path: "/privacy-policy", kind: "privacy" },
  { path: "/pet-care", kind: "library" },
  ...publishedCategories.slice(0, 4).map((category) => ({
    path: `/pet-care/category/${category.slug}`,
    kind: "category",
  })),
  ...publishedArticles.map((article) => ({
    path: `/pet-care/${article.slug}`,
    kind: "article",
    article,
  })),
];

function record(condition, passMessage, failMessage) {
  if (condition) {
    passes.push(passMessage);
  } else {
    failures.push(failMessage);
  }
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "lili-vet-pet-care-seo-verifier/1.0" },
    });

    return {
      url: response.url,
      status: response.status,
      text: await response.text(),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function runWithConcurrency(items, worker) {
  const pending = [...items];
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (pending.length) {
      const item = pending.shift();
      if (item) await worker(item);
    }
  });

  await Promise.all(workers);
}

function hasCanonical(html, path) {
  return html.includes(`rel="canonical" href="${SITE_URL}${path}"`);
}

function hasMetaDescription(html) {
  return /<meta\s+name=["']description["']\s+content=["'][^"']+["']\s*\/?>/i.test(html);
}

function hasJsonLdType(html, typeName) {
  return html.includes(`"@type":"${typeName}"`) || html.includes(`"@type": "${typeName}"`);
}

async function verifyRoute(route) {
  const url = `${baseUrl}${route.path}`;

  try {
    const result = await fetchText(url);
    const html = result.text;
    const label = `${route.path}`;

    record(result.status === 200, `${label}: 200`, `${label}: expected 200, got ${result.status}`);
    record(/<h1[\s>]/i.test(html), `${label}: H1 present`, `${label}: H1 missing from initial HTML`);
    record(hasCanonical(html, route.path), `${label}: canonical present`, `${label}: canonical missing or not final domain`);
    record(hasMetaDescription(html), `${label}: description present`, `${label}: meta description missing`);
    record(!html.includes("vercel.app"), `${label}: no Vercel domain`, `${label}: Vercel preview domain found in HTML`);

    if (route.kind === "privacy") {
      record(html.includes("respects the privacy of our clients"), `${label}: opening policy present`, `${label}: opening policy missing`);
      record(hasJsonLdType(html, "BreadcrumbList"), `${label}: Breadcrumb JSON-LD present`, `${label}: Breadcrumb JSON-LD missing`);
      record(!html.includes("noindex"), `${label}: indexable`, `${label}: noindex found`);
    }

    if (route.kind === "article") {
      record(
        hasJsonLdType(html, "Article") || hasJsonLdType(html, "BlogPosting"),
        `${label}: Article JSON-LD present`,
        `${label}: Article/BlogPosting JSON-LD missing`,
      );
      record(
        hasJsonLdType(html, "BreadcrumbList"),
        `${label}: Breadcrumb JSON-LD present`,
        `${label}: Breadcrumb JSON-LD missing`,
      );

      const expectsFaq = Boolean(route.article?.faqs?.length);
      record(
        expectsFaq ? hasJsonLdType(html, "FAQPage") : !hasJsonLdType(html, "FAQPage"),
        `${label}: FAQ JSON-LD expectation met`,
        `${label}: FAQ JSON-LD expectation failed`,
      );
    }
  } catch (error) {
    failures.push(`${route.path}: request failed (${error instanceof Error ? error.message : "unknown error"})`);
  }
}

await runWithConcurrency(routes, verifyRoute);

try {
  const sitemap = await fetchText(`${baseUrl}/sitemap.xml`);
  record(sitemap.status === 200, "sitemap.xml: 200", `sitemap.xml: expected 200, got ${sitemap.status}`);
  record(!sitemap.text.includes("vercel.app"), "sitemap.xml: no Vercel domain", "sitemap.xml: Vercel preview domain found");
  record(
    sitemap.text.includes(`${SITE_URL}/privacy-policy`),
    "sitemap.xml: includes privacy policy",
    "sitemap.xml: missing privacy policy",
  );

  for (const article of publishedArticles) {
    record(
      sitemap.text.includes(`${SITE_URL}/pet-care/${article.slug}`),
      `sitemap.xml: includes ${article.slug}`,
      `sitemap.xml: missing published article ${article.slug}`,
    );
  }
} catch (error) {
  failures.push(`sitemap.xml: request failed (${error instanceof Error ? error.message : "unknown error"})`);
}

try {
  const robots = await fetchText(`${baseUrl}/robots.txt`);
  record(robots.status === 200, "robots.txt: 200", `robots.txt: expected 200, got ${robots.status}`);
  record(
    robots.text.includes(`${SITE_URL}/sitemap.xml`),
    "robots.txt: final sitemap referenced",
    "robots.txt: final sitemap missing",
  );
} catch (error) {
  failures.push(`robots.txt: request failed (${error instanceof Error ? error.message : "unknown error"})`);
}

for (const pass of passes) {
  console.log(`[seo:live:pass] ${pass}`);
}

for (const failure of failures) {
  console.error(`[seo:live:fail] ${failure}`);
}

if (failures.length) {
  console.error(`[seo:verify:live] ${failures.length} failure(s) across ${routes.length} route checks.`);
  process.exitCode = 1;
} else {
  console.log(`[seo:verify:live] ${routes.length} Pet Care routes, sitemap.xml, and robots.txt passed live checks at ${baseUrl}.`);
}
