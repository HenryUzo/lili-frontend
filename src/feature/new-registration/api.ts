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

export async function createNewPatient(payload: CreateNewPatientPayload) {
  const response = await api.post("/new-patient-requests", payload);
  return response.data;
}
