/**
 * services/server/view-map.ts
 * ─────────────────────────────────────────────────────────
 * Server-side Firestore functions for the Job Location / View Map feature.
 *
 * Firestore collection: "job_locations"
 * Document ID          : jobId
 *
 * Functions:
 *   saveJobLocation   – create or overwrite a job's location doc
 *   getJobLocation    – fetch a job's location doc
 *   deleteJobLocation – remove a job's location doc
 * ─────────────────────────────────────────────────────────
 */

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import firebaseApp from "./firebase";
import type {
  JobLocationData,
  SaveJobLocationPayload,
} from "@/types/actions/view-map.types";

const db = getFirestore(firebaseApp);
const COLLECTION = "job_locations";

// ── Save / update a job's location ────────────────────────
/**
 * Creates or overwrites the Firestore document for a job's location.
 * @param payload - location data including jobId and coordinates
 */
export async function saveJobLocation(
  payload: SaveJobLocationPayload
): Promise<{ success: boolean; message: string }> {
  try {
    await setDoc(doc(db, COLLECTION, payload.jobId), {
      ...payload,
      updatedAt: serverTimestamp(),
    });
    return { success: true, message: "Job location saved successfully" };
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Failed to save job location";
    return { success: false, message: msg };
  }
}

// ── Retrieve a job's location ──────────────────────────────
/**
 * Fetches the location document for the given jobId from Firestore.
 * @param jobId - the ID of the job whose location to fetch
 */
export async function getJobLocation(
  jobId: string
): Promise<{ success: boolean; data?: JobLocationData; message: string }> {
  try {
    const snap = await getDoc(doc(db, COLLECTION, jobId));

    if (!snap.exists()) {
      return {
        success: false,
        message: "No location data found for this job",
      };
    }

    const raw = snap.data();
    const data: JobLocationData = {
      jobId: raw.jobId ?? jobId,
      latitude: raw.latitude,
      longitude: raw.longitude,
      address: raw.address,
      city: raw.city,
      country: raw.country,
      updatedAt: raw.updatedAt?.toDate
        ? (raw.updatedAt.toDate() as Date).toISOString()
        : raw.updatedAt ?? undefined,
    };

    return { success: true, data, message: "Job location fetched successfully" };
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Failed to fetch job location";
    return { success: false, message: msg };
  }
}

// ── Delete a job's location ────────────────────────────────
/**
 * Permanently removes the location document for the given jobId.
 * @param jobId - the ID of the job whose location to remove
 */
export async function deleteJobLocation(
  jobId: string
): Promise<{ success: boolean; message: string }> {
  try {
    await deleteDoc(doc(db, COLLECTION, jobId));
    return { success: true, message: "Job location removed successfully" };
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : "Failed to delete job location";
    return { success: false, message: msg };
  }
}
