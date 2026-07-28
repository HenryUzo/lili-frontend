export type DataLayerEvent = Record<string, unknown> & {
  event: string;
};

export const CLINIC_PHONE_NUMBER = "210-257-8496";
export const CLINIC_PHONE_DISPLAY = "(210) 257-8496";
export const DIRECTIONS_URL =
  "https://www.google.com/maps/place/Lili+Veterinary+Hospital+%2B+Urgent+Care/@29.642305,-98.4815096,739m/data=!3m2!1e3!4b1!4m6!3m5!1s0x865c89d98657135d:0x4d615151bf45d1d7!8m2!3d29.6423004!4d-98.4789347!16s%2Fg%2F11bx8rygyq?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D";
export const ONLINE_PHARMACY_URL =
  "https://lilivethospital.securevetsource.com/site/view/site/view/HomeDelivery.pml?retUrl%20=https://liliveterinaryhospital.com&cms=";
export const REVIEW_URL = "https://g.page/r/CdfRRb9RUWFNEB0/review";

export function trackEvent(
  eventName: string,
  payload: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;

  const eventPayload: DataLayerEvent = {
    event: eventName,
    ...payload,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventPayload);

  if (import.meta.env.DEV) {
    console.log("[tracking]", eventName, payload);
  }
}

export function pushDataLayerEvent(payload: DataLayerEvent) {
  const { event, ...eventPayload } = payload;
  trackEvent(event, eventPayload);
}

export function trackFormStart(
  formType: "appointment" | "new_patient",
  location: string,
) {
  trackEvent("form_start", {
    form_type: formType,
    location,
  });
}

export function trackAppointmentSubmitted(payload: {
  visitType: string | null;
  petSpecies: string | null;
  preferredDatesCount: number;
}) {
  trackEvent("appointment_submitted", {
    form_type: "appointment",
    visit_type: payload.visitType,
    pet_species: payload.petSpecies,
    preferred_dates_count: payload.preferredDatesCount,
  });
}

export function trackNewPatientSubmitted(payload: {
  petSpecies: string | null;
  isUrgent: boolean | null;
}) {
  trackEvent("new_patient_submitted", {
    form_type: "new_patient",
    pet_species: payload.petSpecies,
    is_urgent: payload.isUrgent,
  });
}

export function trackCallClick(location: string) {
  trackEvent("call_click", {
    location,
    phone_number: CLINIC_PHONE_NUMBER,
  });
}

export function trackDirectionsClick(location: string) {
  trackEvent("directions_click", {
    location,
  });
}

export function trackOnlinePharmacyClick(location: string) {
  trackEvent("online_pharmacy_click", {
    location,
  });
}

export function trackReviewClick(location: string) {
  trackEvent("review_click", {
    location,
  });
}
