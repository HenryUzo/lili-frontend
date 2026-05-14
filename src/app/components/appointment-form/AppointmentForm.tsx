import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Mail,
  MessageSquare,
  Phone,
  UploadCloud,
  X,
} from "lucide-react";

import images from "../../assests/images";
import InertiaHover from "../../reuseable-components/inertia-hover";
import PhoneCallDialog from "../../reuseable-components/call-modal";
import PhonePanel from "../../reuseable-components/phone-panel";
import { trackAppointmentSubmitted } from "../../../lib/analytics";

import {
  useAppointmentDraft,
  useCreateAppointmentDraft,
  usePostAppointmentDraftStep1,
  usePostAppointmentDraftStep2,
  usePostAppointmentDraftStep3,
  usePostAppointmentDraftStep4,
  usePostAppointmentDraftStep5,
  useSubmitAppointmentDraft,
  useUploadAppointmentDraftFiles,
} from "../../../feature/appointment/hooks";
import {
  clearAppointmentDraftSession,
  getAppointmentDraftSession,
} from "../../../feature/appointment/storage";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

/* --------------------------------- types --------------------------------- */

const visitTypeValues = [
  "urgent-care",
  "wellness-exam",
  "vaccinations",
  "dental-care",
  "surgery",
  "diagnostics",
  "new-patient",
  "others",
] as const;

const contactMethodValues = ["call", "text", "email"] as const;
const sexValues = ["male", "female"] as const;

type VisitType = (typeof visitTypeValues)[number];
type ContactMethod = (typeof contactMethodValues)[number];
type Sex = (typeof sexValues)[number];

type PreferredSelection = {
  date: string;
  timeSlots: string[];
};

type IndexedPreferredSelection = PreferredSelection & {
  originalIndex: number;
};

type FormValues = {
  visitType: VisitType | "";
  petName: string;
  species: string;
  breed: string;
  age: string;
  sex: Sex | "";
  weight: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContactMethod: ContactMethod | "";

  preferredSelections: PreferredSelection[];
  timezone: string;

  symptoms: string;
  currentMedications: string;
  previousVeterinarian: string;
  duration: string;

  uploadedFile: File | null;

  confirmContact: boolean;
  confirmCommunication: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type AppointmentRequestSectionProps = {
  onSubmitRequest?: (
    payload: FormData,
    values: FormValues,
  ) => Promise<void> | void;
};

type DraftPreviewData = NonNullable<
  ReturnType<typeof useAppointmentDraft>["data"]
>;

type DraftPreservedFields = Pick<
  FormValues,
  "confirmContact" | "confirmCommunication" | "uploadedFile"
>;

/* ------------------------------- constants -------------------------------- */

const WEEK_DAYS = 6;

const STEP_META = [
  { key: 1, label: "Visit Type Selection", percent: 15 },
  { key: 2, label: "Pet Information", percent: 30 },
  { key: 3, label: "Owner Information", percent: 50 },
  { key: 4, label: "Preferred Times", percent: 70 },
  { key: 5, label: "Medical Information", percent: 85 },
  { key: 6, label: "Preview Your Request", percent: 95 },
] as const;

const stepFields: Record<number, (keyof FormValues)[]> = {
  1: ["visitType"],
  2: ["petName", "species", "breed", "age", "sex", "weight"],
  3: ["firstName", "lastName", "email", "phone", "preferredContactMethod"],
  4: ["preferredSelections", "timezone"],
  5: ["symptoms", "currentMedications", "duration"],
  6: ["confirmContact", "confirmCommunication"],
};

const VISIT_OPTIONS: {
  id: VisitType;
  title: string;
  description: string;
  icon: string;
  tone?: "urgent" | "default";
  rotate?: string;
}[] = [
  {
    id: "urgent-care",
    title: "Urgent Care",
    description: "Non-life threatening same-day medical needs.",
    icon: images.blinkers,
    tone: "urgent",
    rotate: "md:-rotate-[2.68deg]",
  },
  {
    id: "wellness-exam",
    title: "Wellness Exam",
    description: "Routine exams, preventive care, and annual checkups.",
    icon: images.stethoscope,
    rotate: "md:-rotate-[-2.24deg]",
  },
  {
    id: "vaccinations",
    title: "Vaccinations",
    description: "Booster shots and essential immunizations.",
    icon: images.injection,
    rotate: "md:-rotate-[2.59deg]",
  },
  {
    id: "dental-care",
    title: "Dental Care",
    description: "Oral exams, dental cleanings, and treatment planning.",
    icon: images.oneTooth,
    rotate: "md:-rotate-[-0.65deg]",
  },
  {
    id: "surgery",
    title: "Surgery",
    description: "Spay, neuter, and other scheduled procedures.",
    icon: images.hospital,
    rotate: "md:-rotate-[-2.44deg]",
  },
  {
    id: "diagnostics",
    title: "Diagnostics",
    description: "Lab work, imaging, and diagnostic testing.",
    icon: images.microscope,
    rotate: "md:-rotate-[3.72deg]",
  },
  {
    id: "new-patient",
    title: "New Patient Visit",
    description: "First-visit consultations for pets new to LiliVet.",
    icon: images.pet,
    rotate: "md:-rotate-[3.72deg]",
  },
  {
    id: "others",
    title: "Others",
    description: "Choose this if your visit reason is not listed above.",
    icon: images.others,
    rotate: "md:-rotate-[-2.48deg]",
  },
];

const VISIT_TYPE_TO_API = {
  "urgent-care": "URGENT_CARE",
  "wellness-exam": "WELLNESS_EXAM",
  vaccinations: "VACCINATIONS",
  "dental-care": "DENTAL_CARE",
  surgery: "SURGERY",
  diagnostics: "DIAGNOSTICS",
  "new-patient": "NEW_PATIENT_VISIT",
  others: "OTHER",
} as const;

const SPECIES_TO_API = {
  Dog: "DOG",
  Cat: "CAT",
} as const;

const SEX_TO_API = {
  male: "MALE",
  female: "FEMALE",
} as const;

const CONTACT_METHOD_TO_API = {
  call: "CALL",
  text: "TEXT",
  email: "EMAIL",
} as const;

const API_VISIT_TYPE_TO_FORM: Record<
  | "URGENT_CARE"
  | "WELLNESS_EXAM"
  | "VACCINATIONS"
  | "DENTAL_CARE"
  | "SURGERY"
  | "DIAGNOSTICS"
  | "NEW_PATIENT_VISIT"
  | "OTHER",
  VisitType
> = {
  URGENT_CARE: "urgent-care",
  WELLNESS_EXAM: "wellness-exam",
  VACCINATIONS: "vaccinations",
  DENTAL_CARE: "dental-care",
  SURGERY: "surgery",
  DIAGNOSTICS: "diagnostics",
  NEW_PATIENT_VISIT: "new-patient",
  OTHER: "others",
};

const API_SPECIES_TO_FORM: Record<"DOG" | "CAT", string> = {
  DOG: "Dog",
  CAT: "Cat",
};

const API_SEX_TO_FORM: Record<"MALE" | "FEMALE", Sex> = {
  MALE: "male",
  FEMALE: "female",
};

const API_CONTACT_METHOD_TO_FORM: Record<
  "CALL" | "TEXT" | "EMAIL",
  ContactMethod
> = {
  CALL: "call",
  TEXT: "text",
  EMAIL: "email",
};

const VISIT_TYPE_LABELS = {
  URGENT_CARE: "Urgent Care",
  WELLNESS_EXAM: "Wellness Exam",
  VACCINATIONS: "Vaccinations",
  DENTAL_CARE: "Dental Care",
  SURGERY: "Surgery",
  DIAGNOSTICS: "Diagnostics",
  NEW_PATIENT_VISIT: "New Patient Visit",
  OTHER: "Other",
} as const;

const SPECIES_LABELS = {
  DOG: "Dog",
  CAT: "Cat",
} as const;

const SEX_LABELS = {
  MALE: "Male",
  FEMALE: "Female",
} as const;

const CONTACT_METHOD_LABELS = {
  CALL: "Call",
  TEXT: "Text",
  EMAIL: "Email",
} as const;

const createEmptyWeekSelections = (): PreferredSelection[] =>
  Array.from({ length: WEEK_DAYS }, () => ({
    date: "",
    timeSlots: [],
  }));

const CLINIC_TIMEZONE = "America/Chicago";
const CLINIC_TIMEZONE_LABEL = "Central Time (CT)";
const MAX_WEEK_TIME_SLOTS = 3;
const EMPTY_VALUE = "Not provided";
const defaultValues: FormValues = {
  visitType: "",

  petName: "",
  species: "",
  breed: "",
  age: "",
  sex: "",
  weight: "",

  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContactMethod: "",

  preferredSelections: createEmptyWeekSelections(),
  timezone: CLINIC_TIMEZONE,

  symptoms: "",
  currentMedications: "",
  previousVeterinarian: "",
  duration: "",

  uploadedFile: null,

  confirmContact: false,
  confirmCommunication: false,
};

const WEEKDAY_TIME_SLOTS = generateQuarterHourSlots("08:00", "19:00");
const SATURDAY_TIME_SLOTS = generateQuarterHourSlots("08:00", "16:00");

/* -------------------------------- helpers -------------------------------- */

function generateQuarterHourSlots(start: string, end: string) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const result: string[] = [];
  const startTotal = startHour * 60 + startMinute;
  const endTotal = endHour * 60 + endMinute;

  for (let minutes = startTotal; minutes <= endTotal; minutes += 15) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    result.push(
      `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`,
    );
  }

  return result;
}

