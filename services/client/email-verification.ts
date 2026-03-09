import { getAuth, sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "@/services/server/firebase";

const auth = getAuth(firebaseApp);

export async function createUserAndSendVerification(email: string, password: string): Promise<{ success: boolean; message: string; tempUser?: any }> {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Send verification email
    await sendEmailVerification(userCredential.user);
    
    return {
      success: true,
      message: "Verification email sent successfully",
      tempUser: userCredential.user,
    };
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw error;
    }
    return {
      success: false,
      message: "Please use a valid email address.",
    };
  }
}

export async function checkEmailVerified(user: any): Promise<boolean> {
  await user.reload();
  return user.emailVerified;
}
