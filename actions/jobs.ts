"use server";

import { apiFetch } from "@/lib/api";
import type { PostJobPayload, PostJobResponse } from "@/types/actions/hustle.types";

export async function createJob(payload: PostJobPayload, token: string) {
  try {
    const result = await apiFetch<PostJobResponse>(
      "/client/post_job",
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
      token
    );
    return {
      success: true,
      data: result,
      message: "Job created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create job",
    };
  }
}
