import { api } from "../../lib/api/clients";

export type Species = "DOG" | "CAT";
export type Sex = "MALE" | "FEMALE";

export interface CreateNewPatientPayload {
  owner: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  visit: {
    reasonForVisit: string;
    isUrgent: boolean;
    preferredDateTime: string;
    timezone: string;
    previousVetClinic: string;
    consentToElectronicComms: boolean;
  };
  pet: {
    petName: string;
    species: Species;
    breed: string;
    age: string;
    sex: Sex;
    weightLbs: number;
    spayedNeutered: boolean;
    currentMedications: string;
    existingConditions: string;
  };
  uploadedFileIds: string[];
}

export interface UploadedFileResponse {
  id: string;
  originalName: string;
  storedName: string;
  mimeType: string;
  sizeBytes: number;
  storageProvider: string;
  storageKey: string;
  publicUrl: string | null;
  attachmentStatus: string;
  expiresAt: string | null;
  appointmentDraftId: string | null;
  appointmentRequestId: string | null;
  newPatientRequestId: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function createNewPatient(payload: CreateNewPatientPayload) {
  const response = await api.post("/new-patient-requests", payload);
  return response.data;
}

export async function uploadNewPatientFiles(files: File[]) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await api.post<{ files: UploadedFileResponse[] }>(
    "/files",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.files;
}
