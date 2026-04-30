import { useMemo, useState } from "react";
import type {
  ChangeEventHandler,
  FormEvent,
  HTMLInputTypeAttribute,
} from "react";
import images from "../../assests/images";
import { Sex, Species } from "../../../feature/new-registration/api";
import { useCreateNewPatient } from "../../../feature/new-registration/hooks";
import { toast } from "sonner";

const inputBase =
  "w-full bg-[#EDF7E7] rounded-full px-4 py-3 text-[#1a3a1f] placeholder-transparent outline-none border border-transparent focus:border-[#3a7d44] focus:ring-2 focus:ring-[#3a7d44]/20 transition-all duration-200 text-sm font-medium";

const selectBase =
  "w-full bg-[#EDF7EA] rounded-full px-4 py-3 text-[#1a3a1f] outline-none border border-transparent focus:border-[#3a7d44] focus:ring-2 focus:ring-[#3a7d44]/20 transition-all duration-200 text-sm font-medium appearance-none cursor-pointer";

const labelBase =
  "block text-xs font-bold tracking-widest text-[#717973] font-plusjakart uppercase mb-2";

interface SelectOption {
  value: string;
  label: string;
}

interface CustomInputProps {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  required?: boolean;
}

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options: SelectOption[];
  className?: string;
  required?: boolean;
}

interface CustomTextareaProps {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
}

interface CustomCheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

interface SectionHeaderProps {
  icon: string;
  title: string;
}

interface CustomFileUploadProps {
  label: string;
  files: File[];
  onChange: (files: File[]) => void;
  className?: string;
  multiple?: boolean;
}

type FormState = {
  owner: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
  pet: {
    petName: string;
    species: Species;
    breed: string;
    age: string;
    sex: Sex;
    weightLbs: string;
    spayedNeutered: boolean;
    currentMedications: string;
    existingConditions: string;
  };
  visit: {
    reasonForVisit: string;
    isUrgent: boolean;
    preferredDateTime: string;
    timezone: string;
    previousVetClinic: string;
    additionalNotes: string;
    consentToElectronicComms: boolean;
  };
  files: File[];
};

const getInitialFormState = (): FormState => ({
  owner: {
    fullName: "",
    email: "",
    phoneNumber: "",
  },
  pet: {
    petName: "",
    species: "DOG",
    breed: "",
    age: "",
    sex: "MALE",
    weightLbs: "",
    spayedNeutered: false,
    currentMedications: "",
    existingConditions: "",
  },
  visit: {
    reasonForVisit: "",
    isUrgent: false,
    preferredDateTime: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Africa/Lagos",
    previousVetClinic: "",
    additionalNotes: "",
    consentToElectronicComms: false,
  },
  files: [],
});

const SPECIES_OPTIONS: SelectOption[] = [
  { value: "DOG", label: "Dog" },
  { value: "CAT", label: "Cat" },
];

const SEX_OPTIONS: SelectOption[] = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

const IS_URGENT_OPTIONS: SelectOption[] = [
  { value: "false", label: "No, routine care" },
  { value: "true", label: "Yes, quite urgent" },
];

function CustomFileUpload({
  label,
  files,
  onChange,
  className = "",
  multiple = true,
}: CustomFileUploadProps) {
  const inputId = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col ${className}`}>
      <label className={labelBase}>{label}</label>

      <label
        htmlFor={inputId}
        className="w-full min-h-[54px] rounded-full border border-dashed border-[#AEB8AE] bg-[#EEF4E8] px-4 flex items-center gap-3 cursor-pointer transition-all duration-200 hover:border-[#3a7d44] hover:bg-[#E8F3E1]"
      >
        <span className="flex h-7 w-7 items-center justify-center shrink-0 rounded-md border border-[#BFC8BC] text-[#6F786F]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 10.667V3.333"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M5.333 6L8 3.333L10.667 6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.333 12.667H12.667"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <span className="truncate text-[15px] font-medium text-[#7B8379]">
          {files.length > 0
            ? files.length === 1
              ? files[0].name
              : `${files.length} files selected`
            : "Click to select files"}
        </span>
      </label>

      <input
        id={inputId}
        type="file"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files ?? []);
          onChange(selectedFiles);
        }}
      />
    </div>
  );
}

function CustomInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  required = false,
}: CustomInputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className={labelBase}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? label}
        required={required}
        className={inputBase}
      />
    </div>
  );
}

function CustomSelect({
  label,
  value,
  onChange,
  options,
  className = "",
  required = false,
}: CustomSelectProps) {
  return (
    <div className={`flex flex-col relative ${className}`}>
      <label className={labelBase}>{label}</label>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          required={required}
          className={selectBase}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1L6 6L11 1"
              stroke="#3a7d44"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CustomTextarea({
  label,
  value,
  onChange,
  className = "",
}: CustomTextareaProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className={labelBase}>{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={onChange}
        className="w-full bg-[#EDF7EA] rounded-2xl px-4 py-3 text-[#1a3a1f] placeholder-transparent outline-none border border-transparent focus:border-[#3a7d44] focus:ring-2 focus:ring-[#3a7d44]/20 transition-all duration-200 text-sm font-medium resize-none"
      />
    </div>
  );
}

function CustomCheckbox({ label, checked, onChange }: CustomCheckboxProps) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 cursor-pointer select-none group mt-auto pb-1"
    >
      <span
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${
          checked
            ? "bg-[#1a3a1f] border-[#1a3a1f]"
            : "border-[#aac9b0] bg-white group-hover:border-[#3a7d44]"
        }`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      {label && <span className="text-sm font-medium text-[#3a5c40]">{label}</span>}
    </button>
  );
}

