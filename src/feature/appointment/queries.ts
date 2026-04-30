import { queryOptions } from "@tanstack/react-query";
import { getAppointmentDraft } from "./api";

export const appointmentDraftKeys = {
  all: ["appointmentDraft"] as const,
  detail: (sessionToken: string) =>
    ["appointmentDraft", sessionToken] as const,
};

export function appointmentDraftDetailQuery(sessionToken: string) {
  return queryOptions({
    queryKey: appointmentDraftKeys.detail(sessionToken),
    queryFn: () => getAppointmentDraft(sessionToken),
    enabled: !!sessionToken,
  });
}