export const SITE_URL = "https://liliveterinaryhospital.com";
export const SITE_NAME = "Lili Veterinary Hospital";
export const DEFAULT_TITLE =
  "Veterinarian in San Antonio, TX | Lili Veterinary Hospital";
export const DEFAULT_DESCRIPTION =
  "Lili Veterinary Hospital provides compassionate, modern veterinary care for dogs and cats in San Antonio. Book an appointment or call our team today.";
export const DEFAULT_OG_IMAGE_PATH = "/og/lilivet-og.png";
export const DEFAULT_OG_IMAGE_URL = `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`;
export const CLINIC_PHONE_DISPLAY = "210-257-8496";
export const CLINIC_PHONE_E164 = "+1-210-257-8496";
export const CLINIC_ADDRESS = {
  streetAddress: "20210 Stone Oak Pkwy #301",
  addressLocality: "San Antonio",
  addressRegion: "TX",
  postalCode: "78258",
  addressCountry: "US",
};
export const CLINIC_HOURS = [
  {
    dayOfWeek: [
      "https://schema.org/Monday",
      "https://schema.org/Tuesday",
      "https://schema.org/Wednesday",
      "https://schema.org/Thursday",
      "https://schema.org/Friday",
    ],
    opens: "07:30",
    closes: "19:00",
  },
  {
    dayOfWeek: "https://schema.org/Saturday",
    opens: "08:00",
    closes: "16:00",
  },
];

export function buildCanonicalUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? SITE_URL : `${SITE_URL}${normalizedPath}`;
}

export const VETERINARY_CARE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: SITE_NAME,
  url: SITE_URL,
  telephone: CLINIC_PHONE_E164,
  logo: `${SITE_URL}/logo.svg`,
  image: DEFAULT_OG_IMAGE_URL,
  address: {
    "@type": "PostalAddress",
    ...CLINIC_ADDRESS,
  },
  openingHoursSpecification: CLINIC_HOURS.map((hours) => ({
    "@type": "OpeningHoursSpecification",
    ...hours,
  })),
};

