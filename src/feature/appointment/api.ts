import { api } from "../../lib/api/clients";


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

export async function createAppointmentDraft() {
  const response = await api.post("/appointment-drafts");
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
