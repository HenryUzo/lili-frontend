import { ShieldCheck } from "lucide-react";

export function MedicalDisclaimer() {
  return (
    <aside className="rounded-[24px] border border-[#D8E8CE] bg-[#FAFCF6] p-5">
      <div className="flex gap-3">
        <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#006838]" aria-hidden="true" />
        <div>
          <h2 className="text-lg font-bold text-[#073D2A]">Medical disclaimer</h2>
          <p className="mt-2 text-sm leading-6 text-[#53635A]">
            This article is for general education and does not replace a veterinary
            exam, diagnosis, or treatment plan. If you are concerned about your pet,
            contact Lili Veterinary Hospital or an emergency animal hospital.
          </p>
        </div>
      </div>
    </aside>
  );
}
