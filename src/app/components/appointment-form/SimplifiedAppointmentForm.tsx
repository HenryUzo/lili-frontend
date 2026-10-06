import { addDays, addMonths, format, isAfter, isBefore, isSameDay, startOfDay, startOfMonth, subMonths } from "date-fns";
import { AlertTriangle, Cat, ChevronDown, ChevronLeft, ChevronRight, Clock3, Dog, Phone } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { submitSimplifiedAppointment } from "../../../feature/appointment/api";
import images from "../../assests/images";
import { trackAppointmentSubmitted } from "../../../lib/analytics";
import { getAppointmentAttribution } from "../../../lib/attribution";

const today = startOfDay(new Date());
const latestDate = addDays(today, 60);
const availableMonths = (() => {
  const months: Date[] = [];
  let month = startOfMonth(today);
  const lastMonth = startOfMonth(latestDate);
  while (!isAfter(month, lastMonth)) {
    months.push(month);
    month = addMonths(month, 1);
  }
  return months;
})();

function dateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

function monthDays(month: Date) {
  const first = startOfMonth(month);
  const leading = first.getDay();
  return Array.from({ length: 42 }, (_, index) => new Date(first.getFullYear(), first.getMonth(), index - leading + 1));
}

function timeSlots(date: Date | null) {
  if (!date || date.getDay() === 0) return [];
  const closeHour = date.getDay() === 6 ? 16 : 19;
  const slots: string[] = [];
  for (let hour = 8; hour < closeHour; hour += 1) {
    slots.push(`${String(hour).padStart(2, "0")}:00`, `${String(hour).padStart(2, "0")}:30`);
  }
  return slots;
}

function displayTime(value: string) {
  const [hour, minute] = value.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}

