import { getAuth, sendEmailVerification, createUserWithEmailAndPassword, verifyBeforeUpdateEmail } from "firebase/auth";
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

export async function sendEmailUpdateVerification(newEmail: string): Promise<{ success: boolean; message: string }> {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, message: "You must be logged in to update your email." };
    }
    
    // Sends a verification email to the new address. 
    // The user's email is NOT changed until they click the link in that email.
    await verifyBeforeUpdateEmail(user, newEmail);
    
    return {
      success: true,
      message: "Verification email sent to the new address successfully.",
    };
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      return { success: false, message: "This email is already registered to another account." };
    } else if (error.code === "auth/requires-recent-login") {
      return { success: false, message: "Security required: Please log out and back in to change your email." };
    }
    return {
      success: false,
      message: error.message || "Failed to send verification email.",
    };
  }
}
