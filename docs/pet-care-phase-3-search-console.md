# Pet Care Phase 3 Search Console Runbook

Do not use Google's Indexing API for normal Pet Care articles. These pages are not `JobPosting` or `BroadcastEvent` pages.

## Manual Steps

1. Verify the domain property for `liliveterinaryhospital.com` if it is not already verified.
2. Submit `https://liliveterinaryhospital.com/sitemap.xml`.
3. Inspect `/pet-care`.
4. Inspect priority article URLs:
   - `/pet-care/dog-urgent-care`
   - `/pet-care/cat-not-eating`
   - `/pet-care/puppy-vaccination-schedule-san-antonio`
   - `/pet-care/pet-wellness-exam`
   - `/pet-care/pet-dental-cleaning-signs`
   - `/pet-care/prepare-pet-for-surgery`
   - `/pet-care/heatstroke-in-dogs`
   - `/pet-care/wellness-plans-vs-pet-insurance`
   - `/pet-care/fireworks-safety-for-pets`
   - `/pet-care/fleas-ticks-heartworm-south-texas`
   - `/pet-care/dog-limping-when-to-call-vet`
   - `/pet-care/vomiting-diarrhea-when-urgent`
5. Request indexing manually where appropriate after production deployment.
6. Monitor Pages/Indexing for crawl, canonical, and 404 issues.
7. Monitor rich-result and structured-data issues.
8. Monitor Core Web Vitals.
9. Compare article impressions, clicks, CTR, and average position.

## Live Verification

Run:

```bash
PET_CARE_VERIFY_BASE_URL=https://liliveterinaryhospital.com npm run seo:verify:live
```

PowerShell:

```powershell
$env:PET_CARE_VERIFY_BASE_URL="https://liliveterinaryhospital.com"; npm run seo:verify:live
```

The script checks live status, H1, canonical, description, Article JSON-LD, breadcrumb JSON-LD, FAQ JSON-LD expectations, sitemap inclusion, robots.txt, and accidental Vercel preview-domain leakage.

Do not claim the sitemap was submitted unless authenticated Search Console access was actually used.

## Future API Option

A future read-only Search Console API integration could query Search Analytics, sitemaps, and URL inspection status. OAuth credentials are intentionally out of scope for Phase 3.
