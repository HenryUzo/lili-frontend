# Pet Care Library Phase 1 Design

## Routes

- `/pet-care`
- `/pet-care/category/:categorySlug`
- `/pet-care/:articleSlug`

These routes are lazy-loaded through the existing React Router setup and use the existing layout, navbar, footer, and SEO component.

## Screen Structure

## Reference Pages Inspected

- Homepage hero and storytelling sections
- Urgent Care hero and symptom-card section
- Wellness Plan hero and plan/card compositions

## Public Website Patterns Reused

- Oversized pet imagery and cutout-style compositions
- Asymmetric hero layouts
- Pale green and warm cream backgrounds
- Dark green campaign panels
- Red accent only for urgency and emphasis
- Yellow/gold stamped highlights
- Script `font-queen` as a selective handwritten accent
- Paper-note, notebook, and sticker-like card treatments
- Rotated cards and layered white photo frames
- Round veterinarian-reviewed badges
- Paw and medical icon motifs
- Existing rounded CTAs and green button language
- Existing local imagery for pets, doctor, clinic, wellness, urgent care, and service contexts

### Pet Care Library Landing Page

- Hero with H1, supporting copy, large search input, Book an Appointment CTA, and View Urgent Care CTA
- Featured article card
- Browse-by-category section
- Popular articles grid
- Seasonal South Texas guidance section
- Latest articles grid with search/category filtering
- Brevo-ready newsletter module
- Final conversion CTA

### Category Archive Page

- Breadcrumbs
- Category badge, H1, and introduction
- Search input
- Category filter pills
- Featured article for the category
- Article grid
- Empty state for no matches or future low-content categories
- Load More visual treatment only
- Related urgent-care service CTA

### Article Detail Page

- Breadcrumbs
- Category badge
- H1, summary, author, reviewer, dates, reading time
- Hero image
- Sticky desktop table of contents and horizontal mobile table of contents
- Key takeaways
- Urgent warning box
- Semantic H2 article sections
- Monitor-at-home callout
- Inline service CTAs
- FAQs
- Related service
- Related articles
- Author/reviewer profile
- Medical disclaimer
- References
- Newsletter module

## Components

- `ArticleCard`
- `FeaturedArticleCard`
- `ReviewerBadge`
- `UrgentWarningBox`
- `InlineServiceCTA`
- `RelatedArticleCard`
- `NewsletterModule`
- `PetCareSearch`
- `PetCareEmptyState`
- `CategoryFilters`
- `ArticleMeta`
- `ArticleBreadcrumbs`
- `MedicalDisclaimer`
- `AuthorReviewerProfile`
- `VetTipCard`
- `NotebookInfoCard`
- `ArticleChecklist`
- `DecorativeAnnotation`

## Components Redesigned

- `ArticleCard`: changed from generic cards to calm editorial cards with consistent borders, larger readable titles, controlled excerpts, and a simple veterinarian-reviewed indicator.
- `FeaturedArticleCard`: changed to a large layered editorial story block with angled image frame, stamp, handwritten note, key takeaway, reviewer badge, and CTA.
- `NewsletterModule`: changed to a dark green campaign section with pet imagery, script accent, paper-form treatment, and prototype loading/success/error states.
- `UrgentWarningBox`: changed to a soft red paper-note warning with emergency stamp and phone CTA.
- `InlineServiceCTA`: changed to a richer pale-lime care block with doctor/pet motif and multiple conversion routes.
- `PetCareSearch`: changed to a larger primary search control with visible search action, accessible clear action, and stronger hero utility.
- `PetCareEmptyState`: changed to a warm notebook-style empty state with icon/stamp treatment.
- `CategoryFilters`: retained as secondary filters, with stamped pill styling.
- `AuthorReviewerProfile`, `ReviewerBadge`, and `RelatedArticleCard`: updated to match the new paper/stamp visual system.
- `PetCareArticle`: mobile table of contents changed from an always-visible horizontal strip to a native collapsible `details` control.

