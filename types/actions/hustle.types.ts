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
  ownerId: string;
  ownerName: string;
  jobDetails: {
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    hustlersCount: number;
    hustlers: string[];
    jobSite: {
      latitude: number;
      longitude: number;
    };
  };
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