function formatTimeLabel(time24: string) {
  const [hours, minutes] = time24.split(":").map(Number);
  const suffix = hours >= 12 ? "pm" : "am";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  return `${hour12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function formatPreviewDate(date?: string | null) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatWeekDayLabel(date?: string | null) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function toISODateOnlyUTC(date: Date) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  ).toISOString();
}

function getMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;

  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);

  return d;
}

function getWeekDatesMondayToSaturday(date: Date) {
  const monday = getMonday(date);

  return Array.from({ length: WEEK_DAYS }, (_, index) => {
    const next = new Date(monday);
    next.setDate(monday.getDate() + index);
    next.setHours(0, 0, 0, 0);
    return next;
  });
}

function isSameDay(a: Date, b: Date) {
  return a.toDateString() === b.toDateString();
}

function isDateInWeek(date: Date, weekStart: Date | null) {
  if (!weekStart) return false;

  return getWeekDatesMondayToSaturday(weekStart).some((weekDate) =>
    isSameDay(weekDate, date),
  );
}

function getMonthDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const leadingSpaces = firstDay.getDay();
  const days: Array<Date | null> = [];

  for (let i = 0; i < leadingSpaces; i += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
}

function isPastDate(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  return target < today;
}

function sanitizeCopy(value: string) {
  return value
    .replaceAll("â€™", "'")
    .replaceAll("â€œ", '"')
    .replaceAll("â€\u009d", '"')
    .replaceAll("â€”", "-")
    .replaceAll("â€“", "-");
}

function displayValue(value?: string | null) {
  const normalized = sanitizeCopy((value ?? "").trim());

  if (!normalized || normalized === "-" || normalized === "—") {
    return EMPTY_VALUE;
  }

  return normalized;
}

function getTimeSlotsForSelection(
  selection: PreferredSelection | null | undefined,
) {
  if (!selection?.date) {
    return WEEKDAY_TIME_SLOTS;
  }

  return new Date(selection.date).getUTCDay() === 6
    ? SATURDAY_TIME_SLOTS
    : WEEKDAY_TIME_SLOTS;
}

function getClinicHoursLabel(selection: PreferredSelection | null | undefined) {
  const slots = getTimeSlotsForSelection(selection);
  if (slots === SATURDAY_TIME_SLOTS) {
    return "Saturday hours: 8:00 AM - 4:00 PM";
  }

  return "Weekday hours: 8:00 AM - 7:00 PM";
}

function sanitizeNumericInput(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  let normalized = trimmed.replaceAll(",", ".").replace(/[^\d.]/g, "");
  const firstDecimalIndex = normalized.indexOf(".");

  if (firstDecimalIndex !== -1) {
    normalized = `${normalized.slice(0, firstDecimalIndex + 1)}${normalized
      .slice(firstDecimalIndex + 1)
      .replaceAll(".", "")}`;
  }

  if (normalized.startsWith(".")) {
    normalized = `0${normalized}`;
  }

  return normalized;
}

function normalizeNumericInput(value: string) {
  const normalized = sanitizeNumericInput(value);

  if (!normalized) {
    return "";
  }

  return normalized.endsWith(".") ? normalized.slice(0, -1) : normalized;
}

function mapDraftToFormValues(
  draft: DraftPreviewData,
  preserved: DraftPreservedFields,
): FormValues {
  const selections =
    Array.isArray(draft.preferredSelections) && draft.preferredSelections.length
      ? draft.preferredSelections.slice(0, WEEK_DAYS).map((item) => ({
          date: item.date,
          timeSlots: Array.isArray(item.timeSlots) ? item.timeSlots : [],
        }))
      : createEmptyWeekSelections();

  while (selections.length < WEEK_DAYS) {
    selections.push({ date: "", timeSlots: [] });
  }

  return {
    visitType: draft.visitType
      ? API_VISIT_TYPE_TO_FORM[draft.visitType]
      : defaultValues.visitType,

    petName: draft.petName ?? "",
    species: draft.species
      ? API_SPECIES_TO_FORM[draft.species]
      : defaultValues.species,
    breed: draft.breed ?? "",
    age:
      draft.approximateAgeYears !== null &&
      draft.approximateAgeYears !== undefined
        ? String(draft.approximateAgeYears)
        : "",
    sex: draft.sex ? API_SEX_TO_FORM[draft.sex] : defaultValues.sex,
    weight:
      draft.weightLbs !== null && draft.weightLbs !== undefined
        ? String(draft.weightLbs)
        : "",

    firstName: draft.firstName ?? "",
    lastName: draft.lastName ?? "",
    email: draft.email ?? "",
    phone: draft.phoneNumber ?? "",
    preferredContactMethod: draft.preferredContactMethod
      ? API_CONTACT_METHOD_TO_FORM[draft.preferredContactMethod]
      : defaultValues.preferredContactMethod,

    preferredSelections: selections,
    timezone: draft.timezone || defaultValues.timezone,

    symptoms: draft.symptomsOrConcerns ?? "",
    currentMedications: draft.currentMedications ?? "",
    previousVeterinarian: draft.previousVeterinarian ?? "",
    duration: draft.symptomDuration ?? "",

    uploadedFile: preserved.uploadedFile,
    confirmContact: preserved.confirmContact,
    confirmCommunication: preserved.confirmCommunication,
  };
}

function getFilledPreferredSelections(selections: PreferredSelection[]) {
  return selections.filter(
    (item) =>
      item.date && Array.isArray(item.timeSlots) && item.timeSlots.length > 0,
  );
}

function getTotalSelectedSlots(selections: PreferredSelection[]) {
  return selections.reduce((total, item) => total + item.timeSlots.length, 0);
}

function isMissingAppointmentDraftError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const status = (error as { response?: { status?: number } }).response?.status;

  return status === 404 || status === 410;
}

/* ------------------------------- component -------------------------------- */

export function AppointmentRequestSection({}: AppointmentRequestSectionProps) {
  const queryClient = useQueryClient();
  const draftSession = getAppointmentDraftSession();
  const [sessionToken, setSessionToken] = useState(draftSession.sessionToken);

  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [step, setStep] = useState(() =>
    Math.min(Math.max(draftSession.lastCompletedStep + 1, 1), 6),
  );
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date | null>(null);
  const [hoveredWeekStart, setHoveredWeekStart] = useState<Date | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
  const [timeSlotDialogDayIndex, setTimeSlotDialogDayIndex] = useState<
    number | null
  >(null);

  const [preferredDatesDialogOpen, setPreferredDatesDialogOpen] =
    useState(false);

  const selectedDialogDay =
    timeSlotDialogDayIndex !== null
      ? values.preferredSelections[timeSlotDialogDayIndex]
      : null;

  const openTimeSlotDialog = (dayIndex: number) => {
    setTimeSlotDialogDayIndex(dayIndex);
  };

  const closeTimeSlotDialog = () => {
    setTimeSlotDialogDayIndex(null);
  };

  const openMobilePreferredDateTimeSlot = (dayIndex: number) => {
    setPreferredDatesDialogOpen(false);

    window.setTimeout(() => {
      openTimeSlotDialog(dayIndex);
    }, 0);
  };

  const hasSelectedWeek = values.preferredSelections.some((item) => item.date);

  const filledPreferredSelections = getFilledPreferredSelections(
    values.preferredSelections,
  );
  const totalSelectedSlots = getTotalSelectedSlots(values.preferredSelections);
  const orderedPreferredSelections = useMemo<IndexedPreferredSelection[]>(
    () =>
      values.preferredSelections
        .map((item, originalIndex) => ({
          ...item,
          originalIndex,
        }))
        .sort((left, right) => {
          const leftHasSelection = left.timeSlots.length > 0 ? 1 : 0;
          const rightHasSelection = right.timeSlots.length > 0 ? 1 : 0;

          if (leftHasSelection !== rightHasSelection) {
            return rightHasSelection - leftHasSelection;
          }

          return left.originalIndex - right.originalIndex;
        }),
    [values.preferredSelections],
  );

  const firstPreferredDate = values.preferredSelections.find(
    (item) => item.date,
  )?.date;

  const lastPreferredDate = [...values.preferredSelections]
    .reverse()
    .find((item) => item.date)?.date;

  const selectedWeekLabel =
    firstPreferredDate && lastPreferredDate
      ? `${formatWeekDayLabel(firstPreferredDate)} - ${formatWeekDayLabel(
          lastPreferredDate,
        )}`
      : "";

  const formCardRef = useRef<HTMLFormElement | null>(null);
  const medicalFileInputRef = useRef<HTMLInputElement | null>(null);
  const fieldRefs = useRef<
    Partial<Record<keyof FormValues, HTMLElement | HTMLInputElement | null>>
  >({});
  const hasMountedRef = useRef(false);
  const draftCreationPromiseRef = useRef<Promise<string> | null>(null);
  const staleDraftResetRef = useRef<string | null>(null);

  const { mutateAsync: createSessionAsync, isPending: isCreatingSession } =
    useCreateAppointmentDraft();
  const { mutateAsync: postStep1Async, isPending: isPostingStep1 } =
    usePostAppointmentDraftStep1();
  const { mutateAsync: postStep2Async, isPending: isPostingStep2 } =
    usePostAppointmentDraftStep2();
  const { mutateAsync: postStep3Async, isPending: isPostingStep3 } =
    usePostAppointmentDraftStep3();
  const { mutateAsync: postStep4Async, isPending: isPostingStep4 } =
    usePostAppointmentDraftStep4();
  const { mutateAsync: postStep5Async, isPending: isPostingStep5 } =
    usePostAppointmentDraftStep5();
  const { mutateAsync: uploadDraftFileAsync, isPending: isUploadingDraftFile } =
    useUploadAppointmentDraftFiles();
  const { mutateAsync: submitDraftAsync, isPending: isSubmittingDraft } =
    useSubmitAppointmentDraft();

  const {
    data: draftPreview,
    isLoading: isLoadingDraftPreview,
    error: draftPreviewError,
    refetch: refetchDraftPreview,
  } = useAppointmentDraft(sessionToken);

  const highlightedWeekStart = hoveredWeekStart || selectedWeekStart;

  const ensureDraftSession = useCallback(
    async (surfaceErrors = true) => {
      const storedSessionToken = getAppointmentDraftSession().sessionToken;

      if (storedSessionToken) {
        if (storedSessionToken !== sessionToken) {
          setSessionToken(storedSessionToken);
        }

        return storedSessionToken;
      }

      if (!draftCreationPromiseRef.current) {
        draftCreationPromiseRef.current = createSessionAsync()
          .then((draft) => {
            setSessionToken(draft.sessionToken);
            return draft.sessionToken;
          })
          .finally(() => {
            draftCreationPromiseRef.current = null;
          });
      }

      try {
        return await draftCreationPromiseRef.current;
      } catch (error) {
        if (surfaceErrors) {
          throw error;
        }

        console.error("Failed to pre-create appointment draft.", error);
        return "";
      }
    },
    [createSessionAsync, sessionToken],
  );

  useEffect(() => {
    if (sessionToken || submitted) return;

    ensureDraftSession(false).catch(() => {
      // The first visible step still retries on demand.
    });
  }, [ensureDraftSession, sessionToken, submitted]);

  useEffect(() => {
    if (!sessionToken) {
      staleDraftResetRef.current = null;
      return;
    }

    if (!draftPreviewError || !isMissingAppointmentDraftError(draftPreviewError)) {
      return;
    }

    if (staleDraftResetRef.current === sessionToken) {
      return;
    }

    staleDraftResetRef.current = sessionToken;
    clearAppointmentDraftSession();
    queryClient.removeQueries({
      queryKey: ["appointmentDraft", sessionToken],
    });
    setValues(defaultValues);
    setErrors({});
    setSubmitted(false);
    setStep(1);
    setSelectedWeekStart(null);
    setHoveredWeekStart(null);
    setVisibleMonth(new Date());
    setTimeSlotDialogDayIndex(null);
    setPreferredDatesDialogOpen(false);
    setSubmissionError(
      "Your previous appointment draft expired. We started a new request for you.",
    );
    setSessionToken("");
  }, [draftPreviewError, queryClient, sessionToken]);

  useEffect(() => {
    if (!draftPreview) return;

    setValues((prev) =>
      mapDraftToFormValues(draftPreview, {
        confirmContact: prev.confirmContact,
        confirmCommunication: prev.confirmCommunication,
        uploadedFile: prev.uploadedFile,
      }),
    );

    const firstDate = draftPreview.preferredSelections?.find(
      (item) => item.date,
    )?.date;

    if (firstDate) {
      const first = new Date(firstDate);
      setSelectedWeekStart(getMonday(first));
      setVisibleMonth(new Date(first.getFullYear(), first.getMonth(), 1));
    }
  }, [draftPreview]);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    formCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [step, submitted]);

  const currentMeta = useMemo(
    () => STEP_META.find((item) => item.key === step),
    [step],
  );

  const previewVisitType = draftPreview?.visitType
    ? VISIT_TYPE_LABELS[draftPreview.visitType]
    : VISIT_OPTIONS.find((item) => item.id === values.visitType)?.title || "—";

  const previewContactMethod = draftPreview?.preferredContactMethod
    ? CONTACT_METHOD_LABELS[draftPreview.preferredContactMethod]
    : values.preferredContactMethod
      ? values.preferredContactMethod.charAt(0).toUpperCase() +
        values.preferredContactMethod.slice(1)
      : "—";

  const previewOwner =
    draftPreview?.firstName || draftPreview?.lastName
      ? `${draftPreview?.firstName ?? ""} ${draftPreview?.lastName ?? ""}`.trim()
      : `${values.firstName} ${values.lastName}`.trim() || "—";

  const previewVisitTypeLabel = displayValue(previewVisitType);
  const previewContactMethodLabel = displayValue(previewContactMethod);
  const previewOwnerLabel = displayValue(previewOwner);

  const isEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const isPhone = (value: string) => /^[0-9+()\-\s]{10,}$/.test(value.trim());

  const isNumeric = (value: string) => /^\d+(\.\d+)?$/.test(value.trim());

  const clearFieldErrors = (fields: (keyof FormValues)[]) => {
    setErrors((prev) => {
      const next = { ...prev };
      fields.forEach((field) => {
        delete next[field];
      });
      return next;
    });
  };

  const setFieldRef =
    (field: keyof FormValues) =>
    (element: HTMLElement | HTMLInputElement | null) => {
      fieldRefs.current[field] = element;
    };

  const focusField = (field: keyof FormValues) => {
    window.requestAnimationFrame(() => {
      const element = fieldRefs.current[field];
      if (!element) {
        return;
      }

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      if ("focus" in element && typeof element.focus === "function") {
        element.focus({ preventScroll: true });
      }
    });
  };

  const updateField = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "preferredSelections" || field === "timezone") {
      clearFieldErrors(["preferredSelections", "timezone"]);
    } else {
      clearFieldErrors([field]);
    }

    setSubmissionError("");
  };

  const handleNumericFieldChange =
    (field: "age" | "weight") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateField(field, sanitizeNumericInput(event.target.value));
    };

  const handleNumericFieldBlur =
    (field: "age" | "weight") =>
    (event: React.FocusEvent<HTMLInputElement>) => {
      const normalized = normalizeNumericInput(event.target.value);

      setValues((prev) =>
        prev[field] === normalized
          ? prev
          : {
              ...prev,
              [field]: normalized,
            },
      );
    };

  const handleNumericFieldKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
  };

  const validateField = (
    field: keyof FormValues,
    formValues: FormValues,
  ): string => {
    const value = formValues[field];

    switch (field) {
      case "visitType":
        return value ? "" : "Please select a visit type.";

      case "petName":
        if (!String(value).trim()) return "This field cannot be empty.";
        if (String(value).trim().length < 2)
          return "Please enter a valid pet name.";
        return "";

      case "species":
        return String(value).trim() ? "" : "This field cannot be empty.";

      case "breed":
        if (!String(value).trim()) return "This field cannot be empty.";
        if (String(value).trim().length < 2)
          return "Please enter a valid breed.";
        return "";

      case "age":
        if (!String(value).trim()) return "This field cannot be empty.";
        if (!isNumeric(String(value))) return "Please enter a valid age.";
        return "";

      case "sex":
        return value ? "" : "Please select a sex.";

      case "weight":
        if (!String(value).trim()) return "This field cannot be empty.";
        if (!isNumeric(String(value))) return "Please enter a valid weight.";
        return "";

      case "firstName":
        if (!String(value).trim()) return "This field cannot be empty.";
        if (String(value).trim().length < 2)
          return "Please enter a valid first name.";
        return "";

      case "lastName":
        if (!String(value).trim()) return "This field cannot be empty.";
        if (String(value).trim().length < 2)
          return "Please enter a valid last name.";
        return "";

      case "email":
        if (!String(value).trim()) return "This field cannot be empty.";
        if (!isEmail(String(value)))
          return "Please enter a valid email address.";
        return "";

      case "phone":
        if (!String(value).trim()) return "This field cannot be empty.";
        if (!isPhone(String(value)))
          return "Please enter a valid phone number.";
        return "";

      case "preferredContactMethod":
        return value ? "" : "Please select a contact method.";

      case "preferredSelections": {
        if (!Array.isArray(value)) {
          return "Please select at least one preferred time slot.";
        }

        const filledSelections = getFilledPreferredSelections(value);

        if (filledSelections.length === 0) {
          return "Please select at least one preferred time slot.";
        }
        const totalSelectedSlots = getTotalSelectedSlots(value);

        if (totalSelectedSlots > MAX_WEEK_TIME_SLOTS) {
          return `You can select a maximum of ${MAX_WEEK_TIME_SLOTS} time slots for the week.`;
        }

        const dates = filledSelections.map((item) => item.date);
        const uniqueDates = new Set(dates);

        if (uniqueDates.size !== dates.length) {
          return "Duplicate dates are not allowed.";
        }

        for (const item of filledSelections) {
          if (item.timeSlots.length > 3) {
            return "Each date can have a maximum of 3 time slots.";
          }

          const uniqueSlots = new Set(item.timeSlots);

          if (uniqueSlots.size !== item.timeSlots.length) {
            return "Duplicate time slots are not allowed for the same day.";
          }
        }

        return "";
      }

      case "timezone":
        return String(value).trim() ? "" : "Timezone is required.";

      case "symptoms":
        if (!String(value).trim()) return "This field cannot be empty.";
        if (String(value).trim().length < 10)
          return "Please provide a bit more detail.";
        return "";

      case "currentMedications":
        return "";

      case "duration":
        return String(value).trim() ? "" : "This field cannot be empty.";

      case "confirmContact":
        return value ? "" : "You must accept this before continuing.";

      case "confirmCommunication":
        return value ? "" : "You must accept this before continuing.";

      default:
        return "";
    }
  };

  const validateFields = (fields: (keyof FormValues)[]) => {
    const nextErrors: FormErrors = {};

    fields.forEach((field) => {
      const message = validateField(field, values);
      if (message) {
        nextErrors[field] = message;
      }
    });

    setErrors((prev) => {
      const updated = { ...prev };
      fields.forEach((field) => {
        delete updated[field];
      });

      return {
        ...updated,
        ...nextErrors,
      };
    });

    const firstInvalidField = fields.find((field) => nextErrors[field]);
    if (firstInvalidField) {
      focusField(firstInvalidField);
    }

    return Object.keys(nextErrors).length === 0;
  };

  const getPreferredSelectionAtIndex = (index: number) =>
    values.preferredSelections[index] ?? { date: "", timeSlots: [] };

  const handleWeekHover = (date: Date) => {
    if (date.getDay() === 0) return;
    setHoveredWeekStart(getMonday(date));
  };

  const clearWeekHover = () => {
    setHoveredWeekStart(null);
  };

  const handleWeekSelect = (date: Date) => {
    if (date.getDay() === 0) return;

    const weekDates = getWeekDatesMondayToSaturday(date);
    const existingSelections = values.preferredSelections || [];

    const nextSelections = weekDates.map((day) => {
      const isoDate = toISODateOnlyUTC(day);
      const existing = existingSelections.find((item) => item.date === isoDate);

      return {
        date: isoDate,
        timeSlots: existing?.timeSlots || [],
      };
    });

    const monday = getMonday(date);

    setSelectedWeekStart(monday);
    setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    updateField("preferredSelections", nextSelections);

    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches;

    if (isMobile) {
      window.setTimeout(() => {
        setPreferredDatesDialogOpen(true);
      }, 0);
    }
  };

  const toggleWeekDayTimeSlot = (dayIndex: number, slot: string) => {
    const selection = getPreferredSelectionAtIndex(dayIndex);

    if (!selection?.date) {
      setSubmissionError("Please select a week first.");
      return;
    }

    const slotExists = selection.timeSlots.includes(slot);
    const nextSelections = [...values.preferredSelections];

    if (slotExists) {
      nextSelections[dayIndex] = {
        ...selection,
        timeSlots: selection.timeSlots.filter((item) => item !== slot),
      };

      updateField("preferredSelections", nextSelections);
      return;
    }

    const totalSelectedSlots = getTotalSelectedSlots(
      values.preferredSelections,
    );

    if (totalSelectedSlots >= MAX_WEEK_TIME_SLOTS) {
      setSubmissionError(
        `You can select a maximum of ${MAX_WEEK_TIME_SLOTS} time slots for the week.`,
      );
      return;
    }

    nextSelections[dayIndex] = {
      ...selection,
      timeSlots: [...selection.timeSlots, slot],
    };

    updateField("preferredSelections", nextSelections);
  };

  const clearWeekDayTimeSlots = (dayIndex: number) => {
    const selection = getPreferredSelectionAtIndex(dayIndex);
    if (!selection?.date) return;

    const nextSelections = [...values.preferredSelections];
    nextSelections[dayIndex] = {
      ...selection,
      timeSlots: [],
    };

    updateField("preferredSelections", nextSelections);
  };

  const withDraftSession = async (
    action: (token: string) => Promise<void>,
    fallbackMessage: string,
  ) => {
    setSubmissionError("");

    const storedSessionToken = getAppointmentDraftSession().sessionToken;
    const activeSessionToken = storedSessionToken || (await ensureDraftSession());

    if (!activeSessionToken) {
      setSubmissionError(
        "Unable to start your appointment request. Please try again.",
      );
      return;
    }

    try {
      await action(activeSessionToken);
    } catch (error: any) {
      console.error(error);
      setSubmissionError(error?.message || fallbackMessage);
    }
  };

  const handleCancelRequest = () => {
    const confirmed = window.confirm(
      "Cancel this appointment request and clear the information you've entered?",
    );

    if (!confirmed) return;

    clearAppointmentDraftSession();
    if (sessionToken) {
      queryClient.removeQueries({
        queryKey: ["appointmentDraft", sessionToken],
      });
    }

    if (medicalFileInputRef.current) {
      medicalFileInputRef.current.value = "";
    }

    setSessionToken("");
    setValues(defaultValues);
    setErrors({});
    setSubmissionError("");
    setSubmitted(false);
    setStep(1);
    setSelectedWeekStart(null);
    setHoveredWeekStart(null);
    setVisibleMonth(new Date());
    setTimeSlotDialogDayIndex(null);
    setPreferredDatesDialogOpen(false);
  };

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionError("");

    const valid = validateFields(stepFields[6]);
    if (!valid) return;

    const storedSessionToken = getAppointmentDraftSession().sessionToken;
    const activeSessionToken = storedSessionToken || (await ensureDraftSession());

    if (!activeSessionToken) {
      setSubmissionError(
        "Unable to start your appointment request. Please try again.",
      );
      return;
    }

    try {
      setIsSubmitting(true);

      await submitDraftAsync(activeSessionToken);
      trackAppointmentSubmitted({
        visitType: VISIT_TYPE_TO_API[values.visitType] ?? null,
        petSpecies:
          SPECIES_TO_API[values.species as keyof typeof SPECIES_TO_API] ?? null,
        preferredDatesCount: getFilledPreferredSelections(
          values.preferredSelections,
        ).length,
      });

      setSubmitted(true);
    } catch (error: any) {
      console.error("FINAL SUBMIT ERROR:", error?.response?.data || error);

      setSubmissionError(
        error?.response?.data?.error?.message ||
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while submitting your request.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFirstStepSubmit = async () => {
    const valid = validateFields(stepFields[1]);
    if (!valid) return;

    try {
      const visitType =
        VISIT_TYPE_TO_API[values.visitType as keyof typeof VISIT_TYPE_TO_API];

      if (!visitType) {
        setSubmissionError("Please select a visit type.");
        return;
      }

      const activeSessionToken = await ensureDraftSession();

      if (!activeSessionToken) {
        setSubmissionError("Unable to start your request. Please try again.");
        return;
      }

      await postStep1Async({
        sessionToken: activeSessionToken,
        payload: {
          visitType,
        },
      });

      setStep(2);
    } catch (error: any) {
      console.error(error);
      setSubmissionError(error?.message || "Failed to save visit type.");
    }
  };

  const handleSecondStepSubmit = async () => {
    const valid = validateFields(stepFields[2]);
    if (!valid) return;

    const species =
      SPECIES_TO_API[values.species as keyof typeof SPECIES_TO_API];
    const sex = SEX_TO_API[values.sex];

    if (!species) {
      setSubmissionError("Invalid species selected.");
      return;
    }

    if (!sex) {
      setSubmissionError("Invalid sex selected.");
      return;
    }

    await withDraftSession(async (activeSessionToken) => {
      await postStep2Async({
        sessionToken: activeSessionToken,
        payload: {
          petName: values.petName.trim(),
          species,
          breed: values.breed.trim(),
          approximateAgeYears: Number(values.age),
          sex,
          weightLbs: Number(values.weight),
        },
      });

      setStep(3);
    }, "Failed to save patient information.");
  };

  const handleThirdStepSubmit = async () => {
    const valid = validateFields(stepFields[3]);
    if (!valid) return;

    const preferredContactMethod =
      CONTACT_METHOD_TO_API[
        values.preferredContactMethod as keyof typeof CONTACT_METHOD_TO_API
      ];

    if (!preferredContactMethod) {
      setSubmissionError("Please select a contact method.");
      return;
    }

    await withDraftSession(async (activeSessionToken) => {
      await postStep3Async({
        sessionToken: activeSessionToken,
        payload: {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          phoneNumber: values.phone.trim(),
          preferredContactMethod,
        },
      });

      setStep(4);
    }, "Failed to save parent information.");
  };

  const handleFourthStepSubmit = async () => {
    const valid = validateFields(stepFields[4]);
    if (!valid) return;

    await withDraftSession(async (activeSessionToken) => {
      await postStep4Async({
        sessionToken: activeSessionToken,
        payload: {
          preferredSelections: getFilledPreferredSelections(
            values.preferredSelections,
          ),
          timezone: values.timezone,
        },
      });

      setStep(5);
    }, "Failed to save booking information.");
  };

  const handleFifthStepSubmit = async () => {
    const valid = validateFields(stepFields[5]);
    if (!valid) return;

    const normalizedCurrentMedications =
      values.currentMedications.trim() || "None reported";

    await withDraftSession(async (activeSessionToken) => {
      await postStep5Async({
        sessionToken: activeSessionToken,
        payload: {
          symptomsOrConcerns: values.symptoms.trim(),
          currentMedications: normalizedCurrentMedications,
          previousVeterinarian: values.previousVeterinarian.trim(),
          symptomDuration: values.duration.trim(),
        },
      });

      if (values.uploadedFile) {
        const fileFormData = new FormData();
        fileFormData.append(
          "files",
          values.uploadedFile,
          values.uploadedFile.name,
        );

        await uploadDraftFileAsync({
          sessionToken: activeSessionToken,
          payload: fileFormData,
        });
      }

      setValues((prev) => ({
        ...prev,
        currentMedications: normalizedCurrentMedications,
      }));
      await refetchDraftPreview();
      setStep(6);
    }, "Failed to save medical information.");
  };

  const handlePrev = async () => {
    setSubmissionError("");

    const result = await refetchDraftPreview();
    const latestDraft = result.data;

    if (latestDraft) {
      setValues((prev) =>
        mapDraftToFormValues(latestDraft, {
          confirmContact: prev.confirmContact,
          confirmCommunication: prev.confirmCommunication,
          uploadedFile: prev.uploadedFile,
        }),
      );
    }

    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className="bg-[#F6F6F6] px-4 py-6 md:px-8 md:py-16 xl:px-12">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 xl:grid-cols-[minmax(0,1fr)_421px]">
        <main className="min-w-0">
          <form ref={formCardRef} onSubmit={handleSubmitForm} noValidate>
            {!submitted && currentMeta && (
              <StepHeader
                step={step}
                total={6}
                title={currentMeta.label}
                percent={currentMeta.percent}
              />
            )}

            <div className="relative overflow-hidden rounded-[32px] border border-[#C1C8C24D] bg-[#FFFFFF] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-8 md:p-10 lg:px-12 lg:py-4">
              {!submitted && currentMeta ? (
                <>
                  {step === 1 && (
                    <div>
                      <SectionTitle
                        title="Why are you visiting?"
                        subtitle="Choose the primary reason for your pet’s appointment today."
                      />

                      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {VISIT_OPTIONS.map((item) => {
                          const selected = values.visitType === item.id;

                          return (
                            <InertiaHover
                              key={item.id}
                              strength={2}
                              rotation={1}
                              resistance={100}
                            >
                              <button
                                type="button"
                                ref={
                                  item.id === "urgent-care"
                                    ? setFieldRef("visitType")
                                    : undefined
                                }
                                onClick={() =>
                                  updateField("visitType", item.id)
                                }
                                className={[
                                  "relative min-h-[204px] rounded-[16px] border p-6 text-left transition-all",
                                  "bg-[#EDF1E7] border-transparent",
                                  item.rotate || "",
                                  item.tone === "urgent" ? "bg-[#F8EFEF]" : "",
                                  selected
                                    ? "border-[#4D7A63] shadow-[0_0_0_1px_#4D7A63]"
                                    : "hover:border-[#D8DDD6]",
                                ].join(" ")}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="text-[#4B6D5C]">
                                    <img src={item.icon} alt="" />
                                  </div>
                                  <RadioDot checked={selected} />
                                </div>

                                <h3 className="mt-8 manrope text-[16px] font-bold leading-[24px] text-[#1B1C19] md:text-[17px] md:leading-[26px] lg:text-[18px] lg:leading-[28px]">
                                  {item.title}
                                </h3>
                                <p className="mt-1 manrope text-[12px] font-normal leading-[18px] text-[#414844] md:text-[13px] md:leading-[20px] lg:text-[14px] lg:leading-[22.75px]">
                                  {item.description}
                                </p>
                              </button>
                            </InertiaHover>
                          );
                        })}
                      </div>

                      <ErrorText message={errors.visitType} />

                      <EmergencyNotice className="mt-8" />

                      <FooterActions
                        left={
                          <button
                            type="button"
                            className="text-center manrope text-[14px] font-bold leading-[18px] text-[#414844] md:text-[15px] md:leading-[19px] lg:text-[16px] lg:leading-[20px]"
                            onClick={handleCancelRequest}
                          >
                            Cancel Request
                          </button>
                        }
                        right={
                          <PrimaryButton
                            loading={isPostingStep1 || isCreatingSession}
                            onClick={handleFirstStepSubmit}
                          >
                            Next: Pet Details{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </PrimaryButton>
                        }
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <SectionTitle
                        title="Tell us about your pet"
                        subtitle="Share a few details so our team can prepare for the visit."
                      />
                      <FormSectionLabel label="Pet Information" />

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Field label="Pet Name">
                          <TextInput
                            ref={setFieldRef("petName")}
                            placeholder="e.g. Luna"
                            value={values.petName}
                            onChange={(e) =>
                              updateField("petName", e.target.value)
                            }
                          />
                          <ErrorText message={errors.petName} />
                        </Field>

                        <Field label="Species">
                          <SelectInput
                            inputRef={setFieldRef("species")}
                            value={values.species}
                            options={["Dog", "Cat"]}
                            placeholder="Choose species"
                            onChange={(value) => updateField("species", value)}
                          />
                          <ErrorText message={errors.species} />
                        </Field>

                        <Field label="Breed">
                          <TextInput
                            ref={setFieldRef("breed")}
                            placeholder="e.g. Golden Retriever"
                            value={values.breed}
                            onChange={(e) =>
                              updateField("breed", e.target.value)
                            }
                          />
                          <ErrorText message={errors.breed} />
                        </Field>

                        <Field label="Approximate Age">
                          <div className="relative">
                            <TextInput
                              ref={setFieldRef("age")}
                              type="number"
                              inputMode="decimal"
                              step="0.1"
                              min="0"
                              placeholder="0"
                              value={values.age}
                              onChange={handleNumericFieldChange("age")}
                              onBlur={handleNumericFieldBlur("age")}
                              onKeyDown={handleNumericFieldKeyDown}
                            />
                            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 font-manrope text-[14px] font-semibold uppercase tracking-[0.05em] text-[#8A8A82]">
                              Years
                            </span>
                          </div>
                          <ErrorText message={errors.age} />
                        </Field>
                      </div>

                      <FormSectionLabel
                        className="mt-8"
                        label="Physical Details"
                      />

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Field label="Sex">
                          <SegmentedTwo
                            left="Male"
                            right="Female"
                            value={values.sex}
                            buttonRef={setFieldRef("sex")}
                            onChange={(value) =>
                              updateField("sex", value as Sex)
                            }
                          />
                          <ErrorText message={errors.sex} />
                        </Field>

                        <Field label="Weight (lbs)">
                          <TextInput
                            ref={setFieldRef("weight")}
                            type="number"
                            inputMode="decimal"
                            step="0.1"
                            min="0"
                            placeholder="e.g. 45"
                            value={values.weight}
                            onChange={handleNumericFieldChange("weight")}
                            onBlur={handleNumericFieldBlur("weight")}
                            onKeyDown={handleNumericFieldKeyDown}
                          />
                          <ErrorText message={errors.weight} />
                        </Field>
                      </div>

                      <EmergencyNotice className="mt-8" />

                      <FooterActions
                        left={
                          <GhostNavButton onClick={handlePrev}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous: Visit Type Selection
                          </GhostNavButton>
                        }
                        right={
                          <PrimaryButton
                            onClick={handleSecondStepSubmit}
                            loading={isPostingStep2}
                          >
                            Next: Owner Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </PrimaryButton>
                        }
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <SectionTitle
                        title="How should we reach you?"
                        subtitle="Add the pet parent's contact details so we can confirm the appointment."
                      />
                      <FormSectionLabel label="Owner Information" />

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Field label="First Name">
                          <TextInput
                            ref={setFieldRef("firstName")}
                            placeholder="e.g. Elena"
                            value={values.firstName}
                            onChange={(e) =>
                              updateField("firstName", e.target.value)
                            }
                          />
                          <ErrorText message={errors.firstName} />
                        </Field>

                        <Field label="Last Name">
                          <TextInput
                            ref={setFieldRef("lastName")}
                            placeholder="e.g. Garcia"
                            value={values.lastName}
                            onChange={(e) =>
                              updateField("lastName", e.target.value)
                            }
                          />
                          <ErrorText message={errors.lastName} />
                        </Field>
                      </div>

                      <FormSectionLabel
                        className="mt-8"
                        label="Contact Information"
                      />

                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Field label="Email Address">
                          <TextInput
                            ref={setFieldRef("email")}
                            placeholder="e.g. elena.garcia@example.com"
                            value={values.email}
                            onChange={(e) =>
                              updateField("email", e.target.value)
                            }
                          />
                          <ErrorText message={errors.email} />
                        </Field>

                        <Field label="Phone Number">
                          <TextInput
                            ref={setFieldRef("phone")}
                            placeholder="e.g. (210) 555-0123"
                            value={values.phone}
                            onChange={(e) =>
                              updateField("phone", e.target.value)
                            }
                          />
                          <ErrorText message={errors.phone} />
                        </Field>
                      </div>

                      <Field className="mt-8" label="Preferred Contact Method">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                          <OptionPill
                            selected={values.preferredContactMethod === "call"}
                            buttonRef={setFieldRef("preferredContactMethod")}
                            onClick={() =>
                              updateField("preferredContactMethod", "call")
                            }
                            icon={<Phone className="h-5 w-5" />}
                            label="Call"
                          />
                          <OptionPill
                            selected={values.preferredContactMethod === "text"}
                            onClick={() =>
                              updateField("preferredContactMethod", "text")
                            }
                            icon={<MessageSquare className="h-5 w-5" />}
                            label="Text"
                          />
                          <OptionPill
                            selected={values.preferredContactMethod === "email"}
                            onClick={() =>
                              updateField("preferredContactMethod", "email")
                            }
                            icon={<Mail className="h-5 w-5" />}
                            label="Email"
                          />
                        </div>
                        <ErrorText message={errors.preferredContactMethod} />
                      </Field>

                      <EmergencyNotice className="mt-8" />

                      <FooterActions
                        left={
                          <GhostNavButton onClick={handlePrev}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous: Pet Information
                          </GhostNavButton>
                        }
                        right={
                          <PrimaryButton
                            onClick={handleThirdStepSubmit}
                            loading={isPostingStep3}
                            disabled={isPostingStep3}
                          >
                            Next: Preferred Times{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </PrimaryButton>
                        }
                      />
                    </div>
                  )}

                  {step === 4 && (
                    <div>
                      <SectionTitle
                        title="Choose your preferred week and times"
                        subtitle="Select a Monday-Saturday week, then add up to 3 preferred appointment times."
                      />

                      {submissionError ? (
                        <div className="mt-6 rounded-[18px] border border-[#F0C6C6] bg-[#FBF1F1] px-5 py-4 font-manrope text-[15px] font-medium leading-6 text-[#D32020]">
                          {submissionError}
                        </div>
                      ) : null}

                      <div className="mt-8 grid grid-cols-1 items-start gap-4 md:grid-cols-10">
                        <div
                          ref={setFieldRef("preferredSelections")}
                          tabIndex={-1}
                          className="col-span-6 rounded-[28px] border border-[#E7E2DA] bg-[#F6F5F0] p-5 md:p-6"
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <button
                              type="button"
                              onClick={() =>
                                setVisibleMonth(
                                  (prev) =>
                                    new Date(
                                      prev.getFullYear(),
                                      prev.getMonth() - 1,
                                      1,
                                    ),
                                )
                              }
                              className="rounded-full bg-white px-4 py-2 font-manrope text-sm font-bold text-[#416352]"
                            >
                              Previous
                            </button>

                            <h4 className="text-center font-founders text-[22px] font-medium text-[#1B1C19]">
                              {visibleMonth.toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                              })}
                            </h4>

                            <button
                              type="button"
                              onClick={() =>
                                setVisibleMonth(
                                  (prev) =>
                                    new Date(
                                      prev.getFullYear(),
                                      prev.getMonth() + 1,
                                      1,
                                    ),
                                )
                              }
                              className="rounded-full bg-white px-4 py-2 font-manrope text-sm font-bold text-[#416352]"
                            >
                              Next
                            </button>
                          </div>

                          <div className="mt-6 grid grid-cols-7 gap-2">
                            {[
                              "Sun",
                              "Mon",
                              "Tue",
                              "Wed",
                              "Thu",
                              "Fri",
                              "Sat",
                            ].map((day) => (
                              <div
                                key={day}
                                className="py-2 text-center font-manrope text-[11px] font-bold uppercase text-[#727973] md:text-[12px]"
                              >
                                {day}
                              </div>
                            ))}

                            {getMonthDays(visibleMonth).map((date, index) => {
                              if (!date) {
                                return <div key={`empty-${index}`} />;
                              }

                              const isSunday = date.getDay() === 0;
                              const isPast = isPastDate(date);
                              const disabled = isSunday || isPast;

                              const isInHighlightedRange = isDateInWeek(
                                date,
                                highlightedWeekStart,
                              );

                              const isInSelectedRange = isDateInWeek(
                                date,
                                selectedWeekStart,
                              );

                              return (
                                <button
                                  key={toDateInputValue(date)}
                                  type="button"
                                  disabled={disabled}
                                  onMouseEnter={() => handleWeekHover(date)}
                                  onMouseLeave={clearWeekHover}
                                  onFocus={() => handleWeekHover(date)}
                                  onBlur={clearWeekHover}
                                  onClick={() => handleWeekSelect(date)}
                                  className={[
                                    "min-h-[46px] rounded-[14px] border font-manrope text-[13px] font-bold transition-all md:min-h-[56px] md:rounded-[16px] md:text-[15px]",
                                    disabled
                                      ? "cursor-not-allowed border-transparent bg-[#ECEAE4] text-[#B4B4AA] opacity-60"
                                      : isInSelectedRange
                                        ? "border-[#416352] bg-[#E5EFE5] text-[#1F3F2F] shadow-[0_0_0_1px_#416352]"
                                        : isInHighlightedRange
                                          ? "border-[#B7CDBD] bg-[#EDF4EF] text-[#2D4B39]"
                                          : "border-transparent bg-white text-[#1B1C19] hover:border-[#B7CDBD]",
                                  ].join(" ")}
                                >
                                  {date.getDate()}
                                </button>
                              );
                            })}
                          </div>

                          <p className="mt-5 font-manrope text-[13px] font-medium leading-5 text-[#727973]">
                            Sundays and past dates are disabled. Selecting a
                            day automatically picks the full Monday to Saturday
                            week for that request.
                          </p>
                        </div>

                        <div className="md:hidden">
                          <button
                            type="button"
                            disabled={!hasSelectedWeek}
                            onClick={() => setPreferredDatesDialogOpen(true)}
                            className={[
                              "w-full rounded-[22px] border px-5 py-4 text-left transition-all",
                              hasSelectedWeek
                                ? "border-[#077D39] bg-[#EAF7EF] shadow-[0_0_0_1px_#077D39]"
                                : "cursor-not-allowed border-[#E7E2DA] bg-[#F6F5F0] opacity-70",
                            ].join(" ")}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0 flex-1">
                                <h4 className="font-founders text-[22px] font-medium text-[#1B1C19]">
                                  Selected schedule
                                </h4>

                                <p className="mt-1 font-manrope text-[13px] font-medium leading-5 text-[#727973]">
                                  {!hasSelectedWeek
                                    ? "Select a week from the calendar first."
                                    : "Weekdays 8:00 AM - 7:00 PM | Sat 8:00 AM - 4:00 PM"}
                                </p>

                                {hasSelectedWeek ? (
                                  <p className="mt-2 font-manrope text-[12px] font-bold uppercase tracking-[0.12em] text-[#416352]">
                                    {selectedWeekLabel || "Monday to Saturday"}
                                  </p>
                                ) : null}

                                {filledPreferredSelections.length ? (
                                  <div className="mt-3 space-y-2">
                                    {filledPreferredSelections.map(
                                      (item, index) => (
                                        <div
                                          key={`${item.date}-${index}`}
                                          className="rounded-[14px] bg-white/80 px-3 py-2"
                                        >
                                          <p className="font-manrope text-[13px] font-bold text-[#1B1C19]">
                                            {formatWeekDayLabel(item.date)}
                                          </p>

                                          <p className="mt-1 font-manrope text-[12px] font-medium leading-5 text-[#416352]">
                                            {item.timeSlots
                                              .map(formatTimeLabel)
                                              .join(", ")}
                                          </p>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                ) : hasSelectedWeek ? (
                                  <p className="mt-3 font-manrope text-[13px] font-medium leading-5 text-[#727973]">
                                    Add time slots for the days that work best for you.
                                  </p>
                                ) : null}
                              </div>

                              <span className="shrink-0 rounded-full bg-white px-3 py-1 font-manrope text-[11px] font-bold text-[#416352]">
                                {totalSelectedSlots} of {MAX_WEEK_TIME_SLOTS} slots
                              </span>
                            </div>
                          </button>
                        </div>

                        <div className="hidden h-full rounded-[28px] border border-[#E7E2DA] bg-white p-5 md:col-span-4 md:block md:p-6">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                              <h4 className="font-founders text-[22px] font-medium text-[#1B1C19]">
                                Selected schedule
                              </h4>

                              <p className="mt-1 font-manrope text-[14px] font-medium leading-6 text-[#727973]">
                                Pick up to {MAX_WEEK_TIME_SLOTS} appointment times for the selected week.
                              </p>

                              <p className="mt-2 font-manrope text-[12px] font-bold uppercase tracking-[0.12em] text-[#416352]">
                                Weekdays 8:00 AM - 7:00 PM | Sat 8:00 AM - 4:00 PM
                              </p>
                            </div>

                            <p className="font-manrope text-[13px] font-bold text-[#416352]">
                              {totalSelectedSlots} of {MAX_WEEK_TIME_SLOTS} slots selected
                            </p>
                          </div>

                          <div className="mt-5 space-y-3">
                            {hasSelectedWeek ? (
                              orderedPreferredSelections.map((item) => {
                                const hasSelectedTimeSlot =
                                  item.timeSlots?.length > 0;
                                const isOpenDay =
                                  timeSlotDialogDayIndex === item.originalIndex;
                                const isActive =
                                  isOpenDay || hasSelectedTimeSlot;

                                return (
                                  <div
                                    key={`${item.date || "empty"}-${item.originalIndex}`}
                                    className={[
                                      "rounded-[20px] border px-4 py-4 transition-all",
                                      isActive
                                        ? "border-[#077D39] bg-[#EAF7EF] shadow-[0_0_0_1px_#077D39]"
                                        : "border-[#E7E2DA] bg-[#F8F7F3]",
                                    ].join(" ")}
                                  >
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                      <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                          <p className="font-manrope text-[15px] font-bold text-[#1B1C19]">
                                            {item.date
                                              ? formatWeekDayLabel(item.date)
                                              : `Day ${item.originalIndex + 1}`}
                                          </p>

                                          {hasSelectedTimeSlot ? (
                                            <span className="rounded-full bg-white px-2.5 py-1 font-manrope text-[10px] font-bold uppercase tracking-[0.12em] text-[#077D39]">
                                              Selected
                                            </span>
                                          ) : null}
                                        </div>

                                        <p
                                          className={[
                                            "mt-2 font-manrope text-[13px] leading-5",
                                            hasSelectedTimeSlot
                                              ? "text-[#416352]"
                                              : "text-[#727973]",
                                          ].join(" ")}
                                        >
                                          {hasSelectedTimeSlot
                                            ? item.timeSlots
                                                .map(formatTimeLabel)
                                                .join(", ")
                                            : "No time added yet"}
                                        </p>
                                      </div>

                                      <div className="flex flex-wrap items-center gap-2">
                                        {hasSelectedTimeSlot ? (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              clearWeekDayTimeSlots(
                                                item.originalIndex,
                                              )
                                            }
                                            className="rounded-full border border-[#E7C9C9] px-3 py-1.5 font-manrope text-[11px] font-bold text-[#B33A3A]"
                                          >
                                            Remove
                                          </button>
                                        ) : null}

                                        <button
                                          type="button"
                                          onClick={() =>
                                            openTimeSlotDialog(
                                              item.originalIndex,
                                            )
                                          }
                                          className={[
                                            "rounded-full px-4 py-2 font-manrope text-[12px] font-bold transition-all",
                                            hasSelectedTimeSlot
                                              ? "bg-[#077D39] text-white"
                                              : "border border-[#D7DDD5] bg-white text-[#416352] hover:border-[#077D39] hover:text-[#077D39]",
                                          ].join(" ")}
                                        >
                                          {hasSelectedTimeSlot ? "Edit" : "Add time"}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <p className="font-manrope text-[14px] font-medium leading-6 text-[#727973]">
                                Select a week from the calendar first.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <Dialog
                        open={preferredDatesDialogOpen}
                        onOpenChange={setPreferredDatesDialogOpen}
                      >
                        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-[28px] border border-[#E7E2DA] bg-white p-5 sm:max-w-[520px]">
                          <DialogHeader>
                            <DialogTitle className="font-founders text-[26px] font-medium text-[#1B1C19]">
                              Selected schedule
                            </DialogTitle>

                            <DialogDescription className="font-manrope text-[14px] font-medium leading-6 text-[#727973]">
                              {selectedWeekLabel
                                ? `${selectedWeekLabel}. Add up to ${MAX_WEEK_TIME_SLOTS} preferred time slots.`
                                : "Select a week from the calendar first."}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="mt-4 flex flex-col gap-2 rounded-[18px] bg-[#F6F5F0] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                            <p className="font-manrope text-[13px] font-bold text-[#416352]">
                              {totalSelectedSlots} of {MAX_WEEK_TIME_SLOTS} slots selected
                            </p>

                            <p className="font-manrope text-[12px] font-medium text-[#727973]">
                              Weekdays 8:00 AM - 7:00 PM | Sat 8:00 AM - 4:00 PM
                            </p>
                          </div>

                          <div className="mt-5 space-y-3">
                            {hasSelectedWeek ? (
                              orderedPreferredSelections.map((item) => {
                                const hasSelectedTimeSlot =
                                  item.timeSlots?.length > 0;
                                const isOpenDay =
                                  timeSlotDialogDayIndex === item.originalIndex;
                                const isActive =
                                  isOpenDay || hasSelectedTimeSlot;

                                return (
                                  <div
                                    key={`${item.date || "empty"}-${item.originalIndex}`}
                                    className={[
                                      "rounded-[20px] border px-4 py-4 transition-all",
                                      isActive
                                        ? "border-[#077D39] bg-[#EAF7EF] shadow-[0_0_0_1px_#077D39]"
                                        : "border-[#E7E2DA] bg-[#F8F7F3]",
                                    ].join(" ")}
                                  >
                                    <div className="flex flex-col gap-4">
                                      <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                          <p className="font-manrope text-[15px] font-bold text-[#1B1C19]">
                                            {item.date
                                              ? formatWeekDayLabel(item.date)
                                              : `Day ${item.originalIndex + 1}`}
                                          </p>

                                          {hasSelectedTimeSlot ? (
                                            <span className="rounded-full bg-white px-2.5 py-1 font-manrope text-[10px] font-bold uppercase tracking-[0.12em] text-[#077D39]">
                                              Selected
                                            </span>
                                          ) : null}
                                        </div>

                                        <p
                                          className={[
                                            "mt-2 font-manrope text-[13px] leading-5",
                                            hasSelectedTimeSlot
                                              ? "text-[#416352]"
                                              : "text-[#727973]",
                                          ].join(" ")}
                                        >
                                          {hasSelectedTimeSlot
                                            ? item.timeSlots
                                                .map(formatTimeLabel)
                                                .join(", ")
                                            : "No time added yet"}
                                        </p>
                                      </div>

                                      <div className="flex flex-wrap items-center gap-2">
                                        {hasSelectedTimeSlot ? (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              clearWeekDayTimeSlots(
                                                item.originalIndex,
                                              )
                                            }
                                            className="rounded-full border border-[#E7C9C9] px-3 py-1.5 font-manrope text-[11px] font-bold text-[#B33A3A]"
                                          >
                                            Remove
                                          </button>
                                        ) : null}

                                        <button
                                          type="button"
                                          onClick={() =>
                                            openMobilePreferredDateTimeSlot(
                                              item.originalIndex,
                                            )
                                          }
                                          className={[
                                            "rounded-full px-4 py-2 font-manrope text-[12px] font-bold transition-all",
                                            hasSelectedTimeSlot
                                              ? "bg-[#077D39] text-white"
                                              : "border border-[#D7DDD5] bg-white text-[#416352] hover:border-[#077D39] hover:text-[#077D39]",
                                          ].join(" ")}
                                        >
                                          {hasSelectedTimeSlot ? "Edit" : "Add time"}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <p className="font-manrope text-[14px] font-medium leading-6 text-[#727973]">
                                Select a week from the calendar first.
                              </p>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      <TimeSlotDialog
                        open={timeSlotDialogDayIndex !== null}
                        selection={selectedDialogDay}
                        dayIndex={timeSlotDialogDayIndex}
                        onOpenChange={(open) => {
                          if (!open) closeTimeSlotDialog();
                        }}
                        onToggleSlot={toggleWeekDayTimeSlot}
                      />

                      <ErrorText message={errors.preferredSelections} />

                      <EmergencyNotice className="mt-8" />

                      <FooterActions
                        left={
                          <GhostNavButton onClick={handlePrev}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous: Owner Information
                          </GhostNavButton>
                        }
                        right={
                          <PrimaryButton
                            onClick={handleFourthStepSubmit}
                            loading={isPostingStep4}
                            disabled={isPostingStep4}
                          >
                            Next: Medical Information{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </PrimaryButton>
                        }
                      />
                    </div>
                  )}

                  {step === 5 && (
                    <div>
                      <SectionTitle
                        title="Tell us about your pet's history"
                        subtitle="Share the symptoms, timing, and any useful records so the team can review before calling you back."
                      />

                      <FormSectionLabel label="Medical Information" />

                      <Field label="Symptoms or Concerns">
                        <TextArea
                          ref={setFieldRef("symptoms")}
                          placeholder="Tell us what you've noticed about your pet’s behavior or physical state..."
                          value={values.symptoms}
                          onChange={(e) =>
                            updateField("symptoms", e.target.value)
                          }
                        />
                        <ErrorText message={errors.symptoms} />
                      </Field>

                      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Field label="Current Medications (Optional)">
                          <TextInput
                            ref={setFieldRef("currentMedications")}
                            placeholder="e.g. None reported"
                            value={values.currentMedications}
                            onChange={(e) =>
                              updateField("currentMedications", e.target.value)
                            }
                          />
                          <ErrorText message={errors.currentMedications} />
                        </Field>

                        <Field label="Previous Veterinarian (Optional)">
                          <TextInput
                            placeholder="Clinic name or Doctor"
                            value={values.previousVeterinarian}
                            onChange={(e) =>
                              updateField(
                                "previousVeterinarian",
                                e.target.value,
                              )
                            }
                          />
                        </Field>
                      </div>

                      <div className="mt-5 max-w-[320px]">
                        <Field label="How Long Has This Been Happening?">
                          <TextInput
                            ref={setFieldRef("duration")}
                            placeholder="e.g. 2 days, since morning"
                            value={values.duration}
                            onChange={(e) =>
                              updateField("duration", e.target.value)
                            }
                          />
                          <ErrorText message={errors.duration} />
                        </Field>
                      </div>

                      <Field
                        className="mt-8"
                        label="Upload Medical Records (Optional)"
                      >
                        <>
                          <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-[26px] border border-dashed border-[#C6CCC3] bg-[#F6F5F0] px-6 text-center">
                            <UploadCloud className="h-8 w-8 text-[#2E6B46]" />
                            <p className="mt-4 font-manrope text-[16px] font-medium leading-6 text-[#2E2E2E]">
                              Drag and drop records or{" "}
                              <span className="text-[#2E6B46]">
                                browse files
                              </span>
                            </p>
                            <p className="mt-1 font-manrope text-sm font-medium leading-6 text-[#8B8F89]">
                              PDF, JPG, or PNG up to 10MB
                            </p>

                            <input
                              type="file"
                              ref={medicalFileInputRef}
                              className="hidden"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) =>
                                updateField(
                                  "uploadedFile",
                                  e.target.files?.[0] || null,
                                )
                              }
                            />
                          </label>

                          {values.uploadedFile ? (
                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              <p className="font-manrope text-sm font-medium leading-6 text-[#4B6D5C]">
                                Selected: {values.uploadedFile.name}
                              </p>

                              <button
                                type="button"
                                className="rounded-full border border-[#D8DDD6] bg-white px-4 py-2 font-manrope text-[12px] font-bold text-[#2E6B46]"
                                onClick={() =>
                                  medicalFileInputRef.current?.click()
                                }
                              >
                                Replace file
                              </button>

                              <button
                                type="button"
                                className="rounded-full border border-[#E7C9C9] bg-white px-4 py-2 font-manrope text-[12px] font-bold text-[#B33A3A]"
                                onClick={() => {
                                  if (medicalFileInputRef.current) {
                                    medicalFileInputRef.current.value = "";
                                  }
                                  updateField("uploadedFile", null);
                                }}
                              >
                                Remove file
                              </button>
                            </div>
                          ) : null}

                          {draftPreview?.files?.length ? (
                            <div className="mt-3 space-y-1">
                              {draftPreview.files.map((file, index) => (
                                <p
                                  key={`${file.name || file.filename || file.originalName || "file"}-${index}`}
                                  className="font-manrope text-sm font-medium leading-6 text-[#4B6D5C]"
                                >
                                  Existing file:{" "}
                                  {file.name ||
                                    file.filename ||
                                    file.originalName ||
                                    "Uploaded file"}
                                </p>
                              ))}
                            </div>
                          ) : null}
                        </>
                      </Field>

                      <EmergencyNotice className="mt-8" />

                      {submissionError ? (
                        <div className="mt-6 rounded-[18px] border border-[#F0C6C6] bg-[#FBF1F1] px-5 py-4 font-manrope text-[15px] font-medium leading-6 text-[#D32020]">
                          {submissionError}
                        </div>
                      ) : null}

                      <FooterActions
                        left={
                          <GhostNavButton onClick={handlePrev}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Previous: Preferred Times
                          </GhostNavButton>
                        }
                        right={
                          <PrimaryButton
                            onClick={handleFifthStepSubmit}
                            loading={isPostingStep5 || isUploadingDraftFile}
                            disabled={isPostingStep5 || isUploadingDraftFile}
                          >
                            Next: Preview{" "}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </PrimaryButton>
                        }
                      />
                    </div>
                  )}

                  {step === 6 && (
                    <div>
                      <SectionTitle
                        title="Check how this looks! Perfect?"
                        subtitle=""
                      />

                      {isLoadingDraftPreview ? (
                        <div className="py-10 text-center font-manrope text-[16px] font-medium text-[#414844]">
                          Loading preview...
                        </div>
                      ) : (
                        <div className="max-h-200 overflow-auto">
                          <FormSectionLabel label="Visit Information" />
                          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-12">
                            <PreviewItem
                              label="Visit Type"
                              value={previewVisitTypeLabel}
                            />
                            <PreviewItem
                              label="Preferred Contact Method"
                              value={previewContactMethodLabel}
                            />
                          </div>

                          <FormSectionLabel
                            className="mt-10"
                            label="Pet Information"
                          />
                          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-12">
                            <PreviewItem
                              label="Pet Name"
                              value={
                                draftPreview?.petName || values.petName || "—"
                              }
                            />
                            <PreviewItem
                              label="Species"
                              value={
                                draftPreview?.species
                                  ? SPECIES_LABELS[draftPreview.species]
                                  : values.species || "—"
                              }
                            />
                            <PreviewItem
                              label="Breed"
                              value={draftPreview?.breed || values.breed || "—"}
                            />
                            <PreviewItem
                              label="Age"
                              value={
                                draftPreview?.approximateAgeYears !== null &&
                                draftPreview?.approximateAgeYears !== undefined
                                  ? `${draftPreview.approximateAgeYears} years`
                                  : values.age
                                    ? `${values.age} years`
                                    : "—"
                              }
                            />
                            <PreviewItem
                              label="Sex"
                              value={
                                draftPreview?.sex
                                  ? SEX_LABELS[draftPreview.sex]
                                  : values.sex
                                    ? values.sex.charAt(0).toUpperCase() +
                                      values.sex.slice(1)
                                    : "—"
                              }
                            />
                            <PreviewItem
                              label="Weight"
                              value={
                                draftPreview?.weightLbs !== null &&
                                draftPreview?.weightLbs !== undefined
                                  ? `${draftPreview.weightLbs} lbs`
                                  : values.weight
                                    ? `${values.weight} lbs`
                                    : "—"
                              }
                            />
                          </div>

                          <FormSectionLabel
                            className="mt-10"
                            label="Owner Information"
                          />
                          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-12">
                            <PreviewItem label="Owner" value={previewOwnerLabel} />
                            <PreviewItem
                              label="Email Address"
                              value={draftPreview?.email || values.email || "—"}
                            />
                            <PreviewItem
                              label="Phone Number"
                              value={
                                draftPreview?.phoneNumber || values.phone || "—"
                              }
                            />
                          </div>

                          <FormSectionLabel
                            className="mt-10"
                            label="Booking Information"
                          />
                          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-12">
                            {draftPreview?.preferredSelections?.length ? (
                              draftPreview.preferredSelections.map(
                                (selection, index) => (
                                  <PreviewItem
                                    key={`${selection.date}-${index}`}
                                    label={`Preferred Selection ${index + 1}`}
                                    value={`${formatWeekDayLabel(selection.date)} — ${
                                      selection.timeSlots.length
                                        ? selection.timeSlots
                                            .map(formatTimeLabel)
                                            .join(", ")
                                        : "No slot selected"
                                    }`}
                                  />
                                ),
                              )
                            ) : getFilledPreferredSelections(
                                values.preferredSelections,
                              ).length ? (
                              getFilledPreferredSelections(
                                values.preferredSelections,
                              ).map((selection, index) => (
                                <PreviewItem
                                  key={`${selection.date}-${index}`}
                                  label={`Preferred Selection ${index + 1}`}
                                  value={`${formatWeekDayLabel(selection.date)} — ${
                                    selection.timeSlots.length
                                      ? selection.timeSlots
                                          .map(formatTimeLabel)
                                          .join(", ")
                                      : "No slot selected"
                                  }`}
                                />
                              ))
                            ) : (
                              <PreviewItem
                                label="Preferred Selections"
                                value="—"
                              />
                            )}

                            <PreviewItem
                              label="Timezone"
                              value={
                                draftPreview?.timezone || values.timezone || "—"
                              }
                            />
                          </div>

                          <FormSectionLabel
                            className="mt-10"
                            label="Medical Information"
                          />
                          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-12">
                            <PreviewItem
                              label="Symptoms or Concerns"
                              value={
                                draftPreview?.symptomsOrConcerns ||
                                values.symptoms ||
                                "—"
                              }
                            />
                            <PreviewItem
                              label="Current Medications"
                              value={
                                draftPreview?.currentMedications ||
                                values.currentMedications ||
                                "—"
                              }
                            />
                            <PreviewItem
                              label="Previous Veterinarian"
                              value={
                                draftPreview?.previousVeterinarian ||
                                values.previousVeterinarian ||
                                "—"
                              }
                            />
                            <PreviewItem
                              label="How Long Has This Been Happening?"
                              value={
                                draftPreview?.symptomDuration ||
                                values.duration ||
                                "—"
                              }
                            />
                            <PreviewItem
                              label="Uploaded File"
                              value={
                                draftPreview?.files?.length
                                  ? draftPreview.files
                                      .map(
                                        (file) =>
                                          file.name ||
                                          file.filename ||
                                          file.originalName ||
                                          "Uploaded file",
                                      )
                                      .join(", ")
                                  : values.uploadedFile?.name ||
                                    "No file uploaded"
                              }
                            />
                          </div>
                        </div>
                      )}

                      <EmergencyNotice className="mt-8" />

                      {draftPreviewError ? (
                        <div className="mt-6 rounded-[18px] border border-[#F0C6C6] bg-[#FBF1F1] px-5 py-4 font-manrope text-[15px] font-medium leading-6 text-[#D32020]">
                          Failed to load preview from saved draft.
                        </div>
                      ) : null}

                      <div className="mt-10 space-y-6">
                        <>
                          <CheckRow
                            buttonRef={setFieldRef("confirmContact")}
                            checked={values.confirmContact}
                            onClick={() =>
                              updateField(
                                "confirmContact",
                                !values.confirmContact,
                              )
                            }
                            label="I understand my appointment is not confirmed until the clinic contacts me personally."
                          />
                          <ErrorText message={errors.confirmContact} />
                        </>

                        <>
                          <CheckRow
                            buttonRef={setFieldRef("confirmCommunication")}
                            checked={values.confirmCommunication}
                            onClick={() =>
                              updateField(
                                "confirmCommunication",
                                !values.confirmCommunication,
                              )
                            }
                            label="I agree to receive communications regarding this request via phone, text, or email."
                          />
                          <ErrorText message={errors.confirmCommunication} />
                        </>
                      </div>

                      {submissionError ? (
                        <div className="mt-6 rounded-[18px] border border-[#F0C6C6] bg-[#FBF1F1] px-5 py-4 font-manrope text-[15px] font-medium leading-6 text-[#D32020]">
                          {submissionError}
                        </div>
                      ) : null}

                      <FooterActions
                        left={
                          <PhoneCallDialog
                            location="appointment_page"
                            trigger={
                              <button
                                type="button"
                                className="inline-flex items-center rounded-full bg-[#FF1820] px-7 py-4 font-manrope text-[18px] font-semibold leading-6 text-white shadow-[0_10px_24px_rgba(255,24,32,0.24)]"
                              >
                                <Phone className="mr-2 h-4 w-4" />
                                Call Now
                              </button>
                            }
                          />
                        }
                        right={
                          <div className="flex flex-wrap items-center gap-4">
                            <GhostNavButton onClick={handlePrev}>
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Previous
                            </GhostNavButton>

                            <button
                              type="submit"
                              disabled={isSubmitting || isSubmittingDraft}
                              className="inline-flex items-center justify-center rounded-full bg-[#077D39] px-8 py-4 font-manrope text-[18px] font-semibold leading-6 text-white shadow-[0_10px_24px_rgba(7,125,57,0.18)] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                              {isSubmitting || isSubmittingDraft
                                ? "Submitting..."
                                : "Submit Request"}
                              {!isSubmitting && !isSubmittingDraft && (
                                <ArrowRight className="ml-2 h-4 w-4" />
                              )}
                            </button>
                          </div>
                        }
                      />
                    </div>
                  )}
                </>
              ) : (
                <StepSuccess />
              )}
            </div>
          </form>
        </main>

        <aside className="xl:sticky xl:top-8 xl:self-start">
          <SidebarPanel showTestimonial={!submitted} />
        </aside>
      </div>
    </section>
  );
}

/* --------------------------- presentational bits -------------------------- */

function StepHeader({
  step,
  total,
  title,
  percent,
}: {
  step: number;
  total: number;
  title: string;
  percent: number;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[#41635299] manrope text-[9px] font-bold uppercase leading-[13px] tracking-[1px] md:text-[10px] md:leading-[14px] lg:text-[10px] lg:leading-[15px]">
            Step {step} of {total}
          </p>
          <h2 className="font-founders mt-2 text-[16px] font-medium leading-[24px] text-[#1B1C19] md:text-[18px] md:leading-[26px] lg:text-[20px] lg:leading-[28px]">
            {title}
          </h2>
        </div>

        <p className="hidden manrope text-[12px] font-bold leading-[18px] text-[#416352] sm:block md:text-[13px] md:leading-[19px] lg:text-[14px] lg:leading-[20px]">
          {percent}% Complete
        </p>
      </div>

      <div className="mt-5 h-[6px] w-full overflow-hidden rounded-full bg-[#EAE8E3]">
        <div
          className="h-full rounded-full bg-[#006838]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function SidebarPanel({
  showTestimonial = true,
}: {
  showTestimonial?: boolean;
}) {
  return (
    <div className="space-y-8" id="appointment-request-section">
      <PhonePanel location="appointment_page" />

      {showTestimonial ? (
        <div className="relative overflow-hidden rounded-[28px]">
          <img
            src={images.testimonial}
            alt="Happy pet owner testimonial"
            className="h-[540px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,47,36,0.08)_0%,rgba(20,47,36,0.55)_100%)]" />

          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <p className="mb-4 text-[#FFD6A5]">★★★★★</p>

            <blockquote className="max-w-[280px] font-serif text-[22px] italic leading-[1.55]">
              "The booking process was seamless and the care was world-class.
              Max felt right at home."
            </blockquote>

            <div className="mt-6">
              <p className="manrope text-[14px] font-bold leading-6">
                Sarah Jenkins
              </p>
              <p className="mt-1 manrope text-sm font-normal leading-6 text-[#AACFBA]">
                Pet Parent to Max
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StepSuccess() {
  return (
    <div className="flex min-h-[610px] items-center justify-center">
      <div className="mx-auto max-w-[680px] px-4 text-center">
        <img
          src={images.doctorPetEmoji}
          alt="Doctor with pets"
          className="mx-auto w-auto object-contain"
        />

        <h2 className="mt-8 font-queen text-[42px] leading-[60px] text-[#416352] md:text-[60px]">
          Your Appointment Request
          <br />
          Has Been Received
        </h2>

        <p className="mx-auto mt-8 max-w-[720px] manrope text-[20px] font-medium leading-[34px] text-[#414844] md:text-[20px]">
          Thank you for contacting Lili Veterinary Hospital. Our team will
          review your request and call you within 2 business hours to confirm
          the next step.
        </p>

        <div className="mt-10">
          <PhoneCallDialog
            location="appointment_success"
            trigger={
              <button
                type="button"
                className="inline-flex items-center rounded-full bg-[#FF1820] px-7 py-4 font-manrope text-[18px] font-semibold leading-6 text-white shadow-[0_10px_24px_rgba(255,24,32,0.24)]"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </button>
            }
          />
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-queen text-[40px] font-normal leading-[52px] text-[#1B1C19] md:text-[52px] md:leading-[68px] lg:text-[64px] lg:leading-[84px]">
          {sanitizeCopy(title)}
        </h3>
        {subtitle ? (
          <p className="mt-5 max-w-[620px] text-[#414844] manrope text-[16px] font-normal leading-[24px] md:text-[17px] md:leading-[26px] lg:text-[18px] lg:leading-[29.25px]">
            {sanitizeCopy(subtitle)}
          </p>
        ) : null}
      </div>
      <div>
        <img src={images.pawPrintBlur} alt="" />
      </div>
    </div>
  );
}

function FormSectionLabel({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={`mt-8 border-b border-[#ECE8E2] pb-3 ${className}`}>
      <p className="font-founders text-[10px] font-bold uppercase leading-[14px] tracking-[1.2px] text-[#727973] md:text-[11px] md:leading-[15px] lg:text-[12px] lg:leading-[16px]">
        {sanitizeCopy(label)}
      </p>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="my-3 block text-[#1B1C19] manrope text-[12px] font-semibold leading-[18px] md:text-[13px] md:leading-[19px] lg:text-[14px] lg:leading-[20px]">
        {label}
      </label>
      {children}
    </div>
  );
}

