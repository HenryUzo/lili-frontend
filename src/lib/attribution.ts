export type AppointmentAttribution = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  landingPage?: string;
  referrer?: string;
  capturedAt?: string;
};

const STORAGE_KEY = "lilivet_appointment_attribution";

const PARAM_TO_FIELD = {
  gclid: "gclid",
  gbraid: "gbraid",
  wbraid: "wbraid",
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_term: "utmTerm",
  utm_content: "utmContent",
} as const;

export function getAppointmentAttribution(): AppointmentAttribution {
  if (typeof window === "undefined") return {};

  let stored: AppointmentAttribution = {};
  try {
    stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const current: AppointmentAttribution = {};
  for (const [parameter, field] of Object.entries(PARAM_TO_FIELD)) {
    const value = params.get(parameter)?.trim();
    if (value) current[field] = value;
  }

  const hasNewCampaignData = Object.keys(current).length > 0;
  const attribution: AppointmentAttribution = hasNewCampaignData
    ? {
        ...current,
        landingPage: window.location.href,
        referrer: document.referrer || undefined,
        capturedAt: new Date().toISOString(),
      }
    : stored;

  if (hasNewCampaignData) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  }

  return attribution;
}
