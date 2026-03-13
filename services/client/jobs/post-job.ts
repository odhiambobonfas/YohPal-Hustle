/**
 * services/client/jobs/post-job.ts
 * ─────────────────────────────────────────────────────────
 * Client-side service for posting a job.
 * Interacts with the createJob Server Action.
 * ─────────────────────────────────────────────────────────
 */

import { createJob } from "@/actions/jobs";
import type { PostJobPayload } from "@/types/actions/hustle.types";

export async function submitPostJob(payload: PostJobPayload) {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    
    if (!token) {
      throw new Error("Authentication required to post a job.");
    }

    // We call the updated Server Action with the payload and token
    const result = await createJob(payload, token);
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to submit job",
    };
  }
}
