"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";

interface VerificationSelectionProps {
  onVerifyEmail: () => void;
  onVerifyPhone: () => void;
}

export default function VerificationSelection({
  onVerifyEmail,
  onVerifyPhone,
}: VerificationSelectionProps) {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="text-center">
        <h2 className="text-2xl font-black text-black uppercase tracking-tight">
          Verify Your Account
        </h2>
        <p className="text-gray-500 text-sm mt-2 font-medium">
          Choose a method to secure your account
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={onVerifyEmail}
          className="w-full flex items-center justify-between bg-[#f44236] hover:bg-black text-white font-black py-5 px-6 rounded-[10px] border border-[#f44236] transition-all duration-200 uppercase group"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <Mail size={24} />
            </div>
            <span className="text-lg">Verify Email</span>
          </div>
          <div className="bg-white text-[#f44236] text-[10px] px-2 py-1 rounded font-black group-hover:bg-white group-hover:text-black transition-colors">
            CTA
          </div>
        </button>

        <button
          onClick={onVerifyPhone}
          className="w-full flex items-center bg-white hover:bg-gray-50 text-black font-black py-5 px-6 rounded-[10px] border-2 border-black transition-all duration-200 uppercase"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-2 rounded-lg text-[#f44236]">
              <Phone size={24} />
            </div>
            <span className="text-lg">Verify Phone</span>
          </div>
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => window.location.reload()}
          className="text-gray-400 text-sm font-bold hover:text-black transition-colors underline underline-offset-4"
        >
          Not now, take me back
        </button>
      </div>
    </div>
  );
}
