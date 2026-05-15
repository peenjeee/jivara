import axios from "axios";

type ApiErrorLike = {
  response?: {
    status?: number;
    data?: {
      message?: unknown;
    };
  };
};

const isAxiosError = (error: unknown): error is ApiErrorLike => typeof axios.isAxiosError === "function"
  ? axios.isAxiosError(error)
  : Boolean(error && typeof error === "object" && "response" in error);

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (!isAxiosError(error)) return fallback;

  if (error.response?.status === 429) {
    return typeof error.response.data?.message === "string"
      ? error.response.data.message
      : "Terlalu banyak permintaan. Tunggu beberapa saat lalu coba lagi.";
  }

  return typeof error.response?.data?.message === "string"
    ? error.response.data.message
    : fallback;
};

export const isRateLimitError = (error: unknown) => isAxiosError(error) && error.response?.status === 429;
