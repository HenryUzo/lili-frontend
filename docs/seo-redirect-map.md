# SEO Redirect Map

This document preserves high-value legacy WordPress URLs during the Lili Vet website migration to Vercel. Each redirect points to the closest relevant page on the current custom site and is implemented as a permanent redirect in `vercel.json`.

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

| Old WordPress URL | New destination | Reason / category | Status | Notes |
| --- | --- | --- | --- | --- |
| `/home` | `/` | Legacy homepage alias | Implemented | Direct homepage replacement |
| `/team` | `/about-us` | Team / about content | Implemented | Existing redirect retained |
| `/contact-us` | Current route | Current active page | Implemented | No redirect added to avoid self-redirect |
| `/request-appointment` | `/book-appointment` | Appointment booking | Implemented | Existing redirect retained |
| `/new-client-form` | `/new-patients` | New patient onboarding | Implemented | Closest intake route |
| `/wellness-prevention` | `/services/wellness-plans` | Preventive care | Implemented | Existing redirect retained |
| `/dental-care` | `/services/dental-care` | Dental services | Implemented | Existing redirect retained |
| `/diagnostics` | `/services/diagnostic-care` | Diagnostic services | Implemented | Existing redirect retained |
| `/surgery` | `/services/surgery` | Surgical services | Implemented | Existing redirect retained |
| `/dermatology` | `/services/diagnostic-care` | Specialty medicine | Implemented | Uncertain: no dedicated dermatology page exists |
| `/emergency` | `/urgent-care` | Emergency / urgent care | Implemented | Closest current urgent-care page |
| `/urgent-care-san-antonio` | `/urgent-care` | Location-specific urgent care | Implemented | Closest current urgent-care page |
| `/pet-emergency-san-antonio` | `/urgent-care` | Pet emergency intent | Implemented | Closest current urgent-care page |
| `/dental-cleanings-san-antonio` | `/services/dental-care` | Dental cleaning intent | Implemented | Closest current dental page |
| `/pet-vaccines-san-antonio` | `/services/vaccination` | Vaccination intent | Implemented | Closest current vaccination page |
| `/pet-wellness-preventive-care-san-antonio` | `/services/wellness-plans` | Wellness / preventive care | Implemented | Closest current wellness page |
| `/microchipping-san-antonio` | `/services/vaccination` | Preventive outpatient service | Implemented | Uncertain: no dedicated microchipping page exists |
| `/nutrition-counseling` | `/services/diagnostic-care` | Medical guidance service | Implemented | Uncertain: no dedicated nutrition page exists |
| `/internal-medicine` | `/services/diagnostic-care` | Medical specialty | Implemented | Uncertain: no dedicated internal medicine page exists |
| `/oncology` | `/services/diagnostic-care` | Medical specialty | Implemented | Uncertain: no dedicated oncology page exists |
| `/cardiology` | `/services/diagnostic-care` | Medical specialty | Implemented | Uncertain: no dedicated cardiology page exists |
| `/ophthalmology` | `/services/diagnostic-care` | Medical specialty | Implemented | Uncertain: no dedicated ophthalmology page exists |
| `/neurology` | `/services/diagnostic-care` | Medical specialty | Implemented | Uncertain: no dedicated neurology page exists |
| `/travel-health-certificates` | `/services/vaccination` | Preventive travel documentation | Implemented | Uncertain: no dedicated travel certificate page exists |
| `/helpful-links` | `/contact-us` | Support / information | Implemented | Uncertain: no resources page exists |
| `/payment-options` | `/contact-us` | Billing / payment info | Implemented | Uncertain: no payment page exists |
| `/surgical-form` | `/book-appointment` | Surgery intake action | Implemented | Uncertain: no dedicated surgical form exists |
| `/cold-laser-therapy` | `/services/diagnostic-care` | Therapeutic medical service | Implemented | Uncertain: no dedicated laser therapy page exists |
| `/laser-therapy` | `/services/diagnostic-care` | Therapeutic medical service | Implemented | Uncertain: no dedicated laser therapy page exists |
| `/wellness-pet-health-plans` | `/services/wellness-plans` | Wellness plans | Implemented | Closest current wellness plan page |
| `/careers` | `/contact-us` | Hiring / contact | Implemented | Uncertain: no careers page exists |
| `/careers-form` | `/contact-us` | Hiring / contact | Implemented | Uncertain: no careers intake form exists |
| `/pet-allergy-treatment-san-antonio` | `/services/diagnostic-care` | Dermatology / allergy intent | Implemented | Uncertain: no dedicated dermatology page exists |
| `/pet-eye-surgery-san-antonio` | `/services/surgery` | Surgical specialty | Implemented | Closest current surgery page |
| `/pet-orthopedic-surgery-san-antonio` | `/services/surgery` | Surgical specialty | Implemented | Closest current surgery page |
| `/soft-tissue-surgery-san-antonio` | `/services/surgery` | Surgical specialty | Implemented | Closest current surgery page |

## How to verify

Run these commands after deployment:

```bash
curl -I https://lili-frontend-plum.vercel.app/home
curl -I https://lili-frontend-plum.vercel.app/contact-us
curl -I https://lili-frontend-plum.vercel.app/urgent-care-san-antonio
curl -I https://lili-frontend-plum.vercel.app/dental-cleanings-san-antonio
```

Expected:

- HTTP status `301` or `308`
- `Location` header points to the mapped destination

## Remaining SEO follow-up

- Once the final domain is live, update the verification commands to use `https://liliveterinaryhospital.com`.
- Keep this redirect map available for migration QA, Search Console monitoring, and stakeholder review.