## Design Tokens Used

- Background: `#F7FAF2`, `#F2F8EA`, white cards
- Primary green: `#006838`
- Deep heading green: `#073D2A`
- Fresh accent green: `#008F49`
- Soft lime borders/backgrounds: `#CFE8BC`, `#D6EBAE`, `#E9F7DE`
- Warning red: `#ED1C24`, `#FFF1F1`
- Featured gold: `#FFE8A8`, `#FFF9E8`
- Rounded editorial cards from `24px` to `36px`
- Borders, contrast, and spacing instead of card or section drop shadows

## Mock Article Structure

Mock articles live in `src/data/pet-care-articles.ts`. Phase 1 now includes twelve mock articles: the original eight requested articles, two seasonal San Antonio articles, and two additional urgent-care articles so category pages do not show thin or misleading empty states.

Each article includes:

- id
- slug
- title
- excerpt
- summary
- category
- categorySlug
- tags
- image and imageAlt
- author
- reviewer
- publishedAt
- reviewedAt
- readingTime
- relatedServicePath
- relatedServiceLabel
- featured/popular/seasonal flags
- keyTakeaways
- monitorAtHome
- faqs
- references
- body sections

## Conversion Placements

- Landing hero: Book Appointment and View Urgent Care
- Landing final CTA: appointment, urgent care, and call options
- Article body: inline CTA after early symptom section
- Article end: related service CTA and newsletter signup
- Warning box: direct phone CTA
- Archive page: related urgent-care CTA

## Asset Reuse Decisions

Used existing project assets only:

- Lili Vet logo remains untouched through the existing navbar/footer.
- Doctor reviewer photo: `dr-okafor.webp`
- Dog/cat campaign imagery: `cutedogcat.png`, `cozy-cat-dog.png`, `happy-dogs.png`
- Urgent care imagery: `difficulty-breathing.jpg`, `limping.png`, `no-appetite.png`, `siren-light.png`
- Wellness/service imagery: `servicesBg.png`, `Pet-exam.png`, `modern-recovery-area.webp`, `dental-care-bg.png`
- Motifs/icons: paw, heart, dental, vaccine, surgery, and medical assets already in the repo

No remote image URLs, remote Lottie files, or external visual assets were introduced.

### Article Image Mapping Refinement

- Dog urgent-care guidance now uses a dog-focused urgent-care image instead of a sleeping cat image.
- Puppy vaccination guidance uses a puppy and preventive-care image rather than a generic injection-only visual.
- Wellness exam guidance uses a veterinarian-exam context.
- Dental guidance uses dental/oral-care imagery.
- Wellness plan education avoids the retail-style `BEST VALUE` burst and uses a clinic/preventive-care visual.
- Seasonal content is limited to heat, fireworks, and South Texas parasite-prevention guidance.

## Content Deduplication

- Added shared selectors in `src/data/pet-care-articles.ts`: `getFeaturedArticle`, `getPopularArticles`, `getSeasonalArticles`, and `getLatestArticles`.
- Featured content is excluded from Latest.
- Popular content is selected as a distinct group.
- Seasonal content is pulled only from seasonal/local articles.
- Search and category results still use the full article set, but landing-page editorial sections avoid repeating the same story across every block.

## Accessibility Decisions

- One H1 per page
- Semantic section headings
- Crawlable `Link` elements for internal navigation
- Visible focus states on links, buttons, filters, and inputs
- Form labels for search and newsletter fields
- Radio labels for pet type preference
- Image alt text in mock data
- Keyboard-accessible category filters
- Search clear button with accessible label
- Warning state uses icon, color, heading, and text, not color alone
- Mobile table of contents uses a keyboard-accessible collapsible `details` control with scrollable anchor links
- Card links and filter controls preserve visible focus states
- Category and suggested-search controls meet minimum tap-target sizing

## Responsive Behavior

