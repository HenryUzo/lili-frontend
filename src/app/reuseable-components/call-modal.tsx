import type { ReactNode } from "react";
import { PhoneCall, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

interface PhoneCallDialogProps {
  phoneNumber?: string;
  trigger: ReactNode;
}

export default function PhoneCallDialog({
  phoneNumber = "(210) 257-8496",
  trigger,
}: PhoneCallDialogProps) {
  const telNumber = phoneNumber.replace(/[^\d+]/g, "");

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="z-[100000] border-none bg-transparent p-0 shadow-none sm:max-w-[520px] [&>button]:hidden">
        <div className="relative overflow-hidden rounded-[32px] border border-[#952D2D33] bg-[#FCF4F4] px-6 py-6 shadow-[0_24px_80px_rgba(39,13,13,0.22)] md:px-8">
          <DialogClose asChild>
            <button
              type="button"
              aria-label="Close"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#952D2D1F] bg-white text-[#621818] transition-all duration-200 hover:bg-[#FFEAEA]"
            >
              <X className="h-4 w-4" />
            </button>
          </DialogClose>

          <DialogHeader className="pr-10 text-left">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFB8BB] text-[#FF3037] shadow-[0_12px_30px_rgba(255,48,55,0.18)]">
              <PhoneCall className="h-6 w-6" />
            </div>

            <DialogTitle className="font-founders text-[26px] font-normal leading-[34px] tracking-[0] text-[#1B1C19] md:text-[30px] md:leading-[38px]">
              Prefer a Phone Call?
            </DialogTitle>

            <p className="mt-3 max-w-[420px] font-manrope text-[14px] font-normal leading-[22px] text-[#414844]">
              Our patient coordinators are available to help you schedule
              immediately during business hours.
            </p>
          </DialogHeader>

          <div className="mt-8 rounded-[24px] border border-[#ECE7E3] bg-white px-5 py-4 shadow-[0_12px_35px_rgba(38,38,38,0.06)]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFB8BB] text-[#FF3037]">
                <PhoneCall className="h-5 w-5" />
              </div>

              <div>
                <p className="font-manrope text-[10px] font-bold uppercase tracking-[0.25em] text-[#62181899]">
                  Clinic Hot Line
                </p>

                <p className="mt-1 font-manrope text-[22px] font-bold leading-7 text-[#1B1C19]">
                  {phoneNumber}
                </p>
              </div>
            </div>
          </div>

          <a
            href={`tel:${telNumber}`}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#ED1C24] px-6 py-3.5 font-manrope text-[17px] font-semibold leading-7 text-white shadow-[0_10px_24px_rgba(255,24,32,0.24)] transition-all duration-200 hover:bg-[#D9151D] active:scale-[0.98]"
          >
            <PhoneCall className="h-5 w-5" />
            Call Now
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}