const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function TextInput(props, ref) {
  const typeSpecificClasses =
    props.type === "number"
      ? [
          "[appearance:textfield]",
          "[&::-webkit-inner-spin-button]:appearance-none",
          "[&::-webkit-outer-spin-button]:appearance-none",
        ]
      : [];

  return (
    <input
      {...props}
      ref={ref}
      className={[
        "h-[56px] w-full rounded-full border border-[#E7E2DA] bg-[#ECEAE4] px-5",
        "font-manrope text-[16px] font-medium leading-6 text-[#222]",
        "placeholder:text-[#A8A89F] outline-none focus:border-[#4D7A63]",
        ...typeSpecificClasses,
        props.className || "",
      ].join(" ")}
    />
  );
});

function SelectInput({
  value,
  options,
  placeholder,
  onChange,
  inputRef,
}: {
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (value: string) => void;
  inputRef?: React.Ref<HTMLSelectElement>;
}) {
  return (
    <div className="relative">
      <select
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[56px] w-full cursor-pointer appearance-none rounded-full border border-[#E7E2DA] bg-[#ECEAE4] px-5 pr-12 font-manrope text-[16px] font-medium leading-6 text-[#222] outline-none focus:border-[#4D7A63]"
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B716C]" />
    </div>
  );
}

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextArea(props, ref) {
  return (
    <textarea
      {...props}
      ref={ref}
      className={[
        "min-h-[140px] w-full rounded-[20px] border border-[#E7E2DA] bg-[#ECEAE4] px-5 py-4",
        "font-manrope text-[16px] font-medium leading-6 text-[#222]",
        "placeholder:text-[#88908A] outline-none focus:border-[#4D7A63]",
        props.className || "",
      ].join(" ")}
    />
  );
});

