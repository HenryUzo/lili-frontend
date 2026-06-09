import images from "../../assests/images";
import type { NewPatientReferralSource } from "../../../feature/new-registration/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";

type ReferralOption = {
  value: NewPatientReferralSource;
  label: string;
  image: string;
  accentClassName: string;
};

const REFERRAL_OPTIONS: ReferralOption[] = [
  {
    value: "PET_PARADISE",
    label: "Pet Paradise",
    image: images.cozyPet,
    accentClassName: "from-[#F7FBEA] to-[#EDF7E7]"
  },
  {
    value: "WEBSITE",
    label: "Website",
    image: images.computerBg,
    accentClassName: "from-[#EAF7F0] to-[#E7F5EC]"
  },
  {
    value: "GOOGLE",
    label: "Google",
    image: images.cutedogcat,
    accentClassName: "from-[#FFF7E6] to-[#FFF1D8]"
  },
  {
    value: "PET_BARN",
    label: "Pet barn",
    image: images.pet,
    accentClassName: "from-[#F5EEFF] to-[#F0E5FF]"
  },
  {
    value: "WELCOME_HOME_MAGAZINE",
    label: "Welcome home Magazine",
    image: images.blog,
    accentClassName: "from-[#EAF3FF] to-[#E4F0FF]"
  },
  {
    value: "REFERRED_BY_ANOTHER_VETERINARIAN",
    label: "Referred by another Veterinarian",
    image: images.doctorAndPatient,
    accentClassName: "from-[#EEF8F0] to-[#E3F2E8]"
  },
  {
    value: "REFERRED_BY_FRIEND_OR_FAMILY_MEMBER",
    label: "Referred by a friend or family member",
    image: images.happyDogs,
    accentClassName: "from-[#FFF4E8] to-[#FFECDD]"
  },
  {
    value: "OTHER",
    label: "Other",
    image: images.others,
    accentClassName: "from-[#FBEAF3] to-[#F8E3EF]"
  }
];

export function NewPatientReferralSourceModal({
  open,
  selectedSource,
  otherText,
  errorMessage,
  isSaving,
  onSelectSource,
  onOtherTextChange,
  onConfirm
}: {
  open: boolean;
  selectedSource: NewPatientReferralSource | null;
  otherText: string;
  errorMessage: string | null;
  isSaving: boolean;
  onSelectSource: (source: NewPatientReferralSource) => void;
  onOtherTextChange: (value: string) => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={() => undefined}>
      <DialogContent
        className="max-h-[92vh] overflow-y-auto rounded-[30px] border border-[#E1EADB] bg-[#FFFDF8] p-0 shadow-[0_24px_80px_rgba(19,41,24,0.18)] sm:max-w-[920px] [&>button]:hidden"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <div className="relative overflow-hidden rounded-[inherit] bg-[linear-gradient(180deg,#F8FFF4_0%,#FFFDF8_100%)] px-5 py-6 sm:px-8 sm:py-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 top-0 h-40 w-40 rounded-full bg-[#EAF7E0]/70 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 bottom-0 h-44 w-44 rounded-full bg-[#FFF1D9]/80 blur-3xl"
          />

          <DialogHeader className="relative text-center sm:text-left">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_rgba(18,52,28,0.08)] sm:mx-0">
              <img src={images.logoTwo} alt="" className="h-10 w-auto" />
            </div>
            <DialogTitle className="mt-4 font-founders text-[30px] font-medium leading-[1.02] text-[#12341C] sm:text-[38px]">
              How did you find out about Lili Vet?
            </DialogTitle>
            <DialogDescription className="mt-2 max-w-[620px] font-manrope text-[15px] font-medium leading-7 text-[#5D7063]">
              One quick question before we finish. This helps our team understand which community channels are working best.
            </DialogDescription>
          </DialogHeader>

          <div className="relative mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {REFERRAL_OPTIONS.map((option) => {
              const isSelected = selectedSource === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onSelectSource(option.value)}
                  className={`group relative flex min-h-[190px] flex-col overflow-hidden rounded-[24px] border p-4 text-left transition duration-200 ${
                    isSelected
                      ? "border-[#1D6A38] bg-white shadow-[0_16px_30px_rgba(16,45,28,0.12)]"
                      : "border-[#E4EDE0] bg-white/90 hover:-translate-y-0.5 hover:border-[#BCD5C2]"
                  }`}
                >
                  <div className={`absolute inset-x-0 top-0 h-[88px] bg-gradient-to-br ${option.accentClassName}`} />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-sm">
                        <span
                          className={`h-4 w-4 rounded-full border ${
                            isSelected ? "border-[#1D6A38] bg-[#1D6A38]" : "border-[#B7C5B3] bg-transparent"
                          }`}
                        />
                      </div>
                      <img
                        src={option.image}
                        alt=""
                        aria-hidden="true"
                        className="h-16 w-16 rounded-[18px] object-cover shadow-[0_10px_24px_rgba(22,45,26,0.12)]"
                      />
                    </div>
                    <div className="mt-auto pt-8">
                      <p className="font-founders text-[22px] font-medium leading-[1.05] text-[#12341C]">
                        {option.label}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedSource === "OTHER" ? (
            <div className="relative mt-5 rounded-[24px] border border-[#E4EDE0] bg-white p-4 shadow-[0_10px_20px_rgba(19,41,24,0.05)]">
              <label className="mb-2 block font-plusjakart text-xs font-bold uppercase tracking-[0.22em] text-[#6A766D]">
                Tell us more
              </label>
              <input
                value={otherText}
                onChange={(event) => onOtherTextChange(event.target.value)}
                maxLength={200}
                placeholder="Optional note"
                className="w-full rounded-[18px] border border-[#D6E3D4] bg-[#F8FFF5] px-4 py-3 font-manrope text-sm font-medium text-[#14351D] outline-none transition focus:border-[#3A7D44] focus:ring-2 focus:ring-[#3A7D44]/20"
              />
            </div>
          ) : null}

          {errorMessage ? (
            <div className="relative mt-5 rounded-[18px] border border-[#F3CFCF] bg-[#FFF2F2] px-4 py-3 font-manrope text-sm font-medium text-[#9F3535]">
              {errorMessage}
            </div>
          ) : null}

          <div className="relative mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-manrope text-sm font-medium text-[#728174]">
              Please choose one option so we can complete your submission.
            </p>
            <button
              type="button"
              onClick={onConfirm}
              disabled={!selectedSource || isSaving}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[#163C20] px-7 py-3 font-plusjakart text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#214A2B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Complete submission"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
