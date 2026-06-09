import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createNewPatient,
  CreateNewPatientPayload,
  saveNewPatientReferralSource,
  uploadNewPatientFiles,
} from "./api";

export const newPatientKeys = {
  all: ["new-patient-requests"] as const,
};

export function useCreateNewPatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateNewPatientPayload) =>
      createNewPatient(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: newPatientKeys.all,
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to submit new patient request."
      );
    },
  });
}

export function useUploadNewPatientFiles() {
  return useMutation({
    mutationFn: (files: File[]) => uploadNewPatientFiles(files),

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to upload new patient files."
      );
    },
  });
}

export function useSaveNewPatientReferralSource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: {
      requestId: string;
      token: string;
      source: Parameters<typeof saveNewPatientReferralSource>[0]["source"];
      otherText?: string;
    }) => saveNewPatientReferralSource(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: newPatientKeys.all,
      });
    },
  });
}
