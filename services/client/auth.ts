import apiClient from "@/lib/axios";
import type { RegisterInput } from "@/lib/validations/auth";

// ─── Types ────────────────────────────────────────────────────────────────

export interface RegisterPayload
  extends Omit<RegisterInput, "confirmPassword" | "agreeToTerms"> {}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    userId: string;
    email: string;
    phoneNumber: string;
    verificationRequired: boolean;
  };
}

// ─── Auth API ─────────────────────────────────────────────────────────────

/**
 * Registers a new user account.
 *
 * @param payload - Registration form data (excludes `confirmPassword` and `agreeToTerms`).
 * @returns The server response, including the user ID and whether verification is required.
 */
export async function registerUser(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const { data } = await apiClient.post<RegisterResponse>(
    "/auth/register",
    payload
  );
  return data;
}
