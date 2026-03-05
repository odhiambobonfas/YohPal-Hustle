import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import firebaseApp from "./firebase";

const db = getFirestore(firebaseApp);

export interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  referralCode?: string;
  createdAt: Date;
  // Extended profile fields
  bio?: string;
  photoURL?: string;
  skills?: string[];
  availabilityStatus?: "available" | "busy" | "offline";
  location?: string;
  totalEarnings?: number;
  completedJobs?: number;
  rating?: number;
  reviewCount?: number;
}

export type UpdateableUserData = Partial<Omit<UserData, "createdAt" | "email">>;

export async function createUserDocument(userId: string, userData: UserData): Promise<{ success: boolean; message: string }> {
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

export async function getUserDocument(userId: string): Promise<{ success: boolean; data?: UserData; message: string }> {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const raw = docSnap.data();
      // Firestore Timestamps → JS Date
      const data: UserData = {
        ...raw,
        createdAt: raw.createdAt?.toDate ? raw.createdAt.toDate() : new Date(raw.createdAt),
      } as UserData;
      return { success: true, data, message: "User profile fetched successfully" };
    }

    return { success: false, message: "User profile not found" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to fetch user profile" };
  }
}

export async function updateUserDocument(
  userId: string,
  updates: UpdateableUserData
): Promise<{ success: boolean; message: string }> {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, updates as Record<string, any>);
    return { success: true, message: "Profile updated successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update profile" };
  }
}

// ── Job document ─────────────────────────────────────────

/**
 * Shape of a job document stored in the `jobs` Firestore collection.
 * Mirrors JobDetailData in app/(yohpal)/myjobs/job-details.tsx.
 */
export interface JobDocumentData {
  title: string;
  client: string;
  clientName: string;
  description: string;
  status: string;
  payType: string;
  hours: number;
  start: string;
  end: string;
  startsIn: string;
  progress: number;
  jobFee: number;
  transportFee: number;
  tax: number;
  total: number;
  paymentMethod: string;
  dueDate: string;
  yohpalFee: number;
  vat: number;
}

/**
 * Fetches a single job document from the `jobs` collection.
 * @param jobId – the Firestore document ID
 */
export async function getJobDocument(
  jobId: string
): Promise<{ success: boolean; data?: JobDocumentData & { id: string }; message: string }> {
  try {
    const snap = await getDoc(doc(db, "jobs", jobId));

    if (!snap.exists()) {
      return { success: false, message: "Job not found" };
    }

    const raw = snap.data() as JobDocumentData;
    return {
      success: true,
      data: { ...raw, id: jobId },
      message: "Job fetched successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to fetch job",
    };
  }
}
