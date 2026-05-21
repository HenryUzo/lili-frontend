import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircle, CalendarClock, CheckCircle2, Plus, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Seo from "../components/seo/Seo";
import {
  getAppointmentRescheduleContext,
  submitAppointmentReschedule,
  type AppointmentRescheduleContextResponse
} from "../../feature/appointment/api";

type EditableSelection = {
  date: string;
  timeSlots: string[];
};

const MAX_DATES = 3;
const MAX_SLOTS = 3;

function emptySelection(): EditableSelection {
  return {
    date: "",
    timeSlots: [""]
  };
}

function toFormSelections(
  selections: AppointmentRescheduleContextResponse["preferredSelections"]
): EditableSelection[] {
  if (!selections.length) {
    return [emptySelection()];
  }

  return selections.slice(0, MAX_DATES).map((selection) => ({
    date: selection.date.slice(0, 10),
    timeSlots: selection.timeSlots.slice(0, MAX_SLOTS)
  }));
}

function validateSelections(selections: EditableSelection[], timezone: string) {
  if (!timezone.trim()) {
    return "Timezone is required.";
  }

  const filledSelections = selections.filter(
    (selection) => selection.date.trim() || selection.timeSlots.some((slot) => slot.trim())
  );

  if (filledSelections.length === 0) {
    return "Choose at least one preferred date and time.";
  }

  const seenDates = new Set<string>();

  for (const selection of filledSelections) {
    if (!selection.date.trim()) {
      return "Each preferred time group needs a date.";
    }

    if (seenDates.has(selection.date)) {
      return "Preferred dates must be unique.";
    }

    seenDates.add(selection.date);
    const slots = selection.timeSlots.map((slot) => slot.trim()).filter(Boolean);

    if (slots.length === 0) {
      return "Each selected date needs at least one time.";
    }

    if (new Set(slots).size !== slots.length) {
      return "Duplicate times are not allowed for the same date.";
    }
  }

  return "";
}