- Cards collapse from multi-column grids to single-column stacks
- Newsletter form stacks under content on smaller viewports
- Article desktop TOC becomes a collapsible mobile TOC
- CTAs stack vertically on mobile
- Category pills wrap instead of overflowing
- Fixed-width content is constrained with max-width containers
- Oversized hero images are constrained with `min()` widths and remain behind/alongside copy at smaller breakpoints
- Right-side article CTA rail is desktop-only; mobile keeps the article in a single readable column
- Decorative annotations are hidden on smaller screens when they could crowd content

## Refinement Pass Corrections

- Reduced visual noise in article cards by removing random card rotation and decorative paw overlays from standard cards.
- Added suggested hero search terms so the search interaction is more obvious.
- Limited visible category cards to the six primary topics with a `View all categories` action for secondary topics.
- Rebuilt the popular section around one lead story, two secondary stories, and one compact vet-tip card.
- Rebuilt the seasonal section around a campaign-style dark-green panel and readable horizontal article tiles.
- Simplified the final CTA to appointment, call, and urgent-care paths without a duplicate CTA row.
- Category pages now show fallback related articles when a category has only one direct match, avoiding a false "coming soon" experience.

## Category Archive Refinement

- Replaced the tall category hero with a compact two-column editorial hero.
- Moved search into the hero copy column so it is directly tied to the category heading and intro.
- Moved category navigation into a separate compact horizontal filter rail with smaller pills and mobile scrolling.
- Replaced the heavy landing-page featured component with a category-specific featured row using a single image, clear metadata, reviewer badge, and one CTA.
- Replaced the uneven oversized/narrow archive layout with equal-width cards: three columns when enough content exists, two columns when only two matching articles remain, and one column on mobile.
- Removed the prototype `Load More visual state` control; no load-more button appears unless real additional content exists.
- Moved veterinarian advice out of the article grid into a compact guidance strip with a doctor avatar, call CTA, and urgent-care link.
- Replaced the oversized final service CTA with a balanced dark-green campaign block using one clinic-care image, appointment CTA, urgent-care CTA, and phone link.
- For the urgent-care category, image usage is intentionally separated: hero uses a calm at-home pet image, featured uses a veterinarian-with-dog image, archive cards keep article-specific symptom imagery, and the final CTA uses a veterinarian exam image.
- Decorative handwriting and floating badges were removed from category archive pages except for the single veterinarian-reviewed hero badge.

## Shadow Removal Pass

- Removed Tailwind `shadow-*`, arbitrary shadow, hover shadow, and `drop-shadow-*` classes from Pet Care landing, category/archive, and article pages.
- Removed card and section shadows from shared Pet Care components so all three pages use borders, background contrast, spacing, and hierarchy instead.
- Preserved focus rings, hover movement, borders, and rounded layouts for accessibility and affordance.

## Editorial Hierarchy

- Landing page now behaves like a campaign page rather than a plain archive.
- Category pages now have category-specific campaign heroes and mixed archive layouts.
- Article pages prioritize readability with a centered article column, but add brand expression through framed imagery, notebook blocks, vet tips, and selective annotations.
- Script text is used as an accent label only, not as body copy.

## Navigation Recommendation

The current navbar already includes Home, Urgent Care, Services, New Patients, About, Contact, Book Appointment, and Call Now. Adding Pet Care directly could crowd desktop and mobile layouts.

Recommended Phase 2 placement:

- Add `Pet Care` in the footer under a Resources column.
- Consider adding `Pet Care` to the main nav only after a spacing pass or if another nav item is moved into a menu.

## Phase 2 Recommendations

- Add CMS or MDX publishing workflow
- Add production search backend or indexed static search
- Add article structured data after SEO architecture review
- Add sitemap entries for content routes
- Add article analytics events through GTM-safe `dataLayer` helpers
- Connect newsletter module to Brevo
- Add editorial review workflow and reviewer profiles
- Add image optimization and article-specific Open Graph assets
- Add content QA checklist for medical review and local SEO terms
