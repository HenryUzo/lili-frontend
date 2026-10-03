import { addDays, addMonths, format, isAfter, isBefore, isSameDay, startOfDay, startOfMonth, subMonths } from "date-fns";
import { AlertTriangle, CalendarDays, Cat, ChevronDown, ChevronLeft, ChevronRight, Clock3, Dog, Phone } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { submitSimplifiedAppointment } from "../../../feature/appointment/api";

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

export function SimplifiedAppointmentForm() {
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(today));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [fields, setFields] = useState<{ clientFullName: string; petName: string; petType: "DOG" | "CAT"; email: string; phoneNumber: string; reasonForVisit: string; website: string }>({ clientFullName: "", petName: "", petType: "DOG", email: "", phoneNumber: "", reasonForVisit: "", website: "" });
  const [state, setState] = useState<{ loading: boolean; error: string; confirmation?: { id: string } }>({ loading: false, error: "" });
  const days = useMemo(() => monthDays(visibleMonth), [visibleMonth]);
  const slots = useMemo(() => timeSlots(selectedDate), [selectedDate]);
  const availableYears = useMemo(() => [...new Set(availableMonths.map((month) => month.getFullYear()))], []);
  const monthsForVisibleYear = useMemo(() => availableMonths.filter((month) => month.getFullYear() === visibleMonth.getFullYear()), [visibleMonth]);

  const update = (name: keyof typeof fields, value: string) => setFields((current) => ({ ...current, [name]: value }));
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedDate || !selectedTime) {
      setState({ loading: false, error: "Choose a preferred date and time." });
      return;
    }
    setState({ loading: true, error: "" });
    try {
      const result = await submitSimplifiedAppointment({ ...fields, preferredDate: dateKey(selectedDate), preferredTime: selectedTime });
      setState({ loading: false, error: "", confirmation: { id: result.id } });
    } catch (error: any) {
      setState({ loading: false, error: error?.response?.data?.error?.message || "We could not submit your request. Please try again." });
    }
  };

  if (state.confirmation) {
    return (
      <section id="appointment-request-section" className="bg-[#F6F6F6] px-4 py-16 md:px-8">
        <div className="mx-auto max-w-2xl rounded-[32px] border border-[#C1C8C24D] bg-white p-8 text-center shadow-[0_12px_40px_rgba(27,28,25,0.07)] md:p-12">
          <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-[#E5EFE5] text-[#077D39]"><CalendarDays /></div>
          <h2 className="font-founders text-[36px] font-medium leading-tight text-[#1B1C19]">Your request is in</h2>
          <p className="mt-3 font-manrope text-[15px] font-medium leading-6 text-[#414844]">You requested {selectedDate && format(selectedDate, "EEEE, MMMM d")} at {displayTime(selectedTime)} Central Time.</p>
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
          <p className="mt-3 font-manrope text-[15px] font-medium leading-6 text-[#414844]">Send one preferred time. Our staff will review and confirm it with you.</p>
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
              <label className="block font-manrope text-[13px] font-bold text-[#414844]">Phone number <span className="text-[#D32020]">*</span><input required type="tel" value={fields.phoneNumber} onChange={(e) => update("phoneNumber", e.target.value)} className="mt-2 h-12 w-full rounded-[16px] border border-[#D8DDD6] bg-[#FCFCFA] px-4 font-manrope text-[15px] text-[#1B1C19] outline-none transition focus:border-[#416352] focus:bg-white focus:ring-2 focus:ring-[#416352]/15" /><span className="mt-2 block font-manrope text-[11px] font-medium leading-4 text-[#727973]">We may text this number about this appointment request. Message rates may apply.</span></label>
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
              return <button key={day.toISOString()} type="button" disabled={unavailable} onClick={() => { setSelectedDate(day); setSelectedTime(""); }} className={`aspect-square min-h-10 rounded-[14px] border font-manrope text-sm font-bold transition ${active ? "border-[#077D39] bg-[#077D39] text-white shadow-[0_8px_18px_rgba(7,125,57,0.18)]" : "border-transparent text-[#2D4B39] hover:border-[#B7CDBD] hover:bg-[#EDF4EF]"} disabled:text-[#B4B4AA] disabled:hover:border-transparent disabled:hover:bg-transparent`}>{day.getDate()}</button>;
            })}</div>
            <div className="mt-6 flex items-center gap-2 border-t border-[#E7E2DA] pt-4 font-manrope text-[12px] font-medium text-[#727973]"><Clock3 className="size-4 text-[#416352]" />All times shown in Central Time</div>
          </div>

          <div className="flex min-h-[280px] flex-col bg-white p-5 sm:p-7 lg:min-h-[420px] lg:p-8">
            <h3 className="font-founders text-[26px] font-medium text-[#1B1C19]">{selectedDate ? format(selectedDate, "EEE, MMM d") : "Select a date"}</h3>
            <div className="mt-5 grid max-h-[380px] grid-cols-2 gap-2 overflow-y-auto pr-1 lg:grid-cols-1">{slots.map((slot) => <button key={slot} type="button" onClick={() => setSelectedTime(slot)} className={`h-11 rounded-full border px-4 font-manrope text-[13px] font-bold transition ${selectedTime === slot ? "border-[#077D39] bg-[#EAF7EF] text-[#077D39] shadow-[0_0_0_1px_#077D39]" : "border-[#D8DDD6] bg-white text-[#416352] hover:border-[#416352] hover:bg-[#F7FBF8]"}`}>{displayTime(slot)}</button>)}</div>
            {!selectedDate && <p className="mt-5 font-manrope text-[13px] font-medium leading-5 text-[#727973]">Choose an available day to view request times.</p>}
            <div className="mt-auto pt-6">
              {state.error && <p role="alert" className="mb-3 rounded-[14px] bg-[#FBF1F1] p-3 font-manrope text-[13px] font-bold text-[#D32020]">{state.error}</p>}
              <button disabled={state.loading || !selectedDate || !selectedTime} className="h-12 w-full rounded-full bg-[#077D39] px-4 font-manrope text-[15px] font-semibold text-white shadow-[0_10px_24px_rgba(7,125,57,0.18)] transition hover:bg-[#006B31] disabled:cursor-not-allowed disabled:bg-[#B8C7BD] disabled:shadow-none">{state.loading ? "Sending request..." : "Request this time"}</button>
              <p className="mt-3 text-center font-manrope text-[11px] font-medium leading-4 text-[#727973]">Your appointment is pending until Lili Veterinary Hospital confirms it.</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
