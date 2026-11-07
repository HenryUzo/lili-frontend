import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { getAppointmentBookingSettings } from "../../../feature/appointment/api";
import { AppointmentRequestSection } from "./AppointmentForm";
import { SimplifiedAppointmentForm } from "./SimplifiedAppointmentForm";

export function AppointmentBookingExperience({ standardHeader }: { standardHeader: ReactNode }) {
  const { data, isPending, isError } = useQuery({ queryKey: ["appointment-booking-settings"], queryFn: getAppointmentBookingSettings, retry: 1 });
  if (isPending) return <section className="min-h-80 bg-[#F6F6F6]" aria-label="Loading appointment booking" />;
  if (isError || data?.mode !== "SIMPLIFIED") return <>{standardHeader}<AppointmentRequestSection /></>;
  return <SimplifiedAppointmentForm />;
}
