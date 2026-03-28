/**
 * lib/api.ts
 * ─────────────────────────────────────────────────────────
 * Central HTTP fetch utility.
 * Base URL is read from NEXT_PUBLIC_API_BASE_URL in .env
 * All authenticated calls pass: Authorization: Bearer {token}
 * ─────────────────────────────────────────────────────────
 */

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ProfileResponse } from "@/types/users";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://yohpal-hustler-apis-live.onrender.com";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

/**
 * Generic fetch wrapper.
 * @param endpoint - path starting with /  e.g. "/signin"
 * @param options  - standard RequestInit options
 * @param token    - optional JWT bearer token
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody?.message || `Request failed with status ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}

/**
 * Multipart/form-data fetch (for file uploads).
 * Does NOT set Content-Type header — browser sets it with boundary.
 */
export async function apiFetchForm<T>(
  endpoint: string,
  formData: FormData,
  token: string
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody?.message || `Request failed with status ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}

// Using the endpoints from the YohpalHustleApis

export function getUserProfile(uid: string): Promise<ProfileResponse> {
  // console.log("Fetching profile for UID:", uid);
  return apiFetch<ProfileResponse>(`/hustler/profile/${uid}`, {
    method: "GET",
  });
}
