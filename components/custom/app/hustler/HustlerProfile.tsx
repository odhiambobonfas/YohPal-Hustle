"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Edit2,
  X,
  Save,
  Upload,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { sendPhoneOTP, verifyPhoneOTP } from "@/services/client/phone-otp";
import { sendEmailUpdateVerification } from "@/services/client/email-verification";
import { normalizePhoneNumber } from "@/utilities/normalize-phone";
import { getAuth } from "firebase/auth";
import { CurrentUserState } from "@/hooks/useCurrentUser";
import { deriveDisplayName, deriveInitials } from "@/utilities/profile";
import { HustlerProfileData } from "@/types/users";

interface HustlerProfileProps {
  hustlerProfile: HustlerProfileData;
}

export default function HustlerProfile({
  hustlerProfile,
}: HustlerProfileProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPhone, setEditPhone] = useState(hustlerProfile.phoneNumber);
  const [editEmail, setEditEmail] = useState(hustlerProfile.email);
  const [editAvatar, setEditAvatar] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneChanged, setPhoneChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [expectedOtp, setExpectedOtp] = useState<number | null>(null);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [emailVerifyLoading, setEmailVerifyLoading] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = deriveInitials(
    hustlerProfile.firstName,
    hustlerProfile.lastName
  );
  const displayName = deriveDisplayName(
    hustlerProfile.firstName,
    hustlerProfile.lastName
  );
  // Placeholders
  const location = "Nairobi Kenya";
  const isActive = true;

  // Timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOtpInput && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpInput, otpTimer]);

  // Validation functions
  const validatePhone = (phoneNum: string): boolean => {
    const normalized = normalizePhoneNumber(phoneNum);
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(normalized);
  };

  const validateEmail = (emailAddr: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailAddr);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPhone(e.target.value);
    setPhoneChanged(true);
    setPhoneVerified(false);
    setShowOtpInput(false);
    setOtpCode("");
    setOtpTimer(0);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditEmail(e.target.value);
    setEmailChanged(true);
    setEmailVerified(false);
    setEmailVerificationSent(false);
  };

  const handlePhoneVerify = async () => {
    if (validatePhone(editPhone)) {
      setVerifyLoading(true);
      try {
        const normalized = normalizePhoneNumber(editPhone);
        const result = await sendPhoneOTP(normalized);
        if (result.success && result.otp) {
          setExpectedOtp(result.otp);
          setShowOtpInput(true);
          setOtpTimer(60); // 60 seconds valid/resend timer
        } else {
          console.error("Failed to send phone OTP:", result.message);
        }
      } catch (error) {
        console.error("Error verifying phone:", error);
      } finally {
        setVerifyLoading(false);
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (!expectedOtp || otpCode.length < 6) return;
    setVerifyLoading(true);
    try {
      const result = await verifyPhoneOTP(expectedOtp, otpCode);
      if (result.success) {
        setPhoneVerified(true);
        setShowOtpInput(false);
      } else {
        console.error("OTP Verification failed:", result.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleEmailVerify = async () => {
    if (!validateEmail(editEmail)) return;

    setEmailVerifyLoading(true);
    try {
      const result = await sendEmailUpdateVerification(editEmail);

      if (result.success) {
        setEmailVerificationSent(true);
        alert(
          "Verification email sent! Please check your inbox and click the link, then click 'Confirm Verification'."
        );
      } else {
        alert(result.message || "Failed to send email verification.");
      }
    } catch (error: any) {
      console.error("Error sending email verification:", error);
      alert("An error occurred while verifying the email.");
    } finally {
      setEmailVerifyLoading(false);
    }
  };

  const handleCheckEmailVerified = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to verify an email change.");
      return;
    }

    setEmailVerifyLoading(true);
    try {
      // Reload user data from Firebase to check if they clicked the update link
      await user.reload();

      // verifyBeforeUpdateEmail changes the user's actual email once they click the link
      if (user.email === editEmail && user.emailVerified) {
        setEmailVerified(true);
        setEmailVerificationSent(false);
      } else {
        alert(
          "Email not verified yet. Please click the link in the email we sent you, then try again."
        );
      }
    } catch (error) {
      console.error("Error checking email verification status:", error);
      alert("Error checking verification status. Try again.");
    } finally {
      setEmailVerifyLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
        setEditAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Check if save is allowed
  const isSaveAllowed = () => {
    if (phoneChanged && !phoneVerified) return false;
    if (emailChanged && !emailVerified) return false;
    return true;
  };

  const handleSave = () => {
    if (!isSaveAllowed()) return;
    // This takes the updated data
    // const updatedProfileData: UpdateProfile = {
    //   phone: editPhone,
    //   email: editEmail,
    //   // location: editLocation,
    //   // avatar: editAvatar,
    // }
    // profileData(updatedProfileData)
    setIsEditOpen(false);
  };

  // Get the current user and use the current data

  const handleClose = () => {
    setIsEditOpen(false);
    setEditPhone(editPhone);
    setEditEmail(editEmail);
    setPreviewAvatar(editAvatar);
    setPhoneVerified(false);
    setEmailVerified(false);
    setPhoneChanged(false);
    setEmailChanged(false);
    setShowOtpInput(false);
    setOtpCode("");
    setExpectedOtp(null);
    setOtpTimer(0);
    setEmailVerificationSent(false);
  };

  return (
    <div>
      <div className="bg-surface rounded-2xl p-4 md:p-6 border border-rim relative">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
          {/* Avatar with Active Indicator */}
          <div className="relative flex-shrink-0 mx-auto md:mx-0">
            <div className="w-20 md:w-24 h-20 md:h-24 rounded-full border-4 border-brand/20 shadow-lg bg-surface-alt flex items-center justify-center overflow-hidden">
              {previewAvatar ? (
                <Image
                  src={previewAvatar}
                  alt={hustlerProfile.firstName}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-xl md:text-2xl font-bold text-brand">
                  {initials}
                </span>
              )}
            </div>

            {/* Active Status Indicator */}
            <div
              className={`absolute top-1 left-1 w-5 h-5 rounded-full border-2 border-surface ${
                isActive ? "bg-green-400" : "bg-gray-400"
              } shadow-md`}
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            {/* Name */}
            <h2 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">
              {displayName}
            </h2>

            {/* Contact Details */}
            <div className="space-y-2 md:space-y-2.5">
              {/* Location */}
              <div className="flex flex-row items-center gap-2 md:gap-3 text-fg">
                <MapPin
                  size={16}
                  className="text-brand w-4 h-4 flex-shrink-0"
                />
                <span className="text-sm">{location}</span>
              </div>

              {/* Phone */}
              <div className="flex flex-row items-center gap-2 md:gap-3 text-fg">
                <Phone size={16} className="text-brand w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{editPhone}</span>
              </div>

              {/* Email */}
              <div className="flex flex-row items-center gap-2 md:gap-3 text-fg">
                <Mail size={16} className="text-brand w-4 h-4 flex-shrink-0" />
                <span className="text-sm break-all">{editEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Button - Bottom Right Corner */}
        <button
          onClick={() => setIsEditOpen(true)}
          className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-10 h-10 rounded-full bg-surface border-brand text-brand shadow-lg hover:bg-surface-alt transition flex items-center justify-center border-2 z-10"
        >
          <Edit2 size={18} />
        </button>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl shadow-2xl max-w-md w-full border border-rim max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-rim">
              <h3 className="text-lg font-bold text-black">Edit Profile</h3>
              <button
                onClick={handleClose}
                className="text-black/50 hover:text-black transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-4 border-brand/20 bg-surface-alt flex items-center justify-center overflow-hidden mb-3">
                  {previewAvatar ? (
                    <Image
                      src={previewAvatar}
                      alt="Preview"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-xl font-bold text-brand">
                      {initials}
                    </span>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-lg hover:bg-brand/20 transition text-sm font-semibold"
                >
                  <Upload size={16} />
                  Upload Avatar
                </button>
              </div>

              {/* Phone Input with Verification */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={handlePhoneChange}
                    disabled={showOtpInput}
                    className={`flex-1 px-4 py-2.5 bg-surface-alt border-2 rounded-lg text-black placeholder-black/40 focus:outline-none transition ${
                      phoneChanged && !phoneVerified
                        ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                        : phoneVerified
                        ? "border-green-500/50 focus:ring-2 focus:ring-green-500/50"
                        : "border-rim focus:ring-2 focus:ring-brand/50"
                    }`}
                    placeholder="+254 700 000 000"
                  />
                  {!showOtpInput && (
                    <button
                      onClick={handlePhoneVerify}
                      disabled={!phoneChanged || verifyLoading}
                      className={`px-3 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center transition ${
                        phoneVerified
                          ? "bg-green-500/20 text-green-600 border border-green-500/30"
                          : phoneChanged
                          ? "bg-brand text-white hover:opacity-90"
                          : "bg-gray-300/30 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {phoneVerified ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <span className="text-xs">
                          {verifyLoading ? "Sending..." : "Verify"}
                        </span>
                      )}
                    </button>
                  )}
                </div>

                {showOtpInput && !phoneVerified && (
                  <div className="mt-3 bg-blue-50/50 p-4 rounded-lg border border-blue-100 flex flex-col gap-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        className="flex-1 px-4 py-2 text-center tracking-widest font-bold bg-white border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        maxLength={6}
                      />
                      <button
                        onClick={handleVerifyOtp}
                        disabled={otpCode.length < 6 || verifyLoading}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                      >
                        {verifyLoading ? "Checking..." : "Confirm"}
                      </button>
                      <button
                        onClick={() => {
                          setShowOtpInput(false);
                          setOtpCode("");
                          setOtpTimer(0);
                        }}
                        className="px-2 py-2 text-gray-500 hover:text-gray-700 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    {/* Resend and Timer Info */}
                    <div className="flex items-center justify-between text-xs px-1">
                      {otpTimer > 0 ? (
                        <p className="text-gray-500 font-medium tracking-tight">
                          Code valid for{" "}
                          <span className="font-bold text-red-500">
                            00:{otpTimer.toString().padStart(2, "0")}
                          </span>
                        </p>
                      ) : (
                        <p className="text-gray-500 font-medium">
                          Code expired
                        </p>
                      )}

                      <button
                        onClick={handlePhoneVerify}
                        disabled={otpTimer > 0 || verifyLoading}
                        className={`font-semibold hover:underline transition ${
                          otpTimer > 0
                            ? "text-gray-400 cursor-not-allowed hidden"
                            : "text-blue-600"
                        }`}
                      >
                        {verifyLoading ? "Sending..." : "Resend Code"}
                      </button>
                    </div>
                  </div>
                )}

                {phoneChanged && !phoneVerified && !showOtpInput && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-red-600">
                    <AlertCircle size={14} />
                    Phone verification required
                  </div>
                )}
              </div>

              {/* Email Input with Verification */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email Address
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={editEmail}
                    onChange={handleEmailChange}
                    className={`flex-1 px-4 py-2.5 bg-surface-alt border-2 rounded-lg text-black placeholder-black/40 focus:outline-none transition ${
                      emailChanged && !emailVerified
                        ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                        : emailVerified
                        ? "border-green-500/50 focus:ring-2 focus:ring-green-500/50"
                        : "border-rim focus:ring-2 focus:ring-brand/50"
                    }`}
                    placeholder="john@example.com"
                  />
                  <button
                    onClick={
                      emailVerificationSent
                        ? handleCheckEmailVerified
                        : handleEmailVerify
                    }
                    disabled={!emailChanged || emailVerifyLoading}
                    className={`px-3 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center transition ${
                      emailVerified
                        ? "bg-green-500/20 text-green-600 border border-green-500/30"
                        : emailVerificationSent
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : emailChanged
                        ? "bg-brand text-white hover:opacity-90"
                        : "bg-gray-300/30 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {emailVerified ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <span className="text-xs">
                        {emailVerifyLoading
                          ? "Checking..."
                          : emailVerificationSent
                          ? "Confirm"
                          : "Verify"}
                      </span>
                    )}
                  </button>
                </div>
                {emailChanged && !emailVerified && !emailVerificationSent && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-red-600">
                    <AlertCircle size={14} />
                    Email verification required
                  </div>
                )}
                {emailVerificationSent && !emailVerified && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-blue-600">
                    <AlertCircle size={14} />
                    Verification link sent! Click Confirm Verification after
                    checking your inbox.
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-rim">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2.5 bg-surface-alt text-black rounded-lg hover:bg-rim transition font-semibold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!isSaveAllowed()}
                className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition ${
                  isSaveAllowed()
                    ? "bg-green-500 text-white hover:opacity-90"
                    : "bg-gray-400/40 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
