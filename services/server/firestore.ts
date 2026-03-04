import { getFirestore, doc, setDoc } from "firebase/firestore";
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
