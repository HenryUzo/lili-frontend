import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createNewPatient, CreateNewPatientPayload } from "./api";

export const newPatientKeys = {
  all: ["new-patient-requests"] as const,
};

export function useCreateNewPatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateNewPatientPayload) =>
      createNewPatient(payload),

    onSuccess: () => {
      toast.success("New patient request submitted successfully.");

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