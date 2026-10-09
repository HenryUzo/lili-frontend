import { api } from "../../lib/api/clients";
import type { AppointmentAttribution } from "../../lib/attribution";


export type AppointmentDraftResponse = {
  id: string;
  sessionToken: string;
  visitType:
    | "URGENT_CARE"
    | "WELLNESS_EXAM"
    | "VACCINATIONS"
    | "DENTAL_CARE"
    | "SURGERY"
    | "DIAGNOSTICS"
    | "NEW_PATIENT_VISIT"
    | "OTHER"
    | null;
  petName: string | null;
  species: "DOG" | "CAT" | null;
  breed: string | null;
  approximateAgeYears: number | null;
  sex: "MALE" | "FEMALE" | null;
  weightLbs: string | number | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  preferredContactMethod: "CALL" | "TEXT" | "EMAIL" | null;
  marketingEmailOptIn: boolean;
  marketingSmsOptIn: boolean;
  preferredSelections: Array<{
    date: string;
    timeSlots: string[];
  }>;
  timezone: string | null;
  symptomsOrConcerns: string | null;
  currentMedications: string | null;
  previousVeterinarian: string | null;
  symptomDuration: string | null;
  lastCompletedStep: number;
  expiresAt: string | null;
  submittedAt: string | null;
  appointmentRequestId: string | null;
  files: Array<{
    id?: string;
    name?: string;
    filename?: string;
    originalName?: string;
    url?: string;
  }>;
  appointmentRequest: unknown | null;
  createdAt: string;
  updatedAt: string;
};

export type AppointmentRescheduleContextResponse = {
  token: string;
  responseDeadline: string;
  appointmentRequestId: string;
  petName: string;
  ownerName: string;
  visitType:
    | "URGENT_CARE"
    | "WELLNESS_EXAM"
    | "VACCINATIONS"
    | "DENTAL_CARE"
    | "SURGERY"
    | "DIAGNOSTICS"
    | "NEW_PATIENT_VISIT"
    | "OTHER";
  confirmedStartAt: string | null;
  timezone: string | null;
  preferredSelections: Array<{
    date: string;
    timeSlots: string[];
  }>;
};

export async function createAppointmentDraft(attribution?: AppointmentAttribution) {
  const response = await api.post("/appointment-drafts", { attribution });
  return response.data;
}

export async function postAppointmentDraftStep1(
  sessionToken: string,
  payload: { visitType: string },
) {
  const response = await api.patch(
    `/appointment-drafts/${sessionToken}/step-1`,
    payload,
  );
  return response.data;
}

export async function postAppointmentDraftStep2(
  sessionToken: string,
    payload: {
      petName: string;
      species: "DOG" | "CAT";
      breed: string;
    approximateAgeYears: number;
    sex: "MALE" | "FEMALE";
    weightLbs: number;
  },
) {
  const response = await api.patch(
    `/appointment-drafts/${sessionToken}/step-2`,
    payload,
  );
  return response.data;
}

export async function postAppointmentDraftStep3(
  sessionToken: string,
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    preferredContactMethod: "CALL" | "TEXT" | "EMAIL";
    marketingEmailOptIn: boolean;
    marketingSmsOptIn: boolean;
  },
) {
  const response = await api.patch(
    `/appointment-drafts/${sessionToken}/step-3`,
    payload,
  );
  return response.data;
}

export async function postAppointmentDraftStep4(
  sessionToken: string,
  payload: {
    preferredSelections: Array<{
      date: string;
      timeSlots: string[];
    }>;
    timezone: string;
  },
) {
  const response = await api.patch(
    `/appointment-drafts/${sessionToken}/step-4`,
    payload,
  );

  return response.data;
}

export async function postAppointmentDraftStep5(
  sessionToken: string,
  payload: {
    symptomsOrConcerns: string;
    currentMedications: string;
    previousVeterinarian: string;
    symptomDuration: string;
  },
) {
  const response = await api.patch(
    `/appointment-drafts/${sessionToken}/step-5`,
    payload,
  );

  return response.data;
}

export async function uploadAppointmentDraftFiles(
  sessionToken: string,
  payload: FormData,
) {
  const response = await api.post(
    `/appointment-drafts/${sessionToken}/files`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}

export async function submitAppointmentDraft(sessionToken: string) {
  const response = await api.post(
    `/appointment-drafts/${sessionToken}/submit`,
  );

  return response.data;
}

export async function getAppointmentDraft(sessionToken: string) {
  const response = await api.get<AppointmentDraftResponse>(
    `/appointment-drafts/${sessionToken}`
  );

  return response.data;
}

export async function getAppointmentRescheduleContext(token: string) {
  const response = await api.get<AppointmentRescheduleContextResponse>(
    `/appointment-requests/reschedule/${token}`
  );

  return response.data;
}

export async function submitAppointmentReschedule(
  token: string,
  payload: {
    preferredSelections: Array<{
      date: string;
      timeSlots: string[];
    }>;
    timezone: string;
  }
) {
  const response = await api.post(
    `/appointment-requests/reschedule/${token}/submit`,
    payload
  );

  return response.data;
}

export type AppointmentBookingSettings = {
  mode: "STANDARD" | "SIMPLIFIED";
  timezone: "America/Chicago";
  maxDaysAhead: number;
  hours: {
    weekdays: { open: string; close: string };
    saturday: { open: string; close: string };
    sunday: null;
  };
};

export async function getAppointmentBookingSettings() {
  const response = await api.get<AppointmentBookingSettings>("/appointment-booking/settings");
  return response.data;
}

export async function submitSimplifiedAppointment(payload: {
  clientFullName: string;
  petName: string;
  petType: "DOG" | "CAT";
  email: string;
  phoneNumber: string;
  reasonForVisit: string;
  preferredDate: string;
  preferredTime: string;
  preferredSelections: Array<{ date: string; time: string }>;
  website: string;
  attribution?: AppointmentAttribution;
}) {
  const response = await api.post("/appointment-booking/simplified", payload);
  return response.data as { id: string; requestedDate: string; requestedTime: string; requestedSelections: Array<{ date: string; time: string }>; timezone: string };
}
