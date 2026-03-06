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

export async function getUserDocument(userId: string): Promise<{ success: boolean; data: UserData | null; message?: string }> {
  try {
    const snapshot = await getDoc(doc(db, "users", userId));
    if (!snapshot.exists()) {
      return { success: false, data: null, message: "User not found" };
    }
    return { success: true, data: snapshot.data() as UserData };
  } catch (error: any) {
    return { success: false, data: null, message: error.message || "Failed to fetch user profile" };
  }
}
