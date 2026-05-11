# SEO Redirect Map

This document preserves high-value legacy WordPress URLs during the Lili Vet website migration to Vercel. Redirects are configured in [C:\Websites\Lilivet\website\vercel.json](C:\Websites\Lilivet\website\vercel.json) as permanent redirects.

## Current public routes

- `/`
- `/about-us`
- `/book-appointment`
- `/contact-us`
- `/new-patients`
- `/urgent-care`
- `/services/wellness-plans`
- `/services/vaccination`
- `/services/diagnostic-care`
- `/services/dental-care`
- `/services/surgery`

## Redirect map

| Old WordPress URL | New destination | Redirect status | Confidence | Temporary fallback | Notes |
| --- | --- | --- | --- | --- | --- |
| `/home` | `/` | `308` | High | No | Legacy homepage alias |
| `/team` | `/about-us` | `308` | High | No | Old team/about page |
| `/contact-us` | Current route | `200` | High | No | Active current route, no redirect added to avoid self-redirect |
| `/request-appointment` | `/book-appointment` | `308` | High | No | Legacy appointment request page |
| `/new-client-form` | `/new-patients` | `308` | High | No | Existing new patient intake equivalent |
| `/new-client-form-1` | `/new-patients` | `308` | High | No | Additional legacy intake alias |
| `/emergency` | `/urgent-care` | `308` | High | No | Closest current urgent-care page |
| `/urgent-care-san-antonio` | `/urgent-care` | `308` | High | No | Location-specific urgent care slug |
| `/pet-emergency-san-antonio` | `/urgent-care` | `308` | High | No | Pet emergency intent |
| `/dental-care` | `/services/dental-care` | `308` | High | No | Closest current dental page |
| `/dental-cleanings-san-antonio` | `/services/dental-care` | `308` | High | No | Dental cleaning intent |
| `/pet-vaccines-san-antonio` | `/services/vaccination` | `308` | High | No | Vaccination service intent |
| `/pet-wellness-preventive-care-san-antonio` | `/services/wellness-plans` | `308` | High | No | Preventive care intent |
| `/wellness-prevention` | `/services/wellness-plans` | `308` | High | No | Legacy wellness slug |
| `/wellness-pet-health-plans` | `/services/wellness-plans` | `308` | High | No | Legacy wellness plans slug |
| `/diagnostics` | `/services/diagnostic-care` | `308` | High | No | Closest current diagnostic page |
| `/surgery` | `/services/surgery` | `308` | High | No | Closest current surgery page |
| `/soft-tissue-surgery-san-antonio` | `/services/surgery` | `308` | High | No | Surgery specialty intent |
| `/pet-eye-surgery-san-antonio` | `/services/surgery` | `308` | High | No | Surgery specialty intent |
| `/pet-orthopedic-surgery-san-antonio` | `/services/surgery` | `308` | High | No | Surgery specialty intent |
| `/helpful-links` | `/contact-us` | `308` | Medium | Yes | No resources page exists yet |
| `/payment-options` | `/contact-us` | `308` | Medium | Yes | No payment/options page exists yet |
| `/microchipping-san-antonio` | `/book-appointment` | `308` | Medium | Yes | Dedicated microchipping page is missing |
| `/nutrition-counseling` | `/book-appointment` | `308` | Medium | Yes | Dedicated nutrition page is missing |
| `/internal-medicine` | `/book-appointment` | `308` | Medium | Yes | Dedicated internal medicine page is missing |
| `/oncology` | `/book-appointment` | `308` | Medium | Yes | Dedicated oncology page is missing |
| `/cardiology` | `/book-appointment` | `308` | Medium | Yes | Dedicated cardiology page is missing |
| `/ophthalmology` | `/book-appointment` | `308` | Medium | Yes | Dedicated ophthalmology page is missing |
| `/neurology` | `/book-appointment` | `308` | Medium | Yes | Dedicated neurology page is missing |
| `/travel-health-certificates` | `/book-appointment` | `308` | Medium | Yes | Dedicated travel certificate page is missing |
| `/surgical-form` | `/book-appointment` | `308` | Medium | Yes | Dedicated surgical intake form is missing |
| `/cold-laser-therapy` | `/book-appointment` | `308` | Medium | Yes | Dedicated cold-laser therapy page is missing |
| `/laser-therapy` | `/book-appointment` | `308` | Medium | Yes | Dedicated laser therapy page is missing |
| `/careers` | `/contact-us` | `308` | Low | Yes | Dedicated careers page is missing |
| `/careers-form` | `/contact-us` | `308` | Low | Yes | Dedicated careers form is missing |
| `/pet-allergy-treatment-san-antonio` | `/urgent-care` | `308` | Medium | Yes | Dedicated allergy/dermatology page is missing |

## Related legacy aliases still implemented

These are also configured because they were present in the previous redirect pass or legacy slug set:

| Old URL | New destination | Notes |
| --- | --- | --- |
| `/dermatology` | `/services/diagnostic-care` | No dedicated dermatology page exists |
| `/vaccination` | `/services/vaccination` | Legacy shorthand alias |

## SEO gaps that deserve dedicated pages later

These routes currently use temporary fallbacks and should become dedicated pages if they matter for search demand:

- Microchipping
- Nutrition counseling
- Internal medicine
- Oncology
- Cardiology
- Ophthalmology
- Neurology
- Travel health certificates
- Cold laser therapy / laser therapy
- Pet allergy treatment
- Careers

## How to verify

Run these commands after deployment:

```bash
curl -I https://lili-frontend-plum.vercel.app/home
curl -I https://lili-frontend-plum.vercel.app/request-appointment
curl -I https://lili-frontend-plum.vercel.app/urgent-care-san-antonio
curl -I https://lili-frontend-plum.vercel.app/dental-cleanings-san-antonio
curl -I https://lili-frontend-plum.vercel.app/microchipping-san-antonio
```

Expected:

- HTTP status `301` or `308`
- `Location` header points to the mapped destination
- Destination route returns `200`

## Cutover note

Once the final domain is live, rerun the same verification against [https://liliveterinaryhospital.com](https://liliveterinaryhospital.com) and keep this map available for Search Console and migration QA.