function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className="mb-4 pb-2 border-[#DBE5D6] border-b">
      <div className="flex items-center gap-3 mb-3">
        <div>
          <img src={icon} alt="" />
        </div>

        <h2 className="text-2xl font-bold text-[#1a3a1f] font-space">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default function RegisterPetForm() {
  const [form, setForm] = useState<FormState>(() => getInitialFormState());

  const createNewPatientMutation = useCreateNewPatient();

  const isSubmitting = createNewPatientMutation.isPending;

  const canSubmit = useMemo(() => {
    return (
      form.owner.fullName.trim() &&
      form.owner.email.trim() &&
      form.owner.phoneNumber.trim() &&
      form.pet.petName.trim() &&
      form.pet.breed.trim() &&
      form.pet.age.trim() &&
      form.pet.weightLbs.trim() &&
      form.visit.reasonForVisit.trim() &&
      form.visit.preferredDateTime.trim() &&
      form.visit.consentToElectronicComms
    );
  }, [form]);

  const updateOwner = (
    field: keyof FormState["owner"],
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      owner: {
        ...prev.owner,
        [field]: value,
      },
    }));
  };

  const updatePet = (
    field: keyof FormState["pet"],
    value: string | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      pet: {
        ...prev.pet,
        [field]: value,
      },
    }));
  };

  const updateVisit = (
    field: keyof FormState["visit"],
    value: string | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      visit: {
        ...prev.visit,
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const weightLbs = Number(form.pet.weightLbs);

  if (Number.isNaN(weightLbs) || weightLbs <= 0) {
    toast.error("Please enter a valid pet weight.");
    return;
  }

  if (!form.visit.consentToElectronicComms) {
    toast.error("Please accept the communication consent before submitting.");
    return;
  }

  const payload = {
    owner: {
      fullName: form.owner.fullName.trim(),
      email: form.owner.email.trim(),
      phoneNumber: form.owner.phoneNumber.trim(),
    },

    visit: {
      reasonForVisit: form.visit.reasonForVisit.trim(),
      isUrgent: form.visit.isUrgent,
      preferredDateTime: new Date(form.visit.preferredDateTime).toISOString(),
      timezone: form.visit.timezone || "Africa/Lagos",
      previousVetClinic: form.visit.previousVetClinic.trim(),
      consentToElectronicComms: form.visit.consentToElectronicComms,
    },

    pet: {
      petName: form.pet.petName.trim(),
      species: form.pet.species,
      breed: form.pet.breed.trim(),
      age: form.pet.age.trim(),
      sex: form.pet.sex,
      weightLbs,
      spayedNeutered: form.pet.spayedNeutered,
      currentMedications: form.pet.currentMedications.trim(),
      existingConditions: form.pet.existingConditions.trim(),
    },

    uploadedFileIds: [],
  };

  createNewPatientMutation.mutate(payload, {
    onSuccess: () => {
      setForm(getInitialFormState());
    },
  });
};

  const handleClear = () => {
    setForm(getInitialFormState());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:w-[811px] w-full rounded-[48px] overflow-hidden shadow-2xl relative z-[1000]"
    >
      <div className="bg-[#012D1D] px-8 py-7 w-full lg:h-[168px] h-[126px] flex items-center justify-between">
        <div>
          <h1 className="lg:text-[36px] text-2xl font-bold font-space text-white leading-tight mb-1">
            Register Your Pet
          </h1>

          <p className="text-[#C1ECD4] manrope text-base font-light">
            Complete this form to help us prepare for your pet&apos;s first visit.
          </p>
        </div>

        <div className="lg:block hidden">
          <img
            src={images.writeForm}
            alt=""
            className="mix-blend-overlay opacity-30"
          />
        </div>
      </div>

      <div className="bg-white w-full lg:max-h-[507px] max-h-full overflow-y-auto px-8 py-7 space-y-8 scrollbar-thin">
        <div>
          <SectionHeader icon={images?.personIcon} title="Owner Information" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
            <CustomInput
              label="Full Name"
              value={form.owner.fullName}
              onChange={(e) => updateOwner("fullName", e.target.value)}
              required
            />

            <CustomInput
              label="Email Address"
              type="email"
              value={form.owner.email}
              onChange={(e) => updateOwner("email", e.target.value)}
              required
            />

            <CustomInput
              label="Phone Number"
              type="tel"
              value={form.owner.phoneNumber}
              onChange={(e) => updateOwner("phoneNumber", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <SectionHeader icon={images.pawIcon} title="Pet Information" />

          <div className="space-y-8 mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_1.5fr_1.5fr] gap-6">
              <CustomInput
                label="Pet Name"
                value={form.pet.petName}
                onChange={(e) => updatePet("petName", e.target.value)}
                required
              />

              <CustomSelect
                label="Species"
                value={form.pet.species}
                onChange={(e) => updatePet("species", e.target.value as Species)}
                options={SPECIES_OPTIONS}
                required
              />

              <CustomInput
                label="Breed"
                value={form.pet.breed}
                onChange={(e) => updatePet("breed", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-[1fr_1.5fr_1.5fr_auto] gap-4 items-end">
              <CustomInput
                label="Age"
                value={form.pet.age}
                onChange={(e) => updatePet("age", e.target.value)}
                placeholder="e.g. 2 years"
                required
              />

              <CustomSelect
                label="Sex"
                value={form.pet.sex}
                onChange={(e) => updatePet("sex", e.target.value as Sex)}
                options={SEX_OPTIONS}
                required
              />

              <CustomInput
                label="Weight (lbs)"
                type="number"
                value={form.pet.weightLbs}
                onChange={(e) => updatePet("weightLbs", e.target.value)}
                required
              />

              <CustomCheckbox
                label="Spayed/Neutered"
                checked={form.pet.spayedNeutered}
                onChange={(checked) => updatePet("spayedNeutered", checked)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomTextarea
                label="Current Medications"
                value={form.pet.currentMedications}
                onChange={(e) =>
                  updatePet("currentMedications", e.target.value)
                }
              />

              <CustomTextarea
                label="Existing Conditions"
                value={form.pet.existingConditions}
                onChange={(e) =>
                  updatePet("existingConditions", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div>
          <SectionHeader icon={images.vist} title="Visit Details" />

          <div className="space-y-8 mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-[2fr_1.2fr] gap-4">
              <CustomInput
                label="Reason for Visit"
                value={form.visit.reasonForVisit}
                onChange={(e) =>
                  updateVisit("reasonForVisit", e.target.value)
                }
                required
              />

              <CustomSelect
                label="Is this urgent?"
                value={String(form.visit.isUrgent)}
                onChange={(e) =>
                  updateVisit("isUrgent", e.target.value === "true")
                }
                options={IS_URGENT_OPTIONS}
                required
              />
            </div>

            <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
              <CustomInput
                label="Preferred Date/Time"
                type="datetime-local"
                value={form.visit.preferredDateTime}
                onChange={(e) =>
                  updateVisit("preferredDateTime", e.target.value)
                }
                required
              />

              <CustomInput
                label="Previous Vet Clinic"
                value={form.visit.previousVetClinic}
                onChange={(e) =>
                  updateVisit("previousVetClinic", e.target.value)
                }
              />

              <CustomFileUpload
                label="Upload Records (Optional)"
                files={form.files}
                onChange={(files) =>
                  setForm((prev) => ({
                    ...prev,
                    files,
                  }))
                }
              />
            </div>

            <CustomTextarea
              label="Additional Notes"
              value={form.visit.additionalNotes}
              onChange={(e) =>
                updateVisit("additionalNotes", e.target.value)
              }
            />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CustomCheckbox
            checked={form.visit.consentToElectronicComms}
            onChange={(checked) =>
              updateVisit("consentToElectronicComms", checked)
            }
          />

          <p className="text-sm manrope text-[#7B8379]">
            I consent to receiving electronic communications from Lili Vet +
            Urgent Care regarding my pet&apos;s care and appointments.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-1">
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="flex-1 bg-[#1a3a1f] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-full py-3.5 text-sm font-semibold tracking-wide hover:bg-[#2a5a2f] active:scale-[0.98] transition-all duration-200 shadow-lg"
          >
            {isSubmitting ? "Submitting..." : "Register Pet"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={isSubmitting}
            className="sm:w-36 border border-[#dceadc] text-[#3a5c40] rounded-full py-3.5 text-sm font-semibold tracking-wide hover:bg-[#EDF7EA] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Clear Form
          </button>
        </div>
      </div>
    </form>
  );
}
