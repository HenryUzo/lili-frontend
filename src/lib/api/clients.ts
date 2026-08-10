import axios from "axios";

const rawBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.trim() || "https://lilivet.onrender.com";
const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, "");
const apiBaseUrl = normalizedBaseUrl.endsWith("/api")
  ? normalizedBaseUrl
  : `${normalizedBaseUrl}/api`;

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export type PetCareNewsletterPetPreference = "DOG" | "CAT" | "BOTH";

export type PetCareNewsletterSubscriptionRequest = {
  email: string;
  petPreference: PetCareNewsletterPetPreference;
  consent: true;
  website?: string;
};

export type PetCareNewsletterSubscriptionResponse = {
  success: true;
  status: "confirmation_required";
  message: string;
};

api.interceptors.request.use((config) => {
  const sessionToken = sessionStorage.getItem("appointmentDraftSessionToken");

  if (sessionToken) {
    config.headers["x-session-token"] = sessionToken;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.error?.message ||
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";

    return Promise.reject({
      ...error,
      message,
    });
  }
);

export async function subscribeToPetCareNewsletter(
  input: PetCareNewsletterSubscriptionRequest
) {
  const response = await api.post<PetCareNewsletterSubscriptionResponse>(
    "/pet-care/newsletter-subscriptions",
    {
      email: input.email,
      petPreference: input.petPreference,
      consent: input.consent,
      source: "pet-care-library",
      website: input.website ?? ""
    }
  );

  return response.data;
}

export async function getPublishedPetCareArticles() {
  const response = await api.get<{ items: unknown[] }>("/pet-care/articles");
  return response.data.items;
}

export type PetCarePreviewResponse = {
  article: {
    title: string;
    excerpt: string;
    summary: string;
    categoryLabel: string;
    readingTimeMinutes: number;
    heroImageUrl?: string | null;
    heroImageAlt: string;
    sections: Array<{
      id: string;
      title: string;
      type?: "CONTENT" | "IMAGE";
      content: string[];
      bullets?: string[];
      imageUrl?: string | null;
      imageAlt?: string | null;
      caption?: string | null;
    }>;
    warningCallout?: string | null;
    keyTakeaways: string[];
    monitorAtHome: string[];
    faqs: Array<{ question: string; answer: string }>;
    references: Array<{ label: string; url?: string | null }>;
    vetQuote?: string | null;
    reviewer?: { name: string; credentials: string; role: string } | null;
    status: string;
  };
  comments: Array<{ id: string; authorName: string; comment: string; createdAt: string }>;
  shareType: "COMMENT" | "REVIEWER";
  expiresAt: string;
  canApprove: boolean;
};

export async function getPetCarePreview(token: string) {
  return (await api.get<PetCarePreviewResponse>(`/pet-care/previews/${token}`)).data;
}

export async function addPetCarePreviewComment(token: string, authorName: string, comment: string) {
  return (await api.post(`/pet-care/previews/${token}/comments`, { authorName, comment })).data;
}

export async function approvePetCarePreview(token: string) {
  return (await api.post(`/pet-care/previews/${token}/approve`)).data;
}

export async function updatePetCarePreviewReviewerQuote(token: string, quote: string) {
  return (await api.patch(`/pet-care/previews/${token}/reviewer-quote`, { quote })).data;
}
