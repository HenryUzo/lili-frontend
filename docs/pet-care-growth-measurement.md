# Pet Care Growth Measurement

## Discovery

- Search impressions: Search Console required.
- Organic clicks: Search Console required.
- CTR: Search Console required.
- Average position: Search Console required.
- New users: GA4 required.

## Engagement

- Article views: code event implemented; GTM/GA4 configuration required.
- 50% readers: code event implemented; GTM/GA4 configuration required.
- Article completions: code event implemented; GTM/GA4 configuration required.
- Related article clicks: code event implemented; GTM/GA4 configuration required.
- Search usage: code event implemented; GTM/GA4 configuration required.

## Conversion

- Service clicks: code event implemented; GTM/GA4 configuration required.
- Appointment clicks: code event implemented; configure as key event if approved.
- Urgent-care clicks: code event implemented.
- Calls: global `call_click` remains; Pet Care-specific `pet_care_call_click` is added.
- Newsletter confirmation requests: code event implemented after backend `202`; Brevo confirmation data required for confirmed subscribers.

## Retention

- Confirmed Brevo subscribers: Brevo reporting required.
- Newsletter engagement: Brevo reporting required.
- Returning article readers: GA4 reporting required.

## Reporting Notes

Code events alone do not create GA4 reports. GTM tags must be configured and published, GA4 Realtime should be verified, and Search Console/Brevo data must be reviewed in their platforms.