function SegmentedTwo({
  left,
  right,
  value,
  onChange,
  buttonRef,
}: {
  left: string;
  right: string;
  value: string;
  onChange: (value: string) => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <div className="grid grid-cols-2 rounded-full border border-[#E7E2DA] bg-[#ECEAE4] p-1">
      <button
        type="button"
        ref={buttonRef}
        onClick={() => onChange(left.toLowerCase())}
        className={[
          "rounded-full px-4 py-3 font-manrope text-[16px] font-medium leading-6",
          value === left.toLowerCase()
            ? "border border-[#4D7A63] bg-[#E5EFE5] text-[#1F3F2F]"
            : "text-[#6B716C]",
        ].join(" ")}
      >
        {left}
      </button>
      <button
        type="button"
        onClick={() => onChange(right.toLowerCase())}
        className={[
          "rounded-full px-4 py-3 font-manrope text-[16px] font-medium leading-6",
          value === right.toLowerCase()
            ? "border border-[#4D7A63] bg-[#E5EFE5] text-[#1F3F2F]"
            : "text-[#6B716C]",
        ].join(" ")}
      >
        {right}
      </button>
    </div>
  );
}

function OptionPill({
  selected,
  onClick,
  icon,
  label,
  buttonRef,
}: {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  buttonRef?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={onClick}
      className={[
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-full px-6 py-5",
        "font-manrope text-[18px] font-semibold leading-6 transition-all",
        selected
          ? "border-2 border-[#416352] bg-[#E5EFE5] text-[#1F3F2F]"
          : "bg-[#ECEAE4] text-[#2C2C2C]",
      ].join(" ")}
    >
      {icon}
      {label}
    </button>
  );
}

