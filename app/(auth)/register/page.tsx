"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { completeUserRegistration } from "@/services/client/auth";
import { createUserAndSendVerification } from "@/services/client/email-verification";
import { sendPhoneOTP, verifyPhoneOTP } from "@/services/client/phone-otp";
import { getAuth } from "firebase/auth";
import LocationSelector from "@/components/custom/app/shared/LocationSelector";
import { useLanguage } from "@/providers/LanguageProvider";
import { normalizePhoneNumber } from "@/utilities/normalize-phone";

export default function RegisterPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    agreeToTerms: false,
    // location: { county: "", subCounty: "", estate: "" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailExistsDialog, setShowEmailExistsDialog] = useState(false);
  const [showPhoneVerification, setShowPhoneVerification] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [expectedOtp, setExpectedOtp] = useState<number | null>(null);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setPhoneVerificationCode(""); // Clear previous OTP input
    try {
      const normalizedPhone = normalizePhoneNumber(formData.phoneNumber);
      setFormData((prev) => ({ ...prev, phoneNumber: normalizedPhone }));

      const phoneResult = await sendPhoneOTP(normalizedPhone);

      if (phoneResult.success && phoneResult.otp) {
        setExpectedOtp(phoneResult.otp);
        setShowPhoneVerification(true);
      } else {
        setError(
          phoneResult.message || "Failed to send phone verification code.",
        );
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPhoneAndProceed = async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (!phoneVerificationCode || phoneVerificationCode.length < 6) {
        setError("Please enter the 6-digit verification code.");
        setIsLoading(false);
        return;
      }

      if (!expectedOtp) {
        setError("OTP session expired. Please request a new code.");
        setIsLoading(false);
        return;
      }

      // Verify phone code
      const phoneVerifyResult = await verifyPhoneOTP(
        expectedOtp,
        phoneVerificationCode,
      );

      if (!phoneVerifyResult.success) {
        setError(phoneVerifyResult.message);
        setIsLoading(false);
        return;
      }

      // Phone verified! Now proceed to email verification
      setShowPhoneVerification(false);
      setShowEmailVerification(true);
    } catch (err: any) {
      console.error("Phone verification error:", err);
      setError(err.message || "An error occurred during phone verification.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleVerifyEmailAndRegister = async () => {
    setError(null);
    setIsLoading(true);
    try {
      // Step 2: Create Auth user and send email verification
      const result = await createUserAndSendVerification(
        formData.email,
        formData.password,
      );

      if (!result.success || !result.tempUser) {
        setError(result.message || "Failed to create account.");
        setIsLoading(false);
        return;
      }

      // Wait for user to verify email
      setError(null);
      setIsLoading(false);

      // Show message to check email
      alert(
        "Please check your email and click the verification link. Then click 'Complete Registration' below.",
      );
    } catch (err: any) {
      console.error("Email verification error:", err);
      if (err.code === "auth/email-already-in-use") {
        setShowEmailExistsDialog(true);
        setShowEmailVerification(false);
      } else {
        setError(err.message || "An error occurred.");
      }
      setIsLoading(false);
    }
  };

  const handleCompleteRegistration = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError("Session expired. Please start registration again.");
        setIsLoading(false);
        return;
      }

      // Check if email is verified
      await user.reload();
      if (!user.emailVerified) {
        setError(
          "Please verify your email first. Check your inbox for the verification link.",
        );
        setIsLoading(false);
        return;
      }

      // Step 3: Both verifications complete - create Firestore record
      const response = await completeUserRegistration(user.uid, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        phoneNumber: formData.phoneNumber,
        referralCode: formData.referralCode,
        // location: formData.location,
      });

      if (response.success) {
        setIsSubmitted(true);
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  const handleUseAnotherEmail = () => {
    setShowEmailExistsDialog(false);
    setFormData((prev) => ({ ...prev, email: "" }));
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-fg uppercase tracking-tight">
            {t('auth.accountCreated')}
          </h2>
          <p className="text-sm text-fg-secondary mt-4">{t('auth.accountCreatedMessage')}</p>
          <p className="text-sm text-fg-secondary mt-4">
            Your account has been successfully created.
          </p>
          <Link
            href="/login"
            className="inline-block mt-6 bg-brand hover:bg-brand-dark text-white font-black py-3 px-8 rounded-[10px] transition-all uppercase"
          >
            {t('auth.goToLogin')}
          </Link>
        </div>
      </div>
    );
  }

  if (showPhoneVerification) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-fg uppercase tracking-tight">
            Verify Your Phone Number
          </h2>
          <p className="text-sm text-fg-secondary mt-2">
            We've sent a verification code to{" "}
            <strong className="text-fg">{formData.phoneNumber}</strong>
          </p>
        </div>
        {error && (
          <div className="bg-brand-50 dark:bg-brand-900/10 border-l-4 border-brand p-4 rounded-md">
            <p className="text-sm text-brand font-bold">{error}</p>
          </div>
        )}
        <div className="bg-blue-50 dark:bg-blue-950/50 border-l-4 border-blue-500 p-6 rounded-md">
          <p className="text-sm text-fg font-medium mb-4">
            Enter the 6-digit code sent to your phone.
          </p>
          <input
            type="text"
            value={phoneVerificationCode}
            onChange={(e) => setPhoneVerificationCode(e.target.value)}
            placeholder="000000"
            className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg placeholder-fg-muted focus:outline-none focus:ring-0 focus:border-brand transition-colors text-center text-lg tracking-widest font-bold mb-4"
          />
          <button
            onClick={handleVerifyPhoneAndProceed}
            disabled={isLoading || phoneVerificationCode.length !== 6}
            className="w-full bg-brand hover:bg-brand-dark text-white font-black py-3 rounded-[10px] transition-all uppercase disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="inline mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Phone & Continue"
            )}
          </button>
          <button
            onClick={() => {
              setShowPhoneVerification(false);
              setPhoneVerificationCode("");
              setExpectedOtp(null);
            }}
            className="w-full mt-3 bg-surface hover:bg-surface-alt text-fg font-black py-3 rounded-[10px] border-2 border-brand transition-all uppercase"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (showEmailVerification) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-fg uppercase tracking-tight">
            Verify Your Email
          </h2>
          <p className="text-sm text-fg-secondary mt-2">
            Almost done! Now verify your email:{" "}
            <strong className="text-fg">{formData.email}</strong>
          </p>
        </div>
        {error && (
          <div className="bg-brand-50 dark:bg-brand-900/10 border-l-4 border-brand p-4 rounded-md">
            <p className="text-sm text-brand font-bold">{error}</p>
          </div>
        )}
        <div className="bg-green-50 dark:bg-green-950/50 border-l-4 border-green-500 p-6 rounded-md">
          <p className="text-sm text-fg font-medium mb-4">
            ✓ Phone verified successfully!
          </p>
          <button
            onClick={handleVerifyEmailAndRegister}
            disabled={isLoading}
            className="w-full bg-brand hover:bg-brand-dark text-white font-black py-3 rounded-[10px] transition-all uppercase disabled:opacity-70 mb-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="inline mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Email Verification"
            )}
          </button>
          <button
            onClick={handleCompleteRegistration}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-3 rounded-[10px] transition-all uppercase disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="inline mr-2 h-5 w-5 animate-spin" />
                Completing...
              </>
            ) : (
              "Complete Registration"
            )}
          </button>
        </div>
      </div>
    );
  }

  if (showEmailExistsDialog) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-fg uppercase tracking-tight">
            Email Already Exists
          </h2>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-950/50 border-l-4 border-yellow-500 p-6 rounded-md">
          <p className="text-sm text-fg font-medium mb-4">
            This email is already registered. Would you like to login instead?
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleLoginRedirect}
              className="flex-1 bg-brand hover:bg-brand-dark text-white font-black py-3 rounded-[10px] transition-all uppercase"
            >
              Yes, Login
            </button>
            <button
              onClick={handleUseAnotherEmail}
              className="flex-1 bg-surface hover:bg-surface-alt text-fg font-black py-3 rounded-[10px] border-2 border-brand transition-all uppercase"
            >
              Use Another Email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-black text-fg uppercase tracking-tight">
          Create Account
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-brand-50 dark:bg-brand-900/10 border-l-4 border-brand p-4 rounded-md">
            <p className="text-sm text-brand font-bold">{error}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-fg">First name</label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg placeholder-fg-muted focus:outline-none focus:ring-0 focus:border-brand transition-colors"
              required
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-fg">Last name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg placeholder-fg-muted focus:outline-none focus:ring-0 focus:border-brand transition-colors"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-fg">Username</label>
          <input
            type="text"
            name="username"
            placeholder="johndoe_123"
            className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg placeholder-fg-muted focus:outline-none focus:ring-0 focus:border-brand transition-colors"
            required
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-fg">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg placeholder-fg-muted focus:outline-none focus:ring-0 focus:border-brand transition-colors"
            required
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-fg">{t('auth.phoneNumber')}</label>
          <label className="text-xs font-bold text-fg">{t('auth.phoneNumber')}</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="+254712345678"
            className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg placeholder-fg-muted focus:outline-none focus:ring-0 focus:border-brand transition-colors"
            required
            onChange={handleChange}
          />
        </div>

        {/* Location Selector */}
        <LocationSelector
          // value={formData.location}
          onChange={(location) => setFormData((prev) => ({ ...prev, location }))}
          required={true}
          showEstate={true}
          autoDetect={true}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-fg">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg placeholder-fg-muted focus:outline-none focus:ring-0 focus:border-brand transition-colors pr-12"
                required
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted hover:text-brand transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-fg">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg placeholder-fg-muted focus:outline-none focus:ring-0 focus:border-brand transition-colors pr-12"
                required
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-muted hover:text-brand transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-fg">
            Referral code (Optional)
          </label>
          <input
            type="text"
            name="referralCode"
            placeholder="HUSTLE2026"
            className="w-full bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] px-4 py-3 text-fg placeholder-fg-muted focus:outline-none focus:ring-0 focus:border-brand transition-colors"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center space-x-3 py-2">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              className="w-5 h-5 appearance-none bg-surface border border-brand-300 dark:border-brand-700 rounded-[10px] focus:ring-0 checked:bg-brand checked:border-brand-dark transition-all cursor-pointer"
              required
              onChange={handleChange}
            />
            <svg
              className="absolute left-[3px] top-[3px] w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <label
            htmlFor="agreeToTerms"
            className="text-sm text-fg font-medium cursor-pointer"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-brand font-bold hover:underline underline-offset-2"
            >
              terms and conditions
            </Link>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand hover:bg-brand-dark text-white font-black py-4 rounded-[10px] border border-brand active:translate-x-[1px] active:translate-y-[1px] transition-all duration-100 uppercase mt-6 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Continue"
          )}
        </button>
      </form>

      <div className="text-center pt-4">
        <p className="text-sm text-fg-secondary font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-brand font-black hover:underline underline-offset-4"
          >
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
}
