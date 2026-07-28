# Pet Care Library Phase 3 Growth Integration

## Architecture

Phase 3 keeps Google Tag Manager as the single browser tracking container and keeps Brevo secrets on the backend only.

Flow:

1. Pet Care page renders the existing approved Vite/React experience.
2. Newsletter form posts to `POST /api/pet-care/newsletter-subscriptions`.
3. Backend validates consent, honeypot, email, and pet preference.
4. Backend sends Brevo double opt-in through `/v3/contacts/doubleOptinConfirmation`.
5. Frontend shows `Check your inbox to confirm your subscription.` after `202 Accepted`.
6. Website pushes privacy-safe Pet Care events into `window.dataLayer`.
7. GTM maps those custom events to GA4/Google Ads tags.

No Brevo API key, list id, template id, or contact id is exposed in frontend JavaScript.

## Backend API

Endpoint:

`POST /api/pet-care/newsletter-subscriptions`

Request:

```json
{
  "email": "owner@example.com",
  "petPreference": "DOG",
  "consent": true,
  "source": "pet-care-library",
  "website": ""
}
```

Response:

```json
{
  "success": true,
  "status": "confirmation_required",
  "message": "Please check your email to confirm your subscription."
}
```

`website` is a honeypot field and must stay empty. The endpoint returns generic errors for disabled Brevo, upstream Brevo failures, and duplicate/pending ambiguity so it does not reveal list membership.

## Brevo Configuration

Required manual Brevo setup:

- API key added directly to Render as `BREVO_API_KEY`.
- Subscriber list named `Lili Vet Pet Care Subscribers`; use its id as `BREVO_PET_CARE_LIST_ID`.
- Double-opt-in confirmation template id as `BREVO_DOI_TEMPLATE_ID`.
- Verified sender/domain.
- Contact attribute `PET_PREFERENCE`.
- Confirmation redirect URL: `https://liliveterinaryhospital.com/pet-care?subscription=confirmed`.
- Confirmation email content approved by the business.

Enable only after configuration:

```text
PET_CARE_NEWSLETTER_ENABLED=true
```

## Consent And Privacy

Implemented controls:

- Consent checkbox is not pre-checked.
- Newsletter consent is separate from appointment and new-patient forms.
- Double opt-in is required before emails begin.
- Email and consent values are not sent to `dataLayer`.
- Pet preference is used only as marketing segmentation, not medical information.
- Brevo failures are logged with masked/hash email and correlation id only.

Recommended Privacy Policy update for legal/business review:

> Lili Veterinary Hospital may use Brevo as an email service provider to send pet care guidance, clinic news, and occasional marketing emails to users who explicitly subscribe and confirm through double opt-in. Subscribers can unsubscribe at any time. Pet preference may be used to tailor email content and is not used as medical record data.

The website now includes a real `/privacy-policy` route. The newsletter consent link uses that internal route in the same browser tab. The route is statically generated with title, description, canonical metadata, opening policy content and Breadcrumb JSON-LD, and it is included in the sitemap with a `2026-07-28` last-modified date.

The implementation is not legal approval. Business confirmation and legal review remain pending; see `docs/privacy-policy-implementation-review.md`. Newsletter promotion should remain pending until the public privacy contact, data practices and policy statements are approved.

## Analytics Events

Implemented website events:

- `pet_care_article_view`
- `pet_care_article_50_percent`
- `pet_care_article_complete`
- `pet_care_search`
- `pet_care_category_click`
- `pet_care_related_article_click`
- `pet_care_service_click`
- `pet_care_appointment_click`
- `pet_care_urgent_care_click`
- `pet_care_call_click`
- `pet_care_newsletter_signup`

Allowed payload fields only:

- `article_slug`
- `article_category`
- `article_author_id`
- `article_reviewer_id`
- `related_article_slug`
- `related_service`
- `cta_location`
- `result_count`
- `pet_preference`
- `scroll_percent`
- `signup_status`

The Pet Care call event is intentionally additional to the existing global `call_click` event.

## Commands

Frontend:

```bash
npm run content:validate
npm run content:status
npm run build
npm run seo:verify
npm run seo:verify:live
```

Backend:

```bash
npm run build
npm run lint
npm test
```

## Deployment Checklist

Backend:

- Add Brevo env vars in Render.
- Keep `BREVO_API_KEY` server-only.
- Set `PET_CARE_NEWSLETTER_ENABLED=true`.
- Deploy backend.
- Test endpoint with a controlled email.
- Confirm Brevo confirmation email arrives.

Frontend:

- Confirm Phase 2 and Phase 3 are committed.
- Deploy frontend.
- Run `npm run seo:verify:live`.
- Test newsletter form.
- Inspect `window.dataLayer`.
- Configure and publish GTM tags.
- Confirm GA4 Realtime.
- Submit sitemap in Search Console.

## Rollback

Set `PET_CARE_NEWSLETTER_ENABLED=false` in Render to disable newsletter submissions without redeploying frontend code. Pet Care analytics events can remain in the page because GTM controls downstream activation.

## Phase 4 Candidates

- Business and legal approval of the implemented Privacy Policy.
- Brevo performance dashboard.
- Search Console API read-only reporting.
- CMS/editorial admin workflow.
- Newsletter topic tagging by article/category.
