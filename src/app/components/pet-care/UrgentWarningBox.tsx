import { AlertTriangle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { CLINIC_PHONE_DISPLAY, CLINIC_PHONE_NUMBER, trackCallClick } from "../../../lib/analytics";

type UrgentWarningBoxProps = {
  title?: string;
  children: ReactNode;
};

export function UrgentWarningBox({
  title = "Life-threatening emergency?",
  children,
}: UrgentWarningBoxProps) {
  return (
    <aside className="relative rotate-[-0.6deg] rounded-[28px] border-2 border-white bg-[#FFF1F1] p-6 text-[#621818]">
      <div className="absolute -top-4 left-8 rotate-[-5deg] rounded-full bg-[#ED1C24] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white">
        Emergency note
      </div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ED1C24] text-white">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </span>
          <div className="space-y-2">
            <h2 className="mt-2 text-2xl font-bold text-[#621818]">{title}</h2>
            <div className="text-base leading-7 text-[#7A2A2A]">{children}</div>
          </div>
        </div>
        <a
          href={`tel:${CLINIC_PHONE_NUMBER}`}
          onClick={() => trackCallClick("pet_care_urgent_warning")}
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#ED1C24] px-5 py-3 font-bold text-white transition hover:bg-[#C9151B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ED1C24]"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Call {CLINIC_PHONE_DISPLAY}
        </a>
      </div>
    </aside>
  );
}
