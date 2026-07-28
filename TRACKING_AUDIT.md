# Tracking Audit

## Current Tracking Setup

- Google Tag Manager is installed in `index.html` with container `GTM-KL8F96JF`.
- The GTM `<script>` is in the document `<head>`.
- The GTM `<noscript>` iframe is immediately after the opening `<body>` tag.
- No direct runtime `googletagmanager.com/gtag/js` script is installed in `index.html`, `src`, or `public`.
- No runtime `gtag(` calls are used by the website application.
- Google tag ID `G-JM85PXWE2Y` is documented here as the GTM configuration target only. The website does not load it directly.

## Search Notes

Repository-wide searches can show false positives in untracked local scratch files:

- `petparadise-home.html`
- `tmp-welcomehome.html`

Those files are not part of the Vite app runtime and are not included in the deployed website bundle.

## Event Strategy

The website uses `window.dataLayer` events only. GTM should listen for these custom events and decide which GA4 or Google Ads tags/conversions to fire.

| Event | Source | When it fires |
| --- | --- | --- |
| `form_start` | `src/app/components/appointment-form/AppointmentForm.tsx` | Once when a user first focuses or changes the appointment form |
| `form_start` | `src/app/components/register-pet-form/Registerpetform.tsx` | Once when a user first focuses or changes the new-patient form |
| `appointment_submitted` | `src/app/components/appointment-form/AppointmentForm.tsx` | Only after successful appointment submit |
| `new_patient_submitted` | `src/app/components/register-pet-form/Registerpetform.tsx` | Only after referral-source capture succeeds after new-patient submit |
| `call_click` | Header, call modal, footer, home hero, about hero, floating call button | When a user clicks a phone CTA |
| `directions_click` | Footer, contact page, urgent-care page | When a user clicks a map or directions CTA |
| `online_pharmacy_click` | Footer | When a user clicks the online pharmacy CTA |
| `review_click` | Footer | When a user clicks the review CTA |

## Duplicate Tracking Risk

Do not add a direct Google tag script like:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JM85PXWE2Y"></script>
```

If GTM already fires GA4 or Google Ads tags, adding direct `gtag.js` can duplicate page views, form events, or conversion events.

## Recommendation

Keep the website strategy as:

```text
Website -> Google Tag Manager GTM-KL8F96JF -> GA4 / Google Ads
```

Configure `G-JM85PXWE2Y` inside Google Tag Manager, not as another hardcoded website script. In GTM, map the website's `dataLayer` custom events to the appropriate GA4 events and Google Ads conversions.

## Google Tag Assistant Checks

Before marking tracking final, verify in Google Tag Assistant:

- Exactly one GTM container loads: `GTM-KL8F96JF`.
- No duplicate direct `gtag.js` Google tag is loaded by the page.
- A page view fires once per page load.
- `form_start` fires once per form interaction.
- `appointment_submitted` fires once after appointment success.
- `new_patient_submitted` fires once after the referral-source modal is completed.
- `call_click`, `directions_click`, and `online_pharmacy_click` appear once per relevant click.
