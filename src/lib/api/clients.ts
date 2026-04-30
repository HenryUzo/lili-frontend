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
