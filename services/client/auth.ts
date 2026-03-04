import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "@/services/server/firebase";
import type { RegisterPayload } from "@/lib/validations/auth";
import { createUserProfile } from "@/actions/auth";

const auth = getAuth(firebaseApp);

export async function completeUserRegistration(userId: string, userData: any): Promise<any> {
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
  if (token && typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }

  // Create user document in Firestore via server action
  const result = await createUserProfile(userId, {
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    email: userData.email,
    phoneNumber: userData.phoneNumber || "",
    referralCode: userData.referralCode,
  });

  return result;
}

export async function authenticateEmailAndPassword(
  email: string,
  password: string
): Promise<any> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  const token = await userCredential.user.getIdToken();
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }

  return {
    success: true,
    message: "Authentication successful",
    data: {
      userId: userCredential.user.uid,
      email: userCredential.user.email,
      phoneNumber: "",
      verificationRequired: false,
    },
  };
}