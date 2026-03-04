/**
 * types/actions/dashboard.types.ts
 * ─────────────────────────────────────────────────────────
 * TypeScript types for dashboard stats and job requests.
 * Matches the shapes returned by:
 *   GET /statistics/dashboard/hustler/{hustlerId}
 *   GET /hustler/job_requests/{hustlerId}
 * ─────────────────────────────────────────────────────────
 */

// ── Dashboard Stats ─────────────────────────────────────
export interface DashboardStats {
  hustlerId: string;
  totalEarnings: number;
  jobsDone: number;
  activeJobs: number;
  rating: number;
  reviewCount: number;
  pendingRequests: number;
  currency: string; // e.g. "KES"
  monthlyChange: number; // percentage e.g. 12 = +12%
}

// ── Job Request ──────────────────────────────────────────
export interface JobRequest {
  jobId: string;
  jobName: string;
  description: string;
  clientName: string;
  clientAvatar?: string;
  skill: string;
  amount: number;
  currency: string;
  startTime: string; // ISO date string
  endTime: string;
  location: string;
  jobSite?: {
    latitude?: number;
    longitude?: number;
    address: string;
  };
  status: "pending" | "accepted" | "rejected" | "completed";
  createdAt: string;
}

// ── Earnings Chart Data ──────────────────────────────────
export interface EarningsDataPoint {
  label: string;
  amount: number;
}

export interface EarningsOverview {
  weekly: EarningsDataPoint[];
  monthly: EarningsDataPoint[];
  total: number;
}

// ── Generic action response ──────────────────────────────
export interface ActionResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
