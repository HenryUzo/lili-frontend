# Pet Care Phase 3 GTM / GA4 Guide

Keep the website setup as:

`Website -> GTM-KL8F96JF -> GA4 / Google Ads`

Do not add direct `gtag.js` to the website while GTM is installed.

## Variables

Create Data Layer Variables for:

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

## Event Tags

| Custom event trigger | GA4 event tag name | GA4 event name | Parameters |
| --- | --- | --- | --- |
| `pet_care_article_view` | `GA4 Event - Pet Care Article View` | `pet_care_article_view` | article slug/category/author/reviewer ids |
| `pet_care_article_50_percent` | `GA4 Event - Pet Care Article 50 Percent` | `pet_care_article_50_percent` | article slug/category, scroll percent |
| `pet_care_article_complete` | `GA4 Event - Pet Care Article Complete` | `pet_care_article_complete` | article slug/category, scroll percent |
| `pet_care_search` | `GA4 Event - Pet Care Search` | `pet_care_search` | result count, article category |
| `pet_care_category_click` | `GA4 Event - Pet Care Category Click` | `pet_care_category_click` | article category, CTA location |
| `pet_care_related_article_click` | `GA4 Event - Pet Care Related Article Click` | `pet_care_related_article_click` | article slug, related article slug, CTA location |
| `pet_care_service_click` | `GA4 Event - Pet Care Service Click` | `pet_care_service_click` | article slug/category, related service, CTA location |
| `pet_care_appointment_click` | `GA4 Event - Pet Care Appointment Click` | `pet_care_appointment_click` | article slug/category, CTA location |
| `pet_care_urgent_care_click` | `GA4 Event - Pet Care Urgent Care Click` | `pet_care_urgent_care_click` | article slug/category, CTA location |
| `pet_care_call_click` | `GA4 Event - Pet Care Call Click` | `pet_care_call_click` | article slug/category, CTA location |
| `pet_care_newsletter_signup` | `GA4 Event - Pet Care Newsletter Signup` | `pet_care_newsletter_signup` | pet preference, CTA location, signup status |

Recommended key events:

- `pet_care_appointment_click`
- `pet_care_call_click`
- `pet_care_newsletter_signup`

Do not mark reading-depth events as key events by default.

## Google Ads

If Google Ads asks for Google tag id `G-JM85PXWE2Y`, configure the Google tag or GA4 destination inside GTM. Do not add a separate direct Google tag script to `index.html` unless GTM is intentionally removed.

## Preview Tests

Positive tests:

- Open `/pet-care/dog-urgent-care`; confirm `pet_care_article_view` appears once.
- Scroll to mid-article; confirm `pet_care_article_50_percent` appears once.
- Scroll near article end; confirm `pet_care_article_complete` appears once.
- Search on `/pet-care`; confirm `pet_care_search` appears after debounce and contains no query text.
- Click related article, service, appointment, urgent-care, and call CTAs.
- Submit newsletter successfully; confirm `pet_care_newsletter_signup` appears only after `202`.

Negative tests:

- Refresh article route in React Strict Mode; article view must not duplicate.
- Type multiple search characters quickly; search events should debounce.
- Submit newsletter with invalid email or missing consent; newsletter signup event must not fire.
- Inspect `dataLayer`; no email, phone number entered by a user, pet name, symptom text, or medical details should appear.