function RadioDot({ checked }: { checked: boolean }) {
  return (
    <span
      className={[
        "flex h-7 w-7 items-center justify-center rounded-full border",
        checked ? "border-[#4D7A63]" : "border-[#BCC2BA]",
      ].join(" ")}
    >
      {checked ? (
        <span className="h-3.5 w-3.5 rounded-full bg-[#4D7A63]" />
      ) : null}
    </span>
  );
}

function EmergencyNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-[22px] border border-[#952D2D33] bg-[#FCF4F4] p-6 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FF1820] text-white">
          <AlertCircle className="h-5 w-5" />
        </div>

        <div>
          <h4 className="manrope text-[16px] font-bold leading-[24px] text-[#ED1C24] md:text-[17px] md:leading-[26px] lg:text-[18px] lg:leading-[28px]">
            Life-Threatening Emergency?
          </h4>
          <p className="manrope mt-2 max-w-[720px] text-[12px] font-normal leading-[18px] text-[#414844] md:text-[13px] md:leading-[20px] lg:text-[14px] lg:leading-[22.75px]">
            Please <span className="font-semibold">do not use this form</span>{" "}
            for critical emergencies. Call us immediately or proceed to the
            nearest emergency animal hospital. Every second counts in critical
            situations.
          </p>
        </div>
      </div>
    </div>
  );
}

