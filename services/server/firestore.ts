// ── Job Data Types ─────────────────────────────────────
export interface JobData {
  jobTitle: string;
  description: string;
  role: string;
  startDate: string;
  endDate: string;
  hustlersNeeded: number;
  location?: string;
  status?: string;
  createdAt?: string;
  [key: string]: any;
}

// ── Fetch a Job Document by jobId ──────────────────────
import { getFirestore, doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";
export async function getJobDocument(
  jobId: string
): Promise<{ success: boolean; data: JobData | null; message?: string }> {
  try {
    const snapshot = await getDoc(doc(db, "jobs", jobId));
    if (!snapshot.exists()) {
      return { success: false, data: null, message: "Job not found" };
    }
    return { success: true, data: snapshot.data() as JobData };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error.message || "Failed to fetch job",
    };
  }
}
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import firebaseApp from "./firebase";

const db = getFirestore(firebaseApp);

export interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  referralCode?: string;
  photoURL?: string;
  createdAt: Date;
}

export async function createUserDocument(
  userId: string,
  userData: UserData
): Promise<{ success: boolean; message: string }> {
  try {
    await setDoc(doc(db, "users", userId), {
      ...userData,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "User profile created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to create user profile",
    };
  }
}

export async function getUserDocument(
  userId: string
): Promise<{ success: boolean; data: UserData | null; message?: string }> {
  try {
    const snapshot = await getDoc(doc(db, "users", userId));
    if (!snapshot.exists()) {
      return { success: false, data: null, message: "User not found" };
    }
    return { success: true, data: snapshot.data() as UserData };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error.message || "Failed to fetch user profile",
    };
  }
}
