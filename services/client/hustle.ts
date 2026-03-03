/**
 * services/client/hustle.ts
 * ─────────────────────────────────────────────────────────
 * Client-side API calls for the Hustle Categories & Job Posting feature.
 * All functions read NEXT_PUBLIC_API_BASE_URL from .env via lib/api.ts
 *
 * Endpoints used:
 *   POST /client/post_job
 *   GET  /client/jobs/{clientId}
 * ─────────────────────────────────────────────────────────
 */

import { apiFetch } from "@/lib/api";
import type {
  PostJobPayload,
  PostJobResponse,
} from "@/types/actions/hustle.types";

// ── Post a new job ────────────────────────────────────────
export async function submitPostJob(
  payload: PostJobPayload,
  token: string
): Promise<PostJobResponse> {
  return apiFetch<PostJobResponse>(
    "/client/post_job",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
    token
  );
}

// ── Fetch all jobs posted by a client ─────────────────────
export async function getClientJobs(
  clientId: string,
  token: string
): Promise<PostJobResponse[]> {
  return apiFetch<PostJobResponse[]>(
    `/client/jobs/${clientId}`,
    { method: "GET" },
    token
  );
}

// ── Cancel a posted job ───────────────────────────────────
export async function cancelJob(
  jobId: string,
  token: string
): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(
    `/client/cancel_job`,
    {
      method: "PUT",
      body: JSON.stringify({ jobId }),
    },
    token
  );
}