function formatUsPhone(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("1")) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function SimplifiedAppointmentForm() {
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(today));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [preferredSelections, setPreferredSelections] = useState<Array<{ date: string; time: string }>>([]);
  const [fields, setFields] = useState<{ clientFullName: string; petName: string; petType: "DOG" | "CAT"; email: string; phoneNumber: string; reasonForVisit: string; website: string }>({ clientFullName: "", petName: "", petType: "DOG", email: "", phoneNumber: "", reasonForVisit: "", website: "" });
  const [state, setState] = useState<{ loading: boolean; error: string; confirmation?: { id: string } }>({ loading: false, error: "" });
  const days = useMemo(() => monthDays(visibleMonth), [visibleMonth]);
  const slots = useMemo(() => timeSlots(selectedDate), [selectedDate]);
  const availableYears = useMemo(() => [...new Set(availableMonths.map((month) => month.getFullYear()))], []);
  const monthsForVisibleYear = useMemo(() => availableMonths.filter((month) => month.getFullYear() === visibleMonth.getFullYear()), [visibleMonth]);

  const update = (name: keyof typeof fields, value: string) => setFields((current) => ({ ...current, [name]: value }));
  const togglePreferredTime = (time: string) => {
    if (!selectedDate) return;
    const date = dateKey(selectedDate);
    const exists = preferredSelections.some((selection) => selection.date === date && selection.time === time);
    if (exists) {
      setPreferredSelections((current) => current.filter((selection) => selection.date !== date || selection.time !== time));
      return;
    }
    if (preferredSelections.length >= 3) {
      setState((current) => ({ ...current, error: "You can choose up to three preferred times. Remove one to add another." }));
      return;
    }
    setPreferredSelections((current) => [...current, { date, time }]);
    setState((current) => ({ ...current, error: "" }));
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!preferredSelections.length) {
      setState({ loading: false, error: "Choose at least one preferred date and time." });
      return;
    }
    setState({ loading: true, error: "" });
    try {
      const firstSelection = preferredSelections[0];
      const result = await submitSimplifiedAppointment({
        ...fields,
        phoneNumber: `+1 ${fields.phoneNumber}`,
        preferredDate: firstSelection.date,
        preferredTime: firstSelection.time,
        preferredSelections,
        attribution: getAppointmentAttribution()
      });
      trackAppointmentSubmitted({
        visitType: "OTHER",
        petSpecies: fields.petType,
        preferredDatesCount: preferredSelections.length,
      });
      setState({ loading: false, error: "", confirmation: { id: result.id } });
    } catch (error: any) {
      setState({ loading: false, error: error?.response?.data?.error?.message || "We could not submit your request. Please try again." });
    }
  };

  if (state.confirmation) {
    return (
      <section id="appointment-request-section" className="bg-[#F6F6F6] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-2xl rounded-[32px] border border-[#C1C8C24D] bg-white p-8 text-center shadow-[0_12px_40px_rgba(27,28,25,0.07)] md:p-12">
          <img src={images.doctorPetEmoji} alt="Lili veterinarian with pets" className="mx-auto mb-6 h-auto w-36 object-contain sm:w-44" />
          <h2 className="font-founders text-[36px] font-medium leading-tight text-[#1B1C19]">Your request is in</h2>
          <p className="mt-3 font-manrope text-[15px] font-medium leading-6 text-[#414844]">We received your preferred appointment times:</p>
          <ol className="mx-auto mt-4 max-w-sm space-y-2 text-left">
            {preferredSelections.map((selection, index) => <li key={`${selection.date}-${selection.time}`} className="rounded-[14px] bg-[#F6F5F0] px-4 py-3 font-manrope text-[14px] font-bold text-[#2D4B39]">{index + 1}. {format(new Date(`${selection.date}T12:00:00`), "EEEE, MMMM d")} at {displayTime(selection.time)}</li>)}
          </ol>
          <p className="mt-2 font-manrope font-bold text-[#416352]">This is not confirmed yet. Our team will contact you to confirm the appointment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="appointment-request-section" className="bg-[#F6F6F6] px-4 py-12 md:px-8 lg:py-20 xl:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl">
          <p className="font-manrope text-[11px] font-bold uppercase tracking-[0.14em] text-[#41635299]">Appointment request</p>
          <h2 className="mt-2 font-founders text-[36px] font-medium leading-[1.08] text-[#1B1C19] md:text-[46px]">Choose a time that works for you</h2>
          <p className="mt-3 font-manrope text-[15px] font-medium leading-6 text-[#414844]">Choose up to three preferred times. Our staff will review them and confirm one with you.</p>
        </div>
        <form onSubmit={submit} className="grid overflow-hidden rounded-[32px] border border-[#C1C8C24D] bg-white shadow-[0_12px_40px_rgba(27,28,25,0.07)] lg:grid-cols-[0.9fr_1.25fr_0.75fr]">
          <div className="border-b border-[#E7E2DA] bg-white p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
            <h3 className="font-founders text-[26px] font-medium text-[#1B1C19]">Your details</h3>
            <div className="mt-5 space-y-4">
              <label className="block font-manrope text-[13px] font-bold text-[#414844]">Client full name <span className="text-[#D32020]">*</span><input required value={fields.clientFullName} onChange={(e) => update("clientFullName", e.target.value)} className="mt-2 h-12 w-full rounded-[16px] border border-[#D8DDD6] bg-[#FCFCFA] px-4 font-manrope text-[15px] text-[#1B1C19] outline-none transition focus:border-[#416352] focus:bg-white focus:ring-2 focus:ring-[#416352]/15" /></label>
              <label className="block font-manrope text-[13px] font-bold text-[#414844]">Pet name <span className="text-[#D32020]">*</span><input required value={fields.petName} onChange={(e) => update("petName", e.target.value)} className="mt-2 h-12 w-full rounded-[16px] border border-[#D8DDD6] bg-[#FCFCFA] px-4 font-manrope text-[15px] text-[#1B1C19] outline-none transition focus:border-[#416352] focus:bg-white focus:ring-2 focus:ring-[#416352]/15" /></label>
              <fieldset>
                <legend className="font-manrope text-[13px] font-bold text-[#414844]">Pet type <span className="text-[#D32020]">*</span></legend>
                <div className="mt-2 grid grid-cols-2 gap-2 rounded-[18px] bg-[#F6F5F0] p-1.5">
                  {([{ value: "DOG", label: "Dog", Icon: Dog }, { value: "CAT", label: "Cat", Icon: Cat }] as const).map(({ value, label, Icon }) => (
                    <button key={value} type="button" aria-pressed={fields.petType === value} onClick={() => update("petType", value)} className={`flex h-11 items-center justify-center gap-2 rounded-[14px] font-manrope text-[13px] font-bold transition ${fields.petType === value ? "bg-white text-[#077D39] shadow-sm ring-1 ring-[#B7CDBD]" : "text-[#727973] hover:text-[#416352]"}`}><Icon className="size-4" />{label}</button>
                  ))}
                </div>
              </fieldset>
              <label className="block font-manrope text-[13px] font-bold text-[#414844]">Email <span className="font-medium text-[#8B8F89]">(optional)</span><input type="email" value={fields.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" className="mt-2 h-12 w-full rounded-[16px] border border-[#D8DDD6] bg-[#FCFCFA] px-4 font-manrope text-[15px] text-[#1B1C19] outline-none transition focus:border-[#416352] focus:bg-white focus:ring-2 focus:ring-[#416352]/15" /></label>
              <label className="block font-manrope text-[13px] font-bold text-[#414844]">Phone number <span className="text-[#D32020]">*</span><span className="mt-2 flex h-12 overflow-hidden rounded-[16px] border border-[#D8DDD6] bg-[#FCFCFA] transition focus-within:border-[#416352] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#416352]/15"><span aria-hidden="true" className="flex items-center border-r border-[#D8DDD6] bg-[#F1F4F0] px-4 font-manrope text-[15px] font-bold text-[#2D4B39]">+1</span><input required type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(210) 555-0123" pattern="\(\d{3}\) \d{3}-\d{4}" title="Enter a 10-digit U.S. phone number" value={fields.phoneNumber} onChange={(e) => update("phoneNumber", formatUsPhone(e.target.value))} className="min-w-0 flex-1 bg-transparent px-4 font-manrope text-[15px] text-[#1B1C19] outline-none" /></span><span className="mt-2 block font-manrope text-[11px] font-medium leading-4 text-[#727973]">We may text this number about this appointment request. Message rates may apply.</span></label>
              <label className="block font-manrope text-[13px] font-bold text-[#414844]">Reason for visit <span className="text-[#D32020]">*</span><textarea required rows={4} value={fields.reasonForVisit} onChange={(e) => update("reasonForVisit", e.target.value)} className="mt-2 w-full resize-y rounded-[16px] border border-[#D8DDD6] bg-[#FCFCFA] p-4 font-manrope text-[15px] text-[#1B1C19] outline-none transition focus:border-[#416352] focus:bg-white focus:ring-2 focus:ring-[#416352]/15" /></label>
              <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={fields.website} onChange={(e) => update("website", e.target.value)} className="absolute -left-[9999px]" />
            </div>
            <div className="mt-6 rounded-[18px] border border-[#F0C6C6] bg-[#FBF1F1] p-4 font-manrope text-[13px] text-[#7B3030]"><div className="flex gap-2 font-bold"><AlertTriangle className="size-5 shrink-0 text-[#D32020]" />Is this an emergency?</div><a href="tel:+12102578496" className="mt-2 inline-flex items-center gap-2 font-bold text-[#D32020] underline"><Phone className="size-4" />Call (210) 257-8496</a></div>
          </div>

          <div className="border-b border-[#E7E2DA] bg-[#F6F5F0] p-5 sm:p-7 lg:border-b-0 lg:border-r lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="grid min-w-0 flex-1 grid-cols-[minmax(140px,1fr)_112px] overflow-hidden rounded-[16px] border border-[#D8DDD6] bg-white">
                <label className="relative min-w-0 border-r border-[#D8DDD6]">
                  <span className="sr-only">Month</span>
                  <select value={visibleMonth.getMonth()} onChange={(event) => { const selected = monthsForVisibleYear.find((month) => month.getMonth() === Number(event.target.value)); if (selected) setVisibleMonth(selected); }} className="h-11 w-full appearance-none bg-transparent pl-4 pr-10 font-manrope text-[15px] font-bold text-[#1B1C19] outline-none transition focus:bg-[#F7FBF8]">
                    {monthsForVisibleYear.map((month) => <option key={month.toISOString()} value={month.getMonth()}>{format(month, "MMMM")}</option>)}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#416352]" />
                </label>
                <label className="relative min-w-0">
                  <span className="sr-only">Year</span>
                  <select value={visibleMonth.getFullYear()} onChange={(event) => { const selectedYear = Number(event.target.value); const sameMonth = availableMonths.find((month) => month.getFullYear() === selectedYear && month.getMonth() === visibleMonth.getMonth()); setVisibleMonth(sameMonth ?? availableMonths.find((month) => month.getFullYear() === selectedYear)!); }} className="h-11 w-full appearance-none bg-transparent pl-4 pr-9 font-manrope text-[15px] font-bold text-[#1B1C19] outline-none transition focus:bg-[#F7FBF8]">
                    {availableYears.map((year) => <option key={year} value={year}>{year}</option>)}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#416352]" />
                </label>
              </div>
              <div className="flex gap-2"><button type="button" aria-label="Previous month" onClick={() => setVisibleMonth(subMonths(visibleMonth, 1))} disabled={!isAfter(visibleMonth, availableMonths[0])} className="flex size-10 items-center justify-center rounded-full border border-[#D8DDD6] bg-white text-[#416352] transition hover:border-[#416352] disabled:opacity-30"><ChevronLeft className="size-5" /></button><button type="button" aria-label="Next month" onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))} disabled={!isBefore(visibleMonth, availableMonths[availableMonths.length - 1])} className="flex size-10 items-center justify-center rounded-full border border-[#D8DDD6] bg-white text-[#416352] transition hover:border-[#416352] disabled:opacity-30"><ChevronRight className="size-5" /></button></div>
            </div>
            <div className="mt-6 grid grid-cols-7 gap-1 text-center font-manrope text-[11px] font-bold uppercase text-[#727973]">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}</div>
            <div className="mt-2 grid grid-cols-7 gap-1">{days.map((day) => {
              const unavailable = day.getMonth() !== visibleMonth.getMonth() || day.getDay() === 0 || isBefore(day, today) || isAfter(day, latestDate);
              const active = selectedDate ? isSameDay(day, selectedDate) : false;
              const hasPreference = preferredSelections.some((selection) => selection.date === dateKey(day));
              return <button key={day.toISOString()} type="button" disabled={unavailable} onClick={() => setSelectedDate(day)} className={`relative aspect-square min-h-10 rounded-[14px] border font-manrope text-sm font-bold transition ${active ? "border-[#077D39] bg-[#077D39] text-white shadow-[0_8px_18px_rgba(7,125,57,0.18)]" : "border-transparent text-[#2D4B39] hover:border-[#B7CDBD] hover:bg-[#EDF4EF]"} disabled:text-[#B4B4AA] disabled:hover:border-transparent disabled:hover:bg-transparent`}>{day.getDate()}{hasPreference && !active && <span className="absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#077D39]" />}</button>;
            })}</div>
            <div className="mt-6 flex items-center gap-2 border-t border-[#E7E2DA] pt-4 font-manrope text-[12px] font-medium text-[#727973]"><Clock3 className="size-4 text-[#416352]" />All times shown in Central Time</div>
          </div>

          <div className="flex min-h-[280px] flex-col bg-white p-5 sm:p-7 lg:min-h-[420px] lg:p-8">
            <h3 className="font-founders text-[26px] font-medium text-[#1B1C19]">{selectedDate ? format(selectedDate, "EEE, MMM d") : "Select a date"}</h3>
            <p className="mt-1 font-manrope text-[12px] font-medium text-[#727973]">{preferredSelections.length} of 3 preferred times selected</p>
            <div className="mt-4 grid max-h-[300px] grid-cols-2 gap-2 overflow-y-auto pr-1 lg:grid-cols-1">{slots.map((slot) => {
              const selected = Boolean(selectedDate && preferredSelections.some((selection) => selection.date === dateKey(selectedDate) && selection.time === slot));
              return <button key={slot} type="button" aria-pressed={selected} onClick={() => togglePreferredTime(slot)} className={`h-11 rounded-full border px-4 font-manrope text-[13px] font-bold transition ${selected ? "border-[#077D39] bg-[#EAF7EF] text-[#077D39] shadow-[0_0_0_1px_#077D39]" : "border-[#D8DDD6] bg-white text-[#416352] hover:border-[#416352] hover:bg-[#F7FBF8]"}`}>{displayTime(slot)}</button>;
            })}</div>
            {!selectedDate && <p className="mt-5 font-manrope text-[13px] font-medium leading-5 text-[#727973]">Choose an available day to view request times.</p>}
            {preferredSelections.length > 0 && <div className="mt-5 space-y-2 border-t border-[#E7E2DA] pt-4">{preferredSelections.map((selection, index) => <div key={`${selection.date}-${selection.time}`} className="flex items-center justify-between gap-3 rounded-[14px] bg-[#F6F5F0] px-3 py-2"><span className="font-manrope text-[12px] font-bold text-[#2D4B39]">{index + 1}. {format(new Date(`${selection.date}T12:00:00`), "MMM d")} · {displayTime(selection.time)}</span><button type="button" onClick={() => setPreferredSelections((current) => current.filter((item) => item !== selection))} className="font-manrope text-[11px] font-bold text-[#D32020] underline">Remove</button></div>)}</div>}
            <div className="mt-auto pt-6">
              {state.error && <p role="alert" className="mb-3 rounded-[14px] bg-[#FBF1F1] p-3 font-manrope text-[13px] font-bold text-[#D32020]">{state.error}</p>}
              <button disabled={state.loading || !preferredSelections.length} className="h-12 w-full rounded-full bg-[#077D39] px-4 font-manrope text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(7,125,57,0.18)] transition hover:bg-[#006B31] disabled:cursor-not-allowed disabled:bg-[#B8C7BD] disabled:shadow-none">{state.loading ? "Sending request..." : "Request preferred times"}</button>
              <p className="mt-3 text-center font-manrope text-[11px] font-medium leading-4 text-[#727973]">Your appointment is pending until Lili Veterinary Hospital confirms it.</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
