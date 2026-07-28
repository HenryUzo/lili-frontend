# Pet Care Library Phase 2 SEO Publishing

## Architecture

Phase 2 uses typed local content plus post-build static HTML generation.

- Source content lives in `src/content/pet-care/pet-care-content.mjs`.
- Runtime React data is normalized in `src/data/pet-care-articles.ts`.
- Reviewer data is normalized in `src/data/veterinary-reviewers.ts`.
- `npm run build` runs Vite and then generates static HTML for `/pet-care`, category pages, article pages, and `dist/sitemap.xml`.

This keeps the approved Vite/React UI intact while giving crawlers route-specific HTML, canonical tags, metadata, and JSON-LD before hydration.

## Content Model

Each article includes:

- `status`: `draft`, `review`, `published`, or `archived`
- `reviewStatus`: `not-reviewed`, `in-review`, or `medically-reviewed`
- SEO fields: `seoTitle`, `seoDescription`, `slug`, `publishedAt`, `updatedAt`
- medical review fields: `reviewerId`, `reviewedAt`
- content fields: sections, FAQ, references, related service, related article slugs
- image fields: `heroImageKey`, `heroImageFile`, `heroImageAlt`

Only `published` articles are shown on public search/archive pages and included in the generated sitemap.

## Medical Review Workflow

1. Add or update an article as `draft`.
2. Move it to `review` when the content is ready for veterinarian review.
3. After review, set:
   - `status: "published"`
   - `reviewStatus: "medically-reviewed"`
   - `reviewerId`
   - `reviewedAt`
   - `updatedAt`
4. Run `npm run content:validate`.

Published articles fail validation if they are not medically reviewed.

## SEO Output

Generated article routes include:

- route-specific `<title>`
- meta description
- canonical URL using `https://liliveterinaryhospital.com`
- Open Graph and Twitter metadata
- `article:published_time`
- `article:modified_time`
- `article:author`
- Article JSON-LD
- Breadcrumb JSON-LD
- FAQ JSON-LD when FAQs are visible

The generated sitemap includes current public website routes, `/pet-care`, published category pages, and published article pages. Draft, review, archived, admin, preview, and search URLs are excluded.

## Commands

```bash
npm run content:validate
npm run build
npm run seo:verify
```

`npm run build` must be used for production builds so the static Pet Care HTML and sitemap are generated after Vite finishes.

## Adding An Article

1. Add the image to `src/app/assests/images`.
2. Add the article to `src/content/pet-care/pet-care-content.mjs`.
3. Use an existing category slug or add a category intentionally.
4. Link to only existing service routes.
5. Add related article slugs only after those articles exist.
6. Run validation and build.

## Archiving

Set `status: "archived"` to remove an article from public listings and sitemap generation without deleting historical content from the repo.

## Limitations

- This is not full server-side rendering. The generated static HTML improves crawlability for Pet Care routes, while React still hydrates the live experience on the client.
- Images are still part of the Vite asset pipeline; large image optimization should be handled in a future media optimization pass.
- There is no CMS or editorial dashboard yet.

## Phase 3 Candidates

- CMS-backed editorial workflow
- image resizing pipeline with modern formats
- richer author/reviewer profile pages
- article freshness dashboard
- expanded internal-link recommendations
- GA4/GTM content engagement reporting
