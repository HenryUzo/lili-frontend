import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAppointmentDraft,
  postAppointmentDraftStep1,
  postAppointmentDraftStep2,
  postAppointmentDraftStep3,
  postAppointmentDraftStep4,
  postAppointmentDraftStep5,
  submitAppointmentDraft,
  uploadAppointmentDraftFiles,
} from "./api";
import {
  clearAppointmentDraftSession,
  saveAppointmentDraftSession,
} from "./storage";
import { appointmentDraftDetailQuery } from "./queries";

export const appointmentDraftKeys = {
  all: ["appointmentDraft"] as const,
};

type Step1VisitTypeApi =
  | "URGENT_CARE"
  | "WELLNESS_EXAM"
  | "VACCINATIONS"
  | "DENTAL_CARE"
  | "SURGERY"
  | "DIAGNOSTICS"
  | "NEW_PATIENT_VISIT"
  | "OTHER";

type Step2SpeciesApi = "DOG" | "CAT";
type Step2SexApi = "MALE" | "FEMALE";
type Step3PreferredContactMethodApi = "CALL" | "TEXT" | "EMAIL";
type Step4Variables = {
  sessionToken: string;
  payload: {
    preferredSelections: Array<{
      date: string;
      timeSlots: string[];
    }>;
    timezone: string;
  };
};

type Step1Variables = {
  sessionToken: string;
  payload: {
    visitType: Step1VisitTypeApi;
  };
};

type Step2Variables = {
  sessionToken: string;
  payload: {
    petName: string;
    species: Step2SpeciesApi;
    breed: string;
    approximateAgeYears: number;
    sex: Step2SexApi;
    weightLbs: number;
  };
};

type Step3Variables = {
  sessionToken: string;
  payload: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    preferredContactMethod: Step3PreferredContactMethodApi;
  };
};
type Step5Variables = {
  sessionToken: string;
  payload: {
    symptomsOrConcerns: string;
    currentMedications: string;
    previousVeterinarian: string;
    symptomDuration: string;
  };
};

type UploadAppointmentDraftFilesVariables = {
  sessionToken: string;
  payload: FormData;
};

export function useCreateAppointmentDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointmentDraft,
    onSuccess: (data) => {
      saveAppointmentDraftSession(data.sessionToken, data.lastCompletedStep);
      queryClient.setQueryData(appointmentDraftKeys.all, data);
    },
  });
}

export function usePostAppointmentDraftStep1() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionToken, payload }: Step1Variables) =>
      postAppointmentDraftStep1(sessionToken, payload),
    onSuccess: (data) => {
      saveAppointmentDraftSession(data.sessionToken, data.lastCompletedStep);
      queryClient.setQueryData(appointmentDraftKeys.all, data);
    },
  });
}

export function usePostAppointmentDraftStep2() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionToken, payload }: Step2Variables) =>
      postAppointmentDraftStep2(sessionToken, payload),
    onSuccess: (data) => {
      saveAppointmentDraftSession(data.sessionToken, data.lastCompletedStep);
      queryClient.setQueryData(appointmentDraftKeys.all, data);
    },
  });
}

export function usePostAppointmentDraftStep3() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionToken, payload }: Step3Variables) =>
      postAppointmentDraftStep3(sessionToken, payload),
    onSuccess: (data) => {
      saveAppointmentDraftSession(data.sessionToken, data.lastCompletedStep);
      queryClient.setQueryData(appointmentDraftKeys.all, data);
    },
  });
}
export function usePostAppointmentDraftStep4() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionToken, payload }: Step4Variables) =>
      postAppointmentDraftStep4(sessionToken, payload),
    onSuccess: (data) => {
      saveAppointmentDraftSession(data.sessionToken, data.lastCompletedStep);
      queryClient.setQueryData(appointmentDraftKeys.all, data);
    },
  });
}

export function usePostAppointmentDraftStep5() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionToken, payload }: Step5Variables) =>
      postAppointmentDraftStep5(sessionToken, payload),
    onSuccess: (data) => {
      saveAppointmentDraftSession(data.sessionToken, data.lastCompletedStep);
      queryClient.setQueryData(appointmentDraftKeys.all, data);
    },
  });
}

export function useUploadAppointmentDraftFiles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionToken,
      payload,
    }: UploadAppointmentDraftFilesVariables) =>
      uploadAppointmentDraftFiles(sessionToken, payload),
    onSuccess: (data) => {
      if (data?.sessionToken && data?.lastCompletedStep !== undefined) {
        saveAppointmentDraftSession(data.sessionToken, data.lastCompletedStep);
      }

      queryClient.setQueryData(appointmentDraftKeys.all, (prev: any) => ({
        ...prev,
        ...data,
      }));
    },
  });
}

export function useAppointmentDraft(sessionToken: string) {
  return useQuery(appointmentDraftDetailQuery(sessionToken));
}

export function useSubmitAppointmentDraft() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionToken: string) => submitAppointmentDraft(sessionToken),
    onSuccess: () => {
     clearAppointmentDraftSession()

queryClient.removeQueries({
  queryKey: appointmentDraftKeys.all,
});
    },
  });
}
