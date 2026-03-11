import {
  getAuth,
  sendPasswordResetEmail,
  verifyPasswordResetCode as firebaseVerifyPasswordResetCode,
  confirmPasswordReset as firebaseConfirmPasswordReset,
} from "firebase/auth";
import firebaseApp from "@/services/server/firebase";

const auth = getAuth(firebaseApp);

export async function sendPasswordReset(
  email: string
): Promise<{ success: boolean; message: string }> {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "Password reset email sent successfully",
    };
  } catch (error: any) {
    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/user-not-found"
    ) {
      return {
        success: false,
        message: "No account found with this email address.",
      };
    }
    return {
      success: false,
      message:
        error?.message ||
        "Failed to send password reset email. Please try again.",
    };
  }
}

export async function verifyPasswordReset(
  code: string
): Promise<{ success: boolean; email?: string; message?: string }> {
  try {
    const email = await firebaseVerifyPasswordResetCode(auth, code);
    return { success: true, email };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Invalid or expired password reset code.",
    };
  }
}

export async function confirmNewPassword(
  code: string,
  newPassword: string
): Promise<{ success: boolean; message: string }> {
  try {
    await firebaseConfirmPasswordReset(auth, code, newPassword);
    return { success: true, message: "Password has been reset successfully." };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to reset password. Please try again.",
    };
  }
}
