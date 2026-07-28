import fs from "node:fs";
import path from "node:path";
import {
  articleAuthor,
  baseRoutes,
  buildArticleJsonLd,
  buildBreadcrumb,
  buildFaqJsonLd,
  canonical,
  distDir,
  escapeHtml,
  getArticleImageUrl,
  getCategory,
  getReviewer,
  getRouteLastmod,
  publishedArticles,
  publishedCategories,
  renderHead,
  routeToFile,
  SITE_NAME,
  SITE_URL,
} from "./pet-care-static-utils.mjs";

const templatePath = path.join(distDir, "index.html");
const template = fs.readFileSync(templatePath, "utf8");

function injectRouteHtml({ routePath, head, body }) {
  const withoutExistingTitle = template
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta name="description"[\s\S]*?>/i, "")
    .replace(/<meta name="robots"[\s\S]*?>/i, "")
    .replace(/<link rel="canonical"[\s\S]*?>/i, "")
    .replace(/<meta (property|name)="(og|twitter|article):[\s\S]*?>/gi, "")
    .replace(/<script type="application\/ld\+json"[\s\S]*?<\/script>/gi, "");

  const html = withoutExistingTitle
    .replace("</head>", `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const target = routeToFile(routePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}

function shell(title, content) {
  return `
    <main style="background:#f7faf2;color:#073d2a;font-family:Arial,sans-serif">
      <section style="max-width:1120px;margin:0 auto;padding:64px 20px">
        ${title ? `<h1>${escapeHtml(title)}</h1>` : ""}
        ${content}
      </section>
    </main>
  `;
}

function articleList(articles) {
  return `<ul>${articles
    .map(
      (article) =>
        `<li><a href="/pet-care/${article.slug}">${escapeHtml(article.title)}</a><p>${escapeHtml(article.excerpt)}</p></li>`,
    )
    .join("")}</ul>`;
}

function renderLibrary() {
  const routePath = "/pet-care";
  injectRouteHtml({
    routePath,
    head: renderHead({
      title: "Pet Care Library | Lili Veterinary Hospital",
      description:
        "Veterinarian-reviewed pet care guidance for San Antonio dog and cat parents from Lili Veterinary Hospital.",
      routePath,
      jsonLdItems: [
        buildBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Pet Care Library", path: routePath },
        ]),
      ],
    }),
    body: shell(
      "Pet Care Library",
      `<p>Veterinarian-reviewed guidance to help San Antonio pet parents make confident decisions about their pets' health and care.</p>
      <h2>Browse by category</h2>
      <ul>${publishedCategories
        .map(
          (category) =>
            `<li><a href="/pet-care/category/${category.slug}">${escapeHtml(category.label)}</a></li>`,
        )
        .join("")}</ul>
      <h2>Latest pet care articles</h2>${articleList(publishedArticles)}`,
    ),
  });
}

function renderCategory(category) {
  const routePath = `/pet-care/category/${category.slug}`;
  const categoryArticles = publishedArticles.filter(
    (article) => article.categorySlug === category.slug,
  );

  injectRouteHtml({
    routePath,
    head: renderHead({
      title: `${category.label} Articles | Lili Vet Pet Care Library`,
      description: category.description,
      routePath,
      jsonLdItems: [
        buildBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Pet Care Library", path: "/pet-care" },
          { name: category.label, path: routePath },
        ]),
      ],
    }),
    body: shell(
      `${category.label} Articles`,
      `<p>${escapeHtml(category.description)}</p>${articleList(categoryArticles)}`,
    ),
  });
}

function renderArticle(article) {
  const category = getCategory(article.categorySlug);
  const reviewer = getReviewer(article.reviewerId);
  const routePath = `/pet-care/${article.slug}`;
  const faqJson = buildFaqJsonLd(article);

  injectRouteHtml({
    routePath,
    head: renderHead({
      title: article.seoTitle,
      description: article.seoDescription,
      routePath,
      imageUrl: getArticleImageUrl(article),
      type: "article",
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      author: articleAuthor.name,
      jsonLdItems: [
        buildArticleJsonLd(article),
        buildBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Pet Care Library", path: "/pet-care" },
          { name: category?.label ?? "Pet Care", path: `/pet-care/category/${article.categorySlug}` },
          { name: article.title, path: routePath },
        ]),
        faqJson,
      ].filter(Boolean),
    }),
    body: shell(
      article.title,
      `<p>${escapeHtml(article.summary)}</p>
      <p><strong>Category:</strong> <a href="/pet-care/category/${article.categorySlug}">${escapeHtml(category?.label ?? "Pet Care")}</a></p>
      <p><strong>Written by:</strong> ${escapeHtml(articleAuthor.name)}</p>
      ${reviewer ? `<p><strong>Reviewed by:</strong> ${escapeHtml(reviewer.name)}, ${escapeHtml(reviewer.credentials)}</p>` : ""}
      <img src="${getArticleImageUrl(article)}" alt="${escapeHtml(article.heroImageAlt)}" style="max-width:100%;height:auto" />
      ${article.sections
        .map(
          (section) =>
            `<section id="${escapeHtml(section.id)}"><h2>${escapeHtml(section.title)}</h2>${section.content
              .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
              .join("")}${section.bullets ? `<ul>${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}</section>`,
        )
        .join("")}
      <h2>Frequently asked questions</h2>
      ${article.faqs
        .map((faq) => `<h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p>`)
        .join("")}
      <h2>References</h2>
      <ul>${article.references
        .map((reference) =>
          reference.url
            ? `<li><a href="${escapeHtml(reference.url)}">${escapeHtml(reference.label)}</a></li>`
            : `<li>${escapeHtml(reference.label)}</li>`,
        )
        .join("")}</ul>`,
    ),
  });
}