function formatVisitType(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

function formatDateTime(value?: string | null) {
  if (!value) return "Not provided";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Not provided";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(parsed);
}

export default function AppointmentReschedule() {
  const { token = "" } = useParams();
  const [selections, setSelections] = useState<EditableSelection[]>([emptySelection()]);
  const [timezone, setTimezone] = useState("Africa/Lagos");
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState("");

  const contextQuery = useQuery({
    queryKey: ["appointmentReschedule", token],
    queryFn: () => getAppointmentRescheduleContext(token),
    enabled: Boolean(token),
    retry: false
  });

  useEffect(() => {
    if (!contextQuery.data) {
      return;
    }

    setSelections(toFormSelections(contextQuery.data.preferredSelections));
    setTimezone(contextQuery.data.timezone || "Africa/Lagos");
  }, [contextQuery.data]);

  const submitMutation = useMutation({
    mutationFn: (payload: { preferredSelections: { date: string; timeSlots: string[] }[]; timezone: string }) =>
      submitAppointmentReschedule(token, payload),
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Your new preferred dates were sent to the clinic.");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Unable to submit your new preferred dates.");
    }
  });

  const summary = contextQuery.data;
  const cleanedSelections = useMemo(
    () =>
      selections
        .filter((selection) => selection.date.trim() || selection.timeSlots.some((slot) => slot.trim()))
        .map((selection) => ({
          date: `${selection.date}T00:00:00.000Z`,
          timeSlots: selection.timeSlots.map((slot) => slot.trim()).filter(Boolean)
        })),
    [selections]
  );

  const formError = validateSelections(selections, timezone);

  function updateSelection(index: number, nextSelection: EditableSelection) {
    setSelections((current) => current.map((selection, currentIndex) => (currentIndex === index ? nextSelection : selection)));
    setValidationError("");
  }

  function removeSelection(index: number) {
    setSelections((current) => {
      const next = current.filter((_, currentIndex) => currentIndex !== index);
      return next.length > 0 ? next : [emptySelection()];
    });
  }

  function addSelection() {
    setSelections((current) => (current.length >= MAX_DATES ? current : [...current, emptySelection()]));
  }

  if (contextQuery.isLoading) {
    return (
      <main className="min-h-[60vh] bg-[#F2F7EE] px-6 py-16">
        <div className="mx-auto max-w-4xl animate-pulse rounded-[28px] border border-[#DCE9D7] bg-white p-8 shadow-sm">
          <div className="h-8 w-64 rounded bg-[#E6EFE2]" />
          <div className="mt-4 h-4 w-96 rounded bg-[#E6EFE2]" />
          <div className="mt-8 h-64 rounded-3xl bg-[#F4F7F2]" />
        </div>
      </main>
    );
  }

  if (contextQuery.isError || !summary) {
    return (
      <>
        <Seo
          title="Reschedule Appointment | Lili Veterinary Hospital"
          description="Choose a new preferred date for your appointment request."
          path={`/book-appointment/reschedule/${token}`}
        />
        <main className="min-h-[60vh] bg-[#F2F7EE] px-6 py-16">
          <div className="mx-auto max-w-3xl rounded-[28px] border border-[#F0C7C7] bg-white p-8 shadow-sm">
            <div className="flex items-start gap-3 text-[#B14B4B]">
              <AlertCircle className="mt-1 h-5 w-5" />
              <div>
                <h1 className="text-2xl font-semibold text-[#204E1C]">This reschedule link is unavailable</h1>
                <p className="mt-3 text-base text-[#5B6B5F]">
                  {(contextQuery.error as any)?.message ||
                    "The link may be invalid, expired, or already used. Please contact the clinic for help."}
                </p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <Seo
          title="New Date Submitted | Lili Veterinary Hospital"
          description="Your new preferred appointment dates were sent to Lili Veterinary Hospital."
          path={`/book-appointment/reschedule/${token}`}
        />
        <main className="min-h-[60vh] bg-[#F2F7EE] px-6 py-16">
          <div className="mx-auto max-w-3xl rounded-[28px] border border-[#DCE9D7] bg-white p-8 shadow-sm">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-6 w-6 text-[#1F8D43]" />
              <div>
                <h1 className="text-3xl font-semibold text-[#204E1C]">Your new date request was sent</h1>
                <p className="mt-3 text-base text-[#5B6B5F]">
                  We received your new preferred dates for {summary.petName}. The clinic will review them and contact you to confirm the appointment.
                </p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Seo
        title="Choose a New Appointment Date | Lili Veterinary Hospital"
        description="Select new preferred dates and times for your appointment request."
        path={`/book-appointment/reschedule/${token}`}
      />

      <main className="bg-[#F2F7EE] px-6 py-16">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="rounded-[28px] border border-[#DCE9D7] bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3A7B48]">
              Appointment reschedule
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-[#204E1C]">
              Choose a new date for {summary.petName}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#5B6B5F]">
              Hi {summary.ownerName}, the previously scheduled appointment time has passed. Please choose new preferred dates and times by {formatDateTime(summary.responseDeadline)} so the clinic can review them.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-[#DCE9D7] bg-[#F7FAF5] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B8F75]">Visit type</p>
                <p className="mt-2 text-lg font-semibold text-[#204E1C]">{formatVisitType(summary.visitType)}</p>
              </div>
              <div className="rounded-3xl border border-[#DCE9D7] bg-[#F7FAF5] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B8F75]">Previous scheduled time</p>
                <p className="mt-2 text-lg font-semibold text-[#204E1C]">{formatDateTime(summary.confirmedStartAt)}</p>
              </div>
              <div className="rounded-3xl border border-[#DCE9D7] bg-[#F7FAF5] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B8F75]">Timezone</p>
                <input
                  value={timezone}
                  onChange={(event) => {
                    setTimezone(event.target.value);
                    setValidationError("");
                  }}
                  className="mt-2 w-full rounded-2xl border border-[#DCE9D7] bg-white px-4 py-3 text-base text-[#204E1C] outline-none"
                  placeholder="Africa/Lagos"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#DCE9D7] bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3A7B48]">
                  Preferred times
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-[#204E1C]">
                  Select up to three preferred dates
                </h2>
                <p className="mt-2 text-base text-[#5B6B5F]">
                  Choose at least one date and at least one time for each date you select.
                </p>
              </div>
              <button
                type="button"
                onClick={addSelection}
                disabled={selections.length >= MAX_DATES}
                className="inline-flex items-center gap-2 rounded-full border border-[#CFE2CA] px-4 py-2 text-sm font-semibold text-[#1F8D43] disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
                Add another date
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {selections.map((selection, index) => (
                <div key={index} className="rounded-[24px] border border-[#DCE9D7] bg-[#F7FAF5] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[#204E1C]">
                      <CalendarClock className="h-5 w-5 text-[#3A7B48]" />
                      <p className="font-semibold">Preferred date {index + 1}</p>
                    </div>
                    {selections.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeSelection(index)}
                        className="rounded-full border border-[#E7D1D1] p-2 text-[#B14B4B]"
                        aria-label={`Remove preferred date ${index + 1}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>

                  <input
                    type="date"
                    value={selection.date}
                    onChange={(event) =>
                      updateSelection(index, { ...selection, date: event.target.value })
                    }
                    className="mt-4 w-full rounded-2xl border border-[#DCE9D7] bg-white px-4 py-3 text-base text-[#204E1C] outline-none"
                  />

                  <div className="mt-4 space-y-3">
                    {selection.timeSlots.map((slot, slotIndex) => (
                      <div key={slotIndex} className="flex items-center gap-3">
                        <input
                          type="time"
                          value={slot}
                          onChange={(event) => {
                            const nextSlots = selection.timeSlots.map((currentSlot, currentIndex) =>
                              currentIndex === slotIndex ? event.target.value : currentSlot
                            );
                            updateSelection(index, { ...selection, timeSlots: nextSlots });
                          }}
                          className="w-full rounded-2xl border border-[#DCE9D7] bg-white px-4 py-3 text-base text-[#204E1C] outline-none"
                        />
                        {selection.timeSlots.length > 1 ? (
                          <button
                            type="button"
                            onClick={() =>
                              updateSelection(index, {
                                ...selection,
                                timeSlots: selection.timeSlots.filter((_, currentIndex) => currentIndex !== slotIndex)
                              })
                            }
                            className="rounded-full border border-[#E7D1D1] p-2 text-[#B14B4B]"
                            aria-label={`Remove time ${slotIndex + 1}`}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      updateSelection(index, {
                        ...selection,
                        timeSlots:
                          selection.timeSlots.length >= MAX_SLOTS
                            ? selection.timeSlots
                            : [...selection.timeSlots, ""]
                      })
                    }
                    disabled={selection.timeSlots.length >= MAX_SLOTS}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#CFE2CA] px-4 py-2 text-sm font-semibold text-[#1F8D43] disabled:opacity-40"
                  >
                    <Plus className="h-4 w-4" />
                    Add time
                  </button>
                </div>
              ))}
            </div>

            {validationError || formError ? (
              <div className="mt-5 rounded-2xl border border-[#F0C7C7] bg-[#FFF7F7] px-4 py-3 text-sm text-[#B14B4B]">
                {validationError || formError}
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => {
                if (formError) {
                  setValidationError(formError);
                  return;
                }

                submitMutation.mutate({
                  preferredSelections: cleanedSelections,
                  timezone: timezone.trim()
                });
              }}
              disabled={submitMutation.isPending}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1F8D43] px-6 py-4 text-base font-semibold text-white disabled:opacity-50"
            >
              {submitMutation.isPending ? "Booking..." : "Book a new date"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
