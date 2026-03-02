"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import VerificationSelection from "@/components/custom/app/auth/VerificationSelection";
import { registerUser } from "@/services/client/auth";
export default function RegisterPage() {
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
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Registration attempt:", formData);
    const response = registerUser(formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <VerificationSelection
        onVerifyEmail={() => console.log("Verifying email...")}
        onVerifyPhone={() => console.log("Verifying phone...")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-black text-black uppercase tracking-tight">
          Create Account
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-black">First name</label>
            <input
              type="text"
              name="firstName"
              placeholder="John"
              className="w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors"
              required
              onChange={handleChange}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-black">Last name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Doe"
              className="w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors"
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-black">Username</label>
          <input
            type="text"
            name="username"
            placeholder="johndoe_123"
            className="w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors"
            required
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-black">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            className="w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors"
            required
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-black">Phone number</label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="+1234567890"
            className="w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors"
            required
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-black">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors pr-12"
                required
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f44236] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-black">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="••••••••"
                className="w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors pr-12"
                required
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f44236] transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-black">
            Referral code (Optional)
          </label>
          <input
            type="text"
            name="referralCode"
            placeholder="HUSTLE2026"
            className="w-full bg-white border border-[#e57373] rounded-[10px] px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#f44236] transition-colors"
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center space-x-3 py-2">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              className="w-5 h-5 appearance-none bg-white border border-[#e57373] rounded-[10px] focus:ring-0 checked:bg-[#f44236] checked:border-black transition-all cursor-pointer"
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
            className="text-sm text-black font-medium cursor-pointer"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-[#f44236] font-bold hover:underline underline-offset-2"
            >
              terms and conditions
            </Link>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#f44236] hover:bg-black text-white font-black py-4 rounded-[10px] border border-[#f44236] active:translate-x-[1px] active:translate-y-[1px] transition-all duration-100 uppercase mt-6"
        >
          Continue
        </button>
      </form>

      <div className="text-center pt-4">
        <p className="text-sm text-black font-medium">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#f44236] font-black hover:underline underline-offset-4"
          >
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
}
