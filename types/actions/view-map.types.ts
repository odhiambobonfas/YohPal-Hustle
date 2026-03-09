/**
 * types/actions/view-map.types.ts
 * ─────────────────────────────────────────────────────────
 * TypeScript types for the View Map / Job Location feature.
 *
 * Endpoints used:
 *   GET  /client/job_location/{jobId}
 *   POST /client/job_location
 *   DEL  /client/job_location/{jobId}
 * ─────────────────────────────────────────────────────────
 */

// ── Job Location Data ──────────────────────────────────────
export interface JobLocationData {
  /** The job this location belongs to */
  jobId: string;
  /** WGS-84 latitude */
  latitude: number;
  /** WGS-84 longitude */
  longitude: number;
  /** Human-readable address string */
  address: string;
  /** City name (optional) */
  city?: string;
  /** ISO 3166-1 alpha-2 country code or full name (optional) */
  country?: string;
  /** ISO timestamp of last update */
  updatedAt?: string;
}

// ── API responses ──────────────────────────────────────────
export interface GetJobLocationResponse {
  success: boolean;
  data?: JobLocationData;
  message: string;
}

export interface SaveJobLocationResponse {
  success: boolean;
  message: string;
}

// ── Payloads ───────────────────────────────────────────────
export interface SaveJobLocationPayload {
  jobId: string;
  latitude: number;
  longitude: number;
  address: string;
  city?: string;
  country?: string;
}
