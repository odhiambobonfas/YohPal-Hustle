"use client";

import { useState } from "react";

interface HustlerConfirmProps {
  defaultEmail?: string;
  onFinishSetup?: (data: { email: string; phone: string }) => void;
  onMaybeLater?: () => void;
}

const HustlerConfirm: React.FC<HustlerConfirmProps> = ({
  defaultEmail = "",
  onFinishSetup,
  onMaybeLater,
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [phone, setPhone] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validatePhone = (val: string) =>
    /^\+?[\d\s\-()]{7,15}$/.test(val);

  const handleVerifyEmail = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setEmailVerified(true);
  };

  const handleVerifyPhone = () => {
    if (!validatePhone(phone)) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }
    setPhoneError("");
    setPhoneVerified(true);
  };

  const canSubmit = emailVerified && phoneVerified && agreed;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onFinishSetup?.({ email, phone });
  };

  return (
    <div className="min-h-screen bg-page flex flex-col">
      {/* Background top image placeholder */}
      <div className="w-full h-44 bg-surface-alt relative overflow-hidden">
        <svg viewBox="0 0 400 180" className="w-full h-full opacity-30">
          <ellipse cx="200" cy="90" rx="180" ry="80" fill="#3a7d70" />
          <circle cx="60" cy="60" r="30" fill="none" stroke="#5aada0" strokeWidth="2" />
          <circle cx="340" cy="40" r="18" fill="none" stroke="#5aada0" strokeWidth="2" />
        </svg>
      </div>

      {/* Modal Sheet */}
      <div className="bg-surface rounded-t-3xl lg:rounded-3xl -mt-8 flex-1 px-6 pt-8 pb-10 shadow-2xl max-w-lg mx-auto w-full lg:mt-0 lg:self-center">
        <h2 className="text-2xl font-bold text-fg mb-1">Let&apos;s get you set up!</h2>
        <p className="text-fg-secondary text-sm mb-7">
          Please complete the verification steps to become a hustler.
        </p>

        {/* Email Field */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-fg mb-2">Email</label>
          <div className="flex items-center bg-surface-alt rounded-xl px-4 py-3 gap-2 border border-rim focus-within:border-brand transition">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailVerified(false);
                setEmailError("");
              }}
              placeholder="jo@gmail.com"
              className="flex-1 bg-transparent text-fg placeholder:text-fg-muted text-sm outline-none"
            />
            {emailVerified ? (
              <span className="text-green-400 text-sm font-semibold">✓ Verified</span>
            ) : (
              <button
                onClick={handleVerifyEmail}
                className="text-brand text-sm font-semibold hover:opacity-80 transition"
              >
                Verify
              </button>
            )}
          </div>
          {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
        </div>

        {/* Phone Field */}
        <div className="mb-7">
          <label className="block text-sm font-medium text-fg mb-2">Mobile Number</label>
          <div className="flex items-center bg-surface-alt rounded-xl px-4 py-3 gap-2 border border-rim focus-within:border-brand transition">
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneVerified(false);
                setPhoneError("");
              }}
              placeholder="Enter your phone number"
              className="flex-1 bg-transparent text-fg placeholder:text-fg-muted text-sm outline-none"
            />
            {phoneVerified ? (
              <span className="text-green-400 text-sm font-semibold">✓ Verified</span>
            ) : (
              <button
                onClick={handleVerifyPhone}
                className="text-brand text-sm font-semibold hover:opacity-80 transition"
              >
                Verify
              </button>
            )}
          </div>
          {phoneError && <p className="text-red-400 text-xs mt-1">{phoneError}</p>}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 mb-8">
          <button
            onClick={() => setAgreed(!agreed)}
            className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
              agreed ? "bg-brand border-brand" : "border-rim bg-transparent"
            }`}
          >
            {agreed && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <p className="text-fg-secondary text-sm leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-400 underline hover:text-blue-300">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-400 underline hover:text-blue-300">
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Finish Setup Button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-full py-4 rounded-2xl text-sm font-bold transition-all ${
            canSubmit
              ? "bg-brand text-white hover:bg-brand-dark active:scale-95 shadow-lg shadow-brand/40"
              : "bg-surface-alt text-fg-muted cursor-not-allowed"
          }`}
        >
          Finish Setup
        </button>

        {/* Maybe Later */}
        <button
          onClick={onMaybeLater}
          className="w-full mt-4 text-center text-sm text-fg-secondary hover:text-fg transition"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
};

export default HustlerConfirm;
