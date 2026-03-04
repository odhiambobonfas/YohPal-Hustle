/**
 * services/client/dashboard.ts
 * ─────────────────────────────────────────────────────────
 * Client-side API calls for the Dashboard.
 * All functions read NEXT_PUBLIC_API_BASE_URL from .env via lib/api.ts
 *
 * Endpoints used:
 *   GET /statistics/dashboard/hustler/{hustlerId}
 *   GET /hustler/job_requests/{hustlerId}
 *   PUT /hustler/accept_request
 *   PUT /hustler/reject_request
 *   POST /hustler/availability/update
 * ─────────────────────────────────────────────────────────
 */

import { apiFetch } from "@/lib/api";
import type {
  DashboardStats,
  JobRequest,
  ActionResponse,
} from "@/types/actions/dashboard.types";

// ── Fetch hustler dashboard statistics ──────────────────
export async function getHustlerDashboardStats(
  hustlerId: string,
  token: string
): Promise<DashboardStats> {
  return apiFetch<DashboardStats>(
    `/statistics/dashboard/hustler/${hustlerId}`,
    { method: "GET" },
    token
  );
}

// ── Fetch job requests for a hustler ────────────────────
export async function getJobRequests(
  hustlerId: string,
  token: string
): Promise<JobRequest[]> {
  return apiFetch<JobRequest[]>(
    `/hustler/job_requests/${hustlerId}`,
    { method: "GET" },
    token
  );
}

// ── Accept a job request ─────────────────────────────────
export async function acceptJobRequest(
  jobId: string,
  hustlerId: string,
  token: string
): Promise<ActionResponse> {
  return apiFetch<ActionResponse>(
    `/hustler/accept_request`,
    {
      method: "PUT",
      body: JSON.stringify({ jobId, hustlerId }),
    },
    token
  );
}

// ── Reject a job request ─────────────────────────────────
export async function rejectJobRequest(
  jobId: string,
  hustlerId: string,
  token: string
): Promise<ActionResponse> {
  return apiFetch<ActionResponse>(
    `/hustler/reject_request`,
    {
      method: "PUT",
      body: JSON.stringify({ jobId, hustlerId }),
    },
    token
  );
}

// ── Update availability ───────────────────────────────────
export async function updateAvailability(
  hustlerId: string,
  type: "full" | "partial" | "unavailable",
  days: string[],
  token: string
): Promise<ActionResponse> {
  return apiFetch<ActionResponse>(
    `/hustler/availability/update`,
    {
      method: "POST",
      body: JSON.stringify({ hustlerId, type, days }),
    },
    token
  );
}