function renderPrivacyPolicy() {
  const routePath = "/privacy-policy";
  const description =
    "Learn how Lili Veterinary Hospital collects, uses, protects and shares information submitted through our website, veterinary forms and email communications.";

  injectRouteHtml({
    routePath,
    head: renderHead({
      title: "Privacy Policy | Lili Veterinary Hospital",
      description,
      routePath,
      jsonLdItems: [
        buildBreadcrumb([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: routePath },
        ]),
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy | Lili Veterinary Hospital",
          description,
          url: canonical(routePath),
          datePublished: "2026-07-28",
          dateModified: "2026-07-28",
        },
      ],
    }),
    body: shell(
      "Privacy Policy",
      `<p><strong>Effective date:</strong> <time datetime="2026-07-28">July 28, 2026</time></p>
      <p><strong>Last updated:</strong> <time datetime="2026-07-28">July 28, 2026</time></p>
      <p>Lili Veterinary Hospital respects the privacy of our clients, website visitors and newsletter subscribers. This Privacy Policy explains how we collect, use, disclose and protect information when you visit liliveterinaryhospital.com, request an appointment, register a new patient, upload records, communicate with us or subscribe to our Pet Care communications.</p>`,
    ),
  });
}

function writeSitemap() {
  const routes = [
    ...baseRoutes,
    { path: "/pet-care", lastmod: getRouteLastmod() },
    ...publishedCategories.map((category) => ({
      path: `/pet-care/category/${category.slug}`,
      lastmod: getRouteLastmod(),
    })),
    ...publishedArticles.map((article) => ({
      path: `/pet-care/${article.slug}`,
      lastmod: article.updatedAt,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${canonical(route.path)}</loc>
    <lastmod>${route.lastmod}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), xml);
}

renderLibrary();
renderPrivacyPolicy();
publishedCategories.forEach(renderCategory);
publishedArticles.forEach(renderArticle);
writeSitemap();

console.log(
  `[pet-care-static] generated ${publishedArticles.length} articles, ${publishedCategories.length} categories, and sitemap.xml for ${SITE_NAME}.`,
);
