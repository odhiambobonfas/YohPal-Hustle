/**
 * services/client/view-map.ts
 * ─────────────────────────────────────────────────────────
 * Client-side API calls for the Job Location / View Map feature.
 * All functions read NEXT_PUBLIC_API_BASE_URL from .env via lib/api.ts
 *
 * Endpoints used:
 *   GET  /client/job_location/{jobId}
 *   POST /client/job_location
 *   DEL  /client/job_location/{jobId}
 * ─────────────────────────────────────────────────────────
 */

import { apiFetch } from "@/lib/api";
import type {
  GetJobLocationResponse,
  SaveJobLocationPayload,
  SaveJobLocationResponse,
} from "@/types/actions/view-map.types";

// ── Fetch a job's location ─────────────────────────────────
/**
 * Retrieves saved location data for the given job from the API.
 * Falls back to the Firestore layer if the API proxies to Firestore.
 */
export async function fetchJobLocation(
  jobId: string,
  token: string
): Promise<GetJobLocationResponse> {
  return apiFetch<GetJobLocationResponse>(
    `/client/job_location/${jobId}`,
    { method: "GET" },
    token
  );
}

// ── Save / update a job's location ────────────────────────
/**
 * Persists the job's coordinates and address via the API.
 * Called right after a job is submitted if the user has shared location.
 */
export async function submitJobLocation(
  payload: SaveJobLocationPayload,
  token: string
): Promise<SaveJobLocationResponse> {
  return apiFetch<SaveJobLocationResponse>(
    "/client/job_location",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );
}

// ── Remove a job's location ────────────────────────────────
/**
 * Deletes the stored location for the given job.
 * Used when a job is cancelled or the client revokes location data.
 */
export async function removeJobLocation(
  jobId: string,
  token: string
): Promise<{ success: boolean; message: string }> {
  return apiFetch<{ success: boolean; message: string }>(
    `/client/job_location/${jobId}`,
    { method: "DELETE" },
    token
  );
}