function FooterActions({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="mt-8 border-t border-[#C1C8C233] pt-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>{left}</div>
        <div className="flex flex-wrap items-center gap-4">{right}</div>
      </div>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-full bg-[#006838] px-8 py-4 text-[16px] font-bold leading-6 text-white manrope transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

function GhostNavButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center font-manrope text-[18px] font-medium leading-6 text-[#404440]"
    >
      {children}
    </button>
  );
}

function PreviewItem({ label, value }: { label: string; value: string }) {
  const resolvedValue =
    label === "Timezone" ? CLINIC_TIMEZONE_LABEL : displayValue(value);

  return (
    <div className="border-l-[4px] border-[#CBE7D4] pl-5">
      <p className="manrope mt-3 text-[12px] font-bold uppercase tracking-[0.15em] text-[#727973]">
        {sanitizeCopy(label)}
      </p>
      <p className="mt-2 manrope text-[20px] font-medium leading-7 text-[#1B1C19]">
        {resolvedValue}
      </p>
    </div>
  );
}

function CheckRow({
  checked,
  onClick,
  label,
  buttonRef,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
  buttonRef?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={onClick}
      className="flex items-start gap-4 text-left"
    >
      <span
        className={[
          "mt-1 flex h-[24px] w-[25px] shrink-0 items-center justify-center rounded-full border",
          checked
            ? "border-[#4D7A63] bg-[#E5EFE5]"
            : "border-[#BCC2BA] bg-transparent",
        ].join(" ")}
      >
        {checked ? <Check className="h-4 w-4 text-[#4D7A63]" /> : null}
      </span>

      <span className="manrope text-[14px] font-semibold leading-7 text-[#414844]">
        {sanitizeCopy(label)}
      </span>
    </button>
  );
}

function TimeSlotDialog({
  open,
  selection,
  dayIndex,
  onOpenChange,
  onToggleSlot,
}: {
  open: boolean;
  selection: PreferredSelection | null | undefined;
  dayIndex: number | null;
  onOpenChange: (open: boolean) => void;
  onToggleSlot: (dayIndex: number, slot: string) => void;
}) {
  if (!selection || dayIndex === null) return null;

  const availableSlots = getTimeSlotsForSelection(selection);
  const clinicHoursLabel = getClinicHoursLabel(selection);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] overflow-hidden rounded-[32px] border border-[#E7E2DA] bg-white p-0 text-[#1B1C19] sm:max-w-[760px] [&>button]:hidden">
        <DialogHeader className="border-b border-[#ECE8E2] px-6 py-5 text-left md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-founders text-[11px] font-bold uppercase tracking-[1.2px] text-[#727973]">
                Select time slots
              </p>

              <DialogTitle className="mt-2 font-founders text-[26px] font-medium leading-8 text-[#1B1C19]">
                {formatWeekDayLabel(selection.date)}
              </DialogTitle>

              <DialogDescription className="mt-2 font-manrope text-[14px] font-medium leading-6 text-[#727973]">
                Choose all the times that work for you on this day.
              </DialogDescription>
              <p className="mt-2 font-manrope text-[12px] font-bold uppercase tracking-[0.12em] text-[#416352]">
                {clinicHoursLabel}
              </p>
            </div>

            <DialogClose asChild>
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F6F5F0] text-[#1B1C19] transition-all hover:bg-[#ECEAE4]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="max-h-[58vh] overflow-y-auto px-6 py-6 md:px-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="font-manrope text-[14px] font-bold text-[#416352]">
              {selection.timeSlots.length} selected
            </p>

            {selection.timeSlots.length ? (
              <p className="max-w-full truncate font-manrope text-[13px] font-medium text-[#727973]">
                {selection.timeSlots.map(formatTimeLabel).join(", ")}
              </p>
            ) : (
              <p className="font-manrope text-[13px] font-medium text-[#727973]">
                No time selected yet
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {availableSlots.map((slot) => {
              const selected = selection.timeSlots.includes(slot);

              return (
                <button
                  key={`${selection.date}-${slot}`}
                  type="button"
                  onClick={() => onToggleSlot(dayIndex, slot)}
                  className={[
                    "rounded-full px-4 py-3 font-manrope text-[13px] font-bold transition-all",
                    selected
                      ? "border border-[#416352] bg-[#E5EFE5] text-[#1F3F2F] shadow-[0_0_0_1px_#416352]"
                      : "border border-transparent bg-[#ECEAE4] text-[#2C2C2C] hover:border-[#416352] hover:bg-[#E1E5DC]",
                  ].join(" ")}
                >
                  {formatTimeLabel(slot)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#ECE8E2] bg-[#F6F5F0] px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="font-manrope text-[13px] font-medium leading-5 text-[#727973]">
            You can select multiple time slots for this date.
          </p>

          <DialogClose asChild>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-[#006838] px-7 py-3 font-manrope text-[15px] font-bold text-white"
            >
              Done
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-2 font-manrope text-[14px] font-medium leading-5 text-[#D32020]">
      {message}
    </p>
  );
}
