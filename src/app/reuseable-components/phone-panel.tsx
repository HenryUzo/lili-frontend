import { Clock3, PhoneCall } from "lucide-react";
import React from "react";
import PhoneCallDialog from "./call-modal";

const HOURS = [
  { day: "Monday – Friday", time: "7:30 AM - 7:00 PM" },
  { day: "Saturday", time: "8:00 AM - 4:00 PM" },
  { day: "Sunday", time: "Closed", alert: true },
];

const PhonePanel = () => {
  return (
    <div className="rounded-[32px] border border-[#952D2D33] max-h-[578.75px] bg-[#FCF4F4] px-8 py-6">
      <h3 className="font-founders text-[#1B1C19] text-[20px] font-normal leading-[28px] tracking-[0] md:text-[22px] md:leading-[30px] lg:text-[24px] lg:leading-[32px]">
        Prefer a Phone Call?
      </h3>

      <p className="mt-4 manrope text-[12px] font-normal leading-[18px] tracking-[0] md:text-[13px] md:leading-[20px] lg:text-[14px] lg:leading-[22.75px]">
        Our patient coordinators are available to help you schedule immediately
        during business hours.
      </p>

      <div className="mt-8 rounded-[20px] border border-[#ECE7E3] bg-white px-5 py-3">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFB8BB] text-[#FF3037]">
            <PhoneCall className="h-4 w-4" />
          </div>

          <div>
            <p className="manrope text-[10px] font-bold uppercase tracking-[0.25em] text-[#62181899]">
              Clinic Hot Line
            </p>
            <p className="mt-1 manrope text-[20px] font-bold leading-7 text-[#1B1C19]">
              (210) 257-8496
            </p>
          </div>
        </div>
      </div>

      <PhoneCallDialog
        trigger={
          <button
            type="button"
            className="mt-6 w-full rounded-full bg-[#ED1C24] px-6 py-3 font-manrope text-[18px] font-semibold leading-7 text-white shadow-[0_10px_24px_rgba(255,24,32,0.24)]"
          >
            Call Now
          </button>
        }
      />
      <div className="mt-10">
        <div className="flex items-center gap-3">
          <Clock3 className="h-5 w-5 text-[#4B6D5C]" />
          <h4 className="font-manrope text-[16px] font-bold leading-7 text-[#1B1C19]">
            Clinic Operating Hours
          </h4>
        </div>

        <div className="mt-5 space-y-3">
          {HOURS.map((item) => (
            <div
              key={item.day}
              className="flex items-center justify-between border-b border-[#C1C8C233] pb-3"
            >
              <span className="manrope text-[14px] font-medium leading-6 text-[#414844]">
                {item.day}
              </span>
              <span
                className={[
                  "manrope text-[16px] font-bold  leading-6",
                  item.alert ? "text-[#ED1C24]" : "text-[#414844]",
                ].join(" ")}
              >
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhonePanel;
