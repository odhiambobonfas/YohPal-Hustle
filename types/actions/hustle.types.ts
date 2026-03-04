/**
 * types/actions/hustle.types.ts
 * ─────────────────────────────────────────────────────────
 * TypeScript types for the Hustle Categories & Job Posting feature.
 *
 * Endpoints used:
 *   POST /client/post_job
 *   GET  /client/jobs/{clientId}
 * ─────────────────────────────────────────────────────────
 */

// ── Job Posting ──────────────────────────────────────────
export interface PostJobPayload {
  /** Display title of the job */
  jobTitle: string;
  /** Detailed description of what the job entails */
  description: string;
  /** The specific role selected from the category (e.g. "Poultry farmer") */
  role: string;
  /** ISO datetime string — when the job starts */
  startDate: string;
  /** ISO datetime string — when the job ends */
  endDate: string;
  /** How many hustlers the client needs */
  hustlersNeeded: number;
  /** Optional physical location / address */
  location?: string;
}

export interface PostJobResponse {
  jobId: string;
  status: "pending" | "active" | "cancelled";
  createdAt: string; // ISO string
}

// ── Category & Role types (for shared usage) ─────────────
export interface HustleCategory {
  id: number;
  name: string;
  subtitle: string;
  icon: string;
  accent: string;
  tag: string;
}
