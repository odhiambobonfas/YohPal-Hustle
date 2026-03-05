import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import firebaseApp from "@/services/server/firebase";

const auth = getAuth(firebaseApp);

let recaptchaVerifier: RecaptchaVerifier | null = null;

export async function sendPhoneVerificationCode(phoneNumber: string, recaptchaContainer: string): Promise<{ success: boolean; message: string; confirmationResult?: ConfirmationResult }> {
  console.log("Sending verification code to:", phoneNumber);
  try {
    // Clear existing verifier if it exists
    if (recaptchaVerifier) {
      try {
        recaptchaVerifier.clear();
      } catch (e) {
        console.log("Could not clear existing verifier");
      }
    }
    
    // Initialize reCAPTCHA
    recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
      size: 'invisible',
    });

    console.log("reCAPTCHA initialized, attempting to send code...");
    
    // Send verification code
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    
    console.log("Verification code sent successfully", confirmationResult);

    return {
      success: true,
      message: "Verification code sent to your phone",
      confirmationResult,
    };
  } catch (error: any) {
    console.error("Phone verification error:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    return {
      success: false,
      message: error.message || "Failed to send verification code. Please check your phone number.",
    };
  }
}

export async function verifyPhoneCode(confirmationResult: ConfirmationResult, code: string): Promise<{ success: boolean; message: string }> {
  try {
    await confirmationResult.confirm(code);
    return {
      success: true,
      message: "Phone number verified successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Invalid verification code. Please try again.",
    };
  }
}
