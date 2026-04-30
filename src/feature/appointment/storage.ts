const APPOINTMENT_DRAFT_TOKEN_KEY = "appointmentDraftSessionToken";
const APPOINTMENT_DRAFT_LAST_STEP_KEY = "appointmentDraftLastCompletedStep";

export function saveAppointmentDraftSession(
  sessionToken: string,
  lastCompletedStep: number
) {
  sessionStorage.setItem(APPOINTMENT_DRAFT_TOKEN_KEY, sessionToken);
  sessionStorage.setItem(
    APPOINTMENT_DRAFT_LAST_STEP_KEY,
    String(lastCompletedStep)
  );
}

export function getAppointmentDraftSession() {
  return {
    sessionToken:
      sessionStorage.getItem(APPOINTMENT_DRAFT_TOKEN_KEY) ?? "",
    lastCompletedStep: Number(
      sessionStorage.getItem(APPOINTMENT_DRAFT_LAST_STEP_KEY) ?? 0
    ),
  };
}

export function clearAppointmentDraftSession() {
  sessionStorage.removeItem(APPOINTMENT_DRAFT_TOKEN_KEY);
  sessionStorage.removeItem(APPOINTMENT_DRAFT_LAST_STEP_KEY);
